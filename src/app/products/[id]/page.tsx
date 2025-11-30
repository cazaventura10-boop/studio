import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AISummarizer } from '@/app/_components/ai-summarizer';

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

  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square">
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-cover rounded-lg"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
          <div className="prose max-w-none text-muted-foreground mb-6">
            <p>{product.description}</p>
          </div>
          <div className="mt-auto flex flex-col sm:flex-row gap-4">
             <Button size="lg" className="w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
             </Button>
             <AISummarizer contentToSummarize={product.description} buttonText="Summarize Description" />
          </div>
        </div>
      </div>
    </div>
  );
}
