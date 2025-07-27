// Navigation item interactions
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Enhanced Carousel dots functionality with image changes
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', function() {
        // Prevent rapid clicking
        if (this.classList.contains('transitioning')) {
            return;
        }
        
        document.querySelectorAll('.dot').forEach(d => {
            d.classList.remove('active');
            d.classList.remove('transitioning');
        });
        this.classList.add('active');
        this.classList.add('transitioning');
        
        // Change featured game with image
        console.log(`Switching to game ${index + 1}`);
        changeFeaturedGame(index);
        
        // Remove transitioning class after animation
        setTimeout(() => {
            this.classList.remove('transitioning');
        }, 500);
    });
});

// Search functionality
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('input', function() {
    console.log('Searching for:', this.value);
    performSearch(this.value);
});

// Game card interactions
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function() {
        const titleElement = this.querySelector('.game-card-title, .game-card-title-1');
        if (titleElement) {
            const title = titleElement.textContent;
            alert(`Opening ${title}...`);
            launchGame(title);
        }
    });
});

// Play button - don't prevent default, let the link work naturally
document.querySelector('.play-button').addEventListener('click', function(e) {
    const currentGame = document.querySelector('.game-title').textContent;
    console.log(`Opening ${currentGame}...`);
    
    // Only show alert for non-external links or if you want to keep the alert
    const parentLink = this.closest('a');
    if (parentLink && !parentLink.href.startsWith('http')) {
        alert(`Opening ${currentGame}...`);
        e.preventDefault(); // Only prevent default for internal/placeholder links
    }
    
    launchFeaturedGame();
});

// Navigation buttons
document.querySelectorAll('.nav-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        if (index === 0) {
            console.log('Back button clicked');
            navigateBack();
        } else {
            console.log('Forward button clicked');
            navigateForward();
        }
    });
});

// User profile click
document.querySelector('.user-profile').addEventListener('click', function() {
    console.log('User profile clicked');
    showUserMenu();
});

// Enhanced function to change featured game with background images
function changeFeaturedGame(index) {
    const games = [
        {
            title: "Asphalt Legends Unite",
            subtitle: "Celebrate Asphalt 20th Anniversary",
            badge: "Included with Game Pass",
            backgroundImage: "img/asphalt20.png",
            buttonText: "Open",
            buttonLink: "https://asphaltlegendsunite.com/"
        },
        {
            title: "Play Amazing Game Modes",
            subtitle: "Open world racing adventure",
            badge: "Popular",
            backgroundImage: "img/asphaltpack.webp",
            buttonText: "Play",
            buttonLink: "https://asphaltlegendsunite.com/"
        },
        {
            title: "Play Grand Events",
            subtitle: "With World Players",
            badge: "New Release",
            backgroundImage: "img/asphaltevent.webp",
            buttonText: "Check Event",
            buttonLink: "https://www.asphaltlegends.com/event"
        },
        {
            title: "New Cars",
            subtitle: "Get a Brand New Ride",
            badge: "New Ride",
            backgroundImage: "img/car3.png",
            buttonText: "Play",
            buttonLink: "https://asphaltlegendsunite.com/"
        },
        {
            title: "Ultimate Legend Pass",
            subtitle: "New Game Pass Features",
            badge: "Ultimate Legend Pass",
            backgroundImage: "img/asphaltpass.webp",
            buttonText: "learn more",
            buttonLink: "https://asphaltlegendsunite.com/"
        },
        {
            title: "Connect with Friends",
            subtitle: "Play with friends online",
            badge: "Multiplayer",
            backgroundImage: "img/asphaltconnect.avif",
            buttonText: "Install",
            buttonLink: "https://asphaltlegendsunite.com/"
        }
    ];

    const game = games[index];
    if (game) {
        // Update text content
        const gameTitle = document.querySelector('.game-title');
        const gameSubtitle = document.querySelector('.game-subtitle');
        const gameBadge = document.querySelector('.game-badge');
        const playButton = document.querySelector('.play-button');
        const gameInfo = document.querySelector('.game-info');

        if (gameTitle) gameTitle.textContent = game.title;
        if (gameSubtitle) gameSubtitle.textContent = game.subtitle;
        if (gameBadge) gameBadge.textContent = game.badge;
        if (playButton) {
            playButton.textContent = game.buttonText;
            
            // Handle the link properly - find the parent <a> tag
            const parentLink = playButton.closest('a');
            if (parentLink) {
                parentLink.href = game.buttonLink;
                // Ensure the link opens in a new tab for external links
                if (game.buttonLink.startsWith('http')) {
                    parentLink.target = '_blank';
                    parentLink.rel = 'noopener noreferrer';
                } else {
                    parentLink.target = '_self';
                    parentLink.removeAttribute('rel');
                }
            }
        }

        // Change background image with smooth transition
        if (gameInfo) {
            // Prevent multiple rapid transitions
            if (gameInfo.classList.contains('transitioning')) {
                return;
            }
            
            gameInfo.classList.add('transitioning');
            
            // Add fade transition
            gameInfo.style.transition = 'opacity 0.5s ease-in-out';
            gameInfo.style.opacity = '0.3';
            
            setTimeout(() => {
                gameInfo.style.backgroundImage = `url(${game.backgroundImage})`;
                gameInfo.style.opacity = '1';
                
                setTimeout(() => {
                    gameInfo.classList.remove('transitioning');
                }, 200);
            }, 250);
        }

        // Update search box placeholder to match current game
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.placeholder = `Search games... (Current: ${game.title})`;
        }

        // Add some visual feedback
        console.log(`Featured game changed to: ${game.title}`);
        
        // Optional: Show a brief notification
        showGameChangeNotification(game.title);
    }
}

