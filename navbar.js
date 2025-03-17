document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.fixed-index li a');

  // Function to update the highlighted nav item
  function updateNavHighlight() {
    let currentSectionId = '';
    
    navLinks.forEach(link => {
      // Get the section element using the link's href attribute
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        // Get the top position of the section relative to the document
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // If we've scrolled past a third of the section, consider it the current section
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSectionId = section.getAttribute('id');
        }
      }
    });

    // Remove the highlight class from all nav items
    document.querySelectorAll('.fixed-index li').forEach(li => {
      li.classList.remove('nav-highlight');
    });

    // Add the highlight class to the corresponding nav item if a section is found
    if (currentSectionId) {
      const activeLink = document.querySelector('.fixed-index li a[href="#' + currentSectionId + '"]');
      if (activeLink && activeLink.parentElement) {
        activeLink.parentElement.classList.add('nav-highlight');
      }
    }
  }

  // Call the function on scroll and on initial load
  window.addEventListener('scroll', updateNavHighlight);
  updateNavHighlight();
});
