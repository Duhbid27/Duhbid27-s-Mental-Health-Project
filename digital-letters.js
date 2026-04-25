// Digital Letters functionality

function openPublicBoard() {
  window.location.href = 'explore-open-letters.html';
}

function writeOpenLetter() {
  window.location.href = 'write-open-letter.html';
}

function openNameSearch() {
  window.location.href = 'search-by-name.html';
}

function writeNamedLetter() {
  window.location.href = 'write-named-letter.html';
}

function createGreetingCard() {
  window.location.href = 'create-card.html';
}

// Initialize digital letters page
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to buttons using data-action attributes
  const buttons = document.querySelectorAll('button[data-action]');

  buttons.forEach(button => {
    const action = button.dataset.action;

    button.addEventListener('click', function() {
      switch(action) {
        case 'explore-open':
          openPublicBoard();
          break;
        case 'write-open':
          writeOpenLetter();
          break;
        case 'search-name':
          openNameSearch();
          break;
        case 'write-named':
          writeNamedLetter();
          break;
        case 'create-card':
          createGreetingCard();
          break;
      }
    });
  });
});
