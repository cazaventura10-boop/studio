import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/data';
import { ProductCard } from './_components/product-card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { placeholderImagesById } from '@/lib/placeholder-images';

export default async function Home() {
  const allProducts = await getProducts();
  const newArrivals = allProducts.slice(0, 5);

  const equipHombre = placeholderImagesById['equip-hombre'];
  const equipMujer = placeholderImagesById['equip-mujer'];
  const equipNinos = placeholderImagesById['equip-ninos'];
  const equipAccesorios = placeholderImagesById['equip-accesorios'];

  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <section 
        className="relative w-full h-[600px] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920')" }}
        >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          
          <div className="absolute top-8">
            <Button asChild size="lg" className="bg-orange-500 text-white font-bold hover:bg-orange-500/90 rounded-full px-8 py-4">
              <Link href="/ropa-hombre">VER PRUEBA MENÚ VISUAL HOMBRE</Link>
            </Button>
          </div>

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
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-center mb-12">Categorías Principales</h2>
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
              <img src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070' alt='Caza' className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
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
      
      {/* Featured Collection Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start text-left">
                    <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-2">
                        NUEVA COLECCIÓN 2025
                    </p>
                    <h2 className="text-5xl md:text-6xl font-extrabold font-headline mb-4">
                        Fusión de estilo y rendimiento en la montaña
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Descubre nuestra línea técnica diseñada para resistir desde las calles de la ciudad hasta las cimas más altas. Transpirabilidad, confort y durabilidad.
                    </p>
                    <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/80">
                        <Link href="#">Ver Colección Casual</Link>
                    </Button>
                </div>
                <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"
                        alt="Hombre con ropa técnica en la montaña"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Equipate para la Aventura Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-center mb-12">Equípate para la Aventura</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Link href="/products?tag=Hombre" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={equipHombre.imageUrl}
                  alt={equipHombre.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={equipHombre.imageHint}
                />
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">HOMBRE</h3>
            </Link>
            <Link href="/products?tag=Mujer" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={equipMujer.imageUrl}
                  alt={equipMujer.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={equipMujer.imageHint}
                />
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">MUJER</h3>
            </Link>
            <Link href="/products?tag=Ninos" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={equipNinos.imageUrl}
                  alt={equipNinos.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={equipNinos.imageHint}
                />
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">NIÑOS</h3>
            </Link>
            <Link href="/products?tag=Accesorios" className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={equipAccesorios.imageUrl}
                  alt={equipAccesorios.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={equipAccesorios.imageHint}
                />
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">ACCESORIOS</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-orange-500 w-full">
        <div className="container py-12 md:py-16 text-center text-white flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight">
                ⚡ OFERTAS FLASH DE SEMANA
            </h2>
            <p className="mt-2 text-xl md:text-2xl font-semibold">
                Hasta -40% en Calzado Técnico
            </p>
            <Button asChild variant="secondary" className="mt-6 bg-white text-orange-500 font-bold hover:bg-white/90">
                <Link href="/products?tag=Calzado">
                    Ver Ofertas
                </Link>
            </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline">Novedades de Temporada</h2>
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
    