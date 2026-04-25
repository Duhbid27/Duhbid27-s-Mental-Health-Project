// 1. Move the import to the VERY TOP of the file. No brackets or 'try' blocks around it!
import { getOpenLetters } from './supabase-db.js';

// Explore Open Letters functionality
async function loadLetters(category = 'all') {
  const lettersContainer = document.querySelector('.letters-container');
  
  try {
    // 2. Call the function directly (no import needed here anymore)
    const letters = await getOpenLetters(category === 'all' ? null : category);

    lettersContainer.innerHTML = '';

    if (!letters || letters.length === 0) {
      lettersContainer.innerHTML = '<p class="no-letters">No letters found in this category yet. Be the first to share!</p>';
      return;
    }

    letters.forEach(letter => {
      const letterCard = document.createElement('div');
      letterCard.className = 'letter-card';
      letterCard.setAttribute('data-category', letter.category);

      letterCard.innerHTML = `
        <div class="letter-header">
          <span class="letter-category">${letter.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          <span class="letter-date">${new Date(letter.created_at).toLocaleDateString()}</span>
        </div>
        <div class="letter-content">
          <p>${letter.content.replace(/\n/g, '</p><p>')}</p>
          <p><em>- ${letter.author_name}</em></p>
        </div>
      `;

      lettersContainer.appendChild(letterCard);
    });
  } catch (error) {
    console.error('Error loading letters:', error);
    if (lettersContainer) {
      lettersContainer.innerHTML = '<p class="error">Sorry, there was an error loading the letters. Please try again later.</p>';
    }
  }
}

function filterLetters(category) {
  loadLetters(category);
}

// Initialize explore open letters page
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.category-filters .filter');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterLetters(button.dataset.category);
    });
  });

  // Load all letters initially
  loadLetters();
});
