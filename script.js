document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  
    // Reveal sections on scroll using IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
    };
  
    const revealElements = document.querySelectorAll('.section');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    revealElements.forEach((el) => {
      revealOnScroll.observe(el);
    });
  });
  