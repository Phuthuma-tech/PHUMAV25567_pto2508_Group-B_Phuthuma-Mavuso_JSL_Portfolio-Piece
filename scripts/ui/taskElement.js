/**
 * @module taskElement
 * @description Creates individual task card DOM elements for the Kanban board.
 */

/**
 * Creates a task card element with title, description, and priority dot.
 * @param {Object} task - The task data object.
 * @param {string|number} task.id - Unique task identifier.
 * @param {string} task.title - Task title.
 * @param {string} task.description - Task description.
 * @param {string} task.priority - Priority level: "high", "medium", or "low".
 * @returns {HTMLElement} The constructed task card div.
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.dataset.taskId = task.id;

  const priority = task.priority || "low";
  const dotClass = `dot-${priority}`;

  taskDiv.innerHTML = `
    <div class="task-card-header">
      <h3 class="task-title">${task.title}</h3>
      <span class="priority-dot ${dotClass}" title="${priority} priority"></span>
    </div>
  `;

  return taskDiv;
}