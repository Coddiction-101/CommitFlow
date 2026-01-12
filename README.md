# CommitFlow
*A simple-but-powerful platform where coders can **commit their daily coding progress**, track learning, maintain streaks, and stay consistent — all stored in **localStorage** initially.*



## **1. Core Purpose**

A simple-but-powerful platform where coders can **commit their daily coding progress**, track learning, maintain streaks, and stay consistent — all stored in **localStorage** initially.

---

## **2. Core Feature Set (Phase 1 — Basic Frontend + localStorage)**

### **2.1 Daily Commit / Journal**

- Add “What I learned today”
- Add “What I built today”
- Add “What I want to do tomorrow”
- Add free notes
- Save each day as a “commit”
- Show commit history

### **2.2 Daily Tasks**

- Create daily tasks (To-Do)
- Check/Uncheck tasks
- After all tasks checked → “Day Completed”
- Completion contributes to streak + progress

### **2.3 Streak Tracker (Basic)**

- Show number of days user made a commit
- Reset if a day is missed
- Store streak inside localStorage

### **2.4 Heatmap Visualization (Simple Explanation)**

A *heatmap* means:

- A calendar grid (like GitHub contributions)
- Each day is colored based on activity:
    - No activity → light color
    - Medium activity → darker
    - Full activity → dark green/blue (your theme)

Not a “geographical map” — it’s a **calendar map** showing activity intensity.

### **2.5 Bookmarks + Playlist Progress Tracker**

- User adds playlist links (YouTube, Udemy, etc.)
- Can mark each video as:
    - “Not started”
    - “In progress”
    - “Completed”
- Store watched videos in localStorage
- Resume from last video
- Show overall percentage progress per playlist

### **2.6 Themes + Dark Mode**

- Light mode
- Dark mode
- Custom accent colors (Blue / Purple / Green / Cyberpunk)
- Store theme preference in localStorage

---

# **3. Extended Feature Set (Phase 2 — When You Learn New Tech)**

(Keep these for later; don’t build now.)

### **3.1 Authentication (Firebase / Node)**

- Basic login/register
- Sync commits + streaks online

### **3.2 Leaderboard (Optional)**

- Compare streaks among friends

### **3.3 Analytics Dashboard**

- Weekly/monthly productivity report
- Radar charts, pie charts (Chart.js or Recharts in React)

### **3.4 Sharing Mode**

- Share a commit publicly
- Share streak screenshot

---

# **4. Tech Stack Plan (Your Learning Roadmap)**

### **Phase 1 — Start Now (HTML + CSS + JS + localStorage)**

- Build UI
- Build daily commit system
- Build tasks
- Heatmap (basic CSS grid)
- Dark mode toggle
- Playlist tracker

### **Phase 2 — Later (React)**

- Componentize everything
- Add state management
- Move logic from vanilla JS → React hooks

### **Phase 3 — Later (Backend)**

- Login + cloud sync
- Real database (Firebase or Supabase)
- Deploy full-stack version

---

# **5. Stepwise Build Order (Very Minimal + Practical)**

### **Step 1 — UI Skeleton**

- Navbar
- Home
- Daily Commit Page
- Tasks Page
- Playlist Tracker Page
- Settings

### **Step 2 — LocalStorage System**

- Save commits
- Save tasks
- Save themes
- Save playlist progress
- Save streak count

### **Step 3 — Daily Commit Function**

- Create form
- Save entries
- Show history

### **Step 4 — Task Manager**

- Add/remove tasks
- Checkbox logic
- Count completed tasks
- When all tasks checked → increase streak

### **Step 5 — Streak System**

- Check date of last activity
- If continuous → streak +1
- If gap → streak reset
- Store results

### **Step 6 — Heatmap**

- Draw 365 squares
- Color them based on activity level
- Update dynamically

### **Step 7 — Playlist Tracker**

- Add new playlist
- Track video progress
- Resume from last watched video

### **Step 8 — Dark Mode + Themes**

- Toggle button
- Save theme to localStorage
- Dynamic CSS variables

---

# **6. Summary (Quick View)**

Your project will include:

✔ Daily commits (journal)

✔ Task checklist with day completion

✔ Streak tracking system

✔ Heatmap calendar like GitHub

✔ Playlist progress tracker

✔ Dark mode + themes

✔ localStorage for now

✔ Upgrade to React/Node later

You now have a **complete roadmap + organized final plan** to start building the platform.

---
