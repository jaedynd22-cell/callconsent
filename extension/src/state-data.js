/**
 * CallConsent state consent-law reference data.
 *
 * ============================== IMPORTANT ==============================
 * This is a RESEARCH STARTING POINT, not legal advice, and has NOT been
 * reviewed by a licensed attorney. Recording/wiretap statutes carry real
 * civil and criminal exposure. No US state has an "AI notetaker" statute
 * yet — every classification below is our best-effort mapping of older
 * wiretap/eavesdropping law onto a new fact pattern (a bot silently
 * transcribing a video call), and courts are actively litigating whether
 * that mapping is even correct (see ACTIVE_LITIGATION below).
 *
 * Do not represent this extension's output as legal advice to end users.
 * Get attorney sign-off before selling this as a compliance product.
 * =========================================================================
 */

const CALLCONSENT_DISCLAIMER =
  "Not legal advice. State recording-consent law is unsettled as applied to AI notetakers — verify with an attorney for anything high-stakes.";

const CALLCONSENT_SCRIPTS = {
  allParty:
    "This meeting is being recorded and transcribed by an AI notetaker. State law here generally requires everyone's consent to continue — speak up now if you'd like it turned off.",
  onePartyHeadsUp:
    "Heads up — this meeting is being recorded and transcribed by an AI notetaker for note-taking purposes.",
};

