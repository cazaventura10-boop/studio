import Link from 'next/link';
import Image from 'next/image';

// Función auxiliar para limpiar precios y convertirlos a número
const parsePrice = (price: any) => {
  if (!price) return 0;
  // Quita todo lo que no sea número, punto o coma
  const clean = String(price).replace(/[^0-9.,]/g, '').replace(',', '.');
  return parseFloat(clean) || 0;
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Extraemos los precios limpios
  const regularPrice = parsePrice(product.regular_price);
  const currentPrice = parsePrice(product.price);
  
  // 2. Calculamos si hay oferta real (si el precio actual es menor que el regular)
  const isOnSale = regularPrice > currentPrice;
  
  // 3. Calculamos el porcentaje de descuento
  const discountPercentage = isOnSale 
    ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100) 
    : 0;

  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      {/* --- IMAGEN --- */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0].src}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={placeholderImage}
            alt="Placeholder"
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* --- ETIQUETA DE OFERTA (Estilo IZAS) --- */}
        {isOnSale && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* --- INFO --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Categoría */}
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
          {product.categories && product.categories[0] ? product.categories[0].name : 'Producto'}
        </p>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* --- PRECIOS --- */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {isOnSale ? (
            <>
              {/* Precio Viejo Tachado */}
              <span className="text-xs text-gray-400 line-through decoration-gray-400">
                {product.regular_price}€
              </span>
              {/* Precio Nuevo Rojo */}
              <span className="text-lg font-black text-red-600">
                {product.price}€
              </span>
            </>
          ) : (
            /* Precio Normal Negro */
            <span className="text-lg font-black text-gray-900">
              {product.price}€
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
