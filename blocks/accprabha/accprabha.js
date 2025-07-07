export default function decorate(block) {
 const rows = [...block.children];

 const mainTitleRow = rows.shift();
 const mainTitleCell = mainTitleRow.querySelector('div');
 const mainTitleText = mainTitleCell?.innerText || '';

 const wrapper = document.createElement('div');
 wrapper.className = 'accordion-wrapper';
 
 if (mainTitleText) {
   const mainHeading = document.createElement('h2');
   mainHeading.className = 'accordion-main-title';
   mainHeading.textContent = mainTitleText;
   wrapper.append(mainHeading);
 }
 
 rows.forEach((row) => {
   const cells = row.querySelectorAll('div');
   const title = cells[0]?.innerHTML;
   const left = cells[1]?.innerHTML;
   const right = cells[2]?.innerHTML;
   
   if (!title && !left && !right) return;
   const item = document.createElement('div');
   item.className = 'accordion-item';
   
   const heading = document.createElement('button');
   heading.className = 'accordion-title';
   
   const titleSpan = document.createElement('span');
   titleSpan.className = 'accordion-title-text';
   titleSpan.innerHTML = title || 'Untitled Section';
   
   const arrowSpan = document.createElement('span');
   arrowSpan.className = 'accordion-arrow';
   arrowSpan.textContent = '▼';
   heading.append(titleSpan, arrowSpan);
   heading.addEventListener('click', () => {
     item.classList.toggle('open');
   });
   
   const content = document.createElement('div');
   content.className = 'accordion-content';
   
   if (left && !right) {
     const single = document.createElement('div');
     single.className = 'accordion-single';
     single.innerHTML = left;
     content.append(single);
   } else if (!left && right) {
     const single = document.createElement('div');
     single.className = 'accordion-single';
     single.innerHTML = right;
     content.append(single);
   } else if (left && right) {
     const leftDiv = document.createElement('div');
     leftDiv.className = 'accordion-left';
     leftDiv.innerHTML = left;
     const rightDiv = document.createElement('div');
     rightDiv.className = 'accordion-right';
     rightDiv.innerHTML = right;
     content.append(leftDiv, rightDiv);
   } else {
     
     const empty = document.createElement('div');
     empty.className = 'accordion-single';
     empty.innerHTML = '<p>No content provided.</p>';
     content.append(empty);
   }
   item.append(heading, content);
   wrapper.append(item);
 });
 
 block.innerHTML = '';
 block.append(wrapper);
}