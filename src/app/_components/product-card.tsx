import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // Usamos el HTML directo de WooCommerce para no fallar con los precios
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  const placeholderImage = 'https://placehold.co/600x600/f0f0f0/ccc?text=Sin+Imagen';

  // Intentamos detectar si hay oferta mirando si el HTML tiene la etiqueta <del> (tachado)
  const isOnSale = priceHtml.includes('<del') || product.on_sale;

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
        {/* Etiqueta OFERTA si detectamos que está rebajado */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-md">
            OFERTA
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

        {/* PRECIOS - CON FILTRO DE LIMPIEZA CSS */}
        <div 
          className="
            mt-auto font-bold flex items-baseline gap-2 flex-wrap
            /* TRUCO: Tamaño 0 para ocultar texto basura suelto */
            text-[0px] 
            /* Ocultar textos de accesibilidad repetidos */
            [&_.screen-reader-text]:hidden
            /* Restaurar tamaño y color del precio tachado (<del>) */
            [&>del]:text-sm [&>del]:text-gray-400 [&>del]:font-medium
            /* Restaurar tamaño y color del precio nuevo (<ins>) */
            [&>ins]:text-xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
            /* Asegurar que el precio normal se vea si no hay oferta */
            [&>.amount]:text-xl [&>.amount]:text-gray-900
          "
          dangerouslySetInnerHTML={{ __html: priceHtml }}
        />
      </div>
    </Link>
  );
}