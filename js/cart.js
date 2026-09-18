document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'cart') {
    updateCartUI();
    attachCartButtonHandlers();
  }
});

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('apexplanet-cart') || '[]');
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('apexplanet-cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(totalItems);
  });
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalValue = document.getElementById('subtotalValue');
  const quantityValue = document.getElementById('quantityValue');
  const totalValue = document.getElementById('totalValue');

  if (!cartItemsContainer) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-state"><h3>Your cart is empty.</h3><a href="products.html" class="btn btn-primary">Shop now</a></div>';
    if (subtotalValue) subtotalValue.textContent = '₹0';
    if (quantityValue) quantityValue.textContent = '0';
    if (totalValue) totalValue.textContent = '₹0';
    updateCartBadge();
    return;
  }

  const cartItems = cart.map((item) => {
    const product = products.find((productItem) => productItem.id === item.id);
    return { ...product, quantity: item.quantity };
  }).filter(Boolean);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartItemsContainer.innerHTML = cartItems.map((item) => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="180" height="120" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${item.category}</p>
        <p>${currencyFormatter.format(item.price)}</p>
      </div>
      <div class="quantity-controls" aria-label="Update quantity for ${item.name}">
        <button type="button" class="qty-btn" data-action="decrease" data-product-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button type="button" class="qty-btn" data-action="increase" data-product-id="${item.id}">+</button>
      </div>
      <button type="button" class="remove-btn" data-product-id="${item.id}">Remove</button>
    </article>
  `).join('');

  if (subtotalValue) subtotalValue.textContent = currencyFormatter.format(subtotal);
  if (quantityValue) quantityValue.textContent = String(quantity);
  if (totalValue) totalValue.textContent = currencyFormatter.format(subtotal);

  updateCartBadge();
}

function attachCartButtonHandlers() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (!cartItemsContainer) return;

  cartItemsContainer.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const productId = Number(target.dataset.productId);
    const action = target.dataset.action;

    if (target.classList.contains('remove-btn')) {
      removeFromCart(productId);
      return;
    }

    if (action === 'increase') {
      updateCartQuantity(productId, 1);
      return;
    }

    if (action === 'decrease') {
      updateCartQuantity(productId, -1);
    }
  });
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartUI();
}

function updateCartQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);

  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    saveCart(cart.filter((entry) => entry.id !== productId));
  } else {
    saveCart(cart);
  }
  updateCartUI();
}
