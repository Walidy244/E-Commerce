

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const activeButtonByPage = {
  'index.html': 'Home-button',
  'shop.html': 'Shop-button',
  'contact.html': 'Contact-button',
  'cart.html': 'Cart-button',
  'login.html': 'Login-button'
};

document.querySelectorAll('.header-buttons').forEach((button) => {
  button.classList.remove('header-buttons-clicked');
});

const activeButtonId = activeButtonByPage[currentPage];
const activeButton = document.getElementById(activeButtonId);

if (activeButton) {
  activeButton.classList.add('header-buttons-clicked');
}
