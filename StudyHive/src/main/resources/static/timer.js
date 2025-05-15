let startTime, interval;

function pad(n) {
    return n < 10 ? '0' + n : n;
}

function startTimer() {
    startTime = new Date();
    interval = setInterval(() => {
        let elapsed = new Date() - startTime;
        let h = Math.floor(elapsed / 3600000);
        let m = Math.floor((elapsed % 3600000) / 60000);
        let s = Math.floor((elapsed % 60000) / 1000);
        document.getElementById("timerDisplay").innerText = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    let endTime = new Date();
    let course = prompt("Enter course name:");
    let notes = prompt("Any notes?");

    fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            course,
            notes
        })
    }).then(res => res.json()).then(data => {
        alert("Session saved!");
        document.getElementById("timerDisplay").innerText = "00:00:00";
    });
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
