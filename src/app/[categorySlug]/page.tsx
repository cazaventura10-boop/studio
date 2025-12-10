import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import ProductCard from '@/app/_components/product-card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CategorySlugPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = params.categorySlug;
  let products: Product[] = [];
  
  try {
    products = await getProducts({ category });
  } catch (error) {
    console.error("Error buscando productos por slug:", error);
  }

  // Limpiamos el slug para mostrarlo en el título
  const displayTerm = category.replace(/-/g, ' ');

  const pageTitle = `Resultados para: "${displayTerm}"`;
  const pageDescription = `Encuentra el mejor equipamiento relacionado con "${displayTerm}".`;

  return (
    <>
      <div className="h-24" /> {/* Spacer for transparent header */}
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
                  No hemos encontrado productos para &quot;{displayTerm}&quot;
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
    </>
  );
}