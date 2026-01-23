// ===============================
// CommitFlow — Tasks Logic
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  if (!taskInput || !addTaskBtn || !taskList) return;

  // Load tasks from local storage or initialize
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks in the list
  function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<li>No tasks added yet.</li>";
      return;
    }

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "task completed" : "task";

      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button class="toggle-btn" data-index="${index}">
            ${task.completed ? "Undo" : "Done"}
          </button>
          <button class="delete-btn" data-index="${index}">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  // Add new task
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
      text,
      completed: false,
      date: new Date().toISOString().split("T")[0]
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();

    // Update streak and dashboard preview if available
    if (typeof window.updateStreak === "function") {
      window.updateStreak();
    }
    if (typeof window.renderDashboard?.tasks === "function") {
      window.renderDashboard.tasks();
    }
  });

  // Handle Done/Undo and Delete
  taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined || tasks[index] === undefined) return;

    // Toggle completion
    if (e.target.classList.contains("toggle-btn")) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();

      if (typeof window.updateStreak === "function") {
        window.updateStreak();
      }
      if (typeof window.renderDashboard?.tasks === "function") {
        window.renderDashboard.tasks();
      }
    }

    // Delete task
    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();

        if (typeof window.updateStreak === "function") {
          window.updateStreak();
        }
        if (typeof window.renderDashboard?.tasks === "function") {
          window.renderDashboard.tasks();
        }
      }
    }
  });

  // Initial render
  renderTasks();

  // Update streak and dashboard on page load
  if (typeof window.updateStreak === "function") {
    window.updateStreak();
  }
  if (typeof window.renderDashboard?.tasks === "function") {
    window.renderDashboard.tasks();
  }
});
