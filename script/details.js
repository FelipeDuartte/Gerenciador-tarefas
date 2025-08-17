const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let tasksArr = JSON.parse(localStorage.getItem("tasksArr") || "[]");
let task = tasksArr.find((t) => t.id === id);

const descElem = document.getElementById("taskDescription");
if (task) {
  let status = task.completed ? "Concluída" : "Pendente";
  descElem.innerHTML = `${task.description}`;
} else {
  descElem.textContent = "Nenhuma tarefa encontrada.";
}
