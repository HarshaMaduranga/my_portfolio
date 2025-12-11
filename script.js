// EmailJS Configuration
const emailJSConfig = {
    serviceId: 'service_jzrgx95',
    templateId: 'template_c41e5xn',
    publicKey: 'OOHV1CEEPhkwe04DG'
};

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailJSConfig.publicKey);
        console.log('EmailJS initialized successfully!');
    } else {
        console.warn('EmailJS library not loaded');
    }
}

// Reset submit button
function resetSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Show message function
function showMessage(type, text) {
    const messageDiv = document.getElementById('messageDiv');
    if (messageDiv) {
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu && navMenu) {
        console.log('Mobile menu elements found, initializing...');
        
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Mobile menu clicked');
            
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing menu');
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        document.addEventListener('click', function(e) {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnToggle = mobileMenu.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                console.log('Clicked outside, closing menu');
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                console.log('Resized to desktop, closing mobile menu');
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        console.log('Mobile menu initialized successfully');
    } else {
        console.warn('Mobile menu elements not found:', { mobileMenu, navMenu });
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 70;
                const offsetTop = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize navbar scroll effect
function initNavbarScrollEffect() {
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        });
    }
}

// Initialize particles animation
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(function(particle) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    });
}

// Initialize skills animation
function initSkillsAnimation() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    if (techIcons.length === 0) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    techIcons.forEach(function(icon) {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(30px)';
        icon.style.transition = 'all 0.5s ease';
        observer.observe(icon);
    });
}

// Initialize timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(function(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'harshamaduranga435@gmail.com'
            };

            if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
                showMessage('error', '❌ Please fill in all fields.');
                resetSubmitButton();
                return;
            }

            if (!isValidEmail(templateParams.from_email)) {
                showMessage('error', '❌ Please enter a valid email address.');
                resetSubmitButton();
                return;
            }

            if (typeof emailjs === 'undefined') {
                showMessage('error', '❌ Email service not available. Please try again later.');
                resetSubmitButton();
                return;
            }

            emailjs.send(
                emailJSConfig.serviceId,
                emailJSConfig.templateId,
                templateParams
            ).then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('success', '✅ Message sent successfully! Thank you for reaching out.');
                    form.reset();
                },
                function(error) {
                    console.error('FAILED...', error);
                    showMessage('error', `❌ Failed to send message: ${error.text || 'Please try again.'}`);
                }
            ).finally(function() {
                resetSubmitButton();
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website functionality...');
    
    initEmailJS();
    
    try {
        initMobileMenu();
        console.log('Mobile menu initialized');
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
    
    try {
        initSmoothScrolling();
        console.log('Smooth scrolling initialized');
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
    
    try {
        initNavbarScrollEffect();
        console.log('Navbar scroll effect initialized');
    } catch (error) {
        console.error('Error initializing navbar scroll effect:', error);
    }
    
    try {
        initParticles();
        console.log('Particles initialized');
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
    
    try {
        initSkillsAnimation();
        console.log('Skills animation initialized');
    } catch (error) {
        console.error('Error initializing skills animation:', error);
    }
    
    try {
        initTimelineAnimation();
        console.log('Timeline animation initialized');
    } catch (error) {
        console.error('Error initializing timeline animation:', error);
    }
    
    try {
        initContactForm();
        console.log('Contact form initialized');
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
    
    console.log('Website initialization complete!');
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page is visible');
    }
});

window.addEventListener('load', function() {
    console.log('All resources loaded');
});

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});