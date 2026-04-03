// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ==========================================
// NAVIGATION
// ==========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger skill bar animations
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }

            // Trigger counter animations
            if (entry.target.classList.contains('statistics')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;

    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((item, index) => {
        setTimeout(() => {
            const progressBar = item.querySelector('.skill-progress');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
            item.classList.add('animate');
        }, index * 100);
    });

    skillsAnimated = true;
}

// ==========================================
// COUNTER ANIMATION
// ==========================================

let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    countersAnimated = true;
}

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDots = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = sliderDots.querySelectorAll('span');

function updateSlider() {
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        dots[index].classList.remove('active');

        if (index === currentSlide) {
            card.classList.add('active');
            dots[index].classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto-slide on hover
document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Initialize slider
updateSlider();

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // In a real application, you would send this to a server
    console.log('Form submitted:', data);

    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Reset form and hide success message after 5 seconds
    setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        contactForm.reset();
    }, 5000);
});

// ==========================================
// PROJECT CARD TILT EFFECT
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// PARALLAX EFFECT
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-content');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// TYPING EFFECT FOR HERO TAGLINE
// ==========================================

const tagline = document.querySelector('.hero-tagline');
const taglineText = tagline.textContent;
tagline.textContent = '';

let charIndex = 0;

function typeWriter() {
    if (charIndex < taglineText.length) {
        tagline.textContent += taglineText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ==========================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ==========================================

const cursor = document.createElement('div');
cursor.className = 'cursor-dot';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const delay = 0.1;

    cursorX += (mouseX - cursorX) * delay;
    cursorY += (mouseY - cursorY) * delay;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-badge');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.5)';
    });
});

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .cursor-dot {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: transform 0.2s ease, background-color 0.2s ease;
        mix-blend-mode: difference;
    }

    @media (max-width: 768px) {
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Trigger initial animations
    document.body.classList.add('loaded');

    console.log('Portfolio website loaded successfully! 🚀');
});

// ==========================================
// SERVICE WORKER REGISTRATION (PWA)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.registerServiceWorker('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
