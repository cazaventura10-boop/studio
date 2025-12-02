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
  // 1. Recibimos lo que manda el menú (ej: "Pantalones-Invierno-Hombre")
  // Damos prioridad a `tag` por ser más específico, luego `category` y finalmente `q` de la barra de búsqueda.
  const rawTerm = searchParams.tag || searchParams.category || searchParams.q || '';

  // 2. TRADUCTOR: Quitamos guiones y limpiamos el texto para la búsqueda
  // Esto convierte "pantalones-invierno-hombre" en "pantalones invierno hombre"
  const searchTerm = String(rawTerm).replace(/-/g, ' ');

  let products: Product[] = [];
  let pageTitle = "Nuestros Productos";
  let pageDescription = "Equipamiento de alta calidad para cada una de tus necesidades.";

  try {
    if (searchTerm) {
      // 3. Le decimos a WooCommerce: "Busca productos que tengan estas palabras"
      products = await getProducts({ search: searchTerm });
      pageTitle = `Resultados para: "${searchTerm}"`;
      pageDescription = `Encuentra el mejor equipamiento relacionado con "${searchTerm}".`
    } else {
      // Si no hay término de búsqueda, obtenemos todos los productos.
      products = await getProducts({});
    }
  } catch (error) {
    console.error("Error buscando productos:", error);
    // Dejamos el array de productos vacío para que se muestre el mensaje de error.
  }

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
                Intenta buscar algo más general como &quot;Pantalones&quot; o &quot;Hombre&quot;.
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
