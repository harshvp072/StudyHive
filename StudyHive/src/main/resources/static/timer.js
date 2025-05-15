<button onclick="startTimer()">Start</button>
<button onclick="stopTimer()">Stop</button>
<p id="timerDisplay">00:00:00</p>

<script>
let startTime, interval;

function startTimer() {
    startTime = Date.now();
    interval = setInterval(() => {
        let elapsed = Date.now() - startTime;
        let hours = Math.floor(elapsed / 3600000);
        let minutes = Math.floor((elapsed % 3600000) / 60000);
        let seconds = Math.floor((elapsed % 60000) / 1000);
        document.getElementById("timerDisplay").innerText =
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    let endTime = new Date();
    let start = new Date(startTime);

    fetch('/api/sessions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            startTime: start.toISOString(),
            endTime: endTime.toISOString(),
            course: "DSA"
        })
    }).then(res => res.json()).then(data => console.log(data));
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
</script>