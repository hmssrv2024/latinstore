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
    const summaryInsurance = document.getElementById('summary-insurance');
    const summaryDiscountRow = document.getElementById('summary-discount-row');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryTotal = document.getElementById('summary-total');
    const summaryTotalBs = document.getElementById('summary-total-bs');
    
    // Botones de navegación
    const goToStep2Btn = document.getElementById('go-to-step-2');
    const backToStep1Btn = document.getElementById('back-to-step-1');
    const goToStep3Btn = document.getElementById('go-to-step-3');
    const backToStep2Btn = document.getElementById('back-to-step-2');
    const processPaymentBtn = document.getElementById('process-payment');
    
    // Variables
    let currentStep = 1;
    let subtotal = 0;
    let tax = 0;
    let shipping = 70; // Default Express
    let insurance = 0;
    let discount = 0;
    let total = 0;
    
    // Cargar datos del carrito desde localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('latinphone_cart');
        const savedTotals = localStorage.getItem('latinphone_cart_totals');
        console.log("Carrito cargado:", savedCart);
        console.log("Totales cargados:", savedTotals);
        
        try {
            if (savedCart && savedCart !== "[]" && savedCart !== "null") {
                const cartData = JSON.parse(savedCart);
                
                // Validar datos del carrito
                return cartData.map(item => ({
                    ...item,
                    price: typeof item.price === 'number' ? item.price : 0,
                    quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1
                }));
            }
        } catch (e) {
            console.error("Error al parsear el carrito:", e);
        }
        
        return getDefaultCart();
    }
    
    // Carrito por defecto para demostración
    function getDefaultCart() {
        const defaultCart = [
            {
                id: 's25ultra',
                name: 'Samsung Galaxy S25 Ultra',
                price: 1299.99,
                quantity: 1,
                image: 'https://images.samsung.com/is/image/samsung/p6pim/es/2501/gallery/es-galaxy-s25-s938-sm-s938bzbdeub-thumb-544741244?$310_N_PNG$',
                color: 'Negro'
            }
        ];
        
        // Guardar carrito de ejemplo en localStorage
        localStorage.setItem('latinphone_cart', JSON.stringify(defaultCart));
        return defaultCart;
    }
    
    // Obtener el carrito
    const cart = loadCartFromStorage();
    
    // Obtener datos de productos completos
    function getProductDetails(productId) {
        const products = [
            {
                id: 's25ultra',
                name: 'Samsung Galaxy S25 Ultra',
                price: 1299.99,
                image: 'https://images.samsung.com/is/image/samsung/p6pim/es/2501/gallery/es-galaxy-s25-s938-sm-s938bzbdeub-thumb-544741244?$310_N_PNG$',
                video: 'https://images.samsung.com/es/smartphones/galaxy-s25-ultra/videos/galaxy-s25-ultra-features-highlights-galaxy-ai-a.webm?imbypass=true'
            },
            {
                id: 'iphone16pro',
                name: 'iPhone 16 Pro Ultra',
                price: 1499.99,
                image: 'https://www.apple.com/v/iphone/home/cb/images/overview/select/iphone_16pro__erw9alves2qa_medium.png',
                video: null
            },
            {
                id: 'pixel10pro',
                name: 'Google Pixel 10 Pro',
                price: 1099.99,
                image: 'https://th.bing.com/th?id=OPEC.Gy18E1jCjibBhg474C474&w=592&h=550&o=5&pid=21.1',
                video: null
            }
        ];
        
        const product = products.find(product => product.id === productId);
        return product || {
            id: productId,
            name: productId,
            price: 0,
            image: 'https://via.placeholder.com/150',
            video: null
        };
    }
    
    // Calcular totales
    function calculateTotals() {
        // Reiniciar subtotal
        subtotal = 0;
        
        // Sumar precios validando los datos
        cart.forEach(item => {
            const product = getProductDetails(item.id);
            if (product) {
                const price = typeof product.price === 'number' ? product.price : 0;
                const quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;
                subtotal += price * quantity;
            }
        });
        
        tax = subtotal * 0.16; // IVA 16%
        insurance = subtotal * 0.02; // 2% de seguro
        total = subtotal + tax + shipping + insurance - discount;
        
        // Validar montos
        if (isNaN(subtotal)) subtotal = 0;
        if (isNaN(tax)) tax = 0;
        if (isNaN(shipping)) shipping = 70;
        if (isNaN(insurance)) insurance = 0;
        if (isNaN(discount)) discount = 0;
        if (isNaN(total)) total = 0;
        
        // Actualizar en la interfaz
        if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotal);
        if (summaryTax) summaryTax.textContent = formatCurrency(tax);
        if (summaryShipping) summaryShipping.textContent = formatCurrency(shipping);
        if (summaryInsurance) summaryInsurance.textContent = formatCurrency(insurance);
        
        if (discount > 0) {
            if (summaryDiscount) summaryDiscount.textContent = '-' + formatCurrency(discount);
            if (summaryDiscountRow) summaryDiscountRow.style.display = 'flex';
        } else {
            if (summaryDiscountRow) summaryDiscountRow.style.display = 'none';
        }
        
        if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
        if (summaryTotalBs) summaryTotalBs.textContent = formatBolivar(total);
        
        // Actualizar todos los lugares donde se muestra la tasa de bolivares
        updateBolivarAmounts();
    }
    
    // Formatear moneda
    function formatCurrency(amount) {
        // Manejar casos inválidos
        if (isNaN(amount) || typeof amount !== 'number') {
            console.error("Valor inválido para formatear:", amount);
            amount = 0;
        }
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    function formatBolivar(amount) {
        // Manejar casos inválidos
        if (isNaN(amount) || typeof amount !== 'number') {
            console.error("Valor inválido para formateo en bolívares:", amount);
            amount = 0;
        }
        const bsAmount = amount * BOLIVAR_RATE;
        return bsAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Bs';
    }
    
    // Actualizar montos en bolivares
    function updateBolivarAmounts() {
        const bolivarElements = document.querySelectorAll('[id$="-bs"]');
        bolivarElements.forEach(element => {
            // Identifica qué valor en USD debe convertir
            let usdValue = 30; // valor de nacionalización por defecto
            
            if (element.id === 'total-bs' || element.id === 'summary-total-bs') {
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
    }
    
    // Avanzar al paso 2 (información de envío)
    function goToStep2() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        
        // Actualizar barra de progreso
        if (progressFill) progressFill.style.width = '50%';
        
        // Ocultar paso actual y mostrar siguiente
        hideAllSteps();
        if (checkoutSteps[1]) checkoutSteps[1].classList.add('active');
        
        // Actualizar paso activo
        updateActiveStep(2);
        currentStep = 2;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
    
    // Volver al paso 1
    function backToStep1() {
        // Actualizar barra de progreso
        if (progressFill) progressFill.style.width = '25%';
        
        // Ocultar paso actual y mostrar anterior
        hideAllSteps();
        if (checkoutSteps[0]) checkoutSteps[0].classList.add('active');
        
        // Actualizar paso activo
        updateActiveStep(1);
        currentStep = 1;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
    
    // Avanzar al paso 3 (pago)
    function goToStep3() {
        // Validar formulario de envío
        if (!validateShippingForm()) {
            alert('Por favor completa todos los campos requeridos.');
            return;
        }
        
        const nationalAgreeCheckbox = document.getElementById('nationalization-agreement');
        if (!nationalAgreeCheckbox || !nationalAgreeCheckbox.checked) {
            alert('Debes aceptar el cargo de nacionalización para continuar.');
            return;
        }
        
        // Actualizar barra de progreso
        if (progressFill) progressFill.style.width = '75%';
        
        // Ocultar paso actual y mostrar siguiente
        hideAllSteps();
        if (checkoutSteps[2]) checkoutSteps[2].classList.add('active');
        
        // Actualizar paso activo
        updateActiveStep(3);
        currentStep = 3;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
    
    // Volver al paso 2
    function backToStep2() {
        // Actualizar barra de progreso
        if (progressFill) progressFill.style.width = '50%';
        
        // Ocultar paso actual y mostrar anterior
        hideAllSteps();
        if (checkoutSteps[1]) checkoutSteps[1].classList.add('active');
        
        // Actualizar paso activo
        updateActiveStep(2);
        currentStep = 2;
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
    
    // Procesar pago
    function processPayment() {
        // Validar tarjeta
        if (!validateCardDetails()) {
            alert('Por favor verifica los datos de tu tarjeta.');
            return;
        }
        
        // Mostrar modal OTP
        const otpModal = document.getElementById('otp-modal');
        if (otpModal) {
            otpModal.classList.add('active');
            startOtpTimer();
            focusFirstOtpInput();
        }
    }
    
    // Ocultar todos los pasos
    function hideAllSteps() {
        checkoutSteps.forEach(step => {
            step.classList.remove('active');
        });
    }
    
    // Actualizar indicador de paso activo
    function updateActiveStep(stepNumber) {
        progressSteps.forEach((step, index) => {
            // Los pasos son 1-based, pero index es 0-based
            const stepValue = index + 1;
            
            if (stepValue < stepNumber) {
                // Pasos anteriores (completados)
                step.classList.remove('active');
                step.classList.add('completed');
            } else if (stepValue === stepNumber) {
                // Paso actual
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                // Pasos futuros
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Validar formulario de envío
    function validateShippingForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        
        const requiredFields = [nameInput, emailInput, phoneInput, addressInput, cityInput, stateInput];
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (field && !field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else if (field) {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Validar datos de tarjeta
    function validateCardDetails() {
        const cardNameInput = document.getElementById('card-name-input');
        const cardNumberInput = document.getElementById('card-number-input');
        const cardExpiryInput = document.getElementById('card-expiry-input');
        const cardCvvInput = document.getElementById('card-cvv-input');
        
        if (!cardNameInput || !cardNumberInput || !cardExpiryInput || !cardCvvInput) return false;
        
        const cardName = cardNameInput.value.trim();
        const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
        const cardExpiry = cardExpiryInput.value.trim();
        const cardCvv = cardCvvInput.value.trim();
        
        let isValid = true;
        
        // Validar nombre
        if (!cardName) {
            cardNameInput.classList.add('error');
            isValid = false;
        } else {
            cardNameInput.classList.remove('error');
        }
        
        // Validar número (usar el número de prueba)
        if (cardNumber !== VALID_CARD) {
            cardNumberInput.classList.add('error');
            isValid = false;
        } else {
            cardNumberInput.classList.remove('error');
        }
        
        // Validar fecha (usar la fecha de prueba)
        if (cardExpiry !== VALID_EXPIRY) {
            cardExpiryInput.classList.add('error');
            isValid = false;
        } else {
            cardExpiryInput.classList.remove('error');
        }
        
        // Validar CVV (usar el CVV de prueba)
        if (cardCvv !== VALID_CVV) {
            cardCvvInput.classList.add('error');
            isValid = false;
        } else {
            cardCvvInput.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Iniciar temporizador OTP
    function startOtpTimer() {
        const otpTimer = document.getElementById('otp-timer');
        const resendOtpBtn = document.getElementById('resend-otp');
        let timeLeft = 120; // 2 minutos
        
        let otpTimerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (otpTimer) {
                otpTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft <= 0) {
                clearInterval(otpTimerInterval);
                if (resendOtpBtn) resendOtpBtn.removeAttribute('disabled');
            } else {
                timeLeft--;
            }
        }, 1000);
        
        if (resendOtpBtn) resendOtpBtn.setAttribute('disabled', 'disabled');
    }
    
    // Enfocar primer input de OTP
    function focusFirstOtpInput() {
        const otpInputs = document.querySelectorAll('.otp-input');
        if (otpInputs && otpInputs.length > 0) {
            otpInputs[0].focus();
            
            // Limpiar todos los inputs
            otpInputs.forEach(input => {
                input.value = '';
            });
        }
    }
    
    // Verificar OTP y finalizar compra
    function verifyOtp() {
        const otpInputs = document.querySelectorAll('.otp-input');
        const otpModal = document.getElementById('otp-modal');
        
        // Obtener código ingresado
        let otpCode = '';
        otpInputs.forEach(input => {
            otpCode += input.value;
        });
        
        // Verificar código
        if (otpCode !== VALID_OTP) {
            alert('El código ingresado no es válido. Inténtalo de nuevo. Usa 415263 para probar.');
            return;
        }
        
        // Cerrar modal
        if (otpModal) otpModal.classList.remove('active');
        
        // Mostrar loader simulando procesamiento
        if (preloader) preloader.classList.add('active');
        
        // Simular tiempo de procesamiento
        setTimeout(() => {
            // Avanzar a confirmación
            if (preloader) preloader.classList.remove('active');
            goToConfirmation();
        }, 2000);
    }
    
    // Avanzar a confirmación (paso 4)
    function goToConfirmation() {
        // Actualizar barra de progreso
        if (progressFill) progressFill.style.width = '100%';
        
        // Ocultar paso actual y mostrar confirmación
        hideAllSteps();
        if (checkoutSteps[3]) checkoutSteps[3].classList.add('active');
        
        // Actualizar paso activo
        updateActiveStep(4);
        currentStep = 4;
        
        // Actualizar detalles de confirmación
        generateOrderNumber();
        updateConfirmationProducts();
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
    
    // Generar número de orden
    function generateOrderNumber() {
        const orderNumber = document.getElementById('order-number');
        const orderDate = document.getElementById('order-date');
        
        if (orderNumber) {
            const randomPart = Math.floor(1000000 + Math.random() * 9000000);
            orderNumber.textContent = `LP-2025-${randomPart}`;
        }
        
        if (orderDate) {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            orderDate.textContent = today.toLocaleDateString('es-ES', options);
        }
    }
    
    // Actualizar productos en confirmación
    function updateConfirmationProducts() {
        const confirmationProducts = document.getElementById('confirmation-products');
        const confirmationSubtotal = document.getElementById('confirmation-subtotal');
        const confirmationTax = document.getElementById('confirmation-tax');
        const confirmationShipping = document.getElementById('confirmation-shipping');
        const confirmationTotal = document.getElementById('confirmation-total');
        const totalBs = document.getElementById('total-bs');
        
        if (confirmationProducts) {
            confirmationProducts.innerHTML = '';
            
            cart.forEach(item => {
                const product = getProductDetails(item.id);
                const itemElement = document.createElement('div');
                itemElement.className = 'product-list-item';
                
                itemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-list-image">
                    <div class="product-list-info">
                        <div class="product-list-name">${product.name}</div>
                        <div class="product-list-price">${formatCurrency(product.price)}</div>
                        <div class="product-list-quantity">Cantidad: ${item.quantity}</div>
                    </div>
                `;
                
                confirmationProducts.appendChild(itemElement);
            });
        }
        
        // Actualizar valores finales
        if (confirmationSubtotal) confirmationSubtotal.textContent = formatCurrency(subtotal);
        if (confirmationTax) confirmationTax.textContent = formatCurrency(tax);
        if (confirmationShipping) confirmationShipping.textContent = formatCurrency(shipping);
        if (confirmationTotal) confirmationTotal.textContent = formatCurrency(total);
        if (totalBs) totalBs.textContent = formatBolivar(total);
    }
    
    // Inicializar event listeners
    function initEventListeners() {
        // Botones de navegación
        if (goToStep2Btn) goToStep2Btn.addEventListener('click', goToStep2);
        if (backToStep1Btn) backToStep1Btn.addEventListener('click', backToStep1);
        if (goToStep3Btn) goToStep3Btn.addEventListener('click', goToStep3);
        if (backToStep2Btn) backToStep2Btn.addEventListener('click', backToStep2);
        if (processPaymentBtn) processPaymentBtn.addEventListener('click', processPayment);
        
        // Botón para verificar OTP
        const verifyOtpBtn = document.getElementById('verify-otp');
        if (verifyOtpBtn) verifyOtpBtn.addEventListener('click', verifyOtp);
        
        // Cerrar modal OTP
        const closeOtpBtn = document.getElementById('close-otp');
        const otpModal = document.getElementById('otp-modal');
        if (closeOtpBtn && otpModal) {
            closeOtpBtn.addEventListener('click', () => {
                otpModal.classList.remove('active');
            });
        }
        
        // Listeners para inputs OTP
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function(e) {
                if (this.value && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });
        });
        
        // Botón finalizar compra
        const completeOrderBtn = document.getElementById('complete-order');
        if (completeOrderBtn) {
            completeOrderBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('latinphone_cart');
                localStorage.removeItem('latinphone_cart_totals');
                alert('¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.');
                window.location.href = 'index.html';
            });
        }
        
        // Botón contactar WhatsApp
        const contactWhatsappBtn = document.getElementById('contact-whatsapp');
        if (contactWhatsappBtn) {
            contactWhatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const orderNumber = document.getElementById('order-number').textContent;
                const message = `Hola LatinPhone, he realizado una compra con el número de pedido ${orderNumber}. Quisiera información sobre mi pedido.`;
                window.open(`https://wa.me/13183584564?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
        
        // Configurar manejo de botones de shipping
        const shippingMethods = document.querySelectorAll('.shipping-methods .payment-method');
        shippingMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Quitar clase active de todos los métodos
                shippingMethods.forEach(m => m.classList.remove('active'));
                
                // Agregar clase active al método seleccionado
                this.classList.add('active');
                
                // Actualizar costo de envío
                const shippingCost = parseFloat(this.getAttribute('data-cost'));
                if (!isNaN(shippingCost)) {
                    shipping = shippingCost;
                    calculateTotals();
                }
            });
        });
    }
    
    // Inicializar
    function init() {
        renderProducts();
        calculateTotals();
        initEventListeners();
        
        // Ocultar preloader
        if (preloader) {
            setTimeout(() => {
                preloader.classList.remove('active');
            }, 1500);
        }
    }
    
    // Iniciar
    init();
});
