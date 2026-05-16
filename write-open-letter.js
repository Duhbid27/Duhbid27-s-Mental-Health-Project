// --- 1. IMPORT GOOGLE SHEETS ENGINE ---
import { DB } from './db.js';

// --- 2. SUBMIT FORM FUNCTION ---
async function submitOpenLetter(event) {
    event.preventDefault();

    const form = document.getElementById('openLetterForm');
    const formData = new FormData(form);

    // Extract form inputs to match Google Sheets schema parameters
    const category = formData.get('category');
    const content = formData.get('content');
    const authorName = formData.get('authorName') || 'Anonymous';

    try {
        // Call the Google Sheets database handler instead of Supabase
        const result = await DB.postOpenLetter(category, content, authorName);

        if (result && result.status === 'success') {
            alert('Your letter has been posted! Thank you for sharing with the community.');
            form.reset();
            
            // Automatically redirect to the explore tab after a successful post
            window.location.href = 'explore-open-letters.html';
        } else {
            alert('Sorry, there was an error saving your letter to Google Sheets. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting open letter:', error);
        alert('Sorry, there was an error posting your letter. Please check your connection and try again.');
    }
}

// --- 3. INITIALIZE EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('openLetterForm');
    if (form) {
        form.addEventListener('submit', submitOpenLetter);
    }
});