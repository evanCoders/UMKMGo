// ============================================
// FUNGSI MODAL TESTIMONI (PASTIKAN DI ATAS)
// ============================================

// Fungsi untuk menampilkan modal testimoni
function showTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Fungsi untuk menutup modal testimoni
function closeTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Tutup modal jika klik di luar area modal
document.addEventListener('click', function(e) {
    const modal = document.getElementById('testimonialModal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.target === modal) {
            closeTestimonialModal();
        }
    }
});

// Tutup modal dengan tombol Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTestimonialModal();
    }
});

// ============================================
// THEME TOGGLE
// ============================================
const themeToggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'umkmgo-theme';
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIcon = document.getElementById('theme-toggle-dark-icon');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, theme);
    if (isDark) {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    }
}

function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (themeToggleBtn) {
    applyTheme(getInitialTheme());
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ============================================
// REVEAL ANIMATION
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================
// TABS
// ============================================
const tabButtons = document.querySelectorAll('#tools-tabs [data-tab]');
const tabPanels = {
    kalkulator: document.getElementById('tab-kalkulator'),
    checklist: document.getElementById('tab-checklist'),
    planner: document.getElementById('tab-planner'),
    chat: document.getElementById('tab-chat')
};

function setActiveTab(name) {
    tabButtons.forEach(btn => {
        const active = btn.getAttribute('data-tab') === name;
        btn.classList.toggle('active', active);
        if (active) {
            btn.classList.add('bg-brand-600', 'text-white');
            btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-gray-700', 'dark:text-gray-200');
        } else {
            btn.classList.remove('bg-brand-600', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-slate-800', 'text-gray-700', 'dark:text-gray-200');
        }
    });

    Object.keys(tabPanels).forEach(k => {
        tabPanels[k].classList.toggle('hidden', k !== name);
    });
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.getAttribute('data-tab')));
});

// Default
setActiveTab('kalkulator');

// ============================================
// KALKULATOR
// ============================================
const calcBtn = document.getElementById('calc-btn');

function toNum(id) {
    const v = document.getElementById(id).value;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}

