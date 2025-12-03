
import Link from 'next/link';

// Función "Trituradora": Limpia el precio y lo convierte a número real
const parsePrice = (price: any) => {
  if (!price) return 0;
  // 1. Convertimos a texto
  let clean = String(price);
  // 2. Si tiene coma decimal, la cambiamos por punto (150,50 -> 150.50)
  clean = clean.replace(',', '.');
  // 3. Quitamos cualquier cosa que no sea número o punto
  clean = clean.replace(/[^0-9.]/g, '');
  
  return parseFloat(clean) || 0;
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Obtenemos los números limpios
  const regularPrice = parsePrice(product.regular_price);
  const currentPrice = parsePrice(product.price);
  
  // 2. ¿Es una oferta real? (Si el precio antiguo es mayor que el actual)
  const isOnSale = regularPrice > currentPrice;
  
  // 3. Calculamos el porcentaje
  const discountPercentage = isOnSale 
    ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100) 
    : 0;

  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* --- IMAGEN --- */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0].src}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">Sin Imagen</div>
        )}

        {/* --- ETIQUETA DE OFERTA (ROJA) --- */}
        {isOnSale && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* --- INFO --- */}
      <div className="p-4">
        {/* Categoría */}
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
          {product.categories && product.categories[0] ? product.categories[0].name : 'Producto'}
        </p>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* --- PRECIOS (La parte crítica) --- */}
        <div className="flex items-center gap-2 mt-1">
          {isOnSale ? (
            <>
              {/* Precio Viejo (Gris oscuro y tachado) */}
              <span className="text-sm text-gray-500 line-through font-medium">
                {product.regular_price} €
              </span>
              {/* Precio Nuevo (Rojo) */}
              <span className="text-lg font-black text-red-600">
                {product.price} €
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
    </Link>
  );
}
