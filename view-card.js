document.addEventListener('DOMContentLoaded', () => {
  const errorPanel = document.getElementById('errorPanel');
  const displayPanel = document.getElementById('cardDisplayPanel');

  // 1. Get the '?c=' string query parameter from the browser window URL bar
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get('c');

  if (!encodedData) {
    showError();
    return;
  }

  try {
    // 2. Base64 Decode the string back into standard JSON text structure
    const decodedJson = decodeURIComponent(atob(encodedData));
    const cardData = JSON.parse(decodedJson);

    // 3. Extract mapped short keys
    const recipient = cardData.r || 'Friend';
    const theme = cardData.t || 'cloudy';
    const message = cardData.m || '';
    const author = cardData.a || 'Anonymous';

    // 4. Inject variables smoothly inside target DOM placeholders
    document.getElementById('viewRecipient').textContent = `Dear ${recipient},`;
    document.getElementById('viewMessage').textContent = message;
    document.getElementById('viewAuthor').innerHTML = `From,<br><span style="font-family: 'Playfair Display', serif; font-weight:700;">${author}</span>`;
    document.getElementById('themeLabel').textContent = `🔒 Private ${theme.toUpperCase()} Card`;

    // 5. Shift body classes dynamically to render background color profiles 
    document.body.className = `theme-${theme}`;

  } catch (error) {
    console.error('Decoding parameters failed entirely:', error);
    showError();
  }

  function showError() {
    if (errorPanel && displayPanel) {
      displayPanel.style.display = 'none';
      errorPanel.style.display = 'block';
    }
  }
});