// ===== Theme Toggle =====
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeUI(next);
}

function updateThemeUI(theme) {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (!icon || !text) return;
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Light';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.textContent = 'Dark';
    }
}

// ===== Lightbox =====
function initLightbox() {
    const images = document.querySelectorAll('.gallery-image:not(.error)');
    if (!images.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-close">&times;</div><img src="" alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const close = lightbox.querySelector('.lightbox-close');

    images.forEach(el => {
        el.addEventListener('click', () => {
            img.src = el.src;
            caption.textContent = el.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const hide = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    close.addEventListener('click', hide);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) hide(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const cards = document.querySelectorAll('.section-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => observer.observe(card));
}

// ===== Image Error Fallback =====
function initImageFallback() {
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('error', function() {
            this.classList.add('error');
            this.alt = 'Image coming soon';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.background = 'var(--bg-secondary)';
            this.style.border = '2px dashed var(--border-color)';
            this.style.minHeight = '160px';
            this.style.objectFit = 'none';
            this.removeAttribute('src');
        });
    });
}

// ===== Scroll Progress =====
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        bar.style.width = total > 0 ? (h.scrollTop / total * 100) + '%' : '0%';
    });
}

// ===== Back to Top =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    initLightbox();
    initScrollReveal();
    initImageFallback();
    initScrollProgress();
    initBackToTop();
});

window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
