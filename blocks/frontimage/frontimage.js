export default function decorate(block) {
    block.classList.add('frontimage');
 
    const innerDivs = block.querySelectorAll(':scope > div > div');
    if (innerDivs.length === 2) {
      const imageContainer = innerDivs[0];
      const textContainer = innerDivs[1];
 
      const picture = imageContainer.querySelector('picture');
      const text = textContainer.textContent.trim();
 
      // Create overlay text
      const overlay = document.createElement('div');
      overlay.className = 'overlay-text';
      overlay.textContent = text;
 
      // Remove original text container
      textContainer.remove();
 
      // Append overlay text to image container
      imageContainer.appendChild(overlay);
    } else if (innerDivs.length === 1) {
      // Only image is present, still add an empty overlay to preserve layout
      const imageContainer = innerDivs[0];
      const overlay = document.createElement('div');
      overlay.className = 'overlay-text';
      overlay.textContent = ''; // Empty text
      imageContainer.appendChild(overlay);
    }
  }