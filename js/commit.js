// =========================
// commit.js — CommitFlow
// =========================

// Load commits from localStorage or initialize empty array
let commits = JSON.parse(localStorage.getItem("commits")) || [];

// UI Elements
const commitTitleInput = document.getElementById("commit-title");
const commitDescInput = document.getElementById("commit-desc");
const addCommitBtn = document.getElementById("add-commit");
const commitList = document.getElementById("commit-list");

// =========================
// Render Commits Function
// =========================
function renderCommits() {
    if (!commitList) return; // Element missing

    commitList.innerHTML = "";

    if (commits.length === 0) {
        commitList.innerHTML = "<li>No commits yet.</li>";
        return;
    }

    // Show newest commit first
    commits.slice().reverse().forEach((commit, revIndex) => {
        const index = commits.length - 1 - revIndex; // Original index
        const li = document.createElement("li");
        li.classList.add("commit-item");
        li.innerHTML = `
            <div>
                <strong>${commit.title}</strong><br>
                <small>${commit.description}</small>
            </div>
            <button class="delete-commit" data-index="${index}">❌</button>
        `;
        commitList.appendChild(li);
    });

}

// =========================
// Add Commit
// =========================
addCommitBtn.addEventListener("click", () => {
    const title = commitTitleInput.value.trim();
    const description = commitDescInput.value.trim();

    if (!title || !description) {
        alert("Please enter both a title and description.");
        return;
    }

    commits.push({ title, description });
    localStorage.setItem("commits", JSON.stringify(commits));

    commitTitleInput.value = "";
    commitDescInput.value = "";

    renderCommits();
});

// =========================
// Delete Commit
// =========================
commitList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-commit")) {
        const index = e.target.getAttribute("data-index");
        commits.splice(index, 1);
        localStorage.setItem("commits", JSON.stringify(commits));
        renderCommits();
    }
});

// =========================
// Dashboard Commit Preview
// =========================
function updateDashboardPreview() {
    if (!commitPreview) return;

    commitPreview.innerHTML = "";

    const latestCommits = commits.slice(-5); // Last 5 commits
    if (latestCommits.length === 0) {
        commitPreview.innerHTML = `<li>No commits added yet</li>`;
        return;
    }

    latestCommits.forEach((commit) => {
        const li = document.createElement("li");
        li.textContent = commit.title;
        commitPreview.appendChild(li);
    });
}
if (typeof window.updateStreak === "function") {
    window.updateStreak();
}

// =========================
// Initial Render
// =========================
renderCommits();