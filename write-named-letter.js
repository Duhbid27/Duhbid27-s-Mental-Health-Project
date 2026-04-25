// Write Named Letter functionality

async function submitNamedLetter(event) {
  event.preventDefault();

  const form = document.getElementById('namedLetterForm');
  const formData = new FormData(form);

  const letterData = {
    recipient_name: formData.get('recipientName'),
    content: formData.get('content'),
    author_name: formData.get('authorName') || 'Anonymous'
  };

  try {
    const { saveNamedLetter } = await import('supabase-db.js');

    const success = await saveNamedLetter(letterData);

    if (success) {
      alert(`Your letter to ${letterData.recipient_name} has been posted! Others searching for this name will be able to find it.`);
      form.reset();
      // Optionally redirect to search page
      // window.location.href = 'search-by-name.html';
    } else {
      alert('Sorry, there was an error posting your letter. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Sorry, there was an error posting your letter. Please try again.');
  }
}

// Initialize write named letter page
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('namedLetterForm');
  if (form) {
    form.addEventListener('submit', submitNamedLetter);
  }
});</content>
<parameter name="filePath">/Users/huohuade/Documents/Website:App Making/My Mental Health/write-named-letter.js
