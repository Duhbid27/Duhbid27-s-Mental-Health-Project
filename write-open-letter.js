// Write Open Letter functionality

async function submitOpenLetter(event) {
  event.preventDefault();

  const form = document.getElementById('openLetterForm');
  const formData = new FormData(form);

  const letterData = {
    category: formData.get('category'),
    content: formData.get('content'),
    author_name: formData.get('authorName') || 'Anonymous'
  };

try {
    // We will assume saveOpenLetter is already loaded by the HTML
    import { saveOpenLetter } from './supabase-db.js';

    if (success) {
      alert('Your letter has been posted! Thank you for sharing with the community.');
      form.reset();
    } else {
      alert('Sorry, there was an error posting your letter. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Sorry, there was an error posting your letter. Please try again.');
  }
}

// Initialize write open letter page
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('openLetterForm');
  if (form) {
    form.addEventListener('submit', submitOpenLetter);
  }
});
