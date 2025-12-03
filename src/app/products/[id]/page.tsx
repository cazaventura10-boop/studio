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
import Link from 'next/link';
import wooApi from '@/lib/woo';

type Props = {
  params: { id: string };
};

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
  
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.categories[0]?.name === product.categories[0]?.name).slice(0, 4);

  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
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
                className="object-cover rounded-lg shadow-lg"
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
            
             <div className="flex items-baseline gap-2 mt-4">
              {product.on_sale && product.sale_price ? (
                <>
                  <span className="text-gray-500 line-through text-lg">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(parseFloat(product.regular_price.replace(',', '.')))}
                  </span>
                  <span className="text-red-600 font-bold text-2xl">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(parseFloat(product.price.replace(',', '.')))}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-bold text-2xl">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(parseFloat(product.price.replace(',', '.')))}
                </span>
              )}
            </div>
            
            <Separator className="my-6" />

            {/* Selector de Tallas */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-3">Talla:</p>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button key={size} variant="outline" className="w-14 h-14 text-base font-bold">
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Botón Añadir al Carrito */}
            <Button size="lg" className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold mb-8">
                <ShoppingCart className="mr-3 h-6 w-6" />
                Añadir al Carrito
            </Button>
            
            {/* Acordeones de Información */}
            <Accordion type="single" collapsible className="w-full" defaultValue="description">
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
                <AccordionItem value="features">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="h-5 w-5" /> Características Técnicas
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm text-muted-foreground pt-2">
                        <ul>
                            <li><strong>Composición:</strong> 90% Nylon Ripstop, 10% Elastano.</li>
                            <li><strong>Tratamiento:</strong> DWR (Durable Water Repellency) sin PFC.</li>
                            <li><strong>Peso:</strong> 350g (Talla M).</li>
                            <li><strong>Bolsillos:</strong> 3 con cremallera YKK sellada (2 de mano, 1 en el muslo).</li>
                            <li><strong>Ajuste:</strong> Cintura elástica con cinturón integrado y bajos ajustables.</li>
                            <li><strong>Detalles:</strong> Rodillas preformadas y refuerzos en zonas clave.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                           <Truck className="h-5 w-5" /> Envíos y Devoluciones
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm text-muted-foreground pt-2">
                        <p>Envío 24/48h laborables. Gratis en pedidos superiores a 50€. Devoluciones gratuitas durante 30 días.</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="reviews">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                           <Star className="h-5 w-5" /> Opiniones
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2 text-muted-foreground">
                        <div>
                            <div className="flex gap-0.5 text-orange-400">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                            </div>
                            <p className="mt-2 text-sm italic">&quot;Perfectos para Pirineos. Muy cómodos y secan rápido. La talla M me va clavada.&quot;</p>
                            <p className="mt-1 text-xs font-bold">- Javi M.</p>
                        </div>
                        <Separator />
                         <div>
                            <div className="flex gap-0.5 text-orange-400">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4" />
                            </div>
                            <p className="mt-2 text-sm italic">&quot;Buena calidad-precio. Los he usado en tres salidas y aguantan bien los roces con la roca.&quot;</p>
                            <p className="mt-1 text-xs font-bold">- Ana G.</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
      </div>
    </div>
    
     {relatedProducts.length > 0 && (
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">COMPLETA TU LOOK</h2>
             <Button variant="link" asChild className="text-orange-500 hover:text-orange-500/80">
                <Link href="/products">
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
    