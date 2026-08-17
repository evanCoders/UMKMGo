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

    document.querySelectorAll('.accordion-item').forEach((otherItem) => {
        if (otherItem !== item) {
            setAccordionItemState(otherItem, false);
        }
    });

    setAccordionItemState(item, !isOpen);
}

function openFirstAccordion() {
    const firstItem = document.querySelector('.accordion-item');
    if (!firstItem) return;

    const firstContent = firstItem.querySelector('.accordion-content');
    const firstHeader = firstItem.querySelector('.accordion-header');

    if (!firstContent || !firstHeader) return;

    document.querySelectorAll('.accordion-item').forEach((item) => {
        setAccordionItemState(item, false);
    });

    setAccordionItemState(firstItem, true);
}

function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    if (headers.length === 0) return;

    document.querySelectorAll('.accordion-item').forEach((item) => {
        const content = item.querySelector('.accordion-content');
        const isOpen = content?.classList.contains('open') || false;
        setAccordionItemState(item, isOpen);
    });

    headers.forEach((header) => {
        if (!header.dataset.bound) {
            header.dataset.bound = 'true';
            header.addEventListener('click', function() {
                toggleAccordion(this);
            });

            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(this);
                }
            });
        }
    });

    const anyOpen = document.querySelector('.accordion-content.open');
    if (!anyOpen) {
        openFirstAccordion();
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
} else {
    initAccordions();
}

window.toggleAccordion = toggleAccordion;