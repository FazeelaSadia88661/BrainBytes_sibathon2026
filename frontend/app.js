// ==== Sample Data Setup ====
let featureData = {
    blinking: 0,
    facial: 0,
    voice: 0,
    head: 0
};

let previousMinuteData = { blinking: 0, facial: 0, voice: 0, head: 0 };
let overallTrend = []; // Array to store overall accuracy trend over time
let timeLabels = []; // For trend chart labels

// ==== Chart Setup ====
const featureCtx = document.getElementById('featureChart').getContext('2d');
const circleCtx = document.getElementById('circleChart').getContext('2d');
const trendCtx = document.getElementById('trendChart').getContext('2d');

const featureChart = new Chart(featureCtx, {
    type: 'bar',
    data: {
        labels: ['Blinking', 'Facial', 'Voice', 'Head'],
        datasets: [{
            label: 'Accuracy %',
            data: [0,0,0,0],
            backgroundColor: ['#6c63ff', '#ff6584', '#00d2d3', '#ffb400']
        }]
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    }
});

const circleChart = new Chart(circleCtx, {
    type: 'doughnut',
    data: {
        labels: ['Accuracy'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#6c63ff', '#2a2a3e'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
        }
    }
});

const trendChart = new Chart(trendCtx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [{
            label: 'Overall Accuracy %',
            data: overallTrend,
            borderColor: '#ffb400',
            backgroundColor: 'rgba(255,180,0,0.2)',
            tension: 0.2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    }
});

// ==== Simulate Real-Time Feature Detection ====
function updateFeatureScores() {
    // Replace with real detection data
    featureData.blinking = Math.floor(Math.random()*100);
    featureData.facial   = Math.floor(Math.random()*100);
    featureData.voice    = Math.floor(Math.random()*100);
    featureData.head     = Math.floor(Math.random()*100);

    featureChart.data.datasets[0].data = [
        featureData.blinking,
        featureData.facial,
        featureData.voice,
        featureData.head
    ];
    featureChart.update();
}

// ==== Update Doughnut Every 1 Minute ====
function updateOverallAccuracy() {
    // Calculate average of 4 features
    let sumCurrent = featureData.blinking + featureData.facial + featureData.voice + featureData.head;
    let avgCurrent = sumCurrent / 4;

    // Calculate previous minute avg
    let sumPrev = previousMinuteData.blinking + previousMinuteData.facial + previousMinuteData.voice + previousMinuteData.head;
    let avgPrev = sumPrev / 4;

    let changePercent = avgPrev ? ((avgCurrent - avgPrev)/avgPrev*100).toFixed(1) : 0;

    // Update doughnut chart
    circleChart.data.datasets[0].data = [avgCurrent, 100 - avgCurrent];
    circleChart.update();

    // Update overall text
    document.getElementById('overallScore').innerText = `${avgCurrent.toFixed(1)}% (${changePercent > 0 ? '+' : ''}${changePercent}%)`;

    // Update trend chart
    let now = new Date();
    let timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; // Shorter, more granular time
    overallTrend.push(avgCurrent);
    timeLabels.push(timeLabel);

    if (overallTrend.length > 20) { // keep last 20 points
        overallTrend.shift();
        timeLabels.shift();
    }
    trendChart.update();

    // Save current as previous for next interval
    previousMinuteData = { ...featureData };
}

// ==== Timers ====
setInterval(updateFeatureScores, 1000); // Update bar chart every 1 sec (real-time)
setInterval(updateOverallAccuracy, 60*1000); // Update doughnut/trend every 1 minute

// ==== Initial update ====
updateFeatureScores();
updateOverallAccuracy();
