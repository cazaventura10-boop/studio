import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/app/_components/product-card';
import Link from 'next/link';

// force-dynamic para asegurar que se ejecuta en cada petición
export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : '';
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';

  // 1. Combinamos todos los posibles filtros en un solo término de búsqueda.
  const rawSearchTerm = [category, tag, searchQuery].filter(Boolean).join(' ');
  // 2. LIMPIEZA: Reemplazamos guiones por espacios para una búsqueda flexible.
  const searchTerm = rawSearchTerm.replace(/-/g, ' ');

  let products: Product[] = [];
  let pageTitle = "Nuestros Productos";
  let pageDescription = "Equipamiento de alta calidad para cada una de tus necesidades.";

  if (searchTerm) {
    pageTitle = `Búsqueda: "${searchTerm}"`;
    pageDescription = `Resultados para tu búsqueda de "${searchTerm}".`;
  }


  try {
    // 3. Usamos el término de búsqueda limpio para llamar a la API.
    products = await getProducts({ search: searchTerm });
  } catch (error) {
    console.error("Error cargando productos desde WooCommerce:", error);
    // products se queda como un array vacío y se mostrará el mensaje de error
  }

  return (
    <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">{pageTitle}</h1>
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
        <div className="text-center py-20 bg-secondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 font-headline">Vaya, no hemos encontrado productos aquí.</h2>
          <p className="text-muted-foreground">Prueba a buscar en otra categoría o vuelve al inicio.</p>
          <Link href="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition">
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}
