document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Inicializar la reproducción de videos solo cuando están en el viewport
    function initVideoPlayback() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Configurar opciones de IntersectionObserver
            const options = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1 // 10% del video visible
            };
            
            // Crear el observer
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Si el video está en el viewport
                    if (entry.isIntersecting) {
                        // Intentar reproducir el video
                        try {
                            entry.target.play();
                        } catch (err) {
                            console.log("Error al reproducir el video:", err);
                        }
                    } else {
                        // Si no está en el viewport, pausar para ahorrar recursos
                        entry.target.pause();
                    }
                });
            }, options);
            
            // Observar cada video
            observer.observe(video);
        });
    }
    
    // Menú móvil
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
    }
    
    // Slider de productos
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Iniciar autoSlide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Detener autoSlide (al interactuar con los controles)
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Efecto de scroll para navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Animación de aparición de elementos
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.feature-row, .product-card, .category-card');
        
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Event Listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar funciones
    handleScroll();
    updateSlider();
    startAutoSlide();
    initVideoPlayback();
    animateOnScroll();
    
    // Soporte para swipe en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe a la izquierda
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe a la derecha
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    }
    
    // Optimización de rendimiento con throttling para eventos de scroll
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                animateOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Lazy loading para imágenes adicionales
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px 200px 0px"
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, imgOptions);
        
        const lazyImages = document.querySelectorAll('[data-src]');
        lazyImages.forEach(img => imgObserver.observe(img));
    }
});