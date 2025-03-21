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
        
        try {
            if (savedCart && savedCart !== "[]" && savedCart !== "null") {
                cart = JSON.parse(savedCart);
                
                // Validar que los items tengan precio y cantidad
                cart = cart.map(item => {
                    return {
                        ...item,
                        price: typeof item.price === 'number' ? item.price : 0,
                        quantity: typeof item.quantity === 'number' ? item.quantity : 1
                    };
                });
                
                // Cargar totales si están disponibles
                if (savedTotals) {
                    try {
                        const totals = JSON.parse(savedTotals);
                        subtotal = typeof totals.subtotal === 'number' ? totals.subtotal : 0;
                        tax = typeof totals.tax === 'number' ? totals.tax : 0;
                        shipping = typeof totals.shipping === 'number' ? totals.shipping : 70;
                    } catch (e) {
                        console.error("Error al parsear totales:", e);
                        calculateInitialTotals();
                    }
                } else {
                    calculateInitialTotals();
                }
            } else {
                cart = getDefaultCart();
                calculateInitialTotals();
            }
        } catch (e) {
            console.error("Error al parsear el carrito:", e);
            cart = getDefaultCart();
            calculateInitialTotals();
        }
        
        console.log("Carrito cargado:", cart);
        console.log("Totales iniciales - subtotal:", subtotal, "tax:", tax, "shipping:", shipping);
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
    
    // Función auxiliar para calcular totales iniciales
    function calculateInitialTotals() {
        subtotal = cart.reduce((total, item) => {
            const itemPrice = typeof item.price === 'number' ? item.price : 0;
            const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
            return total + (itemPrice * itemQuantity);
        }, 0);
        tax = subtotal * 0.16;
        shipping = 70; // Valor predeterminado
    }
    
    // Helper Functions
    function formatCurrency(amount) {
        // Manejar casos excepcionales
        if (isNaN(amount) || typeof amount !== 'number') {
            console.error("Valor inválido para formatear:", amount);
            amount = 0;
        }
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function formatBolivares(amount) {
        // Manejar casos excepcionales
        if (isNaN(amount) || typeof amount !== 'number') {
            console.error("Valor inválido para formateo en Bolívares:", amount);
            amount = 0;
        }
        const bsAmount = amount * BOLIVAR_RATE;
        return bsAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Bs';
    }

    function updateBolivarAmounts() {
        // Update all Bolivar amounts in page
        const nationalizationAmount = document.getElementById('nationalization-amount-bs');
        const nationalizationCheckbox = document.getElementById('nationalization-checkbox-bs');
        const summaryNationalization = document.getElementById('summary-bs');
        const confirmationNationalization = document.getElementById('confirmation-nationalization-bs');
        const trackingNationalization = document.getElementById('tracking-nationalization-bs');
        const pagoMovilAmount = document.getElementById('pago-movil-amount');
        const pagoMovilAmountBs = document.getElementById('pago-movil-amount-bs');
        
        if (nationalizationAmount) nationalizationAmount.textContent = formatBolivares(30);
        if (nationalizationCheckbox) nationalizationCheckbox.textContent = formatBolivares(30);
        if (summaryNationalization) summaryNationalization.textContent = formatBolivares(30);
        if (confirmationNationalization) confirmationNationalization.textContent = formatBolivares(30);
        if (trackingNationalization) trackingNationalization.textContent = formatBolivares(30);
        if (pagoMovilAmount) pagoMovilAmount.textContent = formatCurrency(total);
        if (pagoMovilAmountBs) pagoMovilAmountBs.textContent = formatBolivares(total);
        if (totalBs) totalBs.textContent = formatBolivares(total);
        
        // Update nationalization percentage
        const percentageElement = document.getElementById('nationalization-percentage');
        if (percentageElement) {
            const percentage = total > 0 ? (30 / total * 100).toFixed(1) : "0.0";
            percentageElement.textContent = percentage + '%';
        }
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
        const minElements = [
            document.getElementById('delivery-date-min'),
            document.getElementById('summary-date-min')
        ];
        
        const maxElements = [
            document.getElementById('delivery-date-max'),
            document.getElementById('summary-date-max')
        ];
        
        minElements.forEach(el => {
            if (el) el.textContent = minDateFormatted;
        });
        
        maxElements.forEach(el => {
            if (el) el.textContent = maxDateFormatted;
        });
        
        const trackingEstimate = document.getElementById('tracking-estimate');
        if (trackingEstimate) {
            trackingEstimate.textContent = `${minDateFormatted} - ${maxDateFormatted}, 2025`;
        }
        
        const persistentDelivery = document.getElementById('persistent-delivery-date');
        if (persistentDelivery) {
            persistentDelivery.textContent = `Entrega: ${minDateFormatted.split(' ')[0]}-${maxDateFormatted.split(' ')[0]} ${maxDateFormatted.split(' ')[1]}`;
        }
    }

    function updateCartSummary() {
        // Asegurar valores numéricos válidos
        if (isNaN(subtotal) || subtotal === 0) {
            subtotal = cart.reduce((total, item) => {
                const itemPrice = typeof item.price === 'number' ? item.price : 0;
                const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
                return total + (itemPrice * itemQuantity);
            }, 0);
        }
        
        tax = subtotal * 0.16;
        insurance = subtotal * 0.02;
        total = subtotal + tax + shipping + insurance - discount;
        
        // Verificación contra NaN
        if (isNaN(subtotal)) subtotal = 0;
        if (isNaN(tax)) tax = 0;
        if (isNaN(shipping)) shipping = 70;
        if (isNaN(insurance)) insurance = 0;
        if (isNaN(total)) total = 0;
        
        // Actualizar interfaz
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
        
        // Actualizar montos en bolívares
        updateBolivarAmounts();
        
        // Actualizar pantalla de confirmación con verificaciones
        const confirmationSubtotal = document.getElementById('confirmation-subtotal');
        const confirmationTax = document.getElementById('confirmation-tax');
        const confirmationShipping = document.getElementById('confirmation-shipping');
        const confirmationInsurance = document.getElementById('confirmation-insurance');
        const confirmationTotal = document.getElementById('confirmation-total');
        
        if (confirmationSubtotal) confirmationSubtotal.textContent = formatCurrency(subtotal);
        if (confirmationTax) confirmationTax.textContent = formatCurrency(tax);
        if (confirmationShipping) confirmationShipping.textContent = formatCurrency(shipping);
        if (confirmationInsurance) confirmationInsurance.textContent = formatCurrency(insurance);
        if (confirmationTotal) confirmationTotal.textContent = formatCurrency(total);
        
        if (discount > 0) {
            const confirmationDiscount = document.getElementById('confirmation-discount');
            const confirmationDiscountRow = document.getElementById('confirmation-discount-row');
            
            if (confirmationDiscount) confirmationDiscount.textContent = '-' + formatCurrency(discount);
            if (confirmationDiscountRow) confirmationDiscountRow.style.display = 'flex';
        } else {
            const confirmationDiscountRow = document.getElementById('confirmation-discount-row');
            if (confirmationDiscountRow) confirmationDiscountRow.style.display = 'none';
        }
    }

    function renderProductPreviews() {
        // Clear container
        if (!productPreviewContainer) return;
        productPreviewContainer.innerHTML = '';
        
        // Render each product
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'product-preview';
            
            productElement.innerHTML = `
                <img src="${item.image || 'img/product-placeholder.png'}" alt="${item.name}" class="product-preview-image">
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
        if (!summaryProducts) return;
        summaryProducts.innerHTML = '';
        
        // Render each product
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'product-list-item';
            
            productElement.innerHTML = `
                <img src="${item.image || 'img/product-placeholder.png'}" alt="${item.name}" class="product-list-image">
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
        if (confirmationProducts) confirmationProducts.innerHTML = summaryProducts.innerHTML;
    }

    function renderPersistentSummary() {
        // Show first product in persistent summary
        if (cart.length > 0) {
            const firstProduct = cart[0];
            if (persistentProductImage) persistentProductImage.src = firstProduct.image || 'img/product-placeholder.png';
            if (persistentProductName) persistentProductName.textContent = firstProduct.name;
            if (persistentProductPrice) persistentProductPrice.textContent = formatCurrency(firstProduct.price);
            
            // Show persistent summary
            if (persistentSummary) persistentSummary.classList.add('active');
        } else {
            if (persistentSummary) persistentSummary.classList.remove('active');
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
        if (progressFill) progressFill.style.width = (step / 4 * 100) + '%';
        
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
        if (creditCard) creditCard.classList.toggle('flipped');
    }

    function formatCardNumber(input) {
        if (!input) return;
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
        if (!input) return;
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
        if (cardTypeIcon) cardTypeIcon.innerHTML = `<i class="fab fa-${cardType}"></i>`;
        if (cardTypeDisplay) cardTypeDisplay.textContent = cardTypeName;
    }

    function updateCardDisplay() {
        // Card Number
        if (cardNumberInput && cardNumberInput.value) {
            const lastDigits = cardNumberInput.value.slice(-4);
            const maskedNumber = '•••• •••• •••• ' + lastDigits;
            if (cardNumberDisplay) cardNumberDisplay.textContent = maskedNumber;
            
            // Update overlay
            if (cardNumberOverlay) {
                if (cardNumberInput.value.length > 0) {
                    const maskedValue = cardNumberInput.value.replace(/\d(?=\d{4})/g, '•');
                    cardNumberOverlay.textContent = maskedValue;
                    cardNumberOverlay.style.display = 'flex';
                } else {
                    cardNumberOverlay.style.display = 'none';
                }
            }
        } else {
            if (cardNumberDisplay) cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            if (cardNumberOverlay) cardNumberOverlay.style.display = 'none';
        }
        
        // Card Name
        if (cardNameDisplay) cardNameDisplay.textContent = (cardNameInput && cardNameInput.value) ? cardNameInput.value.toUpperCase() : 'NOMBRE APELLIDO';
        
        // Card Expiry
        if (cardExpiryDisplay) cardExpiryDisplay.textContent = (cardExpiryInput && cardExpiryInput.value) ? cardExpiryInput.value : 'MM/AA';
        
        // Card CVV
        if (cardCVVDisplay) cardCVVDisplay.textContent = (cardCVVInput && cardCVVInput.value) ? '***' : '***';
    }

    function showOTPModal() {
        if (!otpModal) return;
        otpModal.classList.add('active');
        if (otpInputs && otpInputs.length > 0) otpInputs[0].focus();
        
        // Start OTP timer
        let timeLeft = 120; // 2 minutes
        const timerElement = document.getElementById('otp-timer');
        
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            if (timerElement) timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (timerElement) timerElement.textContent = '00:00';
                showNotification('El código ha expirado. Por favor solicita uno nuevo.', 'error');
            }
        }, 1000);
        
        // Store timer reference for cleanup
        otpModal.dataset.timer = timer;
    }

    function hideOTPModal() {
        if (!otpModal) return;
        otpModal.classList.remove('active');
        
        // Clear OTP inputs
        if (otpInputs) {
            otpInputs.forEach(input => {
                if (input) input.value = '';
            });
        }
        
        // Clear timer
        if (otpModal.dataset.timer) {
            clearInterval(otpModal.dataset.timer);
        }
    }

    function handleOTPInput() {
        if (!otpInputs) return;
        
        const otpValue = Array.from(otpInputs).map(input => input ? input.value : '').join('');
        
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
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const dni = document.getElementById('dni');
            const country = document.getElementById('country');
            const state = document.getElementById('state');
            const city = document.getElementById('city');
            const address = document.getElementById('address');
            const shippingCompany = document.getElementById('shipping-company');
            const agreement = document.getElementById('nationalization-agreement');
            
            if (!name || !name.value || !email || !email.value || !phone || !phone.value || 
                !dni || !dni.value || !country || !country.value || !state || !state.value || 
                !city || !city.value || !address || !address.value || !shippingCompany || !shippingCompany.value) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return false;
            }
            
            // Check if agreement is checked for Venezuela
            if (country && (country.value === 've' || country.value === 'co') && (!agreement || !agreement.checked)) {
                showNotification('Debes aceptar el acuerdo de nacionalización para continuar.', 'error');
                return false;
            }
            
            return true;
        } else if (step === 3) {
            // Get selected payment method
            const activePaymentMethod = document.querySelector('.payment-methods .payment-method.active');
            if (!activePaymentMethod) return false;
            
            const paymentType = activePaymentMethod.getAttribute('data-payment');
            
            if (paymentType === 'card') {
                // Validate card details
                const cardName = cardNameInput && cardNameInput.value;
                const cardNumber = cardNumberInput && cardNumberInput.value ? cardNumberInput.value.replace(/\s/g, '') : '';
                const cardExpiry = cardExpiryInput && cardExpiryInput.value;
                const cardCVV = cardCVVInput && cardCVVInput.value;
                
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
                const banco = document.getElementById('banco-emisor');
                const referencia = document.getElementById('numero-referencia');
                const telefono = document.getElementById('telefono-pago-movil');
                
                if (!banco || !banco.value || !referencia || !referencia.value || !telefono || !telefono.value) {
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
        const couponCode = document.getElementById('coupon-code');
        const couponMessage = document.getElementById('coupon-message');
        
        if (!couponCode || !couponMessage) return;
        
        const code = couponCode.value.trim().toUpperCase();
        
        if (code === 'NEW2025') {
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
        const goToStep2Btn = document.getElementById('go-to-step-2');
        const backToStep1Btn = document.getElementById('back-to-step-1');
        const goToStep3Btn = document.getElementById('go-to-step-3');
        const backToStep2Btn = document.getElementById('back-to-step-2');
        const goToStep4Btn = document.getElementById('go-to-step-4');
        
        if (goToStep2Btn) goToStep2Btn.addEventListener('click', () => goToStep(2));
        if (backToStep1Btn) backToStep1Btn.addEventListener('click', () => goToStep(1));
        if (goToStep3Btn) goToStep3Btn.addEventListener('click', () => goToStep(3));
        if (backToStep2Btn) backToStep2Btn.addEventListener('click', () => goToStep(2));
        if (goToStep4Btn) goToStep4Btn.addEventListener('click', () => {
            if (validateStep(3)) showOTPModal();
        });
        
        // Persistent summary continue button
        const persistentContinueBtn = document.getElementById('persistent-continue');
        if (persistentContinueBtn) {
            persistentContinueBtn.addEventListener('click', () => {
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
        }
        
        // Credit card form
        if (cardCVVInput) {
            cardCVVInput.addEventListener('focus', () => {
                if (creditCard) creditCard.classList.add('flipped');
            });
            
            cardCVVInput.addEventListener('blur', () => {
                if (creditCard) creditCard.classList.remove('flipped');
            });
        }
        
        if (creditCard) creditCard.addEventListener('click', toggleCardFlip);
        
        // Card input formatting
        if (cardNumberInput) cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
        if (cardExpiryInput) cardExpiryInput.addEventListener('input', () => formatCardExpiry(cardExpiryInput));
        if (cardNameInput) cardNameInput.addEventListener('input', updateCardDisplay);
        if (cardCVVInput) cardCVVInput.addEventListener('input', updateCardDisplay);
        
        // OTP inputs
        if (otpInputs) {
            otpInputs.forEach((input, index) => {
                if (!input) return;
                
                input.addEventListener('input', () => {
                    if (input.value.length >= 1) {
                        if (index < otpInputs.length - 1 && otpInputs[index + 1]) {
                            otpInputs[index + 1].focus();
                        } else {
                            handleOTPInput();
                        }
                    }
                });
                
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && input.value === '' && index > 0 && otpInputs[index - 1]) {
                        otpInputs[index - 1].focus();
                    }
                });
            });
        }
        
        // OTP modal
        const verifyOtpBtn = document.getElementById('verify-otp');
        const closeOtpBtn = document.getElementById('close-otp');
        const resendOtpBtn = document.getElementById('resend-otp');
        
        if (verifyOtpBtn) verifyOtpBtn.addEventListener('click', handleOTPInput);
        if (closeOtpBtn) closeOtpBtn.addEventListener('click', hideOTPModal);
        if (resendOtpBtn) {
            resendOtpBtn.addEventListener('click', () => {
                hideOTPModal();
                setTimeout(showOTPModal, 500);
                showNotification('Se ha enviado un nuevo código de verificación.');
            });
        }
        
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-methods .payment-method');
        if (paymentMethods) {
            paymentMethods.forEach(method => {
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
                        const paymentForm = document.getElementById(`${paymentType}-payment-form`);
                        if (paymentForm) paymentForm.classList.add('active');
                    } else {
                        // Handle shipping method selection
                        const shippingCost = parseFloat(method.getAttribute('data-cost'));
                        if (!isNaN(shippingCost)) {
                            shipping = shippingCost;
                            updateCartSummary();
                            updateDeliveryDates();
                        }
                    }
                });
            });
        }
        
        // Apply coupon button
        const applyCouponBtn = document.getElementById('apply-coupon');
        if (applyCouponBtn) applyCouponBtn.addEventListener('click', applyCoupon);
        
        // WhatsApp contact
        const contactWhatsApp = document.getElementById('contact-whatsapp');
        if (contactWhatsApp) {
            contactWhatsApp.addEventListener('click', (e) => {
                e.preventDefault();
                const orderNumber = document.getElementById('order-number');
                const orderNumberText = orderNumber ? orderNumber.textContent : 'nuevo pedido';
                const message = `Hola LatinPhone, acabo de realizar el pedido ${orderNumberText}. Quiero confirmar mi compra.`;
                window.open(`https://wa.me/18133584564?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
        
        // Support link
        const supportLink = document.getElementById('support-link');
        if (supportLink) {
            supportLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://wa.me/18133584564?text=${encodeURIComponent('Hola LatinPhone, necesito ayuda con mi compra.')}`, '_blank');
            });
        }
        
        // Complete order button (in confirmation step)
        const completeOrderBtn = document.getElementById('complete-order');
        if (completeOrderBtn) {
            completeOrderBtn.addEventListener('click', (e) => {
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
    }
});
