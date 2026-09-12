document.documentElement.classList.add('js');
const scenes = [...document.querySelectorAll('.scene')];
const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"%3E%3Crect width="800" height="500" fill="%23241442"/%3E%3Ccircle cx="650" cy="100" r="170" fill="%23713dd4"/%3E%3Cpath d="M0 420 270 220 470 390 620 250 800 420V500H0Z" fill="%23f56d32"/%3E%3Ctext x="48" y="92" fill="%23fbf6ed" font-family="Arial" font-size="34" font-weight="700"%3EIMAGEN DE REFERENCIA%3C/text%3E%3C/svg%3E';
const progress = document.querySelector('#chapter-progress');
const number = document.querySelector('#chapter-number');
const name = document.querySelector('#chapter-name');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.querySelectorAll('.reveal').forEach((item) => item.classList.toggle('is-visible', entry.isIntersecting))), { threshold: 0.12 });
scenes.forEach((scene) => observer.observe(scene));
if (reduceMotion) document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
document.querySelectorAll('img').forEach((image) => {
  const applyFallback = () => {
    if (image.dataset.fallbackApplied || image.complete && image.naturalWidth > 0) return;
    image.dataset.fallbackApplied = 'true';
    image.src = fallbackImage;
    image.alt = 'Imagen de referencia no disponible; se muestra una alternativa gráfica.';
  };
  image.addEventListener('error', applyFallback);
  if (image.complete && image.naturalWidth === 0) applyFallback();
});
const chapterObserver = new IntersectionObserver((entries) => { const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (!current) return; const index = scenes.indexOf(current.target) + 1; number.textContent = current.target.dataset.chapter; name.textContent = current.target.dataset.name; progress.style.setProperty('--progress', index / scenes.length); }, { threshold: [0.12, 0.38, 0.65] });
scenes.forEach((scene) => chapterObserver.observe(scene));

const proposalList = document.querySelector('.proposal-list');
proposalList?.addEventListener('toggle', (event) => {
  const openedProposal = event.target;
  if (!(openedProposal instanceof HTMLDetailsElement) || !openedProposal.open) return;

  proposalList.querySelectorAll('details[open]').forEach((proposal) => {
    if (proposal !== openedProposal) proposal.open = false;
  });
});
