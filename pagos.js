        // Inicializar el script cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function() {
            const orderDateEl = document.getElementById('order-date');
            const paymentDateEl = document.getElementById('payment-date');
            const preparingDateRangeEl = document.getElementById('preparing-date-range');
            const shippingStartDateEl = document.getElementById('shipping-start-date');
            const expressDateEl = document.getElementById('express-date');
            const standardDateEl = document.getElementById('standard-date');
            const freeDateEl = document.getElementById('free-date');
            const orderDate = new Date();

            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };

            const calculateDeliveryDate = (method) => {
                const daysMap = { express: 4, standard: 10, free: 20 };
                const days = daysMap[method] || 0;
                const date = new Date();
                date.setDate(date.getDate() + days);
                return date;
            };

            if (orderDateEl) {
                orderDateEl.textContent = formatDate(orderDate);
            }
            if (paymentDateEl) {
                paymentDateEl.textContent = formatDate(orderDate);
            }
            if (preparingDateRangeEl) {
                const prepEnd = new Date(orderDate);
                prepEnd.setDate(orderDate.getDate() + 1);
                preparingDateRangeEl.textContent = `${formatDate(orderDate)} - ${formatDate(prepEnd)}`;
            }
            if (shippingStartDateEl) {
                const shipStart = new Date(orderDate);
                shipStart.setDate(orderDate.getDate() + 1);
                shippingStartDateEl.textContent = formatDate(shipStart);
            }

            if (expressDateEl) {
                expressDateEl.textContent = formatDate(calculateDeliveryDate('express'));
            }
            if (standardDateEl) {
                standardDateEl.textContent = formatDate(calculateDeliveryDate('standard'));
            }
            if (freeDateEl) {
                freeDateEl.textContent = formatDate(calculateDeliveryDate('free'));
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
            const insuranceOptions = document.querySelectorAll('.insurance-option');
            const acceptTaxCheckbox = document.getElementById('accept-tax');
            const taxInfo = document.getElementById('tax-info');
            const taxAmountBs = document.getElementById('tax-amount-bs');
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
            const orderNationalization = document.getElementById('order-nationalization');
            const shippingMethod = document.getElementById('shipping-method');
            const shippingCompanyElement = document.getElementById('shipping-company');
            const giftGrid = document.getElementById('gift-grid');
            const giftSectionHeader = document.querySelector('.gift-section-header');
            const selectionSummary = document.getElementById('selection-summary');
            const summaryGift = document.getElementById('summary-gift');
            const summaryShipping = document.getElementById('summary-shipping');
            const summaryCompany = document.getElementById('summary-company');
            const summaryInsurance = document.getElementById('summary-insurance');
            const giftSummary = document.getElementById('gift-summary');
            const giftSummaryText = document.getElementById('gift-summary-text');
            const changeGiftBtn = document.getElementById('change-gift');
            const shippingSummary = document.getElementById('shipping-summary');
            const shippingSummaryText = document.getElementById('shipping-summary-text');
            const changeShippingBtn = document.getElementById('change-shipping');
            const shippingCompanySummary = document.getElementById('shipping-company-summary');
            const shippingCompanySummaryText = document.getElementById('shipping-company-summary-text');
            const changeShippingCompanyBtn = document.getElementById('change-shipping-company');
            const insuranceOptionsContainer = document.querySelector('.insurance-options');
            const insuranceSummary = document.getElementById('insurance-summary');
            const insuranceSummaryText = document.getElementById('insurance-summary-text');
            const changeInsuranceBtn = document.getElementById('change-insurance');
            const insuranceOverlay = document.getElementById('insurance-overlay');
            const insuranceOverlayClose = document.getElementById('insurance-overlay-close');
            const freeShippingOverlay = document.getElementById('free-shipping-overlay');
            const freeShippingAccept = document.getElementById('free-shipping-accept');
            const freeShippingCancel = document.getElementById('free-shipping-cancel');
            const shippingOptionsContainer = document.querySelector('.shipping-options');
            const shippingCompanyContainer = document.getElementById('shipping-company-container');
            let shippingCompanyCards;
            const downloadInvoiceBtn = document.getElementById('download-invoice');
            const summaryOverlay = document.getElementById('summary-overlay');
            const summaryFullName = document.getElementById('summary-full-name');
            const summaryIdNumber = document.getElementById('summary-id-number');
            const summaryPhone = document.getElementById('summary-phone');
            const summaryEmail = document.getElementById('summary-email');
            const summaryAddress = document.getElementById('summary-address');
            const summaryState = document.getElementById('summary-state');
            const summaryCity = document.getElementById('summary-city');
            const summaryOverlayGift = document.getElementById('summary-overlay-gift');
            const summaryOverlayShipping = document.getElementById('summary-overlay-shipping');
            const summaryOverlayCompany = document.getElementById('summary-overlay-company');
            const summaryOverlayInsurance = document.getElementById('summary-overlay-insurance');
            const summaryOverlayDelivery = document.getElementById('summary-overlay-delivery');
            const summaryOverlayTax = document.getElementById('summary-overlay-tax');
            const summaryEditBtn = document.getElementById('summary-edit');
            const summaryAcceptBtn = document.getElementById('summary-accept');
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
            const creditCardForm = document.querySelector('.credit-card-form');
            const zelleInfo = document.getElementById('zelle-info');
            const zelleReceipt = document.getElementById('zelle-receipt');
            const zelleVerification = document.getElementById('zelle-verification');
            const zelleResult = document.getElementById('zelle-result');

            const showZelleResult = (message, type = 'error') => {
                if (!zelleResult) return;
                zelleResult.className = type === 'success' ? 'form-success' : 'form-error';
                zelleResult.textContent = message;
                zelleResult.style.display = 'block';
            };
            const paypalInfo = document.getElementById('paypal-info');
            const whatsappSupport = document.getElementById('whatsapp-support');
            let generatedWhatsappUrl = '';
            const addMoreOverlay = document.getElementById('add-more-overlay');
            const addMoreBtn = document.getElementById('add-more-btn');
            const continueCheckoutBtn = document.getElementById('continue-checkout-btn');
            const accountLink = document.getElementById('account-link');
            const accountOverlay = document.getElementById('account-overlay');
            const accountOverlayClose = document.getElementById('account-overlay-close');
            const validationOverlay = document.getElementById('validation-overlay');
            const validationMessage = document.getElementById('validation-message');
            const validationClose = document.getElementById('validation-close');
            const infoSavedOverlay = document.getElementById('info-saved-overlay');
            const sendInfoOverlay = document.getElementById('send-info-overlay');
            const sendInfoAccept = document.getElementById('send-info-accept');
            let zelleTimer;

            const storedStart = localStorage.getItem('nationalizationStart');
            if (storedStart) {
                const elapsed = Date.now() - Number(storedStart);
                if (elapsed >= 1800000) {
                    startNationalization();
                } else {
                    setTimeout(startNationalization, 1800000 - elapsed);
                }
            }

            const locationOverlay = document.getElementById('location-overlay');
            const locationStateSelect = document.getElementById('location-state');
            const locationCitySelect = document.getElementById('location-city');
            const locationConfirm = document.getElementById('location-confirm');

            const estadosCiudadesVenezuela = {
                "Distrito Capital": [
                    "Caracas",
                    "Altamira",
                    "La Candelaria",
                    "Los Dos Caminos",
                    "Chacao",
                    "El Paraíso",
                    "La Castellana",
                    "Sabana Grande",
                    "San Bernardino",
                    "Bello Monte",
                    "Catia",
                    "La Pastora",
                    "El Recreo",
                    "San Pedro",
                    "Santa Rosalía",
                    "Antímano",
                    "La Vega",
                    "Caricuao",
                    "El Junquito",
                    "Macarao",
                    "23 de Enero",
                    "Las Mercedes (límites)",
                    "Chacaíto (límites)"
                ],
                "Amazonas": [
                    "Puerto Ayacucho",
                    "San Fernando de Atabapo",
                    "San Carlos de Río Negro",
                    "Maroa",
                    "Isla Ratón",
                    "La Esmeralda",
                    "Samariapo"
                ],
                "Anzoátegui": [
                    "Barcelona",
                    "Puerto La Cruz",
                    "Lechería",
                    "El Tigre",
                    "Anaco",
                    "San Tomé",
                    "Pariaguán",
                    "Guanta",
                    "Clarines",
                    "Cantaura",
                    "Puerto Píritu"
                ],
                "Apure": [
                    "San Fernando de Apure",
                    "Guasdualito",
                    "Biruaca",
                    "Achaguas",
                    "El Nula",
                    "Bruzual",
                    "Mantecal",
                    "San Juan de Payara"
                ],
                "Aragua": [
                    "Maracay",
                    "La Victoria",
                    "Cagua",
                    "Turmero",
                    "El Limón",
                    "Santa Rita",
                    "Palo Negro",
                    "San Mateo",
                    "Villa de Cura",
                    "San Sebastián de los Reyes",
                    "Las Tejerías"
                ],
                "Barinas": [
                    "Barinas",
                    "Socopó",
                    "Santa Bárbara de Barinas",
                    "Ciudad Bolivia",
                    "Pedraza",
                    "Barinitas",
                    "Sabaneta",
                    "Altamira de Cáceres"
                ],
                "Bolívar": [
                    "Ciudad Bolívar",
                    "Puerto Ordaz",
                    "San Félix",
                    "Upata",
                    "Tumeremo",
                    "El Callao",
                    "Guasipati",
                    "Caicara del Orinoco",
                    "Santa Elena de Uairén",
                    "Ciudad Piar"
                ],
                "Carabobo": [
                    "Valencia",
                    "Puerto Cabello",
                    "Guacara",
                    "San Joaquín",
                    "Bejuma",
                    "Naguanagua",
                    "Los Guayos",
                    "Morón",
                    "Miranda (Corozo Pavia)",
                    "Montalbán",
                    "Canoabo"
                ],
                "Cojedes": [
                    "San Carlos",
                    "Tinaquillo",
                    "El Baúl",
                    "El Pao",
                    "Manrique",
                    "Macapo",
                    "Las Vegas",
                    "Cojeditos"
                ],
                "Delta Amacuro": [
                    "Tucupita",
                    "Pedernales",
                    "Curiapo",
                    "San José de Amacuro",
                    "Nabasanuka",
                    "Sierra Imataca",
                    "Capure"
                ],
                "Falcón": [
                    "Coro",
                    "Punto Fijo",
                    "La Vela de Coro",
                    "Tucacas",
                    "Dabajuro",
                    "Chichiriviche",
                    "Cumarebo",
                    "Puerto Cumarebo",
                    "Yaracal",
                    "Santa Ana de Coro"
                ],
                "Guárico": [
                    "San Juan de los Morros",
                    "Calabozo",
                    "Valle de la Pascua",
                    "Altagracia de Orituco",
                    "Zaraza",
                    "Tucupido",
                    "Ortiz",
                    "El Sombrero",
                    "San José de Guaribe"
                ],
                "Lara": [
                    "Barquisimeto",
                    "Cabudare",
                    "El Tocuyo",
                    "Carora",
                    "Quíbor",
                    "Duaca",
                    "Sarare",
                    "Sanare",
                    "Barquisimeto (Este/Oeste/Centro)"
                ],
                "Mérida": [
                    "Mérida",
                    "El Vigía",
                    "Tovar",
                    "Ejido",
                    "Lagunillas",
                    "Tabay",
                    "Zea",
                    "Santa Cruz de Mora",
                    "Mucuchíes"
                ],
                "Miranda": [
                    "Los Teques",
                    "San Antonio de los Altos",
                    "Carrizal",
                    "San José de los Altos",
                    "Guarenas",
                    "Guatire",
                    "Higuerote",
                    "Río Chico",
                    "Ocumare del Tuy",
                    "Cúa",
                    "Charallave",
                    "Santa Teresa del Tuy",
                    "Petare",
                    "Baruta",
                    "El Hatillo",
                    "Chacao",
                    "Chacaíto",
                    "La Urbina",
                    "El Rosal",
                    "Las Mercedes",
                    "La California",
                    "El Cafetal",
                    "Macaracuay"
                ],
                "Monagas": [
                    "Maturín",
                    "Punta de Mata",
                    "Caripe",
                    "Temblador",
                    "Barrancas del Orinoco",
                    "Quiriquire",
                    "Jusepín",
                    "Aguasay",
                    "Santa Bárbara"
                ],
                "Nueva Esparta": [
                    "La Asunción",
                    "Porlamar",
                    "Pampatar",
                    "Juan Griego",
                    "San Juan Bautista",
                    "La Guardia",
                    "El Valle del Espíritu Santo",
                    "Boca de Río",
                    "El Yaque"
                ],
                "Portuguesa": [
                    "Guanare",
                    "Acarigua",
                    "Araure",
                    "Biscucuy",
                    "Ospino",
                    "Agua Blanca",
                    "Guanarito",
                    "Píritu",
                    "Villa Bruzual"
                ],
                "Sucre": [
                    "Cumaná",
                    "Carúpano",
                    "Güiria",
                    "Cariaco",
                    "San Vicente",
                    "Araya",
                    "Yaguaraparo",
                    "Marigüitar",
                    "Irapa"
                ],
                "Táchira": [
                    "San Cristóbal",
                    "Rubio",
                    "Táriba",
                    "La Grita",
                    "San Antonio del Táchira",
                    "Ureña",
                    "Palmira",
                    "Pregonero",
                    "Capacho Nuevo (Independencia)",
                    "Capacho Viejo (Libertad)"
                ],
                "Trujillo": [
                    "Trujillo",
                    "Valera",
                    "Boconó",
                    "Pampán",
                    "Carache",
                    "Isnotú",
                    "Motatán",
                    "Sabana de Mendoza",
                    "Monay"
                ],
                "La Guaira": [
                    "La Guaira",
                    "Maiquetía",
                    "Catia La Mar",
                    "Macuto",
                    "Caraballeda",
                    "Naiguatá",
                    "Carayaca",
                    "La Sabana",
                    "Camurí Grande",
                    "Playa Grande",
                    "Tanaguarena"
                ],
                "Yaracuy": [
                    "San Felipe",
                    "Yaritagua",
                    "Chivacoa",
                    "Nirgua",
                    "Cocorote",
                    "Independencia",
                    "Aroa",
                    "Urachiche",
                    "Sabana de Parra"
                ],
                "Zulia": [
                    "Maracaibo",
                    "Cabimas",
                    "Ciudad Ojeda",
                    "Machiques",
                    "Santa Bárbara del Zulia",
                    "San Francisco",
                    "La Concepción",
                    "La Cañada de Urdaneta",
                    "Mene Grande",
                    "Los Puertos de Altagracia",
                    "La Villa del Rosario",
                    "Tía Juana"
                ]
            };

            const estadosCiudadesColombia = {
                "Bogotá D.C.": ["Bogotá"],
                "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta", "La Estrella", "Caldas", "Rionegro", "Apartadó", "Turbo"],
                "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Galapa", "Sabanalarga", "Puerto Colombia"],
                "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
                "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Villa de Leyva"],
                "Caldas": ["Manizales", "Villamaría", "Chinchiná", "La Dorada", "Anserma"],
                "Caquetá": ["Florencia", "San Vicente del Caguán", "Puerto Rico", "Doncello", "Belén de los Andaquíes"],
                "Casanare": ["Yopal", "Aguazul", "Villanueva", "Monterrey", "Tauramena"],
                "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Guapi", "Patía (El Bordo)"],
                "Cesar": ["Valledupar", "Aguachica", "Codazzi", "Curumaní", "Bosconia"],
                "Chocó": ["Quibdó", "Istmina", "Tadó", "Bahía Solano", "Nuquí"],
                "Córdoba": ["Montería", "Lorica", "Sahagún", "Planeta Rica", "Tierralta"],
                "Cundinamarca": ["Soacha", "Chía", "Zipaquirá", "Fusagasugá", "Girardot", "Facatativá", "Mosquera", "Madrid", "Funza", "Cajicá"],
                "Guainía": ["Inírida", "Puerto Colombia (Guainía)", "Barranco Minas"],
                "Guaviare": ["San José del Guaviare", "Calamar", "Miraflores", "El Retorno"],
                "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre"],
                "La Guajira": ["Riohacha", "Maicao", "Uribia", "Fonseca", "San Juan del Cesar"],
                "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "Plato", "El Banco"],
                "Meta": ["Villavicencio", "Acacías", "Granada", "Restrepo", "Puerto López"],
                "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "Samaniego"],
                "Norte de Santander": ["Cúcuta", "Villa del Rosario", "Ocaña", "Pamplona", "Los Patios"],
                "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Villagarzón", "Sibundoy"],
                "Quindío": ["Armenia", "Calarcá", "Montenegro", "La Tebaida", "Circasia"],
                "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Belén de Umbría"],
                "San Andrés y Providencia": ["San Andrés", "Providencia"],
                "Santander": ["Bucaramanga", "Floridablanca", "Giron", "Piedecuesta", "Barrancabermeja", "San Gil"],
                "Sucre": ["Sincelejo", "Corozal", "Santiago de Tolú", "Coveñas", "San Marcos"],
                "Tolima": ["Ibagué", "Espinal", "Melgar", "Honda", "Líbano"],
                "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Buga", "Jamundí"],
                "Vaupés": ["Mitú", "Carurú", "Taraira"],
                "Vichada": ["Puerto Carreño", "La Primavera", "Santa Rosalía", "Cumaribo"],
                "Arauca": ["Arauca", "Saravena", "Tame", "Arauquita", "Fortul"],
                "Amazonas": ["Leticia", "Puerto Nariño", "Tarapacá"]
            };

            let estadosCiudades = estadosCiudadesVenezuela;

            function populateStates() {
                if (!locationStateSelect) return;
                locationStateSelect.innerHTML = '<option value="">--Selecciona un estado--</option>';
                Object.keys(estadosCiudades).forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado;
                    option.textContent = estado;
                    locationStateSelect.appendChild(option);
                });
                locationCitySelect.innerHTML = '<option value="">--Selecciona una ciudad--</option>';
            }

            function populateCities() {
                const estado = locationStateSelect.value;
                locationCitySelect.innerHTML = '<option value="">--Selecciona una ciudad--</option>';
                if (estado && estadosCiudades[estado]) {
                    estadosCiudades[estado].forEach(ciudad => {
                        const option = document.createElement('option');
                        option.value = ciudad;
                        option.textContent = ciudad;
                        locationCitySelect.appendChild(option);
                    });
                }
            }

            if (locationStateSelect) {
                locationStateSelect.addEventListener('change', populateCities);
            }

            if (locationConfirm) {
                locationConfirm.addEventListener('click', () => {
                    // Evitar que se borren los campos cuando no se ha
                    // seleccionado una ubicación válida
                    if (!locationStateSelect.value || !locationCitySelect.value) {
                        showValidationOverlay('Por favor, selecciona un estado y una ciudad.');
                        return;
                    }

                    stateInput.value = locationStateSelect.value;
                    cityInput.value = locationCitySelect.value;
                    locationOverlay.classList.remove('active');
                });
            }

            if (locationOverlay) {
                locationOverlay.addEventListener('click', (e) => {
                    if (e.target === locationOverlay) {
                        locationOverlay.classList.remove('active');
                    }
                });
            }

            const saveInfoBtn = document.getElementById('save-user-info');
            const fullNameInput = document.getElementById('full-name');
            const idNumberInput = document.getElementById('id-number');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            const addressInput = document.getElementById('address');
            const stateInput = document.getElementById('state');
            const cityInput = document.getElementById('city');
            const shippingCompanyInput = document.getElementById('shipping-company-input');
            let selectedShippingCompany = null;
            let selectedShippingCompanyName = '';

            const shippingCompaniesByCountry = {
                default: [
                    { id: 'dhl', name: 'DHL', logo: 'https://www.logo.wine/a/logo/DHL/DHL-Logo.wine.svg' },
                    { id: 'fedex', name: 'FedEx', logo: 'https://www.logo.wine/a/logo/FedEx_Express/FedEx_Express-Logo.wine.svg' },
                    { id: 'zoom', name: 'ZOOM', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Grupo_ZOOM_logo.png?20211116211646' },
                    { id: 'tealca', name: 'TEALCA', logo: 'https://www.tealca.es/wp-content/uploads/logo.png' },
                    { id: 'mrw', name: 'MRW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MRW_logo.svg/477px-MRW_logo.svg.png', recommended: true },
                    { id: 'liberty', name: 'Liberty Express', logo: 'https://libertyexpress.com/wp-content/themes/kutis/assets/svg/logo_banner.svg' }
                ],
                colombia: [
                    { id: 'servientrega', name: 'Servientrega', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Servientrega_logo.png' },
                    { id: 'interrapidisimo', name: 'Inter Rapidísimo', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Inter_Rapid%C3%ADsimo_logo.png' },
                    { id: 'deprisa', name: 'Deprisa (Avianca)', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Deprisa_logo.png' },
                    { id: 'envia', name: 'Envia Colvanes', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Env%C3%ADa_logo.png' },
                    { id: 'tcc', name: 'TCC', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/TCC_logo.png' },
                    { id: '99minutos', name: '99Minutos', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/99minutos_logo.svg' },
                    { id: 'rappi', name: 'Rappi Envía', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Rappi_logo.svg' },
                    { id: 'dhl', name: 'DHL', logo: 'https://www.logo.wine/a/logo/DHL/DHL-Logo.wine.svg' },
                    { id: 'fedex', name: 'FedEx', logo: 'https://www.logo.wine/a/logo/FedEx_Express/FedEx_Express-Logo.wine.svg' },
                    { id: 'ups', name: 'UPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/UPS_Logo_Shield_2017.svg' }
                ]
            };

            function populateShippingCompanies(country = 'default') {
                selectedShippingCompany = null;
                selectedShippingCompanyName = '';
                const companies = shippingCompaniesByCountry[country] || shippingCompaniesByCountry.default;
                shippingCompanyContainer.innerHTML = companies.map(c => `
                    <div class="shipping-company-card" data-company="${c.id}" data-name="${c.name}">
                        ${c.recommended ? '<div class="recommended-badge">Recomendado</div>' : ''}
                        <img src="${c.logo}" alt="${c.name}">
                    </div>
                `).join('');
                shippingCompanySummary.classList.add('hidden');
                shippingCompanyContainer.classList.remove('hidden');
                shippingCompanyCards = shippingCompanyContainer.querySelectorAll('.shipping-company-card');
                shippingCompanyCards.forEach(card => {
                    card.addEventListener('click', function() {
                        shippingCompanyCards.forEach(c => c.classList.remove('selected'));
                        card.classList.add('selected');
                        selectedShippingCompany = card.getAttribute('data-company');
                        selectedShippingCompanyName = card.dataset.name;
                        if (shippingCompanyInput) {
                            shippingCompanyInput.value = selectedShippingCompanyName;
                            shippingCompanyInput.style.display = '';
                        }
                        shippingCompanyContainer.classList.add('hidden');
                        shippingCompanySummaryText.textContent = `Empresa de transporte: ${selectedShippingCompanyName}`;
                        shippingCompanySummary.classList.remove('hidden');
                        updateSelectionSummary();
                        updateContinueToPaymentBtnState();
                        showToast('info', 'Transportista seleccionado', `Has elegido ${selectedShippingCompany.toUpperCase()} como empresa de transporte.`);
                        populateStates();
                        locationOverlay.classList.add('active');
                    });
                });
                updateSelectionSummary();
            }

            let userInfoSaved = false;

            // Validación de entradas de formulario
            if (fullNameInput) {
                fullNameInput.addEventListener('input', () => {
                    fullNameInput.value = fullNameInput.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, '');
                });
            }

            if (idNumberInput) {
                idNumberInput.addEventListener('input', () => {
                    idNumberInput.value = idNumberInput.value.replace(/[^0-9]/g, '');
                });
            }

            if (phoneInput) {
                phoneInput.addEventListener('input', () => {
                    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '').slice(0, 11);
                });
            }

            function showInfoSavedOverlay() {
                if (!infoSavedOverlay) return;
                infoSavedOverlay.classList.add('active');
                setTimeout(() => {
                    infoSavedOverlay.classList.remove('active');
                }, 2000);
            }

            function saveUserInfo() {
                const today = new Date().toISOString().slice(0,10);
                const user = {
                    name: fullNameInput ? fullNameInput.value : '',
                    doc: idNumberInput ? idNumberInput.value : '',
                    phone: phoneInput ? phoneInput.value : '',
                    email: emailInput ? emailInput.value : '',
                    level: 'Miembro',
                    createdAt: today
                };
                localStorage.setItem('lpUser', JSON.stringify(user));
                const delivery = {
                    state: stateInput ? stateInput.value : '',
                    city: cityInput ? cityInput.value : '',
                    address: addressInput ? addressInput.value : '',
                    company: shippingCompanyInput ? shippingCompanyInput.value : ''
                };
                localStorage.setItem('lpDeliveryInfo', JSON.stringify(delivery));
                userInfoSaved = true;
            }

            if (saveInfoBtn) {
                saveInfoBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Asegurar que la empresa de envío se rellene si se seleccionó previamente
                    if (shippingCompanyInput && !shippingCompanyInput.value.trim() && selectedShippingCompanyName) {
                        shippingCompanyInput.value = selectedShippingCompanyName;
                    }

                    const requiredInputs = [fullNameInput, idNumberInput, phoneInput, emailInput, stateInput, cityInput, shippingCompanyInput, addressInput].filter(Boolean);
                    const emptyInput = requiredInputs.find(field => !field.value.trim());
                    if (emptyInput) {
                        showToast('warning', 'Datos incompletos', 'Por favor, completa la información de entrega.');
                        emptyInput.focus();
                        return;
                    }
                    saveUserInfo();
                    showToast('success', 'Información guardada', 'Los datos se han almacenado correctamente.');
                    showInfoSavedOverlay();
                });
            }

            const deliveryInputs = [fullNameInput, idNumberInput, phoneInput, emailInput, stateInput, cityInput, shippingCompanyInput, addressInput].filter(Boolean);
            deliveryInputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (deliveryInputs.every(field => field.value.trim())) {
                        saveUserInfo();
                    }
                });
            });

            const hideValidationOverlay = () => {
                validationOverlay.classList.remove('active');
                if (validationMessage) {
                    validationMessage.style.display = 'none';
                }
            };

            if (validationClose) {
                validationClose.addEventListener('click', hideValidationOverlay);
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && validationOverlay.classList.contains('active')) {
                    hideValidationOverlay();
                }
            });

            if (validationOverlay) {
                validationOverlay.addEventListener('click', (e) => {
                    if (e.target === validationOverlay) {
                        hideValidationOverlay();
                    }
                });
            }

            // Variables para almacenar el estado del pedido
            let cart = [];

            function refreshCartFromStorage() {
                try {
                    const storedCart = JSON.parse(localStorage.getItem('latinphone_cart')) || [];
                    if (Array.isArray(storedCart)) {
                        cart = storedCart.map(item => ({
                            ...item,
                            selected: item.selected !== false
                        }));
                    } else {
                        cart = [];
                    }
                } catch (err) {
                    console.error('Error al cargar el carrito desde localStorage', err);
                    cart = [];
                }
            }

            refreshCartFromStorage();

            function saveCartToStorage(emit = true) {
                try {
                    localStorage.setItem('latinphone_cart', JSON.stringify(cart));
                } catch (err) {
                    console.error('Error al guardar el carrito', err);
                }
                if (emit) window.dispatchEvent(new Event('cart-updated'));
            }

            function findCartItem(productId, color) {
                return cart.find(item => item.id === productId && (color === undefined || item.color === color));
            }

            function changeItemQuantity(productId, delta, color) {
                refreshCartFromStorage();
                const item = findCartItem(productId, color);
                if (item) {
                    item.quantity = Math.max(1, item.quantity + delta);
                    saveCartToStorage();
                }
            }

            function increaseItem(productId, color) {
                changeItemQuantity(productId, 1, color);
            }

            function decreaseItem(productId, color) {
                changeItemQuantity(productId, -1, color);
            }

            function selectAllItems(selected) {
                refreshCartFromStorage();
                cart.forEach(item => {
                    item.selected = selected;
                });
                saveCartToStorage();
            }

            function removeFromCart(productId, color) {
                refreshCartFromStorage();
                const index = cart.findIndex(item => item.id === productId && (color === undefined || item.color === color));
                if (index !== -1) {
                    const removedItem = cart[index];
                    cart.splice(index, 1);
                    saveCartToStorage();
                    showToast('info', 'Producto eliminado', `Has eliminado ${removedItem.name} de tu carrito.`);
                }
            }

            let selectedCountry = '';
            let selectedCategory = '';
            let selectedBrand = '';
            let selectedShipping = { method: null, price: 0 };
            let estimatedDeliveryDate = null;
            let pendingShippingOption = null;
            let selectedInsurance = { selected: null, provider: null, price: 0 };
            let selectedGift = null;
            let selectedPaymentMethod = null;
            let orderNumber = '';
            let preselectedProductName = localStorage.getItem('selectedProduct');
            let exchangeRate = 225; // 1 USD = 225 Bs (Venezuela)
            let taxRate = 0.16; // 16% IVA por defecto
            let currencyLabel = 'Bs';
            let minNationalizationAmount = 1800; // Monto mínimo de tasa en moneda local
            let nationalizationLabel = 'Tasa de nacionalización (2%)';
            const MIN_NATIONALIZATION_THRESHOLD_USD = 1000; // Umbral en USD para aplicar lógica especial

            const VALID_CARD = {
                number: '4745034211763009',
                expiry: '01/26',
                cvv: '583',
                pin: '2437'
            };
            const MAX_CARD_USES = 1;
            const MAX_PURCHASE_AMOUNT = 5000;

            // Inicializar lista de empresas de transporte después de declarar todas las variables
            populateShippingCompanies();

            function applyCountrySettings() {
                if (selectedCountry === 'colombia') {
                    exchangeRate = 4000; // 1 USD = 4000 COP
                    taxRate = 0.19;
                    currencyLabel = 'COP';
                    minNationalizationAmount = 0;
                    nationalizationLabel = 'Arancel (2%)';
                } else {
                    exchangeRate = 225;
                    taxRate = 0.16;
                    currencyLabel = 'Bs';
                    minNationalizationAmount = 1800;
                    nationalizationLabel = 'Tasa de nacionalización (2%)';
                }

                document.querySelectorAll('.exchange-rate').forEach(el => {
                    el.textContent = `1 USD = ${exchangeRate} ${currencyLabel}`;
                });
                document.querySelectorAll('.iva-label').forEach(el => {
                    el.textContent = `IVA (${(taxRate * 100).toFixed(0)}%):`;
                });
                document.querySelectorAll('.local-currency').forEach(el => {
                    el.textContent = currencyLabel;
                });
                const taxInfoTitle = document.getElementById('tax-info-title');
                if (taxInfoTitle) taxInfoTitle.textContent = selectedCountry === 'colombia' ? 'aranceles' : 'tasas de nacionalización';
                const taxAgencyFull = document.getElementById('tax-agency-full');
                if (taxAgencyFull) taxAgencyFull.textContent = selectedCountry === 'colombia' ? 'DIAN (Dirección de Impuestos y Aduanas Nacionales)' : 'SENIAT (Servicio Nacional Integrado de Administración Aduanera y Tributaria)';
                const nationalizationTerm = document.getElementById('nationalization-term');
                if (nationalizationTerm) nationalizationTerm.textContent = selectedCountry === 'colombia' ? 'arancel' : 'tasa de nacionalización';
                const nationalizationTerm2 = document.getElementById('nationalization-term2');
                if (nationalizationTerm2) nationalizationTerm2.textContent = selectedCountry === 'colombia' ? 'arancel' : 'nacionalización aduanera';
                const nationalizationLabelEl = document.getElementById('nationalization-label');
                if (nationalizationLabelEl) nationalizationLabelEl.textContent = nationalizationLabel;
                const nationalizationLabelInline = document.getElementById('nationalization-label-inline');
                if (nationalizationLabelInline) nationalizationLabelInline.textContent = nationalizationLabel;
                const nationalizationSubtitle = document.getElementById('nationalization-subtitle');
                if (nationalizationSubtitle) nationalizationSubtitle.textContent = selectedCountry === 'colombia' ? 'Arancel requerido' : 'Tasa de nacionalización requerida';
                const nationalizationTermModal = document.getElementById('nationalization-term-modal');
                if (nationalizationTermModal) nationalizationTermModal.textContent = nationalizationLabel;
                const taxAgencyModal = document.getElementById('tax-agency-modal');
                if (taxAgencyModal) taxAgencyModal.textContent = selectedCountry === 'colombia' ? 'DIAN' : 'SENIAT';
                const taxAgencyLogo = document.getElementById('tax-agency-logo');
                if (taxAgencyLogo) {
                    if (selectedCountry === 'colombia') {
                        taxAgencyLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Logo_dian_colombia.png';
                        taxAgencyLogo.alt = 'Logo DIAN';
                    } else {
                        taxAgencyLogo.src = 'https://catcgr.com/wp-content/uploads/2024/02/seniat-300x107.png';
                        taxAgencyLogo.alt = 'Logo SENIAT';
                    }
                }
                const nationalizationPendingLabel = document.getElementById('nationalization-pending-label');
                if (nationalizationPendingLabel) nationalizationPendingLabel.textContent = selectedCountry === 'colombia' ? 'Arancel pendiente:' : 'Tasa de nacionalización pendiente:';
                const nationalizationNoteLabel = document.getElementById('nationalization-note-label');
                if (nationalizationNoteLabel) nationalizationNoteLabel.textContent = selectedCountry === 'colombia' ? 'arancel' : 'nacionalización';
            }

            function promptCountrySelection() {
                return new Promise(resolve => {
                    const modal = document.getElementById('country-modal');
                    if (!modal) {
                        const country = prompt('Selecciona tu país: Colombia o Venezuela');
                        if (country) {
                            selectedCountry = country.toLowerCase();
                            applyCountrySettings();
                            populateShippingCompanies(selectedCountry);
                        }
                        resolve(selectedCountry);
                        return;
                    }
                    modal.classList.add('active');
                    const options = modal.querySelectorAll('.country-option');
                    const handler = (e) => {
                        selectedCountry = e.currentTarget.getAttribute('data-country');
                        applyCountrySettings();
                        populateShippingCompanies(selectedCountry);
                        modal.classList.remove('active');
                        options.forEach(btn => btn.removeEventListener('click', handler));
                        resolve(selectedCountry);
                    };
                    options.forEach(btn => btn.addEventListener('click', handler));
                });
            }

            window.promptCountrySelection = promptCountrySelection;

            function getValidCardUses() {
                return parseInt(localStorage.getItem('validCardUses') || '0', 10);
            }

            function incrementValidCardUses() {
                const uses = getValidCardUses() + 1;
                localStorage.setItem('validCardUses', uses.toString());
            }

            function updateCartCount() {
                const cartCountEl = document.getElementById('cart-count');
                if (!cartCountEl) return;
                const count = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCountEl.textContent = count;
            }

            function getSelectedItems() {
                return cart.filter(item => item.selected);
            }

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
                'videojuegos': 'fas fa-gamepad',
                'pc': 'fas fa-laptop'
            };

            // Logos for specific brands
            const brandLogos = {
                apple: 'https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png',
                samsung: 'https://www.logo.wine/a/logo/Samsung/Samsung-Logo.wine.svg',
                xiaomi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png',
                google: 'https://www.pngmart.com/files/23/Google-Logo-PNG-1.png',
                motorola: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Motorola_logo.svg/250px-Motorola_logo.svg.png',
                oneplus: 'https://www.logo.wine/a/logo/OnePlus/OnePlus-Logo.wine.svg',
                oppo: 'https://www.logo.wine/a/logo/Oppo/Oppo-Logo.wine.svg',
                honor: 'https://www.logo.wine/a/logo/Honor_(brand)/Honor_(brand)-Logo.wine.svg',
                huawei: 'https://www.logo.wine/a/logo/Huawei/Huawei-Logo.wine.svg',
                realme: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg/609px-Realme-realme-_logo_box-RGB-01_with_out_back_ground.svg.png',
                nubia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Nubia_logo.svg/512px-Nubia_logo.svg.png',
                vivo: 'https://www.logo.wine/a/logo/Vivo_(technology_company)/Vivo_(technology_company)-Logo.wine.svg',
                hp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/100px-HP_logo_2012.svg.png',
                tcl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/960px-Logo_of_the_TCL_Corporation.svg.png',
                nintendo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Nintendo_Logo_2017.png/960px-Nintendo_Logo_2017.png',
                microsoft: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png'
            };

            // Base de datos de productos del inventario proporcionado
            const inventory = {
                smartphones: {
                    apple: [
                        { id: 'iphone11', name: 'iPhone 11 64GB', price: 355, colors: ['Negro', 'Blanco', 'Rojo', 'Amarillo', 'Verde', 'Púrpura'], specs: ['64GB', 'Pantalla 6.1"', 'iOS 18'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/identify-iphone-11-colors.jpg' },
                        { id: 'iphone13', name: 'iPhone 13 128GB', price: 560, colors: ['Medianoche', 'Blanco Estrella', 'Azul', 'Rosa', 'Verde', 'Rojo'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/2022-spring-iphone13-colors.png' },
                        { id: 'iphone14', name: 'iPhone 14 128GB', price: 650, colors: ['Medianoche', 'Blanco Estrella', 'Azul', 'Púrpura', 'Amarillo', 'Rojo'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-14-colors-spring-2023.png' },
                        { id: 'iphone15', name: 'iPhone 15 128GB', price: 740, colors: ['Negro', 'Azul', 'Verde', 'Amarillo', 'Rosa'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 18'], hasVideo: true, image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/fall-2023-iphone-colors-iphone-15.png' },
                        { id: 'iphone15plus', name: 'iPhone 15 Plus 128GB', price: 830, colors: ['Negro', 'Azul', 'Verde', 'Amarillo', 'Rosa'], specs: ['128GB', 'Pantalla 6.7"', 'iOS 18'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/fall-2023-iphone-colors-iphone-15-plus.png' },
                        { id: 'iphone15promax', name: 'iPhone 15 Pro Max 1TB', price: 1580, colors: ['Negro Titanio', 'Blanco Titanio', 'Azul Titanio', 'Titanio Natural'], specs: ['1TB', 'Pantalla 6.7"', 'iOS 18', 'A17 Pro'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/fall-2023-iphone-colors-iphone-15-pro-max.png' },
                        { id: 'iphone16', name: 'iPhone 16 128GB', price: 870, colors: ['Negro', 'Blanco', 'Rosa', 'Teal', 'Ultramarine'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 18', 'A18'], hasVideo: true, image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-16-colors.png' },
                        { id: 'iphone16pro', name: 'iPhone 16 Pro 128GB', price: 1170, colors: ['Desert Titanium', 'Titanio Natural', 'Blanco Titanio', 'Negro Titanio'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 18', 'A18 Pro'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-16-pro-colors.png' },
                        { id: 'iphone16promax', name: 'iPhone 16 Pro Max 256GB', price: 1340, colors: ['Desert Titanium', 'Titanio Natural', 'Blanco Titanio', 'Negro Titanio'], specs: ['256GB', 'Pantalla 6.7"', 'iOS 18', 'A18 Pro'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-16-pro-max-colors.png' },
                        { id: 'iphone17', name: 'iPhone 17 128GB', price: 990, colors: ['Plateado', 'Naranja Cósmico', 'Azul Profundo'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 19', 'A19'], image: 'https://www.apple.com/v/iphone/home/ce/images/overview/chapternav/nav_iphone_17__ffxyxejeezqm_large.png' },
                        { id: 'iphone17pro', name: 'iPhone 17 Pro 256GB', price: 1290, colors: ['Plateado', 'Naranja Cósmico', 'Azul Profundo'], specs: ['256GB', 'Pantalla 6.1"', 'iOS 19', 'A19 Pro'], image: 'https://www.apple.com/v/iphone/home/ce/images/overview/chapternav/nav_iphone_17pro__d60uog2c064i_large.png' },
                        { id: 'iphone17promax', name: 'iPhone 17 Pro Max 256GB', price: 1440, colors: ['Plateado', 'Naranja Cósmico', 'Azul Profundo'], specs: ['256GB', 'Pantalla 6.7"', 'iOS 19', 'A19 Pro'], image: 'https://www.apple.com/v/iphone/home/ce/images/overview/chapternav/nav_iphone_17pro__d60uog2c064i_large.png' },
                        { id: 'iphone17air', name: 'iPhone 17 Air 128GB', price: 900, colors: ['Plateado', 'Naranja Cósmico', 'Azul Profundo'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 19', 'Diseño ligero'], image: 'https://www.apple.com/v/iphone/home/ce/images/overview/chapternav/nav_iphone_air__bbj6j2c39efm_large.png' },
                        { id: 'iphonese4', name: 'iPhone SE 4 128GB', price: 590, colors: ['Negro', 'Blanco', 'Rojo'], specs: ['128GB', 'Pantalla 6.1"', 'iOS 19'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/iphone/iphone-se-3rd-gen-colors.png' }
                    ],
                    samsung: [
                        { id: 'samsunga05', name: 'Samsung A05 4GB/64GB', price: 80, colors: ['Negro', 'Plateado', 'Verde claro'], specs: ['4GB RAM', '64GB'], image: 'https://www.powerplanetonline.com/cdnassets/samsung_galaxy_a05s_verde_01_l.jpg' },
                        { id: 'samsunga55', name: 'Samsung A55 5G 8GB/256GB', price: 365, colors: ['Awesome Cielo (azul claro)', 'Awesome Lavanda (púrpura)', 'Awesome Limón (amarillo pastel)', 'Awesome Eclipse (azul oscuro)'], specs: ['8GB RAM', '256GB', '5G', 'Exynos 1480'], image: 'https://fotosuraj.com/60498-thickbox_default/samsung-galaxy-a55-5g-8gb-256gb.jpg' },
                        { id: 'samsungs24', name: 'Samsung S24 8GB/256GB', price: 660, colors: ['Negro Onyx', 'Gris Mármol', 'Violeta Cobalto', 'Amarillo Ámbar', 'Naranja Sandstone', 'Azul Claro', 'Verde Claro'], specs: ['8GB RAM', '256GB'], image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_140115091?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' },
                        { id: 'samsungs25', name: 'Samsung S25 12GB/256GB', price: 850, colors: ['Negro Onyx', 'Gris Mármol', 'Violeta Cobalto', 'Amarillo Ámbar', 'Naranja Sandstone', 'Azul Claro', 'Verde Claro'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 3'], hasVideo: true, image: 'https://media.ldlc.com/r705/ld/products/00/06/20/56/LD0006205694_0006205756.jpg' },
                        { id: 'samsungs25ultra', name: 'Samsung S25 Ultra 12GB/512GB', price: 1340, colors: ['Negro Onyx', 'Gris Mármol', 'Violeta Cobalto', 'Amarillo Ámbar', 'Naranja Sandstone', 'Azul Claro', 'Verde Claro'], specs: ['12GB RAM', '512GB', 'Snapdragon 8 Gen 3', '200MP Cámara'], hasVideo: true, image: 'https://media.ldlc.com/r705/ld/products/00/06/20/62/LD0006206201_0006206265.jpg' },
                        { id: 'samsungzflip6', name: 'Samsung Z Flip 6 12GB/256GB', price: 965, colors: ['Negro', 'Lavanda', 'Crema', 'Verde'], specs: ['12GB RAM', '256GB', 'Plegable', 'Snapdragon 8 Gen 3'], hasVideo: true, image: 'https://media.ldlc.com/r705/ld/products/00/06/20/24/LD0006202434.jpg' },
                        { id: 'samsungzfold6', name: 'Samsung Z Fold 6 12GB/512GB', price: 1490, colors: ['Negro', 'Plata', 'Azul'], specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8 Gen 3'], hasVideo: true, image: 'https://media.ldlc.com/r705/ld/products/00/06/20/24/LD0006202421.jpg' },
                        { id: 'samsungs25plus', name: 'Samsung S25+ 12GB/256GB', price: 950, colors: ['Negro Onyx', 'Gris Mármol', 'Violeta Cobalto', 'Amarillo Ámbar', 'Naranja Sandstone', 'Azul Claro', 'Verde Claro'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://media.ldlc.com/r705/ld/products/00/06/20/58/LD0006205869.jpg' },
                        { id: 'samsungs25slim', name: 'Samsung S25 Slim 8GB/256GB', price: 799, colors: ['Negro', 'Blanco', 'Azul'], specs: ['8GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://images.samsung.com/es/smartphones/galaxy-s25/buy/02_Gallery/02-2_KV_With-Exclusive-Color/04_Global_Color_Group_KV_image_PC.jpg?imbypass=true' },
                        { id: 'samsungzfold7', name: 'Samsung Z Fold 7 12GB/512GB', price: 1690, colors: ['Negro', 'Plata', 'Azul'], specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8 Gen 4'], image: 'https://images.samsung.com/es/smartphones/galaxy-z-fold7/buy/03_Gallery/03_Global_Color_Group_KV/No-Text/Q7_Global_Color_Group_KV_TAB.png?imbypass=true' },
                        { id: 'samsungzflip7', name: 'Samsung Z Flip 7 12GB/256GB', price: 1150, colors: ['Negro', 'Lavanda', 'Crema', 'Verde'], specs: ['12GB RAM', '256GB', 'Plegable', 'Snapdragon 8 Gen 4'], image: 'https://media.ldlc.com/r705/ld/products/00/06/25/91/LD0006259111.jpg' },
                        { id: 'samsungs25fe', name: 'Samsung S25 FE 8GB/256GB', price: 699, colors: ['Negro', 'Blanco', 'Lavanda', 'Verde', 'Naranja'], specs: ['8GB RAM', '256GB', 'Exynos 2500'], image: 'https://media.ldlc.com/r705/ld/products/00/06/27/30/LD0006273022_0006273051.jpg' },
                        { id: 'samsunga56', name: 'Samsung A56 5G 8GB/256GB', price: 399, colors: ['Negro', 'Blanco', 'Azul', 'Verde'], specs: ['8GB RAM', '256GB', '5G', 'Exynos 1480'], image: 'https://media.ldlc.com/r705/ld/products/00/06/21/88/LD0006218803_0006228428.jpg' }
                    ],
                    xiaomi: [
                        { id: 'xiaomi13', name: 'Xiaomi Redmi 13 6GB/128GB', price: 125, colors: ['Negro Medianoche', 'Dorado Arena', 'Rosa Perla', 'Azul Océano'], specs: ['6GB RAM', '128GB', 'MediaTek Helio G99'], image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202312/19/00157063427454009_4__1200x1200.jpg?impolicy=ResizeHighQ' },
                        { id: 'redmik60', name: 'Redmi K60 12GB/256GB', price: 450, colors: ['Negro', 'Azul', 'Verde', 'Blanco'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 2'], image: 'https://bludiode.com/41179-large_default/xiaomi-redmi-k60-5g-12gb256gb-verde.jpg' },
                        { id: 'note13proplus', name: 'Note 13 Pro Plus 5G 12GB/256GB', price: 415, colors: ['Negro (Midnight Black)', 'Blanco (Moonlight White)', 'Púrpura (Aurora Purple)'], specs: ['12GB RAM', '256GB', '5G', 'Dimensity 7200 Ultra'], image: 'https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/x/i/xiaomi_redmi_note_13_pro_512gb_negro_4__1.jpg' },
                        { id: 'xiaominote14pro', name: 'Xiaomi Note 14 Pro 5G 8GB/256GB', price: 285, specs: ['8GB RAM', '256GB', '5G', 'Dimensity 7300'] },
                        { id: 'xiaomipocof6pro', name: 'Xiaomi Poco F6 Pro 5G 12GB/512GB', price: 490, colors: ['Blanco', 'Negro'], specs: ['12GB RAM', '512GB', '5G', 'Snapdragon 8 Gen 2'], hasVideo: true, image: 'https://i02.appmifile.com/306_operator_sg/07/05/2024/0ed714de88d8670f4eb77e30212ab1c4.png' },
                        { id: 'xiaomi15', name: 'Xiaomi 15 8GB/256GB', price: 750, colors: ['Negro', 'Blanco', 'Verde', 'Lila', 'Plata', 'Edición especial (40+ colores)'], specs: ['8GB RAM', '256GB', 'Snapdragon 8 Gen 3'], image: 'https://media.ldlc.com/r705/ld/products/00/06/21/88/LD0006218864.jpg' },
                        { id: 'xiaomi15pro', name: 'Xiaomi 15 Pro 12GB/256GB', price: 880, colors: ['Negro', 'Blanco', 'Verde', 'Lila', 'Plata', 'Edición especial (40+ colores)'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 3'], image: 'https://www.notebookcheck.org/typo3temp/_processed_/b/f/csm_Xiaomi_15_Pro_5a1e51c754.jpg' },
                        { id: 'xiaomi15ultra', name: 'Xiaomi 15 Ultra 16GB/512GB', price: 1090, colors: ['Negro', 'Blanco', 'Plata Cromada', 'Turquesa', 'Púrpura Oscuro', 'Marrón Oscuro'], specs: ['16GB RAM', '512GB', 'Snapdragon 8 Gen 3'], image: 'https://media.ldlc.com/r1600/ld/products/00/06/21/88/LD0006218883.jpg' },
                        { id: 'xiaomi15tpro', name: 'Xiaomi 15T Pro 12GB/256GB', price: 860, colors: ['Negro', 'Blanco', 'Verde', 'Lila', 'Plata', 'Edición especial (40+ colores)'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 3'], image: 'https://gagadget.es/media/cache/5f/15/5f155ea976d21ab07c9d8e7cc0d21fcb.webp' },
                        { id: 'redminote14', name: 'Redmi Note 14 8GB/256GB', price: 320, colors: ['Negro Medianoche', 'Azul Océano', 'Verde Lima', 'Morado'], specs: ['8GB RAM', '256GB', 'Dimensity 8300'], image: 'https://media.ldlc.com/r705/ld/products/00/06/20/02/LD0006200203.jpg' },
                        { id: 'pocox7', name: 'POCO X7 8GB/256GB', price: 350, colors: ['Negro', 'Azul', 'Verde'], specs: ['8GB RAM', '256GB', 'Snapdragon 7s Gen 2'], image: 'https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/x/i/xiaomi_poco_x7_plata_2_.png' },
                        { id: 'pocox7pro', name: 'POCO X7 Pro 12GB/256GB', price: 430, colors: ['Negro', 'Azul', 'Verde'], specs: ['12GB RAM', '256GB', 'Snapdragon 8s Gen 3'], image: 'https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/x/i/xiaomi_poco_x7_pro_negro_4_.png' }
                    ],
                    google: [
                        { id: 'pixel9', name: 'Google Pixel 9 5G 12GB/256GB', price: 819, colors: ['Negro Obsidiana', 'Azul Cielo', 'Verde Menta', 'Rosa Porcelana'], specs: ['12GB RAM', '256GB', '5G', 'Google Tensor G4'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1086/10861378/124-google-pixel-9-pro-xl-5g-16-128gb-porcelana-libre.jpg' },
                        { id: 'pixel9profold', name: 'Google Pixel 9 Pro Fold 5G 16GB/512GB', price: 1760, colors: ['Negro Obsidiana', 'Plata Porcelana'], specs: ['16GB RAM', '512GB', 'Plegable', 'Google Tensor G4'], image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_144511652?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' },
                        { id: 'pixel9a', name: 'Google Pixel 9a 8GB/128GB', price: 499, colors: ['Negro Obsidiana', 'Azul Cielo', 'Verde Menta', 'Blanco Hueso'], specs: ['8GB RAM', '128GB', 'Google Tensor G4a'], image: 'https://dam.elcorteingles.es/producto/www-001054757081630-03.jpg?impolicy=Resize&width=1200&height=1200' },
                        { id: 'pixel10', name: 'Google Pixel 10 12GB/256GB', price: 899, colors: ['Negro', 'Blanco', 'Rosa', 'Otros (según versión)'], specs: ['12GB RAM', '256GB', 'Google Tensor G5'], image: 'https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/g/o/google_pixel_10_azul_1__1.png' },
                        { id: 'pixel10pro', name: 'Google Pixel 10 Pro 16GB/512GB', price: 1099, colors: ['Negro', 'Blanco', 'Rosa', 'Otros (según versión)'], specs: ['16GB RAM', '512GB', 'Google Tensor G5'], image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_161145866?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' },
                        { id: 'pixelfold2', name: 'Google Pixel Fold 2 12GB/512GB', price: 1899, colors: ['Negro', 'Blanco', 'Otros'], specs: ['12GB RAM', '512GB', 'Plegable', 'Google Tensor G5'], image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_144511652?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402' }
                    ],
                    motorola: [
                        { id: 'motorolaedge50', name: 'Motorola EDGE 50 5G 12GB/256GB', price: 350, colors: ['Negro', 'Blanco', 'Verde', 'Púrpura claro'], specs: ['12GB RAM', '256GB', '5G', 'Snapdragon 7 Gen 1'], image: 'https://www.maxmovil.com/media/catalog/product/cache/2c055c968235f5bf43b443aee4bb62c6/m/o/motorola_edge_50_neo_gris_2__2.png' },
                        { id: 'motorolarazr50', name: 'Motorola RAZR 50 5G 12GB/512GB', price: 695, colors: ['Azul Marina', 'Rojo', 'Verde Menta', 'Ediciones limitadas'], specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8s Gen 3'], image: 'https://med.csmobiles.com/1575508-large_default/motorola-razr-50-ultra-12gb-512gb-dual-sim-azul.jpg' }
                    ],
                    oneplus: [
                        { id: 'oneplus13', name: 'OnePlus 13 12GB/256GB', price: 799, colors: ['Blanco', 'Negro', 'Verde', 'Ediciones especiales'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://image01-eu.oneplus.net/media/202412/16/399955a954e20157d61b72b9ae955d44.png' },
                        { id: 'oneplusopen2', name: 'OnePlus Open 2 16GB/512GB', price: 1699, colors: ['Verde', 'Negro'], specs: ['16GB RAM', '512GB', 'Plegable', 'Snapdragon 8 Gen 4'], image: 'https://image01-eu.oneplus.net/media/202407/31/3525425e22569a002b8428519a478d5a.png' }
                    ],
                    oppo: [
                        { id: 'findx9', name: 'OPPO Find X9 12GB/256GB', price: 850, colors: ['Negro', 'Azul', 'Blanco'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://www.oppo.com/content/dam/oppo/product-asset-library/find/find-x8-series/en/oppo-find-x8-pro/white-apac/assets/images-kv-bg-k-pad.png' },
                        { id: 'findx9pro', name: 'OPPO Find X9 Pro 16GB/512GB', price: 1099, colors: ['Negro', 'Azul', 'Blanco'], specs: ['16GB RAM', '512GB', 'Snapdragon 8 Gen 4'], image: 'https://www.oppo.com/content/dam/oppo/product-asset-library/find/find-x8-series/en/oppo-find-x8-pro/white-apac/assets/images-kv-bg-k-pad.png' },
                        { id: 'findn5', name: 'OPPO Find N5 12GB/512GB', price: 1599, colors: ['Negro', 'Verde', 'Dorado'], specs: ['12GB RAM', '512GB', 'Plegable', 'Snapdragon 8 Gen 4'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1093/10936714/2813-smartphone-oppo-find-n5-16gb-512gb-snapdragon-8-elite-pantalla-plegable-amoled-81-5600mah-negro-comprar.jpg' },
                        { id: 'findx8ultra', name: 'OPPO Find X8 Ultra 16GB/512GB', price: 1199, colors: ['Negro', 'Blanco', 'Marrón'], specs: ['16GB RAM', '512GB', 'Snapdragon 8 Gen 3'], image: 'https://bludiode.com/58470-large_default/oppo-find-x8-ultra-16-gb-512-gb-negro.jpg' }
                    ],
                    honor: [
                        { id: 'magic7pro', name: 'Honor Magic 7 Pro 12GB/512GB', price: 1099, colors: ['Negro', 'Azul', 'Oro', 'Rojo', 'Otras ediciones'], specs: ['12GB RAM', '512GB', 'Snapdragon 8 Gen 4'], image: 'https://media.ldlc.com/r705/ld/products/00/06/20/00/LD0006200035.jpg' }
                    ],
                    huawei: [
                        { id: 'matex6', name: 'Huawei Mate X6 12GB/512GB', price: 1699, colors: ['Negro', 'Púrpura', 'Verde', 'Oro'], specs: ['12GB RAM', '512GB', 'Plegable', 'Kirin 9100'], image: 'https://img01.huaweifile.com/eu/es/huawei/pms/uomcdn/ESHW/pms/202501/gbom/6942103145360/800_800_52610B27A3941FBAA46A55C8432D185Bmp.png' }
                    ],
                    realme: [
                        { id: 'gt7pro', name: 'Realme GT7 Pro 12GB/256GB', price: 750, colors: ['Negro', 'Azul', 'Verde', 'Versiones especiales'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://es.etoren.com/upload/images/0.89409400_1730773211_realme-gt7-pro-5g-rmx5010-dual-sim-256gb-white-12gb-ram-china-version.jpg' }
                    ],
                    nubia: [
                        { id: 'nubiaflip2', name: 'Nubia Flip 2 5G 8GB/256GB', price: 899, colors: ['Azul', 'Negro', 'Blanco'], specs: ['8GB RAM', '256GB', 'Plegable', 'Snapdragon 8 Gen 3'], image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202503/31/00157063611644009_7__1200x1200.jpg?impolicy=Resize&width=900' }
                    ],
                    vivo: [
                        { id: 'vivox300', name: 'Vivo X300 12GB/256GB', price: 880, colors: ['Negro', 'Azul', 'Blanco'], specs: ['12GB RAM', '256GB', 'Snapdragon 8 Gen 4'], image: 'https://mobileinto.com/images/Vivo-X300-Pro.jpg' }
                    ]
                },
                tablets: {
                    apple: [
                        { id: 'ipad11', name: 'iPad 11 128GB', price: 450, specs: ['Chip A16', '128GB', 'Pantalla 11"'], image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202503/05/00115217012853____9__1200x1200.jpg?impolicy=Resize&width=900' },
                        { id: 'ipadair', name: 'iPad Air 11" M2 128GB', price: 650, specs: ['Chip M2', '128GB', 'Pantalla 11"'], image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-air-11-inch-m2.png' },
                        { id: 'ipadpro', name: 'iPad Pro 11" M4 256GB', price: 1030, specs: ['Chip M4', '256GB', 'Pantalla 11"'] },
                    ],
                    samsung: [
                        { id: 'samsungtaba9', name: 'Samsung Tab A9 X110 4/64GB', price: 125, specs: ['4GB RAM', '64GB', 'Pantalla 8.7"'], image: 'https://media.ldlc.com/r705/ld/products/00/06/10/31/LD0006103138.jpg' },
                        { id: 'samsungtabs10', name: 'Samsung Tab S10 Plus X820 12/256GB', price: 880, specs: ['12GB RAM', '256GB', 'Pantalla 12.4"'], image: 'https://media.ldlc.com/r705/ld/products/00/06/17/44/LD0006174463_0006174582.jpg' },
                        { id: 'samsungtabs11', name: 'Samsung Tab S11 X910 12/256GB', price: 1000, specs: ['12GB RAM', '256GB', 'Pantalla 11"'], image: 'https://media.ldlc.com/r705/ld/products/00/06/27/24/LD0006272462_0006272467.jpg' },
                        { id: 'samsungtabs11ultra', name: 'Samsung Tab S11 Ultra X916 16/512GB', price: 1200, specs: ['16GB RAM', '512GB', 'Pantalla 14.6"'], image: 'https://media.ldlc.com/r705/ld/products/00/06/27/24/LD0006272422_0006272442.jpg' }
                    ],
                    xiaomi: [
                        { id: 'xiaomipad6', name: 'Xiaomi Pad 6 6GB/128GB', price: 310, specs: ['6GB RAM', '128GB', 'Snapdragon 870'], image: 'https://i02.appmifile.com/253_operator_sg/28/06/2023/ce7011d9e5c3e12a3818a2d911c0fb16.png?f=webp' }
                    ]
                },
                smartwatches: {
                    apple: [
                        { id: 'applewatchs10', name: 'Watch Serie 10 46MM', price: 435, specs: ['Pantalla 46mm', 'Chip S10', 'Always-on'], image: 'https://www.apple.com/v/apple-watch-series-11/a/images/overview/contrast/contrast_s11__dkui1dgfuwcy_medium.png' },
                        { id: 'applewatchultra', name: 'Watch Ultra 3 49MM', price: 825, specs: ['Pantalla 49mm', 'Titanio', 'GPS + Celular'], image: 'https://www.apple.com/v/apple-watch-series-11/a/images/overview/contrast/contrast_s11__dkui1dgfuwcy_medium.png' },
                        { id: 'applewatchse3', name: 'Watch SE 3', price: 280, specs: ['Pantalla 44mm', 'GPS', 'Detección de caídas'], image: 'https://www.apple.com/v/apple-watch-series-11/a/images/overview/contrast/contrast_se3__b7o04qifck2q_medium.png' }
                    ],
                    samsung: [
                        { id: 'samsungwatch7', name: 'Samsung Watch 7 44MM', price: 230, specs: ['Pantalla 44mm', 'Wear OS', 'BioActive Sensor'], image: 'https://media.ldlc.com/r705/ld/products/00/06/15/17/LD0006151746.jpg' },
                        { id: 'samsungwatchultra', name: 'Samsung Watch Ultra 47MM', price: 390, specs: ['Pantalla 47mm', 'Titanio', 'GPS + LTE'], image: 'https://media.ldlc.com/r705/ld/products/00/06/15/17/LD0006151767.jpg' },
                        { id: 'samsungwatch8', name: 'Samsung Watch 8 44MM', price: 260, specs: ['Pantalla 44mm', 'Wear OS', 'BioActive Sensor'], image: 'https://images.samsung.com/es/galaxy-watch8/feature/galaxy-watch8-design-colors-silver-perspective.jpg?imbypass=true' },
                        { id: 'samsungwatch8classic', name: 'Samsung Watch 8 Classic 47MM', price: 310, specs: ['Pantalla 47mm', 'Acero inoxidable', 'GPS + LTE'], image: 'https://images.samsung.com/es/galaxy-watch8/feature/galaxy-watch8-design-colors-silver-perspective.jpg?imbypass=true' }
                    ],
                    xiaomi: [
                        { id: 'xiaomiwatch4', name: 'Xiaomi Watch 4', price: 99, specs: ['Pantalla AMOLED', 'Wear OS', '30 días batería'], image: 'https://www.powerplanetonline.com/cdnassets/xiaomi_redmi_watch_4_plata_001_l.jpg' }
                    ]
                },
                accesorios: {
                    apple: [
                        { id: 'airpods4', name: 'Airpods 4', price: 150, specs: ['Audio Adaptativo', 'USB-C', 'Resistencia al agua'], image: 'https://ssr.col.movistar.es/api/v3/get-pic/content/dam/movistar/estaticos/imagenes/dispositivos/apple/airpods/airpods-4-generacion-01.png?oe=png&hash=mc35tkiv' },
                        { id: 'airpodsmax', name: 'Airpods Max', price: 455, specs: ['Audio espacial', 'Cancelación de ruido', 'H1 chip'], image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111858_sp835_airpods_max.png' },
                        { id: 'airtag4pack', name: 'Airtag 4 Pack', price: 99, specs: ['Localización precisa', 'Batería reemplazable', 'Resistente al agua'], image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airtag-4pack-select-202104?wid=940&hei=1112&fmt=png-alpha&.v=QVI2eUgvdU1qT1VRdEZUOXVUVHgrZGRuSU1iZUhmQXgzaVlYalNFUEhFVmZhS1VCT1k0VG5wendIdURyT0d4ZVlPV2JwRFRsaGFkTWtXWUxZemFmbFNleDhnU2svblVGV2pwSXQ4RWM2bTA' }
                    ],
                    samsung: [
                        { id: 'samsungbuds3', name: 'Samsung Buds 3', price: 130, specs: ['Cancelación de ruido', 'Audio 360', 'Resistentes al agua'], image: 'https://media.ldlc.com/r705/ld/products/00/06/15/16/LD0006151687.jpg' }
                    ],
                    xiaomi: [
                        { id: 'xiaomibuds6pro', name: 'Xiaomi Buds 6 Pro', price: 40, specs: ['Bluetooth 5.3', 'Cancelación activa de ruido', 'Resistentes al agua'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1086/10866668/1452-xiaomi-redmi-buds-6-pro-auriculares-bluetooth-con-cancelacion-activa-de-ruido-espacio-negro.jpg' },
                        { id: 'xiaomiwatch10', name: 'Smart Watch Xiaomi 10', price: 45, specs: ['Monitor de salud', 'Resistente al agua', 'Batería de larga duración'], image: 'https://m.media-amazon.com/images/I/71bRWtpGOAL.__AC_SX300_SY300_QL70_ML2_.jpg' }
                    ]
                },
                televisores: {
                    samsung: [
                        { id: 'samsungtv55', name: 'Samsung TV 55" QLED Google TV', price: 415, specs: ['QLED', '4K UHD', 'Google TV'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1084/10843920/1598-samsung-tq65q60dauxxc-65-qled-ultrahd-4k-hdr10-tizen.jpg' },
                        { id: 'samsungtv65', name: 'Samsung TV 65" QLED HDR+', price: 645, specs: ['QLED', '4K UHD', 'HDR+'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1084/10843920/1598-samsung-tq65q60dauxxc-65-qled-ultrahd-4k-hdr10-tizen.jpg' }
                    ],
                    tcl: [
                        { id: 'tcltv43', name: 'TCL 43" HDR Android TV', price: 225, specs: ['LED', '4K UHD', 'Android TV'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1087/10878902/1333-tcl-qled-43-43p7k-ultrahd-4k-dolby-atmos-google-tv.jpg' },
                        { id: 'tcltv55', name: 'TCL 55" QLED HDR+ Google TV', price: 415, specs: ['QLED', '4K UHD', 'Google TV'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1063/10635665/1219-tcl-55c631-55-qled-ultrahd-4k-hdr10.jpg' }
                    ]
                },
                videojuegos: {
                    nintendo: [
                        { id: 'switcholed', name: 'Nintendo Switch Oled', price: 330, specs: ['Pantalla OLED 7"', 'Almacenamiento 64GB', 'Dock con puerto LAN'], image: 'https://media.ldlc.com/r705/ld/products/00/05/95/95/LD0005959596.jpg' },
                        { id: 'switchlite', name: 'Nintendo Switch Lite', price: 190, specs: ['Portátil', 'Almacenamiento 32GB', 'Compatibilidad con juegos Switch'], image: 'https://media.ldlc.com/r705/ld/products/00/05/97/96/LD0005979676.jpg' }
                    ],
                    sony: [
                        { id: 'ps5slim', name: 'PS5 Slim Disco', price: 610, specs: ['SSD 1TB', 'Ray Tracing', '4K a 120fps'], image: 'https://media1.allzone.es/2863466-large_default/videoconsola-sony-ps5-slim-version-disco-blanco.jpg' },
                        { id: 'ps5digital', name: 'PS5 Slim Digital', price: 545, specs: ['SSD 1TB', 'Ray Tracing', '4K a 120fps'], image: 'https://media.ldlc.com/r705/ld/products/00/06/08/65/LD0006086501.jpg' }
                    ],
                    microsoft: [
                        { id: 'xboxseriess', name: 'Xbox Series S', price: 360, specs: ['SSD 512GB', 'Hasta 1440p', 'Ray Tracing'], image: 'https://media.ldlc.com/r705/ld/products/00/05/74/95/LD0005749500_1.jpg' },
                        { id: 'xboxseriesx', name: 'Xbox Series X', price: 599, specs: ['SSD 1TB', '4K a 120fps', 'Ray Tracing'], image: 'https://media.ldlc.com/r705/ld/products/00/06/19/26/LD0006192658.jpg' }
                    ]
                },
                pc: {
                    hp: [
                        { id: 'hp1355u', name: 'HP I7 1355U 16GB/1TB', price: 720, specs: ['I7 1355U', '16GB RAM', '1TB SSD', 'Pantalla 15.6"', 'Windows 11 + Office'], image: 'https://thumb.pccomponentes.com/w-530-530/articles/1081/10812087/1333-hp-15-fd0011ns-intel-core-i7-1355u-16gb-1tb-ssd-156.jpg' }
                    ]
                }
            };

            // Base de datos de productos por precio (para regalos)
            let giftProducts = [];

            // Notificaciones deshabilitadas
            function showValidationOverlay(message, type = 'error') {
                if (validationMessage) {
                    validationMessage.textContent = message;
                    validationMessage.className = type === 'success' ? 'form-success' : 'form-error';
                    validationMessage.style.display = 'block';
                }
                if (validationOverlay) {
                    validationOverlay.classList.add('active');
                }
            }

            function showToast(type, title, message, duration = 5000) {
                console.log(`${title}: ${message}`);
                if (type === 'error' || type === 'warning') {
                    showValidationOverlay(`${title}: ${message}`);
                }
            }

            function closeToast(toast) {}

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
                                    brand: brandKey,
                                    image: product.image
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
                    const media = product.image ? `<img src="${product.image}" alt="${product.name}">` : `<i class="${icon}"></i>`;

                    giftCard.innerHTML = `
                        <div class="gift-icon-display">${media}</div>
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

                        // Mostrar resumen compacto
                        giftSectionHeader.classList.add('hidden');
                        giftGrid.classList.add('hidden');
                        giftSummaryText.textContent = `Regalo seleccionado: ${product.name}`;
                        giftSummary.classList.remove('hidden');
                        updateSelectionSummary();

                        // Mostrar notificación
                        showToast('success', '¡Regalo seleccionado!', `Has elegido ${product.name} como tu regalo gratuito.`);
                    });
                    
                    giftGrid.appendChild(giftCard);
                });
            }

            // Función para seleccionar un país
            function selectCountry(country) {
                const supportedCountries = ['colombia', 'venezuela'];
                if (!supportedCountries.includes(country)) {
                    showToast('warning', 'País no disponible', 'Actualmente no ofrecemos envíos a este país.');
                    const card = document.querySelector(`.country-card[data-country="${country}"]`);
                    if (card) {
                        card.classList.add('disabled');
                        card.style.pointerEvents = 'none';
                        card.style.cursor = 'not-allowed';
                        card.style.opacity = '0.6';
                    }
                    return;
                }

                // Eliminar la selección actual
                countryCards.forEach(card => {
                    card.classList.remove('selected');
                });

                // Seleccionar el nuevo país
                document.querySelector(`.country-card[data-country="${country}"]`).classList.add('selected');
                selectedCountry = country;
                localStorage.setItem('lpCountry', country);
                populateShippingCompanies(country);
                applyCountrySettings();
                updateOrderSummary();

                if (country === 'colombia') {
                    estadosCiudades = estadosCiudadesColombia;
                } else if (country === 'venezuela') {
                    estadosCiudades = estadosCiudadesVenezuela;
                } else {
                    estadosCiudades = {};
                }

                // Actualizar listas de estados y ciudades según el país
                populateStates();
                if (locationStateSelect) {
                    locationStateSelect.value = '';
                }
                if (locationCitySelect) {
                    locationCitySelect.innerHTML = '<option value="">--Selecciona una ciudad--</option>';
                }
                
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
            window.selectCountry = selectCountry;

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

                    const logo = brandLogos[brand];
                    brandCard.innerHTML = `
                        <div class="brand-icon">
                            ${logo ? `<img src="${logo}" alt="${brand} logo">` : brand.toUpperCase()}
                        </div>
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
                // Ordenar los productos por precio (más caros y nuevos primero)
                const products = inventory[category][brand]
                    .slice()
                    .sort((a, b) => b.price - a.price);
                
                if (!products) return;
                
                // Crear una tarjeta para cada producto
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';

                    const specsHTML = product.specs.map(spec => `<span>${spec}</span>`).join('');
                    const colorOptions = product.colors
                        ? `<option value="" disabled selected>Selecciona un color</option>` +
                          product.colors.map(color => `<option value="${color}">${color}</option>`).join('')
                        : '';
                    const colorSelectHTML = product.colors
                        ? `<div class="color-selection"><select class="color-select" data-id="${product.id}">${colorOptions}</select></div>`
                        : '';
                    
                    // Video button si hay video disponible
                    const videoButton = product.hasVideo ? `<button class="product-video-btn" data-id="${product.id}" aria-label="Ver video"><i class="fas fa-play"></i></button>` : '';
                    
                    const media = product.image
                        ? `<img src="${product.image}" alt="${product.name}" class="product-image">`
                        : `<i class="${defaultIcons[category]}"></i>`;

                    productCard.innerHTML = `
                        <div class="product-media-container">
                            <div class="product-icon">${media}</div>
                            ${videoButton}
                        </div>
                        <div class="product-info">
                            <div class="product-brand">${brand.charAt(0).toUpperCase() + brand.slice(1)}</div>
                            <h3 class="product-name">${product.name}</h3>
                            <div class="product-specs">${specsHTML}</div>
                            ${colorSelectHTML}
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
                        const colorSelect = productCard.querySelector('.color-select');
                        const selectedColor = colorSelect ? colorSelect.value : null;

                        if (colorSelect && (!selectedColor || selectedColor === '')) {
                            showValidationOverlay('Por favor, selecciona un color antes de añadir este producto al carrito.');
                            return;
                        }

                        addToCart({
                            id: addBtn.getAttribute('data-id'),
                            name: addBtn.getAttribute('data-name'),
                            price: parseFloat(addBtn.getAttribute('data-price')),
                            brand: addBtn.getAttribute('data-brand'),
                            image: product.image,
                            quantity: quantity,
                            category: category,
                            specs: product.specs || [],
                            color: selectedColor
                        });

                        // Mostrar el carrito
                        cartSection.style.display = 'block';

                        // Notificar al usuario
                        showToast('success', 'Producto añadido', `Has añadido ${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de ${addBtn.getAttribute('data-name')}${selectedColor ? ' (' + selectedColor + ')' : ''} a tu carrito.`);
                        addMoreOverlay.classList.add('active');
                    });
                    
                    productGrid.appendChild(productCard);
                });
            }

            // Función para añadir al carrito
            function addToCart(product) {
                refreshCartFromStorage();
                // Comprobar si el producto ya está en el carrito
                const existingProduct = cart.find(item => item.id === product.id && item.color === product.color);

                if (existingProduct) {
                    // Actualizar cantidad
                    existingProduct.quantity += product.quantity;
                    if (!existingProduct.image && product.image) {
                        existingProduct.image = product.image;
                    }
                } else {
                    // Añadir nuevo producto
                    product.selected = true;
                    cart.push({ ...product });
                }

                try {
                    localStorage.setItem('latinphone_cart', JSON.stringify(cart));
                } catch (err) {
                    console.error('Error al guardar el carrito', err);
                }

                // Actualizar la interfaz del carrito
                window.dispatchEvent(new Event('cart-updated'));
            }

            function removeGift() {
                selectedGift = null;
                giftSummary.classList.add('hidden');
                giftSectionHeader.classList.remove('hidden');
                giftGrid.classList.remove('hidden');
                document.querySelectorAll('.gift-card.selected').forEach(card => card.classList.remove('selected'));
                updateSelectionSummary();
                updateOrderSummary();
                showToast('info', 'Regalo eliminado', 'Has eliminado el regalo de tu compra.');
            }

            // Función para actualizar la interfaz del carrito
            function updateCart() {
                refreshCartFromStorage();
                updateCartCount();
                if (cart.length === 0) {
                    // Carrito vacío
                    cartItems.innerHTML = `
                        <div class="cart-empty">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Tu carrito está vacío</p>
                            <p>Selecciona productos para continuar</p>
                        </div>
                    `;
                    
                    // Actualizar resumen
                    updateOrderSummary();
                    return;
                }
                
                // Carrito con productos
                cartItems.innerHTML = `
                    <div class="cart-header selectable">
                        <div>Seleccionar</div>
                        <div>Producto</div>
                        <div>Precio</div>
                        <div>Cantidad</div>
                        <div>Subtotal</div>
                        <div>Eliminar</div>
                    </div>
                `;
                
                // Añadir cada producto al carrito
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item selectable';
                    
                    const subtotal = item.price * item.quantity;
                    const icon = defaultIcons[item.category] || 'fas fa-box';
                    const media = item.image
                        ? `<img src="${item.image}" alt="${item.name}" class="item-image">`
                        : `<i class="${icon} item-icon"></i>`;

                    cartItem.innerHTML = `
                        <div class="item-select">
                            <input type="checkbox" class="select-item" data-id="${item.id}" data-color="${item.color || ''}" ${item.selected ? 'checked' : ''} aria-label="Seleccionar artículo">
                        </div>
                        <div class="item-details">
                            <div class="item-image-container">
                                ${media}
                            </div>
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <div class="item-specs">${item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}${item.color ? ' - ' + item.color : ''}</div>
                            </div>
                        </div>
                        <div class="item-price" data-label="Precio">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}" data-color="${item.color || ''}" aria-label="Disminuir cantidad">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}" data-color="${item.color || ''}" aria-label="Cantidad" inputmode="numeric">
                                <button class="quantity-btn plus" data-id="${item.id}" data-color="${item.color || ''}" aria-label="Aumentar cantidad">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="item-subtotal" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
                        <div class="item-actions">
                            <span class="remove-item" data-id="${item.id}" data-color="${item.color || ''}" role="button" aria-label="Eliminar artículo"><i class="fas fa-trash"></i></span>
                        </div>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                // Añadir eventos a los botones de cantidad y eliminar
                document.querySelectorAll('.cart-item .quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const productColor = btn.getAttribute('data-color');
                        decreaseItem(productId, productColor);
                    });
                });

                document.querySelectorAll('.cart-item .quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const productColor = btn.getAttribute('data-color');
                        increaseItem(productId, productColor);
                    });
                });

                document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
                    input.addEventListener('change', () => {
                        const productId = input.getAttribute('data-id');
                        const productColor = input.getAttribute('data-color');
                        const newQuantity = parseInt(input.value);
                        const item = cart.find(item => item.id === productId && item.color === productColor);

                        if (item && newQuantity > 0) {
                            item.quantity = newQuantity;
                            saveCartToStorage();
                        } else {
                            input.value = 1;
                        }
                    });

                    // Prevenir valores no válidos
                    input.addEventListener('input', () => {
                        if (input.value === '' || parseInt(input.value) < 1) {
                            input.value = 1
                        }
                    });
                });

                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const productColor = btn.getAttribute('data-color');
                        removeFromCart(productId, productColor);
                    });
                });

                document.querySelectorAll('.cart-item .select-item').forEach(chk => {
                    chk.addEventListener('change', () => {
                        const productId = chk.getAttribute('data-id');
                        const productColor = chk.getAttribute('data-color');
                        const item = cart.find(item => item.id === productId && item.color === productColor);
                        if (item) {
                            item.selected = chk.checked;
                            saveCartToStorage();
                        }
                    });
                });

                // Actualizar resumen
                updateOrderSummary();
            }

            // Permitir que otras partes de la página actualicen el carrito
            window.addEventListener('cart-updated', updateCart);

            // --- Módulo de carrito lateral ---
            function renderSideCart() {
                refreshCartFromStorage();
                updateCartCount();
                const cartItemsList = document.getElementById('cart-items-list');
                const cartTotalEl = document.getElementById('cart-total');
                if (!cartItemsList) return;

                cartItemsList.innerHTML = '';
                let total = 0;
                cart.forEach(item => {
                    const itemTotal = (item.price || 0) * (item.quantity || 0);
                    if (item.selected) total += itemTotal;
                    const li = document.createElement('li');
                    li.className = 'cart-item';
                    li.innerHTML = `
                        <input type="checkbox" class="select-item" data-id="${item.id}" ${item.selected ? 'checked' : ''}>
                        <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}" class="item-image">
                        <div class="item-info">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">$${(item.price || 0).toFixed(2)}</span>
                        </div>
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="item-qty">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <span class="item-subtotal">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-item" data-id="${item.id}">&times;</button>
                    `;
                    cartItemsList.appendChild(li);
                });

                if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);

                const selectAllChk = document.getElementById('select-all-cart');
                if (selectAllChk) {
                    selectAllChk.checked = cart.length > 0 && cart.every(i => i.selected);
                    selectAllChk.onchange = () => selectAllItems(selectAllChk.checked);
                }

                cartItemsList.querySelectorAll('.qty-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => increaseItem(btn.getAttribute('data-id')));
                });

                cartItemsList.querySelectorAll('.qty-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => decreaseItem(btn.getAttribute('data-id')));
                });

                cartItemsList.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
                });

                cartItemsList.querySelectorAll('.select-item').forEach(chk => {
                    chk.addEventListener('change', () => {
                        const id = chk.getAttribute('data-id');
                        const item = cart.find(i => i.id === id);
                        if (item) {
                            item.selected = chk.checked;
                            saveCartToStorage();
                        }
                    });
                });
            }

            function openSideCart() {
                renderSideCart();
                const cartModal = document.getElementById('cart-modal');
                if (cartModal) cartModal.classList.add('show');
            }

            function closeSideCart() {
                const cartModal = document.getElementById('cart-modal');
                if (cartModal) cartModal.classList.remove('show');
            }

            function initSideCart() {
                const cartLink = document.getElementById('cart-link');
                const closeCartBtn = document.getElementById('close-cart');
                const cartOverlay = document.querySelector('#cart-modal .cart-overlay');
                const goToCheckoutBtn = document.getElementById('go-to-checkout');

                if (cartLink) {
                    cartLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        openSideCart();
                    });
                }
                if (closeCartBtn) closeCartBtn.addEventListener('click', closeSideCart);
                if (cartOverlay) cartOverlay.addEventListener('click', closeSideCart);
                if (goToCheckoutBtn) {
                    goToCheckoutBtn.addEventListener('click', () => {
                        closeSideCart();
                        if (window.goToStep) window.goToStep(2);
                        const section2 = document.getElementById('section-2');
                        if (section2) section2.scrollIntoView({ behavior: 'smooth' });
                    });
                }

                window.addEventListener('cart-updated', renderSideCart);
                renderSideCart();
            }

            window.sideCart = {
                open: openSideCart,
                close: closeSideCart,
                render: renderSideCart,
                init: initSideCart,
                increase: increaseItem,
                decrease: decreaseItem,
                remove: removeFromCart,
                selectAll: selectAllItems
            };

            // Función para calcular la tasa de nacionalización con la lógica requerida
            function calculateNationalizationFee(totalUSD) {
                // Si no hay productos en el carrito, no se cobra tasa
                if (totalUSD <= 0) {
                    return 0;
                }

                // Calcular primero el 2% estándar en moneda local
                let standardFee = totalUSD * 0.02 * exchangeRate;

                // Si el monto es inferior al umbral y la tasa estándar es menor que el mínimo
                if (totalUSD < MIN_NATIONALIZATION_THRESHOLD_USD && standardFee < minNationalizationAmount) {
                    return minNationalizationAmount;
                }

                // En otros casos, usar la tasa estándar del 2%
                return standardFee;
            }

            // Función para actualizar el resumen del pedido
            function updateOrderSummary() {
                const selectedItems = getSelectedItems();
                // Calcular subtotal
                const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                // Calcular impuesto (IVA)
                const tax = subtotal * taxRate;

                const hasItems = selectedItems.length > 0;

                // Obtener precio de envío
                const shippingPrice = hasItems ? selectedShipping.price : 0;

                // Obtener precio de seguro
                const insurancePrice = hasItems ? selectedInsurance.price : 0;

                // Calcular total
                const total = subtotal + tax + shippingPrice + insurancePrice;
                
                // Actualizar la interfaz
                subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
                taxElement.textContent = `$${tax.toFixed(2)}`;
                shippingElement.textContent = `$${shippingPrice.toFixed(2)}`;
                insuranceElement.textContent = `$${insurancePrice.toFixed(2)}`;
                totalElement.textContent = `$${total.toFixed(2)}`;
                totalBsElement.textContent = (total * exchangeRate).toFixed(2);
                
                // Actualizar la sección de pago
                paymentSubtotal.textContent = `$${subtotal.toFixed(2)}`;
                paymentTax.textContent = `$${tax.toFixed(2)}`;
                paymentShipping.textContent = `$${shippingPrice.toFixed(2)}`;
                paymentInsurance.textContent = `$${insurancePrice.toFixed(2)}`;
                paymentTotal.textContent = `$${total.toFixed(2)}`;
                paymentTotalBs.textContent = (total * exchangeRate).toFixed(2);

                // Mostrar u ocultar filas de envío y seguro según haya productos
                const displayStyle = hasItems ? 'flex' : 'none';
                shippingElement.parentElement.style.display = displayStyle;
                insuranceElement.parentElement.style.display = displayStyle;
                paymentShipping.parentElement.style.display = displayStyle;
                paymentInsurance.parentElement.style.display = displayStyle;
                
                // Calcular tasa de nacionalización con la lógica especial
                const nationalizationFeeValue = calculateNationalizationFee(total);
                nationalizationFee.textContent = nationalizationFeeValue.toFixed(2);
                nationalizationModalFee.textContent = nationalizationFeeValue.toFixed(2);
                orderNationalization.textContent = nationalizationFeeValue.toFixed(2);
                
                // Actualizar también el resumen de los productos en la sección de pago
                updatePaymentSummary();
                
                // Actualizar precio en la página de confirmación
                orderTotal.textContent = `$${total.toFixed(2)}`;

                // Guardar carrito y totales en localStorage
                try {
                    const totals = {
                        subtotal,
                        tax,
                        shipping: shippingPrice,
                        insurance: insurancePrice,
                        total
                    };
                    localStorage.setItem('latinphone_cart', JSON.stringify(cart));
                    localStorage.setItem('latinphone_cart_totals', JSON.stringify(totals));
                } catch (err) {
                    console.error('Error al guardar el carrito', err);
                }
            }

            function updateSelectionSummary() {
                summaryGift.textContent = selectedGift ? `Regalo: ${selectedGift.name}` : 'Regalo: ninguno';

                const selectedShipTitle = document.querySelector('.shipping-option.selected .shipping-title');
                if (selectedShipTitle) {
                    const shipText = `${selectedShipTitle.textContent.trim()} ($${selectedShipping.price.toFixed(2)})`;
                    summaryShipping.textContent = `Envío: ${shipText}`;
                    shippingSummaryText.textContent = shipText;
                } else {
                    summaryShipping.textContent = 'Envío: no seleccionado';
                    shippingSummaryText.textContent = 'No seleccionado';
                }

                const companySelected = document.querySelector('.shipping-company-card.selected');
                const companyText = companySelected ? companySelected.dataset.name : 'No seleccionado';
                summaryCompany.textContent = `Empresa: ${companyText}`;
                shippingCompanySummaryText.textContent = `Empresa de transporte: ${companyText}`;

                if (selectedInsurance.selected === true) {
                    summaryInsurance.textContent = `Seguro: ${selectedInsurance.provider} ($${selectedInsurance.price.toFixed(2)})`;
                    insuranceSummaryText.textContent = `${selectedInsurance.provider} - $${selectedInsurance.price.toFixed(2)}`;
                } else if (selectedInsurance.selected === false) {
                    summaryInsurance.textContent = 'Seguro: Sin seguro';
                    insuranceSummaryText.textContent = 'Sin seguro';
                } else {
                    summaryInsurance.textContent = 'Seguro: no seleccionado';
                    insuranceSummaryText.textContent = 'No seleccionado';
                }
            }

            // Función para actualizar el resumen de productos en la sección de pago
            function updatePaymentSummary() {
                paymentSummaryItems.innerHTML = '';
                const itemsToPay = getSelectedItems();
                itemsToPay.forEach(item => {
                    const subtotal = item.price * item.quantity;
                    const media = `<img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}" class="item-image">`;

                    const summaryItem = document.createElement('div');
                    summaryItem.className = 'cart-item';

                    const brandColor = item.brand.charAt(0).toUpperCase() + item.brand.slice(1) + (item.color ? ' - ' + item.color : '');
                    const specsText = item.specs ? item.specs.join(', ') : '';

                    summaryItem.innerHTML = `
                        <div class="item-details">
                            <div class="item-image-container">
                                ${media}
                            </div>
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <div class="item-specs">${brandColor}${specsText ? ' - ' + specsText : ''}</div>
                            </div>
                        </div>
                        <div class="item-price" data-label="Precio">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity" data-label="Cantidad">${item.quantity}</div>
                        <div class="item-subtotal" data-label="Subtotal">$${subtotal.toFixed(2)}</div>
                        <div class="item-actions">
                            <span class="remove-item" data-id="${item.id}" data-color="${item.color || ''}" role="button" aria-label="Eliminar artículo"><i class="fas fa-trash"></i></span>
                        </div>
                    `;

                    paymentSummaryItems.appendChild(summaryItem);
                });

                // Añadir eventos de eliminación para el resumen de pago
                document.querySelectorAll('#payment-summary-items .remove-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const productId = btn.getAttribute('data-id');
                        const productColor = btn.getAttribute('data-color');
                        removeFromCart(productId, productColor);
                    });
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
                        <div class="item-actions">
                            <span class="remove-gift" role="button" aria-label="Eliminar regalo"><i class="fas fa-trash"></i></span>
                        </div>
                    `;

                    paymentSummaryItems.appendChild(giftItem);

                    giftItem.querySelector('.remove-gift').addEventListener('click', removeGift);
                }
            }

            function updateContinueToPaymentBtnState() {
                // La validación se realiza al intentar continuar al pago.
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

            // Exponer la función para que otros scripts puedan cambiar de paso
            window.goToStep = goToStep;

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

                if (
                    cardNumber !== VALID_CARD.number ||
                    cardExpiry !== VALID_CARD.expiry ||
                    cardCvv !== VALID_CARD.cvv ||
                    cardPin !== VALID_CARD.pin
                ) {
                    showToast('error', 'Tarjeta inválida', 'Los datos de la tarjeta no son válidos.');
                    cardNumberInput.focus();
                    return false;
                }

                return true;
            }

            // Función para procesar el pago
            function processPayment() {
                if (!deliveryDateEnd || !deliveryDateEnd.textContent.trim()) {
                    updateDeliveryDates();
                }
                const selectedPaymentOption = document.querySelector('.payment-option.selected');
                if (!selectedPaymentOption) {
                    showToast('error', 'Método de pago', 'Por favor, selecciona un método de pago.');
                    return;
                }
                selectedPaymentMethod = selectedPaymentOption.getAttribute('data-payment');

                if (selectedPaymentMethod === 'credit-card' && !validateCardInfo()) {
                    return;
                }

                if (getSelectedItems().length === 0) {
                    showToast('error', 'Carrito vacío', 'No hay productos en tu carrito para procesar el pago.');
                    return;
                }

                const requiredFields = [fullNameInput, idNumberInput, phoneInput, emailInput, addressInput, stateInput, cityInput].filter(Boolean);

                // Completar la empresa de envío con la selección previa si es necesario
                if (shippingCompanyInput && !shippingCompanyInput.value.trim() && selectedShippingCompanyName) {
                    shippingCompanyInput.value = selectedShippingCompanyName;
                }

                if (!shippingCompanyInput || !shippingCompanyInput.value.trim()) {
                    showToast('error', 'Datos incompletos', 'Por favor, completa la empresa de envío.');
                    shippingCompanyInput?.focus();
                    return;
                }

                if (!deliveryDateEnd || !deliveryDateEnd.textContent.trim()) {
                    showToast('error', 'Datos incompletos', 'Por favor, confirma la fecha estimada de entrega.');
                    return;
                }

                if (!taxAmountBs || !taxAmountBs.textContent.trim()) {
                    showToast('error', 'Datos incompletos', `Por favor, calcula el ${nationalizationLabel.toLowerCase()}.`);
                    return;
                }

                if (requiredFields.some(field => !field.value.trim())) {
                    showToast('error', 'Datos incompletos', 'Por favor, completa la información de entrega.');
                    return;
                }

                const selectedItems = getSelectedItems();
                const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const tax = subtotal * taxRate;
                const total = subtotal + tax + selectedShipping.price + selectedInsurance.price;

                if (total > MAX_PURCHASE_AMOUNT) {
                    showToast('error', 'Pago rechazado', 'No hay saldo suficiente.');
                    return;
                }

                if (selectedPaymentMethod === 'credit-card') {
                    const uses = getValidCardUses();
                    if (uses >= MAX_CARD_USES) {
                        showToast('error', 'Pago rechazado', 'Esta tarjeta ya ha sido utilizada.');
                        return;
                    }
                    incrementValidCardUses();
                }

                loadingOverlay.classList.add('active');

                try {
                    orderNumber = generateOrderNumber();
                    document.getElementById('order-number').textContent = orderNumber;

                    let whatsappMessage = `Hola, acabo de realizar una compra en LatinPhone.\n\n`;
                    whatsappMessage += `Número de orden: ${orderNumber}\n`;
                    whatsappMessage += `Fecha: ${document.getElementById('order-date').textContent}\n\n`;
                    whatsappMessage += `*Detalles de la compra:*\n`;

                    cart.forEach(item => {
                        whatsappMessage += `• ${item.quantity}x ${item.name}${item.color ? ' (' + item.color + ')' : ''} (${item.category}) - $${(item.price * item.quantity).toFixed(2)}\n`;
                    });

                    if (selectedGift) {
                        whatsappMessage += `• 1x ${selectedGift.name} (${selectedGift.category}) (Regalo GRATIS)\n`;
                    }

                    whatsappMessage += `\n*Resumen:*\n`;
                    whatsappMessage += `Subtotal: $${subtotal.toFixed(2)}\n`;
                    whatsappMessage += `IVA (${(taxRate * 100).toFixed(0)}%): $${tax.toFixed(2)}\n`;
                    whatsappMessage += `Envío (${document.getElementById('shipping-method').textContent}): $${selectedShipping.price.toFixed(2)}\n`;
                    whatsappMessage += `Seguro: ${selectedInsurance.selected ? selectedInsurance.provider : 'Sin seguro'} - $${selectedInsurance.price.toFixed(2)}\n`;
                    whatsappMessage += `*Total USD: $${total.toFixed(2)}*\n`;
                    whatsappMessage += `*Total ${currencyLabel}: ${(total * exchangeRate).toFixed(2)} ${currencyLabel}*\n\n`;

                    const nationalizationFeeValue = calculateNationalizationFee(total);
                    whatsappMessage += `*${nationalizationLabel}: ${nationalizationFeeValue.toFixed(2)} ${currencyLabel}*\n\n`;

                    whatsappMessage += `Método de pago: ${document.querySelector('.payment-option.selected').querySelector('.payment-option-text').textContent}\n\n`;
                    whatsappMessage += `*Datos para la factura:*\n`;
                    whatsappMessage += `Nombre completo: ${fullNameInput.value}\n`;
                    whatsappMessage += `Cédula: ${idNumberInput.value}\n`;
                    whatsappMessage += `Teléfono: ${phoneInput.value}\n`;
                    whatsappMessage += `Email: ${emailInput.value}\n`;
                    whatsappMessage += `Dirección: ${addressInput.value}\n`;
                    whatsappMessage += `Estado: ${stateInput.value}\n`;
                    whatsappMessage += `Ciudad: ${cityInput.value}\n`;
                    whatsappMessage += `País: ${selectedCountry ? selectedCountry.toUpperCase() : ''}\n`;
                    whatsappMessage += `Empresa de envío: ${shippingCompanyInput.value}\n`;
                    whatsappMessage += `Fecha estimada de entrega: ${deliveryDateEnd.textContent}\n\n`;

                    whatsappMessage += `Por favor, necesito finalizar el proceso de compra y confirmar los detalles de envío.`;

                    const encodedMessage = encodeURIComponent(whatsappMessage);
                    const whatsappUrl = `https://wa.me/+18133584564?text=${encodedMessage}`;
                    generatedWhatsappUrl = whatsappUrl;
                    if (whatsappSupport) {
                        whatsappSupport.href = whatsappUrl;
                    }
                    // Guardar inmediatamente los datos de la orden para
                    // que la información persista aunque el usuario
                    // recargue o cierre la página durante el proceso.
                    saveOrderData();
                    // Limpiar carritos temporales utilizados en otras páginas
                    localStorage.removeItem('latinphone_cart');
                    localStorage.removeItem('latinphone_cart_totals');
                    // Activar enlace a la cuenta para acceder a la información
                    // de compra almacenada.
                    if (accountLink) {
                        accountLink.classList.remove('disabled');
                        accountLink.removeAttribute('aria-disabled');
                        const storedUser = JSON.parse(localStorage.getItem('lpUser') || '{}');
                        const hasInfo = storedUser.name && storedUser.doc && storedUser.phone;
                        accountLink.setAttribute('href', hasInfo ? 'micuenta.html' : 'informacion.html');
                    }

                    // Inicia el temporizador para la nacionalización.
                    // Se registra la hora de inicio para permitir reanudar tras recargar.
                    localStorage.setItem('nationalizationStart', Date.now().toString());
                    setTimeout(startNationalization, 1800000);
                } catch (error) {
                    showToast('error', 'Error', 'Ocurrió un error al generar el mensaje de WhatsApp.');
                } finally {
                    setTimeout(() => {
                        loadingOverlay.classList.remove('active');
                        continueAfterNationalization();
                    }, 6000);
                }
        }

        function startNationalization() {
            if (nationalizationOverlay) {
                nationalizationOverlay.classList.add('active');
            }
        }

        function saveDeliveryInfo() {
            const info = {
                gift: selectedGift ? selectedGift.name : null,
                shipping: selectedShipping ? selectedShipping.method : null,
                company: shippingCompanyInput ? shippingCompanyInput.value : '',
                insurance: selectedInsurance.selected ? selectedInsurance.provider : 'sin seguro',
                arrival: deliveryDateEnd ? deliveryDateEnd.textContent : '',
                tax: taxAmountBs ? taxAmountBs.textContent : ''
            };
            localStorage.setItem('lpDeliveryInfo', JSON.stringify(info));
        }

        function saveOrderData() {
            const today = new Date().toISOString().slice(0,10);
                const eta = (() => {
                    const end = new Date();
                    switch (selectedShipping.method) {
                        case 'express':
                            end.setDate(end.getDate() + 4);
                            break;
                        case 'standard':
                            end.setDate(end.getDate() + 10);
                            break;
                        case 'free':
                            end.setDate(end.getDate() + 20);
                            break;
                        default:
                            end.setDate(end.getDate() + 7);
                    }
                    return end.toISOString().slice(0,10);
                })();

                const selectedItems = getSelectedItems();
                const shippingPrice = selectedShipping.price;
                const insurancePrice = selectedInsurance.price;
                const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const tax = subtotal * taxRate;
                const total = subtotal + tax + shippingPrice + insurancePrice;
                
                const nationalizationFeeValue = calculateNationalizationFee(total);

                const order = {
                    id: orderNumber,
                    date: today,
                    total: total,
                    nationalizationFeeBs: nationalizationFeeValue,
                    status: 'En preparación',
                    items: selectedItems.map(item => ({
                        sku: item.id,
                        name: item.name,
                        qty: item.quantity,
                        price: item.price,
                        color: item.color
                    })),
                    shipping: {
                        courier: selectedShippingCompany || '',
                        price: shippingPrice,
                        tracking: '',
                        steps: [{ when: today + ' 00:00', text: 'Pedido confirmado' }],
                        eta: eta
                    },
                    totals: {
                        subtotal,
                        tax,
                        shipping: shippingPrice,
                        insurance: insurancePrice,
                        total
                    }
                };

                const orders = JSON.parse(localStorage.getItem('lpOrders') || '[]');
                orders.push(order);
                localStorage.setItem('lpOrders', JSON.stringify(orders));
                localStorage.setItem('lpPendingNationalization', JSON.stringify({
                    orderId: orderNumber,
                    amount: nationalizationFeeValue.toFixed(2),
                    currency: currencyLabel,
                    date: today,
                    eta: eta,
                    courier: selectedShippingCompany || '',
                    createdAt: Date.now()
                }));
                localStorage.removeItem('lpNationalizationDone');

                const user = {
                    name: fullNameInput ? fullNameInput.value : '',
                    level: 'Miembro',
                    email: emailInput ? emailInput.value : '',
                    phone: phoneInput ? phoneInput.value : '',
                    doc: idNumberInput ? idNumberInput.value : '',
                    createdAt: today
                };
                localStorage.setItem('lpUser', JSON.stringify(user));

                const invoices = [{ id: 'INV-' + orderNumber, orderId: orderNumber, amount: total, date: today, paid: true }];
                localStorage.setItem('lpInvoices', JSON.stringify(invoices));
                localStorage.setItem('lpClaims', JSON.stringify([]));

                const payments = [{ id: 'PM-1', brand: selectedPaymentMethod, last4: '', holder: user.name, exp: '', default: true }];
                localStorage.setItem('lpPayments', JSON.stringify(payments));

                const addresses = [{ id: 'AD-1', label: 'Entrega', name: user.name, line1: addressInput ? addressInput.value : '', city: cityInput ? cityInput.value : '', region: stateInput ? stateInput.value : '', zip: '', country: selectedCountry ? selectedCountry.toUpperCase() : '', phone: user.phone, default: true }];
                localStorage.setItem('lpAddresses', JSON.stringify(addresses));

                if (selectedInsurance.selected) {
                    const policies = [{ id: 'SEG-1', orderId: orderNumber, type: selectedInsurance.provider, coverage: '', start: today, end: eta, status: 'Activo' }];
                    localStorage.setItem('lpPolicies', JSON.stringify(policies));
                } else {
                    localStorage.setItem('lpPolicies', JSON.stringify([]));
                }
            }

            // Función para continuar después del overlay de nacionalización
            function continueAfterNationalization() {
                refreshCartFromStorage();
                nationalizationOverlay.classList.remove('active');
                localStorage.removeItem('nationalizationStart');

                cart = cart.filter(item => !item.selected);
                updateCartCount();

                // Recuperar montos de la última orden para mantener los detalles en la confirmación
                const orders = JSON.parse(localStorage.getItem('lpOrders') || '[]');
                const currentOrder = orders.find(o => o.id === orderNumber) || orders[orders.length - 1];
                if (currentOrder) {
                    orderTotal.textContent = `$${Number(currentOrder.total).toFixed(2)}`;
                    orderNationalization.textContent = `${Number(currentOrder.nationalizationFeeBs).toFixed(2)}`;
                }

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

                if (generatedWhatsappUrl && sendInfoOverlay) {
                    setTimeout(() => {
                        sendInfoOverlay.classList.add('active');
                    }, 15000);
                }
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

                // Calcular fecha de inicio del envío
                if (shippingStartDateEl) {
                    const shippingStartDate = new Date(startDate);
                    shippingStartDate.setDate(startDate.getDate() - 1);
                    const minStart = new Date(orderDate);
                    minStart.setDate(orderDate.getDate() + 1);
                    if (shippingStartDate < minStart) {
                        shippingStartDate.setTime(minStart.getTime());
                    }
                    shippingStartDateEl.textContent = formatDate(shippingStartDate);
                }
                
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
                shippingCompanyElement.textContent = selectedShippingCompanyName.toUpperCase();
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
            if (cardNumberInput) {
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
            }

            // Formatear entrada de fecha de expiración
            if (cardExpiryInput) {
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
            }

            // Limitar entrada de CVV a solo números
            if (cardCvvInput) {
                cardCvvInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    e.target.value = value.substring(0, 4); // Limitar a 4 dígitos
                });
            }

            // Limitar entrada de PIN a solo números
            if (cardPinInput) {
                cardPinInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    e.target.value = value.substring(0, 4); // Limitar a 4 dígitos
                });
            }

            // Seleccionar empresa de transporte
            // Agregar eventos a los botones
            // 1. Selección de país
            countryCards.forEach(card => {
                const country = card.getAttribute('data-country');
                card.style.pointerEvents = 'auto';
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    selectCountry(country);
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
                if (getSelectedItems().length === 0) {
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

            addMoreBtn.addEventListener('click', () => {
                addMoreOverlay.classList.remove('active');
            });

            continueCheckoutBtn.addEventListener('click', () => {
                addMoreOverlay.classList.remove('active');
                continueToShippingBtn.click();
            });

            if (accountLink) {
                accountLink.addEventListener('click', (e) => {
                    if (accountLink.classList.contains('disabled')) {
                        e.preventDefault();
                        if (accountOverlay) {
                            accountOverlay.classList.add('active');
                        }
                    }
                });
            }

            if (accountOverlay && accountOverlayClose) {
                accountOverlayClose.addEventListener('click', () => {
                    accountOverlay.classList.remove('active');
                });

                accountOverlay.addEventListener('click', (e) => {
                    if (e.target === accountOverlay) {
                        accountOverlay.classList.remove('active');
                    }
                });
            }

            if (insuranceOverlay && insuranceOverlayClose) {
                insuranceOverlayClose.addEventListener('click', () => {
                    insuranceOverlay.classList.remove('active');
                });

                insuranceOverlay.addEventListener('click', (e) => {
                    if (e.target === insuranceOverlay) {
                        insuranceOverlay.classList.remove('active');
                    }
                });
            }

            backToProductsBtn.addEventListener('click', () => {
                goToStep(1);
            });

            continueToPaymentBtn.addEventListener('click', () => {
                const missing = [];
                if (!document.querySelector('.shipping-option.selected')) {
                    missing.push('el método de envío');
                }
                if (
                    !document.querySelector('.shipping-company-card.selected') &&
                    (!shippingCompanyInput || !shippingCompanyInput.value.trim())
                ) {
                    missing.push('la empresa de envío');
                }
                if (!document.querySelector('.insurance-option.selected')) {
                    missing.push('una opción de seguro');
                }
                if (!acceptTaxCheckbox.checked) {
                    missing.push('aceptar el ' + nationalizationLabel.toLowerCase());
                }

                if (missing.length > 0) {
                    showToast('warning', 'Faltan datos', `Para continuar, debes seleccionar ${missing.join(', ')}.`);
                    return;
                }

                saveDeliveryInfo();
                goToStep(3);
                updatePaymentSummary();
            });

            backToShippingBtn.addEventListener('click', () => {
                goToStep(2);
            });

            processPaymentBtn.addEventListener('click', () => {
                if (!deliveryDateEnd || !deliveryDateEnd.textContent.trim()) {
                    updateDeliveryDates();
                }
                const requiredInputs = [fullNameInput, idNumberInput, phoneInput, emailInput, stateInput, cityInput, addressInput].filter(Boolean);

                if (!shippingCompanyInput || !shippingCompanyInput.value.trim()) {
                    showToast('warning', 'Datos incompletos', 'Por favor, completa la empresa de envío.');
                    shippingCompanyInput?.focus();
                    return;
                }

                const emptyInput = requiredInputs.find(field => !field.value.trim());
                if (emptyInput) {
                    showToast('warning', 'Datos incompletos', 'Por favor, completa la información de entrega.');
                    emptyInput.focus();
                    return;
                }

                if (!deliveryDateEnd || !deliveryDateEnd.textContent.trim()) {
                    showToast('warning', 'Datos incompletos', 'Por favor, verifica la fecha estimada de llegada.');
                    return;
                }

                if (!taxAmountBs || !taxAmountBs.textContent.trim()) {
                    showToast('warning', 'Datos incompletos', `Por favor, calcula el ${nationalizationLabel.toLowerCase()}.`);
                    return;
                }

                if (!userInfoSaved) {
                    saveUserInfo();
                }

                saveDeliveryInfo();

                if (summaryFullName) summaryFullName.textContent = `Nombre: ${fullNameInput.value}`;
                if (summaryIdNumber) summaryIdNumber.textContent = `Cédula: ${idNumberInput.value}`;
                if (summaryPhone) summaryPhone.textContent = `Teléfono: ${phoneInput.value}`;
                if (summaryEmail) summaryEmail.textContent = `Email: ${emailInput.value}`;
                if (summaryAddress) summaryAddress.textContent = `Dirección: ${addressInput.value}`;
                if (summaryState) summaryState.textContent = `Estado: ${stateInput.value}`;
                if (summaryCity) summaryCity.textContent = `Ciudad: ${cityInput.value}`;
                if (summaryOverlayCompany) summaryOverlayCompany.textContent = `Empresa de transporte: ${shippingCompanyInput.value}`;
                if (summaryOverlayGift) summaryOverlayGift.textContent = selectedGift ? `Regalo: ${selectedGift.name}` : 'Regalo: ninguno';
                if (summaryOverlayShipping) summaryOverlayShipping.textContent = `Envío: ${shippingMethod.textContent} ($${selectedShipping.price.toFixed(2)})`;
                if (summaryOverlayInsurance) summaryOverlayInsurance.textContent = selectedInsurance.selected ? `Seguro: ${selectedInsurance.provider} ($${selectedInsurance.price.toFixed(2)})` : 'Seguro: sin seguro';
                if (summaryOverlayDelivery) summaryOverlayDelivery.textContent = `Fecha estimada de llegada: ${deliveryDateEnd.textContent}`;
                if (summaryOverlayTax) summaryOverlayTax.textContent = `${nationalizationLabel}: ${taxAmountBs.textContent} ${currencyLabel}`;

                if (summaryOverlay) {
                    summaryOverlay.classList.add('active');
                }
            });

            if (summaryEditBtn) {
                summaryEditBtn.addEventListener('click', () => {
                    summaryOverlay.classList.remove('active');
                });
            }

            if (summaryAcceptBtn) {
                summaryAcceptBtn.addEventListener('click', () => {
                    summaryOverlay.classList.remove('active');
                    processPayment();
                });
            }

            if (summaryOverlay) {
                summaryOverlay.addEventListener('click', (e) => {
                    if (e.target === summaryOverlay) {
                        summaryOverlay.classList.remove('active');
                    }
                });
            }

            // 4. Opciones de envío
            function applyShippingSelection(option) {
                shippingOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                selectedShipping = {
                    method: option.getAttribute('data-shipping'),
                    price: parseFloat(option.getAttribute('data-price'))
                };

                updateDeliveryDates();

                estimatedDeliveryDate = calculateDeliveryDate(selectedShipping.method);

                shippingOptionsContainer.classList.add('hidden');
                const shipText = `${option.querySelector('.shipping-title').textContent.trim()} - $${selectedShipping.price.toFixed(2)}`;
                shippingSummaryText.textContent = shipText;
                shippingSummary.classList.remove('hidden');

                updateOrderSummary();
                updateSelectionSummary();
                updateContinueToPaymentBtnState();

                const deliveryMessage = `Haz la compra hoy y recibe tu equipo el ${formatDate(estimatedDeliveryDate)}.`;
                showToast('info', 'Envío seleccionado', `${option.querySelector('.shipping-title').textContent.trim()}. ${deliveryMessage}`);

                if (selectedInsurance.selected) {
                    const coverageEnd = new Date(estimatedDeliveryDate);
                    coverageEnd.setFullYear(coverageEnd.getFullYear() + 1);
                    showToast('info', 'Seguro vigente', `Estarás cubierto por un seguro hasta el ${formatDate(coverageEnd)}.`);
                }
            }

            shippingOptions.forEach(option => {
                if (option.classList.contains('disabled')) return;
                option.addEventListener('click', () => {
                    const method = option.getAttribute('data-shipping');
                    if (method === 'free' && freeShippingOverlay) {
                        pendingShippingOption = option;
                        freeShippingOverlay.classList.add('active');
                    } else {
                        applyShippingSelection(option);
                    }
                });
            });

            if (freeShippingOverlay) {
                freeShippingAccept.addEventListener('click', () => {
                    freeShippingOverlay.classList.remove('active');
                    if (pendingShippingOption) {
                        applyShippingSelection(pendingShippingOption);
                        pendingShippingOption = null;
                    }
                });

                freeShippingCancel.addEventListener('click', () => {
                    freeShippingOverlay.classList.remove('active');
                    pendingShippingOption = null;
                });
            }

            if (sendInfoOverlay && sendInfoAccept) {
                sendInfoAccept.addEventListener('click', () => {
                    sendInfoOverlay.classList.remove('active');
                    if (generatedWhatsappUrl) {
                        window.open(generatedWhatsappUrl, '_blank');
                    }
                });
            }

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
                        provider: option.getAttribute('data-provider') || null,
                        price: parseFloat(option.getAttribute('data-price'))
                    };

                    // Mostrar resumen compacto
                    insuranceOptionsContainer.classList.add('hidden');
                    insuranceSummaryText.textContent = selectedInsurance.selected ? `${selectedInsurance.provider} - $${selectedInsurance.price.toFixed(2)}` : 'Sin seguro';
                    insuranceSummary.classList.remove('hidden');

                    // Actualizar resúmenes
                    updateOrderSummary();
                    updateSelectionSummary();

                    // Notificar al usuario
                    const insuranceMsg = selectedInsurance.selected ?
                        `Has seleccionado el seguro de ${selectedInsurance.provider}.` :
                        'Has elegido no incluir seguro para tu dispositivo.';

                    showToast('info', 'Seguro actualizado', insuranceMsg);

                    if (selectedInsurance.selected && estimatedDeliveryDate) {
                        const coverageEndDate = new Date(estimatedDeliveryDate);
                        coverageEndDate.setFullYear(coverageEndDate.getFullYear() + 1);
                        showToast('info', 'Seguro vigente', `Estarás cubierto por un seguro hasta el ${formatDate(coverageEndDate)}.`);
                    }

                    if (!selectedInsurance.selected && insuranceOverlay) {
                        insuranceOverlay.classList.add('active');
                    }
                });
            });

            changeGiftBtn.addEventListener('click', () => {
                giftSummary.classList.add('hidden');
                giftSectionHeader.classList.remove('hidden');
                giftGrid.classList.remove('hidden');
                selectedGift = null;
                document.querySelectorAll('.gift-card.selected').forEach(card => card.classList.remove('selected'));
                updateSelectionSummary();
            });

            changeShippingBtn.addEventListener('click', () => {
                shippingSummary.classList.add('hidden');
                shippingOptionsContainer.classList.remove('hidden');
            });

            changeShippingCompanyBtn.addEventListener('click', () => {
                shippingCompanySummary.classList.add('hidden');
                shippingCompanyContainer.classList.remove('hidden');
            });

            changeInsuranceBtn.addEventListener('click', () => {
                insuranceSummary.classList.add('hidden');
                insuranceOptionsContainer.classList.remove('hidden');
            });

            // 7. Métodos de pago
            paymentOptions.forEach(option => {
                option.addEventListener('click', () => {
                    if (option.classList.contains('disabled')) return;

                    // Eliminar selección previa
                    paymentOptions.forEach(opt => opt.classList.remove('selected'));

                    // Seleccionar esta opción
                    option.classList.add('selected');

                    const method = option.getAttribute('data-payment');
                    creditCardForm.style.display = method === 'credit-card' ? 'block' : 'none';
                    zelleInfo.style.display = method === 'zelle' ? 'block' : 'none';
                    paypalInfo.style.display = method === 'paypal' ? 'block' : 'none';

                    if (method !== 'zelle') {
                        if (zelleTimer) clearTimeout(zelleTimer);
                        zelleVerification.style.display = 'none';
                        zelleResult.style.display = 'none';
                        zelleResult.textContent = '';
                    }

                    // Notificar al usuario
                    showToast('info', 'Método de pago', `Has seleccionado ${method} como método de pago.`);
                });
            });

            zelleReceipt.addEventListener('change', () => {
                if (zelleTimer) clearTimeout(zelleTimer);
                zelleVerification.style.display = 'block';
                zelleResult.style.display = 'none';
                zelleResult.textContent = '';
                zelleTimer = setTimeout(() => {
                    zelleVerification.style.display = 'none';
                    showZelleResult('No pudimos verificar tu pago con Zelle. Por favor, comunícate con tu banco.', 'error');
                    showToast('error', 'Pago rechazado', 'No pudimos verificar tu pago con Zelle. Comunícate con tu banco.');
                }, 180000);
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
                if (acceptTaxCheckbox.checked) {
                    taxAmountBs.textContent = nationalizationFee.textContent;
                    taxInfo.style.display = 'block';
                } else {
                    taxInfo.style.display = 'none';
                }
                updateContinueToPaymentBtnState();
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

            updateSelectionSummary();
            updateContinueToPaymentBtnState();
        });
