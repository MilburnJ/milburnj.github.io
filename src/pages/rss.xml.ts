import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import site from "@/data/site.json";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).filter((p) => !p.data.draft);
  return rss({
    title: `${site.name} — ${site.role}`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts
      .sort((a, b) => b.data.date.localeCompare(a.data.date))
      .map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: new Date(post.data.date),
        link: `/writing/${post.id}`,
      })),
  });
}
