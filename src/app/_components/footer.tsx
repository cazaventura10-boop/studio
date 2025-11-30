import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {

  function Logo() {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="currentColor"/>
        <path d="M25.8333 26.6667L20 18.3333L14.1667 26.6667H25.8333Z" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M17.5 22.5L20 18.3333L22.5 22.5L17.5 22.5Z" fill="#E2E8F0"/>
      </svg>
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
              <span className="font-headline font-bold text-lg">DeporteY Aventura</span>
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
