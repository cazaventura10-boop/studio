'use client';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-3-7.jpg', alt: 'Ropa de hombre', href: '/ropa-hombre' },
  { src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80', alt: 'Camping under the stars', href: '/products?tag=accesorios-y-estancos' },
  { src: 'https://images.unsplash.com/photo-1504280509243-48c8b45f8b11?w=600&q=80', alt: 'Woman hiking in the mountains', href: '/ropa-mujer' },
  { src: 'https://images.unsplash.com/photo-1543039625-14cbd3802e7d?w=600&q=80', alt: 'Kayaking on a calm lake', href: '/products?category=kayak' },
  { src: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=600&q=80', alt: 'Path through a misty forest', href: '/blog' },
  { src: 'https://images.unsplash.com/photo-1533240332313-0dbdd3199049?w=600&q=80', alt: 'Snowy mountain peak at sunset', href: '/products' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/11/76a44fa8-2306-4fc3-88bd-99262c1d4512-1-3-1.png', alt: 'Hunting gear', href: '/products?category=caza'}
];

export default function InfiniteGallery() {
  return (
    <section className="py-20 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-black uppercase text-white">#TuAventuraEmpiezaAquí</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">Inspírate con nuestra comunidad y comparte tus mejores momentos.</p>
      </div>
      <div className="relative w-full flex gap-4 overflow-hidden group">
        {/* Bloque 1 de imágenes */}
        <div className="flex gap-4 animate-infinite-scroll min-w-full justify-around group-hover:[animation-play-state:paused]">
          {images.map((image, index) => (
            <Link href={image.href} key={index} className="relative w-64 h-80 rounded-xl overflow-hidden flex-shrink-0 group/item">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover transition-all duration-700 group-hover/item:scale-110 grayscale group-hover/item:grayscale-0"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold uppercase text-sm">Ver Colección</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Bloque 2 (Duplicado para el efecto infinito) */}
        <div className="flex gap-4 animate-infinite-scroll min-w-full justify-around group-hover:[animation-play-state:paused]" aria-hidden="true">
          {images.map((image, index) => (
            <Link href={image.href} key={`dup-${index}`} className="relative w-64 h-80 rounded-xl overflow-hidden flex-shrink-0 group/item">
              <Image 
                src={image.src} 
                alt={image.alt}
                fill 
                className="object-cover transition-all duration-700 group-hover/item:scale-110 grayscale group-hover/item:grayscale-0" 
                sizes="256px"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-bold uppercase text-sm">Ver Colección</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
