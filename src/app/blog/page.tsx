import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert tips, guides, and strategies for saving money, reducing bills, and achieving financial freedom.",
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <>
      {/* Hero */}
      <section className="hero-pattern bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips, guides, and strategies to help you save money and achieve
            financial freedom.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blog posts yet. Check back soon for our latest articles!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <span className="text-5xl">{post.emoji || "📰"}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-blue-100 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-light transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
