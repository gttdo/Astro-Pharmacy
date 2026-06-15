# Astro — Case Study & Research Dossier (Master Export)

> **What this is:** the complete, self-contained record of the Astro case study — narrative, market research, strategy, design artifacts, and links. Built to be handed to a portfolio-site editor (human or AI) as a single source of truth. Everything here is also available as separate files in this repo's [`docs/`](docs/) folder.
>
> **Product:** Astro — an internal pharmacy **order-management + sterile IV-compounding workflow**, a companion to the EMR, for hospital & clinic pharmacies.
> **Author:** Gerardo Vinces — Senior Product Designer & Design Lead. **Context:** BeiGene · PiHealth, 2024–2025 (sole designer, 1 PM, 4 engineers).
> **Live prototype:** https://astro-pharmacy-flame.vercel.app · **Repo:** https://github.com/gttdo/Astro-Pharmacy
> **Honesty guardrails:** the headline "−35% resolution time" is **directional/estimated**, not a measured study — present it as such. All research stats below are attributed; treat trade-survey figures as color, peer-reviewed figures as load-bearing.

---

## Contents
1. The case study (portfolio narrative): Overview · Problem · Who · Solution · Outcomes · Reflection
2. Strategy & market research: Thesis · Competitive landscape · SWOT · Evidence/validation · Why now
3. Design system & UI rationale
4. Assets & links (diagrams, prototype, file index)
5. Appendix: diagram source (inline SVG)

---

# Part 1 — The case study

## Overview

Astro is the operating system for the cleanroom: it turns sterile IV compounding from an error-intolerant manual process into a guided, photo-documented, pharmacist-verified workflow. It is a **companion to the EMR, not a replacement** — a physician prescribes in the EMR, the order arrives at the pharmacy, a technician compounds it, a pharmacist verifies it, and the dose is released for pickup. As the only designer, I owned this end to end with one PM and four engineers.

## The problem

### A medication order's most dangerous stretch is the one no system owns

In a hospital pharmacy, getting a sterile IV medication to a patient is error-intolerant. The drug is often hazardous, the dose is calculated per patient, and once it's compounded there is no undo. Two well-built systems bookend the work: the **EMR**, where a physician orders the medication and a pharmacist verifies it, and — at the far end — the **cleanroom hood**, where it's physically compounded.

Between them is a void.

After the pharmacist verifies an order, the dose disappears into an operational blind spot. A technician prints a label, hand-sorts it on a table by administration time and drug, gathers the components against a paper log, and walks the pharmacist through the preparation *from memory* for a final sign-off. Nowhere in that stretch is there a live record of who owns the dose, where it physically is, why it's stuck, or proof it was made correctly.

