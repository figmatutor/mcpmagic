import type { NextConfig } from "next";

// 사용할 도메인 (예: 'your-domain.com')
const DOMAIN = 'your-domain.com';
// 하위 경로가 있다면 설정 (예: '/figma-prompts'), 없으면 빈 문자열
const BASE_PATH = '';
// 프로토콜 (보통 'https')
const PROTOCOL = 'https';

const nextConfig: NextConfig = {
  // 도메인 설정
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  
  // 배포 설정
  output: 'standalone',
  
  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_SITE_URL: `${PROTOCOL}://${DOMAIN}${BASE_PATH}`,
  },
  
  images: {
    domains: [DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'figma.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // GitHub 이미지 호스팅
      },
      {
        protocol: 'https',
        hostname: '**', // 기타 HTTPS 이미지 (필요시 제한)
      },
    ],
  },
};

export default nextConfig;
