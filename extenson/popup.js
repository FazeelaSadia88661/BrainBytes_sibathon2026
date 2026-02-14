const fill = document.getElementById("fill");
const score = document.getElementById("score");
const status = document.getElementById("status");

chrome.storage.local.get("meetingDetected", d => {
  status.innerText = d.meetingDetected
    ? "🎥 Live Meeting Detected"
    : "❌ No Meeting";
});

document.getElementById("start").onclick = async () => {
  let risk = Math.floor(Math.random() * 70);
  fill.style.width = risk + "%";
  fill.style.background = risk < 35 ? "green" : "orange";
  score.innerText = "Risk: " + risk + "%";
};

document.getElementById("fake").onclick = () => {
  fill.style.width = "92%";
  fill.style.background = "red";
  score.innerText = "Risk: 92%";
  status.innerText = "🚨 Fake CEO Detected!";
};
