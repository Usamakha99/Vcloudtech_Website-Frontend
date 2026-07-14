import "./blog.css";

type Props = {
  children: React.ReactNode;
};

/** Blog routes — shared marketing shell background (same as other site pages). */
export default function BlogLayout({ children }: Props) {
  return <div className="blog-route">{children}</div>;
}
