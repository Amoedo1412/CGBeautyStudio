// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });

    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// BEFORE & AFTER SLIDER LOGIC
// ==========================================
const slider = document.querySelector('.comparison-slider');
const beforeImage = document.querySelector('.image-before');
const sliderLine = document.querySelector('.slider-line');
const sliderButton = document.querySelector('.slider-button');

if (slider && beforeImage && sliderLine && sliderButton) {
    let isDown = false;

    slider.addEventListener('mousedown', () => isDown = true);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mouseleave', () => isDown = false);

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        
        let rect = slider.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        // Prevent going out of bounds
        x = Math.max(0, Math.min(x, rect.width));
        
        let percent = (x / rect.width) * 100;
        
        beforeImage.style.width = percent + '%';
        sliderLine.style.left = percent + '%';
        sliderButton.style.left = percent + '%';
    });

    // Touch support for mobile
    slider.addEventListener('touchstart', (e) => isDown = true, {passive: true});
    window.addEventListener('touchend', () => isDown = false);
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        
        let rect = slider.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        
        x = Math.max(0, Math.min(x, rect.width));
        
        let percent = (x / rect.width) * 100;
        
        beforeImage.style.width = percent + '%';
        sliderLine.style.left = percent + '%';
        sliderButton.style.left = percent + '%';
    }, {passive: true});
}
