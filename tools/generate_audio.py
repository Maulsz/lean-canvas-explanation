"""
Membuat file narasi MP3 (assets/audio/<id-scene>.mp3) dari assets/js/content.js memakai edge-tts.

Pemakaian (dari folder proyek):
    python tools/generate_audio.py                 # buat/perbarui audio yang naskahnya berubah
    python tools/generate_audio.py --force         # buat ulang semua audio
    python tools/generate_audio.py --only intro tim
    python tools/generate_audio.py --voice id-ID-ArdiNeural   # uji: satu suara untuk semua

Suara tiap pembicara diatur di bagian "speakers" pada content.js.
Skrip mencatat sidik (hash) naskah di assets/audio/manifest.json, jadi hanya scene
yang naskah atau pengaturan suaranya berubah yang dibuat ulang.
"""

import argparse
import asyncio
import hashlib
import json
import re
import socket
import sys
from pathlib import Path

try:
    import aiohttp
    import edge_tts
except ImportError:
    sys.exit("edge-tts belum terpasang. Jalankan: python -m pip install edge-tts")

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent   # folder proyek (berisi index.html)
CONTENT = ROOT / "assets" / "js" / "content.js"
AUDIO_DIR = ROOT / "assets" / "audio"
MANIFEST = AUDIO_DIR / "manifest.json"


def load_content() -> dict:
    text = CONTENT.read_text(encoding="utf-8")
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end < 0:
        sys.exit("Tidak menemukan objek data di content.js")
    try:
        return json.loads(text[start : end + 1])
    except json.JSONDecodeError as e:
        sys.exit(f"content.js bukan JSON valid (baris {e.lineno}, kolom {e.colno}): {e.msg}")


def apply_pronunciation(text: str, mapping: dict) -> str:
    for src, dst in sorted(mapping.items(), key=lambda kv: -len(kv[0])):
        text = re.sub(r"(?<![\w])" + re.escape(src) + r"(?![\w])", dst, text)
    return text


async def synthesize(text: str, path: Path, voice: str, rate: str, pitch: str) -> None:
    tmp = path.with_suffix(".tmp.mp3")
    attempts = 5
    for attempt in range(1, attempts + 1):
        try:
            # Paksa IPv4: di sebagian jaringan, koneksi IPv6 ke server suara sering terputus.
            connector = aiohttp.TCPConnector(family=socket.AF_INET)
            communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, connector=connector)
            await asyncio.wait_for(communicate.save(str(tmp)), timeout=90)
            tmp.replace(path)
            return
        except Exception as e:  # jaringan / layanan sementara gagal
            tmp.unlink(missing_ok=True)
            if attempt == attempts:
                raise
            reason = str(e).split(" [")[-1].rstrip("]") if " [" in str(e) else type(e).__name__
            print(f"    percobaan {attempt} gagal ({reason}); coba lagi dalam {3 * attempt} detik...")
            await asyncio.sleep(3 * attempt)


async def main() -> None:
    data = load_content()
    speakers = data.get("speakers", {})

    parser = argparse.ArgumentParser(description="Buat narasi MP3 dari content.js")
    parser.add_argument("--voice", help="paksa satu suara untuk semua pembicara (untuk uji coba)")
    parser.add_argument("--rate", help="paksa kecepatan untuk semua, mis. +10%%")
    parser.add_argument("--pitch", help="paksa nada untuk semua, mis. -2Hz")
    parser.add_argument("--only", nargs="*", help="id scene tertentu saja")
    parser.add_argument("--force", action="store_true", help="buat ulang semua")
    args = parser.parse_args()

    AUDIO_DIR.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    mapping = data.get("pronunciation", {})
    scenes = data["scenes"]
    ids = {s["id"] for s in scenes}

    if args.only:
        unknown = set(args.only) - ids
        if unknown:
            sys.exit(f"id scene tidak dikenal: {', '.join(sorted(unknown))}")

    made = skipped = 0
    failed = []
    for i, scene in enumerate(scenes, 1):
        sid = scene["id"]
        if args.only and sid not in args.only:
            continue
        sp = speakers.get(scene.get("speaker", ""), {})
        voice = args.voice or sp.get("voice", "id-ID-ArdiNeural")
        rate = args.rate or sp.get("rate", "+0%")
        pitch = args.pitch or sp.get("pitch", "+0Hz")
        spoken = scene.get("narration", "").strip()
        # Ejaan pengucapan hanya untuk suara Indonesia; suara multibahasa
        # sudah fasih mengucapkan istilah Inggris seperti "Lean Canvas".
        if voice.lower().startswith("id-"):
            spoken = apply_pronunciation(spoken, mapping)
        if not spoken:
            continue
        key = hashlib.sha1(f"{voice}|{rate}|{pitch}|{spoken}".encode()).hexdigest()
        path = AUDIO_DIR / f"{sid}.mp3"
        if not args.force and manifest.get(sid) == key and path.exists():
            skipped += 1
            continue
        print(f"[{i:02d}/{len(scenes)}] {sid}  ({sp.get('short', '?')} · {voice})")
        try:
            await synthesize(spoken, path, voice, rate, pitch)
        except Exception as e:
            print(f"    GAGAL: {sid} ({type(e).__name__}). Lewati; jalankan skrip lagi nanti.")
            failed.append(sid)
            continue
        manifest[sid] = key
        made += 1
        MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
        await asyncio.sleep(1)  # beri jeda agar tidak membanjiri layanan

    # Hapus audio milik scene yang sudah tidak ada di content.js
    for sid in [k for k in manifest if k not in ids]:
        (AUDIO_DIR / f"{sid}.mp3").unlink(missing_ok=True)
        del manifest[sid]
        print(f"hapus audio usang: {sid}.mp3")
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"Selesai. Dibuat: {made}, tidak berubah: {skipped}.")
    if failed:
        print(f"Gagal ({len(failed)}): {', '.join(failed)} — jalankan ulang skrip; yang sudah jadi tidak dibuat ulang.")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
