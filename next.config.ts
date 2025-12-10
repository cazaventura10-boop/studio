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
  // Exponer variables de entorno al cliente
  env: {
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  }
};

export default nextConfig;
