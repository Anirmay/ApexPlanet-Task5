document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  const cartCountEls = document.querySelectorAll('[data-cart-count]');
  const cart = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEls.forEach((cartCount) => {
    cartCount.textContent = String(totalItems);
  });

  const page = document.body.dataset.page;

  if (page === 'home') {
    renderFeaturedProducts();
  }

  if (page === 'details') {
    renderProductDetails();
  }

  if (page === 'products') {
    initProductPage();
  }

  if (page === 'cart') {
    updateCartUI();
    attachCartButtonHandlers();
  }

  if (page === 'contact') {
    initContactForm();
  }
});

function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(totalItems);
  });
}

function renderFeaturedProducts() {
  const featuredProducts = products.slice(0, 4);
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  container.innerHTML = featuredProducts.map((product) => `
    <article class="product-card">
      <a href="product-details.html?id=${product.id}" class="product-image-link" aria-label="View details for ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="260" />
      </a>
      <div class="product-body">
        <div class="product-meta-row">
          <span class="product-category">${product.category}</span>
          <span class="product-rating">★ ${product.rating}</span>
        </div>
        <h3>${product.name}</h3>
        <div class="product-price-row">
          <strong>${currencyFormatter.format(product.price)}</strong>
          <a href="product-details.html?id=${product.id}" class="text-link">View details</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderProductDetails() {
  const container = document.getElementById('productDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id'));
  const product = products.find((item) => item.id === productId);

  if (!product) {
    container.innerHTML = '<div class="empty-state"><h2>Product not found.</h2><a href="products.html" class="btn btn-primary">Back to products</a></div>';
    return;
  }

  container.innerHTML = `
    <div class="detail-layout">
      <div class="detail-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="eager" width="800" height="600" />
      </div>
      <div class="detail-content">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <div class="detail-rating">★ ${product.rating}</div>
        <p class="detail-price">${currencyFormatter.format(product.price)}</p>
        <p>${product.description}</p>
        <div class="detail-actions">
          <button type="button" class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
        </div>
      </div>
    </div>
  `;

  const addBtn = container.querySelector('.add-to-cart');
  addBtn.addEventListener('click', () => addToCart(product.id));
}

function addToCart(productId) {
  const cart = getCart();
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex >= 0) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  if (window.location.pathname.includes('product-details.html')) {
    window.location.href = 'cart.html';
  }
}

function initProductPage() {
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');
  const productGrid = document.getElementById('productGrid');
  const resultsSummary = document.getElementById('resultsSummary');

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category');
  if (initialCategory && categoryFilter) {
    categoryFilter.value = initialCategory;
  }

  function getFilteredProducts() {
    const selectedCategory = categoryFilter ? categoryFilter.value : 'All';
    const selectedPrice = priceFilter ? priceFilter.value : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesQuery = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      const matchesPrice = selectedPrice === 'all' || matchesPriceRange(product.price, selectedPrice);
      return matchesCategory && matchesQuery && matchesPrice;
    });

    const sortValue = sortSelect ? sortSelect.value : 'featured';
    filtered = sortProducts(filtered, sortValue);
    return filtered;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    if (!productGrid) return;

    if (filtered.length === 0) {
      productGrid.innerHTML = '<div class="empty-state"><h3>No products found.</h3></div>';
    } else {
      productGrid.innerHTML = filtered.map((product) => `
        <article class="product-card">
          <a href="product-details.html?id=${product.id}" class="product-image-link" aria-label="View details for ${product.name}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="260" />
          </a>
          <div class="product-body">
            <div class="product-meta-row">
              <span class="product-category">${product.category}</span>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price-row">
              <strong>${currencyFormatter.format(product.price)}</strong>
              <button type="button" class="btn btn-small add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        </article>
      `).join('');
    }

    if (resultsSummary) {
      resultsSummary.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    productGrid.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => addToCart(Number(button.dataset.productId)));
    });
  }

  [categoryFilter, priceFilter, sortSelect].forEach((element) => {
    if (element) {
      element.addEventListener('change', renderProducts);
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderProducts);
  }

  renderProducts();
}

function matchesPriceRange(price, range) {
  switch (range) {
    case '0-500':
      return price < 500;
    case '500-1000':
      return price >= 500 && price <= 1000;
    case '1000-2000':
      return price > 1000 && price <= 2000;
    case '2000+':
      return price > 2000;
    default:
      return true;
  }
}

function sortProducts(list, option) {
  const sorted = [...list];
  switch (option) {
    case 'low-high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'high-low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
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
    if (subtotalValue) subtotalValue.textContent = currencyFormatter.format(0);
    if (quantityValue) quantityValue.textContent = '0';
    if (totalValue) totalValue.textContent = currencyFormatter.format(0);
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
    const filtered = cart.filter((entry) => entry.id !== productId);
    saveCart(filtered);
  } else {
    saveCart(cart);
  }
  updateCartUI();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const successMessage = document.getElementById('contactSuccess');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      showError('name', 'Name is required.');
      valid = false;
    }
    if (!email) {
      showError('email', 'Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject) {
      showError('subject', 'Subject is required.');
      valid = false;
    }
    if (!message) {
      showError('message', 'Message is required.');
      valid = false;
    }

    if (!valid) {
      if (successMessage) successMessage.textContent = '';
      return;
    }

    if (successMessage) {
      successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    }
    form.reset();
  });

  function showError(fieldName, message) {
    const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach((element) => {
      element.textContent = '';
    });
  }
}
