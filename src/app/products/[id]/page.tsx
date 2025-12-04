import { getProduct } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, ChevronRight, Truck, ShieldCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/app/_components/product-card';
import wooApi from '@/lib/woo';
import { getProducts } from '@/lib/data';


type Props = {
  params: { id: string };
};

// --- BANCO DE OPINIONES (Se eligen 3 al azar) --- 
const reviewsPool = [ 
    { user: "Marc P.", text: "Calidad brutal. Se nota que es material técnico del bueno.", stars: 5 }, 
    { user: "Elena S.", text: "El envío rapidísimo, en 24h lo tenía en casa para la ruta.", stars: 5 },
    { user: "Javier R.", text: "Talla perfecta y muy cómodos. Repetiré seguro.", stars: 4 }, 
    { user: "Ana M.", text: "Muy buena relación calidad-precio. Abrigan mucho.", stars: 5 }, 
    { user: "Carlos D.", text: "Todo perfecto, tal y como sale en la foto.", stars: 5 }, 
    { user: "Laura B.", text: "Tuve dudas con la talla y me ayudaron genial por WhatsApp.", stars: 5 }, 
    { user: "David G.", text: "Resistentes y ligeros. Justo lo que buscaba.", stars: 4 }, 
];

async function getSingleProduct(id: string): Promise<Product | null> {
    try {
        const { data } = await wooApi.get(`products/${id}`);
        if (!data) return null;

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            short_description: data.short_description,
            price: data.price,
            price_html: data.price_html,
            on_sale: data.on_sale,
            sale_price: data.sale_price,
            regular_price: data.regular_price,
            category: data.categories.length > 0 ? data.categories[0].name : 'Uncategorized',
            images: data.images,
            permalink: data.permalink,
            categories: data.categories,
            tags: data.tags,
            attributes: data.attributes,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function getRelatedProducts(product: Product) {
    if (!product.categories || product.categories.length === 0) return [];
    try {
        const { data } = await wooApi.get("products", {
            category: product.categories[0].id,
            per_page: 5, // fetch one more to exclude the current product
            exclude: [product.id]
        });
        return data.slice(0, 4);
    } catch (error) {
        console.error("Failed to fetch related products", error);
        return [];
    }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getSingleProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  const randomReviews = [...reviewsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  
  return (
    <>
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="md:sticky md:top-24 self-start">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            {product.images && product.images[0] ? (
            <Image
                src={image?.src || placeholderImage}
                alt={image?.alt || product.name}
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
                <p className="text-sm font-medium text-gray-900 mb-3 capitalize">
                  {attr.name}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {attr.options.map((option: string) => (
                    <button 
                      key={option}
                      className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2 mt-8">
                Añadir al Carrito
            </button>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <Truck className="text-orange-600" /> Envío Rápido 24/48h
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <ShieldCheck className="text-orange-600" /> Garantía de Calidad
                </div>
            </div>
            
            <div className="mt-8 space-y-2">
                <details className="group p-4 bg-gray-50 rounded-lg cursor-pointer">
                <summary className="font-bold flex justify-between list-none">Descripción del Producto <span className="group-open:rotate-180 transition">▼</span></summary>
                <div className="mt-4 text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: product.description || ''}} />
                </details>
            </div>
        </div>
      </div>
    </div>
    
    {/* --- SECCIÓN: OPINIONES --- */}
    <div className="bg-gray-50 py-16">
        <div className="container">
            <h2 className="text-2xl font-black text-center mb-10 flex items-center justify-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" /> OPINIONES DE CLIENTES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {randomReviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - review.stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-gray-300" />
                    ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-sm">"{review.text}"</p>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{review.user}</p>
                </div>
            ))}
            </div>
        </div>
    </div>

     {relatedProducts.length > 0 && (
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">COMPLETA TU LOOK</h2>
             <Button variant="link" asChild className="text-orange-500 hover:text-orange-500/80">
                <Link href={`/products?category=${product.categories[0]?.slug}`}>
                    Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>
     )}
    </>
  );
}
