# CommitFlow 🚀

*A simple but powerful, offline-first developer productivity platform.*

CommitFlow helps students and developers **commit their daily coding progress**, reflect on what they learn, complete tasks, maintain streaks, and **visualize consistency over time** — all stored locally using **localStorage** for speed, privacy, and reliability.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://yourusername.github.io/CommitFlow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![CommitFlow Screenshot](https://via.placeholder.com/800x400/4f46e5/ffffff?text=CommitFlow+Dashboard)

---

## 🧠 Why CommitFlow?

Most learners struggle with:
- ❌ Inconsistent study habits
- ❌ No clear record of what they learned or built
- ❌ Losing motivation after missing a few days

CommitFlow solves this by combining **daily reflection + task completion + streak logic + visual feedback** into a single, focused system.

---

## ✨ Core Features

### 📘 Daily Commit / Journal
- Log what you **learned today**
- Track what you **built today**
- Add free-form notes
- One commit per day (date-locked)
- View complete commit history

### ✅ Daily Tasks (To-Do)
- Create daily task lists
- Check / uncheck tasks
- A day is marked **completed only when all tasks are done**
- Task completion directly affects streaks

### 🔥 Streak Tracker
- Tracks consecutive active days
- Automatically increments on valid daily completion
- Resets if a day is missed
- Fully deterministic and stored in `localStorage`

### 🟩 Activity Heatmap
- GitHub-style **calendar heatmap**
- 14-day grid visualization
- Color intensity based on activity
- Visualizes long-term consistency

### 🎥 Playlist & Bookmark Tracker
- Save learning playlists (YouTube, Udemy, etc.)
- Track progress on learning resources
- Quick access to educational content

### 🎨 Themes & Dark Mode
- Light and dark modes
- Smooth transitions
- Theme preferences persisted locally

---

## 🏗️ Architecture Overview

- **Offline-first design** using `localStorage`
- Modular JavaScript structure
- Date-driven state management
- Deterministic streak and heatmap logic
- UI built for data clarity and speed

This design keeps the app fast, private, and resilient.

---

## 🛠 Tech Stack

### Current (Phase 1)
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **Vanilla JavaScript** - No dependencies
- **localStorage** - Client-side data persistence
- **Remix Icon** - Icon library

### Planned (Phase 2+)
- React (component-based architecture)
- Firebase / Supabase (auth + sync)
- Chart.js / Recharts (analytics)
- Progressive Web App (PWA) support

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CommitFlow.git
   cd CommitFlow
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # or
   npx serve
   ```

3. **Start tracking!**
   - Navigate to Dashboard
   - Add your first commit
   - Create daily tasks
   - Build your streak! 🔥

### No Setup Required
- No build process
- No dependencies to install
- No backend needed
- Just open and start using!

---

## 📖 Usage Guide

### Daily Workflow

1. **Morning**: Open CommitFlow and add today's tasks
2. **During the day**: Check off tasks as you complete them
3. **Evening**: Create your daily commit
   - What did you learn?
   - What did you build?
   - Any notes or reflections?
4. **Track**: Watch your streak grow and heatmap fill up!

### Best Practices

- ✅ Be consistent - commit daily
- ✅ Be specific - write detailed reflections
- ✅ Be honest - track actual progress
- ✅ Review weekly - look at your heatmap and history

---

## 🗂️ Project Structure

```
CommitFlow/
├── index.html              # Landing page
├── css/
│   └── style.css          # Global styles
├── js/
│   ├── commit.js          # Commit management
│   ├── dashboard.js       # Dashboard logic
│   ├── heatmap.js         # Activity heatmap
│   ├── settings.js        # Settings & data management
│   ├── streak.js          # Streak calculation
│   ├── tasks.js           # Task management
│   ├── theme.js           # Theme switcher
│   └── utils.js           # Utility functions
├── pages/
│   ├── commit.html        # Commits page
│   ├── dashboard.html     # Main dashboard
│   ├── settings.html      # Settings page
│   └── tasks.html         # Tasks page
└── README.md
```

---

## 🗺️ Roadmap

### ✅ Phase 1 — Production-Ready Frontend (Current)
- [x] Core journaling system
- [x] Task engine
- [x] Streak logic
- [x] Heatmap visualization
- [x] Playlist tracking
- [x] Theme system
- [x] Responsive design

### 🔄 Phase 2 — Enhanced Features (In Progress)
- [ ] 365-day heatmap
- [ ] Task history view
- [ ] Export/import data
- [ ] Statistics dashboard
- [ ] Custom themes/accent colors

### 📋 Phase 3 — React Migration (Planned)
- [ ] Componentize UI
- [ ] Move logic into hooks
- [ ] Improve state management
- [ ] Better code organization

### 🌐 Phase 4 — Backend & Sync (Future)
- [ ] User authentication
- [ ] Cloud data sync
- [ ] Cross-device access
- [ ] Social features (optional)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Keep code simple and readable
- Follow existing code style
- Test in both light and dark modes
- Ensure mobile responsiveness
- Update README if adding features

---

## 🐛 Known Issues

- [ ] Heatmap limited to 14 days (expanding to 365 days)
- [ ] No data export/import yet
- [ ] Task filtering by date needs improvement

Found a bug? [Open an issue](https://github.com/yourusername/CommitFlow/issues)

---

## 📊 Data & Privacy

- **100% Local** - All data stored in browser localStorage
- **No tracking** - Zero analytics or tracking scripts
- **No backend** - No server, no database, no accounts
- **Your data, your device** - Complete privacy and control

### Data Storage
CommitFlow uses these localStorage keys:
- `commits` - Your daily commits
- `tasks` - Your task lists
- `commitflow_streak` - Current streak count
- `commitflow_last_date` - Last active date
- `commitflow_activity` - Activity tracking
- `playlists` - Saved playlists
- `theme` - Theme preference

---

## 🎯 Project Goals

- Encourage **daily consistency** in coding practice
- Promote **reflection over raw activity**
- Make progress **visible and motivating**
- Build a real-world, evolving product — not a demo app
- Keep it **simple, fast, and private**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 🙏 Acknowledgments

- Inspired by GitHub's contribution graph
- Built with [Remix Icon](https://remixicon.com/)
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) by Google Fonts

---

## ⭐ Star History

If you find CommitFlow helpful, please consider giving it a star! ⭐

---

**Made with ❤️ for developers who want to build consistent coding habits**
