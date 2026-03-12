// CLOCK

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toDateString();

  document.getElementById("clock").textContent = date + " | " + time;
}

setInterval(updateClock, 1000);

// GREETING + CUSTOM NAME

let username = localStorage.getItem("username");

if (!username) {
  username = prompt("Enter your name");
  localStorage.setItem("username", username);
}

function updateGreeting() {
  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  document.getElementById("greeting").textContent = greeting + ", " + username;
}

updateGreeting();

// TIMER

let timer = 1500;
let interval = null;

function updateTimer() {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("timer").textContent = minutes + ":" + seconds;
}

document.getElementById("start").onclick = () => {
  if (interval) return;

  interval = setInterval(() => {
    timer--;
    updateTimer();

    if (timer <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

document.getElementById("stop").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  interval = null;
  timer = 1500;
  updateTimer();
};

updateTimer();

// TODO LIST

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("task-list");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const del = document.createElement("button");
    del.textContent = "X";

    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(del);

    taskList.appendChild(li);
  });
}

document.getElementById("task-form").onsubmit = (e) => {
  e.preventDefault();

  const input = document.getElementById("task-input");

  const text = input.value.trim();

  if (!text) return;

  // prevent duplicate

  if (tasks.some((t) => t.text === text)) {
    alert("Task already exists");
    return;
  }

  tasks.push({
    text: text,
    completed: false,
  });

  input.value = "";

  saveTasks();
  renderTasks();
};

renderTasks();

// QUICK LINKS

let links = JSON.parse(localStorage.getItem("links")) || [];

const linksList = document.getElementById("links-list");

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  linksList.innerHTML = "";

  links.forEach((link, index) => {
    const li = document.createElement("li");

    const a = document.createElement("a");

    a.href = link.url;
    a.textContent = link.name;
    a.target = "_blank";

    const del = document.createElement("button");

    del.textContent = "X";

    del.onclick = () => {
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    };

    li.appendChild(a);
    li.appendChild(del);

    linksList.appendChild(li);
  });
}

document.getElementById("link-form").onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("link-name").value;
  const url = document.getElementById("link-url").value;

  links.push({ name, url });

  saveLinks();
  renderLinks();
};

renderLinks();

// DARK MODE

const toggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};
