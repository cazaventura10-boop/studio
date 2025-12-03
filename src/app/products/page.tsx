import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import ProductCard from '@/app/_components/product-card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category as string | undefined;
  const tag = searchParams.tag as string | undefined;
  const search = searchParams.q as string | undefined;
  const onSale = searchParams.on_sale === 'true';

  // Limpiamos los slugs para mostrarlos en el título si es necesario
  const displayTerm = category?.replace(/-/g, ' ') || tag?.replace(/-/g, ' ') || search;

  let products: Product[] = [];

  try {
    // La función getProducts ahora prioriza category, luego tag, y finalmente search.
    products = await getProducts({ category, tag, search, on_sale: onSale });
  } catch (error) {
    console.error("Error buscando productos:", error);
    // Dejamos el array de productos vacío para que se muestre el mensaje de error.
  }

  const pageTitle = onSale ? "Productos en Oferta" : (displayTerm ? `Resultados para: "${displayTerm}"` : "Nuestros Productos");
  const pageDescription = onSale
    ? "Aprovecha nuestros descuentos especiales por tiempo limitado."
    : (displayTerm
        ? `Encuentra el mejor equipamiento relacionado con "${displayTerm}".`
        : "Equipamiento de alta calidad para cada una de tus necesidades.");

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
                  No hemos encontrado productos para &quot;{displayTerm || "la oferta actual"}&quot;
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
