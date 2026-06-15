# Astro — Thesis & Problem Statement (Double Diamond ▸ Define)

*Converging Discovery into the two load-bearing statements the case study stands on. Supersedes the v0.1 thesis in docs/03; grounded in the competitive landscape (docs/04).*

---

## The converged insight (from Discover → Define)

A compound order travels between **two well-built systems and falls into the gap between them.**
- The **EMR** (Epic Willow, Cerner) owns the prescription and the pharmacist's *verification*.
- **IV workflow systems** (BD Pyxis IV Prep, Omnicell IVX) own the *hood*.
- The **operational middle** — receive → own → triage → compound → verify → ready-for-pickup — is owned by *no system*. It runs on whiteboards, paper logs, hand-sorted labels, Epic In Basket, and memory.

That gap is Astro's reason to exist.

---

## Problem statement

**One sentence:**
> In hospital pharmacies, a medication order makes a dangerous journey through an operational blind spot — between the EMR that captures it and the hood where it's compounded, no system owns who has it, where it is, or whether it was made right.

**Case-study paragraph:**
> A physician places an order in the EMR, and a pharmacist verifies it. From there, the dose enters a void. A technician prints a label, hand-sorts it on a table by time and drug, gathers ingredients against a paper log, and walks the pharmacist through the preparation from memory for a final sign-off. Nowhere in this stretch is there a live record of who owns the dose, where it physically is, why it's stuck, or proof it was compounded correctly. Orders fall through the cracks: **missing doses alone account for up to half of all hospital medication discrepancies, and chasing them costs staff 90+ minutes a day** (O'Neil et al., 2014). Verification happens from memory; documentation goes missing at audit. *(A pharmacy trade survey has also found roughly one in three facilities reporting a compounding-error incident within five years — a figure that, by its own account, hasn't moved in 17 years.)* The EMR can't fix this — its queue verifies orders, it doesn't run an operation; IV workflow systems can't either — they start at the hood, blind to everything upstream. The space between them is where patient-safety risk accumulates, and where Astro operates.

**Why the incumbents miss it (the defensibility):**
| | What it owns | Why it leaves the gap |
|---|---|---|
| EMR pharmacy module | The order + verification queue | A *verification* queue ≠ an *operational* one; no ownership, triage, or physical status |
| IV workflow system | The compounding hood | Starts at the hood; blind to intake, ownership, and the upstream queue |
| Status quo | Nothing, really | Whiteboards/paper/memory: no real-time state, no accountability, no audit trail |

*Note: "a verification queue ≠ an operational queue" is an **architecture argument** from how these systems are built — not a cited statistic. We present it as reasoning, supported by the absence of operational tracking that the missing-dose data implies (docs/06, claim #8).*

---

## Thesis (the bet)

**One sentence:**
> The safest, fastest pharmacy is won neither at the hood nor in the chart, but in the **unowned operational middle** between them — so Astro owns that middle, as a companion to the EMR, and makes every order accountable end-to-end.

**Expanded:**
> Astro's bet is that you don't make compounding safer by adding another robot or another check at the hood — you make it safer by giving the *whole operation* a system of record. By owning the spine of a compound order — intake → ownership → compounding → verification → ready-for-pickup — and by building documentation and pharmacist verification **into the act of compounding** rather than bolting them on after, Astro removes the throughput penalty that usually comes with rigor: because verification is native to the work rather than a re-check after it, and rework is caught before it happens, the accountable path stops being the slow path.

*Evidence-honest claim (docs/06): **safety with no throughput penalty — and a net gain from eliminated rework** — not "always faster." The literature is split on whether verification adds or removes bench-time; the defensible win is fewer re-do's and a faster final check (Reece 2016: −34% technician time, −37% pharmacist check), not a universal speed-up.*

**Three pillars it rests on:**
1. **Own the middle, complement the ends.** Don't fight the EMR or the hood — be the connective tissue neither one wants to be. *(Strategic: companion positioning sidesteps the strongest incumbents and the "why not just use Epic?" objection.)*
2. **Accountability is an interaction, not a policy.** Encode who-did-what-when-with-what-evidence into the flow, so the audit trail is a byproduct of doing the work, not extra paperwork.
3. **Evidence at the point of action.** Photograph and verify each step as it happens; reconstruction after the fact is slower *and* less trustworthy.

**Evidence anchor (docs/06):** structured verification reliably reduces errors — barcode cut dispensing errors **85%** and administration errors **41%** (Poon, 2006/2010). Human double-checks do *not* reliably help (Koyama, *BMJ Qual Saf* 2020, "insufficient evidence") — which is exactly why Astro's checks are **built-in and deterministic**, not another tired human re-check. And verification only delivers if it's *native* to the flow: bolted-on checks get worked around (Koppel, 2008) — the failure mode Astro's design exists to avoid.

---

## Why now (the timing the case study can claim)

- **A fast-closing adoption gap.** Hospitals using *any* technology in sterile prep jumped **36% → 66% (2017–2023)**, yet rigorous gravimetric verification sits at just **7.7%** (ASHP). The window to own the operational layer is open now — not forever.
- **Regulatory pressure.** The revised **USP <797> (effective Nov 2023)** and **<800>** raise the bar on documented verification, competency, and hazardous-drug handling.
- **Acute operational strain.** **92.8% of hospitals report a shortage of sterile-compounding-experienced technicians** (ASHP 2024), while oncology/IV volumes keep climbing (chemo administrations +13%, 2023–28).
- **A market in motion.** Baxter is retiring **DoseEdge (after Dec 2028)**, sending its installed base shopping — and most are landing on Epic's *free* **Dispense Prep**, whose own users report **no guided step-by-step workflow, no hard stops, and thin reporting**. *That is the gap Astro is designed to win: position against Epic Dispense Prep's named weaknesses, not legacy hardware.*

---

## Refined positioning statement (carry forward)
> **For** hospital & clinic pharmacy teams who must turn EMR orders into safe, on-time compounded medications and *prove* it — **Astro** is the operational layer between the EMR and the compounding bench that makes every order owned, tracked, documented, and verified. **Unlike** EHR queues (which only verify) or IV workflow hardware (which only covers the hood), Astro owns the whole order-to-pickup spine as a lightweight EMR companion.

---

## How this rewrites the case study (Define → narrative, updates docs/02)
- **"The Problem" section** → replace generic *"issues fell through cracks"* with the **unowned-middle** framing above. It's specific, evidence-backed, and defensible.
- **"Overview / thesis hook"** → lead with the bet: *won in the middle, not at the hood or the chart.*
- **"Strategic read"** → the SWOT (docs/04) now has a real spine; the alternatives 2×2 becomes EMR-modules vs IV-workflow vs status-quo, with Astro in the empty quadrant.
- **Interview-proofing** → the "why not just use Epic?" answer is now built into the thesis (companion, not competitor; owns what Epic structurally doesn't).
