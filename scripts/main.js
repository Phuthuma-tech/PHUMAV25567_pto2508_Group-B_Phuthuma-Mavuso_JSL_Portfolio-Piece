import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { setupSidebarManager } from "./ui/sidebarManager.js";
import { 
  setupNewTaskModalHandler, 
  setupEditModalHandlers, 
  openTaskModal 
} from "./ui/modalHandlers.js";

function initApp() {
  // Call this first to ensure buttons are wired up
  setupSidebarManager();
  
  // ... other setup code
}

document.addEventListener("DOMContentLoaded", initApp);

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupSidebarManager();
  
  setupNewTaskModalHandler();
  setupEditModalHandlers();

  document.addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-div');
    if (taskCard) {
      const taskId = taskCard.dataset.taskId;
      const allTasks = loadTasksFromStorage();
      const task = allTasks.find(t => t.id == taskId);
      if (task) openTaskModal(task);
    }
  });
}

document.addEventListener("DOMContentLoaded", initTaskBoard);