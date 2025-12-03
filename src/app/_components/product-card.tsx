import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // Lógica simplificada: Si hay algo escrito en sale_price, es una oferta.
  // Nos da igual si es mayor o menor, confiamos en lo que viene de WooCommerce.
  const hasSalePrice =
    product.sale_price &&
    product.sale_price !== '' &&
    product.sale_price !== product.regular_price;

  const placeholderImage = 'https://placehold.co/600x600/f0f0f0/ccc?text=Sin+Imagen';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        {/* IMAGEN */}
        <div className="aspect-square relative overflow-hidden bg-gray-50">
          <Image
            src={product.images?.[0]?.src || placeholderImage}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Etiqueta Roja SI hay oferta */}
          {hasSalePrice && (
            <div className="absolute top-2 left-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
              OFERTA
            </div>
          )}
        </div>
      </Link>
      {/* INFO */}
      <div className="flex flex-grow flex-col p-4">
        <Link href={`/products/${product.id}`} className="block flex-grow">
            <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.categories && product.categories[0]
                ? product.categories[0].name
                : 'Producto'}
            </p>
            <h3 className="mb-2 min-h-[2.5rem] text-sm font-bold leading-tight text-gray-900 line-clamp-2 transition-colors group-hover:text-orange-600">
            {product.name}
            </h3>
        </Link>
        {/* PRECIOS */}
        <div className="mt-auto flex items-baseline gap-2">
          {hasSalePrice ? (
            <>
              {/* Precio Regular (Tachado en Gris Oscuro) */}
              <span className="text-sm font-medium text-gray-500 line-through">
                {product.regular_price} €
              </span>
              {/* Precio Rebajado (Rojo Grande) */}
              <span className="text-lg font-black text-red-600">
                {product.sale_price} €
              </span>
            </>
          ) : (
            /* Precio Normal (Negro) */
            <span className="text-lg font-black text-gray-900">
              {product.price} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
