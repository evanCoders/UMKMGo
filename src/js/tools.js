function showTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('testimonialModal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.target === modal) {
            closeTestimonialModal();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTestimonialModal();
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

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
            btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        } else {
            btn.classList.remove('bg-brand-600', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        }
    });

    Object.keys(tabPanels).forEach(k => {
        if (tabPanels[k]) {
            tabPanels[k].classList.toggle('hidden', k !== name);
        }
    });
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.getAttribute('data-tab')));
});

const hashTab = window.location.hash ? window.location.hash.replace('#', '') : '';
if (hashTab && tabPanels[hashTab]) {
    setActiveTab(hashTab);
} else {
    setActiveTab('kalkulator');
}

const calcBtn = document.getElementById('calc-btn');

function toNum(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const n = Number(el.value);
    return Number.isFinite(n) ? n : 0;
}

function formatRp(n) {
    if (!Number.isFinite(n)) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const hpp = toNum('calc-hpp');
        const marginPct = toNum('calc-margin');
        const fixed = toNum('calc-fixed');
        const volume = toNum('calc-volume');

        if (hpp <= 0 || marginPct <= 0) {
            document.getElementById('out-harga').textContent = '-';
            document.getElementById('out-margin-rp').textContent = '-';
            document.getElementById('out-bep').textContent = '-';
            document.getElementById('out-status').textContent = 'Mohon isi HPP dan margin target';
            return;
        }

        const marginRp = hpp * (marginPct / 100);
        const hargaJual = hpp + marginRp;
        const bepUnit = marginRp > 0 ? (fixed / marginRp) : Infinity;
        const status = volume > 0 ? (volume >= Math.ceil(bepUnit) ? 'Potensi laba sehat (di atas ambang BEP)' : 'Perlu evaluasi volume (di bawah ambang BEP)') : 'Lengkapi estimasi volume';

        document.getElementById('out-harga').textContent = formatRp(hargaJual);
        document.getElementById('out-margin-rp').textContent = formatRp(marginRp);
        document.getElementById('out-bep').textContent = Number.isFinite(bepUnit) ? `${Math.ceil(bepUnit)} unit / bulan` : '-';
        document.getElementById('out-status').textContent = status;

        showTestimonialModal();
    });
}

const chkBtn = document.getElementById('chk-btn');
const chkItems = [
    { id: 'chk-foto', label: 'Foto produk jelas', saran: 'Tambahkan foto sudut dekat dengan pencahayaan alami yang terang.' },
    { id: 'chk-harga', label: 'Harga tertulis', saran: 'Cantumkan nominal harga atau rentang paket secara terbuka.' },
    { id: 'chk-varian', label: 'Ada varian', saran: 'Sertakan daftar ukuran, berat bersih, atau varian rasa produk.' },
    { id: 'chk-deskripsi', label: 'Deskripsi manfaat', saran: 'Tuliskan 2-3 keunggulan bahan baku dan manfaat nyata produk.' },
    { id: 'chk-ongkir', label: 'Info pengiriman jelas', saran: 'Sebutkan opsi jasa kurir yang tersedia serta estimasi waktu antar.' },
    { id: 'chk-cta', label: 'Ajakan bertindak (CTA)', saran: 'Beri instruksi pemesanan singkat atau tautan pesan WhatsApp.' },
];

