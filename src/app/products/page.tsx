
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/app/_components/product-card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : '';
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';

  let products: Product[] = [];
  let fallbackProducts: Product[] = [];
  let pageTitle = "Nuestros Productos";
  let pageDescription = "Equipamiento de alta calidad para cada una de tus necesidades.";
  
  const displayTerm = tag.replace(/-/g, ' ') || category.replace(/-/g, ' ') || searchQuery;

  try {
    const searchOptions: { tag?: string; search?: string } = {};

    if (tag) {
      searchOptions.tag = tag;
    } else if (category) {
      // Usamos la categoría como búsqueda de texto, es más flexible
      searchOptions.search = category.replace(/-/g, ' ');
    } else if (searchQuery) {
      searchOptions.search = searchQuery;
    }

    products = await getProducts(searchOptions);

    // PLAN B: Si no hay resultados, cargamos productos destacados
    if (products.length === 0 && displayTerm) {
      fallbackProducts = await getProducts({ per_page: 8 });
    }

  } catch (error) {
    console.error("Error cargando productos desde WooCommerce:", error);
    // En caso de error, también intentamos cargar productos de fallback
    try {
       fallbackProducts = await getProducts({ per_page: 8 });
    } catch (fallbackError) {
       console.error("Error cargando productos de fallback:", fallbackError);
    }
  }
  
  if (displayTerm) {
    pageTitle = `Resultados para: "${displayTerm}"`;
    pageDescription = `Encuentra el mejor equipamiento relacionado con "${displayTerm}".`;
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
        <div className="text-center py-12">
          <div className="bg-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-semibold font-headline">Vaya, no hemos encontrado productos para "{displayTerm}"</h2>
            <p className="mt-2 text-muted-foreground">Pero no te preocupes, aquí tienes algunos de nuestros productos más populares.</p>
            <Link href="/products" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition">
                Ver todos los productos
            </Link>
          </div>
          
          {fallbackProducts.length > 0 && (
            <>
              <h3 className="text-3xl font-bold font-headline mt-16 mb-8">Productos Destacados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {fallbackProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

    