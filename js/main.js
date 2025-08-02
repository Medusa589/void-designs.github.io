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

// === Years Worked Counter ===

// Set your start date (format: YYYY-MM-DD)
const startDate = new Date("2021-06-15");

function updateYearsCounter() {
  const now = new Date();
  const diff = now - startDate;
  const years = diff / (1000 * 60 * 60 * 24 * 365.25); // accounts for leap years
  const counterEl = document.getElementById("years-counter");

  if (counterEl) {
    const rounded = Math.ceil(years * 4) / 4;
    counterEl.textContent = rounded.toFixed(2);
  }
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", updateYearsCounter);

document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('video-tooltip');
  const hero = document.querySelector('.hero');

  if (tooltip && hero) {
    hero.addEventListener('mousemove', (e) => {
      const offset = 15; // offset from the cursor
      tooltip.style.left = `${e.clientX + offset}px`;
      tooltip.style.top = `${e.clientY + offset}px`;
    });

    hero.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('background-video');
  const desiredTime = 0; // Set the desired time in seconds

  if (video) {
    video.addEventListener('loadedmetadata', () => {
      if (video.paused) {
        video.currentTime = desiredTime;
      }
    });

    if (video.paused) {
      video.currentTime = desiredTime;
    }
  }
});