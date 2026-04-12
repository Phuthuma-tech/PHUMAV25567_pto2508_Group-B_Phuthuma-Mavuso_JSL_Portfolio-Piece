export function setupThemeManager() {
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  if (!themeSwitch) {
    console.error("Theme switch checkbox not found!");
    return;
  }

  // Initial check
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    console.log("Switch toggled!"); // Does this show in console?
    
    if (themeSwitch.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      console.log("Dark mode active");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      console.log("Light mode active");
    }
  });
}