// JavaScript for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    




        // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        body.classList.add('menu-open');
        
        // Animate in menu items with GSAP
        gsap.from('.mobile-nav-links li', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
        });
        
        gsap.from('.mobile-menu-cta', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        gsap.from('.mobile-menu-footer', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            ease: 'power2.out'
        });
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside content
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });






    // Simple scroll to section for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize GSAP once
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize hero animations immediately
    initHeroAnimations();
    
    // Initialize all other sections
    setTimeout(() => {
        initServicesAnimations();
        initPortfolio();
        initClientsAnimations();
        initContactAnimations(); // Add this line
    }, 300);
});



//map js


document.addEventListener('DOMContentLoaded', () => {
    const mapEl = document.getElementById('map-container');
    if (!mapEl) return;

    const officeCoords = [-17.79890326296938, 30.993543673778504];

    const map = L.map(mapEl, {
        zoomControl: true,
        scrollWheelZoom: false, // better UX inside page
        tap: false
    }).setView(officeCoords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(officeCoords)
        .addTo(map)
        .bindPopup('<b>Our Office</b><br>5 30th Avenue, Harare');

    // 🧠 Critical: Fix sizing after render
    setTimeout(() => {
        map.invalidateSize();
    }, 300);

    // 🧠 Fix resizing on viewport/orientation change
    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });

    resizeObserver.observe(mapEl);
});





