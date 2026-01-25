// ===============================
// streak.js — CommitFlow Streak (Refined)
// ===============================

const STREAK_KEY = "commitflow_streak";
const LAST_DATE_KEY = "commitflow_last_date";

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Calculate day difference between two dates
 */
function getDayDiff(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2 - d1;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if user has activity for today
 * Activity = at least one commit OR all tasks completed
 */
function hasActivityToday() {
  const today = getToday();
  
  // Check for commits
  const commits = JSON.parse(localStorage.getItem("commits")) || {};
  const hasCommit = commits[today] !== undefined;
  
  // Check for tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const todayTasks = tasks.filter(task => task.date === today);
  const allTasksCompleted = todayTasks.length > 0 && todayTasks.every(t => t.completed);
  
  return hasCommit || allTasksCompleted;
}

/**
 * Update streak logic
 */
function updateStreak() {
  const today = getToday();
  
  // Check if there's activity today
  const hasActivity = hasActivityToday();

  let streak = Number(localStorage.getItem(STREAK_KEY)) || 0;
  let lastDate = localStorage.getItem(LAST_DATE_KEY);

  if (!lastDate) {
    // First ever activity
    if (hasActivity) {
      streak = 1;
      localStorage.setItem(STREAK_KEY, streak);
      localStorage.setItem(LAST_DATE_KEY, today);
    }
  } else {
    const diff = getDayDiff(lastDate, today);

    if (diff === 0) {
      // Same day - check if activity exists
      if (!hasActivity && streak > 0) {
        // Activity was removed (deleted commit/task)
        // Don't change streak, just update UI
      }
    } else if (diff === 1) {
      // Next day
      if (hasActivity) {
        streak += 1; // Increment streak
        localStorage.setItem(STREAK_KEY, streak);
        localStorage.setItem(LAST_DATE_KEY, today);
      } else {
        // No activity today, but don't reset yet (give them time)
      }
    } else if (diff > 1) {
      // Missed days
      if (hasActivity) {
        streak = 1; // Reset to 1 for today
        localStorage.setItem(STREAK_KEY, streak);
        localStorage.setItem(LAST_DATE_KEY, today);
      } else {
        // No activity and missed days - keep old streak
        // Will reset to 0 when they add new activity
      }
    } else if (diff < 0) {
      // Going backwards in time (editing old data)
      // Just update UI, don't change streak
    }
  }

  updateStreakUI(streak);
}

/**
 * Calculate current streak from scratch (for verification)
 */
function recalculateStreak() {
  const commits = JSON.parse(localStorage.getItem("commits")) || {};
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const today = getToday();
  
  let streak = 0;
  let currentDate = new Date();
  
  // Check backwards from today
  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];
    
    // Check if this date has activity
    const hasCommit = commits[dateStr] !== undefined;
    const dayTasks = tasks.filter(t => t.date === dateStr);
    const allTasksComplete = dayTasks.length > 0 && dayTasks.every(t => t.completed);
    const hasActivity = hasCommit || allTasksComplete;
    
    if (hasActivity) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // If we're still on today, don't break yet
      if (dateStr === today) {
        currentDate.setDate(currentDate.getDate() - 1);
        continue;
      }
      break;
    }
    
    // Safety limit to prevent infinite loop
    if (streak > 1000) break;
  }
  
  // Update stored streak
  localStorage.setItem(STREAK_KEY, streak);
  if (streak > 0) {
    localStorage.setItem(LAST_DATE_KEY, today);
  }
  
  updateStreakUI(streak);
  return streak;
}

/**
 * Update streak count in UI
 */
function updateStreakUI(streak) {
  const el = document.getElementById("streak-count");
  if (el) {
    el.textContent = `${streak} day${streak !== 1 ? "s" : ""}`;
  }
  
  // Update in settings if stat-streak exists
  const statEl = document.getElementById("stat-streak");
  if (statEl) {
    statEl.textContent = streak;
  }
}

/**
 * Reset streak to 0
 */
function resetStreak() {
  localStorage.setItem(STREAK_KEY, 0);
  localStorage.removeItem(LAST_DATE_KEY);
  updateStreakUI(0);
}

// Make functions available globally
window.updateStreak = updateStreak;
window.recalculateStreak = recalculateStreak;
window.resetStreak = resetStreak;

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Recalculate streak on page load for accuracy
  recalculateStreak();
});
