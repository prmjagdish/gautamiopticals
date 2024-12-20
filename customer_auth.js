document.addEventListener('DOMContentLoaded', function() {
    // Hide auth link if we're on the auth page
    const isAuthPage = window.location.pathname.includes('customer_auth.html');
    if (isAuthPage) {
        document.querySelector('.home').classList.add('auth-page');
    }

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            btn.classList.add('active');
            const formId = btn.dataset.tab + 'Form';
            document.getElementById(formId).classList.add('active');
        });
    });

    // Password Visibility Toggle
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Password Strength Indicator
    const passwordInput = document.querySelector('#signupForm input[type="password"]');
    const strengthBar = document.querySelector('.password-strength');

    passwordInput?.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthBar(strength);
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 0.25;
        if (password.match(/[a-z]+/)) strength += 0.25;
        if (password.match(/[A-Z]+/)) strength += 0.25;
        if (password.match(/[0-9]+/)) strength += 0.25;
        return strength;
    }

    function updateStrengthBar(strength) {
        strengthBar.style.background = `linear-gradient(to right, 
            ${getStrengthColor(strength)} ${strength * 100}%, 
            #e2e8f0 ${strength * 100}%)`;
    }

    function getStrengthColor(strength) {
        if (strength <= 0.25) return '#ef4444';
        if (strength <= 0.5) return '#f59e0b';
        if (strength <= 0.75) return '#10b981';
        return '#22c55e';
    }

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                console.log('Form is valid, submitting...');
                // Add your form submission logic here
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email');
                isValid = false;
            } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let error = formGroup.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            formGroup.appendChild(error);
        }
        
        error.textContent = message;
        input.classList.add('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }
}); 