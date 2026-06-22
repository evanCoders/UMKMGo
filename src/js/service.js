// ============================================================
// src/js/service.js
// ============================================================

// ============================================================
// ACCORDION TOGGLE
// ============================================================
function setAccordionItemState(item, isOpen) {
    if (!item) return;

    const content = item.querySelector('.accordion-content');
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');

    if (!content) return;

    if (isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.setAttribute('aria-hidden', 'false');
        if (header) header.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.add('rotate');
    } else {
        content.classList.remove('open');
        content.style.maxHeight = '0px';
        content.setAttribute('aria-hidden', 'true');
        if (header) header.setAttribute('aria-expanded', 'false');
        if (icon) icon.classList.remove('rotate');
    }
}

function toggleAccordion(headerElement) {
    if (!headerElement) return;

    const item = headerElement.closest('.accordion-item');
    if (!item) return;

    const content = item.querySelector('.accordion-content');
    if (!content) return;

    const isOpen = content.classList.contains('open');

    // Tutup semua accordion lain
    document.querySelectorAll('.accordion-item').forEach((otherItem) => {
        if (otherItem !== item) {
            setAccordionItemState(otherItem, false);
        }
    });

    // Toggle yang diklik
    setAccordionItemState(item, !isOpen);
}

function openFirstAccordion() {
    const firstItem = document.querySelector('.accordion-item');
    if (!firstItem) return;

    const firstContent = firstItem.querySelector('.accordion-content');
    const firstHeader = firstItem.querySelector('.accordion-header');

    if (!firstContent || !firstHeader) return;

    // Reset semua accordion
    document.querySelectorAll('.accordion-item').forEach((item) => {
        setAccordionItemState(item, false);
    });

    // Buka pertama
    setAccordionItemState(firstItem, true);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion-header');

    if (headers.length === 0) return;

    // Set initial state berdasarkan class .open di HTML
    document.querySelectorAll('.accordion-item').forEach((item) => {
        const content = item.querySelector('.accordion-content');
        const isOpen = content?.classList.contains('open') || false;
        setAccordionItemState(item, isOpen);
    });

    // Bind event click dan keyboard
    headers.forEach((header) => {
        // Click
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });

        // Keyboard (Enter / Space)
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(this);
            }
        });
    });

    // Buka accordion pertama secara default (jika belum ada yang terbuka)
    const anyOpen = document.querySelector('.accordion-content.open');
    if (!anyOpen) {
        openFirstAccordion();
    }
});

// ============================================================
// EXPOSE GLOBAL (untuk inline onclick jika masih ada)
// ============================================================
window.toggleAccordion = toggleAccordion;