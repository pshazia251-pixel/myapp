import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostSlugs, getPostData, getSortedPostsData } from "@/lib/blog";
import { FaArrowLeft, FaCalendar, FaUser, FaFolder } from "react-icons/fa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8"
          >
            <FaArrowLeft /> Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
              <span className="bg-blue-100 text-primary font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <FaFolder className="text-xs" /> {post.category}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendar className="text-xs" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <FaUser className="text-xs" /> {post.author}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600">{post.excerpt}</p>
          </div>

          <div
            className="blog-content text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />

          {/* Navigation */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex justify-between">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="text-sm text-gray-500">Previous</span>
                  <p className="font-medium">{prevPost.title}</p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="text-right text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="text-sm text-gray-500">Next</span>
                  <p className="font-medium">{nextPost.title}</p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
