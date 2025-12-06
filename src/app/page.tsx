import Link from 'next/link';
import { getProducts } from '@/lib/data';
import ProductCard from '@/app/_components/product-card';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import InfiniteGallery from './_components/infinite-gallery';
export const dynamic = 'force-dynamic';

export default async function Home() { 
  const newProducts = await getProducts({ per_page: 12, orderby: 'date', order: 'desc' });

return (
<main>
  {/* 1. HERO SECTION (Montaña) */}
  <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070)', backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="absolute inset-0 bg-black/40" /></div>
    <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase drop-shadow-lg">TU PRÓXIMA CIMA <br/>TE ESPERA</h1>
      <Link href="/products" className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-xl inline-block">EXPLORAR NOVEDADES</Link>
    </div>
  </section>
  {/* 2. EQUÍPATE (3 FOTOS VERTICALES) */}
  <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Equípate para la Aventura</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/ropa-hombre" className="block"><img src="https://www.deporteyaventura.es/wp-content/uploads/2025/10/unnamed-3-7.jpg" alt="Ropa de hombre" className="w-full aspect-[3/4] object-cover rounded-xl mb-2"/><p className="text-center font-bold">HOMBRE</p></Link>
            <Link href="/ropa-mujer" className="block"><img src="https://www.deporteyaventura.es/wp-content/uploads/2025/10/3.jpg" alt="Ropa de mujer" className="w-full aspect-[3/4] object-cover rounded-xl mb-2"/><p className="text-center font-bold">MUJER</p></Link>
            <Link href="/products?category=complementos-trekking" className="block"><img src="https://www.deporteyaventura.es/wp-content/uploads/2024/01/Travelbag-2-image-4.jpg" alt="Accesorios" className="w-full aspect-[3/4] object-cover rounded-xl mb-2"/><p className="text-center font-bold">COMPLEMENTOS</p></Link>
        </div>
      </div>
  </section>
  {/* 3. LIFESTYLE (FUSIÓN DE ESTILO) */}
  <section className="py-16 bg-white my-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <span className="text-orange-600 font-bold tracking-widest uppercase">ESTILO DE VIDA</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">FUSIÓN DE ESTILO <br />Y RENDIMIENTO.</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md">Descubre nuestra colección más versátil. Prendas diseñadas para acompañarte a tus escapadas por la naturaleza, sin sacrificar comodidad ni estilo.</p>
          <Link href="/products?category=newwood" className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all active:scale-95">
              Descubre Newwood Extreme
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
              </svg>
          </Link>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"><img src="https://www.deporteyaventura.es/wp-content/uploads/2024/11/unnamed-2-1.jpg" alt="Estilo de vida outdoor" className="absolute inset-0 w-full h-full object-cover" /></div>
      </div>
    </div>
  </section>
  {/* 4. NOVEDADES (GRID LIMPIO) */}
  <section className="py-20 container mx-auto px-4 overflow-hidden">
    <div className="flex justify-between items-end mb-12">
      <h2 className="text-4xl font-bold uppercase tracking-wide">Novedades de Temporada</h2>
      <Link href="/products" className="text-orange-600 font-bold hover:underline">Ver Todos →</Link>
    </div>
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 hide-scrollbar">
      {newProducts.map((product: any) => (
        <div key={product.id} className="snap-start flex-shrink-0 min-w-[280px] md:min-w-[calc(25%-1.5rem)]">
            <ProductCard product={product} />
        </div>
      ))}
    </div>
  </section>
  {/* 5. BANNER OFERTAS */}
  <section className="bg-orange-600 py-16 text-center text-white my-16 relative">
    <div className="container mx-auto px-4 relative z-10">
      <div className="inline-block mb-4 text-4xl">⚡</div>
      <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">OFERTAS FLASH DE SEMANA</h2>
      <p className="text-xl md:text-2xl mb-8 font-medium opacity-90">Hasta -40% en Calzado Técnico</p>
      <Link href="/products?category=calzado-hombre&on_sale=true" className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition inline-block">Ver Ofertas</Link>
    </div>
  </section>
  {/* 6. CATEGORÍAS PRINCIPALES */}
  <section className="py-20 container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wide">Categorías Principales</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Link href="/products?category=trekking" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Trekking" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">TREKKING</h3></div></Link>
      <Link href="/products?category=caza" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"><img src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/76a44fa8-2306-4fc3-88bd-99262c1d4512-1-3-1.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Caza" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">CAZA</h3></div></Link>
      <Link href="/products?category=kayak" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"><img src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/unnamed-3-6.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kayak" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><h3 className="text-white text-4xl font-black uppercase tracking-widest">KAYAK</h3></div></Link>
    </div>
  </section>
  {/* 7. INFINITE GALLERY */}
  <InfiniteGallery />

  {/* 8. OPINIONES */}
  <section className="py-20 bg-white border-t border-gray-100">
    <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-black uppercase mb-12">La experiencia Deporte y Aventura</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-8 rounded-xl"><div className="flex text-yellow-400 mb-2">★★★★★</div><p>"Envío rapidísimo y todo perfecto."</p><p className="font-bold mt-4">- Carlos M.</p></div>
            <div className="bg-gray-50 p-8 rounded-xl"><div className="flex text-yellow-400 mb-2">★★★★★</div><p>"La mejor tienda de montaña."</p><p className="font-bold mt-4">- Laura G.</p></div>
            <div className="bg-gray-50 p-8 rounded-xl"><div className="flex text-yellow-400 mb-2">★★★★☆</div><p>"Muy buena atención al cliente."</p><p className="font-bold mt-4">- David R.</p></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-gray-400">
            <div className="flex items-center gap-2"><Truck/> Envío Gratis +60€</div>
            <div className="flex items-center gap-2"><RefreshCw/> Devolución 30 días</div>
            <div className="flex items-center gap-2"><ShieldCheck/> Pago Seguro</div>
        </div>
    </div>
  </section>
</main>
);
}
