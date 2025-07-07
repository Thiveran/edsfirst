export default function decorate(block) {
 // Detect style variant
 const isProfessional = block.classList.contains('professional');
 const isClassic = block.classList.contains('classic');
 // Create wrapper
 const wrapper = document.createElement('div');
 wrapper.className = 'tabs-wrapper';
 if (isProfessional) {
   wrapper.classList.add('tabs-professional');
 } else if (isClassic) {
   wrapper.classList.add('tabs-classic');
 } else {
   wrapper.classList.add('tabs-default');
 }
 // Get all tab rows
 const rows = Array.from(block.children);
 const tabButtonsContainer = document.createElement('div');
 tabButtonsContainer.className = 'tab-buttons';
 const tabContentsContainer = document.createElement('div');
 tabContentsContainer.className = 'tab-contents';
 rows.forEach((row, index) => {
   const cells = row.querySelectorAll('div');
   if (cells.length === 0) return;
   const title = cells[0]?.innerHTML.trim() || `Tab ${index + 1}`;
   const content = cells[1]?.innerHTML.trim() || '';
   // Tab button
   const button = document.createElement('button');
   button.className = 'tab-button';
   button.innerHTML = title;
   if (index === 0) button.classList.add('active');
   // Tab content
   const contentDiv = document.createElement('div');
   contentDiv.className = 'tab-content';
   contentDiv.innerHTML = content;
   if (index === 0) contentDiv.classList.add('active');
   button.addEventListener('click', () => {
     // Deactivate all
     tabButtonsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
     tabContentsContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
     // Activate this
     button.classList.add('active');
     contentDiv.classList.add('active');
   });
   tabButtonsContainer.append(button);
   tabContentsContainer.append(contentDiv);
 });
 wrapper.append(tabButtonsContainer, tabContentsContainer);
 // Replace block content
 block.innerHTML = '';
 block.append(wrapper);
}