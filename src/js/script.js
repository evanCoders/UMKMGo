const THEME_KEY = 'umkmgo-theme';

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    const lightIcon = document.getElementById('theme-toggle-light-icon') || document.getElementById('theme-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon') || document.getElementById('theme-dark-icon');

    if (lightIcon && darkIcon) {
        if (isDark) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
}

function getInitialTheme() {
    try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn && !themeToggleBtn.dataset.boundScript) {
        themeToggleBtn.dataset.boundScript = 'true';
        applyTheme(getInitialTheme());
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
}

initThemeToggle();
document.addEventListener('componentLoaded', initThemeToggle);

const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const heroMessages = [
    "Rancang naskah promosi dalam sekejap.",
    "Hitung HPP dan titik impas lebih akurat.",
    "Jadwalkan konten harian selama sebulan penuh.",
    "Siapkan balasan chat pelanggan yang ramah."
];
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 45;
const deleteSpeed = 25;
const pauseTime = 2200;
const heroElement = document.getElementById('hero-typing');

function typeHero() {
    if (!heroElement) return;
    const currentMsg = heroMessages[msgIndex];

    if (isDeleting) {
        heroElement.textContent = currentMsg.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroElement.textContent = currentMsg.substring(0, charIndex + 1);
        charIndex++;
    }

    let nextSpeed = isDeleting ? deleteSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentMsg.length) {
        nextSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % heroMessages.length;
        nextSpeed = 500;
    }

    setTimeout(typeHero, nextSpeed);
}

if (heroElement) {
    setTimeout(typeHero, 800);
}

function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');
    const isOpen = content.style.maxHeight;

    document.querySelectorAll('.faq-content').forEach(el => {
        el.style.maxHeight = null;
        el.classList.remove('open');
        const btn = el.previousElementSibling;
        const ic = btn ? btn.querySelector('svg') : null;
        if (ic) ic.classList.remove('rotate-180');
    });

    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('open');
        if (icon) icon.classList.add('rotate-180');
    }
}

function pickRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicClientCaption(product, tone) {
    const p = product.trim();
    const tag = p.replace(/[^a-zA-Z0-9]/g, '');

    const data = {
        casual: {
            openings: [
                `Lagi cari ${p} yang beneran cocok buat nemenin aktivitas harian kamu?`,
                `Siapa di sini yang dari kemarin lagi kepikiran pengin nikmatin ${p}?`,
                `Buat kamu yang mendambakan ${p} dengan rasa dan kualitas juara, ini jawabannya!`,
                `Kadang yang bikin hari jadi lebih bersemangat itu sesimpel nemu ${p} yang pas banget di hati.`,
                `Nggak perlu bingung lagi nyari ${p} yang terpercaya dan bikin puas.`,
                `${p} ini beneran beda dari yang pernah kamu coba sebelumnya!`,
                `Paling asyik kalau istirahat ditemenin sama ${p}, rasa lezatnya bikin mood langsung naik.`,
                `Sudah banyak yang ketagihan sama kenikmatan ${p}, sekarang giliran kamu yang buktiin sendiri!`,
                `Kabar baik buat kamu yang suka produk lokal berkualitas: ${p} siap kamu order hari ini.`,
                `Lagi santai di rumah atau kumpul bareng teman? Lengkapi momen seru kalian dengan ${p}.`
            ],
            bodies: [
                `Dibuat teliti dengan bahan-bahan pilihan biar kualitas ${p} tetap terjaga dari awal sampai ke tangan kamu. Sekali coba, dijamin langsung kerasa bedanya!`,
                `Setiap detailnya kami racik dengan penuh perhatian untuk memastikan rasa dan mutunya selalu konsisten. Pas banget buat dinikmati sendiri atau bareng orang terdekat.`,
                `Kami selalu mengutamakan kesegaran dan keaslian racikan, jadi kamu bisa menikmati pengalaman terbaik bersama ${p} di setiap momen.`,
                `Proses pembuatannya higienis dan mengutamakan bahan lokal berkualitas tinggi. Cocok banget buat melengkapi rutinitas harianmu.`,
                `Bukan rahasia lagi kalau ${p} jadi andalan banyak pelanggan kami karena tekstur dan rasanya yang khas tanpa pemanis atau pengawet berlebih.`,
                `Dibuat langsung oleh tangan terampil pengrajin lokal, memastikan setiap kemasan ${p} hadir dengan standar rasa terbaik.`,
                `Keaslian rasa dan kemasan yang praktis bikin ${p} mudah dibawa ke mana saja tanpa repot.`,
                `Kami menjaga resep otentik ini secara turun-temurun agar kepuasan kamu saat menikmati ${p} selalu terjaga sempurna.`
            ],
            ctas: [
                `Yuk, amankan pesanan kamu sekarang sebelum kehabisan slot batch hari ini! Langsung klik link di bio atau DM kami ya ✨`,
                `Stok harian terbatas ya kak. Yuk amankan ${p} favoritmu sekarang via chat atau klik link pemesanan di profil!`,
                `Biar nggak penasaran, langsung cobain sendiri hari ini. Chat admin kami sekarang untuk tanya varian atau langsung order ya! 🚀`,
                `Jangan sampai ketinggalan, amankan sekarang sebelum antrean pengiriman hari ini ditutup. Ditunggu pesanan baiknya! 😊`,
                `Mau kirim ke luar kota? Tenang, packing ${p} dijamin aman berlapis sampai depan pintu rumahmu. Hubungi kami sekarang!`,
                `Klik tombol pesan di profil untuk info harga dan ongkos kirim termurah hari ini ya! 📦`,
                `Tersedia berbagai pilihan paket hemat untuk ${p}, yuk tanya langsung ke admin via WhatsApp atau DM!`,
                `Langsung amankan stok kamu sekarang sebelum kuota promo mingguan ini ditutup!`
            ],
            tags: [
                `#UMKMLokal #${tag} #RekomendasiProduk #KaryaAnakBangsa #ProdukLokal`,
                `#PilihanCerdas #${tag} #KualitasTerbaik #BelanjaLokal #SupportUMKM`,
                `#RekomendasiHariIni #${tag} #KulinerLokal #UsahaLokal #BanggaBuatanIndonesia`,
                `#ProdukFavorit #${tag} #BelanjaOnline #UMKMIndonesia #CamilanLokal`,
                `#KaryaLokal #${tag} #JajananViral #RekomendasiMedsos #KreatifLokal`
            ]
        },
        promo: {
            openings: [
                `Kabar gembira buat kamu pencinta ${p}! Khusus minggu ini ada penawaran istimewa yang sayang banget dilewatkan.`,
                `Momen terbaik buat borong ${p} favorit kamu sudah tiba!`,
                `Penawaran terbatas! Dapatkan ${p} berkualitas dengan harga spesial khusus pemesanan hari ini.`,
                `Lagi pengin hemat tapi tetap dapat ${p} dengan mutu premium? Pas banget, kami lagi ada promo menarik!`,
                `${p} lagi diskon besar-besaran khusus untuk pelanggan tercepat hari ini!`,
                `Spesial flash sale! Ambil kesempatan emas bawa pulang ${p} dengan potongan harga spesial.`,
                `Hari ini saat yang paling pas buat stok ${p} di rumah karena harganya lagi ramah banget di kantong.`,
                `Beli sekarang lebih hemat! Nikmati penawaran eksklusif ${p} khusus orderan minggu ini.`,
                `Jangan sampai nyesel kehabisan, promo ${p} cuma berlaku selama kuota batch masih ada!`,
                `Promo bundling terbaik untuk ${p} sudah resmi dibuka, yuk serbu sekarang!`
            ],
            bodies: [
                `Kami siapkan penawaran harga terbaik langsung dari dapur produksi kami. Kualitas tetap nomor satu, porsi dan kemasan dijamin memuaskan!`,
                `Stok harian promo sengaja kami batasi agar standar mutu dan kesegaran ${p} tetap terjaga maksimal sampai ke alamat kamu.`,
                `Kombinasi rasa lezat dan harga bersahabat. Cocok buat stok di rumah atau kirim bingkisan ${p} buat keluarga dan teman.`,
                `Pengemasan super rapi dan aman, siap kami kirimkan ke seluruh wilayah dengan opsi ekspedisi terpercaya.`,
                `Dapatkan bonus ekstra dan potongan ongkos kirim untuk setiap pembelian ${p} minimal dua paket hari ini.`,
                `Kapan lagi bisa dapetin ${p} dengan kualitas premium tapi harganya sehemat ini? Jangan sampai terlewat!`,
                `Garansi rasa dan kualitas 100% otentik, dijamin bikin nagih dari suapan pertama sampai habis.`,
                `Setiap paket ${p} dipacking menggunakan lapisan pelindung tebal sehingga aman selama perjalanan antar kota.`
            ],
            ctas: [
                `Slot promo sangat terbatas dan bisa habis sewaktu-waktu. Yuk checkout sekarang sebelum kehabisan kuota! 🛒📦`,
                `Segera hubungi kontak kami sekarang untuk mengklaim harga promo spesial ${p} ini sebelum periode berakhir!`,
                `Klik link di bio atau kirim pesan sekarang untuk amankan paket promo kamu hari ini juga! 🔥`,
                `Jangan tunda sampai besok, pesan sekarang dan nikmati penawaran terbaiknya langsung dari kami!`,
                `Ketik "PROMO" di kolom komentar atau langsung DM kami untuk klaim voucher diskon ${p} sekarang juga!`,
                `Hubungi WhatsApp resmi kami sekarang untuk konsultasi varian dan dapatkan harga promo langsung! 📲`,
                `Siapa cepat dia dapat! Segera amankan pesanan ${p} sebelum promo otomatis berakhir tengah malam nanti.`
            ],
            tags: [
                `#PromoSpesial #${tag} #FlashSale #DiskonUMKM #HematBerkualitas`,
                `#PenawaranTerbatas #${tag} #PromoLokal #DiskonHariIni #BelanjaHemat`,
                `#PromoHemat #${tag} #ProdukLokalBerkualitas #PeluangHemat #PaketSpesial`,
                `#DiskonBesar #${tag} #PromoTerbatas #FlashSaleLokal #BelanjaMurah`
            ]
        },
        formal: {
            openings: [
                `Hadirkan kemudahan dan kepuasan optimal bersama ${p}.`,
                `Tingkatkan standar kualitas kebutuhan Anda dengan ${p} yang terpercaya.`,
                `Kami berkomitmen menghadirkan produk ${p} bermutu tinggi yang dirancang untuk memberikan nilai terbaik bagi Anda.`,
                `Solusi praktis dan andal untuk mendukung aktivitas harian Anda: ${p}.`,
                `${p} hadir sebagai solusi tepat bagi Anda yang mengutamakan mutu dan konsistensi layanan.`,
                `Percayakan pemenuhan kebutuhan Anda pada ${p} dengan jaminan mutu standar terbaik.`,
                `Keandalan dan efisiensi kini hadir lebih dekat melalui ${p}.`,
                `Pilihan cerdas untuk mendukung kenyamanan serta produktivitas bisnis Anda: ${p}.`
            ],
            bodies: [
                `Kami senantiasa mengedepankan integritas proses, standarisasi mutu yang ketat, serta konsistensi layanan untuk memastikan kepuasan setiap pelanggan.`,
                `Diproduksi dengan mengacu pada standar kualitas unggul, ${p} menjadi pilihan tepat bagi Anda yang mengutamakan keandalan dan kepraktisan.`,
                `Dukungan bahan baku teruji dan proses produksi profesional menjadikan produk ini bernilai investasi tinggi untuk kenyamanan Anda.`,
                `Setiap unit ${p} melewati tahapan kontrol kualitas berlapis guna memastikan kesempurnaan produk hingga ke tangan konsumen.`,
                `Kami siap menjadi mitra terpercaya dalam menghadirkan solusi ${p} yang berkelanjutan dan berstandar prima.`
            ],
            ctas: [
                `Katalog spesifikasi lengkap serta layanan pemesanan dapat diakses langsung melalui kontak resmi kami. Kami siap melayani kebutuhan Anda secara profesional.`,
                `Silakan menghubungi tim layanan pelanggan kami untuk konsultasi kebutuhan ${p} dan informasi kerja sama lebih lanjut.`,
                `Hubungi saluran komunikasi resmi kami untuk pemesanan dalam jumlah reguler maupun kebutuhan khusus perusahaan Anda.`,
                `Dapatkan penawaran resmi dan rincian katalog lengkap dengan menghubungi perwakilan layanan kami hari ini.`
            ],
            tags: [
                `#SolusiUsaha #${tag} #KualitasTerpercaya #UMKMGo #StandarProfesional`,
                `#KemitraanUsaha #${tag} #PelayananTerbaik #MutuTerjamin #BisnisLokal`,
                `#ProdukProfesional #${tag} #IntegritasMutu #LayananTerpercaya #SolusiBisnis`
            ]
        }
    };

    const selected = data[tone] || data.casual;
    const op = pickRandomItem(selected.openings);
    const bd = pickRandomItem(selected.bodies);
    const ct = pickRandomItem(selected.ctas);
    const tg = pickRandomItem(selected.tags);

    const rollStyle = Math.floor(Math.random() * 3);
    if (rollStyle === 0) {
        return `${op}\n\n${bd}\n\n${ct}\n\n${tg}`;
    } else if (rollStyle === 1) {
        return `${bd}\n\n${op}\n\n${ct}\n\n${tg}`;
    } else {
        return `${op}\n\n${ct}\n\n${bd}\n\n${tg}`;
    }
}

