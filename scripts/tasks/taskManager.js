/**
 * @module taskManager
 * @description Core task CRUD operations. All changes are persisted to localStorage.
 */

import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorage.js";

/**
 * Adds a new task built from the "Add New Task" form fields.
 * @returns {Array<Object>|null} Updated task array, or null if the title is empty.
 */
export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const priority = document.getElementById("task-priority").value || "low";

  if (!title) return null;

  const tasks = loadTasksFromStorage() || [];
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
    priority,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);
  return updatedTasks;
}

/**
 * Updates an existing task by ID with new field values.
 * @param {number|string} taskId - The ID of the task to update.
 * @param {Object} updates - Key/value pairs of fields to update.
 * @returns {Array<Object>} The updated task array.
 */
export function updateTask(taskId, updates) {
  const tasks = loadTasksFromStorage() || [];
  const updatedTasks = tasks.map((t) =>
    t.id == taskId ? { ...t, ...updates } : t
  );
  saveTasksToStorage(updatedTasks);
  return updatedTasks;
}

/**
 * Deletes a task by ID after user confirmation.
 * @param {number|string} taskId - The ID of the task to delete.
 * @returns {Array<Object>|null} Updated task array, or null if user cancelled.
 */
export function deleteTask(taskId) {
  const confirmed = window.confirm("Are you sure you want to delete this task?");
  if (!confirmed) return null;
  const tasks = loadTasksFromStorage() || [];
  const updatedTasks = tasks.filter((t) => t.id != taskId);
  saveTasksToStorage(updatedTasks);
  return updatedTasks;
}