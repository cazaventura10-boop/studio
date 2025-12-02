import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PriceDisplay from './price-display';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];
  const placeholderImage = "https://placehold.co/600x600/eee/ccc?text=No+Image";

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white rounded-lg flex flex-col">
        <div className="relative aspect-square w-full bg-white overflow-hidden">
          <Image
            src={image?.src || placeholderImage}
            alt={image?.alt || product.name}
            fill
            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           {product.on_sale && (
             <Badge className="absolute top-2 left-2 bg-orange-500 text-white border-none">OFERTA</Badge>
           )}
        </div>
        <CardContent className="p-4 flex flex-col flex-grow justify-between">
            <div>
                {product.categories?.[0]?.name && <Badge variant="secondary" className="mb-2">{product.categories[0].name}</Badge>}
                <h3 className="font-headline font-semibold text-lg leading-tight">{product.name}</h3>
            </div>
            <div className="mt-2">
              <PriceDisplay product={product} />
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
