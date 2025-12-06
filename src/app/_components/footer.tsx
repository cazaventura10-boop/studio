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
                <div className="bg-orange-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3 4-3 4"/><path d="M9 16 5 20l1 1h3l10-10-4-4-10 10h3l1 1"/></svg>
                </div>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">DEPORTE Y AVENTURA</span>
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/64px-PayPal.svg.png" alt="PayPal" className="h-8 bg-white rounded p-1" />
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
