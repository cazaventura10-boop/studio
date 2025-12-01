import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Truck, ShieldCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const image = placeholderImagesById[product.image];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="md:sticky md:top-24 self-start">
            <div className="relative aspect-square w-full">
            <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                priority
                className="object-cover rounded-lg shadow-lg"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            </div>
        </div>

        {/* Columna Derecha: Información del Producto */}
        <div className="flex flex-col">
            <div className="mb-4">
                <Badge variant="outline" className="text-sm">{product.category}</Badge>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mb-4 tracking-tight">{product.name}</h1>
            
            <p className="text-4xl font-bold text-orange-500 mb-6">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
            </p>
            
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
                       {product.description}
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
                            <li>Tejido: Resistente a la abrasión</li>
                            <li>Composición: 95% Poliéster, 5% Elastano</li>
                            <li>Propiedades: Transpirable, secado rápido</li>
                            <li>Peso: 350g (Talla M)</li>
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
                        <p>Envío estándar en 24/48 horas. Devoluciones gratuitas durante los primeros 30 días.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
      </div>
    </div>
  );
}
