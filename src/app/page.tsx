import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/data';
import ProductCard from './_components/product-card';
import { ArrowRight, ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { placeholderImagesById } from '@/lib/placeholder-images';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const newProducts = await getProducts({ per_page: 12, orderby: 'date', order: 'desc' });

  return (
<main>
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

  {/* CATEGORÍAS */}
  <section className="py-20 container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Link href="/products?category=trekking" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"><img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Trekking" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">TREKKING</h3></div></Link>
      <Link href="/products?category=caza" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Caza" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">CAZA</h3></div></Link>
      <Link href="/products?category=kayak" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"><img src="https://images.unsplash.com/photo-1543039625-14cbd3802e7d?w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kayak" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">KAYAK</h3></div></Link>
    </div>
  </section>

  {/* --- SECCIÓN NOVEDADES (CARRUSEL HORIZONTAL) --- */}
  <section className="py-20 bg-gray-50 overflow-hidden">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold uppercase tracking-wide mb-12">Novedades de Temporada</h2>
      {/* Contenedor del Slider */}
      <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 hide-scrollbar">
        {newProducts.map((product: any) => (
          // Tarjeta con ancho fijo para que funcione el scroll
          <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* BANNER OFERTAS */}
  <section className="bg-orange-600 py-16 text-center text-white my-16 relative"><div className="container mx-auto px-4"><h2 className="text-4xl font-black mb-4 uppercase">Ofertas Flash de Semana</h2><p className="text-xl mb-8 opacity-90">Hasta -40% en Calzado Técnico</p><Link href="/products?category=calzado-hombre&on_sale=true" className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition inline-block">Ver Ofertas Calzado</Link></div></section>

  {/* RESEÑAS */}
  <section className="py-20 container mx-auto px-4 text-center mb-20">
    <h2 className="text-3xl font-black uppercase mb-12 flex items-center justify-center gap-2"><Star className="text-yellow-400 fill-yellow-400" /> Confianza Clientes</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div className="bg-white p-8 rounded-2xl border shadow-sm"><p className="italic mb-4">"Envío en 24h y calidad top. Repetiré."</p><p className="font-bold">- Carlos M.</p></div>
      <div className="bg-white p-8 rounded-2xl border shadow-sm"><p className="italic mb-4">"El mejor sitio para ropa de montaña."</p><p className="font-bold">- Laura G.</p></div>
      <div className="bg-white p-8 rounded-2xl border shadow-sm"><p className="italic mb-4">"Atención al cliente de 10."</p><p className="font-bold">- David R.</p></div>
    </div>
    <div className="flex flex-wrap justify-center gap-8 mt-16 text-gray-400">
      <div className="flex items-center gap-2"><Truck/> Envío Gratis +60€</div>
      <div className="flex items-center gap-2"><RefreshCw/> Devolución 30 días</div>
      <div className="flex items-center gap-2"><ShieldCheck/> Pago Seguro</div>
    </div>
  </section>
</main>
); }