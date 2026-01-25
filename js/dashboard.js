// ===============================
// dashboard.js — CommitFlow Dashboard (Refined)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // ===== USER NAME =====
  const usernameEl = document.getElementById("welcome-user");
  
  function renderUsername() {
    if (!usernameEl) return;
    const storedName = localStorage.getItem("username") || "Coder";
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
        todayStatus.textContent = "No tasks for today. Add some to get started!";
        todayStatus.style.color = "var(--text-secondary)";
      }
      return;
    }

    // Show today's tasks (max 5)
    const tasksToShow = todayTasks.slice(0, 5);
    tasksToShow.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
        li.style.color = "var(--text-secondary)";
      }
      taskPreview.appendChild(li);
    });

    // Add "show more" if there are more tasks
    if (todayTasks.length > 5) {
      const moreLi = document.createElement("li");
      moreLi.innerHTML = `<em style="opacity: 0.7;">+${todayTasks.length - 5} more tasks...</em>`;
      taskPreview.appendChild(moreLi);
    }

    // Update today status
    const completedCount = todayTasks.filter(t => t.completed).length;
    const totalCount = todayTasks.length;
    
    if (todayStatus) {
      if (completedCount === totalCount) {
        todayStatus.textContent = "🎉 All tasks completed! Great job!";
        todayStatus.style.color = "var(--success)";
      } else if (completedCount > 0) {
        todayStatus.textContent = `${completedCount}/${totalCount} tasks completed today`;
        todayStatus.style.color = "var(--primary)";
      } else {
        todayStatus.textContent = `${totalCount} task${totalCount !== 1 ? 's' : ''} pending`;
        todayStatus.style.color = "var(--warning)";
      }
    }
  }

  // ===== COMMIT PREVIEW =====
  const commitPreview = document.getElementById("commit-preview");

  function renderCommitPreview() {
    if (!commitPreview) return;

    const commits = JSON.parse(localStorage.getItem("commits")) || {};
    const commitArray = Object.entries(commits)
      .filter(([date, data]) => date && data && typeof data === 'object') // Filter out invalid entries
      .map(([date, data]) => ({
        date,
        title: data.title || "Untitled",
        description: data.description || "",
        notes: data.notes || "",
        timestamp: data.timestamp || ""
      }));

    // Sort by date (newest first)
    commitArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    const latestCommits = commitArray.slice(0, 5); // Last 5 commits

    commitPreview.innerHTML = "";

    if (latestCommits.length === 0) {
      commitPreview.innerHTML = "<li>No commits added yet.</li>";
      return;
    }

    latestCommits.forEach(commit => {
      const li = document.createElement("li");
      const date = new Date(commit.date + "T00:00:00");
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      li.innerHTML = `<strong>${commit.title}</strong> <span style="opacity: 0.6; font-size: 0.85rem;">(${dateStr})</span>`;
      commitPreview.appendChild(li);
    });
  }

  // ===== PLAYLISTS =====
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

    playlists.forEach((playlist, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <i class="ri-play-circle-fill"></i>
        <a href="${playlist}" target="_blank" rel="noopener noreferrer">View Playlist</a>
        <button class="delete-btn" data-index="${index}" style="margin-left: auto; padding: 4px 8px; font-size: 0.85rem;">
          <i class="ri-delete-bin-line"></i>
        </button>
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

  if (saveBtn && urlInput) {
    saveBtn.addEventListener("click", () => {
      const url = urlInput.value.trim();
      if (!url) {
        alert("Please paste a valid playlist URL");
        return;
      }

      // Basic URL validation
      try {
        new URL(url);
      } catch (e) {
        alert("Please enter a valid URL (starting with http:// or https://)");
        return;
      }

      playlists.push(url);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      closeModalFn();
      renderPlaylists();
    });
  }

  // Handle playlist deletion
  if (playlistList) {
    playlistList.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (!deleteBtn) return;

      const index = parseInt(deleteBtn.dataset.index);
      if (isNaN(index)) return;

      if (confirm("Delete this playlist?")) {
        playlists.splice(index, 1);
        localStorage.setItem("playlists", JSON.stringify(playlists));
        renderPlaylists();
      }
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

  // Close modal when clicking outside
  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFn();
      }
    });
  }

  // Close modal with Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
      closeModalFn();
    }
  });

  // ===== INITIAL RENDER =====
  renderUsername();
  renderTaskPreview();
  renderCommitPreview();
  renderPlaylists();

  // ===== MAKE FUNCTIONS GLOBALLY AVAILABLE =====
  // So other modules can refresh the dashboard
  window.renderDashboard = {
    tasks: renderTaskPreview,
    commits: renderCommitPreview,
    playlists: renderPlaylists,
    username: renderUsername,
    all: function() {
      renderUsername();
      renderTaskPreview();
      renderCommitPreview();
      renderPlaylists();
    }
  };
});
