'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
} from "@/components/ui/navigation-menu"

const trekkingHombre = {
  ropa: ["Pantalones", "Chaquetas", "Softshell", "Plumas", "Chalecos", "Sudaderas"],
  calzado: ["Calzado"],
};

const trekkingMujer = {
  ropa: ["Pantalones", "Chaquetas", "Sudaderas", "Camisetas"],
  calzado: ["Calzado"],
};

const trekkingComplementos = {
  complementos: ["Mochilas", "Gorros", "Bastones"],
};

const cazaLinks = ["Botas de Caza", "Pantalones", "Chaquetas", "Chalecos", "Camisas", "Varios"];
const kayakLinks = ["Kayaks Rígidos", "Kayaks Hinchables", "Palas y Remos", "Chalecos Salvavidas", "Accesorios y Estancos"];


function Logo() {
  return (
    <Image 
        src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/Gemini_Generated_Image_orrzteorrzteorrz__2___1_-removebg-preview.png"
        alt="Deporte Y Aventura Logo"
        width={150}
        height={50}
        style={{ height: 'auto' }}
        priority
    />
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
  
  const navTriggerClasses = cn(
    "font-bold tracking-wider text-sm",
    isHomePage && !isScrolled 
      ? "text-white hover:bg-white/10 hover:text-white" 
      : "text-foreground hover:bg-accent hover:text-accent-foreground"
  );

  const iconButtonClasses = cn(
    "hover:bg-accent hover:text-accent-foreground",
    isHomePage && !isScrolled 
      ? "text-white hover:bg-white/10" 
      : "text-foreground"
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
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <div className={logoClasses}>
            <Logo />
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {/* TREKKING */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navTriggerClasses}>TREKKING</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-3 gap-x-8 p-4">
                    {/* Columna HOMBRE */}
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">HOMBRE</h3>
                      <p className="text-xs text-muted-foreground mb-3">Equipamiento masculino para montaña</p>
                      <h4 className="font-semibold text-sm mb-1">Ropa</h4>
                      {trekkingHombre.ropa.map((item) => (
                        <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                      ))}
                       <h4 className="font-semibold text-sm mt-3 mb-1">Calzado</h4>
                       {trekkingHombre.calzado.map((item) => (
                        <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                      ))}
                    </div>
                    {/* Columna MUJER */}
                     <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">MUJER</h3>
                      <p className="text-xs text-muted-foreground mb-3">Equipamiento femenino para montaña</p>
                       <h4 className="font-semibold text-sm mb-1">Ropa</h4>
                      {trekkingMujer.ropa.map((item) => (
                        <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                      ))}
                      <h4 className="font-semibold text-sm mt-3 mb-1">Calzado</h4>
                       {trekkingMujer.calzado.map((item) => (
                        <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                      ))}
                    </div>
                    {/* Columna COMPLEMENTOS */}
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">COMPLEMENTOS</h3>
                       <p className="text-xs text-muted-foreground mb-3">Accesorios para tus aventuras</p>
                      {trekkingComplementos.complementos.map((item) => (
                        <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* CAZA */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navTriggerClasses}>CAZA</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    {cazaLinks.map((link) => (
                       <ListItem key={link} href={`/products?category=Caza&tag=${link}`} title={link} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* KAYAK */}
               <NavigationMenuItem>
                <NavigationMenuTrigger className={navTriggerClasses}>KAYAK</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-3 p-4">
                    {kayakLinks.map((link) => (
                       <ListItem key={link} href={`/products?category=Kayaking&tag=${link}`} title={link} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="hidden md:flex items-center gap-2">
             <Button variant="ghost" size="icon" className={iconButtonClasses}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Carrito</span>
             </Button>
             <Button variant="ghost" size="icon" className={iconButtonClasses}>
                <Search className="h-6 w-6" />
                <span className="sr-only">Buscar</span>
             </Button>
          </div>
          
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
                  {/* Aquí puedes agregar un Accordion para los menús en móvil */}
                  <SheetClose asChild>
                    <Link href="/trekking" className="font-bold tracking-wider">TREKKING</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/caza" className="font-bold tracking-wider">CAZA</Link>
                  </SheetClose>
                   <SheetClose asChild>
                    <Link href="/products?category=Kayaking" className="font-bold tracking-wider">KAYAK</Link>
                  </SheetClose>
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
