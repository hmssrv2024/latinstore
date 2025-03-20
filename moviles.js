document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-options');
    const productCards = document.querySelectorAll('.product-card');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Variables globales
    let cart = [];
    let filteredProducts = Array.from(productCards);
    
    // Inicializar reproducción de videos solo cuando están en el viewport
    function initVideoPlayback() {
        const videos = document.querySelectorAll('video');
        
        // Configurar opciones de IntersectionObserver
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Crear el observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si el video está en el viewport
                if (entry.isIntersecting) {
                    try {
                        entry.target.play();
                    } catch (err) {
                        console.log("Error al reproducir el video:", err);
                    }
                } else {
                    entry.target.pause();
                }
            });
        }, options);
        
        // Observar cada video
        videos.forEach(video => observer.observe(video));
    }
    
    // Alternar barra de búsqueda
    function toggleSearchBar() {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchBar.querySelector('input').focus();
        }
    }
    
    // Alternar carrito lateral
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Cerrar carrito
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Actualizar carrito
    function updateCart() {
        // Limpiar el contenido actual del carrito
        while (cartItems.firstChild) {
            cartItems.removeChild(cartItems.firstChild);
        }
        
        // Si el carrito está vacío, mostrar mensaje
        if (cart.length === 0) {
            const emptyCart = document.createElement('div');
            emptyCart.className = 'empty-cart';
            emptyCart.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <a href="#" class="btn btn-primary">Explorar Productos</a>
            `;
            cartItems.appendChild(emptyCart);
            cartCount.textContent = '0';
            totalPrice.textContent = '$0.00 USD';
            return;
        }
        
        // Calcular el total
        let total = 0;
        let itemCount = 0;
        
        // Agregar los items al carrito
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price">$${item.price} USD</span>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <i class="fas fa-times cart-item-remove" data-id="${item.id}"></i>
            `;
            cartItems.appendChild(cartItem);
            
            // Actualizar el total y contador
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
        
        // Actualizar contador y total
        cartCount.textContent = itemCount.toString();
        totalPrice.textContent = `$${total.toFixed(2)} USD`;
        
        // Agregar event listeners a los botones de cantidad y eliminar
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });
    }
    
    // Agregar al carrito
    function addToCart(e) {
        const btn = e.currentTarget;
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        
        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            // Si ya existe, aumentar la cantidad
            existingItem.quantity++;
        } else {
            // Si no existe, agregar al carrito
            const newItem = {
                id,
                name,
                price,
                quantity: 1,
                image: getProductImage(btn)
            };
            cart.push(newItem);
        }
        
        // Actualizar el carrito
        updateCart();
        
        // Mostrar confirmación
        showNotification(`${name} añadido al carrito`);
        
        // Guardar carrito en localStorage
        saveCart();
    }
    
    // Obtener imagen del producto
    function getProductImage(btn) {
        const productCard = btn.closest('.product-card');
        const img = productCard.querySelector('img');
        const video = productCard.querySelector('video');
        
        if (img) {
            return img.src;
        } else if (video) {
            // Si es un video, devolver un thumbnail por defecto o capturar frame
            return 'https://via.placeholder.com/80';
        }
        
        return 'https://via.placeholder.com/80';
    }
    
    // Aumentar cantidad
    function increaseQuantity(e) {
        const id = e.currentTarget.dataset.id;
        const item = cart.find(item => item.id === id);
        
        if (item) {
            item.quantity++;
            updateCart();
            saveCart();
        }
    }
    
    // Disminuir cantidad
    function decreaseQuantity(e) {
        const id = e.currentTarget.dataset.id;
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
            
            updateCart();
            saveCart();
        }
    }
    
    // Eliminar del carrito
    function removeFromCart(e) {
        const id = e.currentTarget.dataset.id;
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
            updateCart();
            saveCart();
            
            showNotification(`${removedItem.name} eliminado del carrito`);
        }
    }
    
    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('latinphone_cart', JSON.stringify(cart));
    }
    
    // Cargar carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('latinphone_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }
    
    // Mostrar notificación
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar la notificación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar y eliminar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Filtrar productos por categoría
    function filterProducts() {
        const category = this.dataset.category;
        
        // Actualizar botones activos
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filtrar productos
        filteredProducts = Array.from(productCards);
        
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => {
                return product.dataset.category === category;
            });
        }
        
        // Ordenar productos según la opción seleccionada
        sortProducts();
        
        // Actualizar visualización
        updateProductsDisplay();
    }
    
    // Ordenar productos
    function sortProducts() {
        const sortOption = sortSelect.value;
        
        switch (sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => {
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                });
                break;
                
            case 'price-high':
                filteredProducts.sort((a, b) => {
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                });
                break;
                
            case 'newest':
                filteredProducts.sort((a, b) => {
                    const aIsNew = a.querySelector('.product-badge') !== null;
                    const bIsNew = b.querySelector('.product-badge') !== null;
                    return bIsNew - aIsNew;
                });
                break;
                
            default: // featured
                // Mantener el orden original
                break;
        }
        
        updateProductsDisplay();
    }
    
    // Actualizar visualización de productos
    function updateProductsDisplay() {
        const productsWrapper = document.querySelector('.products-wrapper');
        
        // Ocultar todos los productos
        productCards.forEach(product => {
            product.style.display = 'none';
        });
        
        // Mostrar productos filtrados y ordenados
        filteredProducts.forEach(product => {
            product.style.display = 'flex';
        });
        
        // Comprobar si no hay productos que mostrar
        if (filteredProducts.length === 0) {
            const noProducts = document.createElement('div');
            noProducts.className = 'no-products';
            noProducts.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No se encontraron productos en esta categoría</p>
            `;
            productsWrapper.appendChild(noProducts);
        } else {
            const noProducts = document.querySelector('.no-products');
            if (noProducts) {
                noProducts.remove();
            }
        }
    }
    
    // Cargar recomendaciones
    function loadRecommendations() {
        const recommendedSlider = document.querySelector('.recommended-slider .slider-track');
        
        // Array de productos recomendados (puedes personalizar esto según tus necesidades)
        const recommendations = [
            {
                id: 'zflip6',
                name: 'Samsung Galaxy Z Flip 6',
                price: 1299.99,
                image: 'https://images.samsung.com/es/smartphones/galaxy-z-flip6/accessories/images/galaxy-z-flip6-accessories-kv.jpg?imbypass=true',
                category: 'foldable'
            },
            {
                id: 'airpodsmax',
                name: 'AirPods Max',
                price: 549.99,
                image: 'https://via.placeholder.com/300',
                category: 'accessories'
            },
            {
                id: 'pixel10pro',
                name: 'Google Pixel 10 Pro',
                price: 1099.99,
                image: 'https://via.placeholder.com/300',
                category: 'smartphone'
            },
            {
                id: 'galaxybook5',
                name: 'Samsung Galaxy Book5 Pro',
                price: 1499.99,
                image: 'https://images.samsung.com/is/image/samsung/assets/es/home/Galaxy-Book5-Pro_Home-Latest-Deals-Large_684x684_UK_PC.jpg?$684_684_JPG$',
                category: 'computers'
            },
            {
                id: 'mixflip',
                name: 'Xiaomi Mix Flip',
                price: 1199.99,
                image: 'https://via.placeholder.com/300',
                category: 'foldable'
            }
        ];
        
        // Generar HTML para cada recomendación
        recommendations.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-media">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="price">$${product.price} USD</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            recommendedSlider.appendChild(productCard);
        });
        
        // Agregar event listeners a los nuevos botones de añadir al carrito
        recommendedSlider.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }
    
    // Controles de slider para recomendados
    function initRecommendedSlider() {
        const sliderTrack = document.querySelector('.recommended-slider .slider-track');
        const prevBtn = document.querySelector('.recommended-slider .prev-slide');
        const nextBtn = document.querySelector('.recommended-slider .next-slide');
        let position = 0;
        const slidesToShow = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
        
        function updateSliderPosition() {
            const cardWidth = sliderTrack.querySelector('.product-card').offsetWidth + 30; // 30px de gap
            sliderTrack.style.transform = `translateX(-${position * cardWidth}px)`;
        }
        
        prevBtn.addEventListener('click', () => {
            if (position > 0) {
                position--;
                updateSliderPosition();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const totalSlides = sliderTrack.querySelectorAll('.product-card').length;
            if (position < totalSlides - slidesToShow) {
                position++;
                updateSliderPosition();
            }
        });
        
        // Actualizar slidesToShow al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            const newSlidesToShow = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
            if (newSlidesToShow !== slidesToShow) {
                position = 0;
                updateSliderPosition();
            }
        });
    }
    
    // Proceder al checkout
    function checkout() {
        if (cart.length === 0) {
            showNotification('Tu carrito está vacío');
            return;
        }
        
        // Aquí iría la lógica para procesar el pago
        alert('¡Gracias por tu compra! Serás redirigido a la página de pago.');
        
        // Limpiar carrito después de la compra
        cart = [];
        updateCart();
        saveCart();
        closeCartSidebar();
    }
    
    // Event Listeners
    searchToggle.addEventListener('click', toggleSearchBar);
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    filterBtns.forEach(btn => btn.addEventListener('click', filterProducts));
    sortSelect.addEventListener('change', sortProducts);
    addToCartBtns.forEach(btn => btn.addEventListener('click', addToCart));
    checkoutBtn.addEventListener('click', checkout);
    
    // Inicializar funciones
    initVideoPlayback();
    loadCart();
    loadRecommendations();
    initRecommendedSlider();
    
    // Aplicar filtro "Todos" por defecto
    document.querySelector('.filter-btn[data-category="all"]').click();
    
    // Añadir estilos para notificaciones
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--dark-gray);
            color: var(--white);
            padding: 1.5rem 2.5rem;
            border-radius: var(--radius);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1002;
            transform: translateY(10rem);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});