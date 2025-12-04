import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Truck, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/app/_components/product-card';
import wooApi, { getProductVariations } from '@/lib/woo';
import { AddToCartButton } from '@/app/_components/add-to-cart-button';

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

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

async function getProduct(id: string): Promise<Product | null> {
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

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const variations = await getProductVariations(params.id); // ¡DATOS DE STOCK REALES!

  const allProducts = await getProducts({ per_page: 100 });
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.categories[0]?.id === product.categories[0]?.id)
    .slice(0, 4);

  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  // Seleccionar 3 opiniones aleatorias
  const randomReviews = [...reviewsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
  const priceHtml = product.price_html || `<span class="amount">${product.price}€</span>`;
  
  // Función para comprobar si una opción (ej: "42") tiene stock
  const checkStock = (attributeName: string, optionName: string) => {
    // Si no hay variaciones, asumimos que hay stock (producto simple)
    if (!variations || variations.length === 0) {
        // Si el producto simple gestiona stock, lo comprobamos
        if (product.manage_stock) {
            return product.stock_quantity > 0;
        }
        return product.stock_status === 'instock';
    }

    // Buscamos la variación que coincida con esta opción
    const match = variations.find((v: any) => 
      v.attributes.some((a: any) => 
        a.name.toLowerCase() === attributeName.toLowerCase() && 
        a.option.toLowerCase() === optionName.toLowerCase()
      )
    );
    // Si encontramos la variación, miramos su stock
    if (match) {
      return match.stock_status === 'instock' && (match.manage_stock ? match.stock_quantity > 0 : true);
    }
    return false; // Si no existe la variación, no hay stock
  };

  return (
    <>
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="md:sticky md:top-24 self-start">
            <div className="relative aspect-square w-full">
            <Image
                src={image?.src || placeholderImage}
                alt={image?.alt || product.name}
                fill
                priority
                className="object-contain rounded-lg p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
             {product.on_sale && (
              <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-none text-base px-4 py-2">OFERTA</Badge>
            )}
            </div>
        </div>

        {/* Columna Derecha: Información del Producto */}
        <div className="flex flex-col">
            <div className="mb-4">
                <Badge variant="outline" className="text-sm">{product.category}</Badge>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mb-4 tracking-tight">{product.name}</h1>
            
            <div
                className="text-2xl mb-6 flex items-center gap-3 font-bold
                text-[0px] [&_.screen-reader-text]:hidden
                [&>del]:text-lg [&>del]:text-gray-400 [&>del]:line-through
                [&>ins]:text-4xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
                [&>.amount]:text-4xl [&>.amount]:font-black [&>.amount]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
            />
            
            <Separator className="my-6" />

            {/* SELECTOR DE TALLAS CON STOCK REAL */}
            {product.attributes && product.attributes.map((attr: any) => (
                (attr.variation) && (
                    <div key={attr.id} className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{attr.name}:</p>
                    <div className="flex flex-wrap gap-2">
                        {attr.options.map((option: string) => {
                        const inStock = checkStock(attr.name, option);
                        return (
                            <button 
                            key={option}
                            disabled={!inStock}
                            className={`px-4 py-3 border rounded-lg text-sm font-bold transition-all
                                ${inStock 
                                ? 'border-gray-300 text-gray-900 hover:border-orange-500 hover:text-orange-600 cursor-pointer focus:border-orange-500 focus:ring-2 focus:ring-orange-200' 
                                : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed line-through'
                                }`}
                            >
                            {option}
                            </button>
                        );
                        })}
                    </div>
                    </div>
                )
            ))}

            {/* Botón Añadir al Carrito */}
            <AddToCartButton product={product} />

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Truck className="text-orange-600" /> Envío Rápido 24/48h
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <ShieldCheck className="text-orange-600" /> Garantía de Calidad
                </div>
            </div>
            
            {/* Acordeones de Información */}
            <Accordion type="single" collapsible className="w-full mt-8" defaultValue="description">
                <AccordionItem value="description">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                           <Package className="h-5 w-5" /> Descripción
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm text-muted-foreground pt-2">
                        <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
      </div>
    </div>
    
    {/* --- NUEVA SECCIÓN: OPINIONES --- */}
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
                <Link href="/products?category=${product.categories[0]?.slug}">
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