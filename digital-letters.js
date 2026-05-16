// --- 1. ACTION TO URL MAP ---
// Clean dictionary mapping buttons cleanly to your manual file routes
const routes = {
  'explore-open': 'explore-open-letters.html',
  'write-open': 'write-open-letter.html',
  'search-name': 'search-by-name.html',
  'write-named': 'write-named-letter.html',
  'view-special-hub': 'special-cards.html' // Your static handcrafted letters list page
};

// --- 2. EVENT BINDING ENGINE ---
const buttons = document.querySelectorAll('button[data-action]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const targetUrl = routes[action];

    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      console.warn(`Route for action "${action}" is not defined.`);
    }
  });
});