chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.get(["callconsentState"], (result) => {
      if (!result.callconsentState) {
        // No state configured yet — the popup will prompt the user.
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: "#e63946" });
      }
    });
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.callconsentState && changes.callconsentState.newValue) {
    chrome.action.setBadgeText({ text: "" });
  }
});
