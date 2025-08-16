const inputTask = document.getElementById("taskInput");
const description = document.getElementById("decriptionInput");
const tasks = document.getElementById("task-list");
const form = document.getElementById("task-form");
let contador = 0;

function addTask() {
  let taskValue = inputTask.value.trim();
  let descriptionValue = description.value.trim();
  contador++;
  if (taskValue === "" || descriptionValue === "") {
    alert("Favor preencher todos os campos.");
    return;
  }

  let taskObj = {
    id: contador,
    name: taskValue,
    description: descriptionValue,
    completed: false,
  };
  let tasksArr = JSON.parse(localStorage.getItem("tasksArr") || "[]");
  tasksArr.push(taskObj);
  localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  renderTasks();
}

function changeCompleted(checkbox) {
  const li = checkbox.closest("li");
  const label = li.querySelector(".task-name");
  let tasksArr = JSON.parse(localStorage.getItem("tasksArr") || "[]");
  let id = parseInt(checkbox.id);
  let idx = tasksArr.findIndex((t) => t.id === id);
  if (idx !== -1) {
    tasksArr[idx].completed = checkbox.checked;
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  }
  if (checkbox.checked) {
    li.classList.remove("bg-warning");
    li.classList.add("bg-success");
    label.style.textDecoration = "line-through";
    label.style.color = "#d4edda";
  } else {
    li.classList.remove("bg-success");
    li.classList.add("bg-warning");
    label.style.textDecoration = "none";
    label.style.color = "white";
  }
}

function renderTasks() {
  let tasksArr = JSON.parse(localStorage.getItem("tasksArr") || "[]");
  tasks.innerHTML = "";
  tasksArr.forEach((taskObj) => {
    let checked = taskObj.completed ? "checked" : "";
    let liClass = taskObj.completed ? "bg-success" : "bg-warning";
    let labelStyle = taskObj.completed
      ? "text-decoration:line-through;color:#d4edda;"
      : "text-decoration:none;color:white;";

    let taskItem = `
      <li class="task-item ${liClass} rounded p-2 mb-2 d-flex align-items-center">
        <input id="${taskObj.id}" class="d-flex align-items-center me-3" type="checkbox" onchange="changeCompleted(this)" ${checked}>
        <label for="${taskObj.id}" class="task-name fs-5 fw-bold d-flex align-items-center col" style="${labelStyle}">${taskObj.name}</label>
        <button onclick="seeDataDescription()" class="btn btn-dark ms-2"><i class="bi bi-arrow-right-square"></i></button>
        <button onclick="removeTask(${taskObj.id})" class="btn btn-danger ms-2"><i class="bi bi-calendar-x"></i></button>
      </li>`;
    tasks.innerHTML += taskItem;
  });
  // Atualiza contador para evitar id duplicado
  if (tasksArr.length > 0) {
    contador = Math.max(...tasksArr.map((t) => t.id));
  }
}

function removeTask(id) {
  let tasksArr = JSON.parse(localStorage.getItem("tasksArr") || "[]");
  tasksArr = tasksArr.filter((t) => t.id !== id);
  localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  renderTasks();
}

window.onload = function () {
  renderTasks();
};

function seeDataDescription() {
  window.location.href = `../details.html?desc=${encodeURIComponent(
    description.value
  )}`;
}
