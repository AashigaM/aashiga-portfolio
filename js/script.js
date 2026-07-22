/**
 * Portfolio Interactive Controller
 * Author: Aashiga Moorthy
 * Scope: Theme Toggling, Mobile Navigation, Scroll Animations, Dynamic Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initThemeToggle();
    initMobileNav();
    initScrollReveal();
    initBackToTop();
});

/* --- Loader Controller --- */
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });
        // Fallback safety timeout
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
}

/* --- Dark/Light Mode Switcher --- */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/* --- Mobile Navigation Hamburger Menu --- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/* --- Case Study Toggle (Projects Page) --- */
function toggleCaseStudy(id) {
    const csElement = document.getElementById(id);
    if (csElement) {
        csElement.classList.toggle('hidden');
        const button = csElement.previousElementSibling;
        if (button && button.classList.contains('case-study-toggle')) {
            const isHidden = csElement.classList.contains('hidden');
            button.innerHTML = isHidden 
                ? 'View Case Study <span class="arrow">&darr;</span>' 
                : 'Hide Case Study <span class="arrow">&uarr;</span>';
        }
    }
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* --- Back To Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
