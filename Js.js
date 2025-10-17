/* ===========================
   SITE CONFIG
   =========================== */
const SITE = {
  name: "Shashank Santosh Kate.",
  bio: "I'm a computer engineering student and web developer. I like building practical projects and learning cybersecurity.",
  about: "I study at JSPM'S BIT College. I build small web apps using HTML, CSS, and JavaScript. I am preparing mini projects for my semester.",
  email: "shashankkate30@gmail.com",
  portfolioLink: "https://your-site.example",
  heroPhoto: "skate.jpg" , 
  skills: ["C, C++", "HTML", "CSS", "JavaScript", "Node.js", "Git", "MySQL"],

  // experience: [
  //   "Student — JSPM's Bhivarabai Institute of Technology (2022 - Present)",
  //    "Mini Project — Inventory Management System (2024)",
  //    "Online Food Ordering Website(E-commerce) (2025)",
  //    ],

  projects: [
    {
      title: "Inventory Management System (Mini Project)",
      description: "An HTML/CSS/JS inventory site with add, list, and search using localStorage.",
      image: "Inventry.webp"
    },
    {
      title: "Online Food Ordering Website",
      description: "Basic e-commerce style site with landing page, menu, about, and order form using JS.",
      image: "Food_Order_1.jpg"
    },
    {
      title: "Weather Dashboard",
      description: "Weather app using OpenWeatherMap API. Shows current weather + 5-day forecast with search history.",
      image: "Weather.webp"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects, skills, and contact form. Built using HTML, CSS, and JavaScript.",
      image: "Portfolio.webp"
    }
  ]
};

/* ===========================
   DOM HELPERS
   =========================== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ===========================
   FILL HERO + ABOUT
   =========================== */
$("#heroName").innerText = `Hi, I'm ${SITE.name || "Your Name"}`;
$("#heroBio").innerText = SITE.bio;
$("#aboutText").innerText = SITE.about;
$("#heroPhoto").src = SITE.heroPhoto;
$("#emailLink").href = `mailto:${SITE.email}`;
$("#emailLink").innerText = SITE.email;
$("#portfolioLink").href = SITE.portfolioLink;
$("#portfolioLink").innerText = SITE.portfolioLink;
$("#footerYear").innerText = new Date().getFullYear();

/* ===========================
   SKILLS + EXPERIENCE
   =========================== */
$("#skillsList").innerHTML = SITE.skills.map(s => `<li>${s}</li>`).join("");
$("#expList").innerHTML = SITE.experience.map(e => `<li>${e}</li>`).join("");

/* ===========================
   PROJECT CARDS
   =========================== */
const projectsGrid = $("#projectsGrid");
function createProjectCard(p) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}" 
         onerror="this.src='images/project-placeholder.png'"/>
    <h3>${p.title}</h3>
    <p>${p.description}</p>
  `;
  return card;
}
SITE.projects.forEach(p => projectsGrid.appendChild(createProjectCard(p)));

/* ===========================
   CONTACT FORM (EmailJS)
   =========================== */
const form = $("#contactForm");
const formMsg = $("#formMsg");

form.addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  const message = f.message.value.trim();

  if (!name || !email || !message) {
    formMsg.innerText = "⚠️ Please fill all fields.";
    return;
  }

  formMsg.innerText = "⏳ Sending...";

  // Replace with your EmailJS Service + Template IDs
  emailjs.send("service_4g2zpfk", "template_zuvt3pe", {
    from_name: name,
    from_email: email,
    message: message
  }).then(() => {
    formMsg.innerText = "✅ Message sent successfully!";
    f.reset();
  }).catch(err => {
    console.error(err);
    formMsg.innerText = "❌ Failed to send. Try again.";
  });
});

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
$("#menuToggle").addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  if (nav.style.display === "flex") {
    nav.style.display = "";
  } else {
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.right = "20px";
    nav.style.top = "62px";
    nav.style.background = "rgba(3,7,14,0.95)";
    nav.style.padding = "10px";
    nav.style.borderRadius = "8px";
  }
});

/* ===========================
   SMOOTH SCROLL
   =========================== */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});



