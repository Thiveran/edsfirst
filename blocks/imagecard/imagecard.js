export default function decorate(block) {
  // Add a class to the block for styling
  block.classList.add('imagecard-wrapper');

  // Store all images and their captions
  const images = [];

  // Loop through each card inside the block
  [...block.children].forEach((card, index) => {
    card.classList.add('imagecard-card');

    // Move the <p> text into the image wrapper
    const [imageWrapper, textWrapper] = card.children;
    if (textWrapper && imageWrapper) {
      const text = textWrapper.querySelector('p');
      if (text) {
        textWrapper.remove();
        imageWrapper.appendChild(text);
      }
    }

    // Get the image and caption
    const img = card.querySelector('img');
    const caption = card.querySelector('p')?.textContent?.trim() || '';

    // Save image info and add click event
    if (img) {
      images.push({ src: img.src, caption });
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openCarousel(index));
    }
  });

  // Create the modal (popup) for the carousel
  const modal = document.createElement('div');
  modal.className = 'imagecard-carousel';
  modal.innerHTML = `
    <span class="carousel-close">&times;</span>
    <img class="carousel-img" />
    <div class="carousel-caption"></div>
    <div class="carousel-nav">
      <span class="carousel-prev">&#10094;</span>
      <span class="carousel-next">&#10095;</span>
    </div>
  `;
  document.body.appendChild(modal);

  // Get modal elements
  const modalImg = modal.querySelector('.carousel-img');
  const captionBox = modal.querySelector('.carousel-caption');
  let currentIndex = 0;

  // Show the modal with the selected image
  function openCarousel(index) {
    currentIndex = index;
    updateCarousel();
    modal.style.display = 'flex';
  }

  // Update the image and caption in the modal
  function updateCarousel() {
    const { src, caption } = images[currentIndex];
    modalImg.src = src;
    captionBox.textContent = caption;
  }

  // Close the modal
  function closeCarousel() {
    modal.style.display = 'none';
  }

  // Show next image
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  // Show previous image
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  // Add event listeners for modal buttons
  modal.querySelector('.carousel-close').addEventListener('click', closeCarousel);
  modal.querySelector('.carousel-next').addEventListener('click', showNext);
  modal.querySelector('.carousel-prev').addEventListener('click', showPrev);

  // Add keyboard support
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeCarousel();
    }
  });

  // Close modal if user clicks outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCarousel();
  });
}
