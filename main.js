const $form = document.getElementById("form");
const $containerTasks = document.getElementById("containerTasks");

let idIncrerment = 0;
let tasks = [];

$form.addEventListener("submit", event => {
  event.preventDefault();
  const task = {
    id: ++idIncrerment,
    name: $form.name.value,
    description: $form.description.value,
    complete: false,
  };
  tasks.push(task);
  printLetters(tasks, $containerTasks);
  $form.reset();
});

function crearCard(t) {
  let section = document.createElement("div");
  section.classList = "task-card";
  section.id = `task-${t.id}`;

  section.innerHTML = `
      <h4>${t.name}</h4>
      <p>${t.description}</p>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold rounded" id="delete-${
        t.id
      }">Delete</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" id="state-${t.id}">
        ${t.complete ? "Complete" : "Incomplete"}
      </button>
  `;

  section.querySelector(`#delete-${t.id}`).addEventListener("click", () => deleteTask(t.id));
  section.querySelector(`#state-${t.id}`).addEventListener("click", () => toggleTaskState(t.id));

  return section;
}

const printLetters = (notes, container) => {
  container.innerHTML = ``;
  let fragment = document.createDocumentFragment();
  notes.forEach(t => fragment.appendChild(crearCard(t, container)));
  container.appendChild(fragment);
};

function toggleTaskState(id) {
  const task = tasks.find(t => t.id === id);

  if (task) {
    task.complete = !task.complete;
    printLetters(tasks, $containerTasks);
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  printLetters(tasks, $containerTasks);
}

//filtro de tareas

//para guardar en local storage
