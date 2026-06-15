import { Wifi, BatteryFull, Signal } from "lucide-react";

/** Faux iPad status bar — fixed 9:41 like the Figma frames. */
export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[13px] font-medium text-ink select-none">
      <span>
        9:41 <span className="ml-1 font-normal text-muted">Mon Jun 22</span>
      </span>
      <span className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2.5} />
        <Wifi size={15} strokeWidth={2.5} />
        <span className="ml-0.5 text-[11px]">100%</span>
        <BatteryFull size={20} strokeWidth={2} />
      </span>
    </div>
  );
}
