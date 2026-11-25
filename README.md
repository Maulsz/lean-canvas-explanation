# Presentasi Lean Canvas & PRD — Platform Pencarian & Pemesanan Lapangan Olahraga

Halaman web interaktif berisi **presentasi tim** tentang **Lean Canvas v1.0** dan **PRD v0.1**
startup platform pencarian & pemesanan lapangan olahraga kepada **Ustadz Izhar** selaku pembina.
Setiap bagian dibawakan oleh anggota tim sesuai perannya, dengan suara, label pembicara,
dan caption. Gambar Lean Canvas asli ditampilkan dan kotak yang sedang dibahas disorot.
Tampilannya mengikuti warna dokumen Lean Canvas (putih, hitam, dan merah `#C00000`).

> Proyek startup **Angkatan 5 SMKIT Ibnul Qayyim Makassar**, jurusan **PPLG/RPL**.

---

## Struktur folder

```
startup-video/                 ← root repositori (yang di-deploy ke GitHub Pages)
├── index.html                 ← halaman utama
├── README.md
├── .nojekyll                  ← agar GitHub Pages menyajikan file apa adanya
├── .gitignore
├── assets/
│   ├── css/style.css          ← tampilan, animasi, responsive
│   ├── js/content.js          ← SEMUA teks, pembicara & suaranya, naskah dialog (edit di sini)
│   ├── js/script.js           ← merender scene, navigasi, narasi, caption, autoplay
│   ├── img/lean-canvas.png    ← halaman Lean Canvas asli, diubah dari PDF
│   └── audio/                 ← 22 file narasi MP3 (± 2,6 MB) + manifest.json
├── documents/                 ← dokumen asli tim
│   ├── lean-canvas-v1.0.pdf
│   ├── prd-v0.1.pdf
│   └── prd-v0.1.docx
└── tools/                     ← alat bantu, tidak dipakai oleh halaman
    ├── generate_audio.py      ← membuat MP3 narasi dari content.js (edge-tts)
    └── requirements.txt
```

Semua path di dalam halaman bersifat **relatif**, jadi situs berjalan baik di
`https://<username>.github.io/<nama-repo>/` maupun saat `index.html` dibuka langsung dari komputer.

## Cara membuka di komputer

1. Klik dua kali **`index.html`** (disarankan **Microsoft Edge** atau **Google Chrome**).
2. Pilih:
   - **Mulai presentasi**: dialog tim berjalan dan scene berganti otomatis seperti video (± 7,5 menit).
   - **Jelajahi sendiri**: tanpa autoplay, berpindah scene secara manual.

Tidak perlu instalasi, server, atau internet untuk membuka halaman.

## Deploy ke GitHub Pages

> **Perhatian:** GitHub Pages gratis hanya untuk repositori **publik**. Artinya semua isi
> repositori, termasuk PDF di `documents/` dan nama-nama anggota tim, bisa dilihat siapa saja.
> Jika dokumen belum boleh dipublikasikan, hapus folder `documents/` dari repositori
> (halaman tetap berjalan; hanya tautan "Dokumen asli" di layar awal yang tidak bisa dibuka).

**Cara 1 — lewat situs GitHub (tanpa perintah):**
1. Buat repositori baru di GitHub, misalnya `presentasi-lean-canvas`, dengan visibilitas **Public**.
2. Klik **Add file → Upload files**. Seret **isi** folder `startup-video` (bukan foldernya),
   termasuk `.nojekyll`, lalu klik **Commit changes**.
   File berawalan titik kadang tersembunyi di Windows. Jika `.nojekyll` tidak ikut, situs tetap berjalan.
3. Buka **Settings → Pages**. Pada *Build and deployment*, pilih **Source: Deploy from a branch**,
   **Branch: `main`**, folder **`/ (root)`**, lalu **Save**.
4. Tunggu 1–2 menit. Alamat situs muncul di halaman yang sama:
   `https://<username>.github.io/presentasi-lean-canvas/`.

**Cara 2 — lewat Git (dari folder `startup-video`):**

```bash
git init
git add .
git commit -m "Presentasi Lean Canvas & PRD"
git branch -M main
git remote add origin https://github.com/<username>/presentasi-lean-canvas.git
git push -u origin main
```

