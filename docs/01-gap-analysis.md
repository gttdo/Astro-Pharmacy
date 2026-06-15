# Astro — Gap Analysis & Roadmap

*Phase 1 deliverable: "understand what exists." Inputs reviewed: live case study (davinces.design/work/astro), the Pharma-Tech Figma file, the (empty) GitHub repo. Goal: improve the case study for portfolio / job search.*

---

## TL;DR — the headline finding

**The written case study and the actual designs tell two different stories, and the weaker one is published.**

- **The published case study** describes Astro as a generic *"internal pharmacy ticketing & collaboration platform"* — issue tickets, follow-ups, "direct messaging between pharmacy teams and providers," a single repeated metric (−35% resolution time).
- **The Figma file** shows something far more specialized and impressive: a **sterile IV-compounding workflow & verification tool for hospital cleanrooms** — pharmacist (RPH) + technician (Tech) roles, Hazardous/Non-Hazardous drug handling, a compounding kanban queue, photo-documented worksheets (dose, NDC, lot #, expiration), and a pharmacist **approve/reject** verification loop with a rejection round-trip.

The most differentiated, credible, hard-to-fake part of your work — **designing safety-critical clinical software in a regulated domain (USP <797>/<800> territory)** — is essentially *invisible* in the write-up. A hiring manager reads "ticketing platform" (commodity) when the artifact proves "sterile compounding verification system" (rare). **Closing that gap is the highest-leverage move in this engagement.**

> **Caveat / open question:** This gap may be deliberate — BeiGene/PiHealth is a real company and the generalization could be intentional for confidentiality. Or the product genuinely had both a comms/ticketing surface and a compounding surface, and the case study foregrounds the former. I need your read on this before we redirect the narrative (see *Decisions needed*).

---

## What's already strong (keep / amplify)

- **Clear role framing.** Two well-drawn personas as jobs-to-be-done (the frontline Technician, the oversight Lead). This maps cleanly onto the RPH/Tech split in the designs.
- **Strategic artifacts exist.** An alternatives 2×2 ("structured/accountable" × "built for pharmacy ops") and a SWOT — most portfolio case studies have neither. This signals product/lead-level thinking.
- **A defensible point of view on internal tools.** "The hardest part isn't building it — it's adoption against muscle memory," and "my highest-leverage job was keeping decision latency near zero." These are senior-designer insights, not junior process recitation.
- **Outcome + system legacy.** The −35% number and "components seeded BeiGene's PiHealth design system" give it both an outcome and a lasting-impact hook.
- **The visual design is genuinely good.** Clean, clinical, Material-UI-based iPad app; restrained palette; appropriate density. It holds up.

---

## Gaps by workstream

### 1. Research
- **Tells, doesn't show.** Claims ethnographic research, contextual inquiry, journey maps, service blueprints — but **zero research artifacts are shown.** For a senior role this is the difference between "I did research" and "here's the insight that changed the design."
- **No traceable insight → decision links.** The strongest case studies show "we observed X on the floor → so we designed Y." None of that connective tissue is present.
- **Opportunity:** reconstruct/produce at least one real artifact (a journey map or service blueprint of the compounding-and-verification flow) and 2–3 "insight → design response" moments.

### 2. Product design
- **The core loop is under-told.** The compounding worksheet, photo documentation, and approve/reject verification — the actual product — get a few generic bullets ("designed reusable UI components for tags, ticket statuses"). The hard, interesting design problems (hazardous-drug safety affordances, error-proofing a sterile process, the rejection round-trip) aren't surfaced.
- **No before/after or iteration shown,** despite the Figma containing **5 explicit numbered iterations**, a documented set of business rules, and a rejection-process flowchart. That's process gold sitting unused.
- **Opportunity:** pick 1–2 signature flows (compounding queue → worksheet → verify; cleanroom/hood join with the "pharmacist must be present" rule) and tell them deeply with real screens and decisions.

### 3. Strategy
- **Solid bones, generic muscle.** The 2×2 and SWOT are good but read slightly templated. They'd land harder tied to the *specific* domain stakes (patient-safety risk, regulatory/compliance constraints, hazardous-drug liability) rather than generic "change resistance."
- **Opportunity:** sharpen the strategic read around what makes *compounding* operations uniquely hard, and what the business case for accountability/auditability really was.

### 4. Process documentation
- **The richest source is unused.** The Figma already organizes work as "As a [role], I want to…" user stories across iterations, with business rules and flowcharts. This is exactly the process narrative the case study claims but doesn't show.
- **Opportunity:** surface the real iteration story (what changed between Iteration 1 → 5 and *why*) — this is the most credible "process" evidence you can offer.

### 5. Prototype
- **Currently a "click to explore" placeholder** (presumably a Figma embed/link). For a portfolio that wants to stand out, a **real, functional, deployed prototype** is a major upgrade — it lets a hiring manager *use* the compounding/verification loop, not just look at it.
- **Opportunity (the build):** Next.js + Tailwind, deployed on Vercel. Scope to the signature loop: join cleanroom → compounding queue → open worksheet → document a compound → pharmacist approve/reject. This becomes the centerpiece interactive moment of the case study.

---

## Metrics credibility (cross-cutting)
- **"−35%" is asserted, never substantiated.** No baseline, no measurement method, no timeframe beyond "within 2 months." Repeated 4×, which can read as *softer*, not stronger. A single, well-explained metric ("measured as median hours from issue-open to close across N tickets, pre/post launch") is more convincing than the number repeated.
- **Opportunity:** add one sentence of methodology behind the headline number, or reframe honestly if it was directional.

---

## Prioritized roadmap

**P0 — Resolve the narrative direction (gating).** Decide how to reconcile the "ticketing platform" framing with the compounding designs (confidentiality? both surfaces? re-tell?). Everything downstream depends on this.

**P1 — Re-architect the case-study narrative** around the real, differentiated work, with traceable insight→decision moments and a sharpened metric.

**P2 — Produce the missing artifacts** that the new narrative needs: 1 research artifact (journey map / service blueprint), the iteration story, 1–2 deep signature-flow walkthroughs.

**P3 — Build the functional prototype** (Next.js + Tailwind on Vercel) for the signature loop; embed it as the case study's interactive centerpiece.

**P4 — Strategy & process polish**: tighten SWOT/alternatives to the domain; document the design-system → PiHealth seeding story.

---

## Decisions needed from Gerardo
1. **The framing question (P0):** Is the generic "ticketing platform" framing deliberate (confidentiality/NDA), or did the write-up just drift from the real compounding work? How much real domain detail can we show publicly?
2. **Metric truth:** Is −35% measured (and how), or directional? This sets how hard we can lean on it.
3. **Prototype fidelity:** Full signature loop with mock data, or a tighter "hero moment" demo? (Affects build scope.)
