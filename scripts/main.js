import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { setupNewTaskModalHandler, openTaskModal } from "./ui/modalHandlers.js";

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupNewTaskModalHandler();

  // EVENT DELEGATION: Listen for clicks on the board
  document.addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-div');
    if (taskCard) {
      const taskId = taskCard.dataset.taskId;
      const currentTasks = loadTasksFromStorage();
      const task = currentTasks.find(t => t.id == taskId);
      if (task) openTaskModal(task); // Trigger modal from here
    }
  });
}

document.addEventListener("DOMContentLoaded", initTaskBoard);