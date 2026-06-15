# Astro — Thesis Validation (Market & Literature Evidence)

*Discovery/Define artifact. We can't run primary user research for this case study, so the thesis is validated against published evidence — peer-reviewed studies (AJHP, NEJM, BMJ Qual Saf), ASHP national surveys, USP standards, ISMP, KLAS, and trade surveys. Method: decompose the thesis into testable claims, hunt evidence **for and against** each, grade strength honestly. Verdicts below.*

> **Overall verdict:** The problem and the safety half of the bet are **well-supported**. Two claims need **reframing** (not retraction): "speed *and* safety together" → "safety *without a throughput penalty*," and "the EMR doesn't track the operation" → argue as architecture, not cite as fact. The biggest strategic finding is a **threat that validates the wedge**: Epic's free Dispense Prep module is the real competitor, and hospitals adopt it *despite* its workflow gaps — proving they want EMR-integrated order flow but find the EMR's depth inadequate.

---

## Validation matrix

| # | Claim | Verdict | Best evidence | Caveat / counter |
|---|---|---|---|---|
| 1 | Sterile/IV compounding errors are a real, significant safety problem | ✅ **Strong** | Flynn et al., *AJHP* 1997: **9% error rate** (1,679 doses, 5 hospitals); **37% for manual TPN**. ISMP 2020: 74% aware of ≥1 sterile-compounding error in 12 mo. | Rate is dated (pre-<797>, pre-barcode); modern tech-assisted detected rates are ~0.4–0.7%. Most errors low-harm (2 of 100 "clinically important"). |
| 2 | Manual/visual verification misses what technology catches | ✅ **Strong** | Reece, *AJHP* 2016: IVWMS caught **7% errors** across 15,843 doses (71% via gravimetric). Volumetric prep only **71.7% within ±5%** tolerance. | Single-site/before-after vs self-reported baselines; "detects 14×/100×" figures are vendor-sourced — avoid. |
| 3 | The order→bench operation is an un-tracked blind spot ("missing doses") | ✅ **Strong, most on-thesis** | O'Neil, 2014: missing doses = **up to half of all med discrepancies**; staff spend **>90 min/day** on missing-dose calls; *"missing doses occur because of errors in processes…not incompetence."* | Data is hospital-wide, not sterile-compounding-specific. Trend improving via ADCs/lean. |
| 4 | Verification technology reduces errors (the barcode analog) | ✅ **Strong** | Poon, *Arch Intern Med* 2006: barcode cut pharmacy dispensing errors **85%**; Poon, *NEJM* 2010: **41% fewer** admin errors, **55% fewer** potential ADEs. | Koppel, *JAMIA* 2008: **15 workaround types** when verification is bolted-on/workflow-mismatched — *conditional support.* |
| 5 | Human double-checks are unreliable → need structured verification | ✅ **Supports us (as ammunition)** | Koyama, *BMJ Qual Saf* 2020 (systematic review): *"insufficient evidence that double…checking…is associated with lower rates"*; social-loafing failure mode. | This argues *for* deterministic, built-in checks (Astro), against relying on human double-checks. |
| 6 | "Speed AND safety are the same problem" | ⚠️ **Reframe — partial** | Reece 2016: tech production time **−34%**, pharmacist check **−37%** (best case). | 2025 AJHP review concedes literature is **split** on prep time; gravimetric can *add* bench seconds. **Honest claim: safety with no throughput penalty / net gain via eliminated rework — not "always faster."** |
| 7 | Photo/remote verification works & saves pharmacist time | 🟡 **Detection yes; time-saving under-evidenced** | Reed, 2022: remote review of 5,656 images surfaced deviations in ~⅓; ISMP 2022 endorses remote verification. | ~10% of prep couldn't be verified from images alone; no rigorous "saves X% pharmacist time" study found. |
| 8 | EHR queue = verification, not operational tracking (EMR→bench gap) | 🟠 **Weak as fact — argue, don't cite** | Inference from #3 + #1 + IVWMS vendors positioning to fill it; compounded doses lack standardized identifiers for structured tracking. | No published study states it cleanly. Present as architecture/positioning, flagged as interpretation. |
| 9 | Adoption is low but growing (the whitespace) | ✅ **Strong (with a twist)** | ASHP 2023: any-tech in sterile prep **36% (2017) → 66% (2023)**; **gravimetric only 7.7%**; barcode ~34%. | **Window is closing** — frame as "racing into a closing gap," not a permanent ignored problem. |
| 10 | Regulatory tailwind (USP <797> rev. Nov 2023, <800>) | ✅ **Facts strong; demand-link inferential** | USP <797> effective **Nov 1, 2023**: Categories 1–3, tighter BUD, documented competency/environmental monitoring. | <797> mandates documentation, **not software** — paper satisfies it. "Drives software demand" is a vendor argument. |
| 11 | Workforce/throughput strain | ✅ **Strong** | ASHP 2024: **92.8% of hospitals report a sterile-compounding-experienced tech shortage**; 63.7% backfill with pharmacists. Vizient: chemo admins **+13% (2023–28)**. | Strain cuts both ways — can also delay tech-heavy rollouts; budget is the #1 adoption barrier. |
| 12 | Market timing — DoseEdge EOL opens a re-shopping window | ✅ **Confirmed** | Specialty Pharmacy Continuum + HIStalk: Baxter EOLs **DoseEdge after Dec 31, 2028**; UChicago Medicine already migrated (Feb 2025). | Migrations flow **to Epic Dispense Prep**, not new entrants. Installed-base size unpublished. |
| 13 | Market size (TAM) | 🟠 **No clean figure — caution** | Pharmacy automation ~**$10B by 2030, ~7–10% CAGR** (Polaris/M&M) as a proxy. | **There is NO credible "IV workflow management" TAM.** Do not cite generic BPM-software figures ($70–86B) — that's a misrepresentation. |
| 14 | Epic Dispense Prep is a "good-enough" threat | 🔴 **Strong counter-evidence — but validates the wedge** | KLAS: EDP **bundled free**, above-average satisfaction; wins on cost/implementation. But lacks **guided step-by-step workflow, forcing functions/hard stops, gravimetric depth, substitutions, custom reporting** — sites "wait for Epic or build it themselves." | Astro must beat EDP on those *named* gaps AND justify cost vs "free + already integrated." Position against EDP, not DoseEdge. |

