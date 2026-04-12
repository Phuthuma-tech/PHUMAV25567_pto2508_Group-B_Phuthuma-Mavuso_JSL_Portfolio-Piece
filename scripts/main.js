import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { 
  setupNewTaskModalHandler, 
  setupEditModalHandlers, 
  openTaskModal 
} from "./ui/modalHandlers.js";

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  
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