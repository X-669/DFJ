// Members Page JavaScript
class MemberAuthentication {
    constructor() {
        this.authorizedEmails = [
            'xplosive669@gmail.com',
            'rita.kbiswas@gmail.com'
        ];
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        const verifyBtn = document.getElementById('verifyMember');
        const emailInput = document.getElementById('memberEmail');
        
        if (verifyBtn && emailInput) {
            verifyBtn.addEventListener('click', () => this.verifyMembership());
            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyMembership();
                }
            });
        }

        // Remove persistent authentication - require verification each time
        localStorage.removeItem('dfj-member-auth');
    }

    verifyMembership() {
        const email = document.getElementById('memberEmail').value.trim().toLowerCase();
        const messageEl = document.getElementById('authMessage');

        if (!email) {
            this.showMessage('Please enter your email address.', 'error');
            return;
        }

        if (this.authorizedEmails.includes(email)) {
            this.isAuthenticated = true;
            // Show success message
            this.showMessage('✅ Access granted! Loading member content...', 'success');
            // Show membership tier selection
            setTimeout(() => this.showTierSelection(email), 500);
        } else {
            this.showMessage('❌ Access Denied. This email is not registered for premium membership.', 'error');
        }
    }

    showMessage(message, type) {
        const messageEl = document.getElementById('authMessage');
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
    }

    showTierSelection(email) {
        const authCard = document.querySelector('.auth-card');
        authCard.innerHTML = `
            <h2>Select Your Membership Tier</h2>
            <p>Choose your membership level to access exclusive content</p>
            <div class="tier-selection">
                <div class="tier-card bronze" data-tier="bronze">
                    <i class="fas fa-medal"></i>
                    <h3>Bronze Member</h3>
                    <p>Basic exclusive recipes</p>
                    <span class="tier-price">₹99/month</span>
                </div>
                <div class="tier-card silver" data-tier="silver">
                    <i class="fas fa-trophy"></i>
                    <h3>Silver Member</h3>
                    <p>Premium recipes + Early access</p>
                    <span class="tier-price">₹199/month</span>
                </div>
                <div class="tier-card gold" data-tier="gold">
                    <i class="fas fa-crown"></i>
                    <h3>Gold Member</h3>
                    <p>All content + Live sessions</p>
                    <span class="tier-price">₹299/month</span>
                </div>
            </div>
        `;
        
        // Add tier selection handlers
        document.querySelectorAll('.tier-card').forEach(card => {
            card.addEventListener('click', () => {
                const tier = card.dataset.tier;
                this.showMemberContent(tier);
            });
        });
    }
    
    showMemberContent(tier = 'bronze') {
        // Hide auth section
        document.querySelector('.auth-section').style.display = 'none';
        
        // Show exclusive content based on tier
        document.getElementById('exclusiveContent').style.display = 'block';
        document.getElementById('specialVideosContent').style.display = 'block';
        if (tier === 'silver' || tier === 'gold') {
            document.getElementById('earlyAccessContent').style.display = 'block';
        }
        if (tier === 'gold') {
            document.getElementById('liveSessionsContent').style.display = 'block';
        }
        
        // Load content based on tier
        this.loadExclusiveRecipes(tier);
        this.loadSpecialVideos(tier);
    }

    loadExclusiveRecipes(tier = 'bronze') {
        const recipesGrid = document.querySelector('.exclusive-recipes .recipes-grid');
        const exclusiveRecipes = [
            {
                title: 'গোপন পারিবারিক বিরিয়ানি | Secret Family Biryani',
                desc: 'Our family\'s secret biryani recipe passed down for generations',
                image: 'dfj recipe imgs/Basanti Pulao.jpg',
                time: '2 hours',
                difficulty: 'Expert',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            },
            {
                title: 'রাজকীয় মাটন কোর্মা | Royal Mutton Korma',
                desc: 'Authentic royal-style mutton korma with secret spices',
                image: 'dfj recipe imgs/Kadhai Chicken Recipe.jpg',
                time: '90 mins',
                difficulty: 'Hard',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            },
            {
                title: 'বিশেষ চিংড়ি মালাইকারি | Special Prawn Malaikari',
                desc: 'Premium prawn curry with coconut milk and special herbs',
                image: 'dfj recipe imgs/Chingrir Bharta .jpg',
                time: '45 mins',
                difficulty: 'Medium',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            },
            {
                title: 'হীরক রাজার মিষ্টি | Diamond King\'s Sweet',
                desc: 'Exclusive sweet recipe from royal Bengali kitchen',
                image: 'dfj recipe imgs/Vapa pithe.jpg',
                time: '3 hours',
                difficulty: 'Expert',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            }
        ];

        const recipesToShow = tier === 'bronze' ? exclusiveRecipes.slice(0, 4) : 
                              tier === 'silver' ? exclusiveRecipes.slice(0, 7) : exclusiveRecipes;
        
        recipesGrid.innerHTML = recipesToShow.map(recipe => `
            <div class="recipe-item">
                <div class="recipe-card-full recipe-card-unlocked">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="recipe-content">
                        <h3>${recipe.title}</h3>
                        <p class="recipe-desc">${recipe.desc}</p>
                        <div class="recipe-meta">
                            <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                            <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                            <span><i class="fas fa-crown"></i> Premium</span>
                        </div>
                        <div class="video-link">
                            <a href="${recipe.videoUrl}" target="_blank">
                                <i class="fab fa-youtube"></i> Watch Premium Video
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add more exclusive recipes
        const moreRecipes = [
            {
                title: 'সোনালী পোলাও | Golden Pulao',
                desc: 'Royal golden pulao with saffron and dry fruits',
                image: 'dfj recipe imgs/Basanti Pulao.jpg',
                time: '60 mins',
                difficulty: 'Medium',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            },
            {
                title: 'রাজকীয় ফিরনি | Royal Firni',
                desc: 'Creamy royal firni with cardamom and pistachios',
                image: 'dfj recipe imgs/Carrot Kheer.jpg',
                time: '90 mins',
                difficulty: 'Hard',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            },
            {
                title: 'বিশেষ কাবাব | Special Kabab',
                desc: 'Authentic Bengali kabab with secret marinade',
                image: 'dfj recipe imgs/90\'s Chicken Recipie.jpg',
                time: '2 hours',
                difficulty: 'Expert',
                videoUrl: 'https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE'
            }
        ];
        
        exclusiveRecipes.push(...moreRecipes);
        
        // Add click handlers for premium recipes
        this.addPremiumRecipeHandlers();
    }
    
    loadSpecialVideos(tier) {
        const specialVideos = [
            {
                title: 'Advanced Bengali Cooking Techniques',
                desc: 'Master professional Bengali cooking methods',
                image: 'dfj recipe imgs/moglai paratha recipe.jpg',
                time: '45 mins'
            },
            {
                title: 'Secret Spice Blending Methods',
                desc: 'Learn the art of traditional spice mixing',
                image: 'dfj recipe imgs/Dosa Batter.jpg',
                time: '30 mins'
            },
            {
                title: 'Traditional Clay Pot Cooking',
                desc: 'Authentic Bengali clay pot techniques',
                image: 'dfj recipe imgs/90\'s Chicken Recipie.jpg',
                time: '60 mins'
            },
            {
                title: 'Bengali Sweet Making Masterclass',
                desc: 'Professional sweet preparation secrets',
                image: 'dfj recipe imgs/Carrot Kheer.jpg',
                time: '90 mins'
            },
            {
                title: 'Fish Cutting and Preparation',
                desc: 'Expert fish handling techniques',
                image: 'dfj recipe imgs/Ol kopi diye rui macher jhol.jpg',
                time: '25 mins'
            },
            {
                title: 'Authentic Biryani Layering',
                desc: 'Perfect biryani layering methods',
                image: 'dfj recipe imgs/Basanti Pulao.jpg',
                time: '40 mins'
            },
            {
                title: 'Bengali Festival Cooking',
                desc: 'Special occasion recipe collection',
                image: 'dfj recipe imgs/Christmas Cake.jpg',
                time: '75 mins'
            }
        ];
        
        const earlyAccessVideos = [
            {
                title: 'Upcoming Recipe Previews',
                desc: 'Sneak peek at new recipes',
                image: 'dfj recipe imgs/Non veg doi patal.jpg',
                time: '15 mins'
            },
            {
                title: 'Behind the Scenes Content',
                desc: 'Kitchen setup and preparation',
                image: 'dfj recipe imgs/Kadhai Chicken Recipe.jpg',
                time: '20 mins'
            },
            {
                title: 'Live Cooking Sessions Preview',
                desc: 'Highlights from live sessions',
                image: 'dfj recipe imgs/Chingrir Bharta .jpg',
                time: '30 mins'
            },
            {
                title: 'Q&A with Chef Debdas',
                desc: 'Exclusive chef interviews',
                image: 'dfj recipe imgs/Shimer Pokoda recipe.jpg',
                time: '25 mins'
            },
            {
                title: 'Seasonal Special Recipes',
                desc: 'Limited time seasonal dishes',
                image: 'dfj recipe imgs/Non Veg Chili Soyabean Recipe.jpg',
                time: '35 mins'
            }
        ];
        
        // Load special videos based on tier
        const specialGrid = document.getElementById('specialVideosGrid');
        const videosToShow = tier === 'bronze' ? specialVideos.slice(0, 3) : 
                            tier === 'silver' ? specialVideos.slice(0, 5) : specialVideos;
        
        if (specialGrid) {
            specialGrid.innerHTML = videosToShow.map(video => `
                <div class="recipe-item">
                    <div class="recipe-card-full recipe-card-unlocked">
                        <img src="${video.image}" alt="${video.title}">
                        <div class="recipe-content">
                            <h3>${video.title}</h3>
                            <p class="recipe-desc">${video.desc}</p>
                            <div class="recipe-meta">
                                <span><i class="fas fa-play"></i> ${video.time}</span>
                                <span><i class="fas fa-crown"></i> Premium</span>
                            </div>
                            <div class="video-link">
                                <a href="https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE" target="_blank">
                                    <i class="fab fa-youtube"></i> Watch Video
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Load early access videos for silver and gold
        if (tier === 'silver' || tier === 'gold') {
            const earlyGrid = document.getElementById('earlyAccessGrid');
            if (earlyGrid) {
                earlyGrid.innerHTML = earlyAccessVideos.map(video => `
                    <div class="recipe-item">
                        <div class="recipe-card-full recipe-card-unlocked">
                            <img src="${video.image}" alt="${video.title}">
                            <div class="recipe-content">
                                <h3>${video.title}</h3>
                                <p class="recipe-desc">${video.desc}</p>
                                <div class="recipe-meta">
                                    <span><i class="fas fa-play"></i> ${video.time}</span>
                                    <span><i class="fas fa-bolt"></i> Early Access</span>
                                </div>
                                <div class="video-link">
                                    <a href="https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE" target="_blank">
                                        <i class="fab fa-youtube"></i> Watch Early Access
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    addPremiumRecipeHandlers() {
        const recipeCards = document.querySelectorAll('.recipe-card-unlocked');
        recipeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.video-link')) return;
                this.showPremiumRecipeModal(card);
            });
        });
    }

    showPremiumRecipeModal(card) {
        // Create premium modal with full recipe details
        const modal = document.createElement('div');
        modal.className = 'recipe-modal premium-modal active';
        
        const title = card.querySelector('h3').textContent;
        const img = card.querySelector('img');
        const desc = card.querySelector('.recipe-desc').textContent;
        
        modal.innerHTML = `
            <div class="recipe-modal-content premium-modal-content">
                <div class="recipe-modal-header premium-header">
                    <h4><i class="fas fa-crown"></i> Premium Recipe</h4>
                    <button class="recipe-modal-close">&times;</button>
                </div>
                <div class="recipe-modal-body">
                    <img src="${img.src}" alt="${img.alt}">
                    <h3>${title}</h3>
                    <p class="recipe-desc">${desc}</p>
                    <div class="premium-badge-modal">
                        <i class="fas fa-crown"></i> Members Only Content
                    </div>
                    <div class="recipe-ingredients">
                        <h4>Premium Ingredients:</h4>
                        <ul>
                            <li>Secret spice blend (exclusive recipe)</li>
                            <li>Premium quality ingredients</li>
                            <li>Traditional cooking methods</li>
                            <li>Family secret techniques</li>
                        </ul>
                    </div>
                    <div class="recipe-instructions">
                        <h4>Detailed Instructions:</h4>
                        <ol>
                            <li>Follow our exclusive video tutorial for best results</li>
                            <li>Use the premium ingredient list provided</li>
                            <li>Apply traditional Bengali cooking techniques</li>
                            <li>Enjoy your authentic Bengali masterpiece!</li>
                        </ol>
                    </div>
                    <div class="video-link">
                        <a href="https://youtube.com/@debsflavorjunction?si=5f8spOsoht48cDJE" target="_blank">
                            <i class="fab fa-youtube"></i> Watch Premium Tutorial
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePremiumModal(modal);
            }
        });

        modal.querySelector('.recipe-modal-close').addEventListener('click', () => {
            this.closePremiumModal(modal);
        });
    }

    closePremiumModal(modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Theme Manager for Members Page
class MembersThemeManager {
    constructor() {
        this.themeButton = document.getElementById('themeToggle');
        this.themes = ['gradient-light', 'light', 'dark'];
        this.currentTheme = 0;
        this.init();
    }

    init() {
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = (this.currentTheme + 1) % this.themes.length;
        const theme = this.themes[this.currentTheme];
        document.body.setAttribute('data-theme', theme);
        
        // Update icon
        const icon = this.themeButton.querySelector('i');
        if (theme === 'gradient-light') {
            icon.className = 'fas fa-palette';
        } else if (theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fix image paths
    const allImages = document.querySelectorAll('img:not(.logo)');
    allImages.forEach(img => {
        if (!img.src.includes('dfj recipe imgs/') && !img.src.includes('Hero Logo.jpg')) {
            const originalSrc = img.src.split('/').pop();
            if (originalSrc) {
                img.src = 'dfj recipe imgs/' + originalSrc;
            }
        }
    });
    
    new MemberAuthentication();
    new MembersThemeManager();
    
    // Add premium styling to modal
    const style = document.createElement('style');
    style.textContent = `
        .premium-modal-content {
            border: 2px solid #ffd700;
            box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
        }
        
        .premium-header {
            background: linear-gradient(45deg, #ffd700, #ffb347);
            color: #333;
        }
        
        .premium-badge-modal {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            text-align: center;
            margin: 1rem 0;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});