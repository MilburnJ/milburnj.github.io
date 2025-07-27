// src/components/Blog.jsx
'use client';

import Link from 'next/link';
import ScrollIndicator from './ScrollIndicator';
import posts from '../data/blog.js';

export default function Blog() {
  return (
    <section
      id="blog"
      className="relative h-screen flex flex-col justify-between bg-gray-900 text-white px-8"
    >
      {/* Section title, moved down */}
      <h2 className="mt-24 text-3xl font-bold text-center">Blog</h2>

      {/* Posts list in a scrollable container */}
      <div className="flex-1 max-w-4xl mx-auto space-y-6 py-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:bg-gray-600 transition"
          >
            <article className="p-4">
              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
              <p className="text-xs text-gray-400 mb-3">{post.date}</p>
              <p
                className="text-gray-300 text-sm leading-relaxed"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {/* Scroll indicator at the bottom */}
      <div className="flex justify-center pb-8">
        <ScrollIndicator target="#contact" />
      </div>
    </section>
  );
}