// classification: "all-party" | "one-party" | "mixed"
// confidence: "high" | "medium" | "low-medium" | "low"
const CALLCONSENT_STATE_DATA = {
  AL: { name: "Alabama", classification: "one-party", confidence: "high", statute: "Ala. Code § 13A-11-30" },
  AK: { name: "Alaska", classification: "one-party", confidence: "high", statute: "Alaska Stat. § 42.20.310" },
  AZ: { name: "Arizona", classification: "one-party", confidence: "high", statute: "Ariz. Rev. Stat. § 13-3005" },
  AR: { name: "Arkansas", classification: "one-party", confidence: "high", statute: "Ark. Code Ann. § 5-60-120" },
  CA: {
    name: "California",
    classification: "all-party",
    confidence: "high",
    statute: "Cal. Penal Code §§ 631 & 632 (CIPA)",
    notes: "Active litigation: In re Otter.AI Privacy Litigation (N.D. Cal.). CA AG issued Jan 2025 advisory confirming CIPA applies to AI tools.",
  },
  CO: { name: "Colorado", classification: "one-party", confidence: "high", statute: "Colo. Rev. Stat. § 18-9-303" },
  CT: {
    name: "Connecticut",
    classification: "mixed",
    confidence: "medium",
    statute: "Crim: Conn. Gen. Stat. §§ 53a-187/189 (one-party); Civil: § 52-570d (all-party)",
    notes: "No crime with one-party consent, but civil damages exposure effectively requires all-party behavior. Treated as all-party for this product's default.",
    treatAs: "all-party",
  },
  DE: {
    name: "Delaware",
    classification: "mixed",
    confidence: "low-medium",
    statute: "Privacy: Del. Code tit. 11 § 1335(a)(4) (all-party); Wiretap: tit. 11 § 2402(c)(4) (one-party)",
    notes: "Delaware's own code conflicts with itself. RCFP recommends following the stricter all-party reading.",
    treatAs: "all-party",
  },
  FL: { name: "Florida", classification: "all-party", confidence: "high", statute: "Fla. Stat. § 934.03" },
  GA: { name: "Georgia", classification: "one-party", confidence: "high", statute: "Ga. Code Ann. § 16-11-62" },
  HI: {
    name: "Hawaii",
    classification: "mixed",
    confidence: "medium",
    statute: "Haw. Rev. Stat. § 803-42(b)(3)(A) (one-party general); § 711-1111 (all-party in a \"private place\")",
    notes: "A home-office video call could count as a \"private place,\" pushing to all-party. Untested against AI bots.",
    treatAs: "one-party",
  },
  ID: { name: "Idaho", classification: "one-party", confidence: "high", statute: "Idaho Code § 18-6702" },
  IL: {
    name: "Illinois",
    classification: "all-party",
    confidence: "high",
    statute: "720 ILCS 5/14-2 (eavesdropping) + BIPA, 740 ILCS 14/1 et seq.",
    notes: "Double exposure: eavesdropping consent AND separate BIPA written-consent requirement for voiceprints. Active suits: Cruz v. Fireflies.AI (Dec 2025), Fricker v. Fireflies.AI (Mar 2026), Walker v. Otter.ai (Aug 2025) — all BIPA voiceprint claims.",
  },
  IN: { name: "Indiana", classification: "one-party", confidence: "medium", statute: "Ind. Code § 35-33.5-5-5" },
  IA: { name: "Iowa", classification: "one-party", confidence: "high", statute: "Iowa Code § 808B.2" },
  KS: { name: "Kansas", classification: "one-party", confidence: "high", statute: "Kan. Stat. Ann. § 21-6101" },
  KY: { name: "Kentucky", classification: "one-party", confidence: "high", statute: "Ky. Rev. Stat. Ann. § 526.020" },
  LA: { name: "Louisiana", classification: "one-party", confidence: "high", statute: "La. Rev. Stat. § 15:1303" },
  ME: {
    name: "Maine",
    classification: "mixed",
    confidence: "medium",
    statute: "Me. Rev. Stat. tit. 15 § 710",
    notes: "One-party consent applies generally, with a narrower private-place exception worth review.",
    treatAs: "one-party",
  },
  MD: { name: "Maryland", classification: "all-party", confidence: "high", statute: "Md. Code, Cts. & Jud. Proc. § 10-402" },
  MA: {
    name: "Massachusetts",
    classification: "all-party",
    confidence: "high",
    statute: "Mass. Gen. Laws ch. 272, § 99",
    notes: "Strictest in the country — secret recording alone is the violation, no intent-to-harm needed.",
  },
  MI: {
    name: "Michigan",
    classification: "mixed",
    confidence: "low-medium",
    statute: "Mich. Comp. Laws § 750.539c",
    notes: "Statute text reads all-party; appellate/federal case law recognizes a one-party \"participant exception.\" State supreme court silent. Defaulting to all-party given the stakes.",
    treatAs: "all-party",
  },
  MN: { name: "Minnesota", classification: "one-party", confidence: "high", statute: "Minn. Stat. § 626A.02" },
  MS: { name: "Mississippi", classification: "one-party", confidence: "high", statute: "Miss. Code Ann. § 41-29-531" },
  MO: { name: "Missouri", classification: "one-party", confidence: "high", statute: "Mo. Rev. Stat. § 542.402" },
  MT: { name: "Montana", classification: "all-party", confidence: "high", statute: "Mont. Code Ann. § 45-8-213(1)(c)" },
  NE: { name: "Nebraska", classification: "one-party", confidence: "high", statute: "Neb. Rev. Stat. § 86-290" },
  NV: {
    name: "Nevada",
    classification: "mixed",
    confidence: "medium",
    statute: "Phone/electronic: Nev. Rev. Stat. § 200.620 (all-party, per Sharpe v. Nevada); In-person: § 200.650 (one-party)",
    notes: "Video calls are \"electronic,\" so the stricter all-party branch likely governs.",
    treatAs: "all-party",
  },
  NH: { name: "New Hampshire", classification: "all-party", confidence: "high", statute: "N.H. Rev. Stat. Ann. § 570-A:2" },
  NJ: { name: "New Jersey", classification: "one-party", confidence: "high", statute: "N.J. Stat. Ann. § 2A:156A-3/4" },
  NM: { name: "New Mexico", classification: "one-party", confidence: "high", statute: "N.M. Stat. Ann. § 30-12-1" },
  NY: {
    name: "New York",
    classification: "one-party",
    confidence: "high",
    statute: "N.Y. Penal Law § 250.05",
    notes: "Pending bill NY S5077 would flip New York to all-party consent — not yet law as of Aug 2026. Watch closely given NY's market size.",
  },
  NC: { name: "North Carolina", classification: "one-party", confidence: "high", statute: "N.C. Gen. Stat. § 15A-287" },
  ND: { name: "North Dakota", classification: "one-party", confidence: "high", statute: "N.D. Cent. Code § 12.1-15-02" },
  OH: { name: "Ohio", classification: "one-party", confidence: "high", statute: "Ohio Rev. Code Ann. § 2933.52" },
  OK: { name: "Oklahoma", classification: "one-party", confidence: "high", statute: "Okla. Stat. tit. 13, § 176.4" },
  OR: {
    name: "Oregon",
    classification: "mixed",
    confidence: "low-medium",
    statute: "Or. Rev. Stat. § 165.540",
    notes: "Project Veritas v. Schmidt (9th Cir. 2023) struck down the in-person all-party \"announcement\" rule for public recording; private video calls likely still covered but untested. Defaulting to all-party out of caution.",
    treatAs: "all-party",
  },
  PA: {
    name: "Pennsylvania",
    classification: "all-party",
    confidence: "high",
    statute: "18 Pa. Cons. Stat. §§ 5703–5704 (WESCA)",
    notes: "Active plaintiffs' bar for related pixel-tracking/session-replay wiretap theories — expect similar interest here.",
  },
  RI: { name: "Rhode Island", classification: "one-party", confidence: "high", statute: "R.I. Gen. Laws § 11-35-21" },
  SC: { name: "South Carolina", classification: "one-party", confidence: "high", statute: "S.C. Code Ann. § 17-30-30" },
  SD: { name: "South Dakota", classification: "one-party", confidence: "high", statute: "S.D. Codified Laws § 23A-35A-20" },
  TN: { name: "Tennessee", classification: "one-party", confidence: "high", statute: "Tenn. Code Ann. § 39-13-601" },
  TX: { name: "Texas", classification: "one-party", confidence: "high", statute: "Tex. Penal Code § 16.02" },
  UT: { name: "Utah", classification: "one-party", confidence: "high", statute: "Utah Code Ann. § 77-23a-4" },
  VT: {
    name: "Vermont",
    classification: "mixed",
    confidence: "low-medium",
    statute: "No wiretap/eavesdropping statute — governed by common-law privacy tort only",
    notes: "Treated as one-party by convention, but there is no codified safe harbor. Least certain state on the list.",
    treatAs: "one-party",
  },
  VA: { name: "Virginia", classification: "one-party", confidence: "high", statute: "Va. Code Ann. § 19.2-62" },
  WA: { name: "Washington", classification: "all-party", confidence: "high", statute: "Wash. Rev. Code § 9.73.030" },
  DC: { name: "Washington, D.C.", classification: "one-party", confidence: "high", statute: "D.C. Code § 23-542" },
  WV: { name: "West Virginia", classification: "one-party", confidence: "high", statute: "W. Va. Code § 62-1D-3" },
  WI: { name: "Wisconsin", classification: "one-party", confidence: "high", statute: "Wis. Stat. § 968.31" },
  WY: { name: "Wyoming", classification: "one-party", confidence: "high", statute: "Wyo. Stat. Ann. § 7-3-702" },
};

