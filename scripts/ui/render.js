/**
 * @module render
 * @description Handles all DOM rendering for the Kanban board columns and task counts.
 */

import { createTaskElement } from "./taskElement.js";

/** Priority sort order — lower number = higher priority */
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/**
 * Finds the tasks container for a given status column.
 * @param {string} status - "todo", "doing", or "done".
 * @returns {HTMLElement|null} The container element or null.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Updates the column header count labels (e.g. "TODO (3)").
 * @param {Array<Object>} tasks - The full task array.
 */
function updateColumnCounts(tasks) {
  const counts = { todo: 0, doing: 0, done: 0 };
  tasks.forEach((t) => { if (counts[t.status] !== undefined) counts[t.status]++; });
  const ids = { todo: "toDoText", doing: "doingText", done: "doneText" };
  const labels = { todo: "TODO", doing: "DOING", done: "DONE" };
  Object.keys(counts).forEach((status) => {
    const el = document.getElementById(ids[status]);
    if (el) el.textContent = `${labels[status]} (${counts[status]})`;
  });
}

/**
 * Clears all task cards from every column.
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((c) => (c.innerHTML = ""));
}

/**
 * Renders an array of tasks into their respective columns, sorted by priority.
 * @param {Array<Object>} tasks - The tasks to render.
 */
export function renderTasks(tasks) {
  clearExistingTasks();

  // Sort by priority within each column: high → medium → low
  const sorted = [...tasks].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] ?? 2;
    const pb = PRIORITY_ORDER[b.priority] ?? 2;
    return pa - pb;
  });

  sorted.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      container.appendChild(createTaskElement(task));
    }
  });

  updateColumnCounts(tasks);
}