function scoreBadge(score) {
    if (score >= 5) return { badge: 'Etalase Siap Jual', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40' };
    if (score >= 3) return { badge: 'Cukup Lengkap', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700' };
    return { badge: 'Perlu Dilengkapi', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40' };
}

if (chkBtn) {
    chkBtn.addEventListener('click', () => {
        const checked = chkItems.filter(it => {
            const el = document.getElementById(it.id);
            return el && el.checked;
        });
        const score = checked.length;

        const badge = scoreBadge(score);
        const status = badge.badge;

        const ul = document.getElementById('chk-saran');
        if (ul) {
            ul.innerHTML = '';
            const missing = chkItems.filter(it => {
                const el = document.getElementById(it.id);
                return !el || !el.checked;
            });
            if (missing.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'Etalase produk Anda sudah sangat lengkap dan siap memberikan rasa aman bagi calon pembeli.';
                ul.appendChild(li);
            } else {
                missing.forEach(m => {
                    const li = document.createElement('li');
                    li.textContent = m.saran;
                    ul.appendChild(li);
                });
            }
        }

        const namaEl = document.getElementById('chk-nama');
        const nama = namaEl ? namaEl.value.trim() : '';
        const badgeEl = document.getElementById('chk-badge');
        if (badgeEl) {
            badgeEl.textContent = status;
            badgeEl.className = `text-xs font-semibold px-3 py-1 rounded-full ${badge.cls}`;
        }

        const scoreEl = document.getElementById('chk-score');
        if (scoreEl) scoreEl.textContent = `${score} dari 6 Poin`;

        const statusEl = document.getElementById('chk-status');
        if (statusEl) statusEl.textContent = nama ? `Hasil Evaluasi: ${nama}` : status;

        showTestimonialModal();
    });
}

const plBtn = document.getElementById('pl-btn');
const plCopy = document.getElementById('pl-copy');
const plOut = document.getElementById('pl-out');

const hookTemplates = {
    jualan: [
        'Kalimat Pembuka: Lagi cari {produk} berkualitas yang siap kirim hari ini?',
        'Kalimat Pembuka: Ini alasan kenapa pelanggan kami selalu repeat order {produk}...',
        'Kalimat Pembuka: 3 keunggulan utama {produk} yang wajib Anda coba sekarang.',
        'Kalimat Pembuka: Khusus minggu ini, ada penawaran paket hemat untuk {produk}!'
    ],
    brand: [
        'Kalimat Pembuka: Ada cerita menarik di balik proses pemilihan bahan baku {produk}.',
        'Kalimat Pembuka: Di balik layar tim kami menyiapkan pesanan {produk} hari ini.',
        'Kalimat Pembuka: Komitmen kami menjaga mutu dan ketulusan rasa {produk} untuk Anda.',
        'Kalimat Pembuka: Mengapa kami konsisten mengembangkan {produk} sejak awal mula?'
    ]
};

const captionCTA = {
    instagram: 'Ajakan Bertindak: Mau pilih varian? Langsung klik tautan di bio atau kirim DM ke kami sekarang ya!',
    tiktok: 'Ajakan Bertindak: Ikuti akun kami dan tuliskan komentar untuk mendapatkan penawaran spesial.',
    facebook: 'Ajakan Bertindak: Tertarik mencoba? Hubungi kami via pesan langsung atau tinggalkan komentar.',
    wa: 'Ajakan Bertindak: Balas pesan ini untuk memilih varian dan cek ongkos kirim ke alamat Anda.'
};

function buildPlanner(kategori, channel, goal) {
    const produk = kategori && kategori.trim() ? kategori.trim() : 'produk pilihan kami';
    const hooks = hookTemplates[goal] || hookTemplates.jualan;

    const plan = [];
    const tema = [
        'Edukasi Bahan Baku', 'Solusi Kebutuhan Harian', 'Proses Pengemasan Rapi', 'Ulasan Kepuasan Pembeli', 'Penawaran Spesial',
        'Petunjuk Penyimpanan', 'Rekomendasi Varian', 'Jawaban Pertanyaan Umum', 'Kabar Stok Terbaru', 'Keuntungan Pesan Langsung'
    ];

    for (let i = 1; i <= 30; i++) {
        const slot = (i - 1) % tema.length;
        const jenis = tema[slot];
        const hook = hooks[(i - 1) % hooks.length].replaceAll('{produk}', produk);
        const cta = captionCTA[channel] || captionCTA.instagram;

        let isi = '';
        switch (jenis) {
            case 'Edukasi Bahan Baku':
                isi = `Ide materi: Jelaskan 2 bahan utama ${produk} dan alasan Anda memilihnya.\nFokus: Memperlihatkan kepedulian mutu secara jujur.`;
                break;
            case 'Solusi Kebutuhan Harian':
                isi = `Ide materi: Ceritakan bagaimana ${produk} mempermudah rutinitas harian konsumen Anda.\nFokus: Mengaitkan produk dengan situasi nyata.`;
                break;
            case 'Proses Pengemasan Rapi':
                isi = `Ide materi: Tampilkan video atau foto persiapan pengemasan ${produk} yang higienis.\nFokus: Menumbuhkan rasa percaya terhadap kebersihan produk.`;
                break;
            case 'Ulasan Kepuasan Pembeli':
                isi = `Ide materi: Tampilkan tanggapan layar pesan kepuasan dari pelanggan ${produk}.\nFokus: Bukti sosial nyata dari pembeli sebelumnya.`;
                break;
            case 'Penawaran Spesial':
                isi = `Ide materi: Rancang penawaran bundling hemat untuk pembelian 2 atau 3 paket ${produk}.\nFokus: Memberikan nilai tambah ekonomis bagi pembeli.`;
                break;
            case 'Petunjuk Penyimpanan':
                isi = `Ide materi: Panduan menjaga kualitas ${produk} agar tetap segar dan tahan lama di rumah.`;
                break;
            case 'Rekomendasi Varian':
                isi = `Ide materi: Rekomendasi varian ${produk} yang paling cocok untuk dicoba pertama kali.`;
                break;
            case 'Jawaban Pertanyaan Umum':
                isi = `Ide materi: Menjawab pertanyaan seputar daya tahan, pengiriman, dan cara pemesanan ${produk}.`;
                break;
            case 'Kabar Stok Terbaru':
                isi = `Ide materi: Memberitahukan bahwa batch produksi ${produk} baru saja selesai dan siap dikirim.`;
                break;
            case 'Keuntungan Pesan Langsung':
                isi = `Ide materi: Mengingatkan keuntungan memesan langsung lewat saluran resmi toko.`;
                break;
        }

        plan.push(`Hari Ke-${i} [${jenis}]\n${hook}\n${isi}\n${cta}`);
    }

    return `Kategori Usaha: ${produk}\nSaluran Utama: ${channel}\nFokus Sasaran: ${goal === 'jualan' ? 'Penjualan Langsung' : 'Pengenalan Brand'}\n\n========================================\nJADWAL KONTEN MEDIA SOSIAL 30 HARI\n========================================\n\n` + plan.join('\n\n----------------------------------------\n\n');
}

if (plBtn) {
    plBtn.addEventListener('click', () => {
        const kategoriEl = document.getElementById('pl-kategori');
        const channelEl = document.getElementById('pl-channel');
        const goalEl = document.querySelector('input[name="pl-goal"]:checked');

        const kategori = kategoriEl ? kategoriEl.value : '';
        const channel = channelEl ? channelEl.value : 'instagram';
        const goal = goalEl ? goalEl.value : 'jualan';

        if (plOut) {
            plOut.textContent = buildPlanner(kategori, channel, goal);
        }

        showTestimonialModal();
    });
}

if (plCopy && plOut) {
    plCopy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(plOut.textContent);
            const orig = plCopy.textContent;
            plCopy.textContent = 'Tersalin!';
            setTimeout(() => { plCopy.textContent = orig; }, 2000);
        } catch (e) {}
    });
}

