import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Pantalones Trekking',
    href: '/products?search=pantalones%20hombre',
    imageUrl: 'https://images.unsplash.com/photo-1599409333945-f435a2d10a7a?q=80&w=1974&auto=format&fit=crop',
    imageHint: 'technical pants'
  },
  {
    name: 'Chaquetas y Cortavientos',
    href: '/products?search=chaquetas%20hombre',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'mountaineer jacket'
  },
  {
    name: 'Botas y Zapatillas',
    href: '/products?search=botas%20hombre',
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b175b?q=80&w=1974&auto=format&fit=crop',
    imageHint: 'dirty hiking boots'
  },
  {
    name: 'Sudaderas y Polares',
    href: '/products?search=sudaderas%20hombre',
    imageUrl: 'https://images.unsplash.com/photo-1616151375837-a90c6574f0d4?q=80&w=1964&auto=format&fit=crop',
    imageHint: 'lifestyle hoodie'
  }
];

export default function RopaHombrePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          ROPA DE MONTAÑA Y TREKKING HOMBRE
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group block">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={category.imageHint}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="mt-4 text-center font-headline text-lg font-semibold text-foreground">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