// Function to show brief notification when game changes
function showGameChangeNotification(gameName) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.game-change-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'game-change-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 212, 170, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notification);
    }

    // Update and show notification
    notification.textContent = `Now featuring: ${gameName}`;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';

    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
    }, 2000);
}

// Auto-advance carousel every 8 seconds
let autoAdvanceInterval;
let autoAdvanceTimeout;
let isUserInteracting = false;

function startAutoAdvance() {
    // Clear any existing intervals/timeouts first
    stopAutoAdvance();
    
    if (!isUserInteracting) {
        autoAdvanceInterval = setInterval(() => {
            if (!isUserInteracting) {
                const currentActiveDot = document.querySelector('.dot.active');
                const allDots = document.querySelectorAll('.dot');
                let currentIndex = Array.from(allDots).indexOf(currentActiveDot);
                
                // Move to next dot, or loop back to first
                currentIndex = (currentIndex + 1) % allDots.length;
                
                // Simulate click on next dot
                allDots[currentIndex].click();
            }
        }, 8000); // Increased to 8 seconds for less aggressive auto-advance
    }
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
    if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = null;
    }
}

function scheduleAutoAdvanceRestart() {
    // Clear any existing timeout first
    if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
    }
    
    // Restart auto-advance after 5 seconds of no interaction
    autoAdvanceTimeout = setTimeout(() => {
        isUserInteracting = false;
        startAutoAdvance();
    }, 5000);
}

// Better interaction handling for dots
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopAutoAdvance();
    });
    
    dot.addEventListener('mouseleave', () => {
        scheduleAutoAdvanceRestart();
    });
    
    dot.addEventListener('click', () => {
        isUserInteracting = true;
        stopAutoAdvance();
        scheduleAutoAdvanceRestart();
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const allDots = document.querySelectorAll('.dot');
        const currentActiveDot = document.querySelector('.dot.active');
        let currentIndex = Array.from(allDots).indexOf(currentActiveDot);
        
        if (e.key === 'ArrowLeft') {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : allDots.length - 1;
        } else {
            currentIndex = (currentIndex + 1) % allDots.length;
        }
        
        allDots[currentIndex].click();
        e.preventDefault();
    }
});

function performSearch(query) {
    console.log(`Performing search for: ${query}`);
    // Add visual feedback for search
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.textContent = '⏳';
        setTimeout(() => {
            searchIcon.textContent = '🔍';
        }, 1000);
    }
}

function launchGame(gameName) {
    console.log(`Launching game: ${gameName}`);
    // You could add more sophisticated launch logic here
}

function launchFeaturedGame() {
    const featuredGameTitle = document.querySelector('.game-title').textContent;
    console.log(`Launching featured game: ${featuredGameTitle}`);
    // Add any launch logic here
}

function navigateBack() {
    console.log('Navigating back...');
    // You could implement browser history or app navigation here
}

function navigateForward() {
    console.log('Navigating forward...');
    // You could implement browser history or app navigation here
}

function showUserMenu() {
    console.log('Showing user menu...');
    alert('User menu would open here!\nOptions: Profile, Settings, Sign Out');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gaming platform loaded successfully!');
    
    // Set initial active navigation item
    const homeNavItem = document.querySelector('.nav-item');
    if (homeNavItem) {
        homeNavItem.classList.add('active');
    }
    
    // Initialize the carousel
    initializeApp();
    
    // Start auto-advance after initial load (longer delay)
    setTimeout(() => {
        if (!isUserInteracting) {
            startAutoAdvance();
        }
    }, 10000); // Wait 10 seconds before starting auto-advance
});

function initializeApp() {
    console.log('App initialized');
    
    // Set up initial state
    const firstDot = document.querySelector('.dot');
    if (firstDot && !firstDot.classList.contains('active')) {
        firstDot.classList.add('active');
    }
    
    // Preload images for smoother transitions
    preloadCarouselImages();
}

//  preload function with correct image paths
function preloadCarouselImages() {
    const imageUrls = [
        "img/asphalt20.png",
        "img/asphalt-8--car-racing-game-6f0wb.jpg",
        "img/img2.jpeg",
        "img/asphaltpack.webp",
        "img/asphaltevent.webp",
        "img/car3.jpg",
        "img/asphaltpass.webp",
        "img/asphaltconnect.avif",
        "img/gameloft_classics_00.webp",
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        console.log(`Preloading image: ${url}`);
    });
}