const chatBtn = document.getElementById('chat-btn');
const chatCopy = document.getElementById('chat-copy');
const chatOut = document.getElementById('chat-out');

function normalize(s) {
    return (s || '').toLowerCase();
}

function guessIntent(msg) {
    const m = normalize(msg);
    const has = (...words) => words.some(w => m.includes(w));

    if (has('stok', 'ready', 'ada')) return 'stok';
    if (has('harga', 'berapa', 'price', 'biaya', 'ongkos')) return 'harga';
    if (has('ongkir', 'kirim', 'pengiriman', 'kurir', 'ekspedisi')) return 'ongkir';
    if (has('order', 'pesan', 'beli', 'pemesanan', 'checkout')) return 'order';
    if (has('komplain', 'rusak', 'tidak sesuai', 'salah', 'refund', 'cacat')) return 'komplain';
    return 'umum';
}

function buildChatReply({ toko, produk, msg }) {
    const intent = guessIntent(msg);
    const p = produk && produk.trim() ? produk.trim() : 'produk kami';
    const opener = toko && toko.trim() ? `Halo Kak! Terima kasih sudah menghubungi ${toko.trim()} 😊` : 'Halo Kak! Terima kasih sudah menghubungi kami 😊';

    const replies = {
        stok: `${opener}\n\nUntuk ${p}, stok saat ini tersedia dan siap kami kirimkan.\n\nBoleh kami bantu catat pilihan varian atau jumlah pesanan yang diinginkan?`,
        harga: `${opener}\n\nUntuk informasi harga ${p}, kami menyediakan paket terjangkau dengan kualitas mutu terjamin.\n\nBoleh tahu varian atau ukuran yang Kakak butuhkan agar kami rincikan total pesanannya?`,
        ongkir: `${opener}\n\nTentu bisa Kak 👍\nUntuk mengecek perkiraan tarif ongkos kirim, boleh sebutkan nama Kecamatan dan Kota tujuan pengirimannya? Kami bantu carikan tarif ekspedisi terbaik.`,
        order: `${opener}\n\nSiap kami proses dengan senang hati! Berikut langkah mudah pemesanannya:\n1. Tentukan varian dan jumlah ${p}\n2. Kirimkan nama penerima, nomor kontak, dan alamat lengkap\n3. Kami kirimkan total dan nomor rekening resmi toko\n\nKakak ingin memesan varian apa hari ini?`,
        komplain: `${opener}\n\nKami memohon maaf yang sebesar-besarnya atas kendala yang dialami 🙏\nKenyamanan dan kepuasan Kakak adalah hal utama bagi kami. Mohon bantu kirimkan foto/video kendala produk serta nomor pesanan agar tim kami dapat segera memberikan solusi terbaik.`,
        umum: `${opener}\n\nAda yang bisa kami bantu seputar detail informasi ${p}, pilihan varian rasa, atau tata cara pemesanannya?`
    };

    return replies[intent] || replies.umum;
}

if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        const msgEl = document.getElementById('chat-msg');
        const tokoEl = document.getElementById('chat-toko');
        const produkEl = document.getElementById('chat-produk');

        const msg = msgEl ? msgEl.value : '';
        const toko = tokoEl ? tokoEl.value : '';
        const produk = produkEl ? produkEl.value : '';

        if (!msg.trim()) {
            if (chatOut) chatOut.textContent = 'Mohon ketikkan contoh pertanyaan calon pembeli terlebih dahulu.';
            return;
        }

        if (chatOut) {
            chatOut.textContent = buildChatReply({ toko, produk, msg });
        }

        showTestimonialModal();
    });
}

if (chatCopy && chatOut) {
    chatCopy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(chatOut.textContent);
            const orig = chatCopy.textContent;
            chatCopy.textContent = 'Tersalin!';
            setTimeout(() => { chatCopy.textContent = orig; }, 2000);
        } catch (e) {}
    });
}

window.showTestimonialModal = showTestimonialModal;
window.closeTestimonialModal = closeTestimonialModal;
window.setActiveTab = setActiveTab;