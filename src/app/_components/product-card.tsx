import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = placeholderImagesById[product.image];
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-white rounded-lg">
        <div className="relative aspect-square w-full bg-white overflow-hidden">
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow justify-between">
            <div>
                {product.category && <Badge variant="secondary" className="mb-2">{product.category}</Badge>}
                <h3 className="font-headline font-semibold text-lg">{product.name}</h3>
            </div>
          <p className="mt-4 text-xl font-bold text-orange-500">
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
