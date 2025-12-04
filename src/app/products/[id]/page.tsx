import { getProduct } from '@/lib/data';
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
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
       <Suspense fallback={<div className="min-h-screen" />}>
         <ProductDetails 
            product={product} 
            variations={variations}
         />
      </Suspense>
    </div>
  );
}
