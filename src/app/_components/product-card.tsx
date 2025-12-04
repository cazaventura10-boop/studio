import Link from 'next/link';
import Image from 'next/image';

// Función robusta para limpiar precios
const parsePriceSafe = (price: any) => {
  try {
    if (!price) return 0;
    const clean = String(price).replace(',', '.').replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  } catch (e) {
    return 0;
  }
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Precios HTML directos (para no fallar visualmente abajo)
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  const isOnSale = priceHtml.includes('<del>') || product.on_sale;

  // 2. Cálculo del porcentaje para la etiqueta
  const regNum = parsePriceSafe(product.regular_price);
  const saleNum = parsePriceSafe(product.sale_price || product.price);
  let discountPercent = 0;

  if (regNum > saleNum && regNum > 0) {
    discountPercent = Math.round(((regNum - saleNum) / regNum) * 100);
  }

  // Texto de la etiqueta
  const badgeText = discountPercent > 0 ? `-${discountPercent}%` : 'OFERTA';

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
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

        {/* ETIQUETA ROJA */}
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            {badgeText}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
          {product.categories && product.categories[0] ? product.categories[0].name : 'Producto'}
        </p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        {/* PRECIOS (Visualización segura HTML) */}
        <div 
          className="
            mt-1 font-bold flex items-center gap-2 flex-wrap
            text-[0px]
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