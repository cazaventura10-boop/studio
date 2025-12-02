import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/app/_components/product-card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1. Damos prioridad a los términos más específicos (tag, luego q, luego category)
  const rawTerm = searchParams.tag || searchParams.q || searchParams.category || '';

  // 2. Limpiamos el término para la búsqueda (ej: "Pantalones-Invierno" -> "Pantalones Invierno")
  const searchTerm = String(rawTerm).replace(/-/g, ' ');

  let products: Product[] = [];
  let finalSearchTerm = searchTerm;

  try {
    if (searchTerm) {
      // 3. Primer intento de búsqueda con el término original
      products = await getProducts({ search: searchTerm });

      // 4. LÓGICA DE REINTENTO: Si no hay resultados y el término es plural, intentamos en singular
      if (products.length === 0 && searchTerm.toLowerCase().endsWith('s') && searchTerm.length > 1) {
        const singularSearchTerm = searchTerm.slice(0, -1);
        finalSearchTerm = singularSearchTerm; // Actualizamos para el mensaje de "no encontrado"
        products = await getProducts({ search: singularSearchTerm });
      }
    } else {
      // Si no hay término de búsqueda, obtenemos todos los productos.
      products = await getProducts({});
    }
  } catch (error) {
    console.error("Error buscando productos:", error);
    // Dejamos el array de productos vacío para que se muestre el mensaje de error.
  }

  const pageTitle = searchTerm ? `Resultados para: "${searchTerm}"` : "Nuestros Productos";
  const pageDescription = searchTerm 
    ? `Encuentra el mejor equipamiento relacionado con "${searchTerm}".`
    : "Equipamiento de alta calidad para cada una de tus necesidades.";

  return (
    <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight capitalize">{pageTitle}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {pageDescription}
            </p>
        </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/50 rounded-xl">
            <h2 className="text-2xl font-semibold text-foreground">
                No hemos encontrado productos para &quot;{searchTerm}&quot;
            </h2>
            <p className="text-muted-foreground mt-2">
                Intenta buscar algo más general o utiliza el buscador principal.
            </p>
            <div className="mt-8">
                <Link href="/products" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    Ver todos los productos
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}
