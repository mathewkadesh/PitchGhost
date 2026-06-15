import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="meta-label text-gold">Briefings</p>
      <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Field notes for founders</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Short, specific guides on what's actually happening on the other side of the table.
      </p>

      <div className="mt-10 space-y-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="scan-reveal border-b border-line pb-8">
            <div className="meta-label flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
              <span className="text-gold">{post.tag}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl text-ink">
              <Link to={`/blog/${post.slug}`} className="hover:text-gold">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-ink-soft">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="meta-label mt-3 inline-block text-gold underline decoration-line hover:decoration-gold"
            >
              Read briefing →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
