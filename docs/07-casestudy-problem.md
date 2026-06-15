# Case-study copy — "The Problem" (draft 1)

*First real section, written in your portfolio voice (first person, senior). Evidence woven in readably, attributed lightly, honest. Sets up the problem and Astro's wedge without yet pitching the solution. COPY first; PRODUCTION NOTES after.*

---

## COPY

**THE PROBLEM**

# A medication order's most dangerous stretch is the one no system owns

In a hospital pharmacy, getting a sterile IV medication to a patient is an error-intolerant process. The drug is often hazardous, the dose is calculated per patient, and once it's compounded there is no undo. Two well-built systems bookend the work: the **EMR**, where a physician orders the medication and a pharmacist verifies it, and — at the far end — the **cleanroom hood**, where it's physically compounded.

Between them is a void.

After the pharmacist verifies an order, the dose disappears into an operational blind spot. A technician prints a label, hand-sorts it on a table by administration time and drug, gathers the components against a paper log, and walks the pharmacist through the preparation *from memory* for a final sign-off. Nowhere in that stretch is there a live record of who owns the dose, where it physically is, why it's stuck, or proof it was made correctly.

> **Missing doses account for up to half of all hospital medication discrepancies — and chasing them costs pharmacy staff 90+ minutes a day.** *(O'Neil et al., 2014)*

The cost of that blind spot isn't abstract. Orders fall through the cracks. Verification happens from memory — the weakest possible safeguard, and the evidence agrees: independent double-checks show no reliable reduction in error *(BMJ Quality & Safety, 2020)*. Documentation an auditor will ask for is reconstructed after the fact, or missing entirely.

What struck me as I framed the problem was that the technology to fix it largely already exists — and mostly isn't deployed. Barcode verification cuts pharmacy dispensing errors by **85%**, yet rigorous gravimetric checking is used in **under 8%** of hospitals. The problem was never a missing invention. It was that **no system owned the operation in between.**

### Why the obvious answers don't solve it

The first instinct is *"can't the EMR just do this?"* Structurally, it can't. The EMR's pharmacy queue is a **verification queue** — it confirms an order is appropriate, then hands off. It was never built to run a physical operation: to track ownership, triage a stuck dose, or carry photographic proof from the bench. The dedicated IV-workflow systems have the opposite blind spot — they **start at the hood** and see nothing upstream: not the queue, not the wait, not the order that's now an hour overdue.

So I reframed it. Astro was never going to be a better hood or a better chart. It had to own the **operational middle that neither one wanted** — turning the most dangerous, least-instrumented stretch of a medication's journey into something owned, tracked, documented, and verifiable.

---

## PRODUCTION NOTES

- **Hero visual for this section:** the order-journey diagram — `EMR (order + verify) → ▓ THE UNOWNED MIDDLE ▓ → Hood (compound)` — with the middle highlighted and labeled "whiteboards · paper · memory." This single graphic *is* the thesis; it should anchor the section.
- **Pull-stats to feature** (3 max, attributed): "up to half of medication discrepancies are missing doses / 90+ min a day," "barcode −85% dispensing errors," "gravimetric used in <8% of hospitals." All defensible (docs/06).
- **Honesty guardrails:** keep the *"from memory"* detail (it's vivid and true); attribute stats inline so an interviewer can't accuse of hand-waving; do **not** add the "1 in 3 facilities" stat here (soft trade survey — save for color elsewhere, attributed).
- **Tone check:** first person only where it's about *judgment* ("what struck me," "I reframed it") — the rest is the situation speaking for itself. Avoid hero-narration.
- **Transition:** the last paragraph hands directly to the next section (the solution / "Who I designed for"). The phrase "owned, tracked, documented, and verifiable" seeds the four things the product does.
- **Length:** ~380 words — skimmable, which portfolio readers demand. Subhead breaks it for scanners.
- **Word-count alt:** if the section needs to be shorter on the live site, cut the "Why the obvious answers don't solve it" subhead to two sentences and let the diagram carry the EMR-vs-hood contrast.
