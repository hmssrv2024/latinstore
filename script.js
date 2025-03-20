document.addEventListener('DOMContentLoaded', function() {
    // Variables originales
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
    
    // Variables nuevas
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // WhatsApp Widget
    const whatsappTrigger = document.querySelector('.whatsapp-trigger');
    const whatsappWidget = document.querySelector('.whatsapp-widget');
    const whatsappClose = document.querySelector('.whatsapp-widget-close');
    const whatsappInput = document.querySelector('.whatsapp-widget-footer input');
    const sendButton = document.querySelector('.send-button');
    
    // Función para verificar si un elemento está en el viewport (mantener original)
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Inicializar la reproducción de videos solo cuando están en el viewport (mantener original)
    function initVideoPlayback() {
        // Código original...
    }
    
    // Menú móvil
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Alternar barra de búsqueda
    function toggleSearchBar() {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchBar.querySelector('input').focus();
        }
    }
    
    // WhatsApp Widget
    function toggleWhatsappWidget() {
        whatsappWidget.classList.toggle('active');
        if (whatsappWidget.classList.contains('active')) {
            setTimeout(() => {
                whatsappInput.focus();
            }, 300);
        }
    }
    
    function closeWhatsappWidget() {
        whatsappWidget.classList.remove('active');
    }
    
    function sendWhatsappMessage() {
        // Redireccionar a WhatsApp con el texto del input
        const message = whatsappInput.value.trim();
        if (message) {
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/13183584564?text=${encodedMessage}`, '_blank');
            whatsappInput.value = '';
        } else {
            window.open('https://wa.me/13183584564', '_blank');
        }
    }
    
    // Funciones para tabs en la página de información
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Verificar si estamos en la página de información
        if (tabButtons.length === 0) return;
        
        // Ver si hay un tab en la URL
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        
        // Inicializar el tab activo basado en el parámetro de URL o el primero por defecto
        let activeTabIndex = 0;
        
        if (tabParam) {
            tabButtons.forEach((btn, index) => {
                if (btn.dataset.tab === tabParam) {
                    activeTabIndex = index;
                }
            });
        }
        
        // Activar el tab inicial
        tabButtons[activeTabIndex].classList.add('active');
        tabContents[activeTabIndex].classList.add('active');
        
        // Event listeners para los botones de tab
        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Desactivar todos los tabs
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Activar el tab seleccionado
                btn.classList.add('active');
                tabContents[index].classList.add('active');
                
                // Actualizar la URL sin recargar la página
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('tab', btn.dataset.tab);
                window.history.pushState({}, '', newUrl);
            });
        });
    }
    
    // Funciones para FAQ en la página de soporte
    function initFaq() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        // Verificar si estamos en la página de soporte
        if (faqQuestions.length === 0) return;
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                question.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }
    
    // Función para inicializar el formulario de rastreo
    function initTracking() {
        const trackingForm = document.querySelector('.tracking-form');
        const trackingResult = document.querySelector('.tracking-result');
        
        // Verificar si estamos en la página de rastreo
        if (!trackingForm) return;
        
        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const trackingNumber = document.getElementById('tracking-number').value;
            
            // Simulación de búsqueda (en producción, esto sería una llamada a una API)
            if (trackingNumber) {
                // Mostrar un loader
                document.querySelector('.tracking-form-container').innerHTML = '<div class="spinner"></div><p>Buscando información de tu pedido...</p>';
                
                // Simular tiempo de carga
                setTimeout(() => {
                    trackingResult.classList.add('active');
                    document.querySelector('.tracking-form-container').style.display = 'none';
                    
                    // Actualizar el número de pedido en el resultado
                    document.querySelector('.tracking-number').textContent = trackingNumber;
                }, 1500);
            }
        });
    }
    
    // Funciones originales (mantener)
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
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.feature-row, .product-card, .category-card');
        
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Event Listeners
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);
    if (searchToggle) searchToggle.addEventListener('click', toggleSearchBar);
    if (whatsappTrigger) whatsappTrigger.addEventListener('click', toggleWhatsappWidget);
    if (whatsappClose) whatsappClose.addEventListener('click', closeWhatsappWidget);
    if (sendButton) sendButton.addEventListener('click', sendWhatsappMessage);
    if (whatsappInput) {
        whatsappInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendWhatsappMessage();
            }
        });
    }
    
    // Event Listeners originales
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Soporte para swipe en dispositivos móviles (mantener original)
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderTrack) {
        sliderTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
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
    
    // Inicializar funciones
    handleScroll();
    if (sliderTrack) {
        updateSlider();
        startAutoSlide();
    }
    initVideoPlayback();
    animateOnScroll();
    initTabs();
    initFaq();
    initTracking();
});
/* Optimizaciones para móviles y tablet */
@media (max-width: 768px) {
    html {
        font-size: 54%;
    }
    
    .hero-content h1 {
        font-size: 4.5rem;
    }
    
    .section-title {
        font-size: 3.5rem;
    }
    
    .feature-row {
        margin-bottom: 10rem;
    }
    
    .feature-content h2 {
        font-size: 3.5rem;
    }
    
    .category-card {
        height: 30rem;
    }
    
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 4rem;
    }
}

@media (max-width: 576px) {
    html {
        font-size: 50%;
    }
    
    .hero-content h1 {
        font-size: 3.8rem;
    }
    
    .hero-content p {
        font-size: 1.8rem;
    }
    
    .section-title {
        font-size: 3rem;
    }
    
    .product-video-container {
        height: 25rem;
    }
    
    .product-info {
        padding: 2rem;
    }
    
    .product-info h3 {
        font-size: 2.2rem;
    }
    
    .feature-content h2 {
        font-size: 3rem;
    }
    
    .promo-content h2 {
        font-size: 3.2rem;
    }
    
    .newsletter-content h2 {
        font-size: 3.5rem;
    }
    
    .footer-col h4 {
        font-size: 1.8rem;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .legal-links {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
}

/* Menú móvil */
.mobile-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 85%;
    max-width: 400px;
    height: 100vh;
    background: var(--white);
    box-shadow: var(--shadow-xl);
    z-index: 2000;
    overflow-y: auto;
    transition: left 0.3s ease;
}

.mobile-menu.active {
    left: 0;
}

.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid var(--gray-200);
}

.mobile-menu-header .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.mobile-menu-header .logo img {
    width: 3.5rem;
    height: 3.5rem;
}

.mobile-menu-header .logo h3 {
    font-size: 2rem;
    font-weight: 700;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.close-menu {
    background: none;
    border: none;
    font-size: 2.4rem;
    color: var(--gray-500);
    cursor: pointer;
}

.mobile-nav-links {
    padding: 2rem;
}

.mobile-nav-links li {
    margin-bottom: 2rem;
}

.mobile-nav-links a {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--gray-800);
    display: block;
    padding: 1rem 0;
    transition: var(--transition-fast);
}

.mobile-nav-links a.active {
    color: var(--primary-color);
}

.mobile-menu-footer {
    padding: 2rem;
    border-top: 1px solid var(--gray-200);
    text-align: center;
}

.mobile-menu-footer .social-icons {
    justify-content: center;
}

/* Overlay para el menú móvil */
.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1999;
}

.menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* WhatsApp Widget */
.whatsapp-widget {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    transform: scale(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
    z-index: 9999;
    overflow: hidden;
}

.whatsapp-widget.active {
    transform: scale(1);
}

.whatsapp-widget-header {
    background: #075E54;
    color: #fff;
    padding: 15px;
    display: flex;
    align-items: center;
}

.whatsapp-widget-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    background: #fff;
}

.whatsapp-widget-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.whatsapp-widget-info {
    flex: 1;
}

.whatsapp-widget-info h4 {
    font-size: 1.6rem;
    margin: 0;
}

.whatsapp-widget-info p {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.8;
}

.whatsapp-widget-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
}

.whatsapp-widget-body {
    padding: 15px;
    background: #E5DDD5;
    height: 250px;
    overflow-y: auto;
}

.whatsapp-message {
    margin-bottom: 15px;
    max-width: 80%;
}

.whatsapp-message p {
    margin: 0 0 5px 0;
    padding: 10px 15px;
    border-radius: 8px;
    position: relative;
    font-size: 1.4rem;
}

.whatsapp-message.incoming {
    align-self: flex-start;
}

.whatsapp-message.incoming p {
    background: #fff;
    color: #303030;
}

.whatsapp-message.outgoing {
    align-self: flex-end;
    margin-left: auto;
}

.whatsapp-message.outgoing p {
    background: #DCF8C6;
    color: #303030;
}

.message-time {
    display: block;
    font-size: 1.1rem;
    color: #999;
    text-align: right;
    margin-top: 2px;
}

.whatsapp-widget-footer {
    padding: 10px;
    background: #F0F0F0;
    display: flex;
    align-items: center;
}

.whatsapp-widget-footer input {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    font-size: 1.4rem;
    outline: none;
}

.send-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #25D366;
    color: #fff;
    border: none;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.send-button a {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.whatsapp-widget-powered {
    padding: 5px;
    background: #F0F0F0;
    text-align: center;
    font-size: 1.1rem;
    color: #999;
    border-top: 1px solid #E0E0E0;
}

.whatsapp-trigger {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25D366;
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transition: all 0.3s ease;
}

.whatsapp-trigger:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 576px) {
    .whatsapp-widget {
        width: calc(100% - 40px);
        max-width: 350px;
    }
}

/* Página de tabs para información */
.info-container {
    padding: 5rem 0;
}

.tabs-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 3rem;
    box-shadow: var(--shadow-md);
}

.tabs-navigation {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 1rem;
}

.tabs-navigation::-webkit-scrollbar {
    display: none;
}

.tab-button {
    padding: 1.2rem 2.4rem;
    background: none;
    border: none;
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--gray-600);
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    transition: var(--transition-fast);
}

.tab-button::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--primary-gradient);
    transition: var(--transition-medium);
}

.tab-button.active {
    color: var(--primary-color);
}

.tab-button.active::after {
    width: 100%;
}

.tab-content {
    display: none;
    animation: fadeIn 0.5s ease;
}

.tab-content.active {
    display: block;
}

.tab-content h2 {
    font-size: 3.2rem;
    margin-bottom: 2rem;
    color: var(--gray-900);
}

.tab-content p {
    font-size: 1.6rem;
    line-height: 1.6;
    color: var(--gray-700);
    margin-bottom: 1.5rem;
}

/* Página de soporte y contacto */
.support-contact-container {
    padding: 5rem 0;
}

.support-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
}

.contact-form-container, .support-resources {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 3rem;
    box-shadow: var(--shadow-md);
}

.contact-form-container h2, .support-resources h2 {
    font-size: 3rem;
    margin-bottom: 2.5rem;
    color: var(--gray-900);
}

.contact-methods {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
}

.contact-method {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: var(--radius-md);
    background: var(--light-bg);
    flex: 1;
    transition: var(--transition-medium);
    cursor: pointer;
}

.contact-method:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.contact-method i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
}

.contact-method h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
}

.contact-method p {
    font-size: 1.4rem;
    color: var(--gray-600);
    text-align: center;
}

.contact-form label {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    color: var(--gray-800);
}

.contact-form input,
.contact-form textarea,
.contact-form select {
    width: 100%;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 1.5rem;
    color: var(--gray-800);
    background: var(--light-bg);
    transition: var(--transition-fast);
}

.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(121, 40, 202, 0.1);
}

.support-card {
    background: var(--light-bg);
    border-radius: var(--radius-md);
    padding: 2rem;
    margin-bottom: 2rem;
    transition: var(--transition-medium);
}

.support-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.support-card h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--gray-800);
}

.support-card p {
    font-size: 1.5rem;
    color: var(--gray-600);
    margin-bottom: 1.5rem;
}

.support-card a {
    color: var(--primary-color);
    font-weight: 500;
}

.support-card a:hover {
    text-decoration: underline;
}

.faq-container {
    margin-top: 3rem;
}

.faq-item {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 1.5rem;
}

.faq-question {
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--gray-800);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.faq-question::after {
    content: '+';
    font-size: 2rem;
    transition: var(--transition-fast);
}

.faq-question.active::after {
    content: '−';
}

.faq-answer {
    font-size: 1.5rem;
    color: var(--gray-600);
    line-height: 1.6;
    padding: 1rem 0;
    display: none;
}

.faq-answer.active {
    display: block;
}

/* Página de rastreo */
.tracking-container {
    padding: 8rem 0;
    max-width: 800px;
    margin: 0 auto;
}

.tracking-form-container {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 4rem;
    box-shadow: var(--shadow-md);
    text-align: center;
    margin-bottom: 4rem;
}

.tracking-form-container h2 {
    font-size: 3.2rem;
    margin-bottom: 2rem;
    color: var(--gray-900);
}

.tracking-form-container p {
    font-size: 1.6rem;
    color: var(--gray-600);
    margin-bottom: 3rem;
}

.tracking-form {
    max-width: 500px;
    margin: 0 auto;
}

.tracking-form .form-group {
    margin-bottom: 2rem;
}

.tracking-form input {
    width: 100%;
    padding: 1.5rem;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    font-size: 1.6rem;
    text-align: center;
}

.tracking-form input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(121, 40, 202, 0.1);
}

.tracking-result {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 4rem;
    box-shadow: var(--shadow-md);
    display: none;
}

.tracking-result.active {
    display: block;
}

.tracking-header {
    text-align: center;
    margin-bottom: 3rem;
}

.tracking-header h3 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    color: var(--gray-900);
}

.order-details {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--gray-200);
}

.order-detail-item {
    flex: 1;
    min-width: 200px;
}

.order-detail-item h4 {
    font-size: 1.4rem;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
}

.order-detail-item p {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--gray-900);
}

.tracking-timeline {
    margin-top: 4rem;
}

@media (max-width: 768px) {
    .support-contact-grid {
        grid-template-columns: 1fr;
    }
    
    .contact-methods {
        flex-direction: column;
    }
    
    .order-details {
        flex-direction: column;
        gap: 1.5rem;
    }
}
