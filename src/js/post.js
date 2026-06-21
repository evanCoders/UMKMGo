// Theme toggle (consistent key)
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-light-icon');
    const darkIcon = document.getElementById('theme-dark-icon');
    const THEME_KEY = 'umkmgo-theme';

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
      if (stored) return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Init icons state
    if (lightIcon && darkIcon) applyTheme(getInitialTheme());

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }

    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Data articles (Updated Images & Added Missing Articles to match blog.html)
    const articles = [
      {
        id: 1,
        slug: "strategi-digital-umkm-2026",
        category: "Tips & Trik",
        categoryKey: "tips",
        date: "15 Mei 2026",
        title: "4 Strategi Digital untuk UMKM agar Tidak Tergerus Zaman",
        cover: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p><strong>Transformasi digital</strong> bukan lagi pilihan, tapi keharusan untuk mempertahankan daya saing UMKM di era AI.</p>
          <h3>1) Rapikan positioning produk</h3>
          <p>Tentukan siapa target pelanggan Anda, masalah apa yang diselesaikan produk, dan alasan mengapa harus memilih Anda.</p>
          <h3>2) Konsisten di channel utama</h3>
          <p>Fokus pada satu atau dua platform yang paling sesuai dengan audiens Anda agar eksekusi lebih cepat dan terukur.</p>
          <h3>3) Otomatiskan proses konten & penjualan</h3>
          <p>Gunakan AI untuk membuat caption, ide promosi, hingga respon awal chat pelanggan.</p>
          <h3>4) Ukur & evaluasi mingguan</h3>
          <p>Perhatikan metrik seperti engagement, konversi, dan repeat order—lalu perbaiki strategi secara bertahap.</p>
          <p><em>Mulai dari langkah kecil hari ini, hasilnya akan terasa dalam beberapa minggu ke depan.</em></p>
        `
      },
      {
        id: 2,
        slug: "5-tools-ai-gratis-umkm",
        category: "Tips",
        categoryKey: "tips",
        date: "12 Mei 2026",
        title: "5 Tools AI Gratis untuk UMKM Pemula",
        cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>Berikut tools AI yang bisa membantu UMKM pemula meningkatkan efisiensi tanpa biaya besar.</p>
          <ol>
            <li><strong>AI Copywriting</strong> untuk membuat caption dan deskripsi produk.</li>
            <li><strong>AI Ide Konten</strong> untuk daftar posting mingguan.</li>
            <li><strong>AI Chat Draft</strong> agar balasan pelanggan lebih cepat.</li>
            <li><strong>AI Ringkasan</strong> untuk membaca dan merangkum informasi penting.</li>
            <li><strong>AI Template</strong> untuk struktur promosi dan script.</li>
          </ol>
          <p>Gunakan tools ini secara konsisten, lalu evaluasi hasilnya dari interaksi dan penjualan.</p>
        `
      },
      {
        id: 3,
        slug: "dari-warung-ke-ekspor-batik-kenanga",
        category: "Kisah Sukses",
        categoryKey: "success",
        date: "10 Mei 2026",
        title: "Dari Warung ke Ekspor: Kisah Batik Kenanga",
        cover: "https://images.unsplash.com/photo-1596568362037-1c6a8e11fd67?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>Batik asal Pekalongan ini berhasil menembus pasar internasional dengan strategi digital yang tepat.</p>
          <h3>Awal perubahan</h3>
          <p>Mereka mulai dari konsistensi konten dan pembenahan komunikasi produk.</p>
          <h3>Peran AI</h3>
          <p>AI membantu menyusun deskripsi produk dan variasi caption agar produk mudah ditemukan.</p>
          <h3>Hasil</h3>
          <p>Penjualan naik dan peluang ekspor terbuka melalui kredibilitas brand.</p>
        `
      },
      {
        id: 4,
        slug: "rumus-caption-instagram-umkm",
        category: "Pemasaran",
        categoryKey: "marketing",
        date: "8 Mei 2026",
        title: "7 Rumus Caption Instagram yang Bikin Produk Laris",
        cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>Caption bukan sekadar tulisan—caption adalah “pancingan” agar orang mau bertanya dan akhirnya membeli.</p>
          <ul>
            <li>Rumus masalah → solusi</li>
            <li>Rumus fitur → manfaat</li>
            <li>Rumus testimoni</li>
            <li>Rumus before-after</li>
            <li>Rumus cerita singkat</li>
            <li>Rumus promo dengan urgency</li>
            <li>Rumus CTA pertanyaan</li>
          </ul>
          <p>Gunakan salah satu rumus tiap konten agar hasilnya lebih konsisten.</p>
        `
      },
      {
        id: 5,
        slug: "kelola-keuangan-umkm-dengan-ai",
        category: "Keuangan",
        categoryKey: "finance",
        date: "5 Mei 2026",
        title: "Kelola Keuangan UMKM Tanpa Ribet dengan AI",
        cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>AI dapat membantu pencatatan pemasukan/pengeluaran dan memberi ringkasan laporan secara cepat.</p>
          <h3>Yang bisa Anda mulai</h3>
          <ul>
            <li>Catat transaksi harian</li>
            <li>Lihat rekap bulanan</li>
            <li>Identifikasi arus kas</li>
          </ul>
          <p>Semakin rapi pencatatan, semakin akurat keputusan bisnis Anda.</p>
        `
      },
      {
        id: 6,
        slug: "keuntungan-chatbot-ai-bisnis-online",
        category: "Teknologi",
        categoryKey: "technology",
        date: "2 Mei 2026",
        title: "Keuntungan Pakai Chatbot AI untuk Bisnis Online",
        cover: "https://images.unsplash.com/photo-1531746790095-e5995aba4f58?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>Layani pelanggan 24 jam tanpa henti dengan chatbot AI. Ini manfaat yang bisa Anda dapatkan.</p>
          <ul>
            <li>Respon instan 24/7</li>
            <li>Mengurangi beban kerja tim customer service</li>
            <li>Meningkatkan konversi penjualan</li>
            <li>Memvalidasi lead secara otomatis</li>
          </ul>
          <p>Dengan chatbot, pelanggan tidak perlu menunggu lama lagi!</p>
        `
      },
      {
        id: 7,
        slug: "strategi-konten-viral-umkm",
        category: "Pemasaran",
        categoryKey: "marketing",
        date: "28 April 2026",
        title: "Strategi Konten Viral untuk UMKM di 2026",
        cover: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=1200&h=700&fit=crop",
        author: { name: "Tim UMKMGo", role: "Author", avatar: "https://ui-avatars.com/api/?name=Tim+UMKMGo&background=0D9488&color=fff" },
        content: `
          <p>Tips membuat konten yang engaging dan berpotensi viral di media sosial.</p>
          <h3>1. Pahami Algoritma</h3>
          <p>Setiap platform memiliki algoritma sendiri. Pelajari kapan waktu terbaik posting dan format apa yang disukai.</p>
          <h3>2. Konten Edukatif & Menghibur</h3>
          <p>Orang suka membagikan hal yang bermanfaat atau menghibur. Gabungkan keduanya.</p>
          <h3>3. Hook di 3 Detik Pertama</h3>
          <p>Pastikan pembuka konten Anda menarik perhatian sejak awal agar orang tidak scroll ke bawah.</p>
        `
      }
    ];

    // Helper parse query
    function getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    const slugParam = getQueryParam('slug');
    const idParam = getQueryParam('id');

    const bySlug = slugParam ? articles.find(a => a.slug === slugParam) : undefined;
    const byId = idParam ? articles.find(a => String(a.id) === String(idParam)) : undefined;
    const article = bySlug || byId;

    const card = document.getElementById('article-card');
    const empty = document.getElementById('empty-state');

    if (!article) {
      card.classList.add('hidden');
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      card.classList.remove('hidden');

      document.getElementById('cover-img').src = article.cover;
      document.getElementById('cover-img').alt = "Cover " + article.title;

      const badge = document.getElementById('category-badge');
      badge.textContent = article.category;

      document.getElementById('date-text').textContent = article.date;
      document.getElementById('title-text').textContent = article.title;

      document.getElementById('author-name').textContent = article.author.name;
      document.getElementById('author-role').textContent = article.author.role;
      document.getElementById('author-avatar').src = article.author.avatar;

      const content = document.getElementById('content-area');
      content.innerHTML = article.content;

      // Re-observe reveal items inside dynamically loaded content
      content.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      content.classList.add('visible');
    }