/**
 * Shared banner UI. Platform detectors (meet.js / zoom.js) dispatch a
 * "callconsent:bot-detected" CustomEvent; this listens for it, looks up the
 * user's configured state, and shows an on-page banner with the relevant
 * disclosure script.
 */
(function () {
  let userState = null;

  chrome.storage.sync.get(["callconsentState"], (result) => {
    userState = result.callconsentState || null;
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.callconsentState) userState = changes.callconsentState.newValue;
  });

  function buildBanner(botName, platform) {
    const existing = document.getElementById("callconsent-banner");
    if (existing) existing.remove();

    const info = userState ? callconsentClassify(userState) : null;

    const banner = document.createElement("div");
    banner.id = "callconsent-banner";
    banner.setAttribute("role", "alert");

    const heading = document.createElement("div");
    heading.className = "callconsent-heading";
    heading.textContent = `AI notetaker detected: ${botName}`;
    banner.appendChild(heading);

    const body = document.createElement("div");
    body.className = "callconsent-body";
    if (info) {
      body.textContent = info.script;
    } else {
      body.textContent =
        "Set your state in the CallConsent extension icon to see the disclosure your state likely expects.";
    }
    banner.appendChild(body);

    const footer = document.createElement("div");
    footer.className = "callconsent-footer";
    footer.textContent = CALLCONSENT_DISCLAIMER;
    banner.appendChild(footer);

    const closeBtn = document.createElement("button");
    closeBtn.className = "callconsent-close";
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Dismiss");
    closeBtn.addEventListener("click", () => banner.remove());
    banner.appendChild(closeBtn);

    document.body.appendChild(banner);

    // Auto-dismiss after 25s so it doesn't nag through the whole call.
    setTimeout(() => {
      if (banner.isConnected) banner.remove();
    }, 25000);
  }

  window.addEventListener("callconsent:bot-detected", (event) => {
    const { name, platform } = event.detail || {};
    buildBanner(name || "unknown bot", platform || "this call");
  });
})();
