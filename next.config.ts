import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.REPOSITORY_NAME || 'react-products';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubPages ? `/${repositoryName}` : '',
  assetPrefix: isGithubPages ? `/${repositoryName}` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
