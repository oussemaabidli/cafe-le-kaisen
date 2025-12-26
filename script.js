console.log = function () {};

document.getElementById("year").textContent = new Date().getFullYear();

// simple gallery lightbox
document.querySelectorAll("[data-large]").forEach((img) => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);z-index:999";
    const big = document.createElement("img");
    big.src = img.src;
    big.style.maxWidth = "90%";
    big.style.maxHeight = "90%";
    big.style.borderRadius = "12px";
    overlay.appendChild(big);
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
document
  .querySelectorAll(".card, .hero-card, .menu-item, .testi")
  .forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.style.transition = "0.6s ease";
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      });
    });

    obs.observe(el);
  });
const slider = document.getElementById("menuSlider");
let isScrolling = false;

function scrollMenu(direction) {
  if (isScrolling) return; // 🔒 block spam clicks

  const card = slider.querySelector(".menu-card");
  if (!card) return;

  const sliderStyle = window.getComputedStyle(slider);
  const gap = parseInt(sliderStyle.gap) || 0;

  const cardWidth = card.offsetWidth + gap;

  isScrolling = true;

  slider.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth",
  });

  // ⏱ unlock after scroll animation
  setTimeout(() => {
    isScrolling = false;
  }, 400); // matches smooth scroll duration
}
/* Toggle mobile navigation menu */
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

/* Optional: ensure the footer year updates automatically */
document.getElementById("year").textContent = new Date().getFullYear();
const galleryImages = [
  "images/téléchargement (1).jpg",
  "images/téléchargement (2).jpg",
  "images/téléchargement.jpg",
];

let currentImage = 0;
const galleryImg = document.getElementById("galleryImage");

setInterval(() => {
  galleryImg.style.opacity = 0;

  setTimeout(() => {
    currentImage = (currentImage + 1) % galleryImages.length;
    galleryImg.src = galleryImages[currentImage];
    galleryImg.style.opacity = 1;
  }, 400);
}, 3000); // change every 3 seconds
