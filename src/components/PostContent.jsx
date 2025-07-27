// src/components/PostContent.jsx
'use client';

import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import { MDXRemote } from 'next-mdx-remote';

export default function PostContent({ frontMatter, mdxSource }) {
  return (
    <section
      id={frontMatter.slug || frontMatter.title}
      className="relative h-screen flex flex-col justify-start bg-gray-800 text-white px-8"
    >
      {/* back arrow + title with extra top padding */}
      <div className="flex items-center pt-16">
        <Link href="/#blog" scroll={false}>
          <HiChevronLeft className="text-2xl text-gray-400 hover:text-gray-200" />
        </Link>
        <h1 className="flex-1 text-3xl font-bold text-center mb-4">
          {frontMatter.title}
        </h1>
      </div>

      {/* MDX content */}
      <article className="flex-1 overflow-auto prose prose-invert max-w-4xl mx-auto py-6">
        <p className="text-sm text-gray-400 mb-4">{frontMatter.date}</p>
        <MDXRemote {...mdxSource} />
      </article>
    </section>
  );
}
