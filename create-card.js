// --- 1. GENERATE CARD LINK HANDLER ---
function generateCardLink(event) {
  event.preventDefault();

  const recipient = document.getElementById('cardRecipient').value.trim();
  const theme = document.getElementById('cardTheme').value;
  const message = document.getElementById('cardMessage').value.trim();
  const author = document.getElementById('cardAuthor').value.trim() || 'Anonymous';

  // Construct a clean, structured parameters object
  const cardData = {
    r: recipient,
    t: theme,
    m: message,
    a: author
  };

  try {
    // Encode the JSON string to safe Base64 URL format to maintain complete local privacy
    const jsonString = JSON.stringify(cardData);
    const encodedData = btoa(encodeURIComponent(jsonString));

    // Compile dynamic routing path point towards destination viewer page
    const originUrl = window.location.origin + window.location.pathname.replace('create-card.html', 'view-card.html');
    const fullShareableLink = `${originUrl}?c=${encodedData}`;

    // Reveal output layout element and push string value inside input box
    const resultBox = document.getElementById('cardResult');
    const linkInput = document.getElementById('generatedLink');

    if (linkInput && resultBox) {
      linkInput.value = fullShareableLink;
      resultBox.style.display = 'block';
      
      // Auto-scroll screen down into view smoothly
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Error compiling string data parameters:', error);
    alert('Sorry, there was an issue encoding your secure card link. Please try again.');
  }
}

// --- 2. CLIPBOARD COPY UTILITY ---
function copyLinkToClipboard() {
  const linkInput = document.getElementById('generatedLink');
  const copyBtn = document.getElementById('copyLinkBtn');
  
  if (!linkInput) return;

  linkInput.select();
  linkInput.setSelectionRange(0, 99999); // Mobile responsiveness selection fix

  navigator.clipboard.writeText(linkInput.value)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '📋 Copied!';
      copyBtn.style.background = '#10B981'; // Shifts to a calming emerald green layout alert
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = ''; // Reverts back to custom default sky CSS styling rules
      }, 2000);
    })
    .catch(err => {
      console.error('Clipboard permission denied:', err);
      alert('Could not auto-copy. Please select the text box and copy manually!');
    });
}

// --- 3. BIND EVENT LISTENERS ---
const form = document.getElementById('cardForm');
if (form) {
  form.addEventListener('submit', generateCardLink);
}

const copyButton = document.getElementById('copyLinkBtn');
if (copyButton) {
  copyButton.addEventListener('click', copyLinkToClipboard);
}