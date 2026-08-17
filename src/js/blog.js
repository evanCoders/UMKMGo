const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const tabBtns = document.querySelectorAll('.tab-btn');
const allPosts = document.querySelectorAll('.post-card');
const featuredPost = document.querySelector('.featured-post');
const emptyState = document.getElementById('empty-state');
const postsContainer = document.getElementById('posts-container');

function filterPosts(category) {
    if (!emptyState || !postsContainer) return;
    let visibleCount = 0;

    allPosts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        if (category === 'all' || postCategory === category) {
            post.style.display = '';
            visibleCount++;
        } else {
            post.style.display = 'none';
        }
    });

    if (featuredPost) {
        if (category === 'all' || category === 'tips') {
            featuredPost.style.display = '';
            visibleCount++;
        } else {
            featuredPost.style.display = 'none';
        }
    }

    if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
        postsContainer.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        postsContainer.classList.remove('hidden');
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-tab');

        tabBtns.forEach(b => {
            if (b.getAttribute('data-tab') === category) {
                b.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'active');
                b.classList.remove('text-gray-600', 'dark:text-gray-300');
            } else {
                b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'active');
                b.classList.add('text-gray-600', 'dark:text-gray-300');
            }
        });

        filterPosts(category);
    });
});

filterPosts('all');
