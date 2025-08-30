// EmailJS Configuration
const emailJSConfig = {
    serviceId: 'service_jzrgx95',
    templateId: 'template_c41e5xn',
    publicKey: 'OOHV1CEEPhkwe04DG'
};

// Initialize EmailJS
function initEmailJS() {
    emailjs.init(emailJSConfig.publicKey);
    console.log('EmailJS initialized successfully!');
}

// Website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // Add random movement to particles
    document.querySelectorAll('.particle').forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    });

    // Handle contact form submission
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'harshamaduranga435@gmail.com'
            };

            // Validate form data
            if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
                showMessage('error', '❌ Please fill in all fields.');
                resetSubmitButton();
                return;
            }

            // Validate email format
            if (!isValidEmail(templateParams.from_email)) {
                showMessage('error', '❌ Please enter a valid email address.');
                resetSubmitButton();
                return;
            }

            // Send email using EmailJS
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
});

// Reset submit button
function resetSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
}

// Show message function
function showMessage(type, text) {
    const messageDiv = document.getElementById('messageDiv');
    if (messageDiv) {
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
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