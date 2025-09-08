        // Inicializar el script cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function() {
            const orderDateEl = document.getElementById('order-date');
            if (orderDateEl) {
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                orderDateEl.textContent = `${day}/${month}/${year}`;
            }

            // Elementos de la interfaz
            const checkoutSteps = document.querySelectorAll('.checkout-step');
            const checkoutSections = document.querySelectorAll('.checkout-section');
            const countryCards = document.querySelectorAll('.country-card');
            const productSelection = document.querySelector('.product-selection');
            const categoryCards = document.querySelectorAll('.category-card');
            const brandSelection = document.querySelector('.brand-selection');
            const brandGrid = document.querySelector('#brand-grid');
            const productGrid = document.querySelector('#product-grid');
            const cartSection = document.querySelector('.cart-section');
            const stepCountry = document.getElementById('step-country');
            const stepCategory = document.getElementById('step-category');
            const stepProduct = document.getElementById('step-product');
            const backToCountryBtn = document.getElementById('back-to-country');
            const backToCategoryBtn = document.getElementById('back-to-category');
            const backToBrandBtn = document.getElementById('back-to-brand');
            const cartItems = document.querySelector('#cart-items');
            const subtotalElement = document.getElementById('subtotal');
            const taxElement = document.getElementById('tax');
            const shippingElement = document.getElementById('shipping');
            const insuranceElement = document.getElementById('insurance');
            const totalElement = document.getElementById('total');
            const totalBsElement = document.getElementById('total-bs');
            const continueToShippingBtn = document.getElementById('continue-to-shipping');
            const backToProductsBtn = document.getElementById('back-to-products');
            const continueToPaymentBtn = document.getElementById('continue-to-payment');
            const backToShippingBtn = document.getElementById('back-to-shipping');
            const processPaymentBtn = document.getElementById('process-payment');
            const shippingOptions = document.querySelectorAll('.shipping-option');
            const shippingDropdownBtn = document.getElementById('shipping-dropdown-btn');
            const shippingDropdownMenu = document.getElementById('shipping-dropdown-menu');
            const shippingCompanyOptions = document.querySelectorAll('.shipping-company-option');
            const insuranceOptions = document.querySelectorAll('.insurance-option');
            const acceptTaxCheckbox = document.getElementById('accept-tax');
            const paymentOptions = document.querySelectorAll('.payment-option');
            const paymentSummaryItems = document.getElementById('payment-summary-items');
            const paymentSubtotal = document.getElementById('payment-subtotal');
            const paymentTax = document.getElementById('payment-tax');
            const paymentShipping = document.getElementById('payment-shipping');
            const paymentInsurance = document.getElementById('payment-insurance');
            const paymentTotal = document.getElementById('payment-total');
            const paymentTotalBs = document.getElementById('payment-total-bs');
            const nationalizationFee = document.getElementById('nationalization-fee');
            const nationalizationModalFee = document.getElementById('nationalization-modal-fee');
            const loadingOverlay = document.getElementById('loading-overlay');
            const nationalizationOverlay = document.getElementById('nationalization-overlay');
            const closeNationalizationBtn = document.getElementById('close-nationalization');
            const orderTotal = document.getElementById('order-total');
            const shippingMethod = document.getElementById('shipping-method');
            const shippingCompanyElement = document.getElementById('shipping-company');
            const giftGrid = document.getElementById('gift-grid');
            const downloadInvoiceBtn = document.getElementById('download-invoice');
            const deliveryDateStart = document.getElementById('delivery-date-start');
            const deliveryDateStart2 = document.getElementById('delivery-date-start-2');
            const deliveryDateEnd = document.getElementById('delivery-date-end');
            const promoCodeElement = document.getElementById('promo-code');
            const toastContainer = document.getElementById('toast-container');
            const videoModal = document.getElementById('video-modal');
            const closeVideoBtn = document.getElementById('close-video');
            const productVideo = document.getElementById('product-video');
            const cardNameInput = document.getElementById('card-name');
            const cardNumberInput = document.getElementById('card-number');
            const cardExpiryInput = document.getElementById('card-expiry');
            const cardCvvInput = document.getElementById('card-cvv');
            const cardPinInput = document.getElementById('card-pin');
            const whatsappBtn = document.getElementById('whatsapp-btn');
            const whatsappSupport = document.getElementById('whatsapp-support');

            // Variables para almacenar el estado del pedido
            const cart = [];
            let selectedCountry = '';
            let selectedCategory = '';
            let selectedBrand = '';
            let selectedShipping = { method: 'standard', price: 35 };
            let selectedShippingCompany = 'dhl';
            let selectedInsurance = { selected: false, price: 0 };
            let selectedGift = null;
            let orderNumber = '';
            let preselectedProductName = localStorage.getItem('selectedProduct');
            const exchangeRate = 225; // 1 USD = 225 Bs
            const taxRate = 0.16; // 16% IVA
            const MIN_NATIONALIZATION_AMOUNT_BS = 1800; // Monto mínimo de tasa de nacionalización en Bs
            const MIN_NATIONALIZATION_THRESHOLD_USD = 1000; // Umbral en USD para aplicar lógica especial

            // Generar número de orden aleatorio
            function generateOrderNumber() {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let result = 'LP-';
                for (let i = 0; i < 8; i++) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
            }

            // Videos de productos por ID 
            const productVideos = {
                'iphone15': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'iphone16': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'samsungs25': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'samsungs25ultra': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'samsungzfold6': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'samsungzflip6': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'xiaomipocof6pro': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4',
                'xiaomi15': 'https://images.samsung.com/is/content/samsung/assets/es/14-03-2025/G90XF_KV_PC_Notext.mp4'
            };

            // Íconos por defecto para productos
            const defaultIcons = {
                'smartphones': 'fas fa-mobile-alt',
                'tablets': 'fas fa-tablet-alt',
                'smartwatches': 'fas fa-stopwatch',
                'accesorios': 'fas fa-headphones',
                'televisores': 'fas fa-tv',
                'videojuegos': 'fas fa-gamepad'
            };

            // Base de datos de productos del inventario proporcionado
            const inventory = {
                smartphones: {
                    apple: [
                        { id: 'iphone11', name: 'iPhone 11 64GB', price: 355, specs: ['64GB', 'Pantalla 6.1"', 'iOS 18'] },
                        { id: 'iphone13', name: 'iPhone 13 128GB', price: 560, specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'] },
                        { id: 'iphone14', name: 'iPhone 14 128GB', price: 650, specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'] },
                        { id: 'iphone15', name: 'iPhone 15 128GB', price: 740, specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'], hasVideo: true },
                        { id: 'iphone15plus', name: 'iPhone 15 Plus 128GB', price: 830, specs: ['128GB', 'Pantalla 6.7"', 'iOS 18'] },
                        { id: 'iphone15promax', name: 'iPhone 15 Pro Max 1TB', price: 1580, specs: ['1TB', 'Pantalla 6.7"', 'iOS 18', 'A17 Pro'] },
                        { id: 'iphone16', name: 'iPhone 16 128GB', price: 870, specs: ['128GB', 'Pantalla 6.1"', 'iOS 18', 'A18'], hasVideo: true },
                        { id: 'iphone16pro', name: 'iPhone 16 Pro 128GB', price: 1170, specs: ['128GB', 'Pantalla 6.1"', 'iOS 18', 'A18 Pro'] },
                        { id: 'iphone16promax', name: 'iPhone 16 Pro Max 256GB', price: 1340, specs: ['256GB', 'Pantalla 6.7"', 'iOS 18', 'A18 Pro'] }
                    ],
                    samsung: [
                        { id: 'samsungs25', name: 'Samsung S25 12GB/256GB', price: 850, specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 3'], hasVideo: true },
                        { id: 'samsungs25ultra', name: 'Samsung S25 Ultra 12GB/512GB', price: 1340, specs: ['12GB RAM', '512GB', 'Snapdragon 8 Gen 3', '200MP Cámara'], hasVideo: true },
                        { id: 'samsungzflip6', name: 'Samsung Z Flip 6 12GB/256GB', price: 965, specs: ['12GB RAM', '256GB', 'Plegable', 'Snapdragon 8 Gen 3'], hasVideo: true },
                        { id: 'samsungzfold6', name: 'Samsung Z Fold 6 12GB/512GB', price: 1490, specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8 Gen 3'], hasVideo: true },
                        { id: 'samsunga55', name: 'Samsung A55 5G 8GB/256GB', price: 365, specs: ['8GB RAM', '256GB', '5G', 'Exynos 1480'] }
                    ],
                    xiaomi: [
                        { id: 'xiaomi13', name: 'Xiaomi Redmi 13 6GB/128GB', price: 125, specs: ['6GB RAM', '128GB', 'MediaTek Helio G99'] },
                        { id: 'xiaominote14pro', name: 'Xiaomi Note 14 Pro 5G 8GB/256GB', price: 285, specs: ['8GB RAM', '256GB', '5G', 'Dimensity 7300'] },
                        { id: 'xiaomipocof6pro', name: 'Xiaomi Poco F6 Pro 5G 12GB/512GB', price: 490, specs: ['12GB RAM', '512GB', '5G', 'Snapdragon 8 Gen 2'], hasVideo: true }
                    ],
                    google: [
                        { id: 'pixel9', name: 'Google Pixel 9 5G 12GB/256GB', price: 819, specs: ['12GB RAM', '256GB', '5G', 'Google Tensor G4'] },
                        { id: 'pixel9profold', name: 'Google Pixel 9 Pro Fold 5G 16GB/512GB', price: 1760, specs: ['16GB RAM', '512GB', 'Plegable', 'Google Tensor G4'] }
                    ],
                    motorola: [
                        { id: 'motorolaedge50', name: 'Motorola EDGE 50 5G 12GB/256GB', price: 350, specs: ['12GB RAM', '256GB', '5G', 'Snapdragon 7 Gen 1'] },
                        { id: 'motorolarazr50', name: 'Motorola RAZR 50 5G 12GB/512GB', price: 695, specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8s Gen 3'] }
                    ]
                },
                tablets: {
                    apple: [
                        { id: 'ipadair', name: 'iPad Air 11" M2 128GB', price: 650, specs: ['Chip M2', '128GB', 'Pantalla 11"'] },
                        { id: 'ipadpro', name: 'iPad Pro 11" M4 256GB', price: 1030, specs: ['Chip M4', '256GB', 'Pantalla 11"'] },
                        { id: 'HP I7 1355U', name: 'HP I7 1355U" 16 1TB', price: 800, specs: ['I7 1355U', '1TB', 'Pantalla 15.6 WIN11+OFFICE"'] }
                    ],
                    samsung: [
                        { id: 'samsungtaba9', name: 'Samsung Tab A9 X110 4/64GB', price: 125, specs: ['4GB RAM', '64GB', 'Pantalla 8.7"'] },
                        { id: 'samsungtabs10', name: 'Samsung Tab S10 Plus X820 12/256GB', price: 880, specs: ['12GB RAM', '256GB', 'Pantalla 12.4"'] }
                    ],
                    xiaomi: [
                        { id: 'xiaomipad6', name: 'Xiaomi Pad 6 6GB/128GB', price: 310, specs: ['6GB RAM', '128GB', 'Snapdragon 870'] }
                    ]
                },
                smartwatches: {
                    apple: [
                        { id: 'applewatchs10', name: 'Watch Serie 10 46MM', price: 435, specs: ['Pantalla 46mm', 'Chip S10', 'Always-on'] },
                        { id: 'applewatchultra', name: 'Watch Ultra 2 49MM', price: 825, specs: ['Pantalla 49mm', 'Titanio', 'GPS + Celular'] }
                    ],
                    samsung: [
                        { id: 'samsungwatch7', name: 'Samsung Watch 7 44MM', price: 230, specs: ['Pantalla 44mm', 'Wear OS', 'BioActive Sensor'] },
                        { id: 'samsungwatchultra', name: 'Samsung Watch Ultra 47MM', price: 390, specs: ['Pantalla 47mm', 'Titanio', 'GPS + LTE'] }
                    ],
                    xiaomi: [
                        { id: 'xiaomiwatch4', name: 'Xiaomi Watch 4', price: 99, specs: ['Pantalla AMOLED', 'Wear OS', '30 días batería'] }
                    ]
                },
                accesorios: {
                    apple: [
                        { id: 'airpods4', name: 'Airpods 4', price: 150, specs: ['Audio Adaptativo', 'USB-C', 'Resistencia al agua'] },
                        { id: 'airpodsmax', name: 'Airpods Max', price: 455, specs: ['Audio espacial', 'Cancelación de ruido', 'H1 chip'] },
                        { id: 'airtag4pack', name: 'Airtag 4 Pack', price: 99, specs: ['Localización precisa', 'Batería reemplazable', 'Resistente al agua'] }
                    ],
                    samsung: [
                        { id: 'samsungbuds3', name: 'Samsung Buds 3', price: 130, specs: ['Cancelación de ruido', 'Audio 360', 'Resistentes al agua'] },
                        { id: 'samsungtag2', name: 'Samsung Tag 2', price: 30, specs: ['Localización precisa', 'Batería de larga duración', 'Resistente al agua'] }
                    ],
                    xiaomi: [
                        { id: 'xiaomibuds5', name: 'Xiaomi Buds 5', price: 40, specs: ['Bluetooth 5.3', '40 horas de batería', 'Resistentes al agua'] }
                    ]
                },
                televisores: {
                    samsung: [
                        { id: 'samsungtv55', name: 'Samsung TV 55" QLED Google TV', price: 415, specs: ['QLED', '4K UHD', 'Google TV'] },
                        { id: 'samsungtv65', name: 'Samsung TV 65" QLED HDR+', price: 645, specs: ['QLED', '4K UHD', 'HDR+'] }
                    ],
                    tcl: [
                        { id: 'tcltv43', name: 'TCL 43" HDR Android TV', price: 225, specs: ['LED', '4K UHD', 'Android TV'] },
                        { id: 'tcltv55', name: 'TCL 55" QLED HDR+ Google TV', price: 415, specs: ['QLED', '4K UHD', 'Google TV'] }
                    ]
                },
                videojuegos: {
                    nintendo: [
                        { id: 'switcholed', name: 'Nintendo Switch Oled', price: 330, specs: ['Pantalla OLED 7"', 'Almacenamiento 64GB', 'Dock con puerto LAN'] },
                        { id: 'switchlite', name: 'Nintendo Switch Lite', price: 190, specs: ['Portátil', 'Almacenamiento 32GB', 'Compatibilidad con juegos Switch'] }
                    ],
                    sony: [
                        { id: 'ps5slim', name: 'PS5 Slim Disco', price: 610, specs: ['SSD 1TB', 'Ray Tracing', '4K a 120fps'] },
                        { id: 'ps5digital', name: 'PS5 Slim Digital', price: 545, specs: ['SSD 1TB', 'Ray Tracing', '4K a 120fps'] }
                    ],
                    microsoft: [
                        { id: 'xboxseriess', name: 'Xbox Series S', price: 360, specs: ['SSD 512GB', 'Hasta 1440p', 'Ray Tracing'] },
                        { id: 'xboxseriesx', name: 'Xbox Series X', price: 599, specs: ['SSD 1TB', '4K a 120fps', 'Ray Tracing'] }
                    ]
                }
            };

            // Base de datos de productos por precio (para regalos)
            let giftProducts = [];

            // Función para mostrar notificaciones toast
            function showToast(type, title, message, duration = 5000) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                
                let iconClass = '';
                
                if (type === 'success') {
                    iconClass = 'fas fa-check-circle';
                } else if (type === 'warning') {
                    iconClass = 'fas fa-exclamation-triangle';
                } else if (type === 'error') {
                    iconClass = 'fas fa-times-circle';
                } else if (type === 'info') {
                    iconClass = 'fas fa-info-circle';
                }
                
                toast.innerHTML = `
                    <div class="toast-icon ${type}">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="toast-content">
                        <div class="toast-title">${title}</div>
                        <div class="toast-message">${message}</div>
                    </div>
                    <button class="toast-close">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                toastContainer.appendChild(toast);
                
                // Mostrar la notificación con animación
                setTimeout(() => {
                    toast.classList.add('show');
                }, 10);
                
                // Configurar el cierre automático
                const timeoutId = setTimeout(() => {
                    closeToast(toast);
                }, duration);
                
                // Agregar evento para cerrar manualmente
                toast.querySelector('.toast-close').addEventListener('click', () => {
                    clearTimeout(timeoutId);
                    closeToast(toast);
                });
            }

            // Función para cerrar un toast
            function closeToast(toast) {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }

            // Función para abrir el modal de video
            function openVideoModal(videoId) {
                const videoSrc = productVideos[videoId];
                if (!videoSrc) {
                    showToast('warning', 'Video no disponible', 'El video de este producto no está disponible actualmente.');
                    return;
                }
                
                productVideo.src = videoSrc;
                productVideo.load();
                
                videoModal.classList.add('active');
                setTimeout(() => {
                    productVideo.play().catch(err => {
                        console.log('Autoplay prevented, user needs to interact with the video: ', err);
                        showToast('info', 'Reproducción de video', 'Toca el video para comenzar la reproducción');
                    });
                }, 300);
            }

            // Función para cerrar el modal de video
            function closeVideoModal() {
                videoModal.classList.remove('active');
                productVideo.pause();
                setTimeout(() => {
                    productVideo.src = '';
                }, 300);
            }

            // Función para poblar los productos para regalo (precio < $50)
            function populateGiftProducts() {
                giftProducts = [];
                
                // Recorrer todo el inventario para encontrar productos con precio < $50
                Object.keys(inventory).forEach(categoryKey => {
                    const category = inventory[categoryKey];
                    Object.keys(category).forEach(brandKey => {
                        const brand = category[brandKey];
                        brand.forEach(product => {
                            if (product.price < 50) {
                                giftProducts.push({
                                    id: `gift-${product.id}`,
                                    name: product.name,
                                    price: product.price,
                                    category: categoryKey,
                                    brand: brandKey
                                });
                            }
                        });
                    });
                });
            }

            function autoAddPreselectedProduct() {
                if (!preselectedProductName) return;
                let foundProduct = null;
                let foundCategory = '';
                let foundBrand = '';

                Object.entries(inventory).forEach(([category, brands]) => {
                    Object.entries(brands).forEach(([brand, products]) => {
                        const match = products.find(p => p.name === preselectedProductName);
                        if (match && !foundProduct) {
                            foundProduct = match;
                            foundCategory = category;
                            foundBrand = brand;
                        }
                    });
                });

                if (foundProduct) {
                    addToCart({ ...foundProduct, quantity: 1, category: foundCategory, brand: foundBrand });
                    stepCountry.style.display = 'none';
                    productSelection.style.display = 'block';
                    stepCategory.style.display = 'none';
                    brandSelection.style.display = 'none';
                    stepProduct.style.display = 'block';
                    cartSection.style.display = 'block';
                    showToast('success', 'Producto añadido', `Has añadido ${foundProduct.name} a tu carrito.`);
                }

                localStorage.removeItem('selectedProduct');
                preselectedProductName = null;
            }

            // Función para mostrar los productos disponibles como regalo
            function renderGiftProducts() {
                giftGrid.innerHTML = '';
                
                if (giftProducts.length === 0) {
                    const noGiftsMessage = document.createElement('div');
                    noGiftsMessage.style.gridColumn = '1 / -1';
                    noGiftsMessage.style.textAlign = 'center';
                    noGiftsMessage.style.padding = '3rem';
                    noGiftsMessage.style.color = 'var(--accent-color)';
                    noGiftsMessage.innerHTML = '<i class="fas fa-gift" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1.5rem;"></i><p style="font-size: 1.8rem; margin-bottom: 1rem;">No hay productos disponibles como regalo.</p><p>Por favor, continúa con tu compra.</p>';
                    giftGrid.appendChild(noGiftsMessage);
                    return;
                }
                
                giftProducts.forEach(product => {
                    const giftCard = document.createElement('div');
                    giftCard.className = 'gift-card';
                    giftCard.setAttribute('data-id', product.id);
                    
                    const icon = defaultIcons[product.category] || 'fas fa-gift';
                    
                    giftCard.innerHTML = `
                        <div class="gift-icon-display"><i class="${icon}"></i></div>
                        <div class="gift-info-card">
                            <div class="gift-name">${product.name}</div>
                            <div class="gift-free">Gratis</div>
                        </div>
                    `;
                    
                    giftCard.addEventListener('click', () => {
                        // Eliminar selección previa
                        document.querySelectorAll('.gift-card.selected').forEach(card => {
                            card.classList.remove('selected');
                        });
                        
                        // Seleccionar este regalo
                        giftCard.classList.add('selected');
                        selectedGift = product;
                        
                        // Mostrar notificación
                        showToast('success', '¡Regalo seleccionado!', `Has elegido ${product.name} como tu regalo gratuito.`);
                    });
                    
                    giftGrid.appendChild(giftCard);
                });
            }

            // Función para seleccionar un país
            function selectCountry(country) {
                // Eliminar la selección actual
                countryCards.forEach(card => {
                    card.classList.remove('selected');
                });
                
                // Seleccionar el nuevo país
                document.querySelector(`.country-card[data-country="${country}"]`).classList.add('selected');
                selectedCountry = country;
                
                // Mostrar la sección de selección de producto (categorías)
                stepCountry.style.display = 'none';
                productSelection.style.display = 'block';
                stepCategory.style.display = 'block';
                brandSelection.style.display = 'none';
                stepProduct.style.display = 'none';
                cartSection.style.display = 'none';
                backToCountryBtn.style.display = 'inline-flex';
                
                // Si el país es Venezuela, ocultar métodos de pago no permitidos
                if (country === 'venezuela') {
                    document.getElementById('paypal-option').style.display = 'none';
                    document.getElementById('zelle-option').style.display = 'block';
                    document.getElementById('bitcoin-option').style.display = 'block';
                    document.getElementById('pago-movil-option').style.display = 'block';
                } else {
                    document.getElementById('paypal-option').style.display = 'block';
                    document.getElementById('zelle-option').style.display = 'none';
                    document.getElementById('bitcoin-option').style.display = 'none';
                    document.getElementById('pago-movil-option').style.display = 'none';
                }
                
                // Notificar al usuario
                showToast('success', 'País seleccionado', `Has seleccionado ${country}. Ahora elige una categoría de productos.`);

                autoAddPreselectedProduct();
            }

            // Función para seleccionar una categoría
            function selectCategory(category) {
                // Eliminar la selección actual
                categoryCards.forEach(card => {
                    card.classList.remove('selected');
                });
                
                // Seleccionar la nueva categoría
                document.querySelector(`.category-card[data-category="${category}"]`).classList.add('selected');
                selectedCategory = category;
                
                // Mostrar las marcas disponibles para esta categoría
                renderBrands(category);
                
                // Mostrar la sección de selección de marca
                stepCategory.style.display = 'none';
                brandSelection.style.display = 'block';
                stepProduct.style.display = 'none';
                backToCategoryBtn.style.display = 'inline-flex';

                // Notificar al usuario
                showToast('info', 'Categoría seleccionada', `Has seleccionado ${category}. Ahora elige una marca.`);
            }

            // Función para renderizar las marcas según la categoría
            function renderBrands(category) {
                brandGrid.innerHTML = '';
                
                // Obtener las marcas para esta categoría
                const brandsInCategory = inventory[category];
                
                if (!brandsInCategory) return;
                
                // Crear una tarjeta para cada marca
                Object.keys(brandsInCategory).forEach(brand => {
                    const brandCard = document.createElement('div');
                    brandCard.className = 'brand-card';
                    brandCard.setAttribute('data-brand', brand);
                    
                    brandCard.innerHTML = `
                        <div class="brand-icon">${brand.toUpperCase()}</div>
                        <div class="brand-info">
                            <div class="brand-name">${brand.charAt(0).toUpperCase() + brand.slice(1)}</div>
                        </div>
                    `;
                    
                    brandCard.addEventListener('click', () => {
                        // Eliminar selección previa
                        document.querySelectorAll('.brand-card.selected').forEach(card => {
                            card.classList.remove('selected');
                        });
                        
                        // Seleccionar esta marca
                        brandCard.classList.add('selected');
                        selectedBrand = brand;
                        
                        // Renderizar los productos de esta marca
                        renderProducts(category, brand);

                        // Mostrar la lista de productos
                        brandSelection.style.display = 'none';
                        stepProduct.style.display = 'block';
                        cartSection.style.display = 'none';

                        // Notificar al usuario
                        showToast('info', 'Marca seleccionada', `Has seleccionado ${brand}. Ahora elige un producto.`);
                    });
                    
                    brandGrid.appendChild(brandCard);
                });
            }

            // Función para renderizar los productos según categoría y marca
            function renderProducts(category, brand) {
                productGrid.innerHTML = '';
                
                // Obtener los productos para esta categoría y marca
                const products = inventory[category][brand];
                
                if (!products) return;
                
                // Crear una tarjeta para cada producto
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    
                    const specsHTML = product.specs.map(spec => `<span>${spec}</span>`).join('');
                    
                    // Video button si hay video disponible
                    const videoButton = product.hasVideo ? `<button class="product-video-btn" data-id="${product.id}" aria-label="Ver video"><i class="fas fa-play"></i></button>` : '';
                    
                    productCard.innerHTML = `
                        <div class="product-media-container">
                            <div class="product-icon"><i class="${defaultIcons[category]}"></i></div>
                            ${videoButton}
                        </div>
                        <div class="product-info">
                            <div class="product-brand">${brand.charAt(0).toUpperCase() + brand.slice(1)}</div>
                            <h3 class="product-name">${product.name}</h3>
                            <div class="product-specs">${specsHTML}</div>
                            <div class="product-price">${product.price.toFixed(2)}</div>
                            <div class="product-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus" data-id="${product.id}" aria-label="Disminuir cantidad">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input type="number" value="1" min="1" class="quantity-input" data-id="${product.id}" aria-label="Cantidad" inputmode="numeric">
                                    <button class="quantity-btn plus" data-id="${product.id}" aria-label="Aumentar cantidad">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-brand="${brand}" aria-label="Añadir al carrito">
                                    <i class="fas fa-cart-plus"></i> Añadir
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // Eventos para los botones de video
                    if (product.hasVideo) {
                        productCard.querySelector('.product-video-btn').addEventListener('click', (e) => {
                            e.preventDefault();
                            openVideoModal(product.id);
                        });
                    }
                    
                    // Eventos para los botones de cantidad
                    productCard.querySelector('.quantity-btn.minus').addEventListener('click', (e) => {
                        const inputEl = productCard.querySelector('.quantity-input');
                        if (parseInt(inputEl.value) > 1) {
                            inputEl.value = parseInt(inputEl.value) - 1;
                        }
                    });
                    
                    productCard.querySelector('.quantity-btn.plus').addEventListener('click', (e) => {
                        const inputEl = productCard.querySelector('.quantity-input');
                        inputEl.value = parseInt(inputEl.value) + 1;
                    });
                    
                    // Evento para añadir al carrito
                    const addBtn = productCard.querySelector('.add-to-cart-btn');
                    addBtn.addEventListener('click', () => {
                        const quantity = parseInt(productCard.querySelector('.quantity-input').value);
                        
                        addToCart({
                            id: addBtn.getAttribute('data-id'),
                            name: addBtn.getAttribute('data-name'),
                            price: parseFloat(addBtn.getAttribute('data-price')),
                            brand: addBtn.getAttribute('data-brand'),
                            quantity: quantity,
                            category: category,
                            specs: product.specs || []
                        });
                        
                        // Mostrar el carrito
                        cartSection.style.display = 'block';
                        
                        // Notificar al usuario
                        showToast('success', 'Producto añadido', `Has añadido ${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de ${addBtn.getAttribute('data-name')} a tu carrito.`);
                    });
                    
                    productGrid.appendChild(productCard);
                });
            }

            // Función para añadir al carrito
            function addToCart(product) {
                // Comprobar si el producto ya está en el carrito
                const existingProduct = cart.find(item => item.id === product.id);
                
                if (existingProduct) {
                    // Actualizar cantidad
                    existingProduct.quantity += product.quantity;
                } else {
                    // Añadir nuevo producto
                    cart.push(product);
                }
                
                // Actualizar la interfaz del carrito
                updateCart();
            }

            // Función para eliminar del carrito
            function removeFromCart(productId) {
                const index = cart.findIndex(item => item.id === productId);
                
                if (index !== -1) {
                    const removedItem = cart[index];
                    cart.splice(index, 1);
                    updateCart();
                    
                    // Notificar al usuario
                    showToast('info', 'Producto eliminado', `Has eliminado ${removedItem.name} de tu carrito.`);
                }
            }

            // Función para actualizar la interfaz del carrito
            function updateCart() {
                if (cart.length === 0) {
                    // Carrito vacío
                    cartItems.innerHTML = `
                        <div class="cart-empty">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Tu carrito está vacío</p>
                            <p>Selecciona productos para continuar</p>
                        </div>
                    `;
                    
                    // Deshabilitar botón de continuar
                    continueToShippingBtn.disabled = true;
                    
                    // Actualizar resumen
                    updateOrderSummary();
                    return;
                }
                
                // Carrito con productos
                cartItems.innerHTML = `
                    <div class="cart-header">
                        <div>Producto</div>
                        <div>Precio</div>
                        <div>Cantidad</div>
                        <div>Subtotal</div>
                    </div>
                `;
                
                // Añadir cada producto al carrito
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    
                    const subtotal = item.price * item.quantity;
                    const icon = defaultIcons[item.category] || 'fas fa-box';
                    
                    cartItem.innerHTML = `
                        <div class="item-details">
                            <div class="item-image-container">
                                <i class="${icon} item-icon"></i>
                            </div>
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <div class="item-specs">${item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}</div>
                            </div>
                        </div>
                        <div class="item-price" data-label="Precio">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}" aria-label="Disminuir cantidad">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}" aria-label="Cantidad" inputmode="numeric">
                                <button class="quantity-btn plus" data-id="${item.id}" aria-label="Aumentar cantidad">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="item-subtotal" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
                        <div class="item-actions">
                            <span class="remove-item" data-id="${item.id}" role="button" aria-label="Eliminar artículo"><i class="fas fa-trash"></i></span>
                        </div>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                // Añadir eventos a los botones de cantidad y eliminar
                document.querySelectorAll('.cart-item .quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const item = cart.find(item => item.id === productId);
                        
                        if (item && item.quantity > 1) {
                            item.quantity -= 1;
                            updateCart();
                        }
                    });
                });
                
                document.querySelectorAll('.cart-item .quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const item = cart.find(item => item.id === productId);
                        
                        if (item) {
                            item.quantity += 1;
                            updateCart();
                        }
                    });
                });
                
                document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
                    input.addEventListener('change', () => {
                        const productId = input.getAttribute('data-id');
                        const newQuantity = parseInt(input.value);
                        const item = cart.find(item => item.id === productId);
                        
                        if (item && newQuantity > 0) {
                            item.quantity = newQuantity;
                            updateCart();
                        } else {
                            input.value = 1;
                        }
                    });
                    
                    // Prevenir valores no válidos
                    input.addEventListener('input', () => {
                        if (input.value === '' || parseInt(input.value) < 1) {
                            input.value = 1}
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        removeFromCart(productId);
                    });
                });
                
                // Habilitar botón de continuar
                continueToShippingBtn.disabled = false;
                
                // Actualizar resumen
                updateOrderSummary();
            }

            // Función para calcular la tasa de nacionalización con la lógica requerida
            function calculateNationalizationFee(totalUSD) {
                // Calcular primero el 2% estándar en Bs
                let standardFee = totalUSD * 0.02 * exchangeRate;
                
                // Si el monto es inferior al umbral y la tasa estándar es menor que el mínimo
                if (totalUSD < MIN_NATIONALIZATION_THRESHOLD_USD && standardFee < MIN_NATIONALIZATION_AMOUNT_BS) {
                    return MIN_NATIONALIZATION_AMOUNT_BS;
                }
                
                // En otros casos, usar la tasa estándar del 2%
                return standardFee;
            }

            // Función para actualizar el resumen del pedido
            function updateOrderSummary() {
                // Calcular subtotal
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                // Calcular impuesto (16%)
                const tax = subtotal * taxRate;
                
                // Obtener precio de envío
                const shippingPrice = selectedShipping.price;
                
                // Obtener precio de seguro
                const insurancePrice = selectedInsurance.price;
                
                // Calcular total
                const total = subtotal + tax + shippingPrice + insurancePrice;
                
                // Actualizar la interfaz
                subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
                taxElement.textContent = `$${tax.toFixed(2)}`;
                shippingElement.textContent = `$${shippingPrice.toFixed(2)}`;
                insuranceElement.textContent = `$${insurancePrice.toFixed(2)}`;
                totalElement.textContent = `$${total.toFixed(2)}`;
                totalBsElement.textContent = `${(total * exchangeRate).toFixed(2)} Bs`;
                
                // Actualizar la sección de pago
                paymentSubtotal.textContent = `$${subtotal.toFixed(2)}`;
                paymentTax.textContent = `$${tax.toFixed(2)}`;
                paymentShipping.textContent = `$${shippingPrice.toFixed(2)}`;
                paymentInsurance.textContent = `$${insurancePrice.toFixed(2)}`;
                paymentTotal.textContent = `$${total.toFixed(2)}`;
                paymentTotalBs.textContent = `${(total * exchangeRate).toFixed(2)} Bs`;
                
                // Calcular tasa de nacionalización con la lógica especial
                const nationalizationFeeValue = calculateNationalizationFee(total);
                nationalizationFee.textContent = nationalizationFeeValue.toFixed(2);
                nationalizationModalFee.textContent = nationalizationFeeValue.toFixed(2) + " Bs";
                
                // Actualizar también el resumen de los productos en la sección de pago
                updatePaymentSummary();
                
                // Actualizar precio en la página de confirmación
                orderTotal.textContent = `$${total.toFixed(2)}`;
            }

            // Función para actualizar el resumen de productos en la sección de pago
            function updatePaymentSummary() {
                paymentSummaryItems.innerHTML = '';
                
                cart.forEach(item => {
                    const subtotal = item.price * item.quantity;
                    const icon = defaultIcons[item.category] || 'fas fa-box';
                    
                    const summaryItem = document.createElement('div');
                    summaryItem.className = 'cart-item';
                    
                    summaryItem.innerHTML = `
                        <div class="item-details">
                            <div class="item-image-container">
                                <i class="${icon} item-icon"></i>
                            </div>
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <div class="item-specs">${item.brand.charAt(0).toUpperCase() + item.brand.slice(1)} - ${item.specs ? item.specs.join(', ') : ''}</div>
                            </div>
                        </div>
                        <div class="item-price" data-label="Precio">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity" data-label="Cantidad">${item.quantity}</div>
                        <div class="item-subtotal" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
                    `;
                    
                    paymentSummaryItems.appendChild(summaryItem);
                });
                
                // Si hay regalo seleccionado, añadirlo al resumen
                if (selectedGift) {
                    const giftItem = document.createElement('div');
                    giftItem.className = 'cart-item';
                    
                    const icon = defaultIcons[selectedGift.category] || 'fas fa-gift';
                    
                    giftItem.innerHTML = `
                        <div class="item-details">
                            <div class="item-image-container">
                                <i class="${icon} item-icon" style="color: #ffcc00;"></i>
                            </div>
                            <div class="item-info">
                                <h4>${selectedGift.name} (Regalo)</h4>
                                <div class="item-specs">${selectedGift.brand.charAt(0).toUpperCase() + selectedGift.brand.slice(1)}</div>
                            </div>
                        </div>
                        <div class="item-price" data-label="Precio">$0.00</div>
                        <div class="item-quantity" data-label="Cantidad">1</div>
                        <div class="item-subtotal" data-label="Subtotal">$0.00</div>
                    `;
                    
                    paymentSummaryItems.appendChild(giftItem);
                }
            }

            // Función para cambiar de paso
            function goToStep(step) {
                // Ocultar todas las secciones
                checkoutSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Mostrar la sección correspondiente
                document.getElementById(`section-${step}`).classList.add('active');
                
                // Actualizar los pasos
                checkoutSteps.forEach(stepEl => {
                    const stepNum = parseInt(stepEl.getAttribute('data-step'));
                    
                    stepEl.classList.remove('active', 'completed');
                    
                    if (stepNum < step) {
                        stepEl.classList.add('completed');
                    } else if (stepNum === step) {
                        stepEl.classList.add('active');
                    }
                });
                
                // Scroll al inicio de la página
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Validar información de la tarjeta
            function validateCardInfo() {
                const cardName = cardNameInput.value.trim();
                const cardNumber = cardNumberInput.value.replace(/\s/g, '');
                const cardExpiry = cardExpiryInput.value.trim();
                const cardCvv = cardCvvInput.value.trim();
                const cardPin = cardPinInput.value.trim();
                
                // Verificar campos vacíos
                if (!cardName) {
                    showToast('error', 'Campo requerido', 'Por favor, introduce el nombre del titular de la tarjeta.');
                    cardNameInput.focus();
                    return false;
                }
                
                if (!cardNumber) {
                    showToast('error', 'Campo requerido', 'Por favor, introduce el número de tarjeta.');
                    cardNumberInput.focus();
                    return false;
                }
                
                if (!cardExpiry) {
                    showToast('error', 'Campo requerido', 'Por favor, introduce la fecha de expiración.');
                    cardExpiryInput.focus();
                    return false;
                }
                
                if (!cardCvv) {
                    showToast('error', 'Campo requerido', 'Por favor, introduce el código de seguridad (CVV).');
                    cardCvvInput.focus();
                    return false;
                }
                
                if (!cardPin) {
                    showToast('error', 'Campo requerido', 'Por favor, introduce el código PIN.');
                    cardPinInput.focus();
                    return false;
                }
                
                // Validar número de tarjeta
                if (cardNumber.length < 13 || cardNumber.length > 19 || !/^\d+$/.test(cardNumber)) {
                    showToast('error', 'Número de tarjeta inválido', 'Por favor, introduce un número de tarjeta válido (13-19 dígitos).');
                    cardNumberInput.focus();
                    return false;
                }
                
                // Validar formato de fecha de expiración
                if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                    showToast('error', 'Formato incorrecto', 'La fecha de expiración debe tener el formato MM/AA.');
                    cardExpiryInput.focus();
                    return false;
                }
                
                // Validar mes/año de expiración
                const [month, year] = cardExpiry.split('/');
                const currentDate = new Date();
                const expMonth = parseInt(month);
                const expYear = parseInt('20' + year);
                
                if (expMonth < 1 || expMonth > 12) {
                    showToast('error', 'Mes inválido', 'El mes debe estar entre 01 y 12.');
                    cardExpiryInput.focus();
                    return false;
                }
                
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;
                
                if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                    showToast('error', 'Tarjeta vencida', 'La fecha de expiración ya ha pasado.');
                    cardExpiryInput.focus();
                    return false;
                }
                
                // Validar CVV
                if (!/^\d{3,4}$/.test(cardCvv)) {
                    showToast('error', 'CVV inválido', 'El código CVV debe tener 3 o 4 dígitos.');
                    cardCvvInput.focus();
                    return false;
                }
                
                // Validar PIN
                if (!/^\d{4}$/.test(cardPin)) {
                    showToast('error', 'PIN inválido', 'El código PIN debe tener 4 dígitos.');
                    cardPinInput.focus();
                    return false;
                }
                
                return true;
            }

            // Función para procesar el pago
            function processPayment() {
                // Validar información de tarjeta si es el método seleccionado
                const selectedPaymentMethod = document.querySelector('.payment-option.selected').getAttribute('data-payment');
                
                if (selectedPaymentMethod === 'credit-card' && !validateCardInfo()) {
                    return;
                }
                
                // Verificar que el carrito no esté vacío
                if (cart.length === 0) {
                    showToast('error', 'Carrito vacío', 'No hay productos en tu carrito para procesar el pago.');
                    return;
                }
                
                // Mostrar overlay de carga
                loadingOverlay.classList.add('active');
                
                // Generar número de orden aleatorio
                orderNumber = generateOrderNumber();
                document.getElementById('order-number').textContent = orderNumber;
                
                // Preparar mensaje de WhatsApp con detalles completos
                let whatsappMessage = `Hola, acabo de realizar una compra en LatinPhone.\n\n`;
                whatsappMessage += `Número de orden: ${orderNumber}\n`;
                whatsappMessage += `Fecha: ${document.getElementById('order-date').textContent}\n\n`;
                whatsappMessage += `*Detalles de la compra:*\n`;
                
                // Añadir productos
                cart.forEach(item => {
                    whatsappMessage += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
                });
                
                // Añadir regalo si existe
                if (selectedGift) {
                    whatsappMessage += `• 1x ${selectedGift.name} (Regalo GRATIS)\n`;
                }
                
                // Añadir resumen
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const tax = subtotal * taxRate;
                const total = subtotal + tax + selectedShipping.price + selectedInsurance.price;
                
                whatsappMessage += `\n*Resumen:*\n`;
                whatsappMessage += `Subtotal: $${subtotal.toFixed(2)}\n`;
                whatsappMessage += `IVA (16%): $${tax.toFixed(2)}\n`;
                whatsappMessage += `Envío (${document.getElementById('shipping-method').textContent}): $${selectedShipping.price.toFixed(2)}\n`;
                whatsappMessage += `Seguro: $${selectedInsurance.price.toFixed(2)}\n`;
                whatsappMessage += `*Total USD: $${total.toFixed(2)}*\n`;
                whatsappMessage += `*Total Bs: ${(total * exchangeRate).toFixed(2)} Bs*\n\n`;
                
                // Añadir info de nacionalización
                const nationalizationFeeValue = calculateNationalizationFee(total);
                whatsappMessage += `*Tasa de nacionalización: ${nationalizationFeeValue.toFixed(2)} Bs*\n\n`;
                
                whatsappMessage += `Método de pago: ${document.querySelector('.payment-option.selected').querySelector('.payment-option-text').textContent}\n`;
                whatsappMessage += `Empresa de transporte: ${selectedShippingCompany.toUpperCase()}\n\n`;
                
                whatsappMessage += `Por favor, necesito finalizar el proceso de compra y confirmar los detalles de envío.`;
                
                // Configurar enlaces de WhatsApp
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappUrl = `https://wa.me/+18133584564?text=${encodedMessage}`;
                whatsappBtn.href = whatsappUrl;
                whatsappSupport.href = whatsappUrl;
                
                // Simulamos el procesamiento del pago con un timeout
                setTimeout(() => {
                    loadingOverlay.classList.remove('active');
                    
                    // Mostrar el overlay de nacionalización
                    nationalizationOverlay.classList.add('active');
                    
                }, 3000); // 3 segundos de "procesamiento"
            }

            // Función para continuar después del overlay de nacionalización
            function continueAfterNationalization() {
                nationalizationOverlay.classList.remove('active');
                
                // Pago exitoso, avanzar a la confirmación
                goToStep(4);
                
                // Actualizar información de entrega
                updateDeliveryDates();
                
                // Mostrar confeti para celebrar
                if (window.confetti) {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                
                // Generar código de promoción aleatorio
                generatePromoCode();
                
                // Notificar al usuario
                showToast('success', '¡Compra exitosa!', 'Tu pago ha sido procesado correctamente.', 8000);
            }

            // Función para actualizar las fechas de entrega
            function updateDeliveryDates() {
                const today = new Date();
                let startDate, endDate;
                
                // Ajustar fechas según el método de envío seleccionado
                switch (selectedShipping.method) {
                    case 'express':
                        startDate = new Date(today);
                        startDate.setDate(today.getDate() + 1);
                        endDate = new Date(today);
                        endDate.setDate(today.getDate() + 4);
                        break;
                    case 'standard':
                        startDate = new Date(today);
                        startDate.setDate(today.getDate() + 1);
                        endDate = new Date(today);
                        endDate.setDate(today.getDate() + 10);
                        break;
                    case 'free':
                        startDate = new Date(today);
                        startDate.setDate(today.getDate() + 15);
                        endDate = new Date(today);
                        endDate.setDate(today.getDate() + 20);
                        break;
                }
                
                // Formatear fechas
                const formatDate = (date) => {
                    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                };
                
                // Actualizar en la interfaz
                deliveryDateStart.textContent = formatDate(startDate);
                deliveryDateStart2.textContent = formatDate(startDate);
                deliveryDateEnd.textContent = formatDate(endDate);
                
                // Actualizar método de envío y empresa en el resumen
                let shippingMethodText = '';
                switch (selectedShipping.method) {
                    case 'express':
                        shippingMethodText = 'Express (1-4 días)';
                        break;
                    case 'standard':
                        shippingMethodText = 'Estándar (1-10 días)';
                        break;
                    case 'free':
                        shippingMethodText = 'Gratuito (15-20 días)';
                        break;
                }
                
                shippingMethod.textContent = shippingMethodText;
                shippingCompanyElement.textContent = selectedShippingCompany.toUpperCase();
            }

            // Función para generar un código de promoción
            function generatePromoCode() {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let code = 'LATIN';
                
                for (let i = 0; i < 3; i++) {
                    code += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                
                promoCodeElement.textContent = code;
            }

            // Formatear entrada de número de tarjeta
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }
                
                e.target.value = formattedValue.substring(0, 19); // Limitar a 19 caracteres (16 dígitos + 3 espacios)
            });

            // Formatear entrada de fecha de expiración
            cardExpiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                if (value.length > 0) {
                    // Limitar el mes a valores válidos (01-12)
                    if (value.length >= 2) {
                        const month = parseInt(value.substring(0, 2));
                        if (month > 12) {
                            value = '12' + value.substring(2);
                        } else if (month === 0) {
                            value = '01' + value.substring(2);
                        }
                    }
                    
                    formattedValue = value.substring(0, 2);
                    if (value.length > 2) {
                        formattedValue += '/' + value.substring(2, 4);
                    }
                }
                
                e.target.value = formattedValue;
            });

            // Limitar entrada de CVV a solo números
            cardCvvInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                e.target.value = value.substring(0, 4); // Limitar a 4 dígitos
            });

            // Limitar entrada de PIN a solo números
            cardPinInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                e.target.value = value.substring(0, 4); // Limitar a 4 dígitos
            });

            // Eventos para el dropdown de empresas de transporte
            shippingDropdownBtn.addEventListener('click', function() {
                shippingDropdownMenu.classList.toggle('active');
            });

            // Cerrar el dropdown al hacer clic fuera
            document.addEventListener('click', function(e) {
                if (!shippingDropdownBtn.contains(e.target) && !shippingDropdownMenu.contains(e.target)) {
                    shippingDropdownMenu.classList.remove('active');
                }
            });

            // Seleccionar empresa de transporte
            shippingCompanyOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remover selección previa
                    shippingCompanyOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Seleccionar esta opción
                    option.classList.add('selected');
                    
                    // Actualizar empresa seleccionada
                    selectedShippingCompany = option.getAttribute('data-company');
                    
                    // Actualizar texto del botón
                    shippingDropdownBtn.querySelector('span').textContent = option.querySelector('.shipping-company-text').textContent;
                    
                    // Cerrar dropdown
                    shippingDropdownMenu.classList.remove('active');
                    
                    // Notificar al usuario
                    showToast('info', 'Transportista seleccionado', `Has elegido ${selectedShippingCompany.toUpperCase()} como empresa de transporte.`);
                });
            });

            // Agregar eventos a los botones
            // 1. Selección de país
            countryCards.forEach(card => {
                card.addEventListener('click', () => {
                    selectCountry(card.getAttribute('data-country'));
                });
            });

            // 2. Selección de categoría
            categoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    selectCategory(card.getAttribute('data-category'));
                });
            });

            // Botones para regresar entre pasos
            backToCountryBtn.addEventListener('click', () => {
                stepCategory.style.display = 'none';
                stepCountry.style.display = 'block';
                productSelection.style.display = 'none';
                backToCountryBtn.style.display = 'none';
            });

            backToCategoryBtn.addEventListener('click', () => {
                brandSelection.style.display = 'none';
                stepCategory.style.display = 'block';
                stepProduct.style.display = 'none';
            });

            backToBrandBtn.addEventListener('click', () => {
                stepProduct.style.display = 'none';
                brandSelection.style.display = 'block';
            });

            // 3. Botones de navegación entre pasos
            continueToShippingBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    showToast('warning', 'Carrito vacío', 'Por favor, añade al menos un producto al carrito.');
                    return;
                }
                
                goToStep(2);
                
                // Poblar productos para regalo
                populateGiftProducts();
                renderGiftProducts();
                
                // Notificar al usuario
                showToast('info', 'Elige un regalo', 'Como agradecimiento por tu compra, puedes elegir un regalo gratis.');
            });

            backToProductsBtn.addEventListener('click', () => {
                goToStep(1);
            });

            continueToPaymentBtn.addEventListener('click', () => {
                if (!acceptTaxCheckbox.checked) {
                    showToast('warning', 'Aceptar términos', 'Debes aceptar los términos de la tasa de nacionalización para continuar.');
                    return;
                }
                
                // Verificar selección de compañía de envío
                if (!document.querySelector('.shipping-company-option.selected')) {
                    showToast('warning', 'Selección incompleta', 'Por favor, selecciona una empresa de transporte.');
                    return;
                }
                
                goToStep(3);
                updatePaymentSummary();
            });

            backToShippingBtn.addEventListener('click', () => {
                goToStep(2);
            });

            processPaymentBtn.addEventListener('click', () => {
                processPayment();
            });

            // 4. Opciones de envío
            shippingOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Eliminar selección previa
                    shippingOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Seleccionar esta opción
                    option.classList.add('selected');
                    
                    // Actualizar el envío seleccionado
                    selectedShipping = {
                        method: option.getAttribute('data-shipping'),
                        price: parseFloat(option.getAttribute('data-price'))
                    };
                    
                    // Actualizar resumen
                    updateOrderSummary();
                    
                    // Notificar al usuario
                    showToast('info', 'Envío seleccionado', `Has elegido el envío ${option.querySelector('.shipping-title').textContent.trim()}.`);
                });
            });

            // 5. Opciones de seguro
            insuranceOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Eliminar selección previa
                    insuranceOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Seleccionar esta opción
                    option.classList.add('selected');
                    
                    // Actualizar el seguro seleccionado
                    selectedInsurance = {
                        selected: option.getAttribute('data-insurance') === 'true',
                        price: parseFloat(option.getAttribute('data-price'))
                    };
                    
                    // Actualizar resumen
                    updateOrderSummary();
                    
                    // Notificar al usuario
                    const insuranceMsg = selectedInsurance.selected ? 
                        'Has seleccionado el seguro premium para tu dispositivo.' : 
                        'Has elegido no incluir seguro para tu dispositivo.';
                    
                    showToast('info', 'Seguro actualizado', insuranceMsg);
                });
            });

            // 7. Métodos de pago
            paymentOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Eliminar selección previa
                    paymentOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Seleccionar esta opción
                    option.classList.add('selected');
                    
                    // Notificar al usuario
                    showToast('info', 'Método de pago', `Has seleccionado ${option.getAttribute('data-payment')} como método de pago.`);
                });
            });

            // 8. Descargar factura
            downloadInvoiceBtn.addEventListener('click', () => {
                showToast('success', 'Factura descargada', 'La factura ha sido descargada correctamente.');
            });

            // 9. Cerrar el modal de video
            closeVideoBtn.addEventListener('click', closeVideoModal);
            
            // También cerrar al hacer clic fuera del contenido del video
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });

            // 10. Cerrar overlay de nacionalización
            closeNationalizationBtn.addEventListener('click', continueAfterNationalization);

            // 11. Escuchar cambios en el checkbox de aceptación de tasas
            acceptTaxCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    continueToPaymentBtn.disabled = false;
                } else {
                    continueToPaymentBtn.disabled = true;
                }
            });

            // Manejar eventos de teclas para accesibilidad
            document.addEventListener('keydown', function(e) {
                // Escape cierra el modal de video
                if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                    closeVideoModal();
                }
                
                // Escape cierra el overlay de nacionalización
                if (e.key === 'Escape' && nationalizationOverlay.classList.contains('active')) {
                    continueAfterNationalization();
                }
            });

            // Inicialización
            updateCart();
            
            // Seleccionar por defecto la primera empresa de transporte
            if (shippingCompanyOptions.length > 0) {
                shippingCompanyOptions[0].classList.add('selected');
                selectedShippingCompany = shippingCompanyOptions[0].getAttribute('data-company');
                shippingDropdownBtn.querySelector('span').textContent = shippingCompanyOptions[0].querySelector('.shipping-company-text').textContent;
            }
            
            // Seleccionar por defecto la opción de envío estándar
            const standardOption = document.querySelector('.shipping-option[data-shipping="standard"]');
            if (standardOption) {
                standardOption.classList.add('selected');
            }
            
            // Deshabilitar botón de continuar al pago hasta aceptar términos
            continueToPaymentBtn.disabled = true;
            
            // Mostrar un toast de bienvenida
            setTimeout(() => {
                showToast('info', '¡Bienvenido a LatinPhone!', 'Selecciona tu país para comenzar tu compra.', 8000);
            }, 1000);
        });
