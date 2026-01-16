import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactCompiler: true,
  devIndicators: false,
  reactStrictMode: false,  // Strict Mode 비활성화 (개발 중 깜빡임 테스트)
  
  // 외부 이미지 도메인 허용 + 캐싱 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // 이미지 캐싱 시간 (초) - 1주일
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default nextConfig;
