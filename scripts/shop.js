import { products } from "../data/products.js";
import { cart, saveCart } from "../data/cart.js";

function priceConverter(priceCents) {
  return (priceCents / 100).toFixed(2);
}

function renderProducts(filterCategory = 'all') {
  let productsHtml = '';

  const searchQuery = document.getElementById('Search-Bar')?.value.toLowerCase() || '';

  products.forEach((product) => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = !searchQuery ||
      product.Name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    if (matchesCategory && matchesSearch) {
      productsHtml += `
        <div class="product-Container">
          <div class="product-card">
            <img src="${product.image}" class="product-image" loading="lazy">
          </div>
          <div class="product-card-category">${product.category}</div>
          <div class="product-title">${product.Name}</div>
          <div class="product-description">${product.description}</div>
          <div class="product-Price-Container">
            <div class="product-price">$${priceConverter(product.priceCents)}</div>
            <button class="Add-to-Cart-Button js-Add-to-Cart-Button" data-product-id="${product.id}">
              Add
            </button>
          </div>
        </div>
      `;
    }
  });

  const grid = document.querySelector('.Products-Grid');
  if (!grid) return;

  grid.innerHTML = productsHtml || '<p style="padding:40px 20px;color:#888">No products found.</p>';
  addToCart();
}

function addToCart() {
  const buttons = document.querySelectorAll('.js-Add-to-Cart-Button');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.currentTarget.dataset.productId;
      const selectedProduct = products.find(p => p.id == productId);
      if (!selectedProduct) return;

      const existingItem = cart.find(item => item.id == productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...selectedProduct, quantity: 1 });
      }
      saveCart();

      // Visual feedback
      button.textContent = 'Added!';
      button.style.backgroundColor = '#4caf50';
      setTimeout(() => {
        button.textContent = 'Add';
        button.style.backgroundColor = '';
      }, 900);
    });
  });
}

let activeCategory = 'all';

const buttonsMap = [
  ['All-Button', 'all'],
  ['Accessories-Button', 'accessories'],
  ['Books-Button', 'books'],
  ['House-Items-Button', 'house items'],
  ['Tech-Button', 'tech'],
  ['Fashion-Button', 'fashion']
];

buttonsMap.forEach(([id, category]) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      activeCategory = category;
      // Update active style
      document.querySelectorAll('.Button-Selection-Category-Style').forEach(b => {
        b.classList.remove('active-category');
      });
      btn.classList.add('active-category');
      renderProducts(category);
    });
  }
});

// Search
const searchBar = document.getElementById('Search-Bar');
if (searchBar) {
  searchBar.addEventListener('input', () => {
    renderProducts(activeCategory);
  });
}

// Init: mark "All" active
const allBtn = document.getElementById('All-Button');
if (allBtn) allBtn.classList.add('active-category');

renderProducts();
