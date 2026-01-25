// ===============================
// utils.js — Shared helpers (Refined)
// ===============================

// Save data to localStorage
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
}

// Load data from localStorage
function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
}

// Get today's date in YYYY-MM-DD format
function getToday() {
  return new Date().toISOString().split("T")[0];
}

// Get yesterday's date in YYYY-MM-DD format
function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

// Get date N days ago
function getDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

// Calculate day difference between two dates
function getDayDiff(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2 - d1;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Format date for display
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format date short (e.g., "Jan 25, 2025")
function formatDateShort(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Check if a date string is today
function isToday(dateStr) {
  return dateStr === getToday();
}

// Check if a date string is yesterday
function isYesterday(dateStr) {
  return dateStr === getYesterday();
}

// Get relative date string (Today, Yesterday, or formatted date)
function getRelativeDateString(dateStr) {
  if (isToday(dateStr)) return "Today";
  if (isYesterday(dateStr)) return "Yesterday";
  return formatDateShort(dateStr);
}

// Export all data as JSON for backup
function exportAllData() {
  const data = {
    commits: loadFromStorage("commits", {}),
    tasks: loadFromStorage("tasks", []),
    streak: loadFromStorage("commitflow_streak", 0),
    lastDate: loadFromStorage("commitflow_last_date", null),
    activity: loadFromStorage("commitflow_activity", {}),
    playlists: loadFromStorage("playlists", []),
    username: loadFromStorage("username", "Coder"),
    theme: loadFromStorage("theme", "light"),
    exportDate: new Date().toISOString()
  };

  return JSON.stringify(data, null, 2);
}

// Download data as JSON file
function downloadDataAsJson() {
  const dataStr = exportAllData();
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `commitflow-backup-${getToday()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import data from JSON
function importDataFromJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.commits) saveToStorage("commits", data.commits);
    if (data.tasks) saveToStorage("tasks", data.tasks);
    if (data.streak) saveToStorage("commitflow_streak", data.streak);
    if (data.lastDate) saveToStorage("commitflow_last_date", data.lastDate);
    if (data.activity) saveToStorage("commitflow_activity", data.activity);
    if (data.playlists) saveToStorage("playlists", data.playlists);
    if (data.username) saveToStorage("username", data.username);
    if (data.theme) saveToStorage("theme", data.theme);
    
    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
}

// Get statistics
function getStatistics() {
  const commits = loadFromStorage("commits", {});
  const tasks = loadFromStorage("tasks", []);
  const streak = loadFromStorage("commitflow_streak", 0);
  const activity = loadFromStorage("commitflow_activity", {});

  return {
    totalCommits: Object.keys(commits).length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    currentStreak: streak,
    activeDays: Object.keys(activity).length,
    longestStreak: calculateLongestStreak(activity)
  };
}

// Calculate longest streak from activity data
function calculateLongestStreak(activity) {
  const dates = Object.keys(activity).sort();
  if (dates.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = getDayDiff(dates[i - 1], dates[i]);
    if (diff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}
