/**
 * Google Meet bot detector.
 *
 * Google Meet's DOM changes fairly often and isn't a documented public API,
 * so this uses a resilient, best-effort strategy: watch the whole document
 * for added nodes, and whenever new text appears that looks like a
 * participant name, test it against the known bot-name patterns rather than
 * depending on one brittle CSS selector for "the participant list."
 *
 * This trades some precision for durability — worth revisiting with a
 * narrower selector (scoped to the actual participants panel) once verified
 * against a live call.
 */
(function () {
  const seen = new Set();

  function checkNode(node) {
    if (!(node instanceof Element)) return;
    const text = (node.textContent || "").trim();
    if (!text || text.length > 80) return; // participant names are short; skip huge text blobs

    for (const pattern of CALLCONSENT_BOT_PATTERNS) {
      if (pattern.test(text)) {
        const key = text.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        window.dispatchEvent(
          new CustomEvent("callconsent:bot-detected", { detail: { name: text, platform: "Google Meet" } })
        );
        return;
      }
    }
  }

  function scanExisting() {
    // Common containers for participant tiles/list items on Meet; kept as an
    // array so new selectors can be appended without touching detection logic.
    const candidateSelectors = [
      '[data-participant-id]',
      '[data-self-name]',
      '[jsname][role="listitem"]',
      '[aria-label*="participant" i]',
    ];
    for (const sel of candidateSelectors) {
      document.querySelectorAll(sel).forEach(checkNode);
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          checkNode(node);
          node.querySelectorAll && node.querySelectorAll("*").forEach(checkNode);
        }
      });
    }
  });

  function start() {
    scanExisting();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})();
