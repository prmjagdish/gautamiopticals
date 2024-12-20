document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}); 