async function handleGenerate() {
    const productInput = document.getElementById('produk');
    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('result-text');
    const btn = document.getElementById('btn-generate');
    const spinner = document.getElementById('loading-spinner');

    if (!productInput) return;

    const product = productInput.value.trim();
    const toneRadio = document.querySelector('input[name="gaya"]:checked');
    const tone = toneRadio ? toneRadio.value : 'casual';

    if (!product) {
        productInput.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        setTimeout(() => productInput.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), 2000);
        productInput.focus();
        return;
    }

    if (resultArea) resultArea.classList.remove('hidden');
    if (spinner) spinner.classList.remove('hidden');
    if (resultText) resultText.textContent = "";
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<svg class="w-5 h-5 animate-spin inline-block mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Menyusun Naskah...`;
    }

    try {
        let captionResult = null;
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product: product,
                    tone: tone
                }),
            });

            const text = await response.text();
            if (text && text.trim()) {
                const data = JSON.parse(text);
                if (data && data.caption) {
                    captionResult = data.caption;
                }
            }
        } catch (fetchErr) {}

        if (!captionResult) {
            captionResult = generateDynamicClientCaption(product, tone);
        }

        if (resultText) {
            resultText.textContent = captionResult;
        }

    } catch (error) {
        console.error("AI Error:", error);
        if (resultText) {
            resultText.textContent = generateDynamicClientCaption(product, tone);
        }
    } finally {
        if (spinner) spinner.classList.add('hidden');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Buat Naskah Promosi`;
        }
        if (resultText) resultText.classList.add('animate-fade-in');
    }
}

function copyResult() {
    const textEl = document.getElementById('result-text');
    if (!textEl) return;
    const text = textEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('button[onclick="copyResult()"]');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = `<svg class="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Tersalin!`;
            setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        }
    });
}

