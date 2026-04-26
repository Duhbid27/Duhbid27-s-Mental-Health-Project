import { translations } from './translations.js';

// --- 1. Language Setup ---
let currentLang = localStorage.getItem('preferredLang') || 'tl';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // If it's an input/textarea, translate the placeholder
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
    langToggle.textContent = lang === 'tl' ? '🇻🇳 VI' : '🇵🇭 TL';
  }
  
  // Update the HTML lang attribute for accessibility/SEO
  document.documentElement.lang = lang;
}

// --- 2. Fun Facts (Translated) ---
// I've moved these to an object so they change with the language toggle
const funFacts = {
  tl: [
    'Hindi ko pa alam ang ilalagay dito.',
    'Nag-aaral ako ngayon ng Vietnamese!'
  ],
  vi: [
    'Tôi chưa biết nên đặt gì vào trường này.',
    'Tôi đang học tiếng Việt!'
  ]
};

function randomFact() {
  const facts = funFacts[currentLang];
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
  funFactCard.textContent = randomFact();
  funFactCard.classList.remove('hidden');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
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

// Theme
themeToggle.addEventListener('click', toggleTheme);

// Language
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'tl' ? 'vi' : 'tl';
    localStorage.setItem('preferredLang', currentLang);
    applyTranslations(currentLang);
    
    // Hide fun fact when switching languages so it doesn't look weird
    if (funFactCard) funFactCard.classList.add('hidden');
  });
}

// Fun Fact
if (showFunFactButton) {
  showFunFactButton.addEventListener('click', showFunFact);
}

// Project Filters
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.category);
  });
});

// --- 6. Initialization (Run when page loads) ---
const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
setTheme(savedTheme);
applyTranslations(currentLang);