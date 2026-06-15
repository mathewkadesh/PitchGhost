import { marked } from "marked";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogPost } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  const html = useMemo(() => {
    if (!post) return "";
    return marked.parse(post.content, { async: false }) as string;
  }, [post]);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="meta-label text-warn">Not found</p>
        <h1 className="mt-3 font-display text-3xl text-ink">This briefing doesn't exist</h1>
        <Link
          to="/blog"
          className="meta-label mt-6 inline-block text-gold underline decoration-line hover:decoration-gold"
        >
          ← Back to briefings
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="meta-label flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
        <span className="text-gold">{post.tag}</span>
        <span aria-hidden="true">·</span>
        <span>{post.date}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
      </div>
      <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{post.title}</h1>
      <div className="prose-ghost mt-8" dangerouslySetInnerHTML={{ __html: html }} />
      <Link
        to="/blog"
        className="meta-label mt-10 inline-block text-gold underline decoration-line hover:decoration-gold"
      >
        ← Back to briefings
      </Link>
    </article>
  );
}
