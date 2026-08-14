(function () {
  const select = document.getElementById("state-select");
  const result = document.getElementById("result");
  const disclaimerEl = document.getElementById("disclaimer-text");

  disclaimerEl.textContent = CALLCONSENT_DISCLAIMER;

  const codes = Object.keys(CALLCONSENT_STATE_DATA).sort((a, b) =>
    CALLCONSENT_STATE_DATA[a].name.localeCompare(CALLCONSENT_STATE_DATA[b].name)
  );
  for (const code of codes) {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = CALLCONSENT_STATE_DATA[code].name;
    select.appendChild(opt);
  }

  function render(code) {
    if (!code) {
      result.classList.remove("visible");
      return;
    }
    const info = callconsentClassify(code);
    if (!info) return;

    const labelMap = {
      "all-party": "All-party consent required",
      "one-party": "One-party consent sufficient",
    };
    const label = labelMap[info.effectiveClassification] || info.effectiveClassification;

    result.innerHTML = "";
    const classificationEl = document.createElement("div");
    classificationEl.className = "classification";
    classificationEl.textContent = `${label} (confidence: ${info.confidence})`;
    result.appendChild(classificationEl);

    const statuteEl = document.createElement("div");
    statuteEl.textContent = info.statute;
    result.appendChild(statuteEl);

    if (info.notes) {
      const notesEl = document.createElement("div");
      notesEl.className = "notes";
      notesEl.textContent = info.notes;
      result.appendChild(notesEl);
    }

    result.classList.add("visible");
  }

  chrome.storage.sync.get(["callconsentState"], (res) => {
    if (res.callconsentState) {
      select.value = res.callconsentState;
      render(res.callconsentState);
    }
  });

  select.addEventListener("change", () => {
    const code = select.value;
    chrome.storage.sync.set({ callconsentState: code });
    render(code);
  });
})();
