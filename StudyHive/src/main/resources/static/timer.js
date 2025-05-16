let startTime, interval, selectedCourse = null;
let isRunning = false;

// Helper: pad single digits
function pad(n) {
    return n < 10 ? '0' + n : n;
}

// Start the timer
function startTimer() {
    if (!selectedCourse) {
        alert("Please select a subject to start the timer.");
        return;
    }

    if (!isRunning) {
        startTime = new Date();
        isRunning = true;

        interval = setInterval(() => {
            let elapsed = new Date() - startTime;
            let h = Math.floor(elapsed / 3600000);
            let m = Math.floor((elapsed % 3600000) / 60000);
            document.getElementById("liveTimer").innerText = `${pad(h)}:${pad(m)}`;
        }, 1000);

        // Change icon to pause
        document.getElementById("playPauseIcon").className = "fas fa-pause";
    } else {
        stopTimer();
    }
}

// Stop the timer and save session
function stopTimer() {
    clearInterval(interval);
    isRunning = false;

    const endTime = new Date();
    const notes = prompt("Any notes for this session?") || "";

    fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            course: selectedCourse,
            notes
        })
    }).then(res => res.json()).then(() => {
        alert("Session saved!");
        document.getElementById("liveTimer").innerText = "00:00";
        document.getElementById("playPauseIcon").className = "fas fa-play";
    });
}

// Subject selection from dropdown
function selectSubject(subject) {
    selectedCourse = subject;
    document.getElementById("selectedSubject").innerText = subject;
}

// Manual session form
document.getElementById("manualForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        startTime: new Date(document.getElementById("startTime").value).toISOString(),
        endTime: new Date(document.getElementById("endTime").value).toISOString(),
        course: document.getElementById("course").value,
        notes: document.getElementById("notes").value,
    };

    fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(() => {
        alert("Manual session saved!");
        document.getElementById("manualForm").reset();
    });
});

// Load sessions for selected month
function loadSessions() {
    const monthInput = document.getElementById("monthSelector").value;
    const [year, month] = monthInput.split('-');

    fetch(`/api/sessions/month?year=${year}&month=${month}`)
        .then(res => res.json())
        .then(sessions => {
            const list = document.getElementById("sessionList");
            list.innerHTML = "";
            sessions.forEach(s => {
                const li = document.createElement("li");
                const start = new Date(s.startTime).toLocaleString();
                const end = new Date(s.endTime).toLocaleString();
                li.textContent = `[${s.course}] ${start} → ${end} (${s.notes || "no notes"})`;
                list.appendChild(li);
            });
        });
}
