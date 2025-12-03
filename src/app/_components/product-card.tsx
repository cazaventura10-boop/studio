
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // Lógica simple: Si los textos son distintos y existen, es una oferta
  const showSale = product.regular_price && product.price && product.regular_price !== product.price;

  return (
    <Link href={`/products/${product.id}`} className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* IMAGEN */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        {product.images && product.images[0] ? (
            <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
        ) : (
            <div className="flex h-full items-center justify-center text-gray-300">Sin Imagen</div>
        )}
        
        {/* Etiqueta Roja SIMPLE */}
        {showSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            OFERTA
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
          {product.categories && product.categories[0] ? product.categories[0].name : 'Producto'}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        {/* PRECIOS - SIN MATH.ROUND NI PARSEFLOAT */}
        <div className="flex items-center gap-3 mt-1">
          {showSale ? (
            <>
              {/* Precio Viejo Tachado */}
              <span className="text-sm text-gray-500 line-through font-medium">
                {product.regular_price} €
              </span>
              {/* Precio Nuevo Rojo */}
              <span className="text-xl font-black text-red-600">
                {product.price} €
              </span>
            </>
          ) : (
            /* Precio Normal Negro */
            <span className="text-xl font-black text-gray-900">
              {product.price} €
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
