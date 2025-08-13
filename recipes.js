// Recipes Page JavaScript
class RecipesManager {
    constructor() {
        this.searchInput = document.getElementById('recipeSearch');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.recipeItems = document.querySelectorAll('.recipe-item');
        this.recipesGrid = document.getElementById('recipesGrid');
        
        this.init();
    }

    init() {
        // Search functionality
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Filter functionality
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target.dataset.category));
        });

        // Initialize theme from main site
        this.initializeTheme();
    }

    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        this.recipeItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.recipe-desc').textContent.toLowerCase();
            const ingredients = Array.from(item.querySelectorAll('.recipe-details li'))
                .map(li => li.textContent.toLowerCase()).join(' ');

            const isVisible = title.includes(term) || 
                            description.includes(term) || 
                            ingredients.includes(term);

            if (isVisible) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        this.showNoResults(visibleCount === 0 && term !== '');
    }

    handleFilter(category) {
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        let visibleCount = 0;

        this.recipeItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const isVisible = category === 'all' || itemCategory === category;

            if (isVisible) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Clear search when filtering
        this.searchInput.value = '';
        this.showNoResults(visibleCount === 0);
    }

    showNoResults(show) {
        const existingMessage = document.querySelector('.no-results');
        
        if (show && !existingMessage) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No recipes found. Try different keywords or filters.</p>
                <p>কোন রেসিপি পাওয়া যায়নি। অন্য কীওয়ার্ড বা ফিল্টার চেষ্টা করুন।</p>
            `;
            this.recipesGrid.appendChild(noResultsDiv);
        } else if (!show && existingMessage) {
            existingMessage.remove();
        }
    }

    initializeTheme() {
        // Get theme from localStorage or default to light
        const savedTheme = localStorage.getItem('dfj-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme button icon
        const themeButton = document.getElementById('themeToggle');
        const themeIcons = ['fas fa-sun', 'fas fa-moon', 'fas fa-adjust'];
        const themes = ['light', 'dark', 'grey'];
        const currentIndex = themes.indexOf(savedTheme);
        
        if (themeButton && currentIndex !== -1) {
            themeButton.querySelector('i').className = themeIcons[currentIndex];
        }
    }
}

// Recipe Card Interactions
class RecipeCardInteractions {
    constructor() {
        this.recipeCards = document.querySelectorAll('.recipe-card-full');
        this.init();
    }

    init() {
        this.recipeCards.forEach(card => {
            // Add click to entire card
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on video link
                if (e.target.closest('.video-link')) return;
                
                this.toggleRecipeDetails(card);
            });
            
            // Add cursor pointer to indicate clickability
            card.style.cursor = 'pointer';
        });
        
        // Close modal when clicking on it
        document.addEventListener('click', (e) => {
            const modal = document.querySelector('.recipe-modal.active');
            if (modal && e.target === modal) {
                this.closeModalWithFlip();
            }
        });
    }

    toggleRecipeDetails(card) {
        const modal = document.querySelector('.recipe-modal.active');
        
        if (modal) {
            // If modal is open, close it
            this.closeModal(modal);
        } else {
            // Open modal directly without animation
            this.openRecipeModal(card);
        }
    }
    
    closeModalWithFlip(card) {
        const modal = document.querySelector('.recipe-modal.active');
        if (modal && card) {
            card.classList.add('flipping');
            
            setTimeout(() => {
                this.closeModal(modal);
                card.classList.remove('flipping');
            }, 400);
        } else if (modal) {
            this.closeModal(modal);
        }
    }
    
    openRecipeModal(card) {
        const modal = this.createModal();
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('.recipe-desc').textContent;
        const meta = card.querySelector('.recipe-meta').innerHTML;
        const videoLink = card.querySelector('.video-link').innerHTML;
        
        const recipeDetails = this.getRecipeDetails(title);
        
        modal.querySelector('.recipe-modal-body').innerHTML = `
            <img src="${img.src}" alt="${img.alt}">
            <h3>${title}</h3>
            <p class="recipe-desc">${desc}</p>
            <div class="recipe-meta">${meta}</div>
            <div class="recipe-ingredients">
                <h4>Ingredients:</h4>
                <ul>${recipeDetails.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            </div>
            <div class="recipe-instructions">
                <h4>Instructions:</h4>
                <ol>${recipeDetails.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
            </div>
            <div class="video-link">${videoLink}</div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    getRecipeDetails(title) {
        const recipes = {
            'চালের গুড়োর ভাপা পিঠে | Steamed Rice Flour Cake': {
                ingredients: ['2 cups rice flour', '1 cup jaggery', '1 cup coconut (grated)', '1/2 cup water', '1/4 tsp salt', 'Banana leaves for steaming'],
                instructions: ['Mix rice flour with water and salt to make dough', 'Prepare filling with jaggery and coconut', 'Make small balls and stuff with filling', 'Wrap in banana leaves', 'Steam for 15-20 minutes', 'Serve hot']
            },
            'পাটি সাপটা পিঠে | Rolled Flat Pitha': {
                ingredients: ['2 cups rice flour', '1 cup coconut (grated)', '1/2 cup jaggery', '1 cup milk', '1/4 tsp cardamom powder', 'Ghee for cooking'],
                instructions: ['Make thin crepes with rice flour and milk', 'Cook filling with coconut, jaggery and cardamom', 'Spread filling on crepe', 'Roll tightly', 'Cut into pieces', 'Serve warm']
            },
            'নিরামিষ পনিরের রেসিপি | Vegetarian Paneer Recipe': {
                ingredients: ['250g paneer (cubed)', '2 onions (chopped)', '2 tomatoes (chopped)', '1 tbsp ginger-garlic paste', '1 tsp cumin seeds', '1 tsp coriander powder', '1/2 tsp turmeric', 'Salt to taste', '2 tbsp oil'],
                instructions: ['Heat oil, add cumin seeds', 'Add onions and sauté until golden', 'Add ginger-garlic paste and tomatoes', 'Add spices and cook until oil separates', 'Add paneer cubes gently', 'Simmer for 5 minutes', 'Garnish with coriander']
            },
            'মান কচু বাটা | Mashed Malanga Arum': {
                ingredients: ['500g malanga arum', '2 green chilies', '1 tsp mustard oil', '1/2 tsp turmeric', 'Salt to taste', '1 onion (chopped)', 'Fresh coriander'],
                instructions: ['Boil malanga until tender', 'Mash with green chilies and salt', 'Heat mustard oil in pan', 'Add onions and turmeric', 'Add mashed malanga', 'Cook for 5 minutes', 'Garnish with coriander']
            },
            'বাসন্তী পোলাও | Basanti Pulao': {
                ingredients: ['2 cups basmati rice', '1/4 cup ghee', '1 bay leaf', '4-5 green cardamom', '1 cinnamon stick', '1/4 cup raisins', '1/4 cup cashews', 'Saffron soaked in milk', 'Salt to taste'],
                instructions: ['Soak rice for 30 minutes', 'Heat ghee, add whole spices', 'Add rice and sauté for 2 minutes', 'Add hot water and salt', 'Add saffron milk', 'Cook covered until done', 'Garnish with nuts and raisins']
            },
            'কুমড়ো পাতার ভর্তা | Mashed Pumpkin Leaves': {
                ingredients: ['2 cups pumpkin leaves (chopped)', '2 green chilies', '1 tsp mustard oil', '1/4 tsp turmeric', 'Salt to taste', '1 onion (chopped)'],
                instructions: ['Boil pumpkin leaves until soft', 'Drain and mash with chilies', 'Heat mustard oil', 'Add onions and turmeric', 'Add mashed leaves', 'Cook for 3-4 minutes', 'Season with salt']
            },
            'মায়াপুরের ইস্কনের নিরামিষ | ISKCON Vegetarian Recipe': {
                ingredients: ['2 cups mixed vegetables', '1 cup yogurt', '1 tsp cumin seeds', '1 tsp coriander powder', '1/2 tsp turmeric', 'Curry leaves', '2 tbsp ghee', 'Salt to taste'],
                instructions: ['Heat ghee, add cumin and curry leaves', 'Add vegetables and sauté', 'Add spices and cook', 'Add yogurt gradually', 'Simmer until vegetables are tender', 'Adjust seasoning', 'Serve hot']
            },
            'ডিমের কষা | Spicy Egg Curry': {
                ingredients: ['6 eggs (boiled)', '2 onions (sliced)', '2 tomatoes (chopped)', '1 tbsp ginger-garlic paste', '1 tsp red chili powder', '1/2 tsp turmeric', '1 tsp garam masala', '3 tbsp oil'],
                instructions: ['Boil and peel eggs', 'Heat oil, fry eggs lightly', 'In same oil, fry onions until brown', 'Add ginger-garlic paste', 'Add tomatoes and spices', 'Add fried eggs', 'Simmer for 10 minutes']
            },
            'ধোসার চাটনি | Dosa Chutney Recipe': {
                ingredients: ['1 cup coconut (grated)', '2 green chilies', '1 inch ginger', '1 tsp mustard seeds', '1 tsp urad dal', '10-12 curry leaves', '2 tbsp oil', 'Salt to taste'],
                instructions: ['Grind coconut, chilies, ginger with little water', 'Heat oil, add mustard seeds', 'Add urad dal and curry leaves', 'Add ground coconut paste', 'Add salt and mix well', 'Serve with dosa']
            },
            'নিরামিষ ফ্রাইড রাইস | Vegetarian Fried Rice': {
                ingredients: ['3 cups cooked rice', '1 cup mixed vegetables', '2 eggs (beaten)', '3 cloves garlic (minced)', '2 tbsp soy sauce', '1 tbsp oil', 'Spring onions', 'Salt and pepper'],
                instructions: ['Heat oil in wok', 'Scramble eggs and set aside', 'Stir-fry vegetables and garlic', 'Add cooked rice', 'Add soy sauce and seasonings', 'Add scrambled eggs back', 'Garnish with spring onions']
            },
            'ডিম তড়কা | Egg Tadka Recipe': {
                ingredients: ['4 eggs', '1 onion (chopped)', '2 green chilies', '1 tsp cumin seeds', '1/2 tsp turmeric', '1 tsp red chili powder', '2 tbsp oil', 'Coriander leaves'],
                instructions: ['Beat eggs with salt', 'Heat oil, add cumin seeds', 'Add onions and green chilies', 'Add spices and cook', 'Pour beaten eggs', 'Scramble gently', 'Garnish with coriander']
            },
            'মোগলাই পরোটা | Mughlai Paratha Recipe': {
                ingredients: ['2 cups flour', '2 eggs', '1 onion (chopped)', '100g minced meat', '1 tsp garam masala', 'Ghee for cooking', 'Salt to taste'],
                instructions: ['Make soft dough with flour', 'Cook minced meat with spices', 'Beat eggs with onions', 'Roll paratha, add egg mixture', 'Add meat filling', 'Fold and cook with ghee', 'Serve hot']
            },
            'গাজরের ক্ষীর | Carrot Kheer Recipe': {
                ingredients: ['4 cups grated carrots', '1 liter milk', '1/2 cup sugar', '1/4 cup condensed milk', '1/4 cup nuts (chopped)', '1/2 tsp cardamom powder'],
                instructions: ['Boil milk until reduced to half', 'Add grated carrots', 'Cook until carrots are soft', 'Add sugar and condensed milk', 'Add cardamom powder', 'Garnish with nuts', 'Serve chilled']
            },
            'ধোসার ব্যাটার | Dosa Batter Recipe': {
                ingredients: ['3 cups rice', '1 cup urad dal', '1/2 tsp fenugreek seeds', 'Salt to taste', 'Water as needed'],
                instructions: ['Soak rice and dal separately for 4 hours', 'Grind urad dal to smooth paste', 'Grind rice coarsely', 'Mix both batters', 'Add salt and ferment for 8 hours', 'Use for making dosas']
            },
            'তেল পিঠে | Oil-Fried Pitha': {
                ingredients: ['2 cups rice flour', '1 cup jaggery', '1 cup coconut (grated)', '1/2 tsp cardamom powder', 'Oil for frying', 'Water as needed'],
                instructions: ['Make dough with rice flour and water', 'Prepare filling with jaggery and coconut', 'Make small balls and stuff', 'Shape into small cakes', 'Deep fry until golden', 'Serve hot']
            },
            'মুরগির মাংস | Chicken Curry Recipe': {
                ingredients: ['1kg chicken (cut pieces)', '2 onions (sliced)', '2 tbsp ginger-garlic paste', '2 tomatoes (chopped)', '1 tsp red chili powder', '1/2 tsp turmeric', '1 tsp garam masala', '4 tbsp oil'],
                instructions: ['Marinate chicken with spices', 'Heat oil, fry onions until brown', 'Add ginger-garlic paste', 'Add tomatoes and cook', 'Add marinated chicken', 'Cook covered for 30 minutes', 'Garnish with coriander']
            },
            'নিরামিষ দই পটল | Vegetarian Doi Potol': {
                ingredients: ['500g pointed gourd', '1 cup yogurt', '1 tsp cumin seeds', '1 tsp coriander powder', '1/2 tsp turmeric', '2 green chilies', '2 tbsp oil', 'Salt to taste'],
                instructions: ['Cut pointed gourd into pieces', 'Heat oil, add cumin seeds', 'Add pointed gourd and fry', 'Add spices and green chilies', 'Add beaten yogurt', 'Simmer until tender', 'Serve hot']
            },
            'কড়াই চিকেন | Kadhai Chicken Recipe': {
                ingredients: ['750g chicken (cubed)', '2 bell peppers', '2 onions', '2 tbsp ginger-garlic paste', '2 tsp coriander seeds', '1 tsp red chili powder', '3 tbsp oil', 'Garam masala'],
                instructions: ['Dry roast and grind coriander seeds', 'Heat oil in kadhai', 'Add chicken and cook', 'Add onions and bell peppers', 'Add ginger-garlic paste', 'Add spices and cook', 'Garnish with garam masala']
            },
            'চিংড়ির ভর্তা | Mashed Prawn Dish': {
                ingredients: ['500g prawns', '2 onions (chopped)', '3 green chilies', '1 tsp turmeric', '1 tsp red chili powder', '3 tbsp mustard oil', 'Salt to taste'],
                instructions: ['Clean and boil prawns', 'Mash prawns coarsely', 'Heat mustard oil', 'Add onions and chilies', 'Add spices and cook', 'Add mashed prawns', 'Cook for 5 minutes']
            },
            'সিমের পকোড়া | Flat Bean Fritters': {
                ingredients: ['2 cups flat beans (chopped)', '1 cup gram flour', '1 tsp red chili powder', '1/2 tsp turmeric', '1 tsp cumin seeds', 'Oil for frying', 'Salt to taste'],
                instructions: ['Mix gram flour with spices', 'Add chopped beans', 'Add water to make thick batter', 'Heat oil for frying', 'Drop spoonfuls of batter', 'Fry until golden brown', 'Serve hot']
            },
            'নিরামিষ সোয়া চিল্লি | Vegetarian Soya Chilli': {
                ingredients: ['1 cup soya chunks', '1 bell pepper', '1 onion', '2 tbsp soy sauce', '1 tbsp chili sauce', '1 tsp ginger-garlic paste', '2 tbsp oil', 'Spring onions'],
                instructions: ['Soak soya chunks in hot water', 'Heat oil, add ginger-garlic paste', 'Add onions and bell pepper', 'Add squeezed soya chunks', 'Add sauces and toss', 'Garnish with spring onions']
            },
            // Rohu Fish Curry recipe removed
            
            'ক্রিসমাস কেক | Christmas Cake': {
                ingredients: ['2 cups flour', '1 cup butter', '1 cup sugar', '4 eggs', '1 cup mixed fruits', '1/2 cup nuts', '1 tsp baking powder', '1 tsp vanilla essence'],
                instructions: ['Cream butter and sugar', 'Add eggs one by one', 'Add flour and baking powder', 'Fold in fruits and nuts', 'Add vanilla essence', 'Bake at 180°C for 45 minutes', 'Cool and serve']
            },
            'মটর পনির | Matar Paneer Recipe': {
                ingredients: ['200g paneer (cubed)', '1 cup green peas', '2 onions (chopped)', '2 tomatoes (chopped)', '1 tbsp ginger-garlic paste', '1 tsp garam masala', '3 tbsp oil', 'Cream for garnish'],
                instructions: ['Heat oil, lightly fry paneer', 'Add onions and sauté', 'Add ginger-garlic paste', 'Add tomatoes and cook', 'Add peas and spices', 'Add paneer back', 'Garnish with cream']
            },
            'কালোজাম | Black Plum Dessert': {
                ingredients: ['1 cup milk powder', '1/4 cup flour', '1/4 cup milk', '1 cup sugar', '2 cups water', '1/4 tsp cardamom powder', 'Oil for frying'],
                instructions: ['Mix milk powder, flour and milk', 'Make small balls', 'Deep fry until dark brown', 'Make sugar syrup with cardamom', 'Add fried balls to syrup', 'Soak for 2 hours', 'Serve chilled']
            }
        };
        
        return recipes[title] || {
            ingredients: ['Ingredients will be updated soon'],
            instructions: ['Detailed instructions coming soon']
        };
    }
    
    createModal() {
        let modal = document.querySelector('.recipe-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'recipe-modal';
            modal.innerHTML = `
                <div class="recipe-modal-content">
                    <div class="recipe-modal-header">
                        <h4>Recipe Details</h4>
                        <button class="recipe-modal-close">&times;</button>
                    </div>
                    <div class="recipe-modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal events
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
            
            modal.querySelector('.recipe-modal-close').addEventListener('click', () => {
                this.closeModal(modal);
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.closeModal(modal);
                }
            });
        }
        return modal;
    }
    
    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Smooth Animations
class RecipeAnimations {
    constructor() {
        // No animations to initialize
    }

    init() {
        // No animations to initialize
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fix image paths
    const allImages = document.querySelectorAll('img:not(.logo)');
    allImages.forEach(img => {
        if (!img.src.includes('dfj recipe imgs/') && !img.src.includes('dfj imgs/') && !img.src.includes('Hero Logo.jpg')) {
            const originalSrc = img.src.split('/').pop();
            if (originalSrc) {
                // Try to find the image in the recipe images folder first
                img.src = 'dfj recipe imgs/' + originalSrc;
                
                // If that fails, try the regular images folder
                img.addEventListener('error', function() {
                    this.src = 'dfj imgs/' + originalSrc;
                }, { once: true });
            }
        }
    });
    
    new RecipesManager();
    new RecipeCardInteractions();
    new RecipeAnimations();
    
    // Initialize theme toggle functionality
    new ThemeManager();
    
    console.log('🍳 Recipes page loaded successfully!');
});
// Scroll Controls
class ScrollControls {
    constructor() {
        this.scrollUpBtn = document.getElementById('scrollUp');
        this.scrollDownBtn = document.getElementById('scrollDown');
        this.recipesGrid = document.querySelector('.recipes-grid');
        this.init();
    }

    init() {
        if (this.scrollUpBtn && this.scrollDownBtn) {
            this.scrollUpBtn.addEventListener('click', () => this.scrollUp());
            this.scrollDownBtn.addEventListener('click', () => this.scrollDown());
        }
    }

    scrollUp() {
        const firstCard = this.recipesGrid.querySelector('.recipe-card-full');
        if (firstCard) {
            const cardHeight = firstCard.offsetHeight + 24; // Card height + gap
            window.scrollBy({
                top: -cardHeight,
                behavior: 'smooth'
            });
        }
    }

    scrollDown() {
        const firstCard = this.recipesGrid.querySelector('.recipe-card-full');
        if (firstCard) {
            const cardHeight = firstCard.offsetHeight + 24; // Card height + gap
            window.scrollBy({
                top: cardHeight,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize scroll controls
document.addEventListener('DOMContentLoaded', function() {
    new ScrollControls();
});