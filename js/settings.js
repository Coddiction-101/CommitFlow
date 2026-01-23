// settings.js — CommitFlow Settings

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("reset-all");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset ALL data (tasks, commits, streak, playlists)?")) {
      // Clear all localStorage keys used by CommitFlow
      localStorage.removeItem("tasks");
      localStorage.removeItem("commits");
      localStorage.removeItem("commitflow_streak");
      localStorage.removeItem("commitflow_last_date");
      localStorage.removeItem("commitflow_activity");
      localStorage.removeItem("playlists");

      alert("All data has been reset.");
      // Optionally reload the page
      location.reload();
    }
  });
});
