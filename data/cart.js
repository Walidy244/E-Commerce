export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearAll() {
  cart = [];
  saveCart();
  renderCart();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    deleteItem(index);
    return;
  }

  saveCart();
  renderCart();
}

function renderEmptyCart(container) {
  container.innerHTML = `
    <div class="empty-cart-content">
      <div class="cart-icon-wrapper">
        <i class="fa-solid fa-bag-shopping"></i>
      </div>
      <h1>Your cart is empty</h1>
      <p>Start shopping to add items to your cart.</p>
      <a href="shop.html">
        <button class="browse-btn">Browse Products</button>
      </a>
    </div>
  `;
}

function renderHeader() {
  return `
    <div class="cart-Header">
      <h1>Your Cart</h1>
      <p class="clearAll-Cart">clear all</p>
    </div>
  `;
}

function renderCartItems() {
  let itemsHtml = '';

  cart.forEach((item, index) => {
    itemsHtml += `
      <div class="cartItem-Container">
        <img src="${item.image}" class="cartItem-Image">

        <div class="cartItem-Info">
          <p class="cartItem-Name">${item.Name}</p>
          <p class="cartItem-Category">${item.category}</p>

          <div class="Add-Delete-CartItem-Container">
            <button class="remove-btn" data-index="${index}">-</button>
            <p class="item-quantity">${item.quantity}</p>
            <button class="add-btn" data-index="${index}">+</button>
          </div>
        </div>

        <div class="price-Container">
          <p class="product-price">$${(item.priceCents / 100).toFixed(2)}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
  });

  return `<div class="cart-items-list">${itemsHtml}</div>`;
}

function attachEventListeners() {
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteItem(Number(btn.dataset.index));
    });
  });

  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      updateQuantity(Number(btn.dataset.index), 1);
    });
  });

  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      updateQuantity(Number(btn.dataset.index), -1);
    });
  });

  const clearBtn = document.querySelector('.clearAll-Cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }
}

function renderCart() {
  const container = document.querySelector('.empty-cart-container');
  if (!container) return;

  if (cart.length === 0) {
    renderEmptyCart(container);
    return;
  }

  container.innerHTML = `
    ${renderHeader()}
    ${renderCartItems()}
  `;

  attachEventListeners();
}

function initCart() {
  renderCart();
}

initCart();