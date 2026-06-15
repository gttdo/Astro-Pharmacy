# Astro — Case Study Narrative Architecture

*Phase 2 deliverable. The spine the whole case study hangs on. Built on the locked decisions: combined story (compounding designed + ticketing/collaboration conceptual), metric is directional, full-loop prototype is the centerpiece.*

---

## The core idea: one through-line — **the ticket**

Everything connects at a single unit of work: **the ticket** (a compound order).

```
  Order in  →  Compounding Queue  →  Worksheet (compound + photo-document)  →  Pharmacist verifies
                                                                                   │
                                                              ┌────────────────────┴───────────────┐
                                                         APPROVE                                 REJECT
                                                    (ticket closed)              (issue → resolve → re-work)
                                                                                       │
                                                                          ┌────────────┴───────────┐
                                                                   Tech fixes & re-submits   Needs provider input
                                                                                              (ISSUE-RESOLUTION /
                                                                                               COLLABORATION layer —
                                                                                               conceptual)
```

This is the reconciliation of "both surfaces": **the compounding workflow is the engine; issue-resolution & provider collaboration is what happens when a ticket can't go straight through.** The case study leads with the engine (designed, shown, rare) and frames the collaboration layer as the strategic extension (conceptual, told). One product, one through-line — no contradiction for an interviewer to catch.

---

## Positioning: lead with the domain, not the number

**Problem with the current headline** — *"Cutting prescription-issue resolution time by 35%"* leads with a metric we've agreed is **directional, not measured.** Leading with an unverifiable number is a liability in an interview; leading with the *domain and judgment* is not.

**New headline options** (lead with rare + credible, support with outcome):

- **A (domain-forward):** "Designing the system that keeps sterile compounding safe — and accountable."
  *Sub: Astro — an internal platform for hospital pharmacy cleanrooms, where a mistake isn't a bug, it's a patient. I led design end-to-end.*
- **B (judgment-forward):** "Error-proofing a process where there's no undo."
  *Sub: How I designed Astro's compounding & verification workflow for high-volume pharmacy cleanrooms — and the accountability layer around it.*
- **C (outcome-forward, honest):** "Turning ad-hoc fixes into an accountable clinical workflow."
  *Sub: Astro — the sterile-compounding & issue-resolution platform I led end-to-end at BeiGene/PiHealth.*

*Recommendation:* **A or B.** They signal the rare thing (regulated, safety-critical clinical design) that "ticketing platform" hides.

---

## Section-by-section outline

| # | Section | Key message | Evidence (shown vs told) |
|---|---------|-------------|--------------------------|
| 1 | **Hook / Overview** | Astro makes sterile compounding fast *and* accountable; I owned design end-to-end. | Hero shot of the Worksheet or Queue. |
| 2 | **The stakes** (reframe "Problem") | This is patient-safety operations, not cosmetics. Errors/blocked orders delay care and create liability. | Told + 1 framing diagram. |
| 3 | **Domain primer** *(NEW)* | A short, confident explainer: what sterile compounding is, HD vs NHD, why "no undo," why documentation/verification is legally required (USP <797>/<800>). | Told + simple diagram. **This is your differentiator — most designers can't write this section.** |
| 4 | **Who I designed for** | Two operators with opposite relationships to the same process: Technician (executes) and Pharmacist/RPH (verifies); plus the Clinical Ops Lead (oversight). | JTBD cards (keep existing, add RPH). |
| 5 | **Strategic read** | Internal tool fighting muscle memory; the real moat is accountability + auditability in a regulated space. | Alternatives 2×2 + SWOT, **re-pointed to the domain** (compliance, hazardous-drug liability, not generic "change resistance"). |
| 6 | **The through-line** | Introduce "the ticket" as the unit that links compounding and issue-resolution. | The diagram above. |
| 7 | **Signature flow 1 — Queue → Worksheet** | Designing for speed + zero ambiguity under time pressure; photo documentation as built-in evidence. | **Real screens** (Compounding Queue, Worksheet). Show 2–3 decisions. |
| 8 | **Signature flow 2 — Verification (approve/reject)** | The accountability heart: pharmacist sign-off, the rejection round-trip, error-proofing. | **Real screens** (Picture Review, Reject/Approve, rejection flowchart). |
| 9 | **Signature flow 3 — Cleanroom/hood join + presence rule** | Safety encoded as interaction: "compounding disabled without pharmacist," "can't leave mid-compound." | **Real screens** + the two business rules (verbatim from Figma). |
| 10 | **The collaboration layer** *(honest framing)* | When a ticket can't go through, it becomes an issue needing provider input — the conceptual extension that would close the loop. | **Told + concept diagram.** Explicitly framed as scoped/next, not shipped. |
| 11 | **Process & iteration** | Show the work: 5 iterations, business rules, testing on the real clinical floor. | **Real Figma iterations** (before/after), 1 insight→decision story. |
| 12 | **Interactive prototype** *(centerpiece)* | "Don't just look — use it." Live, functional loop. | **Embedded Vercel build.** |
| 13 | **Outcomes** | Faster, accountable resolution + a component system that outlived the product (PiHealth seed). | Honest metric reframe (below) + design-system artifact. |
| 14 | **Reflection / next** | Senior POV: near-zero decision latency; what I'd build next (the collaboration layer, EHR integration, analytics). | Told. |

---

## The honesty boundary (what we SHOW vs TELL)

| Surface | Status | How we present it |
|---|---|---|
| Cleanroom/hood join, presence rules | Designed | Show real screens |
| Compounding queue (kanban) | Designed | Show real screens |
| Worksheet + photo documentation | Designed | Show real screens |
| Verification (approve/reject + rejection round-trip) | Designed | Show real screens + flowchart |
| Orders (add/edit) | Designed (desktop) | Show, secondary |
| **Issue-resolution / provider messaging / collaboration** | **Conceptual — never fully designed** | **Tell with words + concept diagram; frame as the strategic extension.** Never fabricate screens. |

This boundary is what makes the case study interview-proof: every pixel shown is real, every conceptual claim is labeled as such.

---

## Metric reframe (directional, honest)

**Don't:** repeat "−35%" four times as if measured.
**Do:** state it once, honestly, and let the *system design* carry the credibility.

Suggested language options:
- *"Early signals pointed to a meaningful drop in resolution time — directionally ~a third faster — as structured workflows replaced phone-and-email follow-ups."*
- *"We didn't run a formal study, but the operational change was visible: tickets stopped getting lost, and the team's own estimate was roughly a third less time to resolution."*
- Or drop the number entirely and claim the **qualitative** win: *"issues stopped falling through the cracks — every ticket had an owner, a status, and an audit trail."*

*Recommendation:* keep a single, hedged directional mention + lead the outcomes on the **auditability/accountability** and **design-system legacy** wins, which are concretely true.

---

## Open choices for Gerardo
1. **Headline:** A, B, or C above?
2. **Domain primer:** comfortable including a confident USP <797>/<800> explainer, or keep it lighter for confidentiality?
3. **Metric:** hedged directional mention, or drop the number and go fully qualitative?
