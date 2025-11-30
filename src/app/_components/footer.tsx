import Link from 'next/link';

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
    <footer className="bg-muted text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Construido por DeporteY Aventura Next.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="hover:text-primary">Términos de Servicio</Link>
            <Link href="#" className="hover:text-primary">Política de Privacidad</Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DeporteY Aventura. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
