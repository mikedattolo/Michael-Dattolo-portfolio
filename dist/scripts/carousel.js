/**
 * Image Carousel Component
 * Provides navigation through project images with keyboard and button controls
 */

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll('[data-carousel-item]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const counter = carousel.querySelector('[data-carousel-counter]');

    if (images.length === 0) return;

    let currentIndex = 0;

    const showImage = (index) => {
      // Wrap around
      currentIndex = (index + images.length) % images.length;

      // Hide all images
      images.forEach((img, i) => {
        img.setAttribute('aria-hidden', i !== currentIndex);
        img.style.display = i === currentIndex ? 'block' : 'none';
      });

      // Update counter
      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
      }

      // Update button states
      if (images.length <= 1) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
      }
    };

    const goToPrevious = () => {
      showImage(currentIndex - 1);
    };

    const goToNext = () => {
      showImage(currentIndex + 1);
    };

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', goToPrevious);
      prevBtn.setAttribute('role', 'button');
      prevBtn.setAttribute('aria-label', 'Previous image');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', goToNext);
      nextBtn.setAttribute('role', 'button');
      nextBtn.setAttribute('aria-label', 'Next image');
    }

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        goToNext();
        e.preventDefault();
      }
    });

    // Initialize
    showImage(0);
  });
});
