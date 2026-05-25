document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Update
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mouse Tracking Spotlight Effect
    const spotlight = document.getElementById('spotlight');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    // Throttle spotlight updates using requestAnimationFrame for 60fps butter-smooth motion
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    function updateSpotlight() {
        // Linear interpolation (lerp) for trailing smooth lag effect
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        currentX += dx * 0.1;
        currentY += dy * 0.1;

        const xPercent = (currentX / window.innerWidth) * 100;
        const yPercent = (currentY / window.innerHeight) * 100;

        document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
        document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);

        requestAnimationFrame(updateSpotlight);
    }
    
    // Start loop
    updateSpotlight();

    // 3. Premium Interactive Name Effect: Sparkle Burst on Click
    const heroName = document.getElementById('hero-name');
    if (heroName) {
        heroName.addEventListener('click', (e) => {
            createSparkleBurst(e.clientX, e.clientY);
        });
    }

    function createSparkleBurst(x, y) {
        const count = 12;
        const colors = ['#9f7aea', '#4299e1', '#ffffff', '#a855f7'];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('sparkle');
            
            // Random styling for particles
            const size = Math.random() * 6 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.style.opacity = '1';
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            // Random direction and velocity
            const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
            const speed = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            document.body.appendChild(particle);

            // Animate using Web Animations API
            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            });

            animation.onfinish = () => {
                particle.remove();
            };
        }
    }
});