function toggleChat() {
    const box = document.getElementById('chat-box');
    if (!box) return;
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        setTimeout(() => box.classList.add('chat-visible'), 10);
    } else {
        box.classList.remove('chat-visible');
        setTimeout(() => box.classList.add('hidden'), 300);
    }
}

function appendMessage({ role, text }) {
    const chatBody = document.querySelector('#chat-box .p-4.flex-1') || document.getElementById('chat-messages');
    if (!chatBody) return;

    const wrap = document.createElement('div');
    wrap.className = role === 'user' ? 'flex justify-end' : 'flex justify-start';

    const bubble = document.createElement('div');
    bubble.className = role === 'user'
        ? 'bg-brand-600 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-sm'
        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm';

    bubble.innerHTML = `<p class="${role === 'assistant' ? 'text-slate-800 dark:text-slate-200' : ''}">${text.replace(/\n/g, '<br/>')}</p>`;
    wrap.appendChild(bubble);

    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function handleChatSend(message) {
    const input = document.getElementById('chat-input');
    if (!message) return;

    const chatBody = document.querySelector('#chat-box .p-4.flex-1') || document.getElementById('chat-messages');
    if (!chatBody) return;

    appendMessage({ role: 'user', text: message });
    if (input) input.value = '';

    const loadingWrap = document.createElement('div');
    loadingWrap.className = 'flex justify-start';
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm';
    loadingBubble.innerHTML = '<p><span class="text-slate-400 dark:text-slate-500">Sedang mengetik balasan...</span></p>';
    loadingWrap.appendChild(loadingBubble);
    chatBody.appendChild(loadingWrap);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        let replyText = null;
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: message,
                    tone: 'casual'
                })
            });

            const text = await response.text();
            if (text && text.trim()) {
                const data = JSON.parse(text);
                if (data && data.caption) {
                    replyText = data.caption;
                }
            }
        } catch (fetchErr) {}

        loadingWrap.remove();
        appendMessage({ role: 'assistant', text: replyText || 'Halo! Ada yang bisa kami bantu seputar penggunaan fitur dan layanan UMKMGo?' });
    } catch (err) {
        console.error('Chat AI Error:', err);
        loadingWrap.remove();
        appendMessage({ role: 'assistant', text: `Halo! Terima kasih telah menyapa kami. Apakah Anda membutuhkan rekomendasi pembuatan caption, perhitungan HPP, atau kalender konten harian?` });
    }
}

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleChatSend(chatInput.value.trim());
    });
}

