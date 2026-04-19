/**
 * @module formUtils
 * @description Utility functions for resetting form inputs.
 */

/**
 * Resets the "Add New Task" form to its default empty state.
 */
export function resetForm() {
  const titleInput = document.getElementById("title-input");
  const descInput = document.getElementById("desc-input");
  const statusSelect = document.getElementById("select-status");
  const prioritySelect = document.getElementById("task-priority");

  if (titleInput) titleInput.value = "";
  if (descInput) descInput.value = "";
  if (statusSelect) statusSelect.value = "todo";
  if (prioritySelect) prioritySelect.value = "low";
}