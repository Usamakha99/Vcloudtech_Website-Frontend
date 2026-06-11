import { dt } from "@/components/design-test/design-test-theme";
import {
  HandshakeIcon,
  HeadsetIcon,
  RocketIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

type Feature = {
  title: string;
  description: string;
  icon: SectionIcon;
};

const features: Feature[] = [
  {
    title: "Fast deployment",
    description: "Launch workloads in days, not months.",
    icon: RocketIcon,
  },
  {
    title: "Enterprise security",
    description: "Controls aligned to your compliance posture.",
    icon: ShieldIcon,
  },
  {
    title: "24/7 support",
    description: "Engineers on call when systems matter most.",
    icon: HeadsetIcon,
  },
  {
    title: "Partner access",
    description: "Direct routes to leading vendor programs.",
    icon: HandshakeIcon,
  },
];

/** 2×2 feature grid — icon + minimal copy. */
export function FeaturesGrid({ surface = "light" }: { surface?: "light" | "glass" }) {
  const glass = surface === "glass";

  return (
    <section
      id="features"
      className={`scroll-mt-24 ${dt.section} ${
        glass
          ? `border-t bg-transparent ${dt.sectionBorder}`
          : "border-t border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/50"
      }`}
      aria-labelledby="features-grid-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="features-grid-heading"
            className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
              glass ? "text-white" : "text-[#1B224B] dark:text-white"
            }`}
          >
            Features
          </h2>
          <p className={`mt-2 text-sm ${glass ? dt.glassSubtext : "text-slate-600 dark:text-slate-400"}`}>
            Four highlights in a compact 2×2 grid.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {features.map((item) => (
            <li
              key={item.title}
              className={`flex gap-4 rounded-2xl border p-5 transition sm:p-6 ${
                glass
                  ? dt.glassFeatureCard
                  : "border-slate-200/90 bg-white shadow-sm hover:border-sky-200/70 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-800/50"
              }`}
            >
              <div
                className={
                  glass
                    ? dt.iconBoxCard
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-900/80 [&_svg]:h-5 [&_svg]:w-5 sm:h-12 sm:w-12 sm:[&_svg]:h-[22px] sm:[&_svg]:w-[22px]"
                }
              >
                <item.icon />
              </div>
              <div className="min-w-0">
                <h3 className={`text-base font-semibold ${glass ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {item.title}
                </h3>
                <p className={`mt-1 text-sm ${glass ? dt.glassSubtext : "text-slate-600 dark:text-slate-400"}`}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

