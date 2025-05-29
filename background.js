chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("interval", (data) => {
    const interval = data.interval || 60;
    chrome.alarms.create("complimentAlarm", { periodInMinutes: interval });
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "complimentAlarm") {
    const index = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[index];

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "You’re Doing Great!",
      message: compliment
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resetAlarm") {
    chrome.alarms.clear("complimentAlarm", () => {
      chrome.alarms.create("complimentAlarm", {
        periodInMinutes: message.interval
      });
    });
  }
});
