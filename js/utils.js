// utils.js — Shared helpers

// Save data to localStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Load data from localStorage
function loadFromStorage(key, defaultValue = []) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

// Get today’s date in YYYY-MM-DD format
function getToday() {
  return new Date().toISOString().split("T")[0];
}

// Get yesterday’s date in YYYY-MM-DD format
function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

// Calculate day difference between two dates
function getDayDiff(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2 - d1;
  return diffTime / (1000 * 60 * 60 * 24);
}
