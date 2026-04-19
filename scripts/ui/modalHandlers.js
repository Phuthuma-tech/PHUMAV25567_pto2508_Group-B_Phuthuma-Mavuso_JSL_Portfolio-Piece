/**
 * @module modalHandlers
 * @description Manages all modal interactions: opening, closing, saving, and deleting tasks.
 */

import { addNewTask, updateTask, deleteTask } from "../tasks/taskManager.js";
import { renderTasks } from "./render.js";
import { resetForm } from "../tasks/formUtils.js";
import { loadTasksFromStorage } from "../utils/localStorage.js";

/** Tracks the ID of the task currently open in the edit modal */
let activeTaskId = null;

// ─── NEW TASK MODAL ───────────────────────────────────────────────────────────

/**
 * Sets up all event listeners for the "Add New Task" modal.
 */
export function setupNewTaskModalHandler() {
  const form = document.getElementById("new-task-modal-window");
  const dialog = form ? form.closest("dialog") : null;
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const cancelBtn = document.getElementById("cancel-add-btn");

  if (!form || !dialog) {
    console.error("New task modal or form not found.");
    return;
  }

  if (newTaskBtn) {
    newTaskBtn.addEventListener("click", () => dialog.showModal());
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      resetForm();
      dialog.close();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedTasks = addNewTask();
    if (updatedTasks) {
      renderTasks(updatedTasks);
      resetForm();
      dialog.close();
    }
  });
}

// ─── EDIT / VIEW TASK MODAL ──────────────────────────────────────────────────

/**
 * Opens the task detail/edit modal and populates it with the task's data.
 * @param {Object} task - The task object to display and edit.
 */
export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  activeTaskId = task.id;

  document.getElementById("task-title").value = task.title || "";
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status || "todo";

  const prioritySelect = document.getElementById("edit-task-priority");
  if (prioritySelect) prioritySelect.value = task.priority || "low";

  modal.showModal();
}

/**
 * Sets up save and delete button listeners for the edit modal.
 */
export function setupEditModalHandlers() {
  const modal = document.getElementById("task-modal");
  const form = document.getElementById("task-form");
  const closeBtn = document.getElementById("close-modal-btn");
  const deleteBtn = document.getElementById("delete-task-btn");

  if (!modal || !form) {
    console.error("Edit modal or form not found.");
    return;
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.close());
  }

  // Save changes
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (activeTaskId === null) return;

    const updates = {
      title: document.getElementById("task-title").value.trim(),
      description: document.getElementById("task-desc").value.trim(),
      status: document.getElementById("task-status").value,
      priority: document.getElementById("edit-task-priority")?.value || "low",
    };

    if (!updates.title) {
      alert("Task title cannot be empty.");
      return;
    }

    const updatedTasks = updateTask(activeTaskId, updates);
    renderTasks(updatedTasks);
    modal.close();
    activeTaskId = null;
  });

  // Delete task
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (activeTaskId === null) return;
      const updatedTasks = deleteTask(activeTaskId);
      if (updatedTasks !== null) {
        renderTasks(updatedTasks);
        modal.close();
        activeTaskId = null;
      }
    });
  }
}