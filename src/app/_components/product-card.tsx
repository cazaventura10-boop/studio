import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = placeholderImagesById[product.image];
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3 className="font-headline font-semibold text-lg">{product.name}</h3>
            </div>
          <p className="mt-4 text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
