// src/app/blog/[slug]/page.jsx
import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';


 import PostContent from '../../../components/PostContent';

export const generateStaticParams = async () => {
  const postsDir = path.join(process.cwd(), 'src/data/posts');
  const files    = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
};

export default async function PostPage({ params }) {
  const { slug }  = params;
  const filePath  = path.join(process.cwd(), 'src/data/posts', `${slug}.mdx`);
  const source    = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content } = matter(source);
  const mdxSource = await serialize(content, { scope: frontMatter });

 return <PostContent frontMatter={frontMatter} mdxSource={mdxSource} />;
}
