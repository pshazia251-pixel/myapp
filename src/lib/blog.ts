import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  emoji?: string;
  content?: string;
  contentHtml?: string;
}

export function getSortedPostsData(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  const allPostsData: BlogPost[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || "Untitled",
      date: matterResult.data.date || "",
      excerpt: matterResult.data.excerpt || "",
      category: matterResult.data.category || "General",
      author: matterResult.data.author || "BillFreeUSA Team",
      emoji: matterResult.data.emoji || "📰",
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || "Untitled",
    date: matterResult.data.date || "",
    excerpt: matterResult.data.excerpt || "",
    category: matterResult.data.category || "General",
    author: matterResult.data.author || "BillFreeUSA Team",
    emoji: matterResult.data.emoji || "📰",
    content: matterResult.content,
    contentHtml,
  };
}
