document.addEventListener('DOMContentLoaded', function() {
    // Constantes y configuración
    const BOLIVAR_RATE = 80; // Tasa de cambio Bs/USD
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
    const totalBs = document.getElementById('total-bs');
    const persistentSummary = document.getElementById('persistent-summary');
    const persistentProductImage = document.getElementById('persistent-product-image');
    const persistentProductName = document.getElementById('persistent-product-name');
    const persistentProductPrice = document.getElementById('persistent-product-price');
    const persistentDeliveryDate = document.getElementById('persistent-delivery-date');
    const otpModal = document.getElementById('otp-modal');
    const otpInputs = document.querySelectorAll('.otp-input');
    const creditCard = document.getElementById('credit-card');
    const cardNumberInput = document.getElementById('card-number-input');
    const cardNumberOverlay = document.getElementById('card-number-overlay');
    const cardNameInput = document.getElementById('card-name-input');
    const cardExpiryInput = document.getElementById('card-expiry-input');
    const cardCVVInput = document.getElementById('card-cvv-input');
    const cardNumberDisplay = document.getElementById('card-number-display');
    const cardNameDisplay = document.getElementById('card-name-display');
    const cardExpiryDisplay = document.getElementById('card-expiry-display');
    const cardCVVDisplay = document.getElementById('card-cvv-display');
    const cardTypeIcon = document.getElementById('card-type-icon');
    const cardTypeDisplay = document.getElementById('card-type-display');
    
    // Variables
    let cart = [];
    let currentStep = 1;
    let subtotal = 0;
    let tax = 0;
    let shipping = 70; // Default to Express
    let insurance = 0;
    let discount = 0;
    let total = 0;
    
    // Inicializar
    init();
    
    // Función de inicialización principal
    function init() {
        // Cargar carrito desde localStorage
        loadCartFromStorage();
        
        // Renderizar productos
        renderProductPreviews();
        renderSummaryProducts();
        renderPersistentSummary();
        
        // Calcular y actualizar totales
        updateCartSummary();
        updateDeliveryDates();
        
        // Configurar eventos
        setupEventListeners();
        
        // Ocultar preloader
        setTimeout(() => {
            preloader.classList.remove('active');
        }, 2000);
    }
    
    // Cargar carrito desde localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('latinphone_cart');
        const savedTotals = localStorage.getItem('latinphone_cart_totals');
        
        if (savedCart && savedCart !== "[]" && savedCart !== "null") {
            try {
                cart = JSON.parse(savedCart);
                
                // Cargar totales si están disponibles
                if (savedTotals) {
                    try {
                        const totals = JSON.parse(savedTotals);
                        subtotal = totals.subtotal || 0;
                        tax = totals.tax || 0;
                        shipping = totals.shipping || 70;
                    } catch (e) {
                        console.error("Error al parsear totales:", e);
                    }
                }
            } catch (e) {
                console.error("Error al parsear el carrito:", e);
                cart = getDefaultCart();
            }
        } else {
            cart = getDefaultCart();
        }
    }
    
    // Carrito por defecto para demostración
    function getDefaultCart() {
        return [{
            id: 's25ultra',
            name: 'Samsung Galaxy S25 Ultra',
            price: 1299.99,
            quantity: 1,
            image: 'https://th.bing.com/th?id=OPEC.Gy18E1jCjibBhg474C474&w=592&h=550&o=5&pid=21.1'
        }];
    }
    
    // Helper Functions
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function formatBolivares(amount) {
        const bsAmount = amount * BOLIVAR_RATE;
        return bsAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Bs';
    }

    function updateBolivarAmounts() {
        // Update all Bolivar amounts in page
        document.getElementById('nationalization-amount-bs').textContent = formatBolivares(30);
        document.getElementById('nationalization-checkbox-bs').textContent = formatBolivares(30);
        document.getElementById('summary-bs').textContent = formatBolivares(30);
        document.getElementById('confirmation-nationalization-bs').textContent = formatBolivares(30);
        document.getElementById('tracking-nationalization-bs').textContent = formatBolivares(30);
        document.getElementById('pago-movil-amount').textContent = formatCurrency(total);
        document.getElementById('pago-movil-amount-bs').textContent = formatBolivares(total);
        totalBs.textContent = formatBolivares(total);
        
        // Update nationalization percentage
        const percentage = (30 / total * 100).toFixed(1);
        document.getElementById('nationalization-percentage').textContent = percentage + '%';
    }

    function updateDeliveryDates() {
        const today = new Date();
        let minDays = 15;
        let maxDays = 20;
        
        // Get selected shipping method
        const shippingMethods = document.querySelectorAll('.shipping-methods .payment-method');
        shippingMethods.forEach(method => {
            if (method.classList.contains('active')) {
                const shippingType = method.getAttribute('data-shipping');
                
                if (shippingType === 'express') {
                    minDays = 1;
                    maxDays = 4;
                } else if (shippingType === 'standard') {
                    minDays = 7;
                    maxDays = 10;
                } else {
                    minDays = 15;
                    maxDays = 20;
                }
            }
        });
        
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + minDays);
        
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + maxDays);
        
        // Format dates
        const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
        const minDateFormatted = formatter.format(minDate);
        const maxDateFormatted = formatter.format(maxDate);
        
        // Update dates in UI
        document.getElementById('delivery-date-min').textContent = minDateFormatted;
        document.getElementById('delivery-date-max').textContent = maxDateFormatted;
        document.getElementById('summary-date-min').textContent = minDateFormatted;
        document.getElementById('summary-date-max').textContent = maxDateFormatted;
        document.getElementById('tracking-estimate').textContent = `${minDateFormatted} - ${maxDateFormatted}, 2025`;
        document.getElementById('persistent-delivery-date').textContent = `Entrega: ${minDateFormatted.split(' ')[0]}-${maxDateFormatted.split(' ')[0]} ${maxDateFormatted.split(' ')[1]}`;
    }

    function updateCartSummary() {
        // Calculate totals
        if (subtotal === 0) {
            subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        tax = subtotal * 0.16;
        insurance = subtotal * 0.02;
        total = subtotal + tax + shipping + insurance - discount;
        
        // Update summary
        summarySubtotal.textContent = formatCurrency(subtotal);
        summaryTax.textContent = formatCurrency(tax);
        summaryShipping.textContent = formatCurrency(shipping);
        summaryInsurance.textContent = formatCurrency(insurance);
        
        if (discount > 0) {
            summaryDiscount.textContent = '-' + formatCurrency(discount);
            summaryDiscountRow.style.display = 'flex';
        } else {
            summaryDiscountRow.style.display = 'none';
        }
        
        summaryTotal.textContent = formatCurrency(total);
        
        // Update Bolivar amounts
        updateBolivarAmounts();
        
        // Update confirmation screen
        document.getElementById('confirmation-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('confirmation-tax').textContent = formatCurrency(tax);
        document.getElementById('confirmation-shipping').textContent = formatCurrency(shipping);
        document.getElementById('confirmation-insurance').textContent = formatCurrency(insurance);
        document.getElementById('confirmation-total').textContent = formatCurrency(total);
        
        if (discount > 0) {
            document.getElementById('confirmation-discount').textContent = '-' + formatCurrency(discount);
            document.getElementById('confirmation-discount-row').style.display = 'flex';
        } else {
            document.getElementById('confirmation-discount-row').style.display = 'none';
        }
    }

    function renderProductPreviews() {
        // Clear container
        productPreviewContainer.innerHTML = '';
        
        // Render each product
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'product-preview';
            
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-preview-image">
                <div class="product-preview-info">
                    <h3 class="product-preview-name">${item.name}</h3>
                    <div class="product-preview-price">${formatCurrency(item.price)} <span class="bolivar-conversion">${formatBolivares(item.price)}</span></div>
                    <div class="product-preview-meta">
                        <span>Cantidad: ${item.quantity}</span>
                        <span>Garantía: 1 año</span>
                    </div>
                </div>
            `;
            
            productPreviewContainer.appendChild(productElement);
        });
    }

    function renderSummaryProducts() {
        // Clear container
        summaryProducts.innerHTML = '';
        
        // Render each product
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'product-list-item';
            
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-list-image">
                <div class="product-list-info">
                    <div class="product-list-name">${item.name}</div>
                    <div class="product-list-price">${formatCurrency(item.price)}</div>
                    <div class="product-list-quantity">Cantidad: ${item.quantity}</div>
                </div>
            `;
            
            summaryProducts.appendChild(productElement);
        });
        
        // Update confirmation products
        const confirmationProducts = document.getElementById('confirmation-products');
        confirmationProducts.innerHTML = summaryProducts.innerHTML;
    }

    function renderPersistentSummary() {
        // Show first product in persistent summary
        if (cart.length > 0) {
            const firstProduct = cart[0];
            persistentProductImage.src = firstProduct.image;
            persistentProductName.textContent = firstProduct.name;
            persistentProductPrice.textContent = formatCurrency(firstProduct.price);
            
            // Show persistent summary
            persistentSummary.classList.add('active');
        } else {
            persistentSummary.classList.remove('active');
        }
    }

    function goToStep(step) {
        // Validate current step before proceeding
        if (currentStep < step && !validateStep(currentStep)) {
            return;
        }
        
        // Hide all steps
        checkoutSteps.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show requested step
        checkoutSteps[step - 1].classList.add('active');
        
        // Update progress
        progressFill.style.width = (step / 4 * 100) + '%';
        
        // Update progress steps
        progressSteps.forEach((stepElement, index) => {
            stepElement.classList.remove('active', 'completed');
            
            if (index + 1 === step) {
                stepElement.classList.add('active');
            } else if (index + 1 < step) {
                stepElement.classList.add('completed');
            }
        });
        
        // Update current step
        currentStep = step;
        
        // Scroll to top of the section
        window.scrollTo({
            top: document.querySelector('.progress-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    function toggleCardFlip() {
        creditCard.classList.toggle('flipped');
    }

    function formatCardNumber(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
        const onlyDigits = value.replace(/[\s-]/g, '');
        
        if (onlyDigits.length <= 16) {
            value = onlyDigits.replace(regex, (regex, $1, $2, $3, $4) => 
                [$1, $2, $3, $4].filter(group => group !== '').join(' ')
            );
            input.value = value;
        }
        
        // Update card display
        updateCardDisplay();
        
        // Update card type
        updateCardType(value.replace(/\s+/g, ''));
    }

    function formatCardExpiry(input) {
        let value = input.value.replace(/[^0-9]/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        input.value = value;
        
        // Update card display
        updateCardDisplay();
    }

    function updateCardType(cardNumber) {
        let cardType = 'cc-generic';
        let cardTypeName = 'TARJETA';
        
        // Determine card type based on BIN range
        if (/^4/.test(cardNumber)) {
            cardType = 'cc-visa';
            cardTypeName = 'VISA';
        } else if (/^5[1-5]/.test(cardNumber)) {
            cardType = 'cc-mastercard';
            cardTypeName = 'MASTERCARD';
        } else if (/^3[47]/.test(cardNumber)) {
            cardType = 'cc-amex';
            cardTypeName = 'AMEX';
        } else if (/^6(?:011|5)/.test(cardNumber)) {
            cardType = 'cc-discover';
            cardTypeName = 'DISCOVER';
        }
        
        // Update card type icon
        cardTypeIcon.innerHTML = `<i class="fab fa-${cardType}"></i>`;
        cardTypeDisplay.textContent = cardTypeName;
    }

    function updateCardDisplay() {
        // Card Number
        if (cardNumberInput.value) {
            const lastDigits = cardNumberInput.value.slice(-4);
            const maskedNumber = '•••• •••• •••• ' + lastDigits;
            cardNumberDisplay.textContent = maskedNumber;
            
            // Update overlay
            if (cardNumberInput.value.length > 0) {
                const maskedValue = cardNumberInput.value.replace(/\d(?=\d{4})/g, '•');
                cardNumberOverlay.textContent = maskedValue;
                cardNumberOverlay.style.display = 'flex';
            } else {
                cardNumberOverlay.style.display = 'none';
            }
        } else {
            cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            cardNumberOverlay.style.display = 'none';
        }
        
        // Card Name
        cardNameDisplay.textContent = cardNameInput.value.toUpperCase() || 'NOMBRE APELLIDO';
        
        // Card Expiry
        cardExpiryDisplay.textContent = cardExpiryInput.value || 'MM/AA';
        
        // Card CVV
        cardCVVDisplay.textContent = cardCVVInput.value ? '***' : '***';
    }

    function showOTPModal() {
        otpModal.classList.add('active');
        otpInputs[0].focus();
        
        // Start OTP timer
        let timeLeft = 120; // 2 minutes
        const timerElement = document.getElementById('otp-timer');
        
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerElement.textContent = '00:00';
                showNotification('El código ha expirado. Por favor solicita uno nuevo.', 'error');
            }
        }, 1000);
        
        // Store timer reference for cleanup
        otpModal.dataset.timer = timer;
    }

    function hideOTPModal() {
        otpModal.classList.remove('active');
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        
        // Clear timer
        if (otpModal.dataset.timer) {
            clearInterval(otpModal.dataset.timer);
        }
    }

    function handleOTPInput() {
        const otpValue = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otpValue.length === 6) {
            // Validate OTP
            if (otpValue === VALID_OTP) {
                hideOTPModal();
                goToStep(4); // Go to confirmation step
                createConfetti(); // Celebration effect
            } else {
                showNotification('Código de verificación incorrecto. Intenta nuevamente.', 'error');
            }
        }
    }

    function createConfetti() {
        const colors = ['#0056b3', '#ff3a6e', '#00e676', '#ffc107', '#3a86ff'];
        const confettiCount = 200;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 3 + 3;
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    function showNotification(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set icon based on type
        let icon = 'check-circle';
        if (type === 'error') icon = 'times-circle';
        else if (type === 'warning') icon = 'exclamation-circle';
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${type === 'success' ? 'Éxito!' : type === 'error' ? 'Error' : 'Atención'}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Add close event
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    function validateStep(step) {
        if (step === 1) {
            // Check if cart has items
            if (cart.length === 0) {
                showNotification('Por favor, agrega productos al carrito para continuar.', 'error');
                return false;
            }
            return true;
        } else if (step === 2) {
            // Validate shipping form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dni = document.getElementById('dni').value;
            const country = document.getElementById('country').value;
            const state = document.getElementById('state').value;
            const city = document.getElementById('city').value;
            const address = document.getElementById('address').value;
            const shippingCompany = document.getElementById('shipping-company').value;
            const agreement = document.getElementById('nationalization-agreement').checked;
            
            if (!name || !email || !phone || !dni || !country || !state || !city || !address || !shippingCompany) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return false;
            }
            
            // Check if agreement is checked for Venezuela
            if ((country === 've' || country === 'co') && !agreement) {
                showNotification('Debes aceptar el acuerdo de nacionalización para continuar.', 'error');
                return false;
            }
            
            return true;
        } else if (step === 3) {
            // Get selected payment method
            const activePaymentMethod = document.querySelector('.payment-methods .payment-method.active');
            const paymentType = activePaymentMethod.getAttribute('data-payment');
            
            if (paymentType === 'card') {
                // Validate card details
                const cardName = cardNameInput.value;
                const cardNumber = cardNumberInput.value.replace(/\s/g, '');
                const cardExpiry = cardExpiryInput.value;
                const cardCVV = cardCVVInput.value;
                
                if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
                    showNotification('Por favor, completa todos los campos de la tarjeta.', 'error');
                    return false;
                }
                
                // Validate card details against the valid ones
                if (cardNumber !== VALID_CARD || cardExpiry !== VALID_EXPIRY || cardCVV !== VALID_CVV) {
                    showNotification('Los datos de la tarjeta no son válidos o no coinciden con nuestros registros.', 'error');
                    return false;
                }
                
                return true;
            } else if (paymentType === 'pago-movil') {
                // Validate Pago Móvil fields
                const banco = document.getElementById('banco-emisor').value;
                const referencia = document.getElementById('numero-referencia').value;
                const telefono = document.getElementById('telefono-pago-movil').value;
                
                if (!banco || !referencia || !telefono) {
                    showNotification('Por favor, completa todos los campos del pago móvil.', 'error');
                    return false;
                }
                
                return true;
            }
            
            return true;
        }
        
        return true;
    }

    function applyCoupon() {
        const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
        const couponMessage = document.getElementById('coupon-message');
        
        if (couponCode === 'NEW2025') {
            // Apply 10% discount
            discount = subtotal * 0.1;
            couponMessage.textContent = '¡Cupón aplicado! 10% de descuento';
            couponMessage.style.color = 'var(--success)';
            showNotification('Cupón aplicado correctamente. ¡10% de descuento!');
            updateCartSummary();
        } else {
            couponMessage.textContent = 'Cupón inválido o expirado';
            couponMessage.style.color = 'var(--danger)';
            showNotification('El código de cupón no es válido.', 'error');
        }
    }

    function setupEventListeners() {
        // Navegación entre pasos
        document.getElementById('go-to-step-2').addEventListener('click', () => goToStep(2));
        document.getElementById('back-to-step-1').addEventListener('click', () => goToStep(1));
        document.getElementById('go-to-step-3').addEventListener('click', () => goToStep(3));
        document.getElementById('back-to-step-2').addEventListener('click', () => goToStep(2));
        document.getElementById('go-to-step-4').addEventListener('click', () => {
            if (validateStep(3)) showOTPModal();
        });
        
        // Persistent summary continue button
        document.getElementById('persistent-continue').addEventListener('click', () => {
            if (currentStep < 4) {
                if (validateStep(currentStep)) {
                    if (currentStep === 3) {
                        showOTPModal();
                    } else {
                        goToStep(currentStep + 1);
                    }
                }
            }
        });
        
        // Credit card form
        cardCVVInput.addEventListener('focus', () => {
            creditCard.classList.add('flipped');
        });
        
        cardCVVInput.addEventListener('blur', () => {
            creditCard.classList.remove('flipped');
        });
        
        creditCard.addEventListener('click', toggleCardFlip);
        
        // Card input formatting
        cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
        cardExpiryInput.addEventListener('input', () => formatCardExpiry(cardExpiryInput));
        cardNameInput.addEventListener('input', updateCardDisplay);
        cardCVVInput.addEventListener('input', updateCardDisplay);
        
        // OTP inputs
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length >= 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    } else {
                        handleOTPInput();
                    }
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
        
        // OTP modal
        document.getElementById('verify-otp').addEventListener('click', handleOTPInput);
        document.getElementById('close-otp').addEventListener('click', hideOTPModal);
        document.getElementById('resend-otp').addEventListener('click', () => {
            hideOTPModal();
            setTimeout(showOTPModal, 500);
            showNotification('Se ha enviado un nuevo código de verificación.');
        });
        
        // Payment method selection
        document.querySelectorAll('.payment-methods .payment-method').forEach(method => {
            method.addEventListener('click', () => {
                // Remove active class from all methods
                document.querySelectorAll('.payment-methods .payment-method').forEach(m => {
                    m.classList.remove('active');
                });
                
                // Add active class to clicked method
                method.classList.add('active');
                
                // Show corresponding form for payment methods
                if (method.closest('.payment-methods') !== document.querySelector('.shipping-methods')) {
                    const paymentType = method.getAttribute('data-payment');
                    document.querySelectorAll('.payment-method-form').forEach(form => {
                        form.classList.remove('active');
                    });
                    document.getElementById(`${paymentType}-payment-form`).classList.add('active');
                } else {
                    // Handle shipping method selection
                    shipping = parseFloat(method.getAttribute('data-cost'));
                    updateCartSummary();
                    updateDeliveryDates();
                }
            });
        });
        
        // Apply coupon button
        document.getElementById('apply-coupon').addEventListener('click', applyCoupon);
        
        // WhatsApp contact
        document.getElementById('contact-whatsapp').addEventListener('click', (e) => {
            e.preventDefault();
            const orderNumber = document.getElementById('order-number').textContent;
            const message = `Hola LatinPhone, acabo de realizar el pedido ${orderNumber}. Quiero confirmar mi compra.`;
            window.open(`https://wa.me/18133584564?text=${encodeURIComponent(message)}`, '_blank');
        });
        
        // Support link
        document.getElementById('support-link').addEventListener('click', (e) => {
            e.preventDefault();
            window.open(`https://wa.me/18133584564?text=${encodeURIComponent('Hola LatinPhone, necesito ayuda con mi compra.')}`, '_blank');
        });
        
        // Complete order button (in confirmation step)
        document.getElementById('complete-order').addEventListener('click', (e) => {
            e.preventDefault();
            // Clear the cart from localStorage
            localStorage.removeItem('latinphone_cart');
            localStorage.removeItem('latinphone_cart_totals');
            showNotification('¡Gracias por tu compra!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});