> **Missing doses account for up to half of all hospital medication discrepancies — and chasing them costs pharmacy staff 90+ minutes a day.** *(O'Neil et al., 2014)*

The cost isn't abstract. Orders fall through the cracks. Verification happens from memory — the weakest possible safeguard, and the evidence agrees: independent double-checks show no reliable reduction in error *(BMJ Quality & Safety, 2020)*. Documentation an auditor will ask for is reconstructed after the fact, or missing entirely. What struck me framing this was that the technology to fix it largely already exists and mostly isn't deployed — barcode verification cuts dispensing errors **85%**, yet rigorous gravimetric checking is used in **under 8%** of hospitals. The problem was never a missing invention; it was that **no system owned the operation in between.**

**Why the obvious answers don't solve it.** The EMR's pharmacy queue is a *verification* queue — it confirms an order is appropriate, then hands off; it was never built to run a physical operation. The dedicated IV-workflow systems have the opposite blind spot — they start at the hood and see nothing upstream. So I reframed it: Astro would own the **operational middle that neither one wanted** — turning the most dangerous, least-instrumented stretch of a medication's journey into something owned, tracked, documented, and verifiable.

*[Diagram: the unowned middle — see Assets. EMR (order + verify) → THE UNOWNED MIDDLE (whiteboards · paper · memory) → Cleanroom hood (compound).]*

## Who I designed for

### The same order is a completely different problem from each side of the bench

Astro's whole job happens between two people who touch the same order under opposite pressures. I framed their needs as jobs to be done so the team stayed anchored on outcomes, not features.

**The Technician — executes under pressure** *(frontline, high-volume shifts)*
> "When an order lands in my queue on a busy shift, I want to pick it up, prepare it, and prove each step without breaking my rhythm — so nothing gets lost, and nothing comes back to me as a reject."
> *Evidence: 92.8% of hospitals report a shortage of sterile-compounding-experienced technicians, and pharmacy staff are interrupted as often as once every two minutes.*

**The Pharmacist (RPh) — accountable for the release** *(oversight; the one who answers for it)*
> "When a preparation reaches me, I want to see exactly what was done — with evidence — without re-gowning or re-doing the work, so I can release it quickly, or catch the problem before it reaches a patient."
> *Evidence: independent double-checks show no reliable reduction in error (BMJ Quality & Safety, 2020) — verification has to rest on evidence, not a second pair of tired eyes.*

**And the stakeholder who signs the check — pharmacy leadership.** They don't live in the app, but they decide whether it lives. Their job to be done: *prove the operation is safe, fast, and accountable — to an auditor, a CMO, and a budget.* So the accountability Astro produces had to be a byproduct of the work, not a reporting chore bolted on top.

## The solution

### One system of record for the order — from queue to pickup

I built Astro around a single unit — *the order* — and gave it one job: carry that order from the moment it reaches the pharmacy to the moment it's ready for pickup, owned and documented at every step. That produced four responsibilities the IA falls directly out of: every order must be **owned, tracked, documented, and verified.**

**Information architecture.** Organized around the order's lifecycle and the two people who move it — Home (orient), Cleanrooms (join the space; safety rules live here), the **Compounding Queue** (a live operational board that replaces the whiteboard), the **Worksheet** (the unit of work), and **Verification** (the gate every order passes before release). Deliberately shallow: the queue is one tap away, the worksheet is the only place you go deep. *[Diagram: IA — see Assets.]*

**The core flow.** A clean line with one decisive gate: an order arrives from the EMR and lands in the queue as "new"; a technician opens the worksheet and documents each component — barcode-verifying it and photographing it as they go; they submit for verification; a pharmacist reviews the evidence and **approves** (released for pickup) or **rejects**. A rejection doesn't vanish into a phone call — it returns the order to the technician *with a reason*, as a tracked re-work loop. That loop is the thesis in miniature: the order is never *not* owned. *[Diagram: order flow — see Assets.]*

**The decisions that mattered** (each tied to a persona need and a validated thesis pillar):
- **Same order, two lenses** — technician and pharmacist see the same order through role-specific views; the prototype lets you switch roles mid-flow to feel both sides of the handoff.
- **An operational queue, not a whiteboard** — ownership, status, hazard class, and overdue urgency, the things a stale board can't show.
- **Safety encoded as interaction** — hazardous vs non-hazardous is a first-class filter; a USP <800> containment banner appears on HD worksheets; the "pharmacist must be present" rule is enforced in the UI.
- **Verification built on evidence, not memory** — barcode scan + photo documentation; the pharmacist verifies against evidence and signs a record that's defensible at audit.

The proof isn't a screenshot — it's the **[live prototype](https://astro-pharmacy-flame.vercel.app)**, where you can run the entire loop yourself.

## Outcomes (honest)

- **Faster, accountable resolution.** Structured workflows replaced phone-and-email follow-ups; the team's directional read was roughly a **third less time** to resolution. *(Directional/estimated — not a formal study; lead with the qualitative win.)*
- **Every order owned and auditable.** Tickets stopped getting lost; each had an owner, a status, and a timestamped trail — the concretely-true win.
- **A component system that outlived the product.** Astro's clinical-grade components seeded BeiGene's **PiHealth design system**, standardizing internal tools that came after.

## Reflection

- Clinical users value speed and simplicity — every extra click matters, and the safe path has to also be the fast path.
- Structured, evidence-based verification beats freeform notes and human double-checks (which the literature shows are unreliable).
- As the sole designer, my highest-leverage job was keeping decision latency near zero — embedding with engineering daily beat any handoff process.
- **Next:** the issue-resolution / provider-collaboration layer (designed in principle, not shipped), EHR-context autofill, analytics/reporting, and multi-site visibility.

---

# Part 2 — Strategy & market research

## Thesis & positioning

**The bet:** the safest, fastest pharmacy is won neither at the hood nor in the chart, but in the **unowned operational middle** between them — so Astro owns that middle, as a companion to the EMR, and makes every order accountable end to end. Build documentation and verification *into the act of compounding* rather than bolting them on after, and you remove the throughput penalty that usually comes with rigor: the accountable path stops being the slow path. *(Evidence-honest claim: safety with no throughput penalty + a net gain from eliminated rework — not "always faster.")*

**Three pillars:** ① Own the middle, complement the ends (sidesteps Epic and the hood, and the "why not just use Epic?" objection). ② Accountability is an interaction, not a policy. ③ Evidence at the point of action.

**Positioning statement:** *For* hospital & clinic pharmacy teams who must turn EMR orders into safe, on-time compounded medications and prove it — *Astro* is the operational layer between the EMR and the compounding bench that makes every order owned, tracked, documented, and verified. *Unlike* EHR queues (which only verify) or IV-workflow hardware (which only covers the hood), Astro owns the whole order-to-pickup spine as a lightweight EMR companion.

## Competitive landscape

The market splits in two and nobody owns the middle. **EHR pharmacy modules** own the order + verification; **IV-workflow systems** own the bench. The operational connective tissue between them is run on whiteboards, paper, In Basket, and memory.

- **EHR pharmacy modules (Astro complements these):** Epic Willow, **Epic Dispense Prep**, Cerner PharmNet, MEDITECH. Own order + verify queue; weak at the physical bench. *Epic Dispense Prep is the real competitor — free, bundled, above-average satisfaction — but its users report no guided step-by-step workflow, no hard stops, thin reporting. Position against its named gaps, not legacy hardware.*
- **IV-workflow systems (downstream neighbor):** BD Pyxis IV Prep (ex-Cato), Omnicell IVX, Grifols PharmacyKeeper (#1 Best-in-KLAS 6+ yrs, software-first), Wolters Kluwer Simplifi+, **Baxter DoseEdge (EOL Dec 2028 → migration window)**. Own the hood; blind upstream; mostly hardware-taxed.
- **Robotic compounding (adjacent, heavy capital):** Omnicell IVX Station, Grifols KIRO, Equashield Pro, ARxIUM RIVA, Loccioni APOTECA.
- **The real incumbent — status quo:** hand-sorted labels + paper logs, whiteboards, Epic In Basket / phone / fax. Free, familiar, and exactly the blind spot Astro targets.
- **Modern SaaS neighbors:** Foundation Health (outpatient/refills), Bluesight (inventory/compliance). Neither does inpatient order→bench ops — the lane is open.

*(Full per-vendor detail with sources: [docs/04-competitive-landscape.md](docs/04-competitive-landscape.md).)*

## SWOT

**Strengths** — owns the unclaimed middle (live order queue + ownership + triage); companion not replacement (low political resistance); software-first (cheap, fast, fits small/mid pharmacies); accountability + photo documentation = audit-ready; HD/NHD + role-aware; UX as the moat (the category rewards usability).

**Weaknesses** — no gravimetric/hardware (documents workflow, doesn't weigh); EMR integration is hard and unproven at scale; no installed base/brand; slow hospital procurement; MVP scope; adoption fights paper/whiteboard muscle memory; single-designer bus factor.

**Opportunities** — DoseEdge EOL wave re-shopping now; underserved small/mid pharmacies; compliance pressure (USP <797>/<800>) + ~⅓ of facilities had a compounding-error incident in 5 yrs; immature EHR bench modules to out-design; partner with EMRs and feed orders downstream to IVWMS/robots.

**Threats** — Epic encroachment (Dispense Prep is native + "free-ish") — biggest threat to a companion; heavyweight incumbents (BD/Omnicell/Grifols) chasing the same migration; EMR vendors may restrict/monetize integrations; procurement/IT-security/PHI friction; "good enough" status-quo inertia.

## Evidence & validation (key claims + citations)

Validated against published literature (we did not run primary user research). Verdicts:

| Claim | Verdict | Lead source |
|---|---|---|
| The "unowned middle" / missing-dose operational gap is real | ✅ Strong | O'Neil 2014 — missing doses up to half of discrepancies; 90+ min/day |
| Manual/visual compounding is error-prone; tech catches what visual misses | ✅ Strong | Flynn 1997 (9% baseline); Reece 2016 (IVWMS caught 7% of 15,843 doses) |
| Verification technology reduces errors (barcode analog) | ✅ Strong | Poon 2006 (dispensing −85%) / 2010 NEJM (administration −41%) |
| Human double-checks are unreliable → need structured verification | ✅ Supports us | Koyama 2020 (BMJ Qual Saf): "insufficient evidence" |
| Verification must be built *into* the flow or it's worked around | ✅ (conditional) | Koppel 2008 (JAMIA): 15 workaround types |
| "Speed AND safety together" | ⚠️ Reframe | Mixed on bench time; honest claim = "no throughput penalty + less rework" (Reece: −34% tech / −37% pharmacist time) |
| Adoption low but rising (whitespace, closing window) | ✅ Strong | ASHP: any-tech 36%→66% (2017–2023); gravimetric only 7.7% |
| Regulatory tailwind (USP <797> rev. Nov 2023, <800>) | ✅ facts strong | USP — burden real; software-demand link inferential |
| Workforce/throughput strain | ✅ Strong | ASHP 2024: 92.8% report sterile-comp tech shortage; chemo +13% |
| DoseEdge EOL opens a re-shopping window | ✅ Confirmed | Specialty Pharmacy Continuum / HIStalk: after Dec 31 2028 |
| Epic Dispense Prep is a "good-enough" threat | 🔴 counter-evidence (validates wedge) | KLAS: free/bundled but lacks guided workflow, hard stops, reporting |

**Caveats to honor:** no credible IVWMS TAM (don't cite generic BPM-software market figures); the "1 in 3 facilities" stat is a soft trade survey (PP&P) — color, not headline; NECC (2012) frames stakes but is contamination/fraud, not prep-accuracy. *(Full matrix + every citation URL: [docs/06-thesis-validation.md](docs/06-thesis-validation.md).)*

## Why now
- A fast-closing adoption gap (any-tech 36%→66%; gravimetric still 7.7%).
- Regulatory pressure (USP <797> effective Nov 2023, <800>).
- Acute operational strain (92.8% sterile-comp tech shortage; rising oncology/IV volume).
- A market in motion (DoseEdge EOL pushing its base to re-shop, mostly toward Epic's immature module).

---

# Part 3 — Design system & UI rationale (research → craft)

Every UI decision traces to a finding, so the craft is defensible, not decorative.

| UI decision | Research basis |
|---|---|
| Barcode "scan to verify" per component; documented = scanned AND photographed | Poon 2006/2010 (barcode −85%/−41%); THRIV IV-workflow must-haves |
| Verification built into the work (can't submit until documented) | Koppel 2008 — bolted-on verification gets worked around |
| Photo documentation captured at each step | "Evidence at the point of action"; ISMP 2022 remote-verification guidance |
| USP <800> hazardous-drug banner + HD left-accent on cards | USP <800>; hazard must be unmistakable |
| Operational queue cards: ownership avatars, status, overdue urgency | O'Neil 2014 — no live ownership is *why* doses go missing |
| `EMR · RX-####` provenance on cards | Companion-to-EMR positioning |
| Restrained clinical visual system (subtle elevation, two-ramp color, high contrast) | Category rewards usability (KLAS software-first leader); readable in low-light cleanrooms |

**Visual tokens (Tailwind):** primary indigo `#2a3a8c`; accents green `#2f7d4f`, hazard amber `#b5651d`, non-hazard blue `#2e6b8a`, PRN purple `#8a3fa8`, danger `#d13b3b`; ink `#1d1d1f`, muted `#6e6e73`; surface white, canvas `#ececed`, line `#e3e3e7`. Type: Roboto. *(Full rationale: [docs/10-ui-research-rationale.md](docs/10-ui-research-rationale.md).)*

**Honesty note:** Astro is software-first with **no gravimetric hardware** — its verification is barcode + photo + measurement review, the deliberate trade-off named in the SWOT.

---

# Part 4 — Assets & links

**Live**
- Prototype (responsive desktop + tablet): https://astro-pharmacy-flame.vercel.app
- Portfolio (current case study to be replaced): https://www.davinces.design/work/astro

**Diagrams** (SVG, in the Astro palette — both live URLs and repo paths; raw source in the Appendix below)
| Diagram | Live URL | Repo path |
|---|---|---|
| The unowned middle | https://astro-pharmacy-flame.vercel.app/diagram-unowned-middle.svg | `public/diagram-unowned-middle.svg` |
| Information architecture | https://astro-pharmacy-flame.vercel.app/diagram-ia.svg | `public/diagram-ia.svg` |
| Core order flow | https://astro-pharmacy-flame.vercel.app/diagram-order-flow.svg | `public/diagram-order-flow.svg` |

**Source-doc index** (this repo, `docs/`)
- 01 gap analysis · 02 narrative architecture · 03 discovery · 04 competitive landscape + SWOT · 05 thesis & problem · 06 thesis validation (citations) · 07 case-study Problem · 08 case-study Who · 09 case-study Solution · 10 UI research rationale

---

# Appendix — diagram source (inline SVG, copy-paste ready)

### The unowned middle
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 680 244" role="img" font-family="Roboto, system-ui, sans-serif">
  <title>The unowned middle of a compound order's journey</title>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#6e6e73"/></marker></defs>
  <rect x="45" y="72" width="150" height="92" rx="12" fill="#eef0f8" stroke="#2a3a8c" stroke-width="1.5"/>
  <text x="120" y="112" text-anchor="middle" fill="#2a3a8c" font-size="16" font-weight="500">EMR</text>
  <text x="120" y="134" text-anchor="middle" fill="#3a4aa0" font-size="13">order + verify</text>
  <rect x="215" y="58" width="250" height="120" rx="12" fill="#fae2c8" stroke="#b5651d" stroke-width="1.5" stroke-dasharray="6 5"/>
  <text x="340" y="100" text-anchor="middle" fill="#7a4410" font-size="16" font-weight="500">The unowned middle</text>
  <text x="340" y="124" text-anchor="middle" fill="#9a5a1d" font-size="13">whiteboards · paper · memory</text>
  <text x="340" y="146" text-anchor="middle" fill="#9a5a1d" font-size="13">no live record of the order</text>
  <rect x="485" y="72" width="150" height="92" rx="12" fill="#eef0f8" stroke="#2a3a8c" stroke-width="1.5"/>
  <text x="560" y="112" text-anchor="middle" fill="#2a3a8c" font-size="15" font-weight="500">Cleanroom hood</text>
  <text x="560" y="134" text-anchor="middle" fill="#3a4aa0" font-size="13">compound</text>
  <line x1="197" y1="118" x2="213" y2="118" stroke="#6e6e73" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="467" y1="118" x2="483" y2="118" stroke="#6e6e73" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="45" y="198" width="132" height="26" rx="13" fill="#eef0f8"/>
  <text x="111" y="215" text-anchor="middle" fill="#2a3a8c" font-size="13">Owned system</text>
  <rect x="192" y="198" width="182" height="26" rx="13" fill="#fae2c8"/>
  <text x="283" y="215" text-anchor="middle" fill="#7a4410" font-size="13">Owned by no system</text>
</svg>
```

*The IA and order-flow SVG sources are in the repo at `public/diagram-ia.svg` and `public/diagram-order-flow.svg` (fetchable from the live URLs above). They were omitted here only for length.*
