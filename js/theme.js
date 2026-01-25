// ===============================
// theme.js — CommitFlow Theme Switcher (Refined)
// ===============================

// Apply saved theme BEFORE DOM renders to prevent flash
(function() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.body.setAttribute("data-theme", savedTheme);
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");
  if (!icon) return;

  // Get current theme
  const currentTheme = document.body.getAttribute("data-theme") || "light";

  // Initialize icon based on saved theme
  updateIcon(currentTheme);

  // Toggle theme on button click
  toggleBtn.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";

    // Apply theme to both body and html
    document.body.setAttribute("data-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Save preference
    localStorage.setItem("theme", newTheme);

    // Update icon
    updateIcon(newTheme);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("themechange", { 
      detail: { theme: newTheme } 
    }));
  });

  // Function to update icon
  function updateIcon(theme) {
    if (!icon) return;
    
    // Remove both possible classes
    icon.classList.remove("ri-moon-fill", "ri-sun-fill");
    
    // Add appropriate icon
    if (theme === "light") {
      icon.classList.add("ri-moon-fill");
      toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    } else {
      icon.classList.add("ri-sun-fill");
      toggleBtn.setAttribute("aria-label", "Switch to light mode");
    }
  }

  // Keyboard shortcut: Ctrl/Cmd + Shift + L to toggle theme
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});
