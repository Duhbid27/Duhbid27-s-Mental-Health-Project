// --- 1. ACTION TO URL MAP ---
const routes = {
  'explore-open': 'explore-open-letters.html',
  'write-open': 'write-open-letter.html',
  'search-name': 'search-by-name.html',
  'write-named': 'write-named-letter.html',
  'view-special-hub': 'special-cards.html' // Directly points to your bespoke manual archive
};

// --- 2. BULLETPROOF EVENT DELEGATION ENGINE ---
// Listening at the document level guarantees clicks are captured even if translations modify the DOM
document.addEventListener('click', (event) => {
  // Find the closest button with a data-action attribute from the clicked target
  const button = event.target.closest('button[data-action]');
  
  // If the click wasn't on or inside an action button, do nothing safely
  if (!button) return;

  const action = button.dataset.action;
  const targetUrl = routes[action];

  if (targetUrl) {
    console.log(`Navigating securely to: ${targetUrl}`);
    window.location.href = targetUrl;
  } else {
    console.warn(`Route for action "${action}" is not defined in the mapping dictionary.`);
  }
});