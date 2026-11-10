// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

// Reading progress indicator
const progress = document.getElementById('progress');
function updateProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progress.style.width = `${percentage}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Contact form opens the visitor's email application with the message filled in.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:rahulpuppala1221@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('formNote').textContent = 'Your email application should open with the message details.';
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
