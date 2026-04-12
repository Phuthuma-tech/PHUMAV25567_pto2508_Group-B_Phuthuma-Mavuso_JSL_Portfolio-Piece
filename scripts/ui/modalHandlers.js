import { addNewTask } from "../tasks/taskManager.js";
import { clearExistingTasks, renderTasks } from "./render.js";
import { resetForm } from "../tasks/formUtils.js";

export function setupNewTaskModalHandler() {
  const form = document.getElementById("new-task-modal-window");
  const dialog = form ? form.closest('dialog') : null;
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const cancelBtn = document.getElementById("cancel-add-btn");

  if (newTaskBtn) {
    newTaskBtn.addEventListener("click", () => dialog.showModal());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => dialog.close());
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedTasks = addNewTask(); // Get updated data from manager
    
    if (updatedTasks) {
      clearExistingTasks();
      renderTasks(updatedTasks);
      resetForm();
      dialog.close();
    }
  });
}

export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  // Ensure IDs match your detail modal in index.html
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;
  modal.showModal();
}