// ===============================
// heatmap.js — CommitFlow Heatmap (Refined)
// ===============================

const ACTIVITY_KEY = "commitflow_activity";

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Check and mark today's activity
 * Activity = has commit OR all tasks completed
 */
function markTodayActive() {
  const today = getToday();
  
  // Check for commits
  const commits = JSON.parse(localStorage.getItem("commits")) || {};
  const hasCommit = commits[today] !== undefined;
  
  // Check for tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const todayTasks = tasks.filter(task => task.date === today);
  const allTasksCompleted = todayTasks.length > 0 && todayTasks.every(t => t.completed);
  
  // Save activity status
  const activity = JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || {};
  
  if (hasCommit || allTasksCompleted) {
    activity[today] = true;
  } else {
    // Remove activity if neither condition is met
    delete activity[today];
  }
  
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
}

/**
 * Sync activity data with commits and tasks
 * This ensures heatmap always reflects actual data
 */
function syncActivityData() {
  const commits = JSON.parse(localStorage.getItem("commits")) || {};
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const activity = {};
  
  // Add all dates with commits
  Object.keys(commits).forEach(date => {
    activity[date] = true;
  });
  
  // Add all dates where all tasks were completed
  const tasksByDate = {};
  tasks.forEach(task => {
    if (!tasksByDate[task.date]) {
      tasksByDate[task.date] = [];
    }
    tasksByDate[task.date].push(task);
  });
  
  Object.keys(tasksByDate).forEach(date => {
    const dayTasks = tasksByDate[date];
    if (dayTasks.length > 0 && dayTasks.every(t => t.completed)) {
      activity[date] = true;
    }
  });
  
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
  return activity;
}

/**
 * Render heatmap for last 14 days (or 365 for future expansion)
 */
function renderHeatmap(days = 14) {
  const heatmap = document.getElementById("heatmap");
  if (!heatmap) return;

  heatmap.innerHTML = "";

  // Sync activity data first
  const activity = syncActivityData();
  const today = new Date();

  // Create cells for each day
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const cell = document.createElement("div");
    cell.className = "heatmap-cell";
    
    // Set active state
    if (activity[dateStr]) {
      cell.style.background = "var(--primary)";
      cell.setAttribute("data-active", "true");
    }

    // Format date for tooltip
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    cell.title = `${formattedDate}${activity[dateStr] ? ' - Active' : ' - No activity'}`;
    cell.setAttribute("data-date", dateStr);
    
    heatmap.appendChild(cell);
  }
}

/**
 * Render expanded 365-day heatmap (for future use)
 */
function renderFullYearHeatmap() {
  const heatmap = document.getElementById("heatmap");
  if (!heatmap) return;
  
  // Change grid to show more days
  heatmap.style.gridTemplateColumns = "repeat(53, 18px)";
  
  renderHeatmap(365);
}

/**
 * Get activity stats
 */
function getActivityStats() {
  const activity = syncActivityData();
  const activeDays = Object.keys(activity).length;
  
  // Calculate current streak from activity
  const today = getToday();
  let streak = 0;
  let currentDate = new Date();
  
  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];
    if (activity[dateStr]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (dateStr === today) {
      // Skip today if no activity yet
      currentDate.setDate(currentDate.getDate() - 1);
      continue;
    } else {
      break;
    }
    
    if (streak > 1000) break; // Safety limit
  }
  
  return {
    activeDays,
    currentStreak: streak
  };
}

// Make functions globally available
window.markTodayActive = markTodayActive;
window.renderHeatmap = renderHeatmap;
window.syncActivityData = syncActivityData;
window.renderFullYearHeatmap = renderFullYearHeatmap;
window.getActivityStats = getActivityStats;

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  syncActivityData();
  renderHeatmap();
});