// HERO ANIMATIONS
function initHeroAnimations() {
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.logo', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            ease: 'power2.out'
        })
        .from('.nav-links li', {
            duration: 0.6,
            y: -20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.btn-nav', {
            duration: 0.6,
            y: -20,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.hero-tagline', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-description', {
            duration: 1,
            y: 40,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.cta-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-scroll-indicator', {
            duration: 0.8,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2');
}

// SERVICES ANIMATIONS
function initServicesAnimations() {
    const servicesSection = document.querySelector('.services-process-section');
    if (!servicesSection) {
        setTimeout(initServicesAnimations, 100);
        return;
    }
    
    let ctx = gsap.context(() => {
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '.services-process-section',
                start: 'top 80%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
        
        const processSteps = gsap.utils.toArray('.process-step');
        if (processSteps.length > 0) {
            gsap.from(processSteps, {
                scrollTrigger: {
                    trigger: '.process-column',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: 'power2.out'
            });
        }
        
        const serviceCards = gsap.utils.toArray('.service-card');
        if (serviceCards.length > 0) {
            gsap.from(serviceCards, {
                scrollTrigger: {
                    trigger: '.services-column',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: {
                    each: 0.15,
                    grid: [2, 2],
                    from: 'center'
                },
                ease: 'power2.out'
            });
        }
        
        gsap.from('.process-note, .services-note', {
            scrollTrigger: {
                trigger: '.combo-grid',
                start: 'bottom 90%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        initHoverAnimations();
        
    }, servicesSection);
    
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
}

// HOVER ANIMATIONS
function initHoverAnimations() {
    document.querySelectorAll('.process-step').forEach(step => {
        const stepNumber = step.querySelector('.step-number');
        
        step.addEventListener('mouseenter', () => {
            gsap.to(stepNumber, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        step.addEventListener('mouseleave', () => {
            gsap.to(stepNumber, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                rotation: 360,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            gsap.to(card, {
                boxShadow: '0 20px 40px rgba(0, 191, 255, 0.15)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                rotation: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            gsap.to(card, {
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.3
            });
        });
    });
}

// PORTFOLIO FUNCTIONS
function initPortfolio() {
    const portfolioSection = document.querySelector('.portfolio-section');
    if (!portfolioSection) {
        setTimeout(initPortfolio, 100);
        return;
    }

    initPortfolioAnimations();
    initPortfolioFilters();
    initPortfolioModal();
    initLoadMore();
}

function initPortfolioAnimations() {
    gsap.from('.portfolio-header', {
        scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.filter-btn', {
        scrollTrigger: {
            trigger: '.portfolio-filters',
            start: 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    const portfolioItems = gsap.utils.toArray('.portfolio-item');
    if (portfolioItems.length > 0) {
        gsap.from(portfolioItems, {
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 85%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: {
                amount: 0.8,
                grid: 'auto',
                from: 'center'
            },
            ease: 'power2.out'
        });
    }
    
    gsap.from('.portfolio-load-more', {
        scrollTrigger: {
            trigger: '.portfolio-load-more',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
}

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const client = item.getAttribute('data-client');
                
                if (filterValue === 'all' || 
                    category === filterValue || 
                    client.toLowerCase() === filterValue) {
                    item.classList.remove('hidden');
                    
                    gsap.fromTo(item, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

function initPortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    if (!modal) return;
    
    let isOpening = false;
    
    modalClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal && !isOpening) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    const projectData = {
        1: { title: "Custom Team T-Shirts", category: "Apparel", client: "School Event", image: "images/schooljersey.jpeg", description: "Vibrant custom kits designed for high school sports teams.", details: ["Full-color front and back printing", "Moisture-wicking fabric", "Sizes from Youth Small to Adult XXL", "Turnaround: 5-7 business days", "Quantity: 20 pieces"] },
        2: { title: "Business Identity Package", category: "Branding", client: "Small Business", image: "images/natashabells.jpeg", description: "Complete branding package for an events planners company.", details: ["Premium 400gsm cardstock", "Spot UV coating on logo", "Business cards and letterheads", "Brand style guide booklet", "Turnaround: 7-10 business days"] },
        3: { title: "Corporate Promo Items", category: "Promotional", client: "Corporate Client", image: "images/promo client.jpeg", description: "Custom promotional merchandise set for a company's conference.", details: ["100+ piece order", "Multiple product types", "Custom packaging", "Bulk discount pricing", "Turnaround: 10 business days"] },
        4: { title: "Youth Group T Shirts", category: "Apparel", client: "Church", image: "images/zaoga.jpeg", description: "Custom printed T-Shirts for a church youth group retreat.", details: ["Embroidered chest logo", "Screen-printed back design", "Premium cotton blend", "Unisex sizing", "Turnaround: 10 business days", "Quantity: 100+ pieces"] },
        5: { title: "Individual Gift Package", category: "Branding", client: "Individual", image: "images/brand3.jpeg", description: "Personal gift package for a loved one.", details: ["Premium finish", , "Desired Outcome", "Turnaround: 1 business day"] },
        6: { title: "Conference Materials", category: "Events", client: "Event", image: "images/WhatsApp Image 2026-01-20 at 3.19.18 PM.jpeg", description: "Complete print materials package for a major compnay conference.", details: ["200+ attendee badges", "small format banners", "Full-color program booklets", "Promotional materials", "Turnaround: 12 business days"] },
        7: { title: "Freelancer Brand Package", category: "Branding", client: "Individual", image: "images/brand2.jpeg", description: "Personal branding package for a freelance poet.", details: ["Premium finish", , "Portfolio sample prints", "Turnaround: 5 business days"] },
        8: { title: "Body Shop Promo Merchandise", category: "Promotional", client: "Small Business", image: "images/business2.jpeg", description: "Custom promotional merchandise for a local shop's anniversary sale.", details: ["branded mugs", "Vinyl stickers", "Gift cards and tags", "Limited edition packaging", "Turnaround: 8 business days"] }
    };
    
    viewDetailsBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const itemId = this.getAttribute('data-item');
            openModal(itemId);
        });
    });
    
    function openModal(itemId) {
        isOpening = true;
        
        const project = projectData[itemId];
        if (!project) return;
        
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalClient').textContent = project.client;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = project.title;
        document.getElementById('modalDescription').innerHTML = `<p>${project.description}</p>`;
        
        const detailsList = document.getElementById('modalDetailsList');
        detailsList.innerHTML = '';
        project.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            isOpening = false;
        }, 100);
        
        gsap.fromTo('.modal-content', 
            { scale: 0.9, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 0.4, 
                ease: 'power2.out' 
            }
        );
    }
    
    function closeModal() {
        gsap.to('.modal-content', {
            duration: 0.3,
            scale: 0.9,
            opacity: 0,
            ease: 'power2.in',
            onComplete: function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}




function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        const originalText = loadMoreBtn.innerHTML;
        const originalBg = loadMoreBtn.style.background;
        
        // Change button to loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Gallery...';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.8';
        
        // Add CSS for spinner if not already present
        if (!document.querySelector('#loadMoreStyles')) {
            const style = document.createElement('style');
            style.id = 'loadMoreStyles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .fa-spinner {
                    animation: spin 1s linear infinite;
                    margin-right: 8px;
                }
                .gallery-transition {
                    transition: all 0.8s ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create a loading animation effect
        const portfolioSection = document.querySelector('#portfolio .portfolio-grid');
        if (portfolioSection) {
            portfolioSection.classList.add('gallery-transition');
            portfolioSection.style.transform = 'scale(0.95)';
            portfolioSection.style.opacity = '0.5';
        }
        
        // Add ripple effect to button
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // Add ripple animation
        if (!document.querySelector('#rippleAnimation')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.id = 'rippleAnimation';
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }
        
        loadMoreBtn.style.position = 'relative';
        loadMoreBtn.style.overflow = 'hidden';
        
        const rect = loadMoreBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        loadMoreBtn.appendChild(ripple);
        
        // Simulate loading delay (1.2 seconds)
        setTimeout(() => {
            // Change button to "Ready!" state
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Gallery Ready!';
            loadMoreBtn.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
            
            // Add success animation
            loadMoreBtn.style.animation = 'none';
            setTimeout(() => {
                loadMoreBtn.style.transition = 'all 0.5s ease';
                loadMoreBtn.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    loadMoreBtn.style.transform = 'scale(1)';
                    
                    // Add page transition effect before redirecting
                    document.body.style.transition = 'opacity 0.5s ease';
                    document.body.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        // Redirect to gallery page
                        window.location.href = 'gallery.html';
                    }, 500);
                    
                }, 150);
            }, 50);
            
        }, 1200);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
}

// Also update the HTML for the button to include the icon and proper classes
// Replace your current loadMoreBtn HTML with:
/*
<a href="#" id="loadMoreBtn" class="btn btn-primary">
    <i class="fas fa-images"></i> View Complete Gallery
</a>
*/













// CLIENTS ANIMATIONS
function initClientsAnimations() {
    // Animate the distinctive clients header
    gsap.to('.clients-section-header .header-tag', {
        scrollTrigger: {
            trigger: '.clients-section-header',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to('.clients-section-header .section-title', {
        scrollTrigger: {
            trigger: '.clients-section-header',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    });
    
    gsap.to('.clients-section-header .section-subtitle', {
        scrollTrigger: {
            trigger: '.clients-section-header',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4
    });
    
    gsap.to('.clients-section-header .header-arrows', {
        scrollTrigger: {
            trigger: '.clients-section-header',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Initialize the sector slider
    initSectorSlider();
    
    // Animate trust signals
    const trustItems = gsap.utils.toArray('.trust-item');
    if (trustItems.length > 0) {
        gsap.from(trustItems, {
            scrollTrigger: {
                trigger: '.trust-signals',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
}

// SECTOR SLIDER
function initSectorSlider() {
    const sliderContainer = document.querySelector('.sector-slider-container');
    if (!sliderContainer) {
        console.log('Slider container not found');
        return;
    }
    
    const slides = document.querySelectorAll('.sector-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const autoplayToggle = document.getElementById('autoplayToggle');
    
    if (slides.length === 0) {
        console.log('No slides found');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000;
    let isAutoPlaying = true;
    
    function initSlider() {
        updateSlider();
        startAutoPlay();
        
        gsap.from('.sector-slider', {
            scrollTrigger: {
                trigger: '.sector-slider-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }
    
    function updateSlider() {
        slides.forEach(slide => {
            slide.classList.remove('active');
            gsap.set(slide, { opacity: 0, visibility: 'hidden' });
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        gsap.set(slides[currentSlide], { opacity: 1, visibility: 'visible' });
        
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
        
        const activeSlide = slides[currentSlide];
        const content = activeSlide.querySelector('.slide-content');
        const icon = activeSlide.querySelector('.slide-icon');
        const title = activeSlide.querySelector('.slide-title');
        const description = activeSlide.querySelector('.slide-description');
        const stats = activeSlide.querySelector('.slide-stats');
        
        gsap.set([content, icon, title, description, stats], {
            clearProps: 'all'
        });
        
        gsap.to(content, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
        
        gsap.to(icon, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.4
        });
        
        gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5
        });
        
        gsap.to(description, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.6
        });
        
        gsap.to(stats, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.7
        });
    }
    
    function goToSlide(index) {
        const currentActive = slides[currentSlide];
        const currentContent = currentActive.querySelector('.slide-content');
        
        if (currentContent) {
            gsap.to(currentContent, {
                y: -30,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            });
        }
        
        currentSlide = index;
        
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        setTimeout(updateSlider, 300);
        
        if (isAutoPlaying) {
            restartAutoPlay();
        }
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
        if (autoplayToggle) {
            autoplayToggle.classList.add('active');
            autoplayToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Auto-Rotation';
        }
        isAutoPlaying = true;
    }
    
    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        if (autoplayToggle) {
            autoplayToggle.classList.remove('active');
            autoplayToggle.innerHTML = '<i class="fas fa-play"></i> Resume Auto-Rotation';
        }
        isAutoPlaying = false;
    }
    
    function restartAutoPlay() {
        if (isAutoPlaying) {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
        }
    }
    
    function toggleAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    if (autoplayToggle) {
        autoplayToggle.addEventListener('click', toggleAutoPlay);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            if (isAutoPlaying) {
                clearInterval(slideInterval);
            }
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            if (isAutoPlaying) {
                restartAutoPlay();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === ' ') {
            e.preventDefault();
            toggleAutoPlay();
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    initSlider();
}

// CONTACT ANIMATIONS
function initContactAnimations() {
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) return;
    
    gsap.from('.contact-section .section-header', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.contact-form-column, .contact-info-column', {
        scrollTrigger: {
            trigger: '.contact-row',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out'
    });
    

    const formInputs = document.querySelectorAll('.quote-form input, .quote-form select, .quote-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}


// Fix for details textarea space issue
document.addEventListener('DOMContentLoaded', function() {
    const detailsTextarea = document.getElementById('details');
    
    if (detailsTextarea) {
        // Remove any problematic event listeners
        const newTextarea = detailsTextarea.cloneNode(true);
        detailsTextarea.parentNode.replaceChild(newTextarea, detailsTextarea);
        
        // Ensure it accepts spaces
        newTextarea.addEventListener('keydown', function(e) {
            // Allow space bar (keyCode 32)
            if (e.keyCode === 32) {
                e.stopPropagation(); // Prevent any parent handlers
                return true;
            }
        });
        
        // Ensure it accepts all input
        newTextarea.addEventListener('input', function(e) {
            // Allow all input
            return true;
        });
        
        console.log('Textarea fixed for space input');
    }
});


// QUOTE FORM - Supabase Integration with Phone Field
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;
    
    // Your Supabase credentials
    const SUPABASE_URL = 'https://wpsdpmbmudzyowfkswla.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_k5khcNFInCDwUeiydFXaZQ_-E0_HXH6';
    
    // Phone validation helper (optional)
    function isValidPhone(phone) {
        if (!phone || phone.trim() === '') return true; // Optional field
        
        // Basic international phone validation
        const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{7,20}$/;
        return phoneRegex.test(phone.trim());
    }
    
    // Format phone number for storage (optional)
    function formatPhoneNumber(phone) {
        if (!phone) return null;
        
        // Remove all non-digit characters except plus sign
        const cleaned = phone.replace(/[^\d\+]/g, '');
        
        // If starts with country code, keep as is
        if (cleaned.startsWith('+')) {
            return cleaned;
        }
        
        // Otherwise, assume local number
        return cleaned;
    }
    
    quoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data including phone
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(), // NEW: Get phone value
            project_type: document.getElementById('projectType').value,
            details: document.getElementById('details').value.trim(),
            newsletter_opt_in: document.getElementById('newsletter').checked
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.project_type) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Optional: Validate phone format
        if (formData.phone && !isValidPhone(formData.phone)) {
            showFormMessage('Please enter a valid phone number (e.g., +1 234 567 8900 or 123-456-7890)', 'error');
            return;
        }
        
        // Format phone number (optional)
        if (formData.phone) {
            formData.phone = formatPhoneNumber(formData.phone);
        } else {
            formData.phone = null; // Explicitly set to null if empty
        }
        
        const submitBtn = quoteForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            console.log('Submitting form data:', formData);
            
            // Submit to Supabase
            const response = await fetch(`${SUPABASE_URL}/rest/v1/quote_requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                console.log('Form submitted successfully!');
                
                // Success - show animation
                gsap.fromTo(submitBtn,
                    { backgroundColor: '#00BFFF' },
                    {
                        backgroundColor: '#4CAF50',
                        duration: 0.5,
                        onComplete: function() {
                            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
                            
                            // Reset form
                            quoteForm.reset();
                            
                            // Show success message
                            const phoneMessage = formData.phone 
                                ? `<p><i class="fas fa-phone"></i> We have your phone: ${formData.phone}</p>`
                                : '';
                            
                            showFormMessage(`
                                <i class="fas fa-check-circle"></i>
                                <h4>Quote Request Received!</h4>
                                <p>We'll contact you within 24 hours with a detailed quote.</p>
                                ${phoneMessage}
                                <small style="opacity: 0.8; font-size: 0.9rem;">
                                    <i class="fas fa-database"></i> Your request has been saved to our database.
                                </small>
                            `, 'success');
                            
                            // Reset button after delay
                            setTimeout(() => {
                                submitBtn.innerHTML = originalText;
                                submitBtn.disabled = false;
                                gsap.to(submitBtn, {
                                    backgroundColor: '#00BFFF',
                                    duration: 0.5
                                });
                            }, 3000);
                        }
                    }
                );
                
            } else {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                
                // Check if error is about phone column
                if (errorData.message && errorData.message.includes('phone')) {
                    throw new Error('Database configuration error. Please contact support.');
                }
                
                throw new Error(errorData.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            let errorMessage = error.message;
            
            // User-friendly error messages
            if (errorMessage.includes('Database configuration')) {
                errorMessage = 'System configuration error. Please contact us directly.';
            } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }
            
            showFormMessage(`
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Submission Error</h4>
                <p>${errorMessage}</p>
                <small style="opacity: 0.8; font-size: 0.9rem;">
                    If this continues, please email us directly.
                </small>
            `, 'error');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Helper function to show form messages
    function showFormMessage(content, type) {
        // Remove any existing messages
        const existingMsg = quoteForm.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.innerHTML = content;
        
        // Style based on type
        const styles = {
            success: {
                background: '#4CAF50',
                color: 'white',
                border: '2px solid #45a049'
            },
            error: {
                background: '#f8d7da',
                color: '#721c24',
                border: '2px solid #f5c6cb'
            },
            info: {
                background: '#d1ecf1',
                color: '#0c5460',
                border: '2px solid #bee5eb'
            }
        };
        
        Object.assign(messageDiv.style, {
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1.5rem',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease',
            ...styles[type]
        });
        
        // Add to form
        quoteForm.appendChild(messageDiv);
        
        // Auto-remove after 8 seconds (for success) or 10 seconds (for error)
        const removeDelay = type === 'success' ? 8000 : 10000;
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translateY(-10px)';
                messageDiv.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 500);
            }
        }, removeDelay);
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Optional: Phone input formatting
    // const phoneInput = document.getElementById('phone');
    //    if (phoneInput) {
      //  phoneInput.addEventListener('input', function(e) {
        //    // Optional: Auto-format phone number as user types
         //   let value = e.target.value.replace(/\D/g, '');
           // 
           // if (value.length > 0) {
    //            // Simple formatting: (123) 456-7890
     //           if (value.length <= 3) {
     //               value = value;
      //          } else if (value.length <= 6) {
       //             value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        //        } else {
         //           value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
          //      }
           // }
           // 
           // e.target.value = value;
        //});
    // }
    
    // Add fadeIn animation if not already present
    if (!document.querySelector('#formAnimations')) {
        const style = document.createElement('style');
        style.id = 'formAnimations';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Phone input specific focus state */
            input[type="tel"]:focus {
                border-color: var(--primary-orange);
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteForm);
} else {
    initQuoteForm();
}

// Make sure to call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initQuoteForm();
});

// Handle page resize
window.addEventListener('resize', function() {
    setTimeout(() => {
        if (ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }, 200);
});



        // Footer JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Set current year in copyright
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Back to Top functionality
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Smooth scroll for footer links
            document.querySelectorAll('.footer-nav a, .services-list a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Animate footer entrance
            gsap.from('.footer-content > *', {
                scrollTrigger: {
                    trigger: '.main-footer',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });
            
            gsap.from('.footer-bottom', {
                scrollTrigger: {
                    trigger: '.footer-divider',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });



