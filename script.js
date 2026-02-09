// Enkel JavaScript som markerer aktiv seksjon i menyen ved scrolling
const links = document.querySelectorAll(".nav-list a, .hero-nav a");
const sections = document.querySelectorAll("main section, .hero");

function setActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Myk scrolling for lenker i navigasjonen
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Fade-in ved scroll for alle seksjoner (hero er alltid synlig)
const revealItems = document.querySelectorAll("main section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

// Enkel bildekarrusell for Prosjekter
const carousels = document.querySelectorAll("[data-carousel]");
carousels.forEach((carousel) => {
  const images = Array.from(carousel.querySelectorAll(".carousel-img"));
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  if (images.length === 0 || !prevBtn || !nextBtn) {
    return;
  }

  let index = 0;
  let backIndex = images.length - 1;

  const render = (newIndex, prevIndex = backIndex) => {
    index = (newIndex + images.length) % images.length;
    backIndex = prevIndex;

    images.forEach((img) => img.classList.remove("is-active", "is-back"));
    images[index].classList.add("is-active");
    if (images.length > 1) {
      images[backIndex].classList.add("is-back");
    }
  };

  render(0, backIndex);

  prevBtn.addEventListener("click", () => render(index - 1, index));
  nextBtn.addEventListener("click", () => render(index + 1, index));
});

// Animer ferdighetsnivÃ¥ i Programmer og verktÃ¸y nÃ¥r seksjonen kommer i view
const skillsList = document.querySelector(".skills-list");
if (skillsList) {
  const skillsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  skillsObserver.observe(skillsList);
}
