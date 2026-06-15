"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/DeviceFrame";
import { StatusBar } from "@/components/StatusBar";

const DECISIONS = [
  {
    title: "Same order, two lenses",
    body: "The technician and pharmacist see the same order through role-specific views. You can switch roles mid-flow to feel both sides of the handoff.",
  },
  {
    title: "An operational queue, not a whiteboard",
    body: "The board shows ownership, status, hazard class, and what's overdue — the things a stale whiteboard can't.",
  },
  {
    title: "Safety encoded as interaction",
    body: "Hazardous vs non-hazardous is a first-class filter; the “pharmacist must be present” rule is enforced in the UI, not a policy binder.",
  },
  {
    title: "Verification on evidence, not memory",
    body: "Because double-checks from memory are unreliable, the pharmacist verifies against photographic documentation — and signs a defensible record.",
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <DeviceFrame>
      <StatusBar />
      <header className="flex items-center gap-3 px-5 py-3">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="text-primary"
        >
          <ChevronLeft size={26} />
        </button>
        <h1 className="text-xl font-medium text-primary">How Astro works</h1>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-5 pb-10">
        <p className="text-[15px] leading-relaxed text-ink">
          Astro owns the operational middle between the EMR and the compounding
          bench. Its structure follows the order&apos;s lifecycle and the two
          people who move it — not a feature list.
        </p>

        <h2 className="mt-7 mb-2 text-sm font-semibold text-ink">
          Information architecture
        </h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diagram-ia.svg"
          alt="Astro's information architecture: a role-aware entry leads to Home, Cleanrooms, the Compounding Queue, and a planned History; the Queue opens the Worksheet, which leads to documentation and verification."
          className="w-full rounded-card border border-line p-2"
        />

        <h2 className="mt-7 mb-2 text-sm font-semibold text-ink">
          The core flow
        </h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diagram-order-flow.svg"
          alt="The core order flow: order in from the EMR, compounding queue, technician compounds and documents, pharmacist verifies; approve releases for pickup, reject returns it with a reason."
          className="w-full rounded-card border border-line p-2"
        />

        <h2 className="mt-7 mb-3 text-sm font-semibold text-ink">
          Decisions that mattered
        </h2>
        <div className="flex flex-col gap-3">
          {DECISIONS.map((d) => (
            <div key={d.title} className="rounded-card border border-line p-4">
              <div className="font-medium text-ink">{d.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/start")}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Explore the prototype
          <ArrowRight size={18} />
        </button>
      </main>
    </DeviceFrame>
  );
}
