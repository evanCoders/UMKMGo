// --- Theme (Dark Mode) Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'umkmgo-theme';
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIcon = document.getElementById('theme-toggle-dark-icon');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, theme);

    // Toggle Icons
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

// --- 1. Mobile Menu Logic ---
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

// Guard: beberapa halaman tidak punya elemen mobile menu
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden', !isMenuOpen);
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            isMenuOpen = false;
        });
    });
}


// --- 2. Scroll Reveal Animation ---
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

// --- 3. Hero Typing Animation ---
const heroMessages = [
    "Bikin caption jadi 10 detik saja!",
    "Lapor keuangan otomatis rapi.",
    "Chatbot jawab customer 24 jam.",
    "Coba demo gratis di bawah ini!"
];
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deleteSpeed = 30;
const pauseTime = 2000;
const heroElement = document.getElementById('hero-typing');

function typeHero() {
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

setTimeout(typeHero, 1000);

// --- 4. FAQ Accordion ---
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');
    const isOpen = content.style.maxHeight;

    document.querySelectorAll('.faq-content').forEach(el => {
        el.style.maxHeight = null;
        el.classList.remove('open');
        const btn = el.previousElementSibling;
        const ic = btn.querySelector('svg');
        if (ic) ic.classList.remove('rotate-45');
    });

    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('open');
        icon.classList.add('rotate-45');
    }
}

// --- 5. Generate Caption Logic (Direct AI Connection) ---
async function handleGenerate() {
    const productInput = document.getElementById('produk');
    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('result-text');
    const btn = document.getElementById('btn-generate');
    const spinner = document.getElementById('loading-spinner');

    const product = productInput.value.trim();
    const toneRadio = document.querySelector('input[name="gaya"]:checked');
    const tone = toneRadio ? toneRadio.value : 'casual';

    if (!product) {
        productInput.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        setTimeout(() => productInput.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), 2000);
        productInput.focus();
        return;
    }

    resultArea.classList.remove('hidden');
    spinner.classList.remove('hidden');
    resultText.textContent = "";
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Memproses...`;

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product: product,
                tone: tone
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Gagal menghubungi AI.");
        }

        resultText.textContent = data.caption;

    } catch (error) {
        console.error("AI Error:", error);
        resultText.innerHTML = `<span class="text-red-600 dark:text-red-400 font-semibold">⚠️ ${error.message || "Terjadi kesalahan koneksi. Silakan coba lagi."}</span>`;
    } finally {
        spinner.classList.add('hidden');
        btn.disabled = false;
        btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Generate Caption`;
        resultText.classList.add('animate-fade-in');
    }
}

function copyResult() {
    const text = document.getElementById('result-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('button[onclick="copyResult()"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Tersalin!`;
        setTimeout(() => btn.innerHTML = originalText, 2000);
    });
}

// --- 6. Chat Widget Toggle + AI Connection ---
function toggleChat() {
    const box = document.getElementById('chat-box');
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        setTimeout(() => box.classList.add('chat-visible'), 10);
    } else {
        box.classList.remove('chat-visible');
        setTimeout(() => box.classList.add('hidden'), 300);
    }
}

function appendMessage({ role, text }) {
    const wrap = document.createElement('div');
    wrap.className = role === 'user' ? 'flex justify-end' : 'flex justify-start';

    const bubble = document.createElement('div');
    bubble.className = role === 'user'
        ? 'bg-brand-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]'
        : 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]';

    bubble.innerHTML = `<p class="${role === 'assistant' ? 'text-gray-900 dark:text-gray-100' : ''}">${text.replace(/\n/g, '<br/>')}</p>`;
    wrap.appendChild(bubble);

    const chatBody = document.querySelector('#chat-box .p-4.flex-1');
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function handleChatSend(message) {
    const input = document.getElementById('chat-input');
    if (!message) return;

    const chatBody = document.querySelector('#chat-box .p-4.flex-1');

    appendMessage({ role: 'user', text: message });
    input.value = '';

    const loadingWrap = document.createElement('div');
    loadingWrap.className = 'flex justify-start';
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]';
    loadingBubble.innerHTML = '<p><span class="text-gray-500">Sedang mengetik...</span></p>';
    loadingWrap.appendChild(loadingBubble);
    chatBody.appendChild(loadingWrap);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product: message,
                tone: 'casual'
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Gagal menghubungi AI');

        loadingWrap.remove();
        appendMessage({ role: 'assistant', text: data.caption });
    } catch (err) {
        console.error('Chat AI Error:', err);
        loadingWrap.remove();
        appendMessage({ role: 'assistant', text: `⚠️ ${err.message || 'Terjadi kesalahan koneksi. Silakan coba lagi.'}` });
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

// ==================== TESTIMONIAL CAROUSEL LOGIC ====================
const slider = document.getElementById('testimonial-slider');
const prevBtn = document.getElementById('testi-prev');
const nextBtn = document.getElementById('testi-next');
const dots = document.querySelectorAll('.testi-dot');

let currentIndex = 0;
let slideInterval;
const totalSlides = slider.children.length;

// Determine items per view based on screen width
function getItemsPerView() {
    if (window.innerWidth >= 768) { // md breakpoint
        return 3;
    }
    return 1;
}

// Calculate maximum index
function getMaxIndex() {
    return Math.ceil(totalSlides / getItemsPerView()) - 1;
}

// Move slide
function goToSlide(index) {
    const maxIndex = getMaxIndex();
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;

    currentIndex = index;
    const offset = currentIndex * (100 / getItemsPerView());
    slider.style.transform = `translateX(-${offset}%)`;

    // Update dots
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.replace('bg-gray-300', 'bg-brand-600');
            dot.classList.remove('dark:bg-slate-700');
            dot.classList.add('dark:bg-brand-500');
        } else {
            dot.classList.replace('bg-brand-600', 'bg-gray-300');
            dot.classList.remove('dark:bg-brand-500');
            dot.classList.add('dark:bg-slate-700');
        }
    });
}

// Next / Prev Controls
nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoSlide();
});

// Dots Controls
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-index')));
        resetAutoSlide();
    });
});

// Auto Slide
function startAutoSlide() {
    slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Ganti slide setiap 5 detik
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

startAutoSlide();

// Drag & Swipe Logic
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.clientX;
    slider.style.cursor = 'grabbing';
    clearInterval(slideInterval); // Pause auto slide on drag
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = currentPosition - startPos;
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
    if (currentTranslate < -50) {
        goToSlide(currentIndex + 1);
    } else if (currentTranslate > 50) {
        goToSlide(currentIndex - 1);
    }
    currentTranslate = 0;
    startAutoSlide(); // Resume auto slide
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

// Touch Events for Mobile
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
    isDragging = false;
    if (currentTranslate < -50) {
        goToSlide(currentIndex + 1);
    } else if (currentTranslate > 50) {
        goToSlide(currentIndex - 1);
    }
    currentTranslate = 0;
    startAutoSlide();
});

// Recalculate on Resize
window.addEventListener('resize', () => goToSlide(currentIndex));

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Mengirim pesan anda...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
window.location.href = '/pages/thanks.html';
        } else {
            throw new Error('Gagal mengirim');
        }
    } catch (error) {
        alert('⚠️ Gagal mengirim pesan. Silakan coba lagi.');
        submitBtn.innerHTML = 'Kirim Pesan';
        submitBtn.disabled = false;
    }
});

// Fungsi global untuk menampilkan modal testimoni
function showTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Mencegah scroll di belakang modal
        // Opsional: Anda juga bisa melacak berapa kali modal muncul
    }
}

// Fungsi untuk menutup modal
function closeTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}