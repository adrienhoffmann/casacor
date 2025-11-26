document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour automatique de l'année dans le footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Ouvrir l'image en grand dans une lightbox au clic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    const thumbs = Array.from(document.querySelectorAll('.gallery .thumb img'));
    let currentIndex = -1;

    function showImageAt(index) {
        if (!lightbox || !lightboxImg) return;
        if (index < 0 || index >= thumbs.length) return;
        const img = thumbs[index];
        currentIndex = index;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        // focus the close button for accessibility
        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; currentIndex = -1; }, 220);
    }

    function showNext() { if (thumbs.length === 0) return; showImageAt((currentIndex + 1) % thumbs.length); }
    function showPrev() { if (thumbs.length === 0) return; showImageAt((currentIndex - 1 + thumbs.length) % thumbs.length); }

    thumbs.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => showImageAt(i));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    // click backdrop to close
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // keyboard support: Esc to close, arrows to navigate
    document.addEventListener('keydown', (e) => {
        if (!lightbox) return;
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        } else if (e.key === 'ArrowRight' && lightbox.classList.contains('open')) {
            showNext();
        } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('open')) {
            showPrev();
        }
    });
});