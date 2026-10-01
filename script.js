const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const videos = [...document.querySelectorAll('.mini-video video')];

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

videos.forEach((video) => {
  video.addEventListener('loadedmetadata', () => {
    video.closest('.mini-video').classList.add('has-video');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const ageElement = document.querySelector('#age');
if (ageElement) {
  const birthDate = new Date(`${ageElement.dataset.birthdate}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayHasPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!birthdayHasPassed) age -= 1;
  ageElement.textContent = age;
}
