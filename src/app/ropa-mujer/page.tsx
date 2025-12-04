import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Pantalones Trekking',
    href: '/products?category=pantalones-mujer',
    imageUrl: 'https://images.unsplash.com/photo-1596701799732-c36399990267?q=80&w=800',
    imageHint: 'woman hiking pants'
  },
  {
    name: 'Chaquetas',
    href: '/products?category=chaquetas-mujer',
    imageUrl: 'https://images.unsplash.com/photo-1545652985-5edd3ebc9927?q=80&w=800',
    imageHint: 'woman hiking jacket'
  },
  {
    name: 'Botas y Zapatillas',
    href: '/products?category=calzado-mujer',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800',
    imageHint: 'woman hiking boots'
  },
  {
    name: 'Sudaderas y Polares',
    href: '/products?category=sudaderas-mujer',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
    imageHint: 'woman fashion hoodie'
  }
];

export default function RopaMujerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          ROPA DE MONTAÑA Y TREKKING MUJER
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group block">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={category.imageHint}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <h3 className="mt-4 text-center font-headline text-lg font-semibold text-foreground group-hover:text-accent">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
