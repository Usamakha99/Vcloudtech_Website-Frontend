export function LoadingSkeleton() {
  return (
    <div className="blog-skeleton" aria-hidden>
      <div className="blog-skeleton__hero" />
      <div className="blog-skeleton__grid">
        <div className="blog-skeleton__card" />
        <div className="blog-skeleton__card" />
        <div className="blog-skeleton__card" />
      </div>
    </div>
  );
}
