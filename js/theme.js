// Apply saved theme BEFORE DOM renders
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".navbar button");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");
  if (!icon) return;

  // Initialize icon based on saved theme
  icon.classList.remove("ri-moon-fill", "ri-sun-fill");
  icon.classList.add(savedTheme === "light" ? "ri-moon-fill" : "ri-sun-fill");

  toggleBtn.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";

    // Toggle theme
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Swap icon classes
    icon.classList.remove("ri-moon-fill", "ri-sun-fill");
    icon.classList.add(newTheme === "light" ? "ri-moon-fill" : "ri-sun-fill");
  });
});
