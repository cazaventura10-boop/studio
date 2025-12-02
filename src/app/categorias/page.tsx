import wooApi from '@/lib/woo';
import Link from 'next/link';
import { List } from 'lucide-react';

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

async function getCategories(): Promise<ProductCategory[]> {
  try {
    // Pedimos hasta 100 categorías, las que no tengan productos no se muestran
    const { data } = await wooApi.get('products/categories', { per_page: 100, hide_empty: true });
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching categories:', error.message);
    } else {
        console.error('An unknown error occurred while fetching categories.');
    }
    return [];
  }
}

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Diagnóstico de Categorías</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Esta página muestra todas las categorías de productos disponibles en la API de WooCommerce y sus `slugs` correspondientes. Haz clic en una para probar el enlace.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="max-w-2xl mx-auto bg-card text-card-foreground border rounded-lg shadow-sm">
            <div className="p-6 border-b font-semibold flex items-center gap-2">
                <List className="h-5 w-5" />
                Categorías Encontradas ({categories.length})
            </div>
            <ul className="divide-y">
                {categories.map((category) => (
                <li key={category.id} className="p-4 transition-colors hover:bg-muted/50">
                    <Link href={`/products?category=${category.slug}`} className="group">
                    <p className="font-semibold text-primary group-hover:underline">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-mono bg-secondary px-2 py-1 rounded-md text-xs">
                         Slug: {category.slug}
                        </span>
                        <span className="ml-4 text-xs">({category.count} productos)</span>
                    </p>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold font-headline">No se encontraron categorías</h2>
          <p className="mt-2 text-muted-foreground">No se pudieron cargar las categorías desde WooCommerce. Revisa la conexión con la API.</p>
        </div>
      )}
    </div>
  );
}