document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // STICKY HEADER ON SCROLL
    // ==========================================================================
    const header = document.getElementById('nav-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // MOBILE MENU NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR FADE-IN SCROLL ANIMATIONS
    // ==========================================================================
    const animElements = document.querySelectorAll(
        '.about-info, .about-stats, .skills-card, .project-card, .timeline-item, .contact-info, .contact-form-container, .hero-content, .hero-visual'
    );

    // Initial state: hide elements before animating them in
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Setup Observer
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                // Unobserve once animation is executed
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        animObserver.observe(el);
    });

    // ==========================================================================
    // FORM VALIDATION & INTERACTIVE SUBMISSION FEEDBACK
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            // UI Feedback during submission simulation
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            
            // Simulating API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                submitBtn.style.background = '#10b981';
                
                // Clear input fields
                contactForm.reset();
                
                // Restore button state after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // ==========================================================================
    // SKILL BARS WIDTH ANIMATION ON VIEWPORT ENTRY
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // Store original widths
    skillBars.forEach(bar => {
        bar.dataset.width = bar.style.width;
        bar.style.width = '0%';
    });

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});
