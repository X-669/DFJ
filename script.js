// OPTIMIZED JAVASCRIPT - DEB'S FLAVOR JUNCTION

// Theme Management
class ThemeManager {
    constructor() {
        this.themes = ['gradient-light', 'light', 'dark'];
        this.currentThemeIndex = 0;
        this.themeButton = document.getElementById('themeToggle');
        this.themeIcons = ['fas fa-palette', 'fas fa-sun', 'fas fa-moon'];
        
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('dfj-theme') || 'gradient-light';
        this.currentThemeIndex = this.themes.indexOf(savedTheme);
        if (this.currentThemeIndex === -1) this.currentThemeIndex = 0;
        
        this.applyTheme();
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        const theme = this.themes[this.currentThemeIndex];
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeButton) {
            const icon = this.themeButton.querySelector('i');
            if (icon) {
                icon.className = this.themeIcons[this.currentThemeIndex];
            }
        }
        
        document.body.style.transition = 'all 0.3s ease';
    }

    saveTheme() {
        localStorage.setItem('dfj-theme', this.themes[this.currentThemeIndex]);
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Header Scroll Effect - Optimized
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        if (this.header) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrolled = window.scrollY > 100;
        this.header.style.background = scrolled ? '#1a1a1a' : '#1a1a1a';
        this.header.style.backdropFilter = scrolled ? 'blur(10px)' : 'none';
    }
}

// Newsletter Form Handler
class NewsletterForm {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.form.querySelector('input[type="email"]')?.value;
        
        if (email && this.validateEmail(email)) {
            this.showMessage('Thank you for subscribing! 🎉', 'success');
            this.form.reset();
        } else {
            this.showMessage('Please enter a valid email address.', 'error');
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.className = `toast toast-${type}`;
        document.body.appendChild(messageEl);
        setTimeout(() => messageEl.remove(), 3000);
    }
}

// Video Card Interactions - Optimized
class VideoInteractions {
    constructor() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-button')) {
                window.open('https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE', '_blank');
            }
        });
    }
}

// Recipe Card Interactions - Optimized
class RecipeInteractions {
    constructor() {
        this.init();
    }

    init() {
        // Only handle clickable recipe cards (not featured ones)
        document.addEventListener('click', (e) => {
            const recipeCard = e.target.closest('.recipe-card:not(.featured-recipes .recipe-card)');
            if (recipeCard && !e.target.closest('a')) {
                this.handleRecipeClick(recipeCard);
            }
        });
    }

    handleRecipeClick(card) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
}

// Back to Top Button - Optimized
class BackToTop {
    constructor() {
        this.button = document.createElement('button');
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.className = 'back-to-top';
        document.body.appendChild(this.button);
        
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    toggleVisibility() {
        this.button.classList.toggle('visible', window.scrollY > 300);
    }
}

// Membership Modal - Optimized
class MembershipModal {
    constructor() {
        this.membershipBtn = document.getElementById('membershipBtn');
        this.modal = document.querySelector('.membership-modal');
        
        if (this.membershipBtn) {
            this.membershipBtn.addEventListener('click', () => this.openModal());
        }
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal || e.target.closest('.membership-modal-close')) {
                    this.closeModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }

    openModal() {
        this.modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Performance Optimization - Streamlined
class PerformanceOptimizer {
    constructor() {
        this.preloadCriticalImages();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'dfj logo2.jpg',
            'Christmas Cake.jpg',
            'Carrot Kheer.jpg',
            'Basanti Pulao.jpg'
        ];

        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                criticalImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            });
        } else {
            setTimeout(() => {
                criticalImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            }, 100);
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('dfj-theme')) {
        localStorage.setItem('dfj-theme', 'gradient-light');
    }
    document.documentElement.setAttribute('data-theme', localStorage.getItem('dfj-theme') || 'gradient-light');
    
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new HeaderScroll();
    new NewsletterForm();
    new VideoInteractions();
    new RecipeInteractions();
    new BackToTop();
    new MembershipModal();
    new PerformanceOptimizer();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager };
}