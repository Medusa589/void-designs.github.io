/**
 * Creative Portfolio Template - Main JavaScript
 * Author: John Huikku
 * Copyright © 2025 John Huikku
 * Support & Discussion: https://discord.gg/TWfa3A72
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Main JavaScript file for Portfolio Template
 * Combined functionality from multiple scripts
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 // Disable on mobile devices for better performance
    });
    
    // Initialize all site functionalities
    initMobileNav();
    initSmoothScroll();
    initLazyLoading();
    initPortfolioFilters();
    initVideoModal(); // Now completely separate from filtering
    initGlitchEffect();
    
    // Detect scroll for header transparency
    window.addEventListener('scroll', handleScroll);
});

/**
 * Initialize mobile navigation menu
 */
function initMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('nav').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Force load if needed
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

/**
 * Handle scroll event for header transparency
 */
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
    }
}

/**
 * Initialize portfolio filter functionality
 * COMPLETELY SEPARATE from video functionality
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-categories button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Apply 'all' filter by default
    setTimeout(() => filterPortfolio('all'), 100);
    
    // Add click event to filter buttons only
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-category');
            
            // Apply filter
            filterPortfolio(filterValue);
        });
    });
    
    /**
     * Filter portfolio items based on category
     * @param {string} category - The category to filter by
     */
    function filterPortfolio(category) {
        console.log("Filtering by:", category);
        
        if (portfolioItems.length === 0) {
            console.error("No portfolio items found to filter!");
            return;
        }
        
        // Filter items
        portfolioItems.forEach(item => {
            const dataCategory = item.getAttribute('data-category') || '';
            
            if (category === 'all' || dataCategory.toLowerCase().includes(category.toLowerCase())) {
                // Show item with animation
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide item with animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Re-layout the grid after filtering
        setTimeout(refreshPortfolioGrid, 350);
    }
    
    /**
     * Refresh the portfolio grid layout
     * This helps with any layout shifts after filtering
     */
    function refreshPortfolioGrid() {
        const grid = document.getElementById('portfolio-grid');
        if (grid) {
            // Force reflow
            grid.style.display = 'none';
            void grid.offsetHeight; // This line triggers reflow
            grid.style.display = 'grid';
        }
    }
}

/**
 * Initialize video modal functionality
 * COMPLETELY SEPARATE from portfolio filtering
 */
function initVideoModal() {
    // Set up video modal
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeVideo = document.getElementById('closeVideo');
    
    if (!videoModal || !videoPlayer || !closeVideo) {
        console.error("Video modal elements not found!");
        return;
    }
    
    // Close modal on button click
    closeVideo.addEventListener('click', function() {
        videoModal.style.display = 'none';
        videoPlayer.innerHTML = ''; // Clear iframe
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.innerHTML = ''; // Clear iframe
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            videoModal.style.display = 'none';
            videoPlayer.innerHTML = ''; // Clear iframe
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Direct way to handle video clicks using play button overlay
    const playButtons = document.querySelectorAll('.play-button-overlay');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find parent portfolio item
            const portfolioItem = this.closest('.portfolio-item');
            if (!portfolioItem) return;
            
            const videoId = portfolioItem.getAttribute('data-video-id');
            const externalUrl = portfolioItem.getAttribute('data-external-url');
            
            if (videoId) {
                // YouTube embed
                videoPlayer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        title="YouTube video player" 
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                `;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else if (externalUrl) {
                window.open(externalUrl, '_blank');
            }
            
            return false;
        });
    });
    
    // Also handle entire portfolio-item clicks for better UX
    // But make sure we're completely preventing event bubbling
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Get the click target
            const target = e.target;
            
            // If the click is on a filter button or within the categories, don't proceed
            if (target.closest('.portfolio-categories')) {
                return true;
            }
            
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            const videoId = this.getAttribute('data-video-id');
            const externalUrl = this.getAttribute('data-external-url');
            
            if (videoId) {
                // YouTube embed
                videoPlayer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        title="YouTube video player" 
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                `;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else if (externalUrl) {
                window.open(externalUrl, '_blank');
            }
            
            return false;
        });
    });
}

/**
 * Initialize glitch effect for hero title
 * Simplified version with fewer fonts for better performance
 */
function initGlitchEffect() {
    const glitchTitle = document.querySelector('.glitch-title');
    
    if (!glitchTitle) {
        console.warn('Glitch title element not found!');
        return;
    }
    
    // Reduced list of fonts for better performance
    const rubikFonts = [
        'Rubik Glitch',
        'Rubik Vinyl',
        'Rubik Glitch Pop',
        'Rubik Lines',
        'Rubik Broken Fax'
    ];
    
    // Define color palette
    const colors = ['#00FFFF', '#FFA500', '#FF4D4D', '#FFFFFF'];
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Simplified effect for users who prefer reduced motion
        glitchTitle.style.fontFamily = "'Rubik Glitch', sans-serif";
        glitchTitle.style.color = '#FF4D4D';
    } else {
        // Store original text and styles for safety
        const originalText = glitchTitle.textContent;
        const originalColor = '#FF4D4D';
        
        // Last time a glitch occurred
        let lastGlitchTime = 0;
        
        // Apply a random glitch effect
        function performGlitch() {
            try {
                // Update timestamp to show the effect is still running
                lastGlitchTime = Date.now();
                
                // Apply a new random font (80% chance)
                if (Math.random() < 0.8) {
                    const randomFont = rubikFonts[Math.floor(Math.random() * rubikFonts.length)];
                    glitchTitle.style.fontFamily = `'${randomFont}', sans-serif`;
                }
                
                // Apply a slight position offset (50% chance)
                if (Math.random() < 0.5) {
                    const randomX = Math.random() * 4 - 2; // -2 to 2px
                    const randomY = Math.random() * 2 - 1; // -1 to 1px
                    glitchTitle.style.transform = `translate(${randomX}px, ${randomY}px)`;
                }
                
                // Change color (30% chance)
                if (Math.random() < 0.3) {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    glitchTitle.style.color = randomColor;
                }
                
                // Restore text if somehow changed
                if (glitchTitle.textContent !== originalText) {
                    glitchTitle.textContent = originalText;
                }
            } catch (error) {
                console.error("Error in glitch effect, trying to recover:", error);
                
                // Recover to default if error occurs
                try {
                    glitchTitle.style.fontFamily = "'Rubik Glitch', sans-serif";
                    glitchTitle.style.color = originalColor;
                    glitchTitle.style.transform = 'translate(0, 0)';
                    glitchTitle.textContent = originalText;
                } catch (e) {
                    console.error("Failed to recover from error:", e);
                }
            }
            
            // Continue the glitch loop with a random delay
            const randomDelay = Math.floor(Math.random() * 350) + 100; // 100-450ms
            setTimeout(performGlitch, randomDelay);
        }
        
        // Start the glitch loop after a slight delay
        setTimeout(performGlitch, 1000);
        
        // Safety check - if glitch stops, restart it
        setInterval(function() {
            if (Date.now() - lastGlitchTime > 2000) {
                // More than 2 seconds since last glitch, restart
                console.log("Glitch effect seems to have stopped, restarting...");
                performGlitch();
            }
        }, 3000);
    }
}