function formatRp(n) {
    if (!Number.isFinite(n)) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

calcBtn?.addEventListener('click', () => {
    const hpp = toNum('calc-hpp');
    const marginPct = toNum('calc-margin');
    const fixed = toNum('calc-fixed');
    const volume = toNum('calc-volume');

    if (hpp <= 0 || marginPct <= 0) {
        document.getElementById('out-harga').textContent = '-';
        document.getElementById('out-margin-rp').textContent = '-';
        document.getElementById('out-bep').textContent = '-';
        document.getElementById('out-status').textContent = 'Masukkan HPP & margin';
        return;
    }

    const marginRp = hpp * (marginPct / 100);
    const hargaJual = hpp + marginRp;
    const bepUnit = marginRp > 0 ? (fixed / marginRp) : Infinity;
    const status = volume > 0 ? (volume >= Math.ceil(bepUnit) ? 'Potensi untung (di atas BEP)' : 'Potensi rugi (di bawah BEP)') : 'Isi volume untuk evaluasi';

    document.getElementById('out-harga').textContent = formatRp(hargaJual);
    document.getElementById('out-margin-rp').textContent = formatRp(marginRp);
    document.getElementById('out-bep').textContent = Number.isFinite(bepUnit) ? `${Math.ceil(bepUnit)} unit` : '-';
    document.getElementById('out-status').textContent = status;

    // ✅ Tampilkan modal testimoni
    showTestimonialModal();
});

// ============================================
// CHECKLIST
// ============================================
const chkBtn = document.getElementById('chk-btn');
const chkItems = [
    { id: 'chk-foto', label: 'Foto produk jelas', saran: 'Tambahkan foto close-up + pencahayaan terang (minimal 2 sudut).' },
    { id: 'chk-harga', label: 'Harga tertulis', saran: 'Tulis harga (atau kisaran harga) agar pembeli tidak ragu bertanya dari awal.' },
    { id: 'chk-varian', label: 'Ada varian (opsional)', saran: 'Kalau ada varian (rasa/ukuran/bahan), tampilkan daftar singkat biar pembeli mudah memilih.' },
    { id: 'chk-deskripsi', label: 'Deskripsi singkat (manfaat)', saran: 'Tulis 3-5 kalimat manfaat: keunggulan utama, bahan, dan siapa yang cocok.' },
    { id: 'chk-ongkir', label: 'Info pengiriman/ongkir jelas', saran: 'Cantumkan estimasi pengiriman/ongkir (atau cara hitung) agar proses order cepat.' },
    { id: 'chk-cta', label: 'CTA (contoh: Chat untuk order)', saran: 'Tambahkan tombol/kalimat CTA: "Chat sekarang untuk cek stok & order".' },
];

function scoreBadge(score) {
    if (score >= 5) return { badge: 'Siap Jual', cls: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' };
    if (score >= 3) return { badge: 'Hampir Siap', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' };
    return { badge: 'Perlu Perbaikan', cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' };
}

chkBtn?.addEventListener('click', () => {
    const checked = chkItems.filter(it => document.getElementById(it.id).checked);
    const score = checked.length;

    const badge = scoreBadge(score);
    const status = badge.badge;

    const ul = document.getElementById('chk-saran');
    ul.innerHTML = '';

    const missing = chkItems.filter(it => !document.getElementById(it.id).checked);
    if (missing.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Toko Anda sudah cukup siap. Fokus tingkatkan testimoni dan konsistensi konten.';
        ul.appendChild(li);
    } else {
        missing.forEach(m => {
            const li = document.createElement('li');
            li.textContent = m.saran;
            ul.appendChild(li);
        });
    }

    const nama = document.getElementById('chk-nama').value.trim();
    const badgeEl = document.getElementById('chk-badge');
    badgeEl.textContent = status;
    badgeEl.className = `text-xs font-bold px-3 py-1 rounded-full ${badge.cls}`;

    document.getElementById('chk-score').textContent = `${score}/6`;
    document.getElementById('chk-status').textContent = nama ? `Untuk: ${nama}` : status;

    // ✅ Tampilkan modal testimoni
    showTestimonialModal();
});

// ============================================
// PLANNER 30 HARI
// ============================================
const plBtn = document.getElementById('pl-btn');
const plCopy = document.getElementById('pl-copy');
const plOut = document.getElementById('pl-out');

const hookTemplates = {
    jualan: [
        'Hook: {produk} hari ini diskon ringan—buruan chat ya!',
        'Hook: Rahasia {produk} laris karena ini…',
        'Hook: 3 alasan kenapa {produk} bikin repeat order',
        'Hook: Paket hemat {produk} untuk kamu yang suka praktis'
    ],
    brand: [
        'Hook: Kenalan dulu yuk, di balik {produk} ada cerita ini',
        'Hook: Proses pembuatan {produk} step-by-step',
        'Hook: Nilai & komitmen kami untuk pelanggan {produk}',
        'Hook: Kenapa kami konsisten dengan {produk}?'
    ]
};

const captionCTA = {
    instagram: 'CTA: Mau versi rasa/varian tertentu? Chat sekarang untuk cek stok & harga ya.',
    tiktok: 'CTA: Klik follow dan komen "ORDER" biar kami bantu proses order!',
    facebook: 'CTA: Tertarik? Chat admin + sebut varian yang kamu mau.',
    wa: 'CTA: Balas pesan ini dengan nama produk + alamat (untuk estimasi ongkir).'
};

function buildPlanner(kategori, channel, goal) {
    const produk = kategori?.trim() ? kategori.trim() : 'produk UMKM';
    const hooks = hookTemplates[goal] || hookTemplates.jualan;

    const plan = [];
    const hari = [
        'Edukasi singkat', 'Manfaat & problem-solution', 'Behind the scene', 'Testimoni/Review', 'Promo ringan',
        'Cara pakai/step', 'Tips memilih', 'QnA kecil', 'Bikin penasaran', 'Promo bundle'
    ];

    for (let i = 1; i <= 30; i++) {
        const slot = (i - 1) % hari.length;
        const jenis = hari[slot];
        const hook = hooks[(i - 1) % hooks.length].replaceAll('{produk}', produk);
        const cta = captionCTA[channel] || captionCTA.instagram;

        let isi = '';
        switch (jenis) {
            case 'Edukasi singkat':
                isi = `Ide konten: 3 fakta cepat tentang ${produk}.\nCopy angle: "Yang sering orang salah paham tentang ${produk} adalah…"`;
                break;
            case 'Manfaat & problem-solution':
                isi = `Ide konten: tampilkan masalah umum lalu solusinya pakai ${produk}.\nStruktur: Masalah → Solusi → Ajakan chat.`;
                break;
            case 'Behind the scene':
                isi = `Ide konten: proses pembuatan/packing ${produk} (video/foto singkat).\nTampilkan step penting dan higienitas.`;
                break;
            case 'Testimoni/Review':
                isi = `Ide konten: kutip testimoni pelanggan.\nTambahkan: konteks singkat pelanggan + hasilnya.`;
                break;
            case 'Promo ringan':
                isi = `Ide konten: promo ringan (tanpa membahayakan margin).\nContoh: "beli 2 bonus kemasan/varian mini"`;
                break;
            case 'Cara pakai/step':
                isi = `Ide konten: cara pakai/step untuk hasil maksimal dari ${produk}.\nBikin 3 langkah mudah.`;
                break;
            case 'Tips memilih':
                isi = `Ide konten: tips memilih varian ${produk} yang cocok.\nBuat checklist kecil.`;
                break;
            case 'QnA kecil':
                isi = `Ide konten: 5 pertanyaan yang sering ditanya tentang ${produk}.\nJawab singkat dalam format carousel.`;
                break;
            case 'Bikin penasaran':
                isi = `Ide konten: teaser—"besok ada varian baru ${produk}".\nAkhiri dengan pertanyaan untuk engagement.`;
                break;
            case 'Promo bundle':
                isi = `Ide konten: bundle hemat ${produk}.\nTampilkan perbandingan harga sederhana (versi hemat vs biasa).`;
                break;
        }

        plan.push(`Hari ${i}: ${jenis}\n${hook}\n${isi}\n${cta}`);
    }

    return `Kategori: ${produk}\nChannel: ${channel}\nTujuan: ${goal}\n\n--- Jadwal 30 Hari ---\n\n` + plan.join('\n\n');
}

plBtn?.addEventListener('click', () => {
    const kategori = document.getElementById('pl-kategori').value;
    const channel = document.getElementById('pl-channel').value;
    const goal = document.querySelector('input[name="pl-goal"]:checked')?.value || 'jualan';
    plOut.textContent = buildPlanner(kategori, channel, goal);
    
    // ✅ Tampilkan modal testimoni
    showTestimonialModal();
});

plCopy?.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(plOut.textContent);
    } catch {
        // ignore
    }
});

// ============================================
// TEMPLATE CHAT
// ============================================
const chatBtn = document.getElementById('chat-btn');
const chatCopy = document.getElementById('chat-copy');
const chatOut = document.getElementById('chat-out');

function normalize(s) {
    return (s || '').toLowerCase();
}

function guessIntent(msg) {
    const m = normalize(msg);
    const has = (...words) => words.some(w => m.includes(w));

    if (has('stok', 'ready')) return 'stok';
    if (has('harga', 'berapa', 'price', 'biaya')) return 'harga';
    if (has('ongkir', 'ongkos kirim', 'kirim', 'kiriman')) return 'ongkir';
    if (has('order', 'pesan', 'beli', 'pemesanan')) return 'order';
    if (has('komplain', 'rusak', 'tidak sesuai', 'salah', 'refund', 'tolak')) return 'komplain';
    if (has('alamat', 'kota', 'jakarta', 'bandung', 'surabaya', 'medan', 'bekasi', 'bogor', 'depok')) return 'ongkir';
    return 'umum';
}

function buildChatReply({ toko, produk, msg }) {
    const intent = guessIntent(msg);
    const p = produk?.trim() ? produk.trim() : '';
    const opener = toko?.trim() ? `${toko.trim()} di sini 😊` : 'Halo! 😊';

    const replies = {
        stok: `${opener}\n\nSiap! Untuk ${p || 'produk'} saat ini statusnya: READY / MENUNGGU (sebutkan varian/ukuran yang Anda mau ya).\n\nBoleh info varian + jumlahnya? Nanti kami cekkan ketersediaannya.`,
        harga: `${opener}\n\nUntuk ${p || 'produk'} harganya mulai dari: (isi sesuai harga Anda).\n\nMau yang varian/ukuran mana? Sebutkan ya, biar kami hitungkan totalnya sekalian.`,
        ongkir: `${opener}\n\nBisa kak 👍\nUntuk estimasi ongkir, mohon info:\n1) Alamat tujuan (kota/kode pos)\n2) Pilihan produk + jumlah\n\nNanti kami bantu cekkan nominalnya.`,
        order: `${opener}\n\nBisa kak. Berikut langkah order: \n1) Pilih varian/ukuran & jumlah\n2) Konfirmasi alamat + no HP\n3) Kami kirim total pembayaran\n\nKakak mau order varian apa?`,
        komplain: `${opener}\n\nMohon maaf ya kak atas ketidaknyamanannya 😔\nBiar kami bantu cek cepat, mohon kirim: \n1) Foto / video kondisi produk\n2) Nomor pesanan (jika ada)\n3) Keluhan singkat\n\nSetelah itu kami tindaklanjuti solusinya.`,
        umum: `${opener}\n\nTerima kasih sudah chat 😊\nBoleh info yang Anda butuhkan terkait ${p || 'produk'}?\nContoh: harga, stok, ongkir, atau cara order.`
    };

    return replies[intent] || replies.umum;
}

chatBtn?.addEventListener('click', () => {
    const msg = document.getElementById('chat-msg').value;
    const toko = document.getElementById('chat-toko').value;
    const produk = document.getElementById('chat-produk').value;

    if (!msg.trim()) {
        chatOut.textContent = 'Masukkan pesan pelanggan dulu.';
        return;
    }
    chatOut.textContent = buildChatReply({ toko, produk, msg });
    
    // ✅ Tampilkan modal testimoni
    showTestimonialModal();
});

chatCopy?.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(chatOut.textContent);
    } catch {
        // ignore
    }
});