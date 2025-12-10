import { NextResponse, type NextRequest } from 'next/server';
import wooApi from '@/lib/woo';

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
    // Definimos la API aquí porque las variables de entorno solo están disponibles en el server
    const api = new (require('@woocommerce/woocommerce-rest-api').default)({
      url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
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
    // En caso de error, devolvemos la caché antigua si existe, si no, un array vacío.
    return categorySlugs || [];
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Evitamos que el middleware se ejecute para rutas de la API, archivos estáticos, etc.
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Obtenemos los slugs de las categorías (usará la caché si es posible)
  const slugs = await getCategorySlugs();

  // Quitamos la barra inicial del pathname para comparar con los slugs
  const requestedSlug = pathname.substring(1);

  // Si el slug solicitado está en nuestra lista de categorías...
  if (slugs && slugs.includes(requestedSlug)) {
    // ...reescribimos la URL a la página de productos con el parámetro de categoría.
    const url = request.nextUrl.clone();
    url.pathname = '/products';
    url.searchParams.set('category', requestedSlug);
    return NextResponse.rewrite(url);
  }

  // Para cualquier otra ruta, continuamos sin hacer nada.
  return NextResponse.next();
}
