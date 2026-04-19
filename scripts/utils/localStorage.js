/**
 * @module localStorage
 * @description Manages reading and writing tasks to the browser's localStorage.
 */

const STORAGE_KEY = "tasks";

/**
 * Loads tasks from localStorage.
 * @returns {Array<Object>|null} Parsed task array, or null if nothing is stored.
 */
export function loadTasksFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Error parsing tasks from localStorage:", err);
    return null;
  }
}

/**
 * Saves a task array to localStorage.
 * @param {Array<Object>} tasks - The full array of tasks to persist.
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Clears all tasks from localStorage.
 */
export function clearTasksFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}