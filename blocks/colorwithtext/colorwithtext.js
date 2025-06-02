export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  const [colorCell, textCell] = row.children;
 
  // Get the color value from the first cell
  const color = colorCell.textContent.trim().toLowerCase();
 
  // Clear the color cell content
  colorCell.textContent = '';
 
  // Apply styles
  row.classList.add('colorwithtext-row');
  row.style.backgroundColor = color;
 
  // Move the text content to the center
  textCell.classList.add('colorwithtext-text');
}