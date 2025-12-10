import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignorar errores de TypeScript al construir
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignorar errores de ESLint al construir
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Permitir imágenes de cualquier sitio (para que no fallen las fotos)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
