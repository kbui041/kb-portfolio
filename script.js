// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

// Check for saved dark mode preference
const currentMode = localStorage.getItem('darkMode');
if (currentMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeIcon.classList.remove('bi-moon-fill');
    darkModeIcon.classList.add('bi-sun-fill');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun-fill');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('bi-sun-fill');
        darkModeIcon.classList.add('bi-moon-fill');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Smooth Cursor Trail Effect
let lastTime = 0;
const throttleDelay = 5; // Milliseconds between trail dots

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    
    // Throttle to make it smoother
    if (now - lastTime < throttleDelay) return;
    lastTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    // Smooth fade out
    setTimeout(() => {
        trail.classList.add('fade');
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        trail.remove();
    }, 600);
});

const backToTopButton = document.getElementById('backToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});