export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tag: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const modules = import.meta.glob("./blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, content: raw.trim() };
  }

  const [, frontmatter, content] = match;
  const meta: Record<string, string> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, content: content.trim() };
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw);
    const fallbackSlug = path.split("/").pop()?.replace(/\.md$/, "") ?? path;

    return {
      slug: meta.slug ?? fallbackSlug,
      title: meta.title ?? "Untitled",
      date: meta.date ?? "",
      tag: meta.tag ?? "Briefing",
      readTime: meta.readTime ?? "",
      excerpt: meta.excerpt ?? "",
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
