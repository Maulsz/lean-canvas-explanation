/* =========================================================
   Lean Canvas & PRD Explainer — logika presentasi
   - Merender scene dari content.js
   - Navigasi: tombol, keyboard, swipe, progress bar
   - Narasi: audio/<id>.mp3 → cadangan suara browser → cadangan timer
   ========================================================= */
(() => {
  'use strict';

  const DATA = window.EXPLAINER;
  if (!DATA || !Array.isArray(DATA.scenes)) {
    document.getElementById('stage').innerHTML =
      '<p style="padding:24px">content.js tidak terbaca. Periksa apakah isinya JSON yang valid.</p>';
    return;
  }

  const scenes = DATA.scenes;
  const blocks = DATA.canvasBlocks;
  const blockByKey = Object.fromEntries(blocks.map(b => [b.key, b]));
  const sceneIndexById = Object.fromEntries(scenes.map((s, i) => [s.id, i]));
  const blockSceneId = Object.fromEntries(
    scenes.filter(s => s.type === 'block').map(s => [s.block, s.id])
  );

  const $ = id => document.getElementById(id);
  const app = $('app'), stage = $('stage'), caption = $('caption');
  const counter = $('counter'), sectionLabel = $('sectionLabel'), progress = $('progress');
  const playBtn = $('playBtn'), prevBtn = $('prevBtn'), nextBtn = $('nextBtn');
  const muteBtn = $('muteBtn'), ccBtn = $('ccBtn'), audio = $('voice');
  const speakerEl = $('speaker'), speakerAvatar = $('speakerAvatar');
  const speakerName = $('speakerName'), speakerRole = $('speakerRole');
  const speakers = DATA.speakers || {};

  document.documentElement.style.setProperty('--canvas-ratio', DATA.meta.canvasRatio || 1.444);

  const initials = name => name.replace(/[^\p{L}\s]/gu, ' ').trim().split(/\s+/)
    .filter(w => w.length > 1).slice(0, 2).map(w => w[0].toUpperCase()).join('');

  let currentSpeaker = null;
  function setSpeaker(id) {
    const sp = speakers[id];
    speakerEl.hidden = !sp;
    if (!sp || id === currentSpeaker) return;
    currentSpeaker = id;
    speakerEl.classList.remove('swap-in');
    void speakerEl.offsetWidth;
    speakerEl.classList.add('swap-in');
    speakerAvatar.textContent = initials(sp.name);
    speakerAvatar.dataset.speaker = id;
    speakerName.textContent = sp.name;
    speakerRole.textContent = sp.role;
  }

  const ADVANCE_DELAY = 900;      // jeda (ms) sebelum pindah scene
  const CHARS_PER_SEC = 15;       // perkiraan kecepatan bicara untuk mode timer

  /* ---------- Util ---------- */

  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // "Judul — penjelasan" → <strong>Judul</strong> — penjelasan
  const rich = s => {
    const i = String(s).indexOf(' — ');
    if (i < 0) return esc(s);
    return `<strong>${esc(s.slice(0, i))}</strong> — ${esc(s.slice(i + 3))}`;
  };

  const markTbd = s => esc(s).replace(/\[Belum ditentukan\]/g, '<span class="tbd">[Belum ditentukan]</span>');

  const splitSentences = text => {
    const parts = String(text).match(/[^.!?]+[.!?]+["”’)]*\s*|[^.!?]+$/g) || [text];
    return parts.map(p => p.trim()).filter(Boolean);
  };

  const pronunciation = Object.entries(DATA.pronunciation || {})
    .sort((a, b) => b[0].length - a[0].length)
    .map(([src, dst]) => [
      new RegExp('(^|[^\\p{L}\\p{N}_])' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\p{N}_])', 'gu'),
      dst
    ]);
  const speakable = text => pronunciation.reduce((t, [re, dst]) => t.replace(re, (m, p) => p + dst), text);

  /* ---------- Render ---------- */

  const head = s => `
    <div class="scene-head">
      ${s.kicker ? `<p class="kicker r">${esc(s.kicker)}</p>` : ''}
      <h2 class="title r">${esc(s.title)}</h2>
      ${s.lead ? `<p class="lead r">${esc(s.lead)}</p>` : ''}
    </div>`;

  // Gambar Lean Canvas asli (dari PDF) dengan area yang bisa diklik.
  // mode 'block'  : kotak aktif disorot, sisanya diredupkan, zoom pelan ke kotak
  // mode 'intro'  : nomor 1–9 muncul berurutan di atas tiap kotak
  // mode 'summary': semua kotak bisa diklik
  const canvasFigure = (mode, activeKey) => {
    const active = activeKey ? blockByKey[activeKey] : null;
    let vars = '--origin:50% 50%';
    if (active) {
      const [x, y, w, h] = active.rect;
      const cx = x + w / 2, cy = y + h / 2;
      // Zoom penuh ke kotak (dipakai di layar kecil): kotak mengisi ~90% bingkai
      const s = Math.min(3, Math.min(100 / w, 100 / h) * 0.9);
      const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
      const tx = clamp(50 - s * cx, 100 - 100 * s, 0);
      const ty = clamp(50 - s * cy, 100 - 100 * s, 0);
      vars = `--origin:${cx}% ${cy}%;--zs:${s.toFixed(3)};--ztx:${tx.toFixed(2)}%;--zty:${ty.toFixed(2)}%`;
    }
    const spots = blocks.map(b => {
      const cur = b.key === activeKey;
      const [x, y, w, h] = b.rect;
      return `<button type="button" class="spot-area${cur ? ' is-current' : ''}"
        style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"
        data-goto="${esc(blockSceneId[b.key])}" title="${b.num}. ${esc(b.name)}"
        aria-label="${b.num}. ${esc(b.name)}"${cur ? ' aria-current="true"' : ''}>
        ${mode === 'intro' ? `<span class="spot-badge r" data-d="${b.num + 3}">${b.num}</span>` : ''}
      </button>`;
    }).join('');
    return `
      <figure class="canvas-fig canvas-${mode}${active ? ' has-focus' : ''} r" style="${vars}">
        <div class="canvas-zoom">
          <img src="${esc(DATA.meta.canvasImage)}" alt="Lean Canvas asli tim" draggable="false">
          ${spots}
        </div>
      </figure>`;
  };

  const check = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  const renderers = {
    hero: s => `
      <div class="hero">
        <div>
          <p class="kicker r">${esc(s.kicker)}</p>
          <h1 class="display r">${esc(s.title)}</h1>
          <p class="lead r">${esc(s.subtitle)}</p>
          <ul class="meta r">${(s.meta || []).map(m => `<li>${esc(m)}</li>`).join('')}</ul>
        </div>
        ${s.radar ? `
        <div class="radar r" aria-hidden="true">
          <span class="ring"></span><span class="ring"></span><span class="ring"></span>
          <span class="spot" style="left:22%;top:30%"></span>
          <span class="spot" style="left:70%;top:24%"></span>
          <span class="spot" style="left:64%;top:72%"></span>
          <span class="spot" style="left:28%;top:68%"></span>
          <span class="pin"></span>
          <span class="radar-label">radius 1–5 km</span>
        </div>` : ''}
      </div>`,

    team: s => `
      ${head(s)}
      <div class="team-grid">
        ${s.groups.map(g => `
          <div class="card team-card r${g.lead ? ' lead-card' : ''}">
            <h3>${esc(g.role)}</h3>
            ${g.names.map(n => `<p>${esc(n)}</p>`).join('')}
          </div>`).join('')}
      </div>`,

    'canvas-intro': s => `${head(s)}<div class="canvas-full">${canvasFigure('intro')}</div>`,

    'canvas-summary': s => `
      ${head(s)}
      <div class="summary-grid">
        ${canvasFigure('summary')}
        <ol class="sum-list">
          ${blocks.map(b => `
            <li class="r"><button type="button" data-goto="${esc(blockSceneId[b.key])}">
              <span class="sum-num">${b.num}</span>
              <span><strong>${esc(b.name)}</strong><small>${esc(s.summaries[b.key] || '')}</small></span>
            </button></li>`).join('')}
        </ol>
      </div>`,

    block: s => {
      const b = blockByKey[s.block];
      const groups = s.groups.map(g => {
        let body;
        if (g.quote) body = `<p class="quote">${esc(g.quote)}</p>`;
        else if (g.chips) body = `<div class="chips">${g.items.map(i => `<span class="chip">${esc(i)}</span>`).join('')}</div>`;
        else body = `<ul class="ticks">${g.items.map(i => `<li${g.struck ? ' class="struck"' : ''}>${rich(i)}</li>`).join('')}</ul>`;
        return `<div class="card r"><h3>${esc(g.label)}</h3>${body}</div>`;
      }).join('');
      return `
        <div class="block-scene">
          <div class="block-head">
            <p class="kicker r">Lean Canvas · Kotak ${b.num} dari 9</p>
            <h2 class="title block-title r"><span class="big-num">${b.num}</span><span>${esc(b.name)}</span></h2>
            <p class="block-q r"><strong>${esc(b.label)}</strong> — ${esc(s.question)}</p>
            ${canvasFigure('block', s.block)}
          </div>
          <div class="block-body">
            ${groups}
            ${s.note ? `<aside class="note r"><span class="note-tag">Evaluasi kami</span><span>${esc(s.note)}</span></aside>` : ''}
          </div>
        </div>`;
    },

    critique: s => `
      ${head(s)}
      <div class="strengths">
        ${s.strengthsLabel ? `<span class="strengths-label r">${esc(s.strengthsLabel)}</span>` : ''}
        ${s.strengths.map(t => `<span class="strength r">${check}${esc(t)}</span>`).join('')}
      </div>
      <div class="issues">
        ${s.issues.map((it, i) => `
          <article class="card issue r">
            <span class="issue-num">${i + 1}</span>
            <h4>${esc(it.title)}</h4>
            <p>${esc(it.detail)}</p>
          </article>`).join('')}
      </div>`,

    section: s => `
      ${head(s)}
      <ul class="points">
        ${s.points.map(p => `<li class="card r">${markTbd(p)}</li>`).join('')}
      </ul>`,

    list: s => `
      ${head(s)}
      <ol class="numbered">
        ${s.items.map(i => `<li class="r">${esc(i)}</li>`).join('')}
      </ol>`,

    features: s => `
      ${head(s)}
      <div class="features">
        <p class="row-label r">Fitur inti</p>
        <div class="feature-row">
          ${s.core.map(f => `
            <div class="card feature core r">
              <span class="f-id">${esc(f.id)}</span>
              <h4>${esc(f.name)}</h4>
              <p>${esc(f.desc)}</p>
            </div>`).join('')}
        </div>
        <p class="row-label r">Fitur pendukung</p>
        <div class="feature-row support">
          ${s.support.map(f => `
            <div class="card feature small r">
              <span class="f-id">${esc(f.id)}</span>
              <h4>${esc(f.name)}</h4>
            </div>`).join('')}
        </div>
        <div class="out-scope r">
          <span class="row-label" style="margin:0">Di luar lingkup</span>
          ${s.outOfScope.map(o => `<span class="chip">${esc(o)}</span>`).join('')}
        </div>
      </div>`,

    data: s => `
      ${head(s)}
      <div class="data-grid">
        <div class="card r">
          <h3>Kebutuhan data</h3>
          <div class="table-wrap"><table>
            <thead><tr><th>Entitas</th><th>Atribut</th></tr></thead>
            <tbody>${s.entities.map(e => `<tr><td>${esc(e.name)}</td><td>${esc(e.attrs)}</td></tr>`).join('')}</tbody>
          </table></div>
        </div>
        <div class="card r">
          <h3>Metrik keberhasilan</h3>
          <div class="table-wrap"><table>
            <thead><tr><th>Metrik</th><th>Target</th></tr></thead>
            <tbody>${s.metrics.map(m => `<tr><td>${esc(m.name)}</td><td class="tbd">${esc(m.target)}</td></tr>`).join('')}</tbody>
          </table></div>
        </div>
      </div>`,

    chips: s => `
      ${head(s)}
      <div class="big-chips">
        ${s.items.map(i => `<span class="chip r">${esc(i)}</span>`).join('')}
      </div>`,

    steps: s => `
      ${head(s)}
      <div class="steps">
        ${s.items.map((it, i) => `
          <div class="card step r">
            <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
            <p>${esc(it.text)}</p>
            <span class="role-tag">${esc(it.role)}</span>
          </div>`).join('')}
      </div>`
  };

  const sceneEls = scenes.map((s, i) => {
    const el = document.createElement('section');
    el.className = `scene scene-${s.type}`;
    el.id = `scene-${s.id}`;
    el.setAttribute('aria-label', s.title || (blockByKey[s.block] || {}).name || s.id);
    el.inert = true;
    const render = renderers[s.type];
    el.innerHTML = `<div class="scene-inner">${render ? render(s) : ''}</div>`;
    el.querySelectorAll('.r').forEach((r, k) => r.style.setProperty('--d', r.dataset.d || k));
    stage.appendChild(el);
    return el;
  });

  const segEls = scenes.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'seg';
    const label = s.title || (blockByKey[s.block] || {}).name || s.id;
    b.title = `${i + 1}. ${label}`;
    b.setAttribute('aria-label', `Bagian ${i + 1}: ${label}`);
    b.innerHTML = '<span></span>';
    b.addEventListener('click', () => goTo(i));
    progress.appendChild(b);
    return b;
  });

  /* ---------- State ---------- */

  const state = {
    index: 0,
    playing: false,
    muted: false,
    captions: true,
    token: 0,          // naik setiap narasi baru; callback lama diabaikan
    mode: null,        // 'audio' | 'speech' | 'timer' | null
    sentences: [],
    cum: [],           // batas kumulatif tiap kalimat (0..1)
    sentenceIdx: -1,
    userScrolled: false,
    timer: { elapsed: 0, duration: 0, last: 0 },
    raf: 0,
    advance: 0
  };

  /* ---------- Caption & progress ---------- */

  function prepareSentences(text) {
    state.sentences = splitSentences(text);
    const total = state.sentences.reduce((a, s) => a + s.length, 0) || 1;
    let acc = 0;
    state.cum = state.sentences.map(s => (acc += s.length) / total);
    state.sentenceIdx = -1;
  }

  function setCaption(i) {
    if (i === state.sentenceIdx) return;
    state.sentenceIdx = i;
    const text = state.sentences[i] || '';
    caption.classList.add('swap');
    requestAnimationFrame(() => {
      caption.textContent = text;
      caption.classList.remove('swap');
    });
  }

  const sentenceAt = ratio => {
    const i = state.cum.findIndex(c => ratio < c);
    return i < 0 ? state.sentences.length - 1 : i;
  };

  function setSceneProgress(p) {
    segEls.forEach((seg, i) => {
      const v = i < state.index ? 1 : i > state.index ? 0 : Math.max(0, Math.min(1, p));
      seg.firstChild.style.setProperty('--p', v);
    });
  }

  function onRatio(ratio) {
    setSceneProgress(ratio);
    setCaption(sentenceAt(ratio));
    autoScroll(ratio);
  }

  // Scene yang lebih tinggi dari layar (mis. di HP) digulir pelan mengikuti narasi,
  // kecuali penonton sudah menggulir sendiri.
  function autoScroll(ratio) {
    const el = sceneEls[state.index];
    if (!state.playing || state.userScrolled) return;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 4) return;
    const t = Math.min(1, Math.max(0, (ratio - 0.12) / 0.7));
    const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    el.scrollTop = max * eased;
  }

  /* ---------- Narasi ---------- */

  function stopNarration() {
    state.token++;
    cancelAnimationFrame(state.raf);
    clearTimeout(state.advance);
    if (!audio.paused) audio.pause();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    state.mode = null;
  }

  function startNarration() {
    stopNarration();
    const tok = state.token;
    prepareSentences(scenes[state.index].narration || '');
    setCaption(0);
    setSceneProgress(0);
    if (!state.playing) return;

    state.mode = 'audio';
    audio.muted = state.muted;
    audio.src = `${DATA.meta.audioDir || 'assets/audio'}/${scenes[state.index].id}.mp3`;
    const p = audio.play();
    if (p && p.catch) p.catch(err => {
      if (err && err.name === 'AbortError') return;
      if (tok === state.token && state.mode === 'audio') fallback(tok, 0);
    });
    loop(tok);
  }

  // Dipanggil saat file MP3 tidak ada / gagal diputar
  function fallback(tok, fromSentence) {
    if (tok !== state.token) return;
    if (!state.muted && pickVoice()) speakFrom(tok, fromSentence);
    else runTimer(tok, fromSentence);
  }

  audio.addEventListener('error', () => {
    if (state.mode === 'audio' && state.playing) fallback(state.token, 0);
  });
  audio.addEventListener('ended', () => {
    if (state.mode === 'audio') sceneDone(state.token);
  });

  function loop(tok) {
    cancelAnimationFrame(state.raf);
    const step = now => {
      if (tok !== state.token) return;
      if (state.mode === 'audio' && audio.duration > 0) {
        onRatio(audio.currentTime / audio.duration);
      } else if (state.mode === 'timer' && state.playing) {
        const t = state.timer;
        t.elapsed += (now - t.last) / 1000;
        t.last = now;
        const r = t.elapsed / t.duration;
        onRatio(Math.min(r, 1));
        if (r >= 1) return sceneDone(tok);
      }
      state.raf = requestAnimationFrame(step);
    };
    state.raf = requestAnimationFrame(step);
  }

  function runTimer(tok, fromSentence) {
    if (tok !== state.token) return;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const chars = state.sentences.reduce((a, s) => a + s.length, 0);
    state.mode = 'timer';
    state.timer.duration = Math.max(4, chars / CHARS_PER_SEC);
    state.timer.elapsed = (fromSentence > 0 ? state.cum[fromSentence - 1] : 0) * state.timer.duration;
    state.timer.last = performance.now();
    loop(tok);
  }

  let voices = [];
  const loadVoices = () => { voices = 'speechSynthesis' in window ? speechSynthesis.getVoices() : []; };
  if ('speechSynthesis' in window) {
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  function pickVoice() {
    const id = voices.filter(v => /^id([-_]|$)/i.test(v.lang));
    return id.find(v => /ardi/i.test(v.name)) || id.find(v => /male|pria|laki/i.test(v.name)) || id[0] || null;
  }

  function speakFrom(tok, i) {
    if (tok !== state.token) return;
    if (i >= state.sentences.length) return sceneDone(tok);
    state.mode = 'speech';
    setCaption(i);
    setSceneProgress(i / state.sentences.length);
    autoScroll(i / state.sentences.length);
    const u = new SpeechSynthesisUtterance(speakable(state.sentences[i]));
    u.lang = 'id-ID';
    u.voice = pickVoice();
    u.rate = 1.05;
    u.onend = () => { if (tok === state.token && state.mode === 'speech' && state.playing) speakFrom(tok, i + 1); };
    u.onerror = e => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      runTimer(tok, i);
    };
    speechSynthesis.speak(u);
  }

  function sceneDone(tok) {
    if (tok !== state.token) return;
    cancelAnimationFrame(state.raf);
    setSceneProgress(1);
    setCaption(state.sentences.length - 1);
    if (!state.playing) return;
    if (state.index < scenes.length - 1) {
      state.advance = setTimeout(() => { if (tok === state.token) goTo(state.index + 1); }, ADVANCE_DELAY);
    } else {
      setPlaying(false, { keepPosition: true });
    }
  }

  /* ---------- Kontrol ---------- */

  function setPlaying(on, { keepPosition = false } = {}) {
    state.playing = on;
    app.classList.toggle('is-playing', on);
    playBtn.setAttribute('aria-label', on ? 'Jeda' : 'Putar');

    if (keepPosition) { stopNarration(); return; }

    if (on) {
      if (state.mode === 'audio' && audio.src && audio.paused && !audio.ended && audio.currentTime > 0) {
        audio.play().catch(() => fallback(state.token, state.sentenceIdx));
        loop(state.token);
      } else if (state.mode === 'speech') {
        speakFrom(state.token, Math.max(0, state.sentenceIdx));
      } else if (state.mode === 'timer') {
        state.timer.last = performance.now();
        loop(state.token);
      } else {
        startNarration();
      }
    } else {
      clearTimeout(state.advance);
      if (state.mode === 'audio') audio.pause();
      if (state.mode === 'speech') {
        // cancel memicu onerror 'interrupted' (diabaikan); lanjut dari kalimat yang sama
        const tok = ++state.token;
        speechSynthesis.cancel();
        state.token = tok;
      }
      cancelAnimationFrame(state.raf);
    }
  }

  function setMuted(on) {
    state.muted = on;
    app.classList.toggle('is-muted', on);
    muteBtn.setAttribute('aria-pressed', String(on));
    muteBtn.setAttribute('aria-label', on ? 'Nyalakan suara' : 'Matikan suara');
    audio.muted = on;
    if (state.playing && state.mode === 'speech' && on) {
      const i = Math.max(0, state.sentenceIdx);
      state.token++;
      speechSynthesis.cancel();
      runTimer(state.token, i);
    }
  }

  function setCaptions(on) {
    state.captions = on;
    ccBtn.setAttribute('aria-pressed', String(on));
    caption.classList.toggle('is-hidden', !on);
  }

  function goTo(i) {
    i = Math.max(0, Math.min(scenes.length - 1, i));
    const prev = sceneEls[state.index];
    state.index = i;
    const el = sceneEls[i];

    sceneEls.forEach(s => { if (s !== el) { s.classList.remove('is-active'); s.inert = true; } });
    if (prev === el) { el.classList.remove('is-active'); void el.offsetWidth; }
    el.inert = false;
    el.scrollTop = 0;
    state.userScrolled = false;
    el.classList.add('is-active');

    const s = scenes[i];
    counter.textContent = `${i + 1} / ${scenes.length}`;
    sectionLabel.textContent = s.section || '';
    setSpeaker(s.speaker);
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === scenes.length - 1;
    try { history.replaceState(null, '', `#${s.id}`); } catch (e) { /* file:// di beberapa browser */ }

    startNarration();
  }

  /* ---------- Event ---------- */

  prevBtn.addEventListener('click', () => goTo(state.index - 1));
  nextBtn.addEventListener('click', () => goTo(state.index + 1));
  playBtn.addEventListener('click', () => {
    // Selesai di scene terakhir → tombol putar mengulang dari awal
    if (!state.playing && state.index === scenes.length - 1 && state.mode === null &&
        state.sentenceIdx === state.sentences.length - 1 && state.sentences.length > 1) {
      setPlaying(true, { keepPosition: true });
      return goTo(0);
    }
    setPlaying(!state.playing);
  });
  muteBtn.addEventListener('click', () => setMuted(!state.muted));
  ccBtn.addEventListener('click', () => setCaptions(!state.captions));

  stage.addEventListener('click', e => {
    const t = e.target.closest('[data-goto]');
    if (t && t.dataset.goto in sceneIndexById) goTo(sceneIndexById[t.dataset.goto]);
  });

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!$('start').classList.contains('is-gone')) return;
    const tag = (e.target.tagName || '').toLowerCase();
    const onButton = tag === 'button';
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': goTo(state.index + 1); break;
      case 'ArrowLeft': case 'PageUp': goTo(state.index - 1); break;
      case 'Home': goTo(0); break;
      case 'End': goTo(scenes.length - 1); break;
      case ' ': case 'k': case 'K':
        if (onButton && e.key === ' ') return; // biarkan tombol yang fokus bekerja normal
        setPlaying(!state.playing); break;
      case 'm': case 'M': setMuted(!state.muted); break;
      case 'c': case 'C': setCaptions(!state.captions); break;
      default: return;
    }
    e.preventDefault();
  });

  const markUserScroll = () => { state.userScrolled = true; };
  stage.addEventListener('wheel', markUserScroll, { passive: true });
  stage.addEventListener('touchmove', markUserScroll, { passive: true });
  stage.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) markUserScroll();
  });

  let touch = null;
  stage.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (!touch) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x, dy = t.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(state.index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Jeda saat tab disembunyikan agar audio tidak berjalan di latar
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.playing) setPlaying(false);
  });

  /* ---------- Mulai ---------- */

  const startEl = $('start');
  const begin = autoplay => {
    startEl.classList.add('is-gone');
    state.playing = autoplay;
    app.classList.toggle('is-playing', autoplay);
    const fromHash = sceneIndexById[decodeURIComponent(location.hash.slice(1))];
    goTo(fromHash !== undefined ? fromHash : 0);
    (autoplay ? playBtn : nextBtn).focus({ preventScroll: true });
  };
  $('startPlay').addEventListener('click', () => begin(true));
  $('startManual').addEventListener('click', () => begin(false));

  // Tampilkan scene pertama di belakang overlay
  sceneEls[0].classList.add('is-active');
  sceneEls[0].inert = false;
  counter.textContent = `1 / ${scenes.length}`;
  prevBtn.disabled = true;
  setSpeaker(scenes[0].speaker);
  setSceneProgress(0);
  setCaptions(true);
})();
