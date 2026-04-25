// 1. ALWAYS put imports at the very top of the file
import { saveOpenLetter } from './supabase-db.js';

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
        // 2. Now we actually call the function and wait for the result
        const success = await saveOpenLetter(letterData);

        if (success) {
            alert('Your letter has been posted! Thank you for sharing with the community.');
            form.reset();
            // Optionally redirect to explore page
            // window.location.href = 'explore-open-letters.html';
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
