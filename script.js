// Rotating Typing Animation
const phrases = [
    "learning as i go",
    "being outside when i can 🌲",
    "probably playing pickleball ",
    "traveling for matcha 🍵",
    "thinking about travel ✈️ ",
    "out for a walk 🚶🏻‍♀️",
    "trying new things",
    "getting my beli rankings ⬆️",
    "soaking up the sun ... and rain :("
];

const typedTextElement = document.getElementById('typed-text');
const cursorElement = document.querySelector('.cursor');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Delete characters
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        // Type characters
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
    
    // When done typing
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    }
    
    // When done deleting
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Next phrase
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

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
    
    // Recreate charts with updated colors
    setTimeout(() => {
        createSkillsCharts();
    }, 50);
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

// Smooth Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            // Optional: stop observing after animation (better performance)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
fadeElements.forEach(el => observer.observe(el));

// Skills Data Visualization
let radarChart = null;
let barChart = null;

function createSkillsCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Detect dark mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#e6edf3' : '#666666';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Destroy existing charts if they exist
    if (radarChart) {
        radarChart.destroy();
    }
    if (barChart) {
        barChart.destroy();
    }

    // Radar Chart - Technical Skills
    const radarCtx = document.getElementById('skillsRadarChart');
    if (radarCtx) {
        radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['python', 'javascript', 'sql', 'data analysis', 'ux design', 'web development'],
                datasets: [{
                    label: 'proficiency level',
                    data: [85, 80, 85, 90, 85, 80],
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(13, 110, 253, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: gridColor
                        },
                        angleLines: {
                            color: gridColor
                        },
                        ticks: {
                            stepSize: 20,
                            color: textColor,
                            backdropColor: 'transparent',
                            font: {
                                size: 14
                            }
                        },
                        pointLabels: {
                            color: textColor,
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Bar Chart - Tools & Frameworks
    const barCtx = document.getElementById('toolsBarChart');
    if (barCtx) {
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['react', 'django', 'figma', 'firebase', 'tableau', 'github'],
                datasets: [{
                    label: 'experience (months)',
                    data: [18, 12, 24, 15, 18, 30],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.8)',
                        'rgba(13, 202, 240, 0.8)',
                        'rgba(111, 66, 193, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)',
                        'rgba(25, 135, 84, 0.8)'
                    ],
                    borderColor: [
                        'rgba(13, 110, 253, 1)',
                        'rgba(13, 202, 240, 1)',
                        'rgba(111, 66, 193, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(25, 135, 84, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            stepSize: 6,
                            color: textColor,
                            font: {
                                size: 14
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                size: 13
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Create charts when page loads
window.addEventListener('load', () => {
    setTimeout(createSkillsCharts, 100);
});