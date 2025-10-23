/* script.js
   - Toggle mobile menu
   - Animate skill bars when section appears
*/

/* Mobile menu toggle */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    // toggle nav visibility on small screens
    nav.style.display = (nav.style.display === 'flex') ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(0,0,0,0.75)';
    nav.style.position = 'absolute';
    nav.style.right = '20px';
    nav.style.top = '68px';
    nav.style.padding = '10px';
    nav.style.borderRadius = '8px';
  });
}

/* Skill bar animation when skills section enters viewport */
function animateSkills() {
  const skills = document.querySelectorAll('.skill-bar');
  skills.forEach(bar => {
    const fill = bar.querySelector('.skill-fill');
    const percent = bar.getAttribute('data-percent') || '0';
    // set width with short delay for nicer effect
    setTimeout(() => {
      fill.style.width = percent + '%';
      // ensure inner text shows correct percent
      const span = fill.querySelector('span');
      if (span) span.textContent = percent + '%';
    }, 150);
  });
}

/* Use IntersectionObserver to detect when #skills is visible */
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.5 });
  obs.observe(skillsSection);
}

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
document.querySelectorAll('.skill-bar').forEach(bar => {
  const percent = bar.getAttribute('data-percent');
  const fill = bar.querySelector('.skill-fill');
  fill.style.width = percent + '%';
});
