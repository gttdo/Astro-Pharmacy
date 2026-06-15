"use client";

import { useAstro } from "@/lib/store";
import { CLEANROOMS } from "@/lib/data";

/** The "Joined in / Pharmacist / Technician" strip from Home & Queue. */
export function RoomStatusBar() {
  const session = useAstro((s) => s.session);
  const room = CLEANROOMS.find((c) => c.id === session.cleanroomId);

  const cell = (label: string, value: React.ReactNode) => (
    <div className="flex-1 px-4 py-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ink">{value}</div>
    </div>
  );

  const me = session.role === "RPH";

  return (
    <div className="flex divide-x divide-line rounded-card border border-line">
      {cell(
        "Joined in:",
        room ? room.name : <span className="text-faint">—</span>
      )}
      {cell(
        "Pharmacist(s) in room:",
        room ? (me ? session.name : "K. Osei, PharmD") : <span className="text-faint">—</span>
      )}
      {cell(
        "Technician(s) in room:",
        room ? (!me ? session.name : "L. Romero, CPhT") : <span className="text-faint">—</span>
      )}
    </div>
  );
}
