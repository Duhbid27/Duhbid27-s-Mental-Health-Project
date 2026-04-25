// Create Card functionality

function previewCard() {
  const occasion = document.getElementById('cardOccasion').value;
  const customOccasion = document.getElementById('customOccasion').value;
  const theme = document.getElementById('cardTheme').value;
  const recipient = document.getElementById('recipientName').value;
  const message = document.getElementById('cardMessage').value;
  const sender = document.getElementById('senderName').value;

  if (!message.trim()) {
    alert('Please enter a message for your card.');
    return;
  }

  const cardDisplay = document.getElementById('cardDisplay');
  const cardPreview = document.getElementById('cardPreview');

  // Determine occasion text
  let occasionText = occasion;
  if (occasion === 'custom' && customOccasion) {
    occasionText = customOccasion;
  } else {
    occasionText = occasion.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  // Create card HTML
  cardDisplay.innerHTML = `
    <div class="digital-card ${theme}">
      <div class="card-header">
        <h2>${occasionText}</h2>
      </div>
      <div class="card-content">
        ${recipient ? `<p class="recipient">Dear ${recipient},</p>` : ''}
        <p class="message">${message.replace(/\n/g, '</p><p class="message">')}</p>
        ${sender ? `<p class="signature">With love,<br>${sender}</p>` : ''}
      </div>
    </div>
  `;

  cardPreview.style.display = 'block';
  cardPreview.scrollIntoView({ behavior: 'smooth' });
}

function createCard() {
  const message = document.getElementById('cardMessage').value;
  if (!message.trim()) {
    alert('Please enter a message for your card.');
    return;
  }

  // Generate a unique card ID
  const cardId = 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  const cardData = {
    id: cardId,
    occasion: document.getElementById('cardOccasion').value,
    custom_occasion: document.getElementById('customOccasion').value,
    theme: document.getElementById('cardTheme').value,
    recipient_name: document.getElementById('recipientName').value,
    message: message,
    sender_name: document.getElementById('senderName').value
  };

  // Save to database
  saveCardToDatabase(cardData);
}

async function saveCardToDatabase(cardData) {
  try {
    const { saveDigitalCard } = await import('../../Data Base/supabase-db.js');

    const savedCard = await saveDigitalCard(cardData);

    if (savedCard) {
      // Generate shareable link
      const shareableLink = `${window.location.origin}/view-card.html?id=${cardData.id}`;

      // Show the link
      document.getElementById('shareableLink').value = shareableLink;
      document.getElementById('cardLink').style.display = 'block';

      alert('Your digital card has been created! Copy the link below to share it.');
    } else {
      alert('Sorry, there was an error creating your card. Please try again.');
    }
  } catch (error) {
    console.error('Error saving card:', error);
    alert('Sorry, there was an error creating your card. Please try again.');
  }
}

function closePreview() {
  document.getElementById('cardPreview').style.display = 'none';
  document.getElementById('cardLink').style.display = 'none';
}

function copyLink() {
  const linkInput = document.getElementById('shareableLink');
  linkInput.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
}

// Initialize create card page
document.addEventListener('DOMContentLoaded', function() {
  const occasionSelect = document.getElementById('cardOccasion');
  const customOccasionGroup = document.getElementById('customOccasionGroup');

  occasionSelect.addEventListener('change', function() {
    customOccasionGroup.style.display = this.value === 'custom' ? 'block' : 'none';
  });
});</content>
<parameter name="filePath">/Users/huohuade/Documents/Website:App Making/My Mental Health/create-card.js