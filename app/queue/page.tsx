"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { AppChrome } from "@/components/AppChrome";
import { RoomStatusBar } from "@/components/RoomStatusBar";
import { TicketCard } from "@/components/TicketCard";
import { useAstro } from "@/lib/store";
import type { Hazard, Lane, Status, Ticket } from "@/lib/types";

type Tab = "new" | "in_progress";

const NEW_LANES: { key: Lane; label: string }[] = [
  { key: "first_dose", label: "First Dose" },
  { key: "compounding", label: "Compounding" },
  { key: "preparation", label: "Preparation" },
];

const PROGRESS_COLS: { key: Status[]; label: string }[] = [
  { key: ["in_progress", "rejected"], label: "Compounding" },
  { key: ["in_review"], label: "In Review" },
  { key: ["approved"], label: "Verified" },
];

function QueueInner() {
  const params = useSearchParams();
  const tickets = useAstro((s) => s.tickets);
  const [tab, setTab] = useState<Tab>(
    params.get("tab") === "in_progress" ? "in_progress" : "new"
  );
  const [query, setQuery] = useState("");
  const [hazard, setHazard] = useState<"all" | Hazard>("all");

  const filtered = useMemo(
    () =>
      tickets.filter((t) => {
        if (hazard !== "all" && t.hazard !== hazard) return false;
        if (query && !t.patientName.toLowerCase().includes(query.toLowerCase()))
          return false;
        return true;
      }),
    [tickets, hazard, query]
  );

  return (
    <AppChrome title="Compounding Queue">
      <RoomStatusBar />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-line px-3 py-2">
          <Search size={18} className="text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Patient"
            className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-xs text-muted">Type</span>
          {(["all", "HD", "NHD"] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHazard(h)}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                hazard === h
                  ? "border-primary bg-primary-tint text-primary"
                  : "border-line text-muted hover:bg-canvas"
              }`}
            >
              {h === "all" ? "All" : h === "HD" ? "Hazardous" : "Non-Haz"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-6 border-b border-line">
        <TabButton active={tab === "new"} onClick={() => setTab("new")}>
          NEW
        </TabButton>
        <TabButton
          active={tab === "in_progress"}
          onClick={() => setTab("in_progress")}
        >
          IN PROGRESS
        </TabButton>
      </div>

      <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5">
        {tab === "new"
          ? NEW_LANES.map((lane) => (
              <Column
                key={lane.key}
                label={lane.label}
                tickets={filtered.filter(
                  (t) => t.status === "new" && t.lane === lane.key
                )}
              />
            ))
          : PROGRESS_COLS.map((col) => (
              <Column
                key={col.label}
                label={col.label}
                tickets={filtered.filter((t) => col.key.includes(t.status))}
              />
            ))}
      </div>
    </AppChrome>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 pb-2 text-sm font-semibold tracking-wide transition-colors ${
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Column({ label, tickets }: { label: string; tickets: Ticket[] }) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col rounded-card bg-canvas p-2.5">
      <div className="mb-2 flex items-center justify-between rounded-lg bg-surface px-3 py-2">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="rounded-full bg-canvas px-2 text-xs font-medium text-muted">
          {tickets.length}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {tickets.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-faint">No tickets</p>
        ) : (
          tickets.map((t) => <TicketCard key={t.id} ticket={t} />)
        )}
      </div>
    </div>
  );
}

export default function QueuePage() {
  return (
    <Suspense>
      <QueueInner />
    </Suspense>
  );
}
