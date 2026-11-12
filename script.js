// Ismail Yahaya - COS 106 - JavaScript: event handling, DOM, validation, arrays, functions
const tasks = [
  { title: "Complete COS 106 Term Project", date: "2026-11-20", priority: "High", done: false },
  { title: "Revise Introduction to Web Technologies notes", date: "2026-11-18", priority: "Medium", done: false },
  { title: "Practice JavaScript DOM manipulation", date: "2026-11-19", priority: "Medium", done: false }
];
let filter = "All";

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;
  list.innerHTML = "";
  const filtered = tasks.filter(t => filter === "All" || (filter === "Completed" ? t.done : !t.done));
  filtered.forEach((t, idx) => {
    const div = document.createElement("div");
    div.className = "task" + (t.done ? " done" : "");
    div.innerHTML = `<label><input type="checkbox" ${t.done ? "checked" : ""} data-idx="${idx}"> <span class="title">${t.title}</span> - ${t.date}</label> <span><span class="pill ${t.priority}">${t.priority}</span> <button data-del="${idx}">Delete</button></span>`;
    list.appendChild(div);
  });
  // Re-bind checkboxes and delete buttons
  list.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", e => {
      const realIdx = tasks.indexOf(filtered[parseInt(e.target.dataset.idx)]);
      tasks[realIdx].done = e.target.checked;
      renderTasks();
    });
  });
  list.querySelectorAll("button[data-del]").forEach(btn => {
    btn.addEventListener("click", e => {
      const realIdx = tasks.indexOf(filtered[parseInt(e.target.dataset.del)]);
      tasks.splice(realIdx, 1);
      renderTasks();
    });
  });
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const totalEl = document.getElementById("totalCount");
  if (totalEl) totalEl.textContent = `Total: ${total} | Completed: ${done} | Pending: ${total - done}`;
}

function addTask() {
  const title = document.getElementById("taskTitle");
  const date = document.getElementById("taskDate");
  const prio = document.getElementById("taskPriority");
  const err = document.getElementById("taskError");
  if (!title.value.trim()) { err.textContent = "Please enter a task."; return; }
  err.textContent = "";
  tasks.push({ title: title.value.trim(), date: date.value || "No date", priority: prio.value, done: false });
  title.value = ""; renderTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");
  if (menuBtn) menuBtn.addEventListener("click", () => navList.classList.toggle("open"));
  renderTasks();
  const addBtn = document.getElementById("addTaskBtn");
  if (addBtn) addBtn.addEventListener("click", addTask);
  document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", e => { filter = e.target.dataset.filter; renderTasks(); }));
  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
  // Contact form validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("cName").value.trim();
      const email = document.getElementById("cEmail").value.trim();
      const phone = document.getElementById("cPhone").value.trim();
      const msg = document.getElementById("cMessage").value.trim();
      let ok = true;
      document.getElementById("eName").textContent = name ? "" : "Name is required.";
      if (!email || !email.includes("@") || !email.includes(".")) { document.getElementById("eEmail").textContent = "Enter a valid email."; ok = false; } else document.getElementById("eEmail").textContent = "";
      const phoneClean = phone.replace(/\\s/g, "");
      if (!/^\\+?\\d{7,15}$/.test(phoneClean)) { document.getElementById("ePhone").textContent = "Enter a valid phone number (7-15 digits)."; ok = false; } else document.getElementById("ePhone").textContent = "";
      document.getElementById("eMsg").textContent = msg ? "" : "Message is required.";
      if (!msg) ok = false;
      if (ok) { document.getElementById("formSuccess").style.display = "block"; form.reset(); }
    });
  }
  // Dynamic greeting on homepage
  const greet = document.getElementById("greeting");
  if (greet) {
    const h = new Date().getHours();
    greet.textContent = h < 12 ? "Good morning, welcome to my portfolio!" : h < 17 ? "Good afternoon, welcome to my portfolio!" : "Good evening, welcome to my portfolio!";
  }
});
