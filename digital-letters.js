// --- 1. ACTION TO URL MAP ---
// A clean dictionary pairing data-action names directly with their destination pages
const routes = {
  'explore-open': 'explore-open-letters.html',
  'write-open': 'write-open-letter.html',
  'search-name': 'search-by-name.html',
  'write-named': 'write-named-letter.html',
  'create-card': 'create-card.html'
};

// --- 2. AUTOMATIC EVENT BINDING ---
// Select all action buttons on the page
const buttons = document.querySelectorAll('button[data-action]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const targetUrl = routes[action];

    // If the route exists in our dictionary, redirect the user immediately
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      console.warn(`Route for action "${action}" is not defined.`);
    }
  });
});