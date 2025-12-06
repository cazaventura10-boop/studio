import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

export function Footer() { 
  return (
<footer className="bg-gray-900 text-gray-400 py-16">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
    {/* COLUMNA 1: LOGO Y TEXTO */}
    <div>
      <div className="mb-6">
        <Link href="/" className="block">
            <Image 
                src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/Gemini_Generated_Image_orrzteorrzteorrz__2___1_-removebg-preview.png"
                alt="Deporte y Aventura Logo"
                width={180}
                height={40}
                className="h-auto"
            />
        </Link>
      </div>
      <p className="text-sm leading-relaxed">
        Tu tienda especialista en Trekking, Caza y Kayak. Equipamiento de alto rendimiento para tus aventuras en la naturaleza.
      </p>
    </div>

    {/* COLUMNA 2: ENLACES */}
    <div>
      <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Atención al Cliente</h4>
      <ul className="space-y-3 text-sm">
        <li><a href="https://www.deporteyaventura.es/formas-envio-plazos-entrega/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">Formas de envío y plazos de entrega</a></li>
        <li><a href="https://www.deporteyaventura.es/devoluciones-y-cambios-2/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">Devoluciones y cambios</a></li>
        <li><Link href="/faq" className="hover:text-orange-500 transition">Preguntas Frecuentes</Link></li>
        <li><Link href="/contacto" className="hover:text-orange-500 transition">Contacto</Link></li>
      </ul>
    </div>
    {/* COLUMNA 3: LEGAL */}
    <div>
      <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Legal</h4>
      <ul className="space-y-3 text-sm">
        <li><Link href="/aviso-legal" className="hover:text-orange-500 transition">Aviso Legal</Link></li>
        <li><Link href="/privacidad" className="hovertext-orange-500 transition">Política de Privacidad</Link></li>
        <li><Link href="/privacidad#cookies" className="hover:text-orange-500 transition">Política de Cookies</Link></li>
        <li><Link href="/terminos-y-condiciones" className="hover:text-orange-500 transition">Términos y Condiciones</Link></li>
      </ul>
    </div>
    {/* COLUMNA 4: PAGOS Y REDES */}
    <div>
      <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Métodos de Pago</h4>
      {/* LOGOS A COLOR EN CAJITAS BLANCAS */}
      <div className="flex gap-3 mb-8">
        <div className="bg-white p-1 rounded flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/64px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" /></div>
        <div className="bg-white p-1 rounded flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/64px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" /></div>
        <div className="bg-white p-1 rounded flex items-center"><img src="https://olipe.com/tienda/wp-content/uploads/2021/03/Logo-Bizum.png" alt="Bizum" className="h-8" /></div>
      </div>
      <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Síguenos</h4>
      <div className="flex gap-4">
        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition"><Facebook size={20} /></a>
        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition"><Instagram size={20} /></a>
        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition"><Twitter size={20} /></a>
      </div>
    </div>
  </div>
  {/* COPYRIGHT */}
  <div className="text-center text-sm text-gray-500 pt-8 mt-12 border-t border-gray-800">
    <p>© {new Date().getFullYear()} Deporte y Aventura. Todos los derechos reservados.</p>
  </div>
</footer>
); }