import { getProduct, getProducts } from '@/lib/data';
import wooApi from '@/lib/woo';
import { notFound } from 'next/navigation';
import { ProductDetails } from './_components/product-details';
import type { Product, ProductVariation } from '@/lib/types';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function getProductVariations(productId: string | number): Promise<ProductVariation[]> {
  try {
    const { data } = await wooApi.get(`products/${productId}/variations`, { per_page: 100 });
    return data;
  } catch (error) {
    console.error("Error fetching variations:", error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product | null = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const variations: ProductVariation[] = await getProductVariations(params.id);

  // Lógica para obtener productos relacionados
  let relatedProducts: Product[] = [];
  const linkedProductIds = [...new Set([...product.upsell_ids, ...product.cross_sell_ids, ...product.related_ids])];

  if (linkedProductIds.length > 0) {
    // Si hay productos vinculados manualmente, los buscamos
    relatedProducts = await getProducts({ include: linkedProductIds });
  } else if (product.categories.length > 0) {
    // Fallback: si no hay vinculados, buscamos en la misma categoría
    const categoryId = product.categories[0].id;
    const categoryProducts = await getProducts({ category: categoryId, per_page: 5 });
    // Excluimos el producto actual de la lista de relacionados
    relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
  }
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
       <Suspense fallback={<div className="min-h-screen" />}>
         <ProductDetails 
            product={product} 
            variations={variations}
            relatedProducts={relatedProducts}
         />
      </Suspense>
    </div>
  );
}
