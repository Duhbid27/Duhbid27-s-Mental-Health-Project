// --- 1. IMPORT GOOGLE SHEETS ENGINE ---
import { DB } from './db.js';

// --- 2. SUBMIT FORM FUNCTION ---
async function submitNamedLetter(event) {
  event.preventDefault();

  const form = document.getElementById('namedLetterForm');
  const formData = new FormData(form);

  // Extract form inputs to match Google Sheets schema parameters
  const recipientName = formData.get('recipientName');
  const content = formData.get('content');
  const authorName = formData.get('authorName') || 'Anonymous';

  try {
    // Call the Google Sheets database handler instead of Supabase
    const result = await DB.postNamedLetter(recipientName, content, authorName);

    if (result && result.status === 'success') {
      alert(`Your letter to ${recipientName} has been posted! Others searching for this name will be able to find it.`);
      form.reset();
      
      // Automatically redirect to the search tab after posting
      window.location.href = 'search-by-name.html';
    } else {
      alert('Sorry, there was an error saving your letter to Google Sheets. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting named letter:', error);
    alert('Sorry, there was an error posting your letter. Please check your connection and try again.');
  }
}

// --- 3. INITIALIZE EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('namedLetterForm');
  if (form) {
    form.addEventListener('submit', submitNamedLetter);
  }
});