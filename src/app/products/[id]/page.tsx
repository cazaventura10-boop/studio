
import { getProduct } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { AddToCartButton } from '@/app/_components/add-to-cart-button';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="md:sticky md:top-24 self-start">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            {image ? (
            <Image
                src={image.src}
                alt={image.alt || product.name}
                fill
                priority
                className="object-contain rounded-lg p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            ) : (
                <div className="flex h-full items-center justify-center text-gray-300">Sin Imagen</div>
            )}
             {product.on_sale && (
              <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-none text-base px-4 py-2">OFERTA</Badge>
            )}
            </div>
        </div>

        {/* Columna Derecha: Información del Producto */}
        <div className="sticky top-24 h-fit">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {product.name}
            </h1>
            
            <div
                className="text-2xl mb-6 flex items-center gap-3 font-bold
                text-[0px] [&_.screen-reader-text]:hidden
                [&>del]:text-lg [&>del]:text-gray-400 [&>del]:line-through
                [&>ins]:text-4xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
                [&>.amount]:text-4xl [&>.amount]:font-black [&>.amount]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: priceHtml }}
            />
            
            <div className="prose text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: product.short_description || ''}} />
            
            {product.attributes && product.attributes.map((attr: any) => (
                <div key={attr.id} className="mb-6">
                <p className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">{attr.name}:</p>
                <div className="flex flex-wrap gap-2">
                    {attr.options.map((option: string) => (
                    <span key={option} className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white">
                        {option}
                    </span>
                    ))}
                </div>
                </div>
            ))}

            <AddToCartButton product={product} />

            <div className="mt-8 space-y-2">
                <details className="group p-4 bg-gray-50 rounded-lg cursor-pointer">
                <summary className="font-bold flex justify-between list-none">Descripción del Producto <span className="group-open:rotate-180 transition">▼</span></summary>
                <div className="mt-4 text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: product.description || ''}} />
                </details>
            </div>
        </div>
      </div>
    </div>
  );
}
