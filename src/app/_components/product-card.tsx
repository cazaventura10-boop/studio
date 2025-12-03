import Link from 'next/link';
import Image from 'next/image';

// --- FUNCIÓN AUXILIAR SEGURA PARA EL PORCENTAJE ---
// Esta función intenta limpiar el precio (comas, puntos) para calcular el %.
// Si falla, no pasa nada, devuelve 0 y el resto de la tarjeta sigue funcionando.
const parsePriceSafe = (price: any) => {
  try {
    if (!price) return 0;
    // Reemplaza coma decimal por punto y quita caracteres no numéricos
    const clean = String(price).replace(',', '.').replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  } catch (e) {
    return 0;
  }
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Usamos el HTML directo para los precios de abajo (ESTO ES LO QUE YA FUNCIONA)
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  const isOnSaleHtml = priceHtml.includes('<del');

  // 2. Cálculo INDEPENDIENTE para la etiqueta de porcentaje
  const regNum = parsePriceSafe(product.regular_price);
  const saleNum = parsePriceSafe(product.sale_price || product.price);
  let discountPercent = 0;
  if (regNum > saleNum && regNum > 0) {
    discountPercent = Math.round(((regNum - saleNum) / regNum) * 100);
  }

  // Lógica de la etiqueta: Si hay porcentaje, lo usamos. Si no, miramos si el HTML dice que es oferta.
  const showBadge = discountPercent > 0 || isOnSaleHtml || product.on_sale;
  const badgeText = discountPercent > 0 ? `-${discountPercent}%` : 'OFERTA';
  const placeholderImage = 'https://placehold.co/600x600/f0f0f0/ccc?text=Sin+Imagen';

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* IMAGEN */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        <Image
          src={product.images?.[0]?.src || placeholderImage}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* ETIQUETA ROJA (Porcentaje u Oferta) */}
        {showBadge && (
          <div className="absolute top-2 left-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
            {badgeText}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-grow flex-col p-4">
        <div className="flex-grow">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.categories && product.categories[0]
              ? product.categories[0].name
              : 'Producto'}
          </p>
          <h3 className="mb-2 min-h-[2.5rem] text-sm font-bold leading-tight text-gray-900 line-clamp-2 transition-colors group-hover:text-orange-600">
            {product.name}
          </h3>
        </div>
        
        {/* PRECIOS (ESTO NO SE TOCA, SIGUE USANDO EL TRUCO CSS QUE FUNCIONA) */}
        <div
          className="
            mt-auto font-bold flex items-baseline gap-2 flex-wrap
            text-[0px] /* Oculta basura */
            [&_.screen-reader-text]:hidden
            [&>del]:text-sm [&>del]:text-gray-400 [&>del]:font-medium
            [&>ins]:text-xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
            [&>.amount]:text-xl [&>.amount]:text-gray-900
          "
          dangerouslySetInnerHTML={{ __html: priceHtml }}
        />
      </div>
    </Link>
  );
}