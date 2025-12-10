import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Comprueba si la ruta contiene la estructura de URL de WordPress
  if (path.startsWith('/categoria-producto/')) {
    // Divide la ruta en segmentos, eliminando los vacíos
    const segments = path.split('/').filter(Boolean);
    
    // Obtiene el último segmento, que debería ser el slug de la categoría
    const categorySlug = segments[segments.length - 1];

    if (categorySlug) {
      // Convierte el slug a minúsculas, que es como lo espera la nueva página
      const lowerCaseSlug = categorySlug.toLowerCase();
      
      // Reconstruye la URL para que apunte a nuestra página de categoría dinámica
      // Por ejemplo: /categoria-producto/.../PANTALONES-HOMBRE -> /pantalones-hombre
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/${lowerCaseSlug}`;
      
      // Reescribe a la nueva URL internamente. El usuario sigue viendo la URL original.
      return NextResponse.rewrite(newUrl);
    }
  }

  // Para cualquier otra ruta, no hacemos nada
  return NextResponse.next();
}

export const config = {
  // El middleware se ejecutará solo para las rutas que coincidan con este patrón
  matcher: '/categoria-producto/:path*',
};
