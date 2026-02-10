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

// YouTube embed med egen forside (uten synlig YouTube-UI)
const videoEmbeds = document.querySelectorAll(".video-embed");
videoEmbeds.forEach((wrapper) => {
  const videoId = wrapper.dataset.videoId;
  const cover = wrapper.querySelector(".video-cover");
  if (!videoId || !cover) {
    return;
  }

  cover.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&color=white&iv_load_policy=3`;
    iframe.title = "Video";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    wrapper.innerHTML = "";
    wrapper.appendChild(iframe);
  });
});

// Flyvende mus pÃ¥ hele siden
const batCursor = document.querySelector(".bat-cursor");
if (batCursor) {
  let rafId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let isVisible = false;

  const moveBat = () => {
    const ease = 0.18;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    batCursor.style.left = `${currentX}px`;
    batCursor.style.top = `${currentY}px`;
    rafId = requestAnimationFrame(moveBat);
  };

  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!isVisible) {
      currentX = targetX;
      currentY = targetY;
      batCursor.style.opacity = "1";
      isVisible = true;
      if (!rafId) {
        rafId = requestAnimationFrame(moveBat);
      }
    }
  });

  document.addEventListener("mouseleave", () => {
    batCursor.style.opacity = "0";
    isVisible = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
}
