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
  async rewrites() {
    return [
      {
        // Esta regla captura cualquier ruta de un solo nivel que no sea una página existente
        // y la reescribe a nuestra página comodín de categoría.
        // Ej: /pantalones-hombre -> /pantalones-hombre (y será manejada por app/[categorySlug]/page.tsx)
        source: '/:path((?!api/|products/|blog/|aviso-legal|privacidad|contacto|envios|ropa-hombre|ropa-mujer|categorias|_next/static|_next/image|favicon.ico).*)',
        destination: '/:path',
      },
    ];
  },
};

export default nextConfig;
