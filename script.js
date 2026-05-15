import { translations } from './translations.js';

// --- 1. Language Setup ---
let currentLang = localStorage.getItem('preferredLang') || 'tl';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // If it's an input or textarea, translate the placeholder
      if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Update the button label to show the NEXT language option
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    // If current is Taglish, button shows Vietnam flag. If current is VI, shows PH flag.
    langToggle.textContent = lang === 'tl' ? '🇻🇳 VI' : '🇵🇭 TL';
  }
  
  document.documentElement.lang = lang;
}

// --- 2. Fun Facts (Translated) ---
const funFacts = {
  tl: [
    'Hindi ko pa alam ang ilalagay dito.',
    'Nag-aaral ako ngayon ng Vietnamese!',
    'Mahilig ako sa kulay blue!'
  ],
  vi: [
    'Tôi chưa biết nên đặt gì vào trường này.',
    'Tôi đang học tiếng Việt!',
    'Tôi thích màu xanh dương!'
  ]
};

function randomFact() {
  const facts = funFacts[currentLang] || funFacts['tl']; // Fallback to Taglish
  const index = Math.floor(Math.random() * facts.length);
  return facts[index];
}

// --- 3. UI Elements ---
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const funFactCard = document.getElementById('funFact');
const showFunFactButton = document.getElementById('showFunFact');
const filterButtons = document.querySelectorAll('.project-controls .filter');
const projectCards = document.querySelectorAll('.project-card');

// --- 4. Core Functions ---
function showFunFact() {
  if (funFactCard) {
    funFactCard.textContent = randomFact();
    funFactCard.classList.remove('hidden');
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    // ☁️ matches your sky blue theme for light mode, 🌙 for dark mode
    themeToggle.textContent = theme === 'dark' ? '☀️' : '☁️'; 
  }
  localStorage.setItem('portfolioTheme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function filterProjects(category) {
  projectCards.forEach((card) => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
  });
}

// --- 5. Event Listeners ---

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Language Toggle
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'tl' ? 'vi' : 'tl';
    localStorage.setItem('preferredLang', currentLang);
    applyTranslations(currentLang);
    
    // Hide fun fact when switching languages to refresh the text
    if (funFactCard) funFactCard.classList.add('hidden');
  });
}

// Fun Fact Button
if (showFunFactButton) {
  showFunFactButton.addEventListener('click', showFunFact);
}

// Project Filters (For Resources Page)
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.category);
  });
});

// --- 6. Initialization ---
const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
setTheme(savedTheme);
applyTranslations(currentLang);