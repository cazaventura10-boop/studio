import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { ProductCard } from './_components/product-card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Home() {
  const newArrivals = products.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[600px] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920')" }}
        >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter uppercase">
            Tu Próxima Cima
          </h1>
          <p className="mt-2 text-4xl md:text-5xl font-extrabold font-headline tracking-tighter uppercase">
            Te Espera
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-orange-500 text-white font-bold hover:bg-orange-500/90 rounded-full px-10 py-6 text-lg border-2 border-orange-400">
              <Link href="/products">EXPLORAR NOVEDADES</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Categories */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Categorías Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta Trekking */}
            <Link href="/products?category=Trekking" className="group relative block h-80 w-full overflow-hidden rounded-lg">
                <Image
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"
                    alt="TREKKING"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint="trekking mountain"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="font-headline text-3xl font-extrabold uppercase tracking-wider">TREKKING</h3>
                    <div className="mt-4 h-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="secondary" className="bg-white/90 text-foreground hover:bg-white">
                        Ver Colección <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                </div>
            </Link>

            {/* Tarjeta Caza */}
            <Link href="/products?category=Caza" className="group relative block h-80 w-full overflow-hidden rounded-lg cursor-pointer">
              <div
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1484406566174-9da000c64787?q=80&w=2070)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                <h3 className="font-headline text-3xl font-extrabold uppercase tracking-wider">CAZA</h3>
                <div className="mt-4 h-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                   <Button variant="secondary" className="bg-white/90 text-foreground hover:bg-white">
                    Ver Colección <ChevronRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
              </div>
            </Link>

            {/* Tarjeta Kayak */}
            <Link href="/products?category=Kayaking" className="group relative block h-80 w-full overflow-hidden rounded-lg">
                <Image
                    src="https://images.unsplash.com/photo-1543039625-14cbd3802e7d?q=80&w=2074"
                    alt="KAYAK"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint="kayak river"
                />
                 <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="font-headline text-3xl font-extrabold uppercase tracking-wider">KAYAK</h3>
                    <div className="mt-4 h-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="secondary" className="bg-white/90 text-foreground hover:bg-white">
                        Ver Colección <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Novedades de Temporada</h2>
            <Button variant="link" asChild className="text-orange-500 hover:text-orange-500/80">
                <Link href="/products">
                    Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
