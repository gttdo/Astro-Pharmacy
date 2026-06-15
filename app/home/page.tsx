"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, ListChecks, DoorOpen, History } from "lucide-react";
import { AppChrome } from "@/components/AppChrome";
import { RoomStatusBar } from "@/components/RoomStatusBar";
import { HazardChip } from "@/components/Chip";
import { useAstro } from "@/lib/store";
import { CLEANROOMS } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();
  const { session, joinCleanroom } = useAstro();

  return (
    <AppChrome title="Home">
      <RoomStatusBar />

      <h2 className="mt-6 mb-3 text-lg font-medium text-ink">
        Available Cleanrooms
      </h2>
      <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
        {CLEANROOMS.map((room) => {
          const joined = session.cleanroomId === room.id;
          const full = room.available === 0;
          return (
            <div
              key={room.id}
              className="flex w-[240px] shrink-0 flex-col rounded-card border border-line p-4"
            >
              <div className="flex items-start justify-between">
                <div className="font-semibold text-primary">{room.name}</div>
                <button
                  disabled={full && !joined}
                  onClick={() => joinCleanroom(joined ? "" : room.id)}
                  className={`rounded-md border px-3 py-1 text-xs font-semibold transition-colors ${
                    joined
                      ? "border-green bg-green-tint text-green"
                      : full
                        ? "cursor-not-allowed border-line text-faint"
                        : "border-primary text-primary hover:bg-primary-tint"
                  }`}
                >
                  {joined ? "JOINED" : "JOIN"}
                </button>
              </div>
              <div className="mt-1 text-sm text-muted">
                {room.available} of {room.workstations} workstations available
              </div>
              <div className="mt-2">
                <HazardChip hazard={room.hazard} />
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-7 mb-3 text-lg font-medium text-ink">Shortcuts</h2>
      <div className="grid grid-cols-2 gap-3">
        <Shortcut
          tone="green"
          icon={<ClipboardList size={26} />}
          title="Compounding Queue"
          desc="Track medication orders through compounding, ensuring timely and accurate preparation."
          onClick={() => router.push("/queue")}
        />
        <Shortcut
          tone="green"
          icon={<ListChecks size={26} />}
          title="RPh Queue"
          desc="Review submitted preparations awaiting your verification and release."
          onClick={() => router.push("/queue?tab=in_progress")}
        />
        <Shortcut
          tone="lav"
          icon={<DoorOpen size={26} />}
          title="Cleanrooms"
          desc="Set up and join cleanrooms with real-time visibility into room activity."
          onClick={() => router.push("/cleanrooms")}
        />
        <Shortcut
          tone="orange"
          icon={<History size={26} />}
          title="History"
          desc="Track compounding timestamps and staff activity for full accountability."
          disabled
        />
      </div>
    </AppChrome>
  );
}

const TONES = {
  green: "bg-green-tint text-green",
  lav: "bg-lav-tint text-lav",
  orange: "bg-orange-tint text-orange",
};

function Shortcut({
  tone,
  icon,
  title,
  desc,
  onClick,
  disabled,
}: {
  tone: keyof typeof TONES;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col rounded-card p-4 text-left transition-opacity ${TONES[tone]} ${
        disabled ? "opacity-55" : "hover:opacity-90"
      }`}
    >
      <span className="mb-2">{icon}</span>
      <span className="font-semibold">{title}</span>
      <span className="mt-1 text-xs leading-snug text-ink/70">{desc}</span>
    </button>
  );
}
