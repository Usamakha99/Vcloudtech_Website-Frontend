import "./blog.css";

type Props = {
  children: React.ReactNode;
};

/** Full-viewport blog theme via shell background — see blog.css `:has(.blog-route)`. */
export default function BlogLayout({ children }: Props) {
  return <div className="blog-route">{children}</div>;
}
