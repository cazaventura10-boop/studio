import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Image from 'next/image';

export function Footer() {

  const paymentMethods = [
    { name: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/64px-Visa_Inc._logo.svg.png' },
    { name: 'Mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/64px-Mastercard-logo.svg.png' },
    { name: 'PayPal', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/64px-PayPal.svg.png' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Logo y Texto */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="mb-2">
               <div className="flex items-center gap-2 mb-6">
                <Image src="https://storage.googleapis.com/deporteyaventura/logo-white-eagle-orange.png" alt="Deporte y Aventura Logo" width={200} height={75} />
               </div>
            </Link>
            <p className="text-sm text-gray-400">
              Tu tienda especialista en material de Trekking, Caza y Kayak. Equipamiento técnico para tus aventuras en la naturaleza.
            </p>
          </div>

          {/* Col 2: Atención al Cliente */}
          <div className="text-sm">
            <h3 className="font-bold text-white uppercase tracking-wider mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">Envíos y Entregas</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Devoluciones</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Garantía de Productos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="text-sm">
            <h3 className="font-bold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">Aviso Legal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Cookies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Condiciones de Contratación</Link></li>
            </ul>
          </div>

          {/* Col 4: Síguenos y Pagos */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4">Síguenos</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook"><Facebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Youtube"><Youtube /></Link>
            </div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4">Métodos de Pago</h3>
            <div className="flex gap-3 mt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/64px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 bg-white rounded p-1" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/64px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 bg-white rounded p-1" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bizum_logo.svg/1280px-Bizum_logo.svg.png" alt="Bizum" className="h-8 bg-white rounded p-1" />
            </div>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Deporte Y Aventura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
