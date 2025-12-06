import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Image from 'next/image';

export function Footer() {

  function Logo() {
    return (
      <Image
        src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/logo-white-deporte-y-aventura.png"
        alt="Deporte Y Aventura Logo"
        width={180}
        height={60}
        style={{ height: 'auto', width: '180px' }}
        priority
      />
    );
  }

  const paymentMethods = [
    { name: 'Visa', url: 'https://www.deporteyaventura.es/wp-content/uploads/2024/07/visa.png' },
    { name: 'Mastercard', url: 'https://www.deporteyaventura.es/wp-content/uploads/2024/07/mastercard.png' },
    { name: 'Bizum', url: 'https://www.deporteyaventura.es/wp-content/uploads/2024/07/bizum.png' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Logo y Texto */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="mb-2">
              <Logo />
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
            <div className="flex items-center space-x-2">
              {paymentMethods.map(method => (
                <div key={method.name} className="bg-white rounded-md p-1 h-8 flex items-center">
                    <Image src={method.url} alt={method.name} width={36} height={24} style={{ objectFit: 'contain', height: '100%', width: 'auto' }} />
                </div>
              ))}
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
