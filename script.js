document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Year Update
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Interactive Portfolio Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card styling for transitions
                card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show matching cards
                    card.style.display = 'flex';
                    // Force repaint to trigger CSS transitions smoothly
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translate(0, 0) scale(1)';
                    }, 20);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'translate(0, 10px) scale(0.98)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // Matches transition duration
                }
            });
        });
    });

    // 3. Skills Bar Scroll Animation using Intersection Observer
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-inner');

    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate each skill bar to its target value
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-target');
                        bar.style.width = targetWidth;
                    });
                    // Unobserve after running once to keep state
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // Triggers when 15% of the skills section is visible
        });

        skillsObserver.observe(skillsSection);
    }

    // 4. Easter Egg: Sparkle Burst on Logo and Signature Click
    const logoLink = document.querySelector('.logo-text');
    const footerSignature = document.querySelector('.footer-signature');

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            createBotanicalSparkle(e.clientX, e.clientY);
        });
    }

    if (footerSignature) {
        footerSignature.addEventListener('click', (e) => {
            createBotanicalSparkle(e.clientX, e.clientY);
        });
    }

    function createBotanicalSparkle(x, y) {
        const count = 16;
        // Botanical brand colors (Bright Red, Olive Green, Magenta, Pale Gold)
        const colors = ['#d83832', '#788b5c', '#bf4184', '#e7ca83', '#7c6b9d'];

        for (let i = 0; i < count; i++) {
            const leafSpark = document.createElement('div');
            
            // Random sizes and colors
            const size = Math.random() * 8 + 6;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            leafSpark.style.width = `${size}px`;
            leafSpark.style.height = `${size}px`;
            leafSpark.style.background = color;
            leafSpark.style.position = 'fixed';
            leafSpark.style.left = `${x}px`;
            leafSpark.style.top = `${y}px`;
            leafSpark.style.pointerEvents = 'none';
            leafSpark.style.zIndex = '9999';
            leafSpark.style.border = '1px solid #070707';
            
            // Give it an organic leaf/teardrop shape using border-radius
            leafSpark.style.borderRadius = '0% 100% 0% 100%';
            
            // Random organic rotation
            const rotation = Math.random() * 360;
            leafSpark.style.transform = `rotate(${rotation}deg)`;
            
            // Random trajectory
            const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
            const speed = Math.random() * 120 + 60;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            document.body.appendChild(leafSpark);

            // Smooth organic animation using Web Animations API
            const animation = leafSpark.animate([
                { transform: `translate(0, 0) rotate(${rotation}deg) scale(1)`, opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) rotate(${rotation + 180}deg) scale(0)`, opacity: 0 }
            ], {
                duration: 900 + Math.random() * 400,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            });

            animation.onfinish = () => {
                leafSpark.remove();
            };
        }
    }
});
