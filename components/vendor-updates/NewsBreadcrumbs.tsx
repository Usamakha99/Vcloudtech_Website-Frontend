import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function NewsBreadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? (
                <span className="text-slate-300" aria-hidden>
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className={
                    isLast
                      ? "max-w-[min(100%,42rem)] truncate font-medium text-slate-700"
                      : "text-slate-500"
                  }
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-medium text-slate-600 transition hover:text-[#1B224B]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