const CALLCONSENT_ACTIVE_LITIGATION = [
  "In re Otter.AI Privacy Litigation, N.D. Cal. No. 5:25-cv-06911 (consolidated; motion to dismiss argued May 2026, no ruling yet)",
  "Cruz v. Fireflies.AI Corp., N.D. Ill. (filed Dec 2025) — Illinois BIPA voiceprint claim",
  "Fricker v. Fireflies.AI Corp., N.D. Ill. No. 1:26-cv-02675 (filed Mar 2026) — Illinois BIPA voiceprint claim",
  "Walker v. Otter.ai (filed Aug 2025) — BIPA voiceprint claim",
];

// Known AI notetaker / meeting-bot name patterns seen joining calls as participants.
const CALLCONSENT_BOT_PATTERNS = [
  /otter\.?ai/i,
  /otter\s*notetaker/i,
  /fireflies/i,
  /fathom/i,
  /read\.?ai/i,
  /grain/i,
  /tl;?dv/i,
  /gong(\.io)?/i,
  /chorus(\.ai)?/i,
  /avoma/i,
  /fellow\.app/i,
  /supernormal/i,
  /sembly/i,
  /notetaker/i,
  /transcri(be|ption)\s*bot/i,
  /meeting\s*bot/i,
  /\bnotta\b/i,
  /circleback/i,
];

function callconsentClassify(stateCode) {
  const entry = CALLCONSENT_STATE_DATA[stateCode];
  if (!entry) return null;
  const effective = entry.treatAs || entry.classification;
  return {
    ...entry,
    effectiveClassification: effective,
    script: effective === "all-party" ? CALLCONSENT_SCRIPTS.allParty : CALLCONSENT_SCRIPTS.onePartyHeadsUp,
  };
}
