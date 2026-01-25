// =========================
// commit.js — CommitFlow (Refined & Debugged)
// =========================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Commit.js loaded");

  // UI Elements
  const commitTitleInput = document.getElementById("commit-title");
  const commitDescInput = document.getElementById("commit-desc");
  const commitNotesInput = document.getElementById("commit-notes");
  const addCommitBtn = document.getElementById("add-commit");
  const commitList = document.getElementById("commit-list");
  const commitDateEl = document.getElementById("commit-date");

  // Check if all required elements exist
  if (!commitTitleInput || !commitDescInput || !addCommitBtn || !commitList) {
    console.error("Missing required elements!");
    return;
  }

  // Load commits from localStorage
  let commits = {};
  try {
    const stored = localStorage.getItem("commits");
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // MIGRATION: Convert old array format to new object format
      if (Array.isArray(parsed)) {
        console.log("Migrating old commit format to new format...");
        const newCommits = {};
        parsed.forEach((commit, index) => {
          const date = commit.date || getDaysAgo(parsed.length - index - 1);
          newCommits[date] = {
            title: commit.title || "Untitled",
            description: commit.description || "",
            notes: commit.notes || "",
            timestamp: commit.timestamp || new Date().toISOString()
          };
        });
        commits = newCommits;
        localStorage.setItem("commits", JSON.stringify(commits));
        console.log("Migration complete! New format:", commits);
      } else if (typeof parsed === 'object' && parsed !== null) {
        commits = parsed;
      }
    }
  } catch (error) {
    console.error("Error loading commits:", error);
    commits = {};
  }

  // Get today's date in YYYY-MM-DD format
  function getToday() {
    return new Date().toISOString().split("T")[0];
  }

  // Get date N days ago
  function getDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
  }

  // Format date for display
  function formatDate(dateStr) {
    try {
      const date = new Date(dateStr + "T00:00:00");
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", dateStr, error);
      return "Invalid Date";
    }
  }

  // Display today's date
  function displayTodayDate() {
    if (!commitDateEl) return;
    const today = getToday();
    commitDateEl.textContent = formatDate(today);
  }

  // Load today's commit if it exists
  function loadTodayCommit() {
    const today = getToday();
    if (commits[today]) {
      commitTitleInput.value = commits[today].title || "";
      commitDescInput.value = commits[today].description || "";
      if (commitNotesInput) {
        commitNotesInput.value = commits[today].notes || "";
      }
      addCommitBtn.innerHTML = '<i class="ri-pencil-line"></i> Update Today\'s Commit';
    } else {
      commitTitleInput.value = "";
      commitDescInput.value = "";
      if (commitNotesInput) {
        commitNotesInput.value = "";
      }
      addCommitBtn.innerHTML = '<i class="ri-save-line"></i> Save Today\'s Commit';
    }
  }

  // =========================
  // Render Commits Function
  // =========================
  function renderCommits() {
    if (!commitList) return;
    
    commitList.innerHTML = "";

    // Convert commits object to array and validate
    const commitArray = [];
    for (const [date, data] of Object.entries(commits)) {
      if (date && data && typeof data === 'object') {
        commitArray.push({
          date: date,
          title: data.title || "Untitled",
          description: data.description || "",
          notes: data.notes || "",
          timestamp: data.timestamp || ""
        });
      }
    }

    if (commitArray.length === 0) {
      commitList.innerHTML = '<li style="opacity: 0.6; text-align: center; padding: 20px;">No commits yet. Start your first one!</li>';
      return;
    }

    // Sort by date (newest first)
    commitArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    commitArray.forEach(commit => {
      const li = document.createElement("li");
      
      const contentDiv = document.createElement("div");
      contentDiv.style.flex = "1";
      
      const formattedDate = formatDate(commit.date);
      const escapedTitle = escapeHtml(commit.title);
      const escapedDesc = escapeHtml(commit.description);
      const escapedNotes = commit.notes ? escapeHtml(commit.notes) : "";
      
      contentDiv.innerHTML = `
        <div class="commit-date-label">${formattedDate}</div>
        <strong style="display: block; margin-top: 8px;">${escapedTitle}</strong>
        <small style="display: block; margin-top: 6px; line-height: 1.6;">${escapedDesc}</small>
        ${escapedNotes ? `<small style="display: block; margin-top: 8px; opacity: 0.7;"><em>Notes: ${escapedNotes}</em></small>` : ''}
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-commit";
      deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
      deleteBtn.dataset.date = commit.date;
      deleteBtn.title = "Delete this commit";

      li.appendChild(contentDiv);
      li.appendChild(deleteBtn);
      commitList.appendChild(li);
    });
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // =========================
  // Add/Update Commit
  // =========================
  addCommitBtn.addEventListener("click", () => {
    const title = commitTitleInput.value.trim();
    const description = commitDescInput.value.trim();
    const notes = commitNotesInput ? commitNotesInput.value.trim() : "";

    if (!title || !description) {
      alert("Please fill in both 'What you learned' and 'What you built' fields.");
      return;
    }

    const today = getToday();
    const isUpdate = commits[today] !== undefined;

    commits[today] = {
      title: title,
      description: description,
      notes: notes,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem("commits", JSON.stringify(commits));
      console.log("Commit saved:", commits[today]);
    } catch (error) {
      console.error("Error saving commit:", error);
      alert("Failed to save commit. Please try again.");
      return;
    }

    // Clear form
    commitTitleInput.value = "";
    commitDescInput.value = "";
    if (commitNotesInput) {
      commitNotesInput.value = "";
    }

    renderCommits();
    loadTodayCommit();

    // Update streak, heatmap, and dashboard
    if (typeof window.updateStreak === "function") {
      window.updateStreak();
    }
    if (typeof window.markTodayActive === "function") {
      window.markTodayActive();
    }
    if (typeof window.renderHeatmap === "function") {
      window.renderHeatmap();
    }
    if (typeof window.renderDashboard?.commits === "function") {
      window.renderDashboard.commits();
    }

    alert(isUpdate ? "✅ Commit updated successfully!" : "🎉 Commit saved successfully!");
  });

  // =========================
  // Delete Commit
  // =========================
  commitList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-commit");
    if (!deleteBtn) return;

    const date = deleteBtn.dataset.date;
    if (!date || !commits[date]) {
      console.error("Invalid date or commit not found:", date);
      return;
    }

    const confirmMsg = `Delete commit from ${formatDate(date)}?\n\nThis action cannot be undone.`;
    
    if (confirm(confirmMsg)) {
      delete commits[date];
      
      try {
        localStorage.setItem("commits", JSON.stringify(commits));
        console.log("Commit deleted for date:", date);
      } catch (error) {
        console.error("Error deleting commit:", error);
        alert("Failed to delete commit. Please try again.");
        return;
      }

      renderCommits();
      loadTodayCommit();

      // Update streak and heatmap
      if (typeof window.updateStreak === "function") {
        window.updateStreak();
      }
      if (typeof window.renderHeatmap === "function") {
        window.renderHeatmap();
      }
      if (typeof window.renderDashboard?.commits === "function") {
        window.renderDashboard.commits();
      }
    }
  });

  // =========================
  // Initial Setup
  // =========================
  displayTodayDate();
  loadTodayCommit();
  renderCommits();
  
  console.log("Commit.js initialized. Current commits:", commits);
});
