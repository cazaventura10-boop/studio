import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/app/_components/product-card';
import wooApi from '@/lib/woo';
import { ProductDetailsClient } from './_components/product-details-client';


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
  try {
    const { data: products } = await wooApi.get("products", { per_page: 100 });
    return products.map((product: any) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error("Failed to generate static params for products", error);
    return [];
  }
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
            manage_stock: data.manage_stock,
            stock_quantity: data.stock_quantity,
            stock_status: data.stock_status,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getProductVariations(productId: number | string) {
  try {
    const { data } = await wooApi.get(`products/${productId}/variations`, {
      per_page: 100,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching variations:', error.message);
    } else {
        console.error('An unknown error occurred while fetching variations.');
    }
    return [];
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
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const variations = await getProductVariations(params.id);
  const relatedProducts = await getRelatedProducts(product);

  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  const randomReviews = [...reviewsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
  
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
             {/* Acordeones de Información (Solo en móvil) */}
             <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full mt-8" defaultValue="description">
                  <AccordionItem value="description">
                      <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center gap-2">
                            Descripción
                          </div>
                      </AccordionTrigger>
                      <AccordionContent className="prose prose-sm text-muted-foreground pt-2">
                          <div dangerouslySetInnerHTML={{ __html: product.description || product.short_description || '' }} />
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
            </div>
        </div>

        {/* Columna Derecha: Información del Producto */}
        <ProductDetailsClient product={product} variations={variations} />
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
