// scripts/ui/sidebarManager.js

export function setupSidebarManager() {
  const body = document.body;
  const hideBtn = document.getElementById("hide-side-bar-btn");
  const showBtn = document.getElementById("show-side-bar-btn");

  if (hideBtn && showBtn) {
    hideBtn.addEventListener("click", () => {
      console.log("Hide clicked"); // Check your console!
      body.classList.add("sidebar-hidden");
    });

    showBtn.addEventListener("click", () => {
      console.log("Show (Eye) clicked"); // Check your console!
      body.classList.remove("sidebar-hidden");
    });
  } else {
    console.error("Sidebar buttons not found in the DOM. Check your IDs!");
  }
}