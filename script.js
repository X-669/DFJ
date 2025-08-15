// OPTIMIZED JAVASCRIPT - DEB'S FLAVOR JUNCTION

// Shared Utilities
const Utils = {
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.className = `toast toast-${type}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    createModal(className = 'modal') {
        const modal = document.createElement('div');
        modal.className = className;
        return modal;
    }
};

// Optimized Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') this.closeMenu();
        });
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isActive = this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active', isActive);
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
        const form = document.querySelector('.newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]')?.value;
                if (email && Utils.validateEmail(email)) {
                    this.showToast('Thank you for subscribing! 🎉', 'success');
                    form.reset();
                } else {
                    this.showToast('Please enter a valid email address.', 'error');
                }
            });
        }
    }

    showToast(message, type) {
        Utils.showToast(message, type);
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

// Preload critical images
function preloadImages() {
    const images = ['dfj logo2.jpg', 'Christmas Cake.jpg', 'Carrot Kheer.jpg', 'Basanti Pulao.jpg'];
    const loadImages = () => images.forEach(src => { const img = new Image(); img.src = src; });
    'requestIdleCallback' in window ? requestIdleCallback(loadImages) : setTimeout(loadImages, 100);
}

// Unified Theme Management
class ThemeManager {
    constructor() {
        this.themes = ['light', 'dark', 'gradient'];
        this.themeIcons = ['fas fa-sun', 'fas fa-moon', 'fas fa-palette'];
        this.themeButton = document.getElementById('themeToggle');
        this.currentThemeIndex = 0;
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('dfj-theme') || 'light';
        this.currentThemeIndex = Math.max(0, this.themes.indexOf(savedTheme));
        this.applyTheme();
        this.themeButton?.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme();
        localStorage.setItem('dfj-theme', this.themes[this.currentThemeIndex]);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.themes[this.currentThemeIndex]);
        const icon = this.themeButton?.querySelector('i');
        if (icon) icon.className = this.themeIcons[this.currentThemeIndex];
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new HeaderScroll();
    new NewsletterForm();
    new VideoInteractions();
    new RecipeInteractions();
    new BackToTop();
    new MembershipModal();
    preloadImages();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager };
}
