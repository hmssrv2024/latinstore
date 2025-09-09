(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const orders = JSON.parse(localStorage.getItem('lpOrders') || '[]');
    if(!orders.length) return;
    const lastOrder = orders[orders.length - 1];
    const eta = lastOrder.shipping && lastOrder.shipping.eta;
    const today = new Date().toISOString().slice(0,10);
    if(eta && today > eta){
      ['lpUser','lpOrders','lpInvoices','lpClaims','lpPolicies','lpPayments','lpAddresses']
        .forEach(k => localStorage.removeItem(k));
      return;
    }
    const link = document.getElementById('account-link');
    if(link){
      link.style.display = 'inline-block';
      link.classList && link.classList.remove('disabled');
      link.removeAttribute('aria-disabled');
      const user = JSON.parse(localStorage.getItem('lpUser') || '{}');
      const hasInfo = user.name && user.email && user.phone;
      link.setAttribute('href', hasInfo ? 'micuenta.html' : 'informacion.html');
    }
  });
})();
