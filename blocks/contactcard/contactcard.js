export default function decorate(block) {
  const cards = [...block.children];
  block.innerHTML = ''; // Clear existing content
 
  cards.forEach((card) => {
    const [imageDiv, textDiv] = card.children;
 
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card';
 
    // Move image
    const picture = imageDiv.querySelector('picture');
    cardWrapper.appendChild(picture);
 
    // Create content container
    const content = document.createElement('div');
    content.className = 'card-content';
 
    // Move and preserve headings, paragraphs, and buttons
    [...textDiv.children].forEach((el) => {
      if (el.tagName === 'A' || el.querySelector('a')) {
        const link = el.querySelector('a');
        if (link) {
          link.classList.add('button');
          const buttonContainer = document.createElement('p');
          buttonContainer.className = 'button-container';
          buttonContainer.appendChild(link);
          content.appendChild(buttonContainer);
        }
      } else {
        content.appendChild(el);
      }
    });
 
    cardWrapper.appendChild(content);
    block.appendChild(cardWrapper);
  });
}
 
 