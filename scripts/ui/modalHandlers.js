import { addNewTask } from "../tasks/taskManager.js";
import { handleSaveTask, handleDeleteTask, refreshUI } from "./formHandlers.js";

let currentEditingTaskId = null;

export function setupNewTaskModalHandler() {
  const dialog = document.getElementById("new-task-modal");
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const form = document.getElementById("new-task-modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  if (newTaskBtn) newTaskBtn.addEventListener("click", () => dialog.showModal());
  if (cancelBtn) cancelBtn.addEventListener("click", () => dialog.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedTasks = addNewTask();
    if (updatedTasks) {
      refreshUI(updatedTasks);
      dialog.close();
      form.reset();
    }
  });
}

export function setupEditModalHandlers() {
  const modal = document.getElementById("task-modal");
  const editForm = document.getElementById("edit-task-form");
  const deleteBtn = document.getElementById("delete-task-btn");
  const closeBtn = document.getElementById("close-modal-btn");

  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSaveTask(currentEditingTaskId);
      modal.close();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      handleDeleteTask(currentEditingTaskId);
      modal.close();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", () => modal.close());
}

export function openTaskModal(task) {
  currentEditingTaskId = task.id;
  const modal = document.getElementById("task-modal");
  
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;
  
  modal.showModal();
}