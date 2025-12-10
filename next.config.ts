import type { NextConfig } from "next";

// @ts-ignore
const wooApi = new (require('@woocommerce/woocommerce-rest-api').default)({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
});


async function getCategorySlugs() {
  try {
    const { data } = await wooApi.get('products/categories', { per_page: 100, fields: 'slug' });
    if (Array.isArray(data)) {
      return data.map(cat => cat.slug);
    }
    return [];
  } catch (error) {
    console.error('Error fetching category slugs for rewrites:', error);
    return [];
  }
}


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
    const categorySlugs = await getCategorySlugs();
    const categoryRewrites = categorySlugs.map(slug => ({
      source: `/${slug}`,
      destination: `/products?category=${slug}`,
    }));
    
    return [
      ...categoryRewrites,
    ];
  },
};

export default nextConfig;
