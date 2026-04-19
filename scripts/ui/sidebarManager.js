/**
 * @module sidebarManager
 * @description Controls sidebar visibility on desktop and mobile.
 * On desktop: hide/show sidebar with toggle buttons.
 * On mobile: the app logo opens the sidebar as a menu overlay.
 */

/**
 * Sets up all sidebar toggle event listeners.
 */
export function setupSidebarManager() {
  const body = document.body;
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-side-bar-btn");
  const showBtn = document.getElementById("show-side-bar-btn");
  const mobileLogo = document.querySelector(".logo-mobile");

  // Desktop: hide sidebar
  if (hideBtn) {
    hideBtn.addEventListener("click", () => {
      body.classList.add("sidebar-hidden");
    });
  }

  // Desktop: show sidebar (the eye/tab button outside the sidebar)
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      body.classList.remove("sidebar-hidden");
    });
  }

  // Mobile: tap the logo to toggle the sidebar as a menu
  if (mobileLogo && sidebar) {
    mobileLogo.style.cursor = "pointer";
    mobileLogo.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
    });

    // Close mobile sidebar when clicking outside it
    document.addEventListener("click", (e) => {
      const isMobile = window.innerWidth <= 1023;
      if (
        isMobile &&
        sidebar.classList.contains("show-sidebar") &&
        !sidebar.contains(e.target) &&
        e.target !== mobileLogo
      ) {
        sidebar.classList.remove("show-sidebar");
      }
    });
  } else {
    console.error("Sidebar elements not found. Check element IDs.");
  }
}