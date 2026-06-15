"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronLeft } from "lucide-react";
import { DeviceFrame } from "./DeviceFrame";
import { StatusBar } from "./StatusBar";
import { SideNav } from "./SideNav";
import { useAstro } from "@/lib/store";

export function AppChrome({
  title,
  back,
  right,
  children,
}: {
  title: string;
  back?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const role = useAstro((s) => s.session.role);

  // Guard: the app screens require a signed-in role.
  useEffect(() => {
    if (!role) router.replace("/");
  }, [role, router]);

  if (!role) return null;

  return (
    <DeviceFrame>
      <StatusBar />
      <header className="flex items-center gap-3 px-5 py-3">
        {back ? (
          <button
            onClick={() => router.push(back)}
            aria-label="Back"
            className="text-primary"
          >
            <ChevronLeft size={26} />
          </button>
        ) : (
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            className="text-primary"
          >
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-xl font-medium text-primary">{title}</h1>
        <div className="ml-auto">{right}</div>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8">
        {children}
      </main>

      <SideNav open={navOpen} onClose={() => setNavOpen(false)} />
    </DeviceFrame>
  );
}
