# CallConsent — AI Notetaker Consent Alert

A browser extension that watches your Google Meet or Zoom call and alerts you the moment an AI notetaker bot (Otter.ai, Fireflies.ai, Fathom, Read.ai, Grain, tl;dv, Gong, and others) joins — then shows you the consent disclosure your state likely expects before that bot starts recording and transcribing.

## Why this exists

Since mid-2025, several state consent-law wiretap/eavesdropping statutes have collided with a fact pattern nobody wrote them for: an AI bot silently joining a video call to transcribe it. About a dozen US states require **everyone's** consent before a call can be recorded — not just the person who invited the bot. Two of the biggest AI notetaker companies (Otter.ai and Fireflies.ai) are currently facing active class-action litigation over exactly this. Yet none of the notetaker tools themselves surface a clear, state-specific consent prompt — it's usually buried in a terms-of-service page nobody reads mid-meeting.

CallConsent is a lightweight, independent layer that sits on top of any call and gives you (and everyone else on the call) a heads-up in the moment it matters.

## ⚠️ Read this before using or selling this

**This is not legal advice, and it has not been reviewed by a licensed attorney.** The state-by-state consent classifications in `extension/src/state-data.js` are a research starting point compiled from public legal-reference sources (Justia, RecordingLaw.com, the Reporters Committee for Freedom of the Press) as of August 2026. No US state has an "AI notetaker" statute yet — every classification here is a best-effort mapping of older wiretap law onto a new situation, and several states (Connecticut, Delaware, Hawaii, Michigan, Nevada, Oregon, Vermont) have genuinely unsettled or internally conflicting law, flagged explicitly in the data file.

Before this is sold as a commercial compliance product to businesses (law firms, HR departments, healthcare practices), it should be reviewed by a licensed multistate privacy/wiretap attorney. Treat everything the extension displays as informational, not authoritative, and say so clearly in the product itself (the popup and on-page banner both already carry a disclaimer — don't remove it).

Active litigation worth monitoring, since either could change classifications already shipped:
- *In re Otter.AI Privacy Litigation* (N.D. Cal.) — consolidated class actions, motion to dismiss pending as of mid-2026
- *Cruz v. Fireflies.AI Corp.* and *Fricker v. Fireflies.AI Corp.* (N.D. Ill.) — Illinois BIPA voiceprint claims
- Pending New York bill S5077, which would convert New York to an all-party consent state

## What's built (v0.1)

- Manifest V3 Chrome extension
- Content-script detectors for Google Meet and Zoom Web Client that watch for known AI-notetaker names joining as participants (best-effort pattern matching — see "Known limitation" below)
- An on-page banner that appears when a bot is detected, showing the disclosure script appropriate to the user's configured state
- A popup where the user picks their state once and can see the underlying classification, statute citation, and any notes/caveats
- A state-by-state reference table for all 50 states + DC, with confidence levels and flags on the disputed ones

## Known limitation — needs live verification

The Meet and Zoom detectors are written against commonly-documented DOM patterns, but neither platform publishes a stable public API for their web client's participant list, and both change their markup periodically. Partial live testing against a real Google Meet call confirmed Meet uses obfuscated, non-semantic class names (no stable `data-participant-*` attributes), which validates this extension's broad text-scan detection strategy over relying on a specific CSS class — but full verification with an actual notetaker bot joining has not yet happened. Before shipping, join a real Meet/Zoom call with an actual notetaker bot invited and confirm the detector fires, then tighten selectors in `src/detectors/meet.js` / `zoom.js` if needed.

## Install (not yet on the Chrome Web Store)

1. Open `chrome://extensions`
2. Turn on "Developer mode" (top right)
3. Click "Load unpacked" and select the `extension/` folder
4. Click the CallConsent icon and set your state

## Roadmap

- Verify detectors against a live call with a real notetaker bot; add Microsoft Teams support
- Publish to the Chrome Web Store (needs a one-time $5 developer account — see `docs/next-steps.md`)
- Attorney review of the state consent-law data before any commercial claims
- Per-seat subscription licensing for law firms, HR teams, and healthcare practices (self-serve checkout, no sales calls needed — the target buyer is already searching "is it legal to record with an AI notetaker in my state")
- Monitor the active litigation and the NY S5077 bill; update classifications as law changes

## License

MIT for the extension code. The state-law reference data is provided as-is with no warranty — see the disclaimer above.
