"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, GitBranch } from "lucide-react";
import { DeviceFrame } from "@/components/DeviceFrame";
import { StatusBar } from "@/components/StatusBar";

export default function IntroPage() {
  const router = useRouter();

  return (
    <DeviceFrame>
      <StatusBar />
      <main className="no-scrollbar flex-1 overflow-y-auto px-7 pb-10">
        <div className="pt-6">
          <div className="text-3xl font-bold tracking-tight text-primary">
            Astro
          </div>
          <p className="mt-1 text-sm text-muted">
            The operational layer between the EMR order and the compounding
            bench.
          </p>
          <span className="mt-3 inline-flex w-fit items-center rounded-md bg-primary-tint px-2 py-0.5 text-xs font-medium text-primary">
            Interactive prototype
          </span>
        </div>

        <section className="mt-7">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
            The problem
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink">
            A sterile IV order travels between two well-built systems — the{" "}
            <span className="font-medium">EMR</span> that captures it and the{" "}
            <span className="font-medium">cleanroom hood</span>{" "}
            where it&apos;s compounded. The operational middle between them
            belongs to no
            system. It&apos;s run on whiteboards, paper, and memory — and
            it&apos;s where orders get lost and verification happens from recall.
          </p>
        </section>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diagram-unowned-middle.svg"
          alt="A compound order flows from the EMR, through an operational middle that no system owns, to the cleanroom hood."
          className="mt-5 w-full rounded-card border border-line p-2"
        />

        <section className="mt-6 rounded-card bg-primary-tint/60 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">
            The bet
          </h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
            Own that middle, as a companion to the EMR — and the{" "}
            <span className="font-medium">accountable path becomes the fast
            path.</span> Astro carries every order from queue to pickup: owned,
            tracked, documented, and verified.
          </p>
        </section>

        <button
          onClick={() => router.push("/start")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Explore the prototype
          <ArrowRight size={18} />
        </button>
        <button
          onClick={() => router.push("/about")}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-line py-3 text-sm font-medium text-muted transition-colors hover:bg-canvas"
        >
          <GitBranch size={16} />
          See the IA &amp; flows
        </button>

        <p className="mt-6 text-center text-xs text-faint">
          A portfolio prototype by Gerardo Vinces · mock data, no PHI
        </p>
      </main>
    </DeviceFrame>
  );
}
