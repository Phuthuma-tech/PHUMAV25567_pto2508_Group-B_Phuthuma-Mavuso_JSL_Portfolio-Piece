/**
 * @module main
 * @description Application entry point. Orchestrates initialisation of all modules:
 * data fetching, rendering, sidebar, theme, and modal event handlers.
 */

import { fetchTasksFromAPI } from "./utils/api.js";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { renderTasks } from "./ui/render.js";
import { setupSidebarManager } from "./ui/sidebarManager.js";
import { setupThemeManager } from "./ui/themeManager.js";
import { setupNewTaskModalHandler, setupEditModalHandlers, openTaskModal } from "./ui/modalHandlers.js";

/**
 * Initialises the Kanban board:
 * 1. Loads tasks from localStorage if available.
 * 2. If not, fetches from the API and caches them.
 * 3. Renders tasks and sets up all UI event handlers.
 */
async function initApp() {
  // 1. Theme and sidebar set up first (no async dependency)
  setupThemeManager();
  setupSidebarManager();

  // 2. Try localStorage first — avoids unnecessary API calls on repeat visits
  let tasks = loadTasksFromStorage();

  if (!tasks || tasks.length === 0) {
    // 3. No local data — fetch from API
    const apiTasks = await fetchTasksFromAPI();
    if (apiTasks && apiTasks.length > 0) {
      // Add a default priority if the API doesn't return one
      tasks = apiTasks.map((t) => ({ priority: "low", ...t }));
      saveTasksToStorage(tasks);
    } else {
      // API failed and no local data — show empty board
      tasks = [];
    }
  }

  // 4. Render all tasks to the board
  renderTasks(tasks);

  // 5. Wire up modals
  setupNewTaskModalHandler();
  setupEditModalHandlers();

  // 6. Event delegation: open edit modal when any task card is clicked
  document.addEventListener("click", (e) => {
    const taskCard = e.target.closest(".task-div");
    if (taskCard) {
      const taskId = taskCard.dataset.taskId;
      const currentTasks = loadTasksFromStorage() || [];
      const task = currentTasks.find((t) => t.id == taskId);
      if (task) openTaskModal(task);
    }
  });
}

document.addEventListener("DOMContentLoaded", initApp);