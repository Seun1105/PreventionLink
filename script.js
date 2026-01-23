document.addEventListener('DOMContentLoaded', () => {

    // Select all sections to animate
    const sections = document.querySelectorAll('section');

    // Add initial hidden class
    sections.forEach(section => {
        section.classList.add('hidden-section');
    });

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-section');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Button interactions (smooth scroll to contact or top if generic)
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // For demo purposes, just log click
            console.log('CTA Clicked:', e.target.textContent);

            // If it's a "Partner" button, scroll to contact/final CTA
            if (e.target.textContent.toLowerCase().includes('partner') ||
                e.target.textContent.toLowerCase().includes('contact')) {
                const footer = document.querySelector('.final-cta');
                if (footer) footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Interactive Stakeholder Selection (Background Swap) ---
    const bgLayer = document.getElementById('stakeholder-bg');
    const cards = document.querySelectorAll('.stakeholder-card');

    // Function to set background
    function setBackground(url) {
        if (!bgLayer) return;
        bgLayer.style.backgroundImage = `url('${url}')`;
    }

    // Set initial background from the active card
    const initialActive = document.querySelector('.stakeholder-card.active');
    if (initialActive && initialActive.dataset.bg) {
        setBackground(initialActive.dataset.bg);
    }

    cards.forEach(card => {
        // Desktop Hover
        card.addEventListener('mouseenter', function () {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const bg = this.dataset.bg;
            if (bg) setBackground(bg);
        });

        // Mobile Tap/Click
        card.addEventListener('click', function (e) {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const bg = this.dataset.bg;
            if (bg) setBackground(bg);
        });
    });
});
