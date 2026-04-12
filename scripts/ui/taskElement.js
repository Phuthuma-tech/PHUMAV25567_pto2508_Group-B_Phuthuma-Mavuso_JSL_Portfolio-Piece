export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  
  // Store the ID in a data attribute for the main listener to find
  taskDiv.dataset.taskId = task.id; 

  return taskDiv;
}