Lalu aktifkan Pages seperti langkah 3 di atas. Setiap `git push` berikutnya otomatis memperbarui situs.

## Kontrol

| Aksi | Tombol / gestur |
|---|---|
| Scene berikutnya / sebelumnya | `→` / `←`, tombol panah, atau geser (swipe) di HP/tablet |
| Putar / jeda | `Spasi` atau `K` |
| Suara hidup / mati | `M` |
| Teks narasi (caption) | `C` |
| Lompat ke bagian tertentu | klik garis progress di bawah |
| Ke awal / akhir | `Home` / `End` |
| Lompat ke kotak Lean Canvas | klik kotak pada gambar canvas, atau daftar di scene *Ringkasan* |

Setiap scene punya alamat sendiri, misalnya `…/#revenue`, jadi bisa langsung dibagikan ke bagian tertentu.

## Isi presentasi (22 scene) dan pembicara

| # | Scene | Pembicara |
|---|---|---|
| 1–3 | Salam pembuka, perkenalan tim, pengantar Lean Canvas | Rizky (Ketua) |
| 4 | Problem | Fikri (System Analyst) |
| 5 | Customer Segments | Dhimas (Marketing) |
| 6 | Unique Value Proposition | Rizky |
| 7 | Solution | Fatih (System Analyst) |
| 8 | Channels | Rayyan (Marketing) |
| 9–10 | Revenue Streams, Cost Structure | Zubiar (Keuangan) |
| 11 | Key Metrics | Rizky |
| 12 | Unfair Advantage | Fikri |
| 13–14 | Ringkasan canvas, **evaluasi diri Lean Canvas** | Rizky |
| 15 | Pengantar PRD | Fikri |
| 16 | Tujuan produk | Fatih |
| 17 | Fitur F1–F9 | Fikri |
| 18 | Data & metrik | Abdullah (Back-End) |
| 19 | Hal yang belum ditentukan | Fatih |
| 20–22 | **Evaluasi diri PRD**, rencana berikutnya, penutup | Rizky |

Setiap pembicara menyerahkan giliran ke pembicara berikutnya, seperti presentasi sungguhan.
Naskah di `assets/js/content.js` juga bisa dipakai sebagai **teks latihan** presentasi langsung.

Semua isi diambil dari dokumen di folder `documents/`. Bagian **Evaluasi kami** dan
**Evaluasi diri** adalah masukan tambahan, bukan isi dokumen asli. Bagian ini ditulis dari
sudut pandang tim sebagai bahan diskusi dengan pembina.

## Cara kerja singkat

- **`content.js`** berisi data semua scene: jenis tampilan (`type`), pembicara, teks, dan `narration`.
- **`script.js`** membaca data itu, membuat tampilan tiap scene, lalu memutar `assets/audio/<id>.mp3`.
  Saat audio selesai, halaman pindah ke scene berikutnya.
- **Caption** dibagi per kalimat dan diselaraskan dengan posisi audio.
- **Gambar canvas**: kotak yang dibahas disorot. Di laptop gambar sedikit diperbesar ke kotak itu,
  sedangkan di tablet dan HP gambar di-zoom penuh ke kotak agar tulisannya terbaca.
- **Cadangan suara**: jika file MP3 tidak ada atau gagal diputar, halaman memakai suara
  bawaan browser (bahasa Indonesia). Jika browser tidak punya suara Indonesia,
  scene tetap berjalan dengan timer dan caption.
- Di layar kecil, scene yang panjang **digulir otomatis** mengikuti narasi.
  Auto-scroll berhenti jika penonton menggulir sendiri.

## Mengubah teks atau narasi

1. Buka `assets/js/content.js` dan ubah teks yang diinginkan.
   - Isinya harus **JSON valid**: pakai tanda kutip ganda `"..."`, tanpa koma di akhir daftar, dan tanpa komentar di dalam data.
2. Jika `narration` diubah, buat ulang audionya (lihat bagian berikut).
   Perubahan teks tampilan saja tidak perlu membuat ulang audio. Cukup refresh browser.

## Membuat ulang audio narasi

