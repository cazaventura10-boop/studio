
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // 1. Usamos el HTML directo para los precios de abajo (ESTO FUNCIONA SEGURO)
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  
  // 2. Detectamos si hay oferta mirando si el HTML tiene la etiqueta <del> (tachado)
  // O si el producto tiene la propiedad on_sale activa
  const isOnSale = priceHtml.includes('<del') || product.on_sale;

  // 3. Intento de calcular porcentaje (solo visual, si falla no rompe nada)
  let badgeText = "OFERTA";
  try {
    // Limpiamos los precios para intentar calcular
    const regPrice = parseFloat(String(product.regular_price).replace(',', '.'));
    const salePrice = parseFloat(String(product.sale_price || product.price).replace(',', '.'));
    
    if (regPrice > salePrice && regPrice > 0) {
      const percent = Math.round(((regPrice - salePrice) / regPrice) * 100);
      if (percent > 0) badgeText = `-${percent}%`;
    }
  } catch (e) {
    // Si falla el cálculo, nos quedamos con "OFERTA"
  }

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* IMAGEN */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0].src}
            alt={product.name}
            fill
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">Sin Imagen</div>
        )}

        {/* ETIQUETA ROJA (Porcentaje o Oferta) */}
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            {badgeText}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
          {product.categories && product.categories[0] ? product.categories[0].name : 'Producto'}
        </p>

        <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* PRECIOS (ESTO NO SE TOCA, SIGUE USANDO EL TRUCO CSS QUE FUNCIONA) */}
        <div 
          className="
            mt-2 font-bold flex items-center gap-2 flex-wrap
            text-[0px] /* Oculta basura */
            [&_.screen-reader-text]:hidden
            [&>del]:text-sm [&>del]:text-gray-500 [&>del]:font-medium [&>del]:line-through
            [&>ins]:text-xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
            [&>.amount]:text-xl [&>.amount]:text-gray-900
          "
          dangerouslySetInnerHTML={{ __html: priceHtml }}
        />
      </div>
    </Link>
  );
}
