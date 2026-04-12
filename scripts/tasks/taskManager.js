import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorage.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;

  if (!title) return null;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);
  return updatedTasks;
}

export function updateTask(taskId, updatedDetails) {
  const tasks = loadTasksFromStorage();
  const index = tasks.findIndex(t => t.id == taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedDetails };
    saveTasksToStorage(tasks);
  }
  return tasks;
}

export function deleteTask(taskId) {
  const tasks = loadTasksFromStorage();
  const filtered = tasks.filter(t => t.id != taskId);
  saveTasksToStorage(filtered);
  return filtered;
}