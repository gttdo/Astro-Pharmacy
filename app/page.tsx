"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Stethoscope, FlaskConical, ArrowRight } from "lucide-react";
import { DeviceFrame } from "@/components/DeviceFrame";
import { StatusBar } from "@/components/StatusBar";
import { useAstro } from "@/lib/store";
import type { Role } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, resetDemo } = useAstro();

  // Always start the demo from a clean slate.
  useEffect(() => {
    resetDemo();
  }, [resetDemo]);

  function enter(role: Role) {
    login(role, "");
    router.push(role === "RPH" ? "/home" : "/queue");
  }

  return (
    <DeviceFrame>
      <StatusBar />
      <div className="flex flex-1 flex-col px-7 pb-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-1 text-3xl font-bold tracking-tight text-primary">
            Astro
          </div>
          <p className="mb-1 text-sm text-muted">
            Sterile compounding &amp; verification for pharmacy cleanrooms.
          </p>
          <span className="mb-8 inline-flex w-fit items-center rounded-md bg-primary-tint px-2 py-0.5 text-xs font-medium text-primary">
            Interactive prototype
          </span>

          <p className="mb-3 text-sm font-medium text-ink">
            Choose a role to explore
          </p>

          <RoleCard
            onClick={() => enter("RPH")}
            icon={<Stethoscope size={22} />}
            title="Pharmacist (RPh)"
            desc="Join a cleanroom, oversee the queue, and verify — approve or reject — compounded preparations."
          />
          <RoleCard
            onClick={() => enter("TECH")}
            icon={<FlaskConical size={22} />}
            title="Technician"
            desc="Open a ticket, document each component with photo evidence, and submit for pharmacist verification."
          />
        </div>

        <p className="text-center text-xs text-faint">
          A portfolio prototype by Gerardo Vinces · mock data, no PHI
        </p>
      </div>
    </DeviceFrame>
  );
}

function RoleCard({
  onClick,
  icon,
  title,
  desc,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group mb-3 flex w-full items-start gap-4 rounded-card border border-line bg-surface p-4 text-left transition-colors hover:border-primary hover:bg-primary-tint/40"
    >
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
        {icon}
      </span>
      <span className="flex-1">
        <span className="flex items-center font-medium text-ink">
          {title}
          <ArrowRight
            size={18}
            className="ml-1 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </span>
        <span className="mt-0.5 block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );
}
