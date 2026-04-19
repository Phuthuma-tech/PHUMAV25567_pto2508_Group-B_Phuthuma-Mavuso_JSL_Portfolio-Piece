/**
 * @module api
 * @description Handles all communication with the JSL Kanban API.
 */

const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches tasks from the remote API.
 * Shows a loading indicator while fetching and an error message on failure.
 * @returns {Promise<Array<Object>|null>} Array of task objects, or null on failure.
 */
export async function fetchTasksFromAPI() {
  const loader = document.getElementById("loading-indicator");
  const errorEl = document.getElementById("error-message");

  if (loader) loader.style.display = "block";
  if (errorEl) errorEl.style.display = "none";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    // API returns an object with a tasks array, or directly an array
    return Array.isArray(data) ? data : data.tasks ?? [];
  } catch (err) {
    console.error("Failed to fetch tasks from API:", err);
    if (errorEl) {
      errorEl.textContent = "⚠️ Failed to load tasks. Please refresh the page.";
      errorEl.style.display = "block";
    }
    return null;
  } finally {
    if (loader) loader.style.display = "none";
  }
}