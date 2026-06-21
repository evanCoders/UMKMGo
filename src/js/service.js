// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
// Support both naming conventions found across pages
const lightIcon =
    document.getElementById('theme-light-icon') ||
    document.getElementById('theme-toggle-light-icon');
const darkIcon =
    document.getElementById('theme-dark-icon') ||
    document.getElementById('theme-toggle-dark-icon');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);

    // If icons exist, toggle them
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
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (themeToggle) {
    applyTheme(getInitialTheme());

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

// ============================================================
// REVEAL ANIMATION
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// ACCORDION TOGGLE
// ============================================================
function toggleAccordion(headerElement) {
    const item = headerElement.closest('.accordion-item');
    if (!item) return;
    
    const content = item.querySelector('.accordion-content');
    const icon = headerElement.querySelector('.accordion-icon');
    const isOpen = content.classList.contains('open');

    // Tutup semua accordion lain
    document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
            c.classList.remove('open');
            const parentIcon = c.closest('.accordion-item')?.querySelector('.accordion-icon');
            if (parentIcon) parentIcon.classList.remove('rotate');
        }
    });

    // Toggle yang diklik
    if (isOpen) {
        content.classList.remove('open');
        if (icon) icon.classList.remove('rotate');
    } else {
        content.classList.add('open');
        if (icon) icon.classList.add('rotate');
    }
}

// ============================================================
// BUKA ACCORDION PERTAMA SECARA DEFAULT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const firstAccordion = document.querySelector('.accordion-item .accordion-content');
    if (firstAccordion) {
        firstAccordion.classList.add('open');
        const icon = firstAccordion.closest('.accordion-item')?.querySelector('.accordion-icon');
        if (icon) icon.classList.add('rotate');
    }
});