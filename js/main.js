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
const sections = document.querySelectorAll('section[id]');
const allSections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('back-to-top');
let currentSection = 0;

function updateScrollUI() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const scrollPosition = scrollY + window.innerHeight / 2;
    allSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && currentSection !== index) {
            currentSection = index;
            allSections.forEach(s => s.classList.remove('active-section'));
            section.classList.add('active-section');
        }
    });
}

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
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Stagger animation observer
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add stagger animations to grids
const projectsGrid = document.querySelector('.projects-grid');
const newsGrid = document.querySelector('.news-grid');

if (projectsGrid) {
    projectsGrid.classList.add('stagger-animation');
    staggerObserver.observe(projectsGrid);
}

if (newsGrid) {
    newsGrid.classList.add('stagger-animation');
    staggerObserver.observe(newsGrid);
}

// Fade in from left/right
const fadeLeftElements = document.querySelectorAll('.about-image, .contact-info');
const fadeRightElements = document.querySelectorAll('.about-text');

fadeLeftElements.forEach(el => {
    el.classList.add('fade-in-left');
    staggerObserver.observe(el);
});

fadeRightElements.forEach(el => {
    el.classList.add('fade-in-right');
    staggerObserver.observe(el);
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }
    });
}, { threshold: 0.1 });

const timeline = document.querySelector('.timeline');
if (timeline) {
    timelineObserver.observe(timeline);
}

// ==========================================
// PROJECT CARD TILT EFFECT
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    let rafId = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isPointerInside = false;

    const renderTilt = () => {
        currentRotateX += (targetRotateX - currentRotateX) * 0.14;
        currentRotateY += (targetRotateY - currentRotateY) * 0.14;

        const lift = isPointerInside ? -10 : 0;
        const scale = isPointerInside ? 1.01 : 1;

        card.style.transform = `perspective(1000px) translate3d(0, ${lift}px, 0) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(${scale})`;

        if (
            Math.abs(targetRotateX - currentRotateX) > 0.02 ||
            Math.abs(targetRotateY - currentRotateY) > 0.02 ||
            Math.abs(currentRotateX) > 0.02 ||
            Math.abs(currentRotateY) > 0.02 ||
            isPointerInside
        ) {
            rafId = window.requestAnimationFrame(renderTilt);
        } else {
            rafId = null;
        }
    };

    const startTilt = () => {
        if (rafId === null) {
            rafId = window.requestAnimationFrame(renderTilt);
        }
    };

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        isPointerInside = true;
        targetRotateX = (y - centerY) / 18;
        targetRotateY = (centerX - x) / 18;

        startTilt();
    });

    card.addEventListener('mouseleave', () => {
        isPointerInside = false;
        targetRotateX = 0;
        targetRotateY = 0;
        startTilt();
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
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!cursorVisible) {
        cursor.classList.add('active');
        cursorX = mouseX;
        cursorY = mouseY;
        cursorVisible = true;
    }
});

function animateCursor() {
    const delay = 0.18;

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
        const styles = getComputedStyle(document.documentElement);
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursor.style.backgroundColor = styles.getPropertyValue('--cursor-color').trim();
        cursor.style.boxShadow = `0 0 0 10px ${styles.getPropertyValue('--cursor-ring').trim()}`;
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = '';
        cursor.style.boxShadow = '';
    });
});

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

    updateScrollUI();

    console.log('Portfolio website loaded successfully! 🚀');
});

window.addEventListener('scroll', updateScrollUI, { passive: true });

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
