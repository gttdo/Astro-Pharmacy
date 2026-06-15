# Astro — Discovery (Double Diamond, Diamond 1 ▸ Discover)

*A living log. Everything below is a **working hypothesis** for Gerardo to validate, refute, or enrich — Discovery diverges before Define converges. Confirmed items get marked ✅; open items carry a ❓.*

## Engagement mapped to the Double Diamond
| Phase | What it covers here | Status |
|---|---|---|
| **Discover** | What Astro is, who it's for, the problem space, value prop, thesis | ▶ in progress |
| **Define** | The case-study narrative spine, the signature flows, scope | drafted (docs/02) |
| **Develop** | The functional prototype | working draft (./astro-pharmacy) |
| **Deliver** | Final case study + deployed prototype | pending |

---

## 1. What is Astro?

**One-liner (working):**
> Astro is the **operating system for the cleanroom** — it turns sterile IV compounding from an error-intolerant manual process into a guided, photo-documented, pharmacist-verified workflow.

**Expanded:** Astro is a point-of-care **clinical workflow & verification system** for sterile IV/infusion compounding in hospital and infusion-center pharmacies. It orchestrates the full life of a compound order — intake → queue → preparation (the worksheet) → pharmacist verification → release — with documentation and role separation built into the act of compounding rather than bolted on afterward.

**What it is *not* (sharpens the category):**
- ❌ A retail/consumer pharmacy app (no prescriptions to fill, refills, delivery)
- ❌ A generic ticketing/helpdesk tool (the "ticket" is a *compound order*, governed by clinical rules)
- ❌ An EHR or e-prescribing system (it consumes orders; it doesn't originate them)
- ✅ A **cleanroom workflow + verification + documentation** system, role-aware (Technician executes, Pharmacist verifies), hazard-aware (HD vs NHD).

---

## 2. Value proposition

**Positioning statement (working):**
> **For** hospital pharmacy teams who must compound sterile IV medications exactly right, under time pressure, and *prove* it for compliance — **Astro** is a cleanroom workflow system that makes compounding **fast, accountable, and audit-ready**. **Unlike** the status quo of paper logs, generic tools, and verbal handoffs, Astro builds **documentation and pharmacist verification into the moment of compounding** instead of reconstructing them after the fact.

**Value by stakeholder:**
| Stakeholder | What Astro gives them |
|---|---|
| **Technician** | Capture and execute in seconds; never lose a step; see what's urgent at a glance |
| **Pharmacist (RPh)** | Verify with complete photographic evidence; one view of status + ownership; a defensible sign-off |
| **Pharmacy / clinical-ops leadership** | Throughput *and* a complete audit trail; less re-work and drug waste; a stronger USP <797>/<800> compliance posture |
| **Patient / institution** (ultimate stakeholder) | Right drug, right dose, on time, safely — with traceability if anything is ever questioned |

---

## 3. Thesis (the core bet)

> **In compounding, speed and safety are not a trade-off — they are the same problem.**
> If you make the *safe* path the *fast* path — documentation captured in the moment, verification structured into the flow, accountability encoded in the interaction — you get faster turnaround **and** fewer errors at once.

**Supporting sub-bets:**
1. **Accountability is a design problem, not a policy problem** — encode it in the interaction (who did what, when, with what evidence), don't leave it to memos and habit.
2. **Evidence at the point of action beats reconstruction after the fact** — photographing each component as it's prepared is more reliable, and faster, than back-filling a log.
3. **Role separation with the right choreography** (tech executes ↔ pharmacist verifies) reduces error without adding latency.

---

## ❓ Open questions to validate in Discovery (only Gerardo can answer)
- **Origin/trigger:** what precipitated Astro — a near-miss, an audit finding, a new cleanroom build-out, USP <800> compliance pressure, a leadership mandate?
- **Failure modes (pre-Astro):** concretely what went wrong — lost compounds, re-work, wasted hazardous drugs, verification bottlenecks, audit gaps?
- **Build vs. buy:** why internal, given commercial systems (DoseEdge, BD Cato, Omnicell) exist?
- **Hardest design problem:** what genuinely kept you up at night?
- **Most novel contribution:** what are you proudest of designing?
- **PiHealth handoff:** how Astro's components actually seeded the design system.
- **Is the thesis above *yours*?** Does "speed and safety are the same problem" ring true, or is the real core bet something else?
