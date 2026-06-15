"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronLeft, X } from "lucide-react";
import { NavContent } from "./NavContent";
import { useAstro } from "@/lib/store";

/** Responsive app shell: persistent rail on desktop, drawer on tablet/mobile. */
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
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const role = useAstro((s) => s.session.role);

  // Guard: the app requires a signed-in role.
  useEffect(() => {
    if (!role) router.replace("/");
  }, [role, router]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <NavContent />
      </aside>

      {/* Mobile / tablet drawer */}
      <div
        onClick={() => setDrawer(false)}
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity lg:hidden ${
          drawer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-surface shadow-xl transition-transform lg:hidden ${
          drawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={() => setDrawer(false)}
            aria-label="Close menu"
            className="text-muted"
          >
            <X size={20} />
          </button>
        </div>
        <NavContent onNavigate={() => setDrawer(false)} />
      </aside>

      {/* Content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-surface/95 px-4 backdrop-blur lg:px-8">
          {back ? (
            <button
              onClick={() => router.push(back)}
              aria-label="Back"
              className="text-primary"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="text-primary lg:hidden"
            >
              <Menu size={22} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-ink">{title}</h1>
          <div className="ml-auto">{right}</div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
