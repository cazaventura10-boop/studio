
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import wooApi from '@/lib/woo';

// Almacenamiento en caché en memoria para los slugs de categorías
let categorySlugs: Set<string> | null = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

async function getCategorySlugs(): Promise<Set<string>> {
  const now = Date.now();
  if (categorySlugs && (now - lastFetchTimestamp < CACHE_DURATION)) {
    return categorySlugs;
  }

  try {
    const { data } = await wooApi.get('products/categories', { per_page: 100, fields: 'slug' });
    if (Array.isArray(data)) {
      categorySlugs = new Set(data.map(cat => cat.slug));
      lastFetchTimestamp = now;
      console.log('Fetched and cached category slugs:', Array.from(categorySlugs));
      return categorySlugs;
    }
    return new Set();
  } catch (error) {
    console.error('Error fetching category slugs:', error);
    // En caso de error, devolvemos los slugs cacheados si existen, aunque estén expirados
    return categorySlugs || new Set();
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Excluir rutas conocidas de la API, Next.js y archivos estáticos
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_next/') || 
      pathname.startsWith('/products') ||
      pathname.includes('.')) { // Evita archivos como .png, .jpg, etc.
    return NextResponse.next();
  }

  // Rutas a ignorar explícitamente
  const ignoredPaths = new Set(['/', '/blog', '/contacto', '/checkout', '/aviso-legal', '/privacidad', '/envios', '/ropa-hombre', '/ropa-mujer', '/categorias']);
  if (ignoredPaths.has(pathname)) {
      return NextResponse.next();
  }

  // Eliminar la barra inicial
  const slug = pathname.substring(1);

  // Si el slug está vacío, no hacemos nada
  if (!slug) {
      return NextResponse.next();
  }

  // Obtener los slugs de las categorías
  const slugs = await getCategorySlugs();

  if (slugs.has(slug)) {
    // Si la ruta coincide con un slug de categoría, la reescribimos
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = '/products';
    newUrl.searchParams.set('category', slug);
    console.log(`Rewriting ${pathname} to ${newUrl.pathname}${newUrl.search}`);
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

// Configuración para que el middleware se ejecute en todas las rutas excepto las de la API y _next
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
};
