import Link from "next/link";

type Props = {
  topics: string[];
};

export function TagList({ topics }: Props) {
  return (
    <section className="blog-trending" aria-labelledby="blog-trending-heading">
      <div className="blog-container">
        <div className="blog-section-head blog-section-head--compact">
          <p className="blog-eyebrow">Trending</p>
          <h2 id="blog-trending-heading" className="blog-section-title">
            Trending topics
          </h2>
        </div>

        <ul className="blog-trending__list" role="list">
          {topics.map((topic) => (
            <li key={topic}>
              <Link
                href={`/blog?query=${encodeURIComponent(topic)}#latest-articles`}
                className="blog-trending__pill"
              >
                {topic}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
