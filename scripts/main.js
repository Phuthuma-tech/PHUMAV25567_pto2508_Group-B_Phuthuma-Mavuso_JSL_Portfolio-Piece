import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { setupSidebarManager } from "./ui/sidebarManager.js";
import { setupThemeManager } from "./ui/themeManager.js";
import { 
  setupNewTaskModalHandler, 
  setupEditModalHandlers, 
  openTaskModal 
} from "./ui/modalHandlers.js";

function initApp() {
  // Call this first to ensure buttons are wired up
  setupSidebarManager();

  // Initialize the theme logic
  setupThemeManager();
  
  // ... other setup code
}

document.addEventListener("DOMContentLoaded", initApp);

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupSidebarManager();
  
  setupNewTaskModalHandler();
  setupEditModalHandlers();

  document.addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-div');
    if (taskCard) {
      const taskId = taskCard.dataset.taskId;
      const allTasks = loadTasksFromStorage();
      const task = allTasks.find(t => t.id == taskId);
      if (task) openTaskModal(task);
    }
  });
}

function createNewTask(event) {
  event.preventDefault(); // This stops the page from refreshing

  // THIS IS THE CORRECT PLACE FOR THE CODE
  const taskData = {
    title: document.getElementById("title-input").value,
    description: document.getElementById("desc-input").value,
    status: document.getElementById("select-status").value,
    priority: document.getElementById("task-priority").value, // Captured from your new dropdown
    id: Date.now()
  };

  // The rest of your function likely looks like this:
  tasks.push(taskData);           // Adds to your task list
  saveTasks();                    // Saves to LocalStorage
  renderTasks();                  // Updates the screen
  event.target.reset();           // Clears the form
  elements.modal.close();         // Closes the popup
}

function openEditTaskModal(task) {
  // Fill the basic fields
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  // NEW: Fill the priority dropdown with the task's current priority
  const prioritySelect = document.getElementById("edit-task-priority");
  prioritySelect.value = task.priority || "low"; 

  // Show the modal
  taskModal.showModal();
}

function saveTaskChanges(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.title = document.getElementById("task-title").value;
    task.description = document.getElementById("task-desc").value;
    task.status = document.getElementById("task-status").value;
    
    // NEW: Capture the updated priority
    task.priority = document.getElementById("edit-task-priority").value;

    saveTasks();   // Save to LocalStorage
    renderTasks(); // Refresh the board to update the dot color
    taskModal.close();
  }
}

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  
  const dotClass = `dot-${task.priority || 'low'}`; 

  taskDiv.innerHTML = `
    <div class="task-card-header">
      <h3 class="task-title">${task.title}</h3>
      <span class="priority-dot ${dotClass}"></span>
    </div>
    <p class="task-description">${task.description}</p>
  `;
  
  return taskDiv;
}



document.addEventListener("DOMContentLoaded", initTaskBoard);