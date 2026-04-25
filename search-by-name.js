// Search by Name functionality

async function searchLetters() {
  const searchInput = document.getElementById('searchName');
  const searchName = searchInput.value.trim();

  if (!searchName) {
    alert('Please enter a name to search for.');
    return;
  }

  const searchedNameSpan = document.getElementById('searchedName');
  const searchResults = document.getElementById('searchResults');
  const lettersList = document.getElementById('lettersList');
  const noResults = document.getElementById('noResults');

  searchedNameSpan.textContent = searchName;
  searchResults.style.display = 'block';
  lettersList.innerHTML = '<div class="loading">Searching...</div>';

  try {
    const { searchNamedLetters } = await import('supabase-db.js');
    const foundLetters = await searchNamedLetters(searchName);

    lettersList.innerHTML = '';

    if (foundLetters.length > 0) {
      noResults.style.display = 'none';
      foundLetters.forEach(letter => {
        const letterCard = document.createElement('div');
        letterCard.className = 'letter-card';
        letterCard.innerHTML = `
          <div class="letter-header">
            <span class="letter-category">To: ${letter.recipient_name}</span>
            <span class="letter-date">${new Date(letter.created_at).toLocaleDateString()}</span>
          </div>
          <div class="letter-content">
            <p>Dear ${letter.recipient_name},</p>
            <p>${letter.content.replace(/\n/g, '</p><p>')}</p>
            <p>From,<br>${letter.author_name}</p>
          </div>
        `;
        lettersList.appendChild(letterCard);
      });
    } else {
      noResults.style.display = 'block';
    }
  } catch (error) {
    console.error('Error searching letters:', error);
    lettersList.innerHTML = '<p class="error">Sorry, there was an error searching for letters. Please try again later.</p>';
  }
}

// Initialize search by name page
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchName');

  // Allow searching by pressing Enter
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchLetters();
    }
  });
});</content>
<parameter name="filePath">/Users/huohuade/Documents/Website:App Making/My Mental Health/search-by-name.js
