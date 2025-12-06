'use client';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-2-2.jpg', alt: 'Pantalones de Trekking', href: '/products?category=pantalones-hombre' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-copia-10.jpg', alt: 'Chaquetas y Cortavientos', href: '/products?category=chaquetas-hombre' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/IKKI-ATLANTIC-6.webp', alt: 'Botas y Zapatillas', href: '/products?category=calzado-hombre' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2022/11/imj05218_000577_3.webp', alt: 'Sudaderas y Polares', href: '/products?category=sudaderas-hombre' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/10/3-1.jpg', alt: 'Pantalones Trekking Mujer', href: '/products?category=pantalones-montana' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/11/unnamed-2-1.jpg', alt: 'Chaquetas Mujer', href: '/products?category=chaquetas' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/11/Captura-de-pantalla-2025-11-24-124444.png', alt: 'Botas y Zapatillas', href: '/products?category=calzado-de-mujer' },
  { src: 'https://www.deporteyaventura.es/wp-content/uploads/2025/11/Captura-de-pantalla-2025-11-13-163918.png', alt: 'Sudaderas y Polares', href: '/products?category=sudaderas-mujer' }
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
