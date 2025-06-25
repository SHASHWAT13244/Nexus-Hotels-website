// Simple scroll animation library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        function checkPosition() {
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;
            
            elements.forEach(element => {
                if (!element.classList.contains('aos-animate')) {
                    const elementOffset = element.getBoundingClientRect().top + scrollPosition;
                    const elementHeight = element.offsetHeight;
                    
                    // If element is in viewport
                    if (scrollPosition + windowHeight > elementOffset + (elementHeight * 0.2) && 
                        scrollPosition < elementOffset + elementHeight - (elementHeight * 0.2)) {
                        element.classList.add('aos-animate');
                    }
                }
            });
        }
        
        // Check on load and scroll
        window.addEventListener('load', checkPosition);
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', checkPosition);
        
        // Initial check
        checkPosition();
    }
    
    // Parallax effects
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.3;
                    const offset = scrollPosition * speed;
                    element.style.transform = `translateY(${offset}px)`;
                });
            });
        }
    }
    
    // Scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = 'var(--primary-color)';
        progressBar.style.zIndex = '1000';
        progressBar.style.width = '0';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;
            const progress = (scrollPosition / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
    
    // Initialize all scroll effects
    initScrollAnimations();
    initParallax();
    initScrollProgress();
    
    // Staggered animations for grid items
    function initStaggeredAnimations() {
        const gridItems = document.querySelectorAll('.rooms-grid .room-card, .amenities-grid .amenity-card');
        
        gridItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    initStaggeredAnimations();
});