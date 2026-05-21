import Link from "next/link";

type Props = {
  todayLabel: string;
  todayIso: string;
};

export function NewsPaperMasthead({ todayLabel, todayIso }: Props) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <time
          dateTime={todayIso}
          className="shrink-0 text-[13px] font-medium tabular-nums text-neutral-800"
        >
          {todayLabel}
        </time>

        <p className="hidden min-w-0 flex-1 text-center text-[13px] font-semibold tracking-wide text-neutral-950 sm:block">
          Vendor intelligence
        </p>

        <Link
          href="/"
          className="shrink-0 text-[13px] font-semibold text-sky-600 hover:text-sky-800"
        >
          vCloudTech.com
        </Link>
      </div>
    </header>
  );
}
