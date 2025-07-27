// pages/blog/[slug].js
import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import PostContent   from '../../components/PostContent'

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'src/data/posts')
  const files    = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
  return {
    paths: files.map((f) => ({ params: { slug: f.replace(/\.mdx$/, '') } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'src/data/posts', `${slug}.mdx`)
  const source   = fs.readFileSync(filePath, 'utf8')
  const { data: frontMatter, content } = matter(source)
  const mdxSource = await serialize(content, { scope: frontMatter })
  return { props: { frontMatter, mdxSource } }
}

export default function PostPage({ frontMatter, mdxSource }) {
  return <PostContent frontMatter={frontMatter} mdxSource={mdxSource} />
}
