type Props = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No articles found",
  description = "Try adjusting your search or browse categories to discover more insights.",
}: Props) {
  return (
    <div className="blog-empty" role="status">
      <p className="blog-empty__title">{title}</p>
      <p className="blog-empty__desc">{description}</p>
    </div>
  );
}
