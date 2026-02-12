document.addEventListener('DOMContentLoaded', () => {
    // ========== SCROLL PROGRESS BAR ==========
    const scrollProgress = document.getElementById('scrollProgress');

    const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // ========== LIGHTBOX ==========
    const galleryImages = document.querySelectorAll('.carousel-slide img, .grid-item-simple img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    const img = document.createElement('img');
    img.className = 'lightbox-img';

    const closeBtn = document.createElement('div');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    galleryImages.forEach(item => {
        item.addEventListener('click', (e) => {
            img.src = e.target.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== img) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== CAROUSEL FUNCTIONALITY ==========
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-btn.next');
        const prevButton = carousel.querySelector('.carousel-btn.prev');

        let currentIndex = 0;

        const moveToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        };

        nextButton.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            moveToSlide(prevIndex);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextButton.click();
            } else if (e.key === 'ArrowLeft') {
                prevButton.click();
            }
        });
    });


    // ========== SMOOTH SCROLL REVEAL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.intro-text, .text-content, .member-card, .buy-content, .buy-image, .book-specs, .final-cta-section h2, .final-cta-section p');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
