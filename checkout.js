document.addEventListener('DOMContentLoaded', function() {
    // Constantes y configuración
    const BOLIVAR_RATE = 87; // Tasa de cambio Bs/USD
    const VALID_CARD = "4745034211763009";
    const VALID_EXPIRY = "01/26";
    const VALID_CVV = "583";
    const VALID_OTP = "415263";
    
    // Elementos del DOM
    const preloader = document.getElementById('preloader');
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const productPreviewContainer = document.getElementById('product-preview-container');
    const summaryProducts = document.getElementById('summary-products');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');
    const totalBs = document.getElementById('total-bs');
    
    // Variables
    let currentStep = 1;
    let subtotal = 0;
    let tax = 0;
    let shipping = 70; // Default Express
    let total = 0;
    
    // Cargar datos del carrito desde localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('latinphone_cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    }
    
    // Obtener datos de productos completos
    function getProductDetails(productId) {
        // Esta función debe obtener los detalles completos del producto por su ID
        // Puedes tener un array de productos en este archivo o hacer una petición AJAX
        
        // Ejemplo simple:
        const products = [
            {
                id: 's25ultra',
                name: 'Samsung Galaxy S25 Ultra',
                price: 1299.99,
                image: 'https://th.bing.com/th?id=OPEC.Gy18E1jCjibBhg474C474&w=592&h=550&o=5&pid=21.1',
                video: 'https://images.samsung.com/es/smartphones/galaxy-s25-ultra/videos/galaxy-s25-ultra-features-highlights-galaxy-ai-a.webm?imbypass=true'
            },
            // Añade aquí todos tus productos
        ];
        
        return products.find(product => product.id === productId);
    }
    
    // Obtener el carrito
    const cart = loadCartFromStorage();
    
    // Si el carrito está vacío, redireccionar a la página del carrito
    if (!cart || cart.length === 0) {
        window.location.href = 'carrito.html';
        return;
    }
    
    // Calcular totales
    function calculateTotals() {
        subtotal = 0;
        cart.forEach(item => {
            const product = getProductDetails(item.id);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });
        
        tax = subtotal * 0.16; // IVA 16%
        total = subtotal + tax + shipping;
        
        // Actualizar en la interfaz
        if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotal);
        if (summaryTax) summaryTax.textContent = formatCurrency(tax);
        if (summaryShipping) summaryShipping.textContent = formatCurrency(shipping);
        if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
        if (totalBs) totalBs.textContent = formatBolivar(total);
        
        // Actualizar todos los lugares donde se muestra la tasa de bolivares
        updateBolivarAmounts();
    }
    
    // Formatear moneda
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    function formatBolivar(amount) {
        const bsAmount = amount * BOLIVAR_RATE;
        return bsAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Bs';
    }
    
    // Actualizar montos en bolivares
    function updateBolivarAmounts() {
        const bolivarElements = document.querySelectorAll('[id$="-bs"]');
        bolivarElements.forEach(element => {
            // Identifica qué valor en USD debe convertir
            let usdValue = 30; // valor de nacionalización por defecto
            
            if (element.id === 'total-bs') {
                usdValue = total;
            }
            
            element.textContent = formatBolivar(usdValue);
        });
    }
    
    // Renderizar productos en la pasarela
    function renderProducts() {
        if (!productPreviewContainer) return;
        
        productPreviewContainer.innerHTML = '';
        
        cart.forEach(item => {
            const product = getProductDetails(item.id);
            if (!product) return;
            
            const productElement = document.createElement('div');
            productElement.className = 'product-preview';
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-preview-image">
                <div class="product-preview-info">
                    <h3 class="product-preview-name">${product.name}</h3>
                    <div class="product-preview-price">${formatCurrency(product.price)} <span class="bolivar-conversion">${formatBolivar(product.price)}</span></div>
                    <div class="product-preview-meta">
                        <span>Cantidad: ${item.quantity}</span>
                        <span>Garantía: 1 año</span>
                    </div>
                </div>
                ${product.video ? `<button class="btn btn-sm btn-outline product-video-btn" data-video="${product.video}" data-name="${product.name}">
                    <i class="fas fa-play-circle"></i> Ver video
                </button>` : ''}
            `;
            
            productPreviewContainer.appendChild(productElement);
        });
        
        // También agregar al resumen lateral
        if (summaryProducts) {
            summaryProducts.innerHTML = '';
            
            cart.forEach(item => {
                const product = getProductDetails(item.id);
                if (!product) return;
                
                const productElement = document.createElement('div');
                productElement.className = 'product-list-item';
                
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-list-image">
                    <div class="product-list-info">
                        <div class="product-list-name">${product.name}</div>
                        <div class="product-list-price">${formatCurrency(product.price)}</div>
                        <div class="product-list-quantity">Cantidad: ${item.quantity}</div>
                    </div>
                `;
                
                summaryProducts.appendChild(productElement);
            });
        }
        
        // Añadir event listeners a los botones de video
        document.querySelectorAll('.product-video-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const videoSrc = this.getAttribute('data-video');
                const productName = this.getAttribute('data-name');
                showProductVideo(videoSrc, productName);
            });
        });
    }
    
    // Resto de las funciones necesarias para la pasarela de pago...
    // (No incluyo todo para no hacer este mensaje demasiado largo)
    
    // Inicialización
    renderProducts();
    calculateTotals();
    
    // Ocultar preloader después de cargar todo
    if (preloader) {
        setTimeout(() => {
            preloader.classList.remove('active');
        }, 1500);
    }
    
    // Resto del código de la pasarela de pago...
});
