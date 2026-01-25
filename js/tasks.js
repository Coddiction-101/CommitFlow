// ===============================
// CommitFlow — Tasks Logic (Refined)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const taskCounter = document.getElementById("task-counter");
  const taskHistory = document.getElementById("task-history");

  if (!taskInput || !addTaskBtn || !taskList) return;

  // Load tasks from local storage or initialize
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Get today's date
  function getToday() {
    return new Date().toISOString().split("T")[0];
  }

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Update task counter
  function updateCounter() {
    if (!taskCounter) return;
    
    const today = getToday();
    const todayTasks = tasks.filter(task => task.date === today);
    const completedCount = todayTasks.filter(t => t.completed).length;
    const totalCount = todayTasks.length;
    
    taskCounter.textContent = `${completedCount}/${totalCount} completed`;
    
    // Change color based on completion
    if (totalCount > 0 && completedCount === totalCount) {
      taskCounter.style.background = "rgba(16, 185, 129, 0.2)";
      taskCounter.style.color = "#059669";
    } else {
      taskCounter.style.background = "rgba(79, 70, 229, 0.1)";
      taskCounter.style.color = "var(--primary)";
    }
  }

  // Render today's tasks
  function renderTasks() {
    taskList.innerHTML = "";

    const today = getToday();
    const todayTasks = tasks.filter(task => task.date === today);

    if (todayTasks.length === 0) {
      taskList.innerHTML = '<li style="opacity: 0.6; text-align: center; padding: 20px;">No tasks added yet.</li>';
      updateCounter();
      return;
    }

    todayTasks.forEach((task, index) => {
      // Find the actual index in the full tasks array
      const actualIndex = tasks.findIndex(t => 
        t.text === task.text && 
        t.date === task.date && 
        t.completed === task.completed
      );

      const li = document.createElement("li");
      li.className = task.completed ? "task completed" : "task";

      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button class="toggle-btn" data-index="${actualIndex}">
            ${task.completed ? "Undo" : "Done"}
          </button>
          <button class="delete-btn" data-index="${actualIndex}">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      `;
      taskList.appendChild(li);
    });

    updateCounter();
  }

  // Render task history (previous days)
  function renderTaskHistory() {
    if (!taskHistory) return;

    taskHistory.innerHTML = "";

    const today = getToday();
    
    // Group tasks by date (excluding today)
    const tasksByDate = {};
    tasks.forEach(task => {
      if (task.date !== today) {
        if (!tasksByDate[task.date]) {
          tasksByDate[task.date] = [];
        }
        tasksByDate[task.date].push(task);
      }
    });

    // Sort dates in descending order
    const dates = Object.keys(tasksByDate).sort((a, b) => new Date(b) - new Date(a));

    if (dates.length === 0) {
      taskHistory.innerHTML = '<p style="opacity: 0.6; text-align: center; padding: 20px;">No task history yet.</p>';
      return;
    }

    // Render each date group
    dates.forEach(date => {
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const group = document.createElement("div");
      group.className = "task-history-group";

      const completedCount = tasksByDate[date].filter(t => t.completed).length;
      const totalCount = tasksByDate[date].length;

      group.innerHTML = `
        <div class="task-history-date">
          ${formattedDate} 
          <span style="font-size: 0.9rem; opacity: 0.8;">(${completedCount}/${totalCount} completed)</span>
        </div>
      `;

      const ul = document.createElement("ul");
      ul.style.listStyle = "none";
      ul.style.padding = "0";

      tasksByDate[date].forEach(task => {
        const li = document.createElement("li");
        li.style.padding = "8px 12px";
        li.style.marginBottom = "6px";
        li.style.background = "var(--bg)";
        li.style.borderRadius = "6px";
        li.style.border = "1px solid var(--border)";
        
        if (task.completed) {
          li.style.textDecoration = "line-through";
          li.style.opacity = "0.6";
        }
        
        li.textContent = task.text;
        ul.appendChild(li);
      });

      group.appendChild(ul);
      taskHistory.appendChild(group);
    });
  }

  // Add new task
  addTaskBtn.addEventListener("click", addTask);
  
  // Allow Enter key to add task
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
      alert("Please enter a task!");
      return;
    }

    tasks.push({
      text,
      completed: false,
      date: getToday()
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
    renderTaskHistory();

    // Update streak and dashboard preview if available
    if (typeof window.updateStreak === "function") {
      window.updateStreak();
    }
    if (typeof window.renderDashboard?.tasks === "function") {
      window.renderDashboard.tasks();
    }
  }

  // Handle Done/Undo and Delete using event delegation
  taskList.addEventListener("click", (e) => {
    // Check if clicked element is a button or inside a button
    let button = e.target;
    if (e.target.tagName === "I") {
      button = e.target.parentElement;
    }
    
    if (button.tagName !== "BUTTON") {
      button = e.target.closest("button");
    }
    
    if (!button) return;

    const index = parseInt(button.dataset.index);
    if (isNaN(index) || !tasks[index]) {
      console.log("Invalid index:", index);
      return;
    }

    // Toggle completion
    if (button.classList.contains("toggle-btn")) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
      renderTaskHistory();

      // Update streak when all tasks are completed
      const today = getToday();
      const todayTasks = tasks.filter(task => task.date === today);
      const allCompleted = todayTasks.length > 0 && todayTasks.every(t => t.completed);
      
      if (allCompleted && typeof window.updateStreak === "function") {
        window.updateStreak();
      }

      if (typeof window.renderDashboard?.tasks === "function") {
        window.renderDashboard.tasks();
      }
    }

    // Delete task
    if (button.classList.contains("delete-btn")) {
      if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        renderTaskHistory();

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
  renderTaskHistory();

  // Update streak and dashboard on page load
  if (typeof window.updateStreak === "function") {
    window.updateStreak();
  }
  if (typeof window.renderDashboard?.tasks === "function") {
    window.renderDashboard.tasks();
  }
});
