document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour automatique de l'année dans le footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Lightbox gallery overlay
    const lightbox = document.getElementById('lightbox');
    const lightboxGrid = document.getElementById('lightbox-grid');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    // Collect ALL images including hidden ones
    const thumbs = Array.from(document.querySelectorAll('.gallery .thumb img'));

    // Populate lightbox grid with all images
    if (lightboxGrid) {
        thumbs.forEach(img => {
            const imgClone = document.createElement('img');
            imgClone.src = img.src;
            imgClone.alt = img.alt || '';
            lightboxGrid.appendChild(imgClone);
        });
    }

    function openLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Make ALL thumbnails (including the "more" overlay) clickable
    const allThumbs = document.querySelectorAll('.gallery .thumb');
    allThumbs.forEach((thumb) => {
        thumb.style.cursor = 'pointer';
        thumb.addEventListener('click', openLightbox);
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    // Click backdrop to close
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard support: Esc to close
    document.addEventListener('keydown', (e) => {
        if (!lightbox) return;
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});