const slider = document.getElementById('testimonial-slider');
const prevBtn = document.getElementById('testi-prev');
const nextBtn = document.getElementById('testi-next');
const dots = document.querySelectorAll('.testi-dot');

let currentIndex = 0;
let slideInterval;
const totalSlides = slider ? slider.children.length : 0;

function getItemsPerView() {
    if (window.innerWidth >= 768) {
        return 3;
    }
    return 1;
}

function getMaxIndex() {
    return Math.max(0, Math.ceil(totalSlides / getItemsPerView()) - 1);
}

function goToSlide(index) {
    if (!slider) return;
    const maxIndex = getMaxIndex();
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;

    currentIndex = index;
    const offset = currentIndex * (100 / getItemsPerView());
    slider.style.transform = `translateX(-${offset}%)`;

    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.replace('bg-slate-300', 'bg-brand-600');
            dot.classList.remove('dark:bg-slate-700');
            dot.classList.add('dark:bg-brand-500');
        } else {
            dot.classList.replace('bg-brand-600', 'bg-slate-300');
            dot.classList.remove('dark:bg-brand-500');
            dot.classList.add('dark:bg-slate-700');
        }
    });
}

function startAutoSlide() {
    if (!slider) return;
    slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

if (slider) {
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.getAttribute('data-index'), 10));
            resetAutoSlide();
        });
    });

    startAutoSlide();

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
        slider.style.cursor = 'grabbing';
        clearInterval(slideInterval);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        currentTranslate = currentPosition - startPos;
    });

    slider.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = 'grab';
        if (currentTranslate < -50) {
            goToSlide(currentIndex + 1);
        } else if (currentTranslate > 50) {
            goToSlide(currentIndex - 1);
        }
        currentTranslate = 0;
        startAutoSlide();
    });

    slider.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            slider.style.cursor = 'grab';
            if (currentTranslate < -50) {
                goToSlide(currentIndex + 1);
            } else if (currentTranslate > 50) {
                goToSlide(currentIndex - 1);
            }
            currentTranslate = 0;
            startAutoSlide();
        }
    });

    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startPos = e.touches[0].clientX;
        clearInterval(slideInterval);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = currentPosition - startPos;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        if (currentTranslate < -50) {
            goToSlide(currentIndex + 1);
        } else if (currentTranslate > 50) {
            goToSlide(currentIndex - 1);
        }
        currentTranslate = 0;
        startAutoSlide();
    });

    window.addEventListener('resize', () => goToSlide(currentIndex));
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Mengirimkan pesan Anda...';
        }

        try {
            const formAction = form.action || '';
            if (formAction && formAction.startsWith('http')) {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    window.location.href = '/src/pages/thanks.html';
                    return;
                }
            }
            window.location.href = '/src/pages/thanks.html';
        } catch (error) {
            window.location.href = '/src/pages/thanks.html';
        }
    });
}

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

window.toggleFaq = toggleFaq;
window.handleGenerate = handleGenerate;
window.copyResult = copyResult;
window.toggleChat = toggleChat;
window.showTestimonialModal = showTestimonialModal;
window.closeTestimonialModal = closeTestimonialModal;