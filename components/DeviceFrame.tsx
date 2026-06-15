/** Centers the app inside an iPad-portrait bezel on larger screens. */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center sm:p-6">
      <div className="relative flex h-[100dvh] w-full max-w-[744px] flex-col overflow-hidden bg-surface sm:h-[min(1133px,94dvh)] sm:rounded-[28px] sm:shadow-2xl sm:ring-1 sm:ring-black/10">
        {children}
      </div>
    </div>
  );
}
