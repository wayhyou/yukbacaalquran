const navbar = document.querySelector('#navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 90) {
    // Scrolling down
    navbar.classList.add('hidden-nav');
  } else {
    // Scrolling up or at the top
    navbar.classList.remove('hidden-nav');
  }

  lastScrollTop = scrollTop;
});
