import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Comprueba si la ruta contiene la estructura de URL de WordPress
  if (path.startsWith('/categoria-producto/')) {
    // Divide la ruta en segmentos
    const segments = path.split('/').filter(Boolean);
    
    // Obtiene el último segmento, que debería ser el slug de la categoría
    const categorySlug = segments[segments.length - 1];

    if (categorySlug) {
      // Convierte el slug a minúsculas
      const lowerCaseSlug = categorySlug.toLowerCase();
      
      // Reconstruye la URL para que apunte a nuestra página de categoría dinámica
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/${lowerCaseSlug}`;
      
      // Reescribe a la nueva URL internamente
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/categoria-producto/:path*',
};
