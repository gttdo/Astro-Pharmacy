"use client";

import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { Chip, HazardChip } from "./Chip";
import { CLEANROOMS } from "@/lib/data";
import type { Ticket } from "@/lib/types";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const room = CLEANROOMS.find((c) => c.id === ticket.cleanroomId);
  const overdue = ticket.dueInMinutes < 0;

  return (
    <button
      onClick={() => router.push(`/queue/${ticket.id}`)}
      className="w-full rounded-lg border border-line bg-surface p-3 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
        {ticket.medication}
      </div>
      <div className="mt-1 text-xs text-muted">
        For {ticket.patientName} · MRN {ticket.mrn}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <HazardChip hazard={ticket.hazard} />
        {ticket.prn && <Chip tone="prn">PRN</Chip>}
        {ticket.priority === "stat" && <Chip tone="danger">STAT</Chip>}
        {ticket.status === "rejected" && <Chip tone="danger">Needs fix</Chip>}
      </div>

      <dl className="mt-3 space-y-0.5 text-xs">
        <Row label="RPh" value={ticket.rph} />
        <Row label="Tech" value={ticket.tech} />
        <Row label="Cleanroom" value={room?.name} />
      </dl>

      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          overdue ? "text-danger" : "text-muted"
        }`}
      >
        <Clock size={13} />
        {overdue
          ? `Overdue by ${Math.abs(ticket.dueInMinutes)} min`
          : `Due in ${ticket.dueInMinutes} min`}
      </div>
    </button>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex gap-1.5">
      <dt className="text-faint">{label}:</dt>
      <dd className="text-ink">{value ?? <span className="text-faint">—</span>}</dd>
    </div>
  );
}
