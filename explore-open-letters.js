// --- 1. IMPORT GOOGLE SHEETS ENGINE ---
import { DB } from './db.js';

// --- 2. CORE DATA LOADING LOGIC ---
async function loadLetters(category = 'all') {
  const lettersContainer = document.querySelector('.letters-container');
  if (!lettersContainer) return;

  try {
    // Show a loading text while fetching records from Google Sheets
    lettersContainer.innerHTML = '<div class="loading">Loading letters...</div>';

    // Call our fetch utility wrapper
    const letters = await DB.getOpenLetters(category);

    // Clear loading text
    lettersContainer.innerHTML = '';

    // Check if the Google Sheet returned an empty dataset
    if (!letters || letters.length === 0) {
      lettersContainer.innerHTML = '<p class="no-letters" style="text-align: center; padding: 2rem; color: var(--muted); font-style: italic;">No letters found in this category yet. Be the first to share!</p>';
      return;
    }

    // Loop through rows and construct card HTML elements dynamically
    letters.forEach(letter => {
      const letterCard = document.createElement('div');
      letterCard.className = 'project-card card letter-card'; // Added 'card' to inherit the cloud look
      letterCard.setAttribute('data-category', letter.Category || 'uncategorised');

      // Formatting text structures cleanly
      const rawCategory = letter.Category || 'uncategorised';
      const formattedCategory = rawCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      const formattedDate = letter.Timestamp ? new Date(letter.Timestamp).toLocaleDateString() : 'Recent';
      const safeContent = letter.Content ? letter.Content.replace(/\n/g, '</p><p>') : '';
      const authorName = letter.Author || 'Anonymous';

      letterCard.innerHTML = `
        <div class="letter-header" style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.85rem; color: var(--accent); font-weight: 600;">
          <span class="letter-category">${formattedCategory}</span>
          <span class="letter-date" style="color: var(--muted); font-weight: 400;">${formattedDate}</span>
        </div>
        <div class="letter-content" style="line-height: 1.6;">
          <p>${safeContent}</p>
          <p style="margin-top: 1.5rem; text-align: right; font-weight: 600; color: var(--text);">
            <em style="color: var(--muted); font-weight: 400;">-</em> ${authorName}
          </p>
        </div>
      `;

      lettersContainer.appendChild(letterCard);
    });
  } catch (error) {
    console.error('Error loading letters from Google Sheets:', error);
    lettersContainer.innerHTML = '<p class="error" style="text-align: center; color: red; padding: 2rem;">Sorry, there was an error loading the letters. Please try again later.</p>';
  }
}

// --- 3. FILTER EVENT CONTROLS ---
const filterButtons = document.querySelectorAll('.category-filters .filter');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle visibility styles using active classes
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Re-fetch sorted array from our script engine
    loadLetters(button.dataset.category);
  });
});

// --- 4. INITIAL TRIGGER ---
// Run compilation automatically on load
loadLetters();