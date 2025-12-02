'use client';

import type { Product } from '@/lib/types';

export default function PriceDisplay({ product }: { product: Product }) {
  // Si no hay oferta, o los precios son iguales, solo el precio normal
  if (!product.on_sale || !product.sale_price || product.price === product.regular_price) {
    return <span className="text-lg font-bold text-gray-900">{product.price}€</span>;
  }

  // Si hay oferta, mostramos los dos precios
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400 line-through">
        {product.regular_price}€
      </span>
      <span className="text-lg font-bold text-red-600">
        {product.sale_price}€
      </span>
    </div>
  );
}
