# Astro

**An internal pharmacy order-management & sterile-compounding workflow — a functional prototype.**

🔗 **Live demo: [astro-pharmacy-flame.vercel.app](https://astro-pharmacy-flame.vercel.app)**

A medication order makes its most dangerous journey in the gap between two well-built systems: the **EMR** that captures it and the **cleanroom hood** where it's compounded. That operational middle — receive → own → compound → verify → ready-for-pickup — is usually run on whiteboards, paper, and memory. Astro owns that middle, as a **companion to the EMR**: it carries every order through a live queue, a documented worksheet, and a pharmacist verification gate so each dose is owned, tracked, documented, and verified.

This repository is the interactive prototype that accompanies the Astro case study by **Gerardo Vinces**. It runs the full signature loop on mock data — no PHI, no backend.

## The loop you can drive

1. **Sign in** as a Pharmacist (RPh) or Technician.
2. **Join a cleanroom** (hazardous / non-hazardous, USP <800>-aware).
3. **Compounding queue** — a live operational board with ownership, status, hazard class, and overdue alerts.
4. **Worksheet** — document each component with **barcode verification** and photo evidence.
5. **Verification** — the pharmacist **approves** (released for pickup) or **rejects** (returned to the technician with a reason).

You can switch roles mid-flow to experience both sides of the verification handoff. Start at `/` for the context intro, or `/about` for the information architecture and flows.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- [Zustand](https://github.com/pmndrs/zustand) for the order state machine
- [lucide-react](https://lucide.dev) icons

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Case study & process

The design research, strategy, and case-study writing that produced this prototype live in [`docs/`](docs/) — gap analysis, competitive landscape & SWOT, thesis + literature validation, information architecture, and the case-study copy.

---

*Portfolio prototype · mock clinical data, no PHI · designed and built by Gerardo Vinces.*
