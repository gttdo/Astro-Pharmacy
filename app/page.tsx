"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAstro } from "@/lib/store";
import type { Role } from "@/lib/types";

const CREDS: Record<Role, string> = {
  RPH: "k.osei@stmarys-health.org",
  TECH: "l.romero@stmarys-health.org",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, resetDemo } = useAstro();
  const [role, setRole] = useState<Role>("RPH");

  // Clean slate whenever someone lands on the sign-in screen.
  useEffect(() => {
    resetDemo();
  }, [resetDemo]);

  function signIn(e: React.FormEvent) {
    e.preventDefault();
    login(role, "");
    router.push(role === "RPH" ? "/home" : "/queue");
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel — desktop only */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-white lg:flex xl:p-16">
        <div className="text-2xl font-bold tracking-tight">Astro</div>
        <div>
          <h1 className="text-4xl font-semibold leading-tight">
            Sterile compounding,
            <br />
            owned end to end.
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            From the EMR order to the cleanroom bench — every dose owned,
            tracked, documented, and verified.
          </p>
        </div>
        <div className="text-xs text-white/50">
          Interactive prototype · mock data, no PHI
        </div>
      </div>

      {/* Sign-in form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-2xl font-bold tracking-tight text-primary lg:hidden">
            Astro
          </div>

          <h2 className="text-2xl font-semibold text-ink">Sign in</h2>
          <p className="mt-1 text-sm text-muted">
            Welcome back. Choose your role to continue.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-canvas p-1">
            {(["RPH", "TECH"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-md py-2 text-sm font-medium transition-colors ${
                  role === r
                    ? "bg-surface text-primary shadow-card"
                    : "text-muted hover:text-ink"
                }`}
              >
                {r === "RPH" ? "Pharmacist" : "Technician"}
              </button>
            ))}
          </div>

          <form onSubmit={signIn} className="mt-5 flex flex-col gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-line px-3 py-2.5">
              <Mail size={17} className="text-faint" />
              <input
                type="email"
                value={CREDS[role]}
                readOnly
                className="w-full bg-transparent text-sm text-ink outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-line px-3 py-2.5">
              <Lock size={17} className="text-faint" />
              <input
                type="password"
                value="prototype"
                readOnly
                className="w-full bg-transparent text-sm text-ink outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-5 text-xs text-faint">
            Demo prototype — credentials are illustrative. You can switch roles
            anytime once inside.
          </p>
        </div>
      </div>
    </div>
  );
}
