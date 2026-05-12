const steps = [
  {
    n: "1",
    title: "Tell us your needs",
    description: "Scope, timelines, compliance, and stakeholders—we align on outcomes first.",
    colStart: "lg:col-start-1",
  },
  {
    n: "2",
    title: "Design & source",
    description: "Architecture, licensing, and procurement paths with transparent options.",
    colStart: "lg:col-start-3",
  },
  {
    n: "3",
    title: "Deliver with confidence",
    description: "Implementation, migration, and ongoing support with clear governance.",
    colStart: "lg:col-start-5",
  },
] as const;

const connectorCol = ["lg:col-start-2", "lg:col-start-4"] as const;

/**
 * Process strip — reference-style: eyebrow + main title + intro, then three steps in
 * one row on large screens with horizontal rules between numbered badges; stacked on mobile.
 */
export function HomeHowWeWorkSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-slate-100 py-16 sm:py-20 lg:py-24"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Our process</p>
          <h2
            id="how-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[#1B224B] sm:text-3xl"
          >
            How we work
          </h2>
          <p className="mt-4 text-slate-600">
            A clear path from discovery to delivery—built for procurement, security, and uptime.
          </p>
        </div>

        <ol className="mt-12 grid list-none grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1fr_minmax(1.5rem,2.25rem)_1fr_minmax(1.5rem,2.25rem)_1fr] lg:items-start lg:gap-x-0 lg:gap-y-0">
          {steps.flatMap((step, index) => {
            const stepEl = (
              <li
                key={step.n}
                className={`col-span-full flex flex-col items-center text-center lg:col-span-1 lg:row-start-1 ${step.colStart}`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-sky-600 bg-white text-lg font-bold tabular-nums text-[#1B224B] shadow-sm ring-4 ring-sky-50 sm:h-16 sm:w-16 sm:text-xl sm:ring-[6px]">
                  {step.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#1B224B] sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 lg:max-w-none">
                  {step.description}
                </p>
              </li>
            );

            if (index >= steps.length - 1) {
              return [stepEl];
            }

            const lineEl = (
              <li
                key={`connector-${step.n}`}
                className={`col-span-full flex justify-center py-1 lg:col-span-1 lg:row-start-1 lg:flex-col lg:justify-start lg:px-1 lg:pt-7 ${connectorCol[index]!}`}
                aria-hidden
              >
                <div className="h-8 w-px bg-slate-300 lg:hidden" />
                <div className="hidden h-px w-full min-w-[1.25rem] bg-slate-300 lg:block" />
              </li>
            );

            return [stepEl, lineEl];
          })}
        </ol>
      </div>
    </section>
  );
}
