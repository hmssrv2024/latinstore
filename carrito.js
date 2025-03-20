function goToCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de continuar.');
        return;
    }
    
    // Calcular totales antes de guardar para asegurar que todos los datos de precios estén incluidos
    const totals = {
        subtotal: orderTotal,
        tax: taxAmount,
        shipping: 70, // Costo de envío predeterminado (Express)
        total: orderTotal + taxAmount + 70 // Total con envío predeterminado
    };
    
    // Guardar carrito y totales en localStorage
    localStorage.setItem('latinphone_cart', JSON.stringify(cart));
    localStorage.setItem('latinphone_cart_totals', JSON.stringify(totals));
    
    console.log('Carrito guardado:', JSON.stringify(cart));
    console.log('Totales guardados:', JSON.stringify(totals));
    
    // Redirigir a la página de pago
    window.location.href = 'pago.html';
}

// Asegúrate de que esté correctamente enlazado al botón
if (proceedCheckoutBtn) {
    proceedCheckoutBtn.addEventListener('click', goToCheckout);
}
