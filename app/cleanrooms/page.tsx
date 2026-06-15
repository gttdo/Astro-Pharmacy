"use client";

import { useRouter } from "next/navigation";
import { Info, Users } from "lucide-react";
import { AppChrome } from "@/components/AppChrome";
import { HazardChip } from "@/components/Chip";
import { useAstro } from "@/lib/store";
import { CLEANROOMS } from "@/lib/data";

export default function CleanroomsPage() {
  const router = useRouter();
  const { session, joinCleanroom, leaveCleanroom } = useAstro();

  return (
    <AppChrome title="Cleanrooms" back="/home">
      <p className="mb-4 text-sm text-muted">
        Join a cleanroom to access its compounding queue. Hazardous (HD) rooms
        handle hazardous drugs under negative-pressure containment.
      </p>

      <div className="flex flex-col gap-3">
        {CLEANROOMS.map((room) => {
          const joined = session.cleanroomId === room.id;
          const full = room.available === 0;
          return (
            <div
              key={room.id}
              className={`rounded-card border p-4 ${
                joined ? "border-green bg-green-tint/40" : "border-line"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-primary">{room.name}</div>
                  <div className="mt-1">
                    <HazardChip hazard={room.hazard} />
                  </div>
                </div>
                <button
                  disabled={full && !joined}
                  onClick={() => (joined ? leaveCleanroom() : joinCleanroom(room.id))}
                  className={`rounded-md border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    joined
                      ? "border-danger text-danger hover:bg-danger-tint"
                      : full
                        ? "cursor-not-allowed border-line text-faint"
                        : "border-primary text-primary hover:bg-primary-tint"
                  }`}
                >
                  {joined ? "LEAVE" : full ? "FULL" : "JOIN"}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Users size={15} />
                  {room.available} of {room.workstations} open
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex gap-2 rounded-card bg-primary-tint/60 p-3 text-xs text-primary">
        <Info size={16} className="mt-0.5 shrink-0" />
        <p>
          <span className="font-semibold">Safety rule:</span> a technician may
          join a room without a pharmacist, but compounding actions stay disabled
          until a pharmacist is present — and a pharmacist can&apos;t leave while a
          technician is actively compounding.
        </p>
      </div>

      {session.cleanroomId && (
        <button
          onClick={() => router.push("/queue")}
          className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Go to Compounding Queue
        </button>
      )}
    </AppChrome>
  );
}
