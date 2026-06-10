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

    // Note: Skill bar animations were removed as we converted to a tag-style skill layout.

    // 4. Easter Egg: Sparkle Burst on Logo and Signature Click
    const logoLink = document.querySelector('.logo-text');
    const footerSignature = document.querySelector('.footer-signature');

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            createBotanicalSparkle(e.clientX, e.clientY);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 400); // Trigger sparkle animation, then redirect home
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

    // 5. Lightbox Modal for Stockton, Evergreen, and Reality Upgrade Pages
    const path = window.location.pathname.toLowerCase();
    const isEligiblePage = path.includes('stockton') || path.includes('evergreen') || path.includes('reality-upgrade');
    
    if (isEligiblePage) {
        const hasGalleryImages = document.querySelector('.gallery-item img, .mural-hero-wrap img, .merch-images img');
        if (hasGalleryImages) {
            // Create Lightbox Markup
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox-modal';
            lightbox.className = 'lightbox-modal';
            lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-content-wrap">
                    <img class="lightbox-image" id="lightbox-img" src="" alt="">
                    <div class="lightbox-caption" id="lightbox-caption"></div>
                </div>
            `;
            document.body.appendChild(lightbox);

            const lightboxImg = lightbox.querySelector('#lightbox-img');
            const lightboxCaption = lightbox.querySelector('#lightbox-caption');
            const closeBtn = lightbox.querySelector('.lightbox-close');

            const openLightbox = (src, alt) => {
                lightboxImg.src = src;
                lightboxImg.alt = alt || 'Enlarged View';
                lightboxCaption.textContent = alt || '';
                lightbox.style.display = 'flex';
                // Force reflow
                lightbox.offsetHeight;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            };

            const closeLightbox = () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = '';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            };

            // Bind click to all eligible images
            const imagesToEnlarge = document.querySelectorAll('.gallery-item img, .mural-hero-wrap img, .merch-images img');
            imagesToEnlarge.forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    openLightbox(img.src, img.alt);
                });
            });

            // Close listeners
            closeBtn.addEventListener('click', closeLightbox);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                    closeLightbox();
                }
            });
        }
    }
});
