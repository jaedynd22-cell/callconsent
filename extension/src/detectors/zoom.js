/**
 * Zoom Web Client bot detector.
 *
 * Same resilient/best-effort strategy as the Meet detector: watch for any
 * newly-added text that matches a known bot-name pattern rather than relying
 * on one brittle "participants panel" selector, since Zoom's web-client DOM
 * changes across releases.
 */
(function () {
  const seen = new Set();

  function checkNode(node) {
    if (!(node instanceof Element)) return;
    const text = (node.textContent || "").trim();
    if (!text || text.length > 80) return;

    for (const pattern of CALLCONSENT_BOT_PATTERNS) {
      if (pattern.test(text)) {
        const key = text.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        window.dispatchEvent(
          new CustomEvent("callconsent:bot-detected", { detail: { name: text, platform: "Zoom" } })
        );
        return;
      }
    }
  }

  function scanExisting() {
    const candidateSelectors = [
      '.participants-item',
      '.participants-li',
      '[class*="participant" i]',
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
