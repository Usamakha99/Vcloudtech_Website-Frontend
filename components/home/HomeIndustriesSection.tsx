import Image from "next/image";
import Link from "next/link";

/** Local Gemini tiles under `public/industries/` — artwork includes icon + label. */
const industries = [
  { label: "K-12 School Districts", href: "/about", image: "/industries/k12.png" },
  { label: "Higher Education", href: "/about", image: "/industries/higher-education.png" },
  { label: "Government Agencies", href: "/about", image: "/industries/government.png" },
  { label: "Healthcare", href: "/about", image: "/industries/healthcare.png" },
  { label: "Financial Services", href: "/about", image: "/industries/financial.png" },
  { label: "Commercial Enterprise", href: "/about", image: "/industries/commercial.png" },
] as const;

export function HomeIndustriesSection() {
  return (
    <section
      className="border-t border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="industries-heading"
            className="text-2xl font-semibold tracking-tight text-[#1B224B] sm:text-3xl"
          >
            Industries we serve
          </h2>
          <p className="mt-4 text-slate-600">
            Deep experience across regulated and high-availability environments.
          </p>
        </div>

        <ul className="mt-12 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-4">
          {industries.map((ind) => (
            <li key={ind.label} className="min-h-0 min-w-0">
              <Link
                href={ind.href}
                aria-label={`${ind.label} — view solutions`}
                className="relative block aspect-square w-full min-w-0 bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Image
                  src={ind.image}
                  alt={ind.label}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
