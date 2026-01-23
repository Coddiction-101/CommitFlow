// dashboard.js — CommitFlow Dashboard

document.addEventListener("DOMContentLoaded", () => {
  // ===== USER NAME (optional) =====
  const usernameEl = document.getElementById("welcome-user");
  const storedName = localStorage.getItem("username") || "Coder";

  if (usernameEl) {
    usernameEl.textContent = `Welcome, ${storedName}`;
  }

  // ===== TASKS PREVIEW =====
  const taskPreview = document.getElementById("task-preview");
  const todayStatus = document.getElementById("today-status");

  function renderTaskPreview() {
    if (!taskPreview) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter(task => task.date === today);

    taskPreview.innerHTML = "";

    if (todayTasks.length === 0) {
      taskPreview.innerHTML = "<li>No tasks added yet.</li>";
      if (todayStatus) {
        todayStatus.textContent = "No tasks completed yet.";
      }
      return;
    }

    // Show today's tasks
    todayTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
      }
      taskPreview.appendChild(li);
    });

    // Update today status
    const completedCount = todayTasks.filter(t => t.completed).length;
    const totalCount = todayTasks.length;
    if (todayStatus) {
      if (totalCount === 0) {
        todayStatus.textContent = "No tasks completed yet.";
      } else if (completedCount === totalCount) {
        todayStatus.textContent = "🎉 All tasks completed! Great job!";
      } else {
        todayStatus.textContent = `${completedCount}/${totalCount} tasks completed today`;
      }
    }
  }

  // ===== COMMIT PREVIEW =====
  const commitPreview = document.getElementById("commit-preview");

  function renderCommitPreview() {
    if (!commitPreview) return;

    const commits = JSON.parse(localStorage.getItem("commits")) || [];
    const latestCommits = commits.slice(-5); // Last 5 commits

    commitPreview.innerHTML = "";

    if (latestCommits.length === 0) {
      commitPreview.innerHTML = "<li>No commits added yet.</li>";
      return;
    }

    latestCommits.forEach(commit => {
      const li = document.createElement("li");
      li.textContent = commit.title;
      commitPreview.appendChild(li);
    });
  }

  // ===== PLAYLISTS (optional) =====
  const playlistList = document.getElementById("dashboard-playlists");
  const emptyState = document.getElementById("playlist-empty");
  const addBtn = document.getElementById("add-playlist-btn");
  const addBtnEmpty = document.getElementById("add-playlist-empty-btn");

  const modal = document.getElementById("playlist-modal");
  const closeModal = document.getElementById("close-modal");
  const saveBtn = document.getElementById("save-playlist");
  const urlInput = document.getElementById("playlist-url");

  let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

  function renderPlaylists() {
    if (!playlistList) return;

    playlistList.innerHTML = "";

    if (playlists.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    playlists.forEach(url => {
      const li = document.createElement("li");
      li.innerHTML = `
        <i class="ri-play-circle-fill"></i>
        <a href="${url}" target="_blank">View Playlist</a>
      `;
      playlistList.appendChild(li);
    });
  }

  function openModal() {
    if (modal) {
      modal.style.display = "flex";
      if (urlInput) urlInput.focus();
    }
  }

  function closeModalFn() {
    if (modal) modal.style.display = "none";
    if (urlInput) urlInput.value = "";
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const url = urlInput?.value.trim();
      if (!url) {
        alert("Please paste a valid playlist URL");
        return;
      }

      playlists.push(url);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      closeModalFn();
      renderPlaylists();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", openModal);
  }
  if (addBtnEmpty) {
    addBtnEmpty.addEventListener("click", openModal);
  }
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFn);
  }

  window.addEventListener("click", e => {
    if (modal && e.target === modal) {
      closeModalFn();
    }
  });

  // ===== INITIAL RENDER =====
  renderTaskPreview();
  renderCommitPreview();
  renderPlaylists();

  // Optional: re-render when needed (e.g., after adding a task/commit)
  window.renderDashboard = {
    tasks: renderTaskPreview,
    commits: renderCommitPreview,
    playlists: renderPlaylists
  };
});
