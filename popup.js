document.addEventListener("DOMContentLoaded", () => {
  const complimentText = document.getElementById("compliment");
  const intervalSelect = document.getElementById("interval");
  const saveButton = document.getElementById("save");
  const status = document.getElementById("status");

  // Display a random compliment
  const index = Math.floor(Math.random() * compliments.length);
  complimentText.textContent = compliments[index];

  // Load saved interval
  chrome.storage.sync.get("interval", (data) => {
    if (data.interval) {
      intervalSelect.value = data.interval;
    }
  });

  // Save interval and reset alarm
  saveButton.addEventListener("click", () => {
    const selected = parseInt(intervalSelect.value);
    chrome.storage.sync.set({ interval: selected }, () => {
      chrome.runtime.sendMessage({ action: "resetAlarm", interval: selected });
      status.textContent = "Interval updated!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
