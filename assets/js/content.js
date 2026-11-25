/*
 * Semua teks tampilan, pembicara, dan naskah dialog ada di file ini.
 * PENTING: isi di antara kurung kurawal harus JSON valid (tanda kutip ganda,
 * tanpa koma di akhir, tanpa komentar), karena generate_audio.py ikut membacanya.
 * Setelah mengubah "narration" atau suara pembicara, jalankan: python tools/generate_audio.py
 */
window.EXPLAINER = {
  "meta": {
    "title": "Presentasi Lean Canvas & PRD — Platform Pencarian & Pemesanan Lapangan Olahraga",
    "school": "SMKIT Ibnul Qayyim Makassar · Angkatan 5 · PPLG/RPL",
    "canvasImage": "assets/img/lean-canvas.png",
    "audioDir": "assets/audio",
    "canvasRatio": 1.444
  },

  "speakers": {
    "rizky":    { "name": "Muhammad Rizky Adnan",       "short": "Rizky",    "role": "Ketua",          "voice": "id-ID-ArdiNeural",                "rate": "+6%", "pitch": "+0Hz" },
    "fikri":    { "name": "Muhammad Fikri Alfarisi",    "short": "Fikri",    "role": "System Analyst", "voice": "en-US-AndrewMultilingualNeural",  "rate": "+4%", "pitch": "+0Hz" },
    "fatih":    { "name": "Muhammad Al Fatih Arham",    "short": "Fatih",    "role": "System Analyst", "voice": "en-US-BrianMultilingualNeural",   "rate": "+4%", "pitch": "+0Hz" },
    "dhimas":   { "name": "Dhimas Lanang Ragil Hidayah", "short": "Dhimas",  "role": "Marketing",      "voice": "en-AU-WilliamMultilingualNeural", "rate": "+4%", "pitch": "+0Hz" },
    "rayyan":   { "name": "Rayyan Elnazavi Parerung",   "short": "Rayyan",   "role": "Marketing",      "voice": "fr-FR-RemyMultilingualNeural",    "rate": "+4%", "pitch": "+0Hz" },
    "zubiar":   { "name": "Zubiar",                     "short": "Zubiar",   "role": "Keuangan",       "voice": "it-IT-GiuseppeMultilingualNeural", "rate": "+4%", "pitch": "+0Hz" },
    "abdullah": { "name": "Abdullah Ahmad Irsyad",      "short": "Abdullah", "role": "Back-End",       "voice": "id-ID-ArdiNeural",                "rate": "+2%", "pitch": "-10Hz" }
  },

  "pronunciation": {
    "Lean Canvas": "Lin Kanvas",
    "PRD": "pe er de",
    "user story": "yuser stori",
    "front-end": "fron en",
    "back-end": "bek en",
    "D’ Bolana": "De Bolana",
    "Tirta53": "Tirta lima tiga"
  },

  "canvasBlocks": [
    { "key": "problem",   "num": 1, "name": "Problem",                  "label": "Masalah",                 "rect": [2.4, 11.12, 19.0, 55.66] },
    { "key": "segments",  "num": 2, "name": "Customer Segments",        "label": "Segmen Pelanggan",        "rect": [78.53, 11.12, 19.07, 55.66] },
    { "key": "uvp",       "num": 3, "name": "Unique Value Proposition", "label": "Nilai Unik",              "rect": [40.47, 11.12, 19.0, 55.66] },
    { "key": "solution",  "num": 4, "name": "Solution",                 "label": "Solusi",                  "rect": [21.4, 11.12, 19.07, 27.4] },
    { "key": "channels",  "num": 5, "name": "Channels",                 "label": "Saluran",                 "rect": [59.47, 38.52, 19.07, 28.26] },
    { "key": "revenue",   "num": 6, "name": "Revenue Streams",          "label": "Arus Pendapatan",         "rect": [50.03, 66.78, 47.57, 26.58] },
    { "key": "cost",      "num": 7, "name": "Cost Structure",           "label": "Struktur Biaya",          "rect": [2.4, 66.78, 47.63, 26.58] },
    { "key": "metrics",   "num": 8, "name": "Key Metrics",              "label": "Metrik Kunci",            "rect": [21.4, 38.52, 19.07, 28.26] },
    { "key": "advantage", "num": 9, "name": "Unfair Advantage",         "label": "Keunggulan Sulit Ditiru", "rect": [59.47, 11.12, 19.07, 27.4] }
  ],

  "scenes": [
    {
      "id": "intro",
      "type": "hero",
      "section": "Pembuka",
      "speaker": "rizky",
      "kicker": "SMKIT Ibnul Qayyim Makassar · Angkatan 5 · PPLG/RPL",
      "title": "Cari lapangan olahraga terdekat, cukup dari satu website.",
      "subtitle": "Presentasi Lean Canvas & PRD kepada Ustadz Izhar selaku Pembina",
      "meta": ["Nama produk: segera hadir", "Lean Canvas v1.0 · 30/10/2026", "PRD v0.1"],
      "radar": true,
      "narration": "Assalamualaikum warahmatullahi wabarakatuh. Yang kami hormati, Ustadz Izhar selaku pembina kami. Pernahkah kita ingin bermain futsal atau badminton, tapi bingung mencari lapangan yang dekat, jelas aturannya, dan bisa langsung dipesan? Dari masalah itulah ide startup kami lahir. Hari ini, kami dari angkatan kelima jurusan PPLG akan mempresentasikan Lean Canvas dan PRD kami."
    },
    {
      "id": "tim",
      "type": "team",
      "section": "Pembuka",
      "speaker": "rizky",
      "kicker": "Perkenalan Tim",
      "title": "Lima belas orang, satu tujuan.",
      "groups": [
        { "role": "Ketua", "names": ["Muhammad Rizky Adnan"], "lead": true },
        { "role": "System Analyst", "names": ["Muhammad Fikri Alfarisi", "Muhammad Al Fatih Arham"] },
        { "role": "Keuangan", "names": ["Zubiar"] },
        { "role": "Staf Administrasi", "names": ["Ardiansyah Razaq Harahab"] },
        { "role": "UI/UX Designer", "names": ["Muh. Al Ghazali", "Kaysan Rakha Hardian"] },
        { "role": "Front-End", "names": ["Andi Rezki Fadel Ilahi", "Dihyah Ibnu Arafat"] },
        { "role": "Back-End", "names": ["Abdullah Ahmad Irsyad", "Mario Habib Maulana"] },
        { "role": "Content Creator", "names": ["M. Nur Athallah Syahrir", "Zaky Nur Afham"] },
        { "role": "Marketing", "names": ["Dhimas Lanang Ragil Hidayah", "Rayyan Elnazavi Parerung"] }
      ],
      "narration": "Perkenalkan, saya Muhammad Rizky Adnan, ketua tim. Saya bersama empat belas rekan dengan peran masing-masing: analis sistem, keuangan, administrasi, desain antarmuka, front-end, back-end, kreator konten, dan pemasaran. Lima belas orang, satu tujuan."
    },
    {
      "id": "canvas-intro",
      "type": "canvas-intro",
      "section": "Lean Canvas",
      "speaker": "rizky",
      "kicker": "Bagian 1",
      "title": "Lean Canvas kami",
      "lead": "Ringkasan model bisnis dalam satu halaman: sembilan kotak, dibahas sesuai nomornya.",
      "narration": "Kami mulai dari Lean Canvas, yaitu ringkasan model bisnis kami dalam satu halaman. Ada sembilan kotak, dan kami akan membahasnya sesuai nomor. Kotak pertama, yaitu masalah, akan dijelaskan oleh rekan saya, Fikri, selaku system analyst."
    },
    {
      "id": "problem",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "fikri",
      "block": "problem",
      "question": "Masalah apa yang ingin kami selesaikan?",
      "groups": [
        { "label": "User", "items": [
          "Sulit mencari alternatif lapangan lain",
          "Fasilitas dan peraturan lapangan tidak tertulis atau tidak dipaparkan dengan jelas",
          "Sulit menemukan ulasan dari penyewa sebelumnya",
          "Tidak tahu jam operasional lapangan"
        ] },
        { "label": "Owner Lapangan", "items": [
          "Sulit mempromosikan lapangan, terutama yang lokasinya agak ke pelosok"
        ] },
        { "label": "Alternatif saat ini", "items": ["Ayo.co.id", "gelora.id", "sporto.id", "WhatsApp"], "chips": true }
      ],
      "note": "Masalah ini belum kami buktikan lewat wawancara atau survei, dan belum kami urutkan mana yang paling penting.",
      "narration": "Terima kasih, Rizky. Ustadz Izhar, kami menemukan empat masalah di sisi pemain: sulit mencari lapangan alternatif, fasilitas dan aturan lapangan tidak jelas, tidak ada ulasan dari penyewa sebelumnya, dan jam buka pun tidak diketahui. Di sisi pemilik, terutama yang lokasinya di pelosok, lapangan sulit dipromosikan. Selama ini, orang mengandalkan Ayo, Gelora, Sporto, atau sekadar WhatsApp. Selanjutnya, Dhimas akan menjelaskan siapa pelanggan kami."
    },
    {
      "id": "segments",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "dhimas",
      "block": "segments",
      "question": "Siapa pelanggan kami?",
      "groups": [
        { "label": "User", "items": ["Pelajar dan mahasiswa", "Komunitas olahraga dan tim amatir", "Masyarakat yang ingin menyewa lapangan"] },
        { "label": "Owner Lapangan", "items": ["Pemilik atau pengelola lapangan"] },
        { "label": "Early adopters — User", "items": ["Warga / Keluarga Iqis", "Developer yang suka berolahraga"], "chips": true },
        { "label": "Early adopters — Owner", "items": ["GOR Badminton ZIv", "Goaria Futsal", "D’ Bolana", "Tirta53", "Pago"], "chips": true }
      ],
      "note": "Calon mitra lapangan sudah jelas namanya, tapi segmen “masyarakat yang ingin menyewa lapangan” masih terlalu luas.",
      "narration": "Terima kasih, Fikri. Pelanggan kami ada dua sisi. Sisi pemain: pelajar, mahasiswa, komunitas olahraga, dan masyarakat yang ingin menyewa lapangan. Sisi pemilik: pengelola lapangan. Kami juga sudah punya calon pengguna awal, yaitu warga Iqis dan developer yang suka berolahraga, serta lima lapangan: GOR Badminton Ziv, Goaria Futsal, D’ Bolana, Tirta53, dan Pago."
    },
    {
      "id": "uvp",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "rizky",
      "block": "uvp",
      "question": "Kenapa orang harus memilih produk kami?",
      "groups": [
        { "label": "Unique Value Proposition", "quote": "Satu website untuk menemukan, membandingkan, dan memesan lapangan olahraga dengan lebih mudah." },
        { "label": "High-Level Concept", "quote": "“Traveloka untuk lapangan olahraga terdekat” — cari info jelas, cek ulasan, dan pesan lapangan di sekitarmu dalam satu tempat." }
      ],
      "note": "Analogi “Traveloka” mudah dipahami, tapi kata “lebih mudah” belum membedakan kami dari pesaing yang menawarkan hal serupa.",
      "narration": "Lalu, apa yang membuat kami berbeda? Nilai unik kami adalah satu website untuk menemukan, membandingkan, dan memesan lapangan olahraga dengan lebih mudah. Singkatnya, kami ingin menjadi Traveloka untuk lapangan olahraga terdekat. Bagaimana caranya, akan dijelaskan oleh Fatih."
    },
    {
      "id": "solution",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "fatih",
      "block": "solution",
      "question": "Bagaimana kami menyelesaikan masalahnya?",
      "groups": [
        { "label": "Fitur kunci", "items": [
          "Pencarian berbasis radius — rekomendasi lapangan terdekat secara otomatis dalam jangkauan 1–5 km",
          "Profil lapangan komprehensif — fasilitas, jam operasional, dan peraturan tertulis dengan jelas",
          "Sistem ulasan terbuka — rating bintang dan feedback yang bisa dilihat semua pengguna"
        ] }
      ],
      "note": "Setiap solusi menjawab masalah user, tapi masalah owner (sulit promosi) belum punya solusi langsung di kotak ini.",
      "narration": "Terima kasih, Rizky. Solusi kami terdiri dari tiga fitur kunci. Pertama, pencarian berbasis radius, yang otomatis merekomendasikan lapangan dalam jarak satu sampai lima kilometer. Kedua, profil lapangan yang lengkap: fasilitas, jam operasional, dan peraturan. Ketiga, sistem ulasan terbuka dengan rating bintang. Untuk cara kami menjangkau pengguna, silakan Rayyan."
    },
    {
      "id": "channels",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "rayyan",
      "block": "channels",
      "question": "Bagaimana pengguna mengenal produk kami?",
      "groups": [
        { "label": "Saluran", "items": [
          "Media sosial",
          "Kerja sama dengan lapangan mitra — memasang banner atau QR code di lokasi",
          "Grup komunitas olahraga"
        ] }
      ],
      "note": "Cara menjangkau pemain sudah ada, tapi cara merekrut owner lapangan baru di luar mitra awal belum kami jelaskan.",
      "narration": "Terima kasih, Fatih. Kami akan memperkenalkan produk ini lewat media sosial, memasang banner dan kode QR di lapangan mitra, serta masuk ke grup-grup komunitas olahraga. Cara ini murah dan langsung menyasar pengguna kami. Berikutnya, bagian keuangan oleh Zubiar."
    },
    {
      "id": "revenue",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "zubiar",
      "block": "revenue",
      "question": "Dari mana pendapatan kami datang?",
      "groups": [
        { "label": "Sumber pendapatan", "items": ["Promosi lapangan berbayar", "Paket berlangganan untuk pengelola lapangan", "Investor (kalau memungkinkan)"] },
        { "label": "Kami coret", "items": ["Komisi dari pemesanan berhasil"], "struck": true }
      ],
      "note": "Investor sebenarnya sumber pendanaan, bukan pendapatan. Harga promosi dan paket langganan juga belum kami tentukan.",
      "narration": "Terima kasih, Rayyan. Pendapatan kami berasal dari promosi lapangan berbayar dan paket langganan untuk pengelola lapangan. Kami juga terbuka terhadap investor jika memungkinkan. Komisi dari setiap pemesanan sengaja kami coret dari rencana."
    },
    {
      "id": "cost",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "zubiar",
      "block": "cost",
      "question": "Apa saja biaya utama kami?",
      "groups": [
        { "label": "Biaya", "items": ["Domain dan hosting (VPS/server)", "Pengiklanan — banner dan iklan di media sosial"] }
      ],
      "note": "Masih kurang: biaya layanan peta/lokasi, payment gateway, perawatan sistem, dan operasional tim.",
      "narration": "Untuk biaya, saat ini kami mencatat dua hal utama: domain dan hosting server, serta biaya iklan di media sosial. Selanjutnya, metrik kunci akan disampaikan kembali oleh Rizky."
    },
    {
      "id": "metrics",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "rizky",
      "block": "metrics",
      "question": "Angka apa yang menunjukkan kami berhasil?",
      "groups": [
        { "label": "Metrik", "items": ["Jumlah pengguna terdaftar", "Jumlah lapangan terdaftar", "Jumlah pemesanan berhasil", "Tingkat pembatalan"] }
      ],
      "note": "Metriknya sudah cocok untuk marketplace dua sisi, tapi belum ada target angka dan batas waktunya.",
      "narration": "Terima kasih, Zubiar. Keberhasilan kami akan diukur dengan empat angka: jumlah pengguna terdaftar, jumlah lapangan terdaftar, jumlah pemesanan yang berhasil, dan tingkat pembatalan. Untuk kotak terakhir, kembali ke Fikri."
    },
    {
      "id": "advantage",
      "type": "block",
      "section": "Lean Canvas",
      "speaker": "fikri",
      "block": "advantage",
      "question": "Apa yang sulit ditiru pesaing?",
      "groups": [
        { "label": "Keunggulan", "items": [
          "Data eksklusif lapangan lokal dan pelosok — fasilitas, aturan, jam operasi, dan akses lokasi",
          "Kedekatan awal dengan komunitas olahraga dan pengelola lapangan mitra"
        ] }
      ],
      "note": "Data seperti ini lama-lama bisa dikumpulkan pesaing. Kami perlu memperkuatnya, misalnya lewat kemitraan yang lebih mengikat.",
      "narration": "Terima kasih. Kotak kesembilan adalah keunggulan yang sulit ditiru. Kami punya data lapangan lokal, termasuk yang ada di pelosok, dan kedekatan langsung dengan komunitas olahraga serta pengelola lapangan mitra."
    },
    {
      "id": "canvas-summary",
      "type": "canvas-summary",
      "section": "Lean Canvas",
      "speaker": "rizky",
      "kicker": "Ringkasan",
      "title": "Lean Canvas kami secara utuh",
      "lead": "Klik kotak pada gambar atau daftar untuk melihat detailnya.",
      "summaries": {
        "problem": "Info lapangan sulit dicari dan tidak jelas; owner sulit promosi",
        "segments": "Pelajar, komunitas, masyarakat + pemilik lapangan",
        "uvp": "Temukan, bandingkan, dan pesan lapangan dalam satu website",
        "solution": "Pencarian radius 1–5 km, profil lengkap, ulasan terbuka",
        "channels": "Media sosial, banner/QR di mitra, grup komunitas",
        "revenue": "Promosi berbayar, langganan owner",
        "cost": "Domain & hosting, iklan",
        "metrics": "Pengguna, lapangan, pemesanan, pembatalan",
        "advantage": "Data lapangan lokal & pelosok, kedekatan komunitas"
      },
      "narration": "Inilah Lean Canvas kami secara utuh. Sembilan kotak yang saling terhubung, dari masalah nyata di lapangan sampai cara produk ini menghasilkan pendapatan."
    },
    {
      "id": "canvas-review",
      "type": "critique",
      "section": "Lean Canvas",
      "speaker": "rizky",
      "kicker": "Evaluasi Diri · Lean Canvas",
      "title": "Yang masih perlu kami perbaiki",
      "lead": "Kami mohon arahan Ustadz Izhar untuk poin-poin berikut.",
      "strengthsLabel": "Yang sudah baik",
      "strengths": [
        "Calon mitra lapangan sudah punya nama jelas",
        "Solusi terhubung langsung dengan masalah user",
        "Konsep “Traveloka untuk lapangan” mudah dipahami"
      ],
      "issues": [
        { "title": "Masalah belum divalidasi", "detail": "Belum ada data wawancara atau survei. Kami perlu memilih 1–3 masalah paling penting." },
        { "title": "Segmen terlalu luas", "detail": "“Masyarakat umum” sulit dijangkau. Sebaiknya mulai dari satu area dan satu jenis olahraga." },
        { "title": "Pembeda dari pesaing lemah", "detail": "Ayo, Gelora, dan Sporto juga menawarkan cari dan pesan. Fokus lapangan lokal dan pelosok perlu ditonjolkan." },
        { "title": "Pendapatan belum konsisten", "detail": "Komisi dicoret, padahal pemesanan fitur inti. Investor bukan pendapatan. Harga belum ada." },
        { "title": "Biaya belum lengkap", "detail": "Belum ada biaya layanan peta, payment gateway, perawatan, dan operasional." },
        { "title": "Metrik tanpa target", "detail": "Perlu angka dan batas waktu, misalnya jumlah lapangan mitra dalam 3 bulan." },
        { "title": "Masalah ayam dan telur", "detail": "Marketplace dua sisi butuh owner dan pemain sekaligus. Kami perlu menentukan sisi mana yang didahulukan." },
        { "title": "Identitas dan kerapian", "detail": "Kolom “Designed for” masih “Cooming Soon”; ada salah ketik seperti “riview” dan “Grub”." }
      ],
      "narration": "Ustadz Izhar, kami juga menyadari Lean Canvas ini belum sempurna. Masalah yang kami tulis belum kami validasi lewat wawancara. Segmen kami masih terlalu luas, dan pembeda dari pesaing belum kuat. Komisi kami coret padahal pemesanan adalah fitur inti, dan investor sebenarnya bukan sumber pendapatan. Biaya dan target metrik juga belum lengkap. Kami mohon arahan untuk poin-poin ini."
    },
    {
      "id": "prd-intro",
      "type": "section",
      "section": "PRD",
      "speaker": "fikri",
      "kicker": "Bagian 2",
      "title": "PRD kami",
      "lead": "Product Requirements Document — dokumen yang menerjemahkan ide bisnis menjadi apa yang harus kami bangun.",
      "points": [
        "Lean Canvas menjawab: kenapa dan untuk siapa",
        "PRD menjawab: apa yang harus dibangun",
        "PRD v0.1 ini diturunkan langsung dari Lean Canvas v1.0",
        "Hal yang belum jelas ditandai [Belum ditentukan]"
      ],
      "narration": "Bagian kedua adalah PRD, atau dokumen kebutuhan produk. Kalau Lean Canvas menjawab kenapa dan untuk siapa, PRD menjawab apa yang harus kami bangun. PRD versi nol koma satu ini kami turunkan langsung dari Lean Canvas, dan hal yang belum jelas kami tandai secara terbuka. Tujuan produknya akan disampaikan oleh Fatih."
    },
    {
      "id": "prd-goals",
      "type": "list",
      "section": "PRD",
      "speaker": "fatih",
      "kicker": "PRD · Tujuan Produk",
      "title": "Lima tujuan produk",
      "items": [
        "User menemukan lapangan terdekat secara otomatis",
        "User mendapat informasi lapangan yang jelas: fasilitas, peraturan, jam operasional",
        "User dapat melihat dan memberi ulasan secara terbuka",
        "User dapat membandingkan dan memesan lapangan di satu tempat",
        "Owner lapangan, termasuk yang di pelosok, punya sarana untuk promosi"
      ],
      "narration": "Terima kasih, Fikri. Kami punya lima tujuan produk. Pengguna bisa menemukan lapangan terdekat secara otomatis, mendapat informasi lapangan yang jelas, melihat dan memberi ulasan, serta membandingkan dan memesan di satu tempat. Sedangkan pemilik lapangan, termasuk yang di pelosok, punya sarana untuk promosi."
    },
    {
      "id": "prd-features",
      "type": "features",
      "section": "PRD",
      "speaker": "fikri",
      "kicker": "PRD · Ruang Lingkup Fitur",
      "title": "Sembilan fitur, dua lapis",
      "core": [
        { "id": "F1", "name": "Pencarian berbasis radius", "desc": "Rekomendasi lapangan terdekat 1–5 km dari lokasi pengguna" },
        { "id": "F2", "name": "Profil lapangan komprehensif", "desc": "Fasilitas, jam operasional, peraturan, akses lokasi" },
        { "id": "F3", "name": "Sistem ulasan terbuka", "desc": "Rating bintang dan feedback untuk semua pengguna" }
      ],
      "support": [
        { "id": "F4", "name": "Membandingkan lapangan" },
        { "id": "F5", "name": "Pemesanan lapangan" },
        { "id": "F6", "name": "Akun & peran pengguna" },
        { "id": "F7", "name": "Pengelolaan lapangan oleh owner" },
        { "id": "F8", "name": "Promosi lapangan berbayar" },
        { "id": "F9", "name": "Paket berlangganan owner" }
      ],
      "outOfScope": ["Komisi dari pemesanan berhasil (dicoret di canvas)", "Platform selain website [Belum ditentukan]"],
      "narration": "Fitur kami bagi menjadi dua lapis. Tiga fitur inti: pencarian radius, profil lapangan, dan ulasan terbuka. Lalu enam fitur pendukung: perbandingan, pemesanan, akun dan peran, pengelolaan lapangan oleh pemilik, promosi berbayar, dan paket langganan. Komisi dan platform selain website berada di luar cakupan. Untuk kebutuhan datanya, silakan Abdullah dari tim back-end."
    },
    {
      "id": "prd-data",
      "type": "data",
      "section": "PRD",
      "speaker": "abdullah",
      "kicker": "PRD · Data & Metrik",
      "title": "Data yang kami kelola dan cara mengukurnya",
      "entities": [
        { "name": "User", "attrs": "Akun terdaftar, lokasi (untuk radius)" },
        { "name": "Owner/Admin", "attrs": "Pemilik atau pengelola lapangan" },
        { "name": "Lapangan", "attrs": "Lokasi, fasilitas, peraturan, jam operasional, akses lokasi" },
        { "name": "Ulasan", "attrs": "Rating bintang, feedback" },
        { "name": "Pemesanan", "attrs": "Status berhasil, pembatalan" },
        { "name": "Promosi/Langganan", "attrs": "Promosi berbayar, paket berlangganan" }
      ],
      "metrics": [
        { "name": "Jumlah pengguna terdaftar", "target": "Belum ditentukan" },
        { "name": "Jumlah lapangan terdaftar", "target": "Belum ditentukan" },
        { "name": "Jumlah pemesanan berhasil", "target": "Belum ditentukan" },
        { "name": "Tingkat pembatalan", "target": "Belum ditentukan" }
      ],
      "narration": "Terima kasih. Dari sisi back-end, kami akan mengelola enam data utama: pengguna, pemilik, lapangan, ulasan, pemesanan, serta promosi dan langganan. Metrik keberhasilannya sama dengan Lean Canvas, namun targetnya masih belum kami tentukan."
    },
    {
      "id": "prd-tbd",
      "type": "chips",
      "section": "PRD",
      "speaker": "fatih",
      "kicker": "PRD · Bagian 13",
      "title": "Tujuh hal yang belum kami tentukan",
      "lead": "Kami tandai terbuka di PRD — ini daftar pekerjaan rumah tim.",
      "items": [
        "Nama produk",
        "Target angka untuk setiap metrik",
        "Alur pemesanan & pembayaran",
        "Harga promosi & paket langganan",
        "Kebijakan pembatalan",
        "Timeline & milestone rilis",
        "Spesifikasi teknis (stack, arsitektur, API)"
      ],
      "narration": "Kami juga mencatat tujuh hal yang belum ditentukan: nama produk, target metrik, alur pemesanan dan pembayaran, harga, kebijakan pembatalan, jadwal rilis, dan spesifikasi teknis. Ketujuh hal ini menjadi pekerjaan rumah kami. Selanjutnya, evaluasi akan disampaikan oleh ketua kami."
    },
    {
      "id": "prd-review",
      "type": "critique",
      "section": "PRD",
      "speaker": "rizky",
      "kicker": "Evaluasi Diri · PRD",
      "title": "Yang masih perlu kami lengkapi",
      "lead": "Agar PRD siap dipakai tim developer, bagian berikut perlu kami lengkapi.",
      "strengthsLabel": "Yang sudah baik",
      "strengths": [
        "Setiap isi bisa dilacak ke Lean Canvas",
        "Fitur diberi kode F1–F9, mudah dirujuk",
        "Hal yang belum jelas ditandai terbuka"
      ],
      "issues": [
        { "title": "Belum ada prioritas MVP", "detail": "F1–F9 masih setara. Perlu ditentukan mana yang wajib ada di rilis pertama, misalnya dengan metode MoSCoW." },
        { "title": "Belum ada user story", "detail": "Contoh: “Sebagai pemain, saya ingin melihat lapangan dalam 3 km agar…”, plus kriteria kapan fitur dianggap selesai." },
        { "title": "Alur pemesanan kosong", "detail": "Pemesanan adalah fitur inti dan diukur, tapi alur, pembayaran, dan kebijakan batal belum ada." },
        { "title": "Kebutuhan non-fungsional", "detail": "Belum ada soal performa, keamanan akun, privasi data lokasi, dan tampilan di HP." },
        { "title": "Radius vs pelosok", "detail": "Pencarian dibatasi 1–5 km, padahal lapangan di pelosok bisa lebih jauh dari pengguna." },
        { "title": "Risiko dan asumsi", "detail": "Misalnya: apakah owner mau rutin memperbarui jadwal? Bagaimana jika data lapangan tidak akurat?" },
        { "title": "Timeline dan pembagian tugas", "detail": "Peran tim sudah lengkap, tapi tugas tiap peran belum dipetakan ke milestone." },
        { "title": "Belum ada riset pengguna", "detail": "Seluruh isi masih turunan canvas; belum ada persona atau hasil wawancara." }
      ],
      "narration": "Untuk PRD, semua isinya sudah bisa dilacak ke Lean Canvas, dan setiap fitur sudah kami beri kode. Namun kami sadar masih ada kekurangan. Belum ada prioritas fitur untuk versi pertama, belum ada user story dan kriteria selesai, dan alur pemesanan masih kosong. Kebutuhan seperti keamanan dan privasi lokasi juga belum kami tulis. Ada pula konflik: radius kami batasi lima kilometer, padahal kami menyasar lapangan di pelosok."
    },
    {
      "id": "next-steps",
      "type": "steps",
      "section": "Penutup",
      "speaker": "rizky",
      "kicker": "Rencana",
      "title": "Rencana kami berikutnya",
      "lead": "Urutan kerja sebelum mulai coding — kami terbuka untuk masukan Ustadz Izhar.",
      "items": [
        { "text": "Mewawancarai calon pemain dan pengelola lapangan mitra untuk memvalidasi masalah", "role": "System Analyst · Marketing" },
        { "text": "Menentukan nama dan identitas produk", "role": "Ketua · UI/UX" },
        { "text": "Memilih fitur MVP dan menetapkan target metrik 3 bulan pertama", "role": "Ketua · System Analyst" },
        { "text": "Merancang alur pemesanan, pembayaran, dan pembatalan", "role": "System Analyst · Keuangan" },
        { "text": "Menghitung biaya dan harga paket untuk owner", "role": "Keuangan" },
        { "text": "Membuat wireframe dan prototipe", "role": "UI/UX" },
        { "text": "Menyusun timeline sprint dan mulai membangun MVP", "role": "Front-End · Back-End" },
        { "text": "Menyiapkan konten pra-peluncuran", "role": "Content Creator · Marketing" }
      ],
      "narration": "Karena itu, inilah rencana kami berikutnya. Kami akan mewawancarai pemain dan pemilik lapangan, lalu menentukan nama produk, fitur wajib versi pertama, serta target metrik. Setelah itu, kami merancang alur pemesanan, menghitung biaya, membuat prototipe, dan mulai membangun. Setiap peran di tim sudah punya bagiannya."
    },
    {
      "id": "outro",
      "type": "hero",
      "section": "Penutup",
      "speaker": "rizky",
      "kicker": "Lean Canvas v1.0 · PRD v0.1",
      "title": "Kami mohon masukan dan koreksi.",
      "subtitle": "Terima kasih, Ustadz Izhar. Wassalamualaikum warahmatullahi wabarakatuh.",
      "meta": ["SMKIT Ibnul Qayyim Makassar", "Angkatan 5", "PPLG/RPL"],
      "radar": true,
      "narration": "Demikian presentasi Lean Canvas dan PRD dari kami. Ide sudah ada dan tim sudah lengkap, tetapi kami masih banyak belajar. Kami sangat mengharapkan masukan dan koreksi dari Ustadz Izhar. Terima kasih atas perhatiannya. Wassalamualaikum warahmatullahi wabarakatuh."
    }
  ]
};
