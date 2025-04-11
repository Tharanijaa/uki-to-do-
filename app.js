
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

let tasks = [];

function updateCounter() {
const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const uncompleted = total - completed;
taskCounter.textContent = `Completed: ${completed} | Uncompleted: ${uncompleted}`;
}

function renderTasks() {
taskList.innerHTML = '';
tasks.forEach(task => {
const li = document.createElement('li');
li.classList.add(task.priority);

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.addEventListener('change', () => {
removeTask(task.id);
});

const span = document.createElement('span');
span.textContent = task.text;

li.appendChild(checkbox);
li.appendChild(span);
taskList.appendChild(li);
});

updateCounter();
}

function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
const saved = localStorage.getItem('tasks');
tasks = saved ? JSON.parse(saved) : [];
renderTasks();
}

function removeTask(id) {
tasks = tasks.filter(task => task.id !== id);
saveTasks();
renderTasks();
}

addTaskBtn.addEventListener('click', () => {
const text = taskInput.value.trim();
const priority = priorityInput.value;

if (text !== '') {
tasks.push({
id: Date.now(),
text,
priority,
completed: false
});
taskInput.value = '';
priorityInput.value = 'low';
saveTasks();
renderTasks();
}
});