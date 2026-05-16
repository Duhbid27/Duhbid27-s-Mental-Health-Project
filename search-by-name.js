// --- 1. IMPORT GOOGLE SHEETS ENGINE ---
import { DB } from './db.js';

// --- 2. CORE SEARCH LOGIC ---
async function searchLetters() {
  const searchInput = document.getElementById('searchName');
  if (!searchInput) return;

  const searchName = searchInput.value.trim();

  // Guard clause if user submits an empty field
  if (!searchName) {
    alert('Please enter a name to search for.');
    return;
  }

  // Target UI sections for populating outcomes
  const searchedNameSpan = document.getElementById('searchedName');
  const searchResults = document.getElementById('searchResults');
  const lettersList = document.getElementById('lettersList');
  const noResults = document.getElementById('noResults');

  if (searchedNameSpan) searchedNameSpan.textContent = searchName;
  if (searchResults) searchResults.style.display = 'block';
  if (lettersList) lettersList.innerHTML = '<div class="loading" style="text-align: center; color: var(--muted); font-style: italic;">Searching Google Sheets...</div>';
  if (noResults) noResults.style.display = 'none';

  try {
    // Query rows directly from Google Sheet matching the string parameter
    const foundLetters = await DB.searchNamedLetters(searchName);

    if (lettersList) lettersList.innerHTML = '';

    // If matching entries exist, process and display rows
    if (foundLetters && foundLetters.length > 0) {
      if (noResults) noResults.style.display = 'none';

      foundLetters.forEach(letter => {
        const letterCard = document.createElement('div');
        letterCard.className = 'project-card card letter-card'; // Inherits the cloud frosted glass aesthetic
        
        // Match keys directly with Capitalized spreadsheet row headers
        const recipient = letter.RecipientName || searchName;
        const formattedDate = letter.Timestamp ? new Date(letter.Timestamp).toLocaleDateString() : 'Recent';
        const safeContent = letter.Content ? letter.Content.replace(/\n/g, '</p><p>') : '';
        const authorName = letter.Author || 'Anonymous';

        letterCard.innerHTML = `
          <div class="letter-header" style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.85rem; color: var(--accent); font-weight: 600;">
            <span class="letter-category">To: ${recipient}</span>
            <span class="letter-date" style="color: var(--muted); font-weight: 400;">${formattedDate}</span>
          </div>
          <div class="letter-content" style="line-height: 1.6;">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Dear ${recipient},</p>
            <p>${safeContent}</p>
            <p style="margin-top: 1.5rem; text-align: right; font-weight: 600; color: var(--text);">
              <em style="color: var(--muted); font-weight: 400; font-style: normal;">From,</em><br>${authorName}
            </p>
          </div>
        `;
        lettersList.appendChild(letterCard);
      });
    } else {
      // Toggle secondary fall-through view state if search has zero matching results
      if (noResults) noResults.style.display = 'block';
    }
  } catch (error) {
    console.error('Error searching letters from Google Sheets:', error);
    if (lettersList) {
      lettersList.innerHTML = '<p class="error" style="text-align: center; color: red; padding: 2rem;">Sorry, there was an error processing your query. Please try again later.</p>';
    }
  }
}

// --- 3. EXPOSE FUNCTION TO MODULE SCOPE ---
// Essential line to ensure HTML inline onclick calls can reach this method cleanly
window.searchLetters = searchLetters;

// --- 4. KEYBOARD INTERCEPT ACTION ---
// Bind keyboard listener to input field so pressing 'Enter' fires execution safely
const searchInput = document.getElementById('searchName');
if (searchInput) {
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchLetters();
    }
  });
}