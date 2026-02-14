chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.set({
    meetingDetected:
      tab.url.includes("zoom.us") ||
      tab.url.includes("meet.google.com") ||
      tab.url.includes("teams.microsoft.com")
  });
});
