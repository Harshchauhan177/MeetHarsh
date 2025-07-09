// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');

// Project data
const projects = {
    ecoventure: {
        title: 'EcoVenture',
        description: 'An environmental awareness game built with SwiftUI that features multiple levels, coin collection system, and real-world action challenges. Players learn about environmental conservation through interactive gameplay while earning rewards for completing eco-friendly tasks.',
        tech: ['SwiftUI', 'Game Development', 'Core Data', 'SpriteKit'],
        github: 'https://github.com/Harshchauhan177/EcoVentureRepo'
    },
    wealthhome: {
        title: 'WealthHome',
        description: 'A comprehensive real estate platform built with modern web technologies. Features include property listings, advanced search filters, user authentication, and a responsive design that works seamlessly across all devices.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Supabase'],
        github: 'https://github.com/Harshchauhan177/WealthHome',
        demo: 'https://harshchauhan177.github.io/WealthHome/'
    },
    scanner: {
        title: 'Document Scanner',
        description: 'A sophisticated document scanning application built with C++ and OpenCV. Features include automatic A4 page detection, edge detection, perspective correction, and high-quality image processing for optimal document digitization.',
        tech: ['C++', 'OpenCV', 'Computer Vision', 'Image Processing']
    },
    ikisan: {
        title: 'iKisan App',
        description: 'A comprehensive farming equipment rental platform designed specifically for farmers in Uttar Pradesh. Features include AI-powered recommendations via Gemini API, secure payment processing with Razorpay, and seamless Apple Sign-In integration.',
        tech: ['SwiftUI', 'Supabase', 'Razorpay', 'Gemini API', 'Apple Sign-In']
    }
};

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    
    const themeIcon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Navigation
function toggleNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeNav();
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Project Modal
function openProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    
    const modalTech = document.getElementById('modal-tech');
    modalTech.innerHTML = '';
    project.tech.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        modalTech.appendChild(techTag);
    });
    
    const githubLink = document.getElementById('modal-github');
    const demoLink = document.getElementById('modal-demo');
    
    if (project.github) {
        githubLink.href = project.github;
        githubLink.style.display = 'inline-block';
    } else {
        githubLink.style.display = 'none';
    }
    if (project.demo) {
        demoLink.href = project.demo;
        demoLink.style.display = 'inline-block';
    } else {
        demoLink.style.display = 'none';
    }
    
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        document.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
        document.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeProjectModal() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.transform = 'translate(-50%, -50%) scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Contact Form
// function handleContactForm(e) {
//     e.preventDefault();
//     const formData = new FormData(contactForm);
//     const submitBtn = contactForm.querySelector('button[type="submit"]');
//     const btnText = submitBtn.querySelector('.btn-text');
//     const btnIcon = submitBtn.querySelector('.btn-icon');
//     // Simulate form submission
//     submitBtn.disabled = true;
//     btnText.textContent = 'Sending...';
//     setTimeout(() => {
//         submitBtn.classList.add('success');
//         btnText.textContent = 'Message Sent!';
//         // Reset form
//         setTimeout(() => {
//             contactForm.reset();
//             submitBtn.classList.remove('success');
//             btnText.textContent = 'Send Message';
//             submitBtn.disabled = false;
//         }, 2000);
//     }, 1500);
// }

// Download Resume
function downloadResume() {
    window.open('https://drive.google.com/file/d/1WGCagtumh-q57BtT1QAkYIOSuFmWUM5m/view?usp=sharing', '_blank');
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize everything
function init() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Add event listeners
    navToggle.addEventListener('click', toggleNav);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Contact form
    // contactForm.addEventListener('submit', handleContactForm);
    
    // Download resume
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', downloadResume);
    }
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        handleNavbarScroll();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.style.display === 'block') {
            closeProjectModal();
        }
    });
    
    // Setup intersection observer
    setupIntersectionObserver();
    
    // Initial scroll check
    handleScrollAnimations();
    handleNavbarScroll();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some fun interactive elements
function addParticleEffect() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particles.appendChild(particle);
    }
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle effect
document.addEventListener('DOMContentLoaded', addParticleEffect);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(rippleStyle);
