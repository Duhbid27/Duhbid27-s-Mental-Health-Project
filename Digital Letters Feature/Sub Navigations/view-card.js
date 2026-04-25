// View Card functionality

async function loadCard() {
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get('id');

  if (!cardId) {
    showError();
    return;
  }

  try {
    const { getDigitalCard } = await import('../../Data Base/supabase-db.js');
    const card = await getDigitalCard(cardId);

    if (!card) {
      showError();
      return;
    }

    displayCard(card);
  } catch (error) {
    console.error('Error loading card:', error);
    showError();
  }
}

function displayCard(card) {
  const container = document.getElementById('cardContainer');

  // Determine occasion text
  let occasionText = card.occasion;
  if (card.occasion === 'custom' && card.custom_occasion) {
    occasionText = card.custom_occasion;
  } else {
    occasionText = card.occasion.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  container.innerHTML = `
    <div class="digital-card ${card.theme}">
      <div class="card-header">
        <h2>${occasionText}</h2>
      </div>
      <div class="card-content">
        ${card.recipient_name ? `<p class="recipient">Dear ${card.recipient_name},</p>` : ''}
        <p class="message">${card.message.replace(/\n/g, '</p><p class="message">')}</p>
        ${card.sender_name ? `<p class="signature">With love,<br>${card.sender_name}</p>` : ''}
      </div>
    </div>
  `;
}

function showError() {
  document.getElementById('cardContainer').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'block';
}

// Initialize view card page
document.addEventListener('DOMContentLoaded', function() {
  loadCard();
});</content>
<parameter name="filePath">/Users/huohuade/Documents/Website:App Making/My Mental Health/view-card.js