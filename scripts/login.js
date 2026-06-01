const authTabs = document.querySelectorAll('.auth-tab');
const authSubmit = document.querySelector('.auth-submit');

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    authTabs.forEach((button) => {
      button.classList.remove('active');
    });

    tab.classList.add('active');

    if (authSubmit) {
      authSubmit.textContent = tab.dataset.mode === 'signup'
        ? 'Create Account'
        : 'Sign In';
    }
  });
});
