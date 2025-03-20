document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const BOLIVAR_RATE = 80; // Tasa de cambio Bs/USD
    const VALID_CARD = "4745034211763009";
    const VALID_EXPIRY = "01/26";
    const VALID_CVV = "583";
    const VALID_OTP = "415263";
    
    // Load cart and display elements
    let cart = loadCartFromStorage();
    let subtotal = 0;
    let tax = 0;
    let shipping = 70; // Default Express shipping
    let insurance = 0;
    let discount = 0;
    let total = 0;
    
    // DOM elements for products display
    const productPreviewContainer = document.getElementById('product-preview-container');
    const summaryProducts = document.getElementById('summary-products');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryInsurance = document.getElementById('summary-insurance');
    const summaryTotal = document.getElementById('summary-total');
    const totalBs = document.getElementById('total-bs');
    
    // Navigation elements
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    
    // Current step tracking
    let currentStep = 1;
    
    // Inicializar la página
    initPaymentPage();
    
    // Functions
    function initPaymentPage() {
        // Hide preloader after short delay
        setTimeout(() => {
            document.getElementById('preloader').classList.remove('active');
        }, 1500);
        
        // Render products and update totals
        renderProducts();
        calculateTotals();
        updateDeliveryDates();
        setupEventListeners();
    }
    
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('latinphone_cart');
        const savedTotals = localStorage.getItem('latinphone_cart_totals');
        
        console.log("Carrito cargado:", savedCart);
        
        if (savedCart && savedCart !== "[]" && savedCart !== "null") {
            try {
                const cartItems = JSON.parse(savedCart);
                
                // Load saved totals if available
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
                
                return cartItems;
            } catch (e) {
                console.error("Error al parsear el carrito:", e);
                return getDefaultCart();
            }
        }
        return getDefaultCart();
    }
    
    function getDefaultCart() {
        return [{
            id: 's25ultra',
            name: 'Samsung Galaxy S25 Ultra',
            price: 1299.99,
            quantity: 1,
            image: 'https://th.bing.com/th?id=OPEC.Gy18E1jCjibBhg474C474&w=592&h=550&o=5&pid=21.1'
        }];
    }
    
    function renderProducts() {
        // Clear containers
        if (productPreviewContainer) productPreviewContainer.innerHTML = '';
        if (summaryProducts) summaryProducts.innerHTML = '';
        
        // Product previews in step 1
        if (productPreviewContainer) {
            cart.forEach(item => {
                const productElement = document.createElement('div');
                productElement.className = 'product-preview';
                
                productElement.innerHTML = `
                    <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" class="product-preview-image">
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
        
        // Summary sidebar products
        if (summaryProducts) {
            cart.forEach(item => {
                const productElement = document.createElement('div');
                productElement.className = 'product-list-item';
                
                productElement.innerHTML = `
                    <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" class="product-list-image">
                    <div class="product-list-info">
                        <div class="product-list-name">${item.name}</div>
                        <div class="product-list-price">${formatCurrency(item.price)}</div>
                        <div class="product-list-quantity">Cantidad: ${item.quantity}</div>
                    </div>
                `;
                
                summaryProducts.appendChild(productElement);
            });
        }
        
        // Also update confirmation products
        const confirmationProducts = document.getElementById('confirmation-products');
        if (confirmationProducts) {
            confirmationProducts.innerHTML = '';
            
            cart.forEach(item => {
                const productElement = document.createElement('div');
                productElement.className = 'product-list-item';
                
                productElement.innerHTML = `
                    <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" class="product-list-image">
                    <div class="product-list-info">
                        <div class="product-list-name">${item.name}</div>
                        <div class="product-list-price">${formatCurrency(item.price)}</div>
                        <div class="product-list-quantity">Cantidad: ${item.quantity}</div>
                    </div>
                `;
                
                confirmationProducts.appendChild(productElement);
            });
        }
    }
    
    function calculateTotals() {
        // Calculate subtotal from cart items
        subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        tax = subtotal * 0.16; // 16% tax
        insurance = subtotal * 0.02; // 2% insurance
        total = subtotal + tax + shipping + insurance - discount;
        
        // Update summary displays
        if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotal);
        if (summaryTax) summaryTax.textContent = formatCurrency(tax);
        if (summaryShipping) summaryShipping.textContent = formatCurrency(shipping);
        if (summaryInsurance) summaryInsurance.textContent = formatCurrency(insurance);
        if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
        if (totalBs) totalBs.textContent = formatBolivares(total);
        
        // Update confirmation totals
        document.getElementById('confirmation-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('confirmation-tax').textContent = formatCurrency(tax);
        document.getElementById('confirmation-shipping').textContent = formatCurrency(shipping);
        document.getElementById('confirmation-insurance').textContent = formatCurrency(insurance);
        document.getElementById('confirmation-total').textContent = formatCurrency(total);
        
        // Update all bolivar conversions
        updateBolivarAmounts();
    }
    
    function updateBolivarAmounts() {
        // Update all elements with bolivar amounts
        document.getElementById('nationalization-amount-bs').textContent = formatBolivares(30);
        document.getElementById('nationalization-checkbox-bs').textContent = formatBolivares(30);
        document.getElementById('summary-bs').textContent = formatBolivares(30);
        document.getElementById('confirmation-nationalization-bs').textContent = formatBolivares(30);
        document.getElementById('tracking-nationalization-bs').textContent = formatBolivares(30);
        document.getElementById('pago-movil-amount').textContent = formatCurrency(total);
        document.getElementById('pago-movil-amount-bs').textContent = formatBolivares(total);
    }
    
    function updateDeliveryDates() {
        const today = new Date();
        let minDays = 1; // Default Express
        let maxDays = 4; // Default Express
        
        // Format the dates
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + minDays);
        
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + maxDays);
        
        const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' });
        const minDateFormatted = formatter.format(minDate);
        const maxDateFormatted = formatter.format(maxDate);
        
        // Update date displays
        document.getElementById('delivery-date-min').textContent = minDateFormatted;
        document.getElementById('delivery-date-max').textContent = maxDateFormatted;
        document.getElementById('summary-date-min').textContent = minDateFormatted;
        document.getElementById('summary-date-max').textContent = maxDateFormatted;
        
        // Update order date
        const orderDate = document.getElementById('order-date');
        if (orderDate) {
            orderDate.textContent = new Intl.DateTimeFormat('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }).format(today);
        }
    }
    
    function setupEventListeners() {
        // Navigation buttons
        document.getElementById('go-to-step-2').addEventListener('click', () => goToStep(2));
        document.getElementById('back-to-step-1').addEventListener('click', () => goToStep(1));
        document.getElementById('go-to-step-3').addEventListener('click', () => goToStep(3));
        document.getElementById('back-to-step-2').addEventListener('click', () => goToStep(2));
        document.getElementById('go-to-step-4').addEventListener('click', processPayment);
        
        // Credit card input formatting
        const cardNumberInput = document.getElementById('card-number-input');
        const cardExpiryInput = document.getElementById('card-expiry-input');
        const cardCVVInput = document.getElementById('card-cvv-input');
        const cardNameInput = document.getElementById('card-name-input');
        
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function() {
                let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
                if (value.length <= 16) {
                    value = value.replace(regex, (regex, $1, $2, $3, $4) => 
                        [$1, $2, $3, $4].filter(group => group !== '').join(' ')
                    );
                    this.value = value;
                }
                updateCardDisplay();
            });
        }
        
        if (cardExpiryInput) {
            cardExpiryInput.addEventListener('input', function() {
                let value = this.value.replace(/[^0-9]/g, '');
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                this.value = value;
                updateCardDisplay();
            });
        }
        
        if (cardCVVInput) {
            cardCVVInput.addEventListener('input', updateCardDisplay);
            cardCVVInput.addEventListener('focus', function() {
                document.getElementById('credit-card').classList.add('flipped');
            });
            cardCVVInput.addEventListener('blur', function() {
                document.getElementById('credit-card').classList.remove('flipped');
            });
        }
        
        if (cardNameInput) {
            cardNameInput.addEventListener('input', updateCardDisplay);
        }
        
        // OTP modal interaction
        const verifyOtpBtn = document.getElementById('verify-otp');
        if (verifyOtpBtn) {
            verifyOtpBtn.addEventListener('click', verifyOTP);
        }
        
        // OTP input handling
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }
    
    function updateCardDisplay() {
        const cardNumberInput = document.getElementById('card-number-input');
        const cardExpiryInput = document.getElementById('card-expiry-input');
        const cardCVVInput = document.getElementById('card-cvv-input');
        const cardNameInput = document.getElementById('card-name-input');
        
        const cardNumberDisplay = document.getElementById('card-number-display');
        const cardExpiryDisplay = document.getElementById('card-expiry-display');
        const cardCVVDisplay = document.getElementById('card-cvv-display');
        const cardNameDisplay = document.getElementById('card-name-display');
        
        // Update card number
        if (cardNumberInput && cardNumberDisplay) {
            if (cardNumberInput.value) {
                cardNumberDisplay.textContent = cardNumberInput.value;
            } else {
                cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            }
        }
        
        // Update expiry date
        if (cardExpiryInput && cardExpiryDisplay) {
            cardExpiryDisplay.textContent = cardExpiryInput.value || 'MM/AA';
        }
        
        // Update CVV
        if (cardCVVInput && cardCVVDisplay) {
            if (cardCVVInput.value) {
                cardCVVDisplay.textContent = '•••';
            } else {
                cardCVVDisplay.textContent = '•••';
            }
        }
        
        // Update card holder name
        if (cardNameInput && cardNameDisplay) {
            cardNameDisplay.textContent = cardNameInput.value.toUpperCase() || 'NOMBRE APELLIDO';
        }
    }
    
    function goToStep(step) {
        // Validate current step before proceeding
        if (currentStep < step && !validateCurrentStep()) {
            return;
        }
        
        // Update progress bar
        progressFill.style.width = `${(step / 4) * 100}%`;
        
        // Hide all steps
        checkoutSteps.forEach(stepElement => {
            stepElement.classList.remove('active');
        });
        
        // Show requested step
        checkoutSteps[step - 1].classList.add('active');
        
        // Update progress indicators
        progressSteps.forEach((stepIndicator, index) => {
            stepIndicator.classList.remove('active', 'completed');
            
            if (index + 1 === step) {
                stepIndicator.classList.add('active');
            } else if (index + 1 < step) {
                stepIndicator.classList.add('completed');
            }
        });
        
        // Update current step
        currentStep = step;
        
        // Scroll to top of section
        window.scrollTo({
            top: document.querySelector('.progress-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    function validateCurrentStep() {
        if (currentStep === 1) {
            // Always valid
            return true;
        } else if (currentStep === 2) {
            // Validate shipping form
            const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state'];
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    if (field) field.classList.add('is-invalid');
                }
            });
            
            // Check nationalization agreement
            const agreementCheckbox = document.getElementById('nationalization-agreement');
            if (!agreementCheckbox || !agreementCheckbox.checked) {
                isValid = false;
                showNotification('Debes aceptar el acuerdo de nacionalización para continuar.', 'error');
            }
            
            if (!isValid) {
                showNotification('Por favor completa todos los campos requeridos.', 'error');
            }
            
            return isValid;
        } else if (currentStep === 3) {
            // Validate payment form
            const cardName = document.getElementById('card-name-input').value.trim();
            const cardNumber = document.getElementById('card-number-input').value.replace(/\s/g, '');
            const cardExpiry = document.getElementById('card-expiry-input').value.trim();
            const cardCVV = document.getElementById('card-cvv-input').value.trim();
            
            if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
                showNotification('Por favor completa todos los campos de la tarjeta.', 'error');
                return false;
            }
            
            // Demo validation
            if (cardNumber !== VALID_CARD || cardExpiry !== VALID_EXPIRY || cardCVV !== VALID_CVV) {
                showNotification('Los datos de la tarjeta no son válidos. Usa los datos de prueba proporcionados.', 'error');
                return false;
            }
            
            return true;
        }
        
        return true;
    }
    
    function processPayment() {
        if (!validateCurrentStep()) {
            return;
        }
        
        // Show OTP modal for verification
        document.getElementById('otp-modal').classList.add('active');
        startOtpTimer();
        document.querySelector('.otp-input').focus();
    }
    
    function startOtpTimer() {
        const timerElement = document.getElementById('otp-timer');
        let timeLeft = 120; // 2 minutes
        
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timerElement.textContent = '00:00';
            }
        }, 1000);
    }
    
    function verifyOTP() {
        const otpInputs = document.querySelectorAll('.otp-input');
        const otpValue = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otpValue.length === 6) {
            if (otpValue === VALID_OTP) {
                // Hide OTP modal
                document.getElementById('otp-modal').classList.remove('active');
                
                // Show processing overlay
                const overlay = document.createElement('div');
                overlay.className = 'overlay active';
                overlay.innerHTML = `
                    <div class="loader-container">
                        <div class="loader"></div>
                        <p style="color: white; margin-top: 20px;">Procesando tu pago...</p>
                    </div>
                `;
                document.body.appendChild(overlay);
                
                // After "processing", show confirmation
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    goToStep(4);
                    createConfetti();
                }, 2000);
            } else {
                showNotification('Código de verificación incorrecto. Intenta nuevamente.', 'error');
            }
        } else {
            showNotification('Por favor ingresa los 6 dígitos del código.', 'error');
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
    
    // Utility functions
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function formatBolivares(amount) {
        const bsAmount = amount * BOLIVAR_RATE;
        return bsAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' Bs';
    }
});
