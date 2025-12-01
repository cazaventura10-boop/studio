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
  // CAMBIO CLAVE: Priorizamos tag, luego category, y finalmente la búsqueda general 'q'.
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : '';
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';

  let products: Product[] = [];
  let pageTitle = "Nuestros Productos";
  let pageDescription = "Equipamiento de alta calidad para cada una de tus necesidades.";
  let displayTerm = tag.replace(/-/g, ' ') || category.replace(/-/g, ' ') || searchQuery;

  try {
    // La lógica de la llamada a la API es ahora más inteligente.
    // Le pasamos los parámetros y dejamos que getProducts decida la mejor estrategia.
    products = await getProducts({ tag, category, search: searchQuery });
  } catch (error) {
    console.error("Error cargando productos desde WooCommerce:", error);
    // products se queda como un array vacío y se mostrará el mensaje de error
  }
  
  if (displayTerm) {
    pageTitle = `Búsqueda: "${displayTerm}"`;
    pageDescription = `Resultados para tu búsqueda de "${displayTerm}".`;
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
          <h2 className="text-2xl font-semibold mb-4 font-headline">Vaya, no hemos encontrado productos para "{displayTerm}"</h2>
          <p className="text-muted-foreground">Prueba a buscar en otra categoría o vuelve al inicio.</p>
          <Link href="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition">
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}
