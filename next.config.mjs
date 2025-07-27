/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo   = 'YOUR_REPO_NAME'; // ← change this to your GitHub repo

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,               // ensures folder/index.html structure
  images: { unoptimized: true },     // if you use next/image
};

export default nextConfig;
