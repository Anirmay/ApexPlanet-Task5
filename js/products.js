window.ApexPlanet = window.ApexPlanet || {};

window.ApexPlanet.initializeProducts = function () {
  if (document.body.dataset.page !== 'products') return;
  if (window.__apexPlanetProductInit) return;
  window.__apexPlanetProductInit = true;

  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');

  function renderProducts() {
    const category = categoryFilter ? categoryFilter.value : 'All';
    const priceRange = priceFilter ? priceFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const productGrid = document.getElementById('productGrid');
    const resultsSummary = document.getElementById('resultsSummary');

    let filtered = products.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category;
      const searchMatch = !searchTerm || product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm);
      const priceMatch = priceRange === 'all' || matchesPriceRange(product.price, priceRange);
      return categoryMatch && searchMatch && priceMatch;
    });

    const sortValue = sortSelect ? sortSelect.value : 'featured';
    if (sortValue === 'low-high') filtered.sort((a, b) => a.price - b.price);
    if (sortValue === 'high-low') filtered.sort((a, b) => b.price - a.price);
    if (sortValue === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (sortValue === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortValue === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

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

      productGrid.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => addToCart(Number(button.dataset.productId)));
      });
    }

    if (resultsSummary) {
      resultsSummary.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }
  }

  [categoryFilter, priceFilter, sortSelect].forEach((element) => {
    if (element) element.addEventListener('change', renderProducts);
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderProducts);
  }

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');
  if (requestedCategory && categoryFilter) {
    categoryFilter.value = requestedCategory;
  }

  renderProducts();
};

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

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'products') {
    window.ApexPlanet.initializeProducts();
  }
});
