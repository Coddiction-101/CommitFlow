// ===============================
// settings.js — CommitFlow Settings (Refined)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // UI Elements
  const resetBtn = document.getElementById("reset-all");
  const exportBtn = document.getElementById("export-data");
  const usernameInput = document.getElementById("username-input");
  const saveUsernameBtn = document.getElementById("save-username");
  const currentThemeEl = document.getElementById("current-theme");
  
  // Stat elements
  const statCommits = document.getElementById("stat-commits");
  const statTasks = document.getElementById("stat-tasks");
  const statStreak = document.getElementById("stat-streak");

  // ===== USERNAME =====
  function loadUsername() {
    const username = localStorage.getItem("username") || "Coder";
    if (usernameInput) {
      usernameInput.value = username;
    }
  }

  if (saveUsernameBtn && usernameInput) {
    saveUsernameBtn.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (!username) {
        alert("Please enter a name!");
        return;
      }
      localStorage.setItem("username", username);
      alert("✅ Name saved successfully!");
      
      // Update dashboard if the function exists
      if (typeof window.renderDashboard?.username === "function") {
        window.renderDashboard.username();
      }
    });
  }

  // ===== THEME DISPLAY =====
  function updateThemeDisplay() {
    if (!currentThemeEl) return;
    const theme = localStorage.getItem("theme") || "light";
    currentThemeEl.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
  }

  // ===== STATISTICS =====
  function updateStatistics() {
    // Get commits
    const commits = JSON.parse(localStorage.getItem("commits")) || {};
    const commitCount = Object.keys(commits).length;
    if (statCommits) {
      statCommits.textContent = commitCount;
    }

    // Get tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskCount = tasks.length;
    if (statTasks) {
      statTasks.textContent = taskCount;
    }

    // Get streak
    const streak = Number(localStorage.getItem("commitflow_streak")) || 0;
    if (statStreak) {
      statStreak.textContent = streak;
    }
  }

  // ===== EXPORT DATA =====
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      try {
        // Check if downloadDataAsJson exists (from utils.js)
        if (typeof downloadDataAsJson === "function") {
          downloadDataAsJson();
          alert("✅ Data exported successfully!");
        } else {
          // Fallback implementation
          const data = {
            commits: JSON.parse(localStorage.getItem("commits")) || {},
            tasks: JSON.parse(localStorage.getItem("tasks")) || [],
            streak: localStorage.getItem("commitflow_streak") || 0,
            lastDate: localStorage.getItem("commitflow_last_date") || null,
            activity: JSON.parse(localStorage.getItem("commitflow_activity")) || {},
            playlists: JSON.parse(localStorage.getItem("playlists")) || [],
            username: localStorage.getItem("username") || "Coder",
            theme: localStorage.getItem("theme") || "light",
            exportDate: new Date().toISOString()
          };

          const dataStr = JSON.stringify(data, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          const today = new Date().toISOString().split("T")[0];
          link.href = url;
          link.download = `commitflow-backup-${today}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          alert("✅ Data exported successfully!");
        }
      } catch (error) {
        console.error("Export error:", error);
        alert("❌ Failed to export data. Check console for details.");
      }
    });
  }

  // ===== RESET ALL DATA =====
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmText = "Are you sure you want to reset ALL data?\n\nThis will delete:\n- All commits\n- All tasks\n- Streak progress\n- Activity history\n- Playlists\n\nThis action CANNOT be undone!";
      
      if (confirm(confirmText)) {
        // Double confirmation
        if (confirm("⚠️ FINAL WARNING: This will permanently delete everything. Are you absolutely sure?")) {
          // Clear all localStorage keys used by CommitFlow
          localStorage.removeItem("commits");
          localStorage.removeItem("tasks");
          localStorage.removeItem("commitflow_streak");
          localStorage.removeItem("commitflow_last_date");
          localStorage.removeItem("commitflow_activity");
          localStorage.removeItem("playlists");
          // Don't remove username and theme - keep user preferences
          
          alert("✅ All data has been reset.");
          
          // Update statistics display
          updateStatistics();
          
          // Reload the page to refresh everything
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      }
    });
  }

  // ===== IMPORT DATA (Future feature) =====
  // You can add an import button later that reads JSON files

  // ===== INITIAL LOAD =====
  loadUsername();
  updateThemeDisplay();
  updateStatistics();

  // Listen for theme changes
  window.addEventListener("storage", (e) => {
    if (e.key === "theme") {
      updateThemeDisplay();
    }
  });
});
