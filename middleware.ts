import { NextResponse, type NextRequest } from 'next/server';

// Forzar el runtime a 'nodejs' para que sea compatible con la librería de WooCommerce
export const runtime = 'nodejs';

let categorySlugs: string[] | null = null;
let lastFetched = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora en milisegundos

// Función para obtener y cachear los slugs de las categorías
async function getCategorySlugs() {
  const now = Date.now();
  if (categorySlugs && (now - lastFetched < CACHE_DURATION)) {
    return categorySlugs;
  }

  try {
    // La librería de WooCommerce requiere 'node-fetch' en este entorno
    const WooCommerceRestApi = (await import('@woocommerce/woocommerce-rest-api')).default;
    
    const api = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_URL!,
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      version: "wc/v3",
    });

    const { data } = await api.get('products/categories', { per_page: 100, fields: 'slug' });
    
    if (Array.isArray(data)) {
      categorySlugs = data.map(cat => cat.slug);
      lastFetched = now;
      return categorySlugs;
    }
    return [];
  } catch (error) {
    console.error('Error fetching category slugs in middleware:', error);
    return categorySlugs || [];
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Evitamos que el middleware se ejecute para rutas de la API, archivos estáticos, etc.
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const slugs = await getCategorySlugs();
  const requestedSlug = pathname.substring(1);

  if (slugs && slugs.includes(requestedSlug)) {
    const url = request.nextUrl.clone();
    url.pathname = '/products';
    url.searchParams.set('category', requestedSlug);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
