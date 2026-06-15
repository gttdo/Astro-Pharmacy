"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  DoorOpen,
  History,
  RotateCcw,
  LogOut,
} from "lucide-react";
import { useAstro } from "@/lib/store";
import { CLEANROOMS } from "@/lib/data";

const NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/queue", label: "Compounding Queue", icon: ClipboardList },
  { href: "/cleanrooms", label: "Cleanrooms", icon: DoorOpen },
];

/** Shared sidebar content — used by the desktop rail and the mobile drawer. */
export function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout, resetDemo } = useAstro();
  const room = CLEANROOMS.find((c) => c.id === session.cleanroomId);

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-5 pb-3">
        <div className="text-xl font-bold tracking-tight text-primary">
          Astro
        </div>
        <div className="mt-0.5 text-xs text-muted">
          {session.role === "RPH" ? "Pharmacist" : "Technician"} ·{" "}
          {session.name}
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-lg bg-canvas px-3 py-2 text-xs">
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
              onClick={onNavigate}
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
      </nav>

      <div className="border-t border-line px-3 py-3">
        <button
          onClick={() => {
            resetDemo();
            onNavigate?.();
            router.push("/");
          }}
          className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
        >
          <RotateCcw size={19} />
          Reset demo
        </button>
        <button
          onClick={() => {
            logout();
            onNavigate?.();
            router.push("/");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger-tint"
        >
          <LogOut size={19} />
          Sign out
        </button>
      </div>
    </div>
  );
}
