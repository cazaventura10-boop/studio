
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Función "Trituradora": Limpia el precio y lo convierte a número real
const parsePrice = (price: any): number => {
  if (!price) return 0;
  // 1. Convertimos a texto, reemplazamos coma por punto
  const cleanString = String(price).replace(',', '.');
  // 2. Quitamos cualquier cosa que no sea número o punto (para casos como "€1,200.50")
  const justNumbers = cleanString.replace(/[^0-9.]/g, '');
  // 3. Convertimos a número
  const value = parseFloat(justNumbers);
  return isNaN(value) ? 0 : value;
};

export default function ProductCard({ product }: { product: any }) {
  // 1. Obtenemos los números limpios
  const regularPrice = parsePrice(product.regular_price);
  const salePrice = parsePrice(product.sale_price);
  const currentPrice = parsePrice(product.price);
  
  // 2. ¿Es una oferta real? El precio de venta debe ser menor que el regular.
  const isOnSale = product.on_sale && salePrice > 0 && regularPrice > salePrice;
  
  // 3. Calculamos el porcentaje, asegurándonos de no dividir por cero
  const discountPercentage = isOnSale
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : 0;

  const placeholderImage = "https://placehold.co/600x600/f0f0f0/ccc?text=Sin+Imagen";

  return (
    <div className="group relative flex flex-col bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-muted/50">
          <Image
            src={product.images?.[0]?.src || placeholderImage}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* --- Etiquetas sobre la imagen --- */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-2">
            {isOnSale && discountPercentage > 0 && (
              <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <Tag className="h-3 w-3" />
                <span>{discountPercentage}% dto.</span>
              </div>
            )}
          </div>
          
           {/* --- Botón de Añadir al Carrito --- */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Button size="icon" className="rounded-full h-10 w-10 bg-foreground/80 text-background backdrop-blur-sm hover:bg-foreground">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Añadir al carrito</span>
             </Button>
          </div>

        </div>
      </Link>

      {/* --- INFO --- */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="block flex-grow">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* --- PRECIOS --- */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-foreground">
             {currentPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </span>
           {isOnSale && (
            <span className="text-sm text-muted-foreground line-through">
                {regularPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
