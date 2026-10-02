// Edit contact details here. Leave a value empty ("") to hide that button.
const CONFIG = {
  email: "nickcastro1520@gmail.com",
  linkedin: "https://www.linkedin.com/in/nicolas-castro-4081545b"
};

(function () {
  const email = document.getElementById("email-btn");
  const linkedin = document.getElementById("linkedin-btn");
  if (CONFIG.email) { email.href = "mailto:" + CONFIG.email; email.hidden = false; } else { email.hidden = true; }
  if (CONFIG.linkedin) { linkedin.href = CONFIG.linkedin; linkedin.hidden = false; } else { linkedin.hidden = true; }

  const btn = document.querySelector(".menu-btn");
  const links = document.getElementById("nav-links");
  const setOpen = (open) => {
    links.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
})();
