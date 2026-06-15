# Case-study copy — "The solution" (draft 1)

*Third section. Carries the product. Pairs with two artifacts built alongside it: the IA map (diagram-ia.svg) and the core user-flow (diagram-order-flow.svg), plus the live prototype as the proof. COPY first, PRODUCTION NOTES after.*

---

## COPY

**THE SOLUTION**

# One system of record for the order — from queue to pickup

If the problem is that no system owns the operational middle, the solution has to be disciplined: own that middle, without trying to become the EMR or the hood. I built Astro around a single unit — *the order* — and gave it one job: carry that order from the moment it reaches the pharmacy to the moment it's ready for pickup, owned and documented at every step.

That produced four responsibilities, the same four the problem named: every order must be **owned, tracked, documented, and verified.** The information architecture falls directly out of them.

### Information architecture

Astro is organized around the order's lifecycle and the two people who move it — not around a feature list.

- **Home** orients you: which cleanroom you're in, who else is there, and shortcuts into the work.
- **Cleanrooms** is where you join the physical space you'll work in — and where the safety rules live (a technician can enter without a pharmacist, but compounding stays locked until one is present).
- **The Compounding Queue** is the heart — a live operational board that replaces the whiteboard. Every order is a card with an owner, a status, a hazard class, and a clock.
- **The Worksheet** is the unit of work: one order, documented step by step.
- **Verification** is the gate every order passes through before release.

The structure is deliberately shallow. On a busy shift, the fewer places you can be, the faster you move — so the queue is never more than a tap away, and the worksheet is the only place you go deep.

### The core flow

The happy path is a clean line with one decisive gate:

1. An order arrives from the EMR and lands in the **queue** as "new."
2. A **technician** picks it up and opens the **worksheet**, documenting each component — drug, dose, lot, expiration — and photographing it as they go. This is the *evidence at the point of action* pillar made literal: proof is captured as the work happens, not reconstructed after.
3. They **submit for verification.**
4. A **pharmacist** reviews the documented evidence and makes one call: **approve** — the dose is released, ready for pickup — or **reject.**

A rejection doesn't vanish into a phone call. It returns the order to the technician *with a reason*, as a tracked re-work loop — closing the accountability gap that paper and memory leave open. That loop is the whole thesis in miniature: the order is never *not* owned.

### The decisions that mattered

- **Same order, two lenses.** The technician and pharmacist see the same order through role-specific views. The prototype lets you switch roles mid-flow — so you can feel both sides of the handoff the real product choreographs.
- **The queue is operational, not informational.** A whiteboard shows counts; Astro's board shows ownership, status, hazard class, and what's overdue — the things a stale board can't.
- **Safety encoded as interaction.** Hazardous vs non-hazardous is a first-class filter; the "pharmacist must be present" rule is enforced in the UI, not in a policy binder.
- **Verification built on evidence, not memory.** Because double-checks from memory are unreliable, the pharmacist verifies against photographic documentation — and signs a record that's defensible at audit.

The proof isn't a screenshot. It's the live prototype — you can run the entire loop yourself.

---

## PRODUCTION NOTES

- **Two diagrams, placed in order:** the IA map under "Information architecture," the order-flow under "The core flow." Both are portable SVGs in the Astro palette (astro-pharmacy/public/diagram-ia.svg, diagram-order-flow.svg) so they sit visually flush with the embedded prototype.
- **Screenshots to embed against the decisions:** Queue (operational board) next to "operational, not informational"; Worksheet photo-capture next to "evidence at the point of action"; the Approve/Reject bar + rejection banner next to "verification built on evidence."
- **The live prototype is the climax** — embed it right after this section (or inline at "run the entire loop yourself"). The role-switch is the demo's signature; call it out so reviewers try both sides.
- **Honesty:** keep "the prototype lets you switch roles" explicit — it's a demo affordance, not a claim the production product blurred the roles (it didn't; separation is the safety model).
- **Tie-backs:** each decision maps to a persona need and a thesis pillar — keep those threads visible (e.g., "operational board" → Pharmacist's "see ownership and status at a glance"; "evidence at point of action" → the validated pillar).
