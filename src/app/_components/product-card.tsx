import Link from 'next/link';
import Image from 'next/image';

// --- FUNCIÓN LIMPIADORA DE PRECIOS ---
// Convierte "1.200,50€" -> 1200.50 (Número real)
const parsePrice = (price: any) => {
  if (!price) return 0;
  // 1. Convertir a texto
  let clean = String(price);
  // 2. Reemplazar la coma decimal por punto (clave para español)
  clean = clean.replace(',', '.');
  // 3. Eliminar todo lo que no sea número o punto
  clean = clean.replace(/[^0-9.]/g, '');

  return parseFloat(clean) || 0;
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Usamos el HTML directo para mostrar los precios abajo (Visualización segura)
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;

  // 2. Cálculos matemáticos para la ETIQUETA DE ARRIBA
  const regularNum = parsePrice(product.regular_price);
  const saleNum = parsePrice(product.sale_price || product.price);

  // Comprobamos si hay oferta real (precio viejo > precio nuevo)
  const isSaleMath = regularNum > saleNum && regularNum > 0;

  // Calculamos porcentaje
  let discountPercent = 0;
  if (isSaleMath) {
    discountPercent = Math.round(((regularNum - saleNum) / regularNum) * 100);
  }

  // Lógica de visualización de la etiqueta
  const showBadge = isSaleMath || product.on_sale;
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
        {showBadge && (
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
        {/* PRECIOS (Visualización HTML directa) */}
        <div
          className="
            mt-1 font-bold flex items-center gap-2 flex-wrap
            text-[0px] /* Oculta textos basura */
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