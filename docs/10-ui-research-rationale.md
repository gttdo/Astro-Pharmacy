# UI elevation — research → design rationale

*Why the prototype looks and behaves the way it does. Every elevation decision traces to a market-research finding (docs/04, docs/06), so the craft is defensible, not decorative. Useful as the "design decisions" evidence in the case study.*

| UI decision | Research basis |
|---|---|
| **Barcode "Scan to verify" on every component;** a component is "documented" only when scanned *and* photographed | Poon 2006/2010: barcode verification cut pharmacy dispensing errors **85%** / administration errors **41%** — the strongest evidence-based error check. THRIV "IV workflow must-haves" list barcode scanning + auto-documentation. |
| **Verification is built into the work** — you can't submit until every component is documented | Koppel 2008: bolted-on verification gets *worked around* (15 workaround types). The fix is to make verification native to the flow, not a separate gate. |
| **Photo documentation captured at each step** | The "evidence at the point of action" pillar; ISMP 2022 endorses image-based / remote verification. Reconstruction after the fact is slower *and* less trustworthy. |
| **Hazardous-drug containment banner (USP <800>) + HD left-accent on queue cards** | USP <800>; hazardous status must be unmistakable. "Safety encoded as interaction, not a policy binder." |
| **Operational queue cards: ownership avatars, live status, overdue urgency** | O'Neil 2014: no live ownership/status is *why* doses go missing. The differentiator vs a whiteboard is "operational, not informational." |
| **`EMR · RX-####` provenance on every card** | Reinforces the companion-to-EMR positioning — the order's origin is always visible. |
| **Restrained, clinical visual system** (subtle layered elevation, two-ramp color, high-contrast text) | The category rewards usability over hardware (KLAS's leader is software-first). Original design goal: readability in low-light cleanrooms, minimal cognitive load. |

**Honesty note (consistent with the SWOT):** Astro is software-first and has **no gravimetric hardware** — so its verification is barcode + photo + measurement review, not weight-based interception. That's the deliberate trade-off named in docs/04: lower cost and fast deployment in exchange for not replacing a BD/Omnicell gravimetric bench. The UI reflects exactly what the product can honestly claim.
