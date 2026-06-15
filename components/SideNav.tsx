"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  DoorOpen,
  History,
  Info,
  RotateCcw,
  LogOut,
  X,
} from "lucide-react";
import { useAstro } from "@/lib/store";
import { CLEANROOMS } from "@/lib/data";

const NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/queue", label: "Compounding Queue", icon: ClipboardList },
  { href: "/cleanrooms", label: "Cleanrooms", icon: DoorOpen },
];

export function SideNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout, resetDemo } = useAstro();
  const room = CLEANROOMS.find((c) => c.id === session.cleanroomId);

  return (
    <>
      <div
        onClick={onClose}
        className={`absolute inset-0 z-30 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`absolute inset-y-0 left-0 z-40 flex w-[300px] flex-col bg-surface shadow-xl transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <div className="text-lg font-bold tracking-tight text-primary">
              Astro
            </div>
            <div className="text-xs text-muted">
              {session.role === "RPH" ? "Pharmacist" : "Technician"} ·{" "}
              {session.name}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="text-muted">
            <X size={20} />
          </button>
        </div>

        <div className="mx-5 mb-4 rounded-lg bg-canvas px-3 py-2 text-xs">
          <span className="text-muted">Joined in: </span>
          {room ? (
            <span className="font-medium text-ink">{room.name}</span>
          ) : (
            <span className="text-faint">No cleanroom</span>
          )}
        </div>

        <nav className="flex-1 px-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-primary-tint text-primary"
                    : "text-ink hover:bg-canvas"
                }`}
              >
                <Icon size={19} />
                {label}
              </Link>
            );
          })}
          <div className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-faint">
            <History size={19} />
            History
            <span className="ml-auto text-[10px] uppercase tracking-wide">
              soon
            </span>
          </div>
          <Link
            href="/about"
            onClick={onClose}
            className={`mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              pathname === "/about"
                ? "bg-primary-tint text-primary"
                : "text-ink hover:bg-canvas"
            }`}
          >
            <Info size={19} />
            How Astro works
          </Link>
        </nav>

        <div className="border-t border-line px-3 py-3">
          <button
            onClick={() => {
              resetDemo();
              onClose();
              router.push("/start");
            }}
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
          >
            <RotateCcw size={19} />
            Reset demo
          </button>
          <button
            onClick={() => {
              logout();
              onClose();
              router.push("/start");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger-tint"
          >
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
