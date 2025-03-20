document.addEventListener('DOMContentLoaded', function() {
    // Constantes globales
    const EXCHANGE_RATE = 88; // Tasa de cambio (Bs por USD)
    const TAX_RATE = 0.16; // IVA 16%
    const VALID_CARD = "4745034211763009"; // Tarjeta válida para pruebas
    const VALID_EXPIRY = "01/26"; // Fecha de vencimiento válida
    const VALID_CVV = "583"; // CVV válido
    
    // Elementos DOM
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const sections = document.querySelectorAll('.checkout-section');
    const continueBtns = document.querySelectorAll('.continue-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const loaderOverlay = document.querySelector('.loader-overlay');
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const deliveryOptions = document.querySelectorAll('.delivery-option input');
    const insuranceCheckbox = document.getElementById('insurance');
    const countrySelect = document.getElementById('country');
    const cardNumber = document.getElementById('card_number');
    const cardHolder = document.getElementById('card_holder');
    const cardExpiry = document.getElementById('card_expiry');
    const cardCvv = document.getElementById('card_cvv');
    const cardPreview = document.querySelector('.card-preview');
    const cardDigits = document.getElementById('card-digits');
    const cardHolderName = document.getElementById('card-holder-name');
    const cardExpiryDisplay = document.getElementById('card-expiry');
    const cardCvvDisplay = document.getElementById('card-cvv');
    const verifyCodeBtn = document.getElementById('verify-code');
    const resendCodeBtn = document.getElementById('resend-code');
    const otpInputs = document.querySelectorAll('.otp-input');
    const countdownEl = document.getElementById('countdown');
    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    
    // Variables de estado
    let currentStep = 0;
    let cart = [];
    let deliveryMethod = 'premium';
    let deliveryCompany = 'MRW';
    let shippingData = {};
    let orderTotal = 0;
    let hasInsurance = true;
    let taxAmount = 0;
    let deliveryCost = 70; // Default to premium express
    let countdownInterval;
    let verificationEmail = '';
    
    // Cargar carrito desde localStorage o crear uno de ejemplo
    function loadCart() {
        const savedCart = localStorage.getItem('latinphone_cart');
        
        if (savedCart && JSON.parse(savedCart).length > 0) {
            cart = JSON.parse(savedCart);
        } else {
            // Carrito de ejemplo
            cart = [
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
            localStorage.setItem('latinphone_cart', JSON.stringify(cart));
        }
        
        updateCartDisplay();
    }
    
    // Actualizar visualización del carrito
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const subtotalEl = document.querySelector('.subtotal span:last-child');
        const cartEmptyEl = document.querySelector('.cart-empty');
        const cartSummaryEl = document.querySelector('.cart-summary');
        const cartCount = document.querySelector('.cart-count');
        
        // Limpiar contenedor de items
        cartItemsContainer.innerHTML = '';
        
        // Verificar si el carrito está vacío
        if (cart.length === 0) {
            cartEmptyEl.style.display = 'block';
            cartSummaryEl.style.display = 'none';
            cartCount.textContent = '0';
            return;
        }
        
        // Ocultar mensaje de carrito vacío
        cartEmptyEl.style.display = 'none';
        cartSummaryEl.style.display = 'block';
        
        // Calcular subtotal
        let subtotal = 0;
        let totalItems = 0;
        
        // Generar HTML para cada producto
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            totalItems += item.quantity;
            
            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-variant">Color: ${item.color || 'Negro'}</p>
                        <span class="cart-item-price">$${item.price.toFixed(2)} USD</span>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <i class="fas fa-trash cart-item-remove" data-id="${item.id}"></i>
                </div>
            `;
            
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        
        // Actualizar subtotal y contador
        subtotalEl.textContent = `$${subtotal.toFixed(2)} USD`;
        cartCount.textContent = totalItems.toString();
        
        // Actualizar total global
        orderTotal = subtotal;
        
        // Actualizar todos los elementos del resumen
        updateAllSummaries();
        
        // Agregar event listeners a los botones de cantidad y eliminar
        addCartItemsListeners();
    }
    
    // Agregar listeners a botones del carrito
    function addCartItemsListeners() {
        // Botones de incremento
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                updateQuantity(itemId, 1);
            });
        });
        
        // Botones de decremento
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                updateQuantity(itemId, -1);
            });
        });
        
        // Botones de eliminar
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeItem(itemId);
            });
        });
    }
    
    // Actualizar cantidad de un producto
    function updateQuantity(itemId, change) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            const newQuantity = cart[itemIndex].quantity + change;
            
            if (newQuantity <= 0) {
                // Si la cantidad llega a 0, eliminar el producto
                removeItem(itemId);
            } else {
                // Actualizar cantidad
                cart[itemIndex].quantity = newQuantity;
                localStorage.setItem('latinphone_cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    }
    
    // Eliminar un producto
    function removeItem(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('latinphone_cart', JSON.stringify(cart));
        updateCartDisplay();
    }
    
    // Actualizar todos los resúmenes de precio
    function updateAllSummaries() {
        // Actualizar resumen de envío
        updateDeliverySummary();
        
        // Actualizar resumen de pago
        const paymentTotalUsd = document.querySelector('.payment-summary .total-usd');
        const paymentTotalBs = document.querySelector('.payment-summary .total-local');
        const paymentWarningTotal = document.querySelector('.payment-total');
        const paymentWarningTotalBs = document.querySelector('.payment-total-bs');
        
        if (paymentTotalUsd) {
            const total = calculateTotal();
            paymentTotalUsd.textContent = `$${total.toFixed(2)} USD`;
            paymentTotalBs.textContent = `Bs. ${formatBsAmount(total * EXCHANGE_RATE)}`;
            paymentWarningTotal.textContent = `$${total.toFixed(2)} USD`;
            paymentWarningTotalBs.textContent = `Bs. ${formatBsAmount(total * EXCHANGE_RATE)}`;
        }
        
        // Actualizar resumen de confirmación
        const confirmationSubtotal = document.querySelector('.confirmation-subtotal');
        const confirmationShipping = document.querySelector('.confirmation-shipping');
        const confirmationInsurance = document.querySelector('.confirmation-insurance-cost');
        const confirmationTax = document.querySelector('.confirmation-tax-amount');
        const confirmationTotalUsd = document.querySelector('.confirmation-total-usd');
        const confirmationTotalLocal = document.querySelector('.confirmation-total-local');
        
        if (confirmationSubtotal) {
            confirmationSubtotal.textContent = `$${orderTotal.toFixed(2)} USD`;
            confirmationShipping.textContent = `$${deliveryCost.toFixed(2)} USD`;
            
            if (hasInsurance) {
                document.getElementById('confirmation-insurance').style.display = 'flex';
                confirmationInsurance.textContent = `$20.00 USD`;
            } else {
                document.getElementById('confirmation-insurance').style.display = 'none';
            }
            
            if (countrySelect.value === 'VE') {
                document.getElementById('confirmation-tax').style.display = 'flex';
                confirmationTax.textContent = `$${taxAmount.toFixed(2)} USD`;
            } else {
                document.getElementById('confirmation-tax').style.display = 'none';
            }
            
            const total = calculateTotal();
            confirmationTotalUsd.textContent = `$${total.toFixed(2)} USD`;
            confirmationTotalLocal.textContent = `Bs. ${formatBsAmount(total * EXCHANGE_RATE)}`;
        }
    }
    
    // Actualizar resumen de envío
    function updateDeliverySummary() {
        const deliverySubtotal = document.querySelector('.delivery-subtotal');
        const deliveryCostEl = document.querySelector('.delivery-cost');
        const insuranceCostEl = document.querySelector('.insurance-cost');
        const taxAmountEl = document.querySelector('.tax-amount');
        const totalUsd = document.querySelector('.delivery-summary .total-usd');
        const totalLocal = document.querySelector('.delivery-summary .total-local');
        const taxRow = document.getElementById('tax-row');
        
        if (deliverySubtotal) {
            deliverySubtotal.textContent = `$${orderTotal.toFixed(2)} USD`;
            deliveryCostEl.textContent = `$${deliveryCost.toFixed(2)} USD`;
            
            if (hasInsurance) {
                insuranceCostEl.textContent = `$20.00 USD`;
            } else {
                insuranceCostEl.textContent = `$0.00 USD`;
            }
            
            // Mostrar fila de impuestos solo para Venezuela
            if (countrySelect.value === 'VE') {
                taxRow.style.display = 'flex';
                taxAmount = calculateTaxAmount();
                taxAmountEl.textContent = `$${taxAmount.toFixed(2)} USD`;
            } else {
                taxRow.style.display = 'none';
                taxAmount = 0;
            }
            
            const total = calculateTotal();
            totalUsd.textContent = `$${total.toFixed(2)} USD`;
            totalLocal.textContent = `Bs. ${formatBsAmount(total * EXCHANGE_RATE)}`;
        }
    }
    
    // Calcular monto de impuestos
    function calculateTaxAmount() {
        return (orderTotal + (hasInsurance ? 20 : 0) + deliveryCost) * TAX_RATE;
    }
    
    // Calcular total general
    function calculateTotal() {
        let total = orderTotal + deliveryCost;
        
        if (hasInsurance) {
            total += 20;
        }
        
        if (countrySelect.value === 'VE') {
            total += calculateTaxAmount();
        }
        
        return total;
    }
    
    // Formatear montos en bolivares
    function formatBsAmount(amount) {
        return new Intl.NumberFormat('es-VE').format(amount.toFixed(2));
    }
    
    // Navegar a un paso específico
    function goToStep(step) {
        // Mostrar loader
        showLoader();
        
        // Esperar un poco para simular carga
        setTimeout(() => {
            // Actualizar pasos de progreso
            progressSteps.forEach((progressStep, idx) => {
                if (idx < step) {
                    progressStep.classList.add('completed');
                    progressStep.classList.remove('active');
                } else if (idx === step) {
                    progressStep.classList.add('active');
                    progressStep.classList.remove('completed');
                } else {
                    progressStep.classList.remove('active', 'completed');
                }
            });
            
            // Actualizar líneas de progreso
            progressLines.forEach((line, idx) => {
                if (idx < step) {
                    line.classList.add('completed');
                } else {
                    line.classList.remove('completed');
                }
            });
            
            // Mostrar sección correspondiente
            sections.forEach((section, idx) => {
                if (idx === step) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Actualizar paso actual
            currentStep = step;
            
            // Scroll al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Ocultar loader
            hideLoader();
        }, 500);
    }
    
    // Mostrar loader
    function showLoader() {
        loaderOverlay.classList.add('active');
    }
    
    // Ocultar loader
    function hideLoader() {
        loaderOverlay.classList.remove('active');
    }
    
    // Validar formulario de envío
    function validateShippingForm() {
        const form = document.getElementById('shipping-form');
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Guardar datos de envío
    function saveShippingData() {
        const form = document.getElementById('shipping-form');
        const formData = new FormData(form);
        
        shippingData = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            whatsapp: formData.get('whatsapp') || formData.get('phone'),
            country: formData.get('country'),
            state: formData.get('state'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            address1: formData.get('address1'),
            address2: formData.get('address2') || '',
            delivery_notes: formData.get('delivery_notes') || '',
            id_document: formData.get('id_document')
        };
        
        // Guardar email para la verificación
        verificationEmail = shippingData.email;
        document.getElementById('verification-email').textContent = verificationEmail;
        
        // Actualizar información de confirmación
        document.getElementById('confirmation-name').textContent = shippingData.fullname;
        document.getElementById('confirmation-address').textContent = `${shippingData.address1} ${shippingData.address2}`.trim();
        document.getElementById('confirmation-city').textContent = shippingData.city;
        document.getElementById('confirmation-state').textContent = shippingData.state;
        document.getElementById('confirmation-zip').textContent = shippingData.zip;
        document.getElementById('confirmation-country').textContent = getCountryName(shippingData.country);
        document.getElementById('confirmation-email').textContent = shippingData.email;
        document.getElementById('confirmation-phone').textContent = shippingData.phone;
    }
    
    // Obtener nombre de país a partir del código
    function getCountryName(countryCode) {
        const countries = {
            'AR': 'Argentina',
            'BO': 'Bolivia',
            'BR': 'Brasil',
            'CL': 'Chile',
            'CO': 'Colombia',
            'CR': 'Costa Rica',
            'CU': 'Cuba',
            'DO': 'República Dominicana',
            'EC': 'Ecuador',
            'SV': 'El Salvador',
            'GT': 'Guatemala',
            'HN': 'Honduras',
            'MX': 'México',
            'NI': 'Nicaragua',
            'PA': 'Panamá',
            'PY': 'Paraguay',
            'PE': 'Perú',
            'PR': 'Puerto Rico',
            'UY': 'Uruguay',
            'VE': 'Venezuela'
        };
        
        return countries[countryCode] || countryCode;
    }
    
    // Cambio de método de envío
    function handleDeliveryMethodChange() {
        deliveryMethod = this.value;
        deliveryCost = parseFloat(this.closest('.delivery-option').dataset.price);
        
        // Actualizar texto del método de envío en confirmación
        const methodText = this.closest('.delivery-option').querySelector('.option-name').textContent;
        document.querySelector('.delivery-method-text').textContent = methodText;
        
        // Actualizar fecha estimada de entrega
        const deliveryDays = parseInt(this.closest('.delivery-option').dataset.days);
        updateEstimatedDeliveryDate(deliveryDays);
        
        updateDeliverySummary();
    }
    
    // Cambio de empresa de transporte
    function handleDeliveryCompanyChange() {
        deliveryCompany = this.value;
    }
    
    // Cambio de seguro
    function handleInsuranceChange() {
        hasInsurance = this.checked;
        updateDeliverySummary();
    }
    
    // Validar formulario de pago
    function validatePaymentForm() {
        const form = document.getElementById('payment-form');
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // Validaciones específicas
        if (cardNumber.value.replace(/\s/g, '') !== VALID_CARD) {
            isValid = false;
            cardNumber.classList.add('error');
            console.log("Tarjeta válida para pruebas: " + VALID_CARD);
        }
        
        if (cardExpiry.value !== VALID_EXPIRY) {
            isValid = false;
            cardExpiry.classList.add('error');
            console.log("Fecha válida para pruebas: " + VALID_EXPIRY);
        }
        
        if (cardCvv.value !== VALID_CVV) {
            isValid = false;
            cardCvv.classList.add('error');
            console.log("CVV válido para pruebas: " + VALID_CVV);
        }
        
        return isValid;
    }
    
    // Actualizar visualización de tarjeta
    function updateCardDisplay() {
        // Número de tarjeta
        let formattedNumber = cardNumber.value;
        
        if (formattedNumber) {
            cardDigits.textContent = formattedNumber;
        } else {
            cardDigits.textContent = "•••• •••• •••• ••••";
        }
        
        // Nombre del titular
        if (cardHolder.value) {
            cardHolderName.textContent = cardHolder.value.toUpperCase();
        } else {
            cardHolderName.textContent = "NOMBRE DEL TITULAR";
        }
        
        // Fecha de vencimiento
        if (cardExpiry.value) {
            cardExpiryDisplay.textContent = cardExpiry.value;
        } else {
            cardExpiryDisplay.textContent = "MM/AA";
        }
        
        // CVV
        if (cardCvv.value) {
            cardCvvDisplay.textContent = cardCvv.value;
        } else {
            cardCvvDisplay.textContent = "***";
        }
    }
    
    // Formatter para fecha de vencimiento
    function formatCardExpiry(e) {
        let input = e.target;
        let inputValue = input.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (inputValue.length > 0) {
            formattedValue = inputValue.substring(0, 2);
            
            if (inputValue.length > 2) {
                formattedValue += '/' + inputValue.substring(2, 4);
            }
        }
        
        input.value = formattedValue;
        updateCardDisplay();
    }
    
    // Voltear tarjeta para mostrar CVV
    function toggleCardFlip() {
        if (document.activeElement === cardCvv) {
            cardPreview.classList.add('flipped');
        } else {
            cardPreview.classList.remove('flipped');
        }
    }
    
    // Manejar inputs de OTP
    function handleOtpInput(e) {
        const input = e.target;
        const value = input.value;
        const index = parseInt(input.dataset.index);
        
        // Solo permitir números
        if (!/^\d*$/.test(value)) {
            input.value = '';
            return;
        }
        
        // Si hay un valor y no es el último input, mover al siguiente
        if (value && index < otpInputs.length) {
            otpInputs[index].focus();
        }
        
        // Verificar si todos los campos están completos
        checkOtpComplete();
    }
    
    // Manejar retroceso en OTP
    function handleOtpKeydown(e) {
        const input = e.target;
        const index = parseInt(input.dataset.index) - 1;
        
        // Si se presiona retroceso y el campo está vacío, ir al anterior
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    }
    
    // Comprobar si el OTP está completo
    function checkOtpComplete() {
        const isComplete = Array.from(otpInputs).every(input => input.value.length === 1);
        verifyCodeBtn.disabled = !isComplete;
        
        if (isComplete) {
            verifyCodeBtn.classList.add('active');
        } else {
            verifyCodeBtn.classList.remove('active');
        }
    }
    
    // Iniciar cuenta regresiva para OTP
    function startOtpCountdown() {
        let totalSeconds = 5 * 60; // 5 minutos
        
        countdownInterval = setInterval(() => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            countdownEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                countdownEl.textContent = '00:00';
                resendCodeBtn.disabled = false;
            } else {
                totalSeconds--;
            }
        }, 1000);
    }
    
    // Reiniciar OTP
    function resetOtp() {
        // Limpiar campos
        otpInputs.forEach(input => {
            input.value = '';
        });
        
        // Enfocar primer campo
        otpInputs[0].focus();
        
        // Reiniciar cuenta regresiva
        clearInterval(countdownInterval);
        startOtpCountdown();
        
        // Deshabilitar botón de reenvío
        resendCodeBtn.disabled = true;
        setTimeout(() => {
            resendCodeBtn.disabled = false;
        }, 30000); // Habilitar después de 30 segundos
    }
    
    // Verificar OTP
    function verifyOtp() {
        showLoader();
        
        // Simular verificación
        setTimeout(() => {
            hideLoader();
            goToStep(4); // Ir a paso de confirmación
            populateConfirmationItems();
            generateOrderNumber();
        }, 1500);
    }
    
    // Actualizar fecha estimada de entrega
    function updateEstimatedDeliveryDate(days) {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + days);
        
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString('es-ES', options);
        
        document.getElementById('delivery-date').textContent = formattedDate;
    }
    
    // Generar número de orden
    function generateOrderNumber() {
        const randomPart = Math.floor(1000000 + Math.random() * 9000000);
        const orderNumber = `LP-2025-${randomPart}`;
        document.getElementById('order-number').textContent = orderNumber;
        
        // Establecer fecha de orden
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('es-ES', options);
        document.getElementById('order-date').textContent = formattedDate;
    }
    
    // Poblar items en confirmación
    function populateConfirmationItems() {
        const orderItemsContainer = document.querySelector('.order-items');
        orderItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            
            const itemHTML = `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="order-item-details">
                        <h4 class="order-item-name">${item.name}</h4>
                        <p class="order-item-variant">Color: ${item.color || 'Negro'}</p>
                    </div>
                    <span class="order-item-quantity">x${item.quantity}</span>
                    <span class="order-item-price">$${itemTotal.toFixed(2)} USD</span>
                </div>
            `;
            
            orderItemsContainer.innerHTML += itemHTML;
        });
    }
    
    // Compartir por WhatsApp
    function shareOnWhatsapp() {
        const orderNumber = document.getElementById('order-number').textContent;
        const total = calculateTotal();
        const formattedTotalUsd = `$${total.toFixed(2)} USD`;
        const formattedTotalBs = `Bs. ${formatBsAmount(total * EXCHANGE_RATE)}`;
        
        const message = encodeURIComponent(
            `¡Hola LatinPhone! He realizado un pedido con el número ${orderNumber}. ` +
            `Mi nombre es ${shippingData.fullname} y quisiera información sobre la tasa de nacionalización ` +
            `para mi compra por un total de ${formattedTotalUsd} (${formattedTotalBs}).`
        );
        
        window.open(`https://wa.me/13183584564?text=${message}`, '_blank');
    }
    
    // Event Listeners
    
    // Botones de navegación
    continueBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            let stepIndex;
            
            switch (nextStep) {
                case 'shipping':
                    if (cart.length === 0) {
                        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
                        return;
                    }
                    stepIndex = 1;
                    break;
                case 'delivery':
                    if (!validateShippingForm()) {
                        alert('Por favor completa todos los campos requeridos.');
                        return;
                    }
                    saveShippingData();
                    stepIndex = 2;
                    break;
                case 'payment':
                    stepIndex = 3;
                    break;
                default:
                    stepIndex = parseInt(nextStep);
            }
            
            goToStep(stepIndex);
        });
    });
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });
    
    // Formulario de envío
    shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateShippingForm()) {
            saveShippingData();
            goToStep(2); // Ir a paso de métodos de envío
        } else {
            alert('Por favor completa todos los campos requeridos.');
        }
    });
    
    // País seleccionado
    countrySelect.addEventListener('change', function() {
        updateDeliverySummary();
    });
    
    // Métodos de envío
    deliveryOptions.forEach(option => {
        option.addEventListener('change', handleDeliveryMethodChange);
    });
    
    // Empresas de transporte
    document.querySelectorAll('.company-option input').forEach(option => {
        option.addEventListener('change', handleDeliveryCompanyChange);
    });
    
    // Seguro de envío
    insuranceCheckbox.addEventListener('change', handleInsuranceChange);
    
    // Formulario de pago
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validatePaymentForm()) {
            goToStep(3); // Ir a paso de verificación
            resetOtp();
        } else {
            alert('Por favor verifica los datos de tu tarjeta.');
        }
    });
    
    // Inputs de tarjeta
    cardNumber.addEventListener('input', formatCardNumber);
    cardHolder.addEventListener('input', updateCardDisplay);
    cardExpiry.addEventListener('input', formatCardExpiry);
    cardCvv.addEventListener('input', updateCardDisplay);
    
    // Flip de tarjeta
    cardCvv.addEventListener('focus', toggleCardFlip);
    cardCvv.addEventListener('blur', toggleCardFlip);
    cardPreview.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
    
    // Inputs de OTP
    otpInputs.forEach(input => {
        input.addEventListener('input', handleOtpInput);
        input.addEventListener('keydown', handleOtpKeydown);
        input.addEventListener('focus', function() {
            this.select();
        });
    });
    
    // Botones de verificación
    verifyCodeBtn.addEventListener('click', verifyOtp);
    resendCodeBtn.addEventListener('click', resetOtp);
    
    // Compartir por WhatsApp
    shareWhatsappBtn.addEventListener('click', shareOnWhatsapp);
    
    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
        // Cargar carrito
        loadCart();
        
        // Iniciar en el primer paso
        goToStep(0);
        
        // Establecer método de envío por defecto
        updateEstimatedDeliveryDate(2); // Premium por defecto (2 días)
    });
    
    // Inicializar
    loadCart();
});