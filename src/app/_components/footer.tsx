import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

export function Footer() {

  function Logo() {
    return (
      <Image
        src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/Gemini_Generated_Image_orrzteorrzteorrz__2___1_-removebg-preview.png"
        alt="Deporte Y Aventura Logo"
        width={150}
        height={50}
        style={{ height: 'auto', width: '150px' }}
        priority
      />
    );
  }

  return (
    <footer className="bg-foreground text-muted-foreground">
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo y Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3 text-primary-foreground hover:text-white transition-colors">
              <Logo />
            </Link>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          {/* Links Legales */}
          <nav className="flex justify-center gap-4 md:gap-6 text-sm">
            <Link href="#" className="hover:text-primary-foreground transition-colors">Aviso Legal</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Envíos</Link>
          </nav>

          {/* Redes Sociales */}
          <div className="flex justify-center md:justify-end gap-4">
            <Link href="#" className="hover:text-primary-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
