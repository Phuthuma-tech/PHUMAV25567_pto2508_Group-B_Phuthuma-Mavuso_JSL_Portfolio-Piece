import { updateTask, deleteTask } from "../tasks/taskManager.js";
import { clearExistingTasks, renderTasks } from "./render.js";

export function refreshUI(tasks) {
  clearExistingTasks();
  renderTasks(tasks);
}

export function handleSaveTask(taskId) {
  const updatedDetails = {
    title: document.getElementById("task-title").value,
    description: document.getElementById("task-desc").value,
    status: document.getElementById("task-status").value,
  };
  
  const updatedTasks = updateTask(taskId, updatedDetails);
  refreshUI(updatedTasks);
}

export function handleDeleteTask(taskId) {
  const updatedTasks = deleteTask(taskId);
  refreshUI(updatedTasks);
}