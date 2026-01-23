// heatmap.js — CommitFlow Heatmap

const ACTIVITY_KEY = "commitflow_activity";

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Save today's activity
 */
function markTodayActive() {
  const today = getToday();
  const activity = JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || {};
  activity[today] = true;
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
}

/**
 * Render heatmap for last 14 days
 */
function renderHeatmap() {
  const heatmap = document.getElementById("heatmap");
  if (!heatmap) return;

  heatmap.innerHTML = "";

  const activity = JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || {};
  const today = new Date();

  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const cell = document.createElement("div");

    if (activity[dateStr]) {
      cell.style.background = "var(--primary)";
    }

    cell.title = dateStr;
    heatmap.appendChild(cell);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  markTodayActive();
  renderHeatmap();
});