Narasi dibuat dengan **[edge-tts](https://github.com/rany2/edge-tts)**. Alat ini gratis dan tidak
butuh API key, tapi **perlu internet** saat membuat audio. Setiap pembicara punya suara sendiri,
yang diatur di bagian `speakers` pada `content.js`:

| Pembicara | Suara | Catatan |
|---|---|---|
| Rizky | `id-ID-ArdiNeural` | Suara asli Indonesia |
| Abdullah | `id-ID-ArdiNeural` (nada −10 Hz) | Variasi Ardi yang lebih berat |
| Fikri | `en-US-AndrewMultilingualNeural` | Multibahasa, mungkin sedikit berlogat |
| Fatih | `en-US-BrianMultilingualNeural` | Multibahasa |
| Dhimas | `en-AU-WilliamMultilingualNeural` | Multibahasa |
| Rayyan | `fr-FR-RemyMultilingualNeural` | Multibahasa |
| Zubiar | `it-IT-GiuseppeMultilingualNeural` | Multibahasa |

Kebutuhan: Python 3 dan edge-tts. Jalankan perintah dari folder `startup-video`:

```bash
python -m pip install -r tools/requirements.txt

python tools/generate_audio.py                      # hanya scene yang naskahnya berubah
python tools/generate_audio.py --only intro outro   # scene tertentu
python tools/generate_audio.py --force              # buat ulang semua
python tools/generate_audio.py --voice id-ID-ArdiNeural   # uji: satu suara untuk semua
```

- **Suara terdengar janggal?** Ganti nilai `voice` pembicara tersebut, misalnya menjadi
  `id-ID-ArdiNeural` dengan `pitch` berbeda (`-6Hz`, `+6Hz`), lalu jalankan skrip.
  Daftar semua suara: `python -m edge_tts --list-voices`.
- **Pengucapan istilah asing.** Bagian `pronunciation` di `content.js` mengganti kata hanya
  untuk suara Indonesia (Ardi). Caption tetap menampilkan tulisan asli.
  Contoh: `"Lean Canvas": "Lin Kanvas"`.
- **Suara asli anggota tim.** Rekam tiap bagian dan simpan dengan nama yang sama di
  `assets/audio/` (contoh: `revenue.mp3` untuk bagian Zubiar). Jangan jalankan skrip dengan
  `--force` setelahnya, karena perintah itu akan menimpa rekaman.
- **Koneksi terputus?** Skrip memakai IPv4 dan otomatis mencoba lagi. Scene yang tetap gagal
  cukup dibuat dengan menjalankan skrip sekali lagi; yang sudah jadi tidak dibuat ulang.

## Mengganti gambar canvas

Jika Lean Canvas direvisi, ekspor halaman PDF-nya menjadi PNG dan timpa
`assets/img/lean-canvas.png`. Jika tata letak kotaknya berubah, sesuaikan nilai `rect`
(posisi x, y, lebar, tinggi dalam persen) pada `canvasBlocks` di `content.js`.

## Kompatibilitas

- Browser modern: Edge, Chrome, Firefox, Safari (versi 2023 ke atas).
- Responsive dan sudah diuji di: laptop 1366×768 dan 1280×680, tablet 1024×768 dan 768×1024,
  HP 390×844 dan 360×740, serta HP landscape 844×390.
- Animasi dikurangi jika pengaturan *reduce motion* di perangkat aktif.
- **Jadi video MP4:** putar *Mulai presentasi* dalam layar penuh (`F11`), lalu rekam dengan
  Xbox Game Bar (`Win + G`) di Windows atau perekam layar lain.

## Tim

| Peran | Nama |
|---|---|
| Ketua | Muhammad Rizky Adnan |
| System Analyst | Muhammad Fikri Alfarisi, Muhammad Al Fatih Arham |
| Keuangan | Zubiar |
| Staf Administrasi | Ardiansyah Razaq Harahab |
| UI/UX Designer | Muh. Al Ghazali, Kaysan Rakha Hardian |
| Front-End | Andi Rezki Fadel Ilahi, Dihyah Ibnu Arafat |
| Back-End | Abdullah Ahmad Irsyad, Mario Habib Maulana |
| Content Creator | M. Nur Athallah Syahrir, Zaky Nur Afham |
| Marketing | Dhimas Lanang Ragil Hidayah, Rayyan Elnazavi Parerung |

Pembina: **Ustadz Izhar**.

Template Lean Canvas pada dokumen asli diadaptasi dari *The Business Model Canvas* (CC BY-SA 3.0).
