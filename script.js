const funFacts = [
  'I do not know yet what to put in this field.',
];

const themeToggle = document.getElementById('themeToggle');
const funFactCard = document.getElementById('funFact');
const showFunFactButton = document.getElementById('showFunFact');
const filterButtons = document.querySelectorAll('.project-controls .filter');
const projectCards = document.querySelectorAll('.project-card');

function randomFact() {
  const index = Math.floor(Math.random() * funFacts.length);
  return funFacts[index];
}

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

themeToggle.addEventListener('click', toggleTheme);
if (showFunFactButton) {
  showFunFactButton.addEventListener('click', showFunFact);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.category);
  });
});

const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
setTheme(savedTheme);
