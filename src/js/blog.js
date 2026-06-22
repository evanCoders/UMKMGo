// Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const lightIcon = document.getElementById('theme-light-icon');
        const darkIcon = document.getElementById('theme-dark-icon');
        const THEME_KEY = 'umkmgo-theme';

        function applyTheme(theme) {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem(THEME_KEY, theme);

            // Guard: jika ikon tidak ada, jangan crash
            if (!lightIcon || !darkIcon) return;

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
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if (themeToggle) {
            applyTheme(getInitialTheme());
            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('dark');
                applyTheme(isDark ? 'light' : 'dark');
            });
        } else {
            // fallback agar class dark tetap konsisten meski tombol tidak ada
            applyTheme(getInitialTheme());
        }


        // Mobile Menu
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }


        // Scroll Reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // ==================== TAB FILTER ====================
        const tabBtns = document.querySelectorAll('.tab-btn');
        const allPosts = document.querySelectorAll('.post-card');
        const featuredPost = document.querySelector('.featured-post');
        const emptyState = document.getElementById('empty-state');
        const postsContainer = document.getElementById('posts-container');

        function filterPosts(category) {
            if (!emptyState || !postsContainer) return;
            let visibleCount = 0;


            // Filter grid posts
            allPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                if (category === 'all' || postCategory === category) {
                    post.style.display = '';
                    visibleCount++;
                } else {
                    post.style.display = 'none';
                }
            });

            // Handle featured post (hanya tampil di tab 'all' dan 'tips')
            if (featuredPost) {
                if (category === 'all' || category === 'tips') {
                    featuredPost.style.display = '';
                    visibleCount++;
                } else {
                    featuredPost.style.display = 'none';
                }
            }

            // Show/hide empty state & container border
            if (visibleCount === 0) {
                emptyState.classList.remove('hidden');
                postsContainer.classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                postsContainer.classList.remove('hidden');
            }
        }

        // Add click event to each tab button
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-tab');

                // Update active style
                tabBtns.forEach(b => {
                    if (b.getAttribute('data-tab') === category) {
                        b.classList.add('bg-brand-600', 'text-white', 'shadow-md');
                        b.classList.remove('text-gray-600', 'dark:text-gray-300');
                    } else {
                        b.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
                        b.classList.add('text-gray-600', 'dark:text-gray-300');
                    }
                });

                filterPosts(category);
            });
        });

        // Initialize with 'all' category
        filterPosts('all');

