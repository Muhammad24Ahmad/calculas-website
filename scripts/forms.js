// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
    // Job Application Form
    const jobForm = document.getElementById('jobApplicationForm');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobApplication);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Handle job application form submission
function handleJobApplication(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!validateForm(form)) {
        showAlert('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        message: formData.get('message'),
        cv: formData.get('cv')
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, you would send this data to your server
        console.log('Job application submitted:', data);
        
        showAlert('Application submitted successfully! We\'ll review your application and get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!validateForm(form)) {
        showAlert('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real application, you would send this data to your server
        console.log('Contact form submitted:', data);
        
        showAlert('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// File upload validation
function validateFileUpload(fileInput) {
    const file = fileInput.files[0];
    if (!file) return true; // Not required in this case
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        showAlert('Please upload a PDF or Word document.', 'error');
        fileInput.value = '';
        return false;
    }
    
    if (file.size > maxSize) {
        showAlert('File size must be less than 5MB.', 'error');
        fileInput.value = '';
        return false;
    }
    
    return true;
}

// Add file upload validation to CV input
document.addEventListener('DOMContentLoaded', function() {
    const cvInput = document.getElementById('cv');
    if (cvInput) {
        cvInput.addEventListener('change', function() {
            validateFileUpload(this);
        });
    }
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error styling when user starts typing
            if (this.style.borderColor === 'rgb(220, 38, 38)') {
                this.style.borderColor = '';
            }
        });
    });
});

function validateField(field) {
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        if (!isValidEmail(field.value)) {
            isValid = false;
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
            isValid = false;
        }
    }
    
    // Apply styling
    if (!isValid) {
        field.style.borderColor = '#dc2626';
    } else {
        field.style.borderColor = '';
    }
    
    return isValid;
}