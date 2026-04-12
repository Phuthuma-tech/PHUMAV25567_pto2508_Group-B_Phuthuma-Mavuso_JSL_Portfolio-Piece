export function resetForm() {
  // IDs updated to match the inputs in <form id="new-task-modal-window">
  document.getElementById("title-input").value = "";
  document.getElementById("desc-input").value = "";
  document.getElementById("select-status").value = "todo";
}