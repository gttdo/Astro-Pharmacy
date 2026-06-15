"use client";

import { useRouter } from "next/navigation";
import { Clock, FileCheck2 } from "lucide-react";
import { Chip, HazardChip, StatusChip } from "./Chip";
import { Avatar } from "./Avatar";
import { CLEANROOMS } from "@/lib/data";
import type { Ticket } from "@/lib/types";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const room = CLEANROOMS.find((c) => c.id === ticket.cleanroomId);
  const overdue = ticket.dueInMinutes < 0;
  const hd = ticket.hazard === "HD";

  return (
    <button
      onClick={() => router.push(`/queue/${ticket.id}`)}
      className="group w-full overflow-hidden rounded-lg border border-line bg-surface text-left shadow-card transition-all hover:-translate-y-px hover:shadow-pop"
    >
      <div className="flex">
        {/* hazard accent — HD must be unmistakable (USP <800>) */}
        <span
          className={`w-1 shrink-0 ${hd ? "bg-hazard" : "bg-nonhazard/50"}`}
        />
        <div className="flex-1 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-[11px] text-faint">
              <FileCheck2 size={12} /> EMR · {ticket.id}
            </span>
            <StatusChip status={ticket.status} />
          </div>

          <div className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-ink">
            {ticket.medication}
          </div>
          <div className="mt-0.5 text-xs text-muted">
            {ticket.patientName} · MRN {ticket.mrn}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <HazardChip hazard={ticket.hazard} />
            {ticket.prn && <Chip tone="prn">PRN</Chip>}
            {ticket.priority === "stat" && <Chip tone="danger">STAT</Chip>}
            {ticket.status === "rejected" && <Chip tone="danger">Needs fix</Chip>}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
            <span className="flex items-center gap-1">
              <Avatar name={ticket.rph} role="RPH" />
              <Avatar name={ticket.tech} role="TECH" />
              <span className="ml-1.5 text-[11px] text-faint">
                {room?.name ?? "—"}
              </span>
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                overdue ? "text-danger" : "text-muted"
              }`}
            >
              <Clock size={13} />
              {overdue
                ? `${Math.abs(ticket.dueInMinutes)}m over`
                : `${ticket.dueInMinutes}m`}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
