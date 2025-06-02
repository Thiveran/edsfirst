export default function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');
 
  if (rows.length >= 2) {
    const titleRow = rows[0];
    const navRow = rows[1];
 
    titleRow.classList.add('navheader-title');
    navRow.classList.add('navheader-links');
 
    // Handle anchor links manually
    const links = navRow.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
 
  // Prevent auto-scroll on page load
  if (window.location.hash) {
    const scrollY = window.scrollY;
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, scrollY);
  }
}