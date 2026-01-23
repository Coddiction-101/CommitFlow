// streak.js — CommitFlow Streak

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
  return diffTime / (1000 * 60 * 60 * 24);
}

/**
 * Update streak logic
 */
function updateStreak() {
  const today = getToday();

  let streak = Number(localStorage.getItem(STREAK_KEY)) || 0;
  let lastDate = localStorage.getItem(LAST_DATE_KEY);

  if (!lastDate) {
    // First ever activity
    streak = 1;
  } else {
    const diff = getDayDiff(lastDate, today);

    if (diff === 1) {
      streak += 1; // consecutive day
    } else if (diff > 1) {
      streak = 1; // missed days → reset
    }
    // diff === 0 → same day, do nothing
  }

  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(LAST_DATE_KEY, today);

  updateStreakUI(streak);
}

/**
 * Update streak count in UI
 */
function updateStreakUI(streak) {
  const el = document.getElementById("streak-count");
  if (el) {
    el.textContent = `${streak} day${streak !== 1 ? "s" : ""}`;
  }
}

// Make updateStreak available globally so other modules can call it
window.updateStreak = updateStreak;

// Run when page loads
document.addEventListener("DOMContentLoaded", updateStreak);