---

## The counter-evidence we must own (interview-proofing)

1. **The window is closing.** No-tech compounding fell 53%→37% in ~4 years. *Our framing:* a fast-closing gap we're racing into — urgency, not neglect.
2. **Epic Dispense Prep is the real competitor, and it's free.** *Our framing:* its own users document the gaps (no guided one-step-at-a-time flow, no hard stops, thin reporting); Astro wins on workflow design where the EMR structurally won't invest. The fact hospitals adopt EDP *despite* the gaps proves demand for EMR-integrated order flow — i.e., it validates Astro's companion thesis.
3. **Verification only works if built *into* the flow (Koppel workarounds).** *Our framing:* this isn't a threat — it's the whole design bet. Bolted-on verification gets routed around; Astro's value is verification that's native to the work.
4. **Don't overclaim "faster."** Lead with *"no throughput penalty, and a net gain by eliminating rework,"* backed by Reece's −34%/−37%.
5. **NECC frames stakes, doesn't prove the product.** It's a contamination/fraud event — use for "why sterile compounding is high-stakes," then pivot to in-hospital prep accuracy.
6. **Detection ≠ harm.** Most caught errors are low-harm; cite honestly so a sophisticated reviewer can't catch a conflation.

---

## What this changes in the thesis (updates to docs/05)

- **Pillar headline:** "speed and safety are the same problem" → **"safety with no throughput penalty — the accountable path stops being the slow path because it eliminates rework."**
- **Add urgency / "why now":** name the closing adoption window + DoseEdge EOL + USP <797> (Nov 2023) + the 92.8% tech shortage.
- **Name the real competitor:** position explicitly against **Epic Dispense Prep's documented gaps**, not legacy DoseEdge.
- **Swap proof points:** lead the problem with **O'Neil (missing doses)** + **Poon (barcode)** + **Koyama (double-checks fail)** + **ASHP adoption trend**; demote the dated 9% and the soft "1-in-3" to supporting color with proper attribution.

---

## Key citations (lead with these)
- Flynn EA et al. *AJHP* 1997 — compounding error baseline. https://pubmed.ncbi.nlm.nih.gov/9114922/
- O'Neil DP et al. 2014 — "Missing Doses: A System at Fault." https://pmc.ncbi.nlm.nih.gov/articles/PMC4252224/
- Poon EG et al. *Arch Intern Med* 2006 (dispensing) / *NEJM* 2010 (administration) — barcode error reduction. https://pubmed.ncbi.nlm.nih.gov/16779372/ · https://www.nejm.org/doi/full/10.1056/nejmsa0907115
- Reece KM et al. *AJHP* 2016 — IVWMS error detection + time savings. https://pubmed.ncbi.nlm.nih.gov/26796911/
- Koyama AK et al. *BMJ Qual Saf* 2020 — double-checking insufficient. https://pmc.ncbi.nlm.nih.gov/articles/PMC7362775
- Koppel R et al. *JAMIA* 2008 — barcode workarounds. https://pubmed.ncbi.nlm.nih.gov/18436903/
- ASHP National Survey (Operations & Technology) 2023, *AJHP* 2024;81(16):684. https://academic.oup.com/ajhp/article-abstract/81/16/684/7667468
- USP <797> (eff. Nov 1, 2023). https://www.usp.org/compounding/general-chapter-797
- Specialty Pharmacy Continuum (Oct 2025) — DoseEdge EOL + Epic Dispense Prep. https://www.specialtypharmacycontinuum.com/Pharmacy-Technology-Report/Article/09-25/IV-Workflow-Management-Systems/78238

*Caveats logged: PP&P "1-in-3" sample size unverified; Terkola 2017 gravimetric figures from secondary citation (paywalled); no credible IVWMS TAM; USP→software-demand link is inferential.*
