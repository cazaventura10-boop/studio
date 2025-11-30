'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/trekking', label: 'TREKKING' },
  { href: '/caza', label: 'CAZA' },
];

function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="currentColor"/>
      <path d="M25.8333 26.6667L20 18.3333L14.1667 26.6667H25.8333Z" stroke="#102A27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 22.5L20 18.3333L22.5 22.5L17.5 22.5Z" fill="#102A27"/>
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  
  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    isHomePage && !isScrolled
      ? "bg-transparent text-white"
      : "bg-background/95 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
  );
  
  const navItemClasses = cn(
    "font-bold tracking-wider transition-colors",
    isHomePage && !isScrolled ? "hover:text-white/80" : "hover:text-primary"
  );

  const iconButtonClasses = cn(
    isHomePage && !isScrolled ? "hover:bg-white/10" : "hover:bg-accent hover:text-accent-foreground"
  );
  
  const logoClasses = cn(
    "transition-colors",
    isHomePage && !isScrolled ? "text-white" : "text-primary"
  );

  const mobileHeaderClasses = cn(
    "flex items-center justify-between p-4 border-b",
    "bg-background"
  );

  return (
    <header className={headerClasses}>
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <div className={logoClasses}>
            <Logo />
          </div>
        </Link>
        
        <div className="ml-auto flex items-center gap-2">
           <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navItemClasses}
              >
                {label}
              </Link>
            ))}
             <Button variant="ghost" size="icon" className={iconButtonClasses}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Carrito</span>
             </Button>
             <Button variant="ghost" size="icon" className={iconButtonClasses}>
                <Search className="h-6 w-6" />
                <span className="sr-only">Buscar</span>
             </Button>
          </nav>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("md:hidden", iconButtonClasses)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Alternar Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/80 backdrop-blur-lg border-none p-0">
              <div className="flex flex-col h-full">
                <div className={mobileHeaderClasses}>
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                     <div className="text-primary">
                       <Logo />
                     </div>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4 p-4 text-lg">
                  {navLinks.map(({ href, label }) => (
                    <SheetClose key={href} asChild>
                      <Link
                        href={href}
                        className={cn(
                          'transition-colors hover:text-primary font-bold tracking-wider',
                           pathname === href ? 'text-primary' : 'text-muted-foreground'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                 <div className="p-4 mt-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="sr-only">Carrito</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Search className="h-6 w-6" />
                        <span className="sr-only">Buscar</span>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
