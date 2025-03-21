document.addEventListener('DOMContentLoaded', function() {
    // Constantes globales
    const EXCHANGE_RATE = 88; // Tasa de cambio (Bs por USD)
    const TAX_RATE = 0.16; // IVA 16%
    
    // Elementos DOM
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalEl = document.querySelector('.subtotal span:last-child');
    const cartEmptyEl = document.querySelector('.cart-empty');
    const cartSummaryEl = document.querySelector('.cart-summary');
    const cartCount = document.querySelector('.cart-count');
    const proceedCheckoutBtn = document.getElementById('proceed-checkout');
    const summaryTotalBs = document.getElementById('summary-total-bs');
    
    // Variables de estado
    let cart = [];
    let orderTotal = 0;
    let taxAmount = 0;
    
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
                    image: 'https://th.bing.com/th?id=OPEC.Gy18E1jCjibBhg474C474&w=592&h=550&o=5&pid=21.1',
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
        // Limpiar contenedor de items
        cartItemsContainer.innerHTML = '';
        
        // Verificar si el carrito está vacío
        if (cart.length === 0) {
            cartEmptyEl.style.display = 'block';
            cartSummaryEl.style.display = 'none';
            cartCount.textContent = '0';
            if (proceedCheckoutBtn) proceedCheckoutBtn.style.display = 'none';
            return;
        }
        
        // Ocultar mensaje de carrito vacío
        cartEmptyEl.style.display = 'none';
        cartSummaryEl.style.display = 'block';
        if (proceedCheckoutBtn) proceedCheckoutBtn.style.display = 'inline-flex';
        
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
        const summarySubtotal = document.getElementById('cart-subtotal');
        const summaryTax = document.getElementById('cart-tax');
        const summaryShipping = document.getElementById('cart-shipping');
        const summaryTotal = document.getElementById('cart-total');
        const bolivarTotal = document.getElementById('cart-total-bs');
        const nationalizationBs = document.getElementById('cart-nationalization-bs');
        
        // Calcular valores
        taxAmount = orderTotal * TAX_RATE;
        const shipping = 70; // Costo fijo de envío
        const total = orderTotal + taxAmount + shipping;
        
        // Actualizar elementos
        if (summarySubtotal) summarySubtotal.textContent = `$${orderTotal.toFixed(2)}`;
        if (summaryTax) summaryTax.textContent = `$${taxAmount.toFixed(2)}`;
        if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
        
        // Actualizar conversión a bolívares
        if (bolivarTotal) bolivarTotal.textContent = formatBsAmount(total * EXCHANGE_RATE);
        if (nationalizationBs) nationalizationBs.textContent = formatBsAmount(30 * EXCHANGE_RATE);
        if (summaryTotalBs) summaryTotalBs.textContent = formatBsAmount(total * EXCHANGE_RATE);
    }
    
    // Formatear montos en bolivares
    function formatBsAmount(amount) {
        return new Intl.NumberFormat('es-VE').format(amount.toFixed(2)) + " Bs";
    }
    
    // Navegar a checkout - SOLUCIÓN MEJORADA
    function goToCheckout(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        
        // Calcular totales antes de guardar
        const totals = {
            subtotal: orderTotal,
            tax: taxAmount,
            shipping: 70, // Costo predeterminado
            total: orderTotal + taxAmount + 70
        };
        
        try {
            // Guardar carrito y totales en localStorage
            localStorage.setItem('latinphone_cart', JSON.stringify(cart));
            localStorage.setItem('latinphone_cart_totals', JSON.stringify(totals));
            
            console.log('Carrito guardado:', JSON.stringify(cart));
            console.log('Totales guardados:', JSON.stringify(totals));
            
            // Usar ambos métodos de redirección para mayor compatibilidad
            setTimeout(function() {
                window.location.href = 'pago.html';
            }, 100);
        } catch (err) {
            console.error("Error al procesar el checkout:", err);
            
            // Método alternativo de redirección como fallback
            alert("Redirigiendo a la página de pago...");
            window.open('pago.html', '_self');
        }
    }
    
    // Agregar event listener al botón de proceder al pago
    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener('click', goToCheckout);
    }
    
    // Inicializar carrito
    loadCart();
});
