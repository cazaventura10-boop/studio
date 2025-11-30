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

type NavLink = {
  title: string;
  href: string;
  children?: NavLink[];
};

const trekkingHombre: NavLink[] = [
  {
    title: 'ROPA DE HOMBRE',
    href: '/products?category=Trekking&tag=Ropa-Hombre',
    children: [
      {
        title: 'Pantalones de Hombre',
        href: '/products?category=Trekking&tag=Pantalones-Hombre',
        children: [
          { title: 'Pantalones Invierno', href: '/products?category=Trekking&tag=Pantalones-Invierno-Hombre' },
          { 
            title: 'Pantalones Primavera/Verano', 
            href: '/products?category=Trekking&tag=Pantalones-Verano-Hombre',
            children: [
                { title: 'Pantalones largos y desmontables', href: '/products?category=Trekking&tag=Pantalones-Largos-Hombre' },
                { title: 'Cortos y piratas', href: '/products?category=Trekking&tag=Pantalones-Cortos-Hombre' },
            ]
          },
        ],
      },
      {
        title: 'Chaquetas de Hombre',
        href: '/products?category=Trekking&tag=Chaquetas-Hombre',
        children: [
          { title: 'Softshell y Térmicas', href: '/products?category=Trekking&tag=Softshell-Hombre' },
          { title: 'Cortavientos e Impermeables', href: '/products?category=Trekking&tag=Cortavientos-Hombre' },
          { title: 'Plumas y Primaloft', href: '/products?category=Trekking&tag=Plumas-Hombre' },
        ],
      },
      { title: 'Chalecos de Hombre', href: '/products?category=Trekking&tag=Chalecos-Hombre' },
      { title: 'Sudaderas de Hombre', href: '/products?category=Trekking&tag=Sudaderas-Hombre' },
      {
        title: 'Camisetas de Hombre',
        href: '/products?category=Trekking&tag=Camisetas-Hombre',
        children: [
          { title: 'Térmicas y Manga Larga', href: '/products?category=Trekking&tag=Camisetas-Larga-Hombre' },
          { title: 'Manga Corta y Sin Mangas', href: '/products?category=Trekking&tag=Camisetas-Corta-Hombre' },
        ],
      },
    ],
  },
  {
    title: 'CALZADO DE HOMBRE',
    href: '/products?category=Trekking&tag=Calzado-Hombre',
    children: [
      { title: 'Botas de Montaña', href: '/products?category=Trekking&tag=Botas-Hombre' },
      { title: 'Zapatos y Zapatillas', href: '/products?category=Trekking&tag=Zapatillas-Hombre' },
      { title: 'Sandalias', href: '/products?category=Trekking&tag=Sandalias-Hombre' },
    ],
  },
];

const trekkingMujer: NavLink[] = [
  {
    title: 'ROPA DE MUJER',
    href: '/products?category=Trekking&tag=Ropa-Mujer',
    children: [
      {
        title: 'Pantalones',
        href: '/products?category=Trekking&tag=Pantalones-Mujer',
        children: [
           { title: 'Invierno/Verano', href: '/products?category=Trekking&tag=Pantalones-Temporada-Mujer' },
        ]
      },
      { title: 'Chaquetas', href: '/products?category=Trekking&tag=Chaquetas-Mujer' },
      { title: 'Sudaderas', href: '/products?category=Trekking&tag=Sudaderas-Mujer' },
      { title: 'Camisetas', href: '/products?category=Trekking&tag=Camisetas-Mujer' },
    ],
  },
  {
    title: 'CALZADO DE MUJER',
    href: '/products?category=Trekking&tag=Calzado-Mujer',
    children: [
      { title: 'Botas Trekking', href: '/products?category=Trekking&tag=Botas-Mujer' },
      { title: 'Zapatillas Trekking', href: '/products?category=Trekking&tag=Zapatillas-Mujer' },
      { title: 'Sandalias', href: '/products?category=Trekking&tag=Sandalias-Mujer' },
    ],
  },
];

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

const NestedList = ({ items }: { items: NavLink[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.title}>
        <ListItem href={item.href} title={item.title} className="p-2 font-semibold hover:bg-accent/50" />
        {item.children && (
          <ul className="pl-4 mt-1 space-y-1 border-l border-border ml-2">
            {item.children.map((child) => (
              <li key={child.title}>
                <ListItem href={child.href} title={child.title} className="p-2 text-sm" />
                 {child.children && (
                    <ul className="pl-4 mt-1 space-y-1 border-l border-border ml-2">
                        {child.children.map((subChild) => (
                            <li key={subChild.title}>
                                <ListItem href={subChild.href} title={subChild.title} className="p-2 text-xs text-muted-foreground" />
                            </li>
                        ))}
                    </ul>
                 )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

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
                  <div className="grid w-[700px] grid-cols-3 gap-x-8 p-4">
                    {/* Columna HOMBRE */}
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">HOMBRE</h3>
                      <p className="text-xs text-muted-foreground mb-3">Equipamiento masculino para montaña</p>
                      <NestedList items={trekkingHombre} />
                    </div>
                    {/* Columna MUJER */}
                     <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">MUJER</h3>
                      <p className="text-xs text-muted-foreground mb-3">Equipamiento femenino para montaña</p>
                       <NestedList items={trekkingMujer} />
                    </div>
                    {/* Columna COMPLEMENTOS */}
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-sm font-bold text-accent">COMPLEMENTOS</h3>
                       <p className="text-xs text-muted-foreground mb-3">Accesorios para tus aventuras</p>
                       <ul>
                          {trekkingComplementos.complementos.map((item) => (
                            <ListItem key={item} href={`/products?category=Trekking&tag=${item}`} title={item} className="text-sm p-2" />
                          ))}
                       </ul>
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
