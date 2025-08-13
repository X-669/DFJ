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
        // Get saved theme or default to gradient-light
        const savedTheme = localStorage.getItem('dfj-theme') || 'gradient-light';
        this.currentThemeIndex = this.themes.indexOf(savedTheme);
        if (this.currentThemeIndex === -1) this.currentThemeIndex = 0;
        
        this.applyTheme();
        this.themeButton.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        const theme = this.themes[this.currentThemeIndex];
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme button icon
        const icon = this.themeButton.querySelector('i');
        icon.className = this.themeIcons[this.currentThemeIndex];
        
        // Add smooth transition
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
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
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
                    const headerHeight = document.querySelector('.header').offsetHeight;
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

// Minimal interactions only
class BasicInteractions {
    constructor() {
        this.init();
    }

    init() {
        // Basic click handlers only
        const cards = document.querySelectorAll('.recipe-card, .video-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('Card clicked');
            });
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const isGrey = document.documentElement.getAttribute('data-theme') === 'grey';
            
            if (window.scrollY > 100) {
                if (isDark) {
                    this.header.style.background = 'rgba(26, 26, 26, 0.95)';
                } else if (isGrey) {
                    this.header.style.background = 'rgba(128, 128, 128, 0.95)';
                } else {
                    this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                this.header.style.backdropFilter = 'blur(10px)';
            } else {
                this.header.style.background = 'var(--bg-primary)';
                this.header.style.backdropFilter = 'none';
            }
        });
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
        const email = this.form.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
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
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        `;

        document.body.appendChild(messageEl);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// Video Card Interactions
class VideoInteractions {
    constructor() {
        this.videoCards = document.querySelectorAll('.video-card');
        this.init();
    }

    init() {
        this.videoCards.forEach(card => {
            const playButton = card.querySelector('.play-button');
            if (playButton) {
                playButton.addEventListener('click', () => {
                    // Redirect to YouTube channel
                    window.open('https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE', '_blank');
                });
            }
        });
    }
}

// Recipe Card Interactions
class RecipeInteractions {
    constructor() {
        this.recipeCards = document.querySelectorAll('.recipe-card');
        this.init();
    }

    init() {
        this.recipeCards.forEach(card => {
            card.addEventListener('click', () => {
                // Add click animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);

                // You can add recipe detail modal or navigation here
                console.log('Recipe clicked:', card.querySelector('h3').textContent);
            });
        });
    }
}

// Gallery Lightbox
class GalleryLightbox {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item img');
        this.init();
    }

    init() {
        this.galleryItems.forEach(img => {
            img.addEventListener('click', () => this.openLightbox(img));
        });
    }

    openLightbox(img) {
        // Create lightbox overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

        // Create image element
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;

        overlay.appendChild(lightboxImg);
        document.body.appendChild(overlay);

        // Close on click
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-red);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(this.button);
    }

    init() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload hero image and logo
        const heroImg = new Image();
        heroImg.src = 'dfj imgs/WhatsApp Image 2025-07-13 at 09.08.12_c1e9e054.jpg';
        
        const logoImg = new Image();
        logoImg.src = 'dfj_logo.jpg';
        
        // Preload some featured recipe images
        const recipeImg1 = new Image();
        recipeImg1.src = 'dfj recipe imgs/Vapa pithe.jpg';
        
        const recipeImg2 = new Image();
        recipeImg2.src = 'dfj recipe imgs/Basanti Pulao.jpg';
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set default theme to gradient-light
    if (!localStorage.getItem('dfj-theme')) {
        localStorage.setItem('dfj-theme', 'gradient-light');
    }
    document.documentElement.setAttribute('data-theme', localStorage.getItem('dfj-theme') || 'gradient-light');
    
    // Check for other image loading errors
    const allImages = document.querySelectorAll('img:not(.logo)');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            // Try to fix path by adding 'dfj recipe imgs/' or 'dfj imgs/' prefix if not already present
            if (!this.src.includes('dfj recipe imgs/') && !this.src.includes('dfj imgs/')) {
                const originalSrc = this.src.split('/').pop();
                // Try recipe images folder
                this.src = 'dfj recipes/' + originalSrc;
                console.log('Attempting to fix path with recipe folder:', this.src);
            }
        });
    });
    
    // Initialize all components
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new BasicInteractions();
    new HeaderScroll();
    new NewsletterForm();
    new VideoInteractions();
    new RecipeInteractions();
    new GalleryLightbox();
    new BackToTop();
    new PerformanceOptimizer();
    new EnhancedHoverEffects();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .hover-effect {
            transition: all 0.3s ease;
        }
        
        .hover-effect:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            filter: brightness(1.1);
        }
    `;
    document.head.appendChild(style);

    console.log('🍳 Deb\'s Flavour Junction website loaded successfully!');
});

// Membership Modal
class MembershipModal {
    constructor() {
        this.membershipBtn = document.getElementById('membershipBtn');
        this.modal = document.querySelector('.membership-modal');
        this.init();
    }

    init() {
        if (this.membershipBtn) {
            this.membershipBtn.addEventListener('click', () => {
                this.openModal();
            });
        }
        
        if (this.modal) {
            // Close modal events
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });

            const closeBtn = this.modal.querySelector('.membership-modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal();
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Membership modal not found in the DOM');
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

// Initialize membership modal
document.addEventListener('DOMContentLoaded', function() {
    new MembershipModal();
});

// Enhanced hover effects
class EnhancedHoverEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Add hover effects to various elements
        const hoverElements = [
            '.recipe-card',
            '.video-card',
            '.social-links a',
            '.footer-links a',
            '.nav-menu a'
        ];
        
        hoverElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!el.classList.contains('hover-effect')) {
                    el.classList.add('hover-effect');
                }
            });
        });
    }
}

// Fix image paths
document.addEventListener('DOMContentLoaded', function() {
    // Fix all image paths
    const allImages = document.querySelectorAll('img:not(.logo)');
    allImages.forEach(img => {
        if (!img.src.includes('dfj recipes/')) {
            const originalSrc = img.src.split('/').pop();
            if (originalSrc) {
                // Try to find the image in the recipe images folder first
                const recipeImgPath = 'dfj recipe imgs/' + originalSrc;
                const regularImgPath = 'dfj imgs/' + originalSrc;
                
                // Try recipe images folder first
                img.src = recipeImgPath;
                
                // If that fails, try the regular images folder
                img.addEventListener('error', function() {
                    this.src = regularImgPath;
                }, { once: true });
            }
        }
    });
});