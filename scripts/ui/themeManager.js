/**
 * @module themeManager
 * @description Manages light/dark mode toggling and persists user preference to localStorage.
 */

/**
 * Initialises the theme toggle switch and applies the saved theme on load.
 */
export function setupThemeManager() {
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;
  const logo = document.getElementById("logo");

  if (!themeSwitch) {
    console.error("Theme switch not found.");
    return;
  }

  /**
   * Applies dark or light mode to the document and updates the logo.
   * @param {boolean} isDark - Whether dark mode should be active.
   */
  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add("dark-mode");
      if (logo) logo.src = "./assets/logo-dark.svg";
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      if (logo) logo.src = "./assets/logo-light.svg";
      localStorage.setItem("theme", "light");
    }
    themeSwitch.checked = isDark;
  }

  // Apply saved preference on page load
  applyTheme(localStorage.getItem("theme") === "dark");

  // Listen for toggle changes
  themeSwitch.addEventListener("change", () => {
    applyTheme(themeSwitch.checked);
  });
}