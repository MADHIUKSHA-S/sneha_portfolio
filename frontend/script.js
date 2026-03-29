/* ════════════════════════════════════════════
   SNEHA BLESSY — PORTFOLIO SCRIPTS
   ════════════════════════════════════════════ */

// ── Config ──
// Change this to your deployed backend URL on Render
const API_BASE_URL = window.location.origin; // works when backend serves frontend

// ══════════════════════════════════════
// TYPEWRITER
// ══════════════════════════════════════
const typewriterPhrases = [
  "web applications.",
  "REST APIs.",
  "responsive UIs.",
  "database systems.",
  "full-stack solutions.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function typewrite() {
  const current = typewriterPhrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    delay = 400;
  }

  setTimeout(typewrite, delay);
}

// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ══════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  // Scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (scrollY >= top && scrollY < top + height) {
        links.forEach((l) => l.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  });
}

// ══════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Sending...";

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        showStatus("Message sent successfully! I'll get back to you soon. ✨", "success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        showStatus(data.error || "Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      showStatus("Unable to connect to the server. Please email me directly.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = "Send Message";
    }
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = `form-status ${type}`;
    setTimeout(() => {
      status.className = "form-status";
    }, 6000);
  }
}

// ══════════════════════════════════════
// SMOOTH SCROLL (for nav links)
// ══════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  typewrite();
  initReveal();
  initNavbar();
  initContactForm();
  initSmoothScroll();
});
