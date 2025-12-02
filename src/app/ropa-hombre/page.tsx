import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Pantalones Trekking',
    href: '/products?category=pantalones-hombre',
    imageUrl: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-2-2.jpg',
    imageHint: 'technical pants'
  },
  {
    name: 'Chaquetas y Cortavientos',
    href: '/products?category=chaquetas-hombre',
    imageUrl: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-copia-10.jpg',
    imageHint: 'mountaineer jacket'
  },
  {
    name: 'Botas y Zapatillas',
    href: '/products?category=calzado-hombre',
    imageUrl: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/IKKI-ATLANTIC-6.webp',
    imageHint: 'dirty hiking boots'
  },
  {
    name: 'Sudaderas y Polares',
    href: '/products?category=sudaderas-hombre',
    imageUrl: 'https://www.deporteyaventura.es/wp-content/uploads/2022/11/imj05218_000577_3.webp',
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
