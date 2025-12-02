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
  navigationMenuTriggerStyle,
  ListItem,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from '@/components/ui/scroll-area';

type NavLink = {
  title: string;
  href: string;
  children?: NavLink[];
};

const trekkingHombre: NavLink[] = [
  {
    title: 'ROPA DE HOMBRE',
    href: '/products?category=ropa-de-hombre',
    children: [
      {
        title: 'Pantalones Hombre',
        href: '/products?category=pantalones-hombre',
        children: [
          { title: 'Pantalones Invierno Hombre', href: '/products?category=pantalones-invierno-hombre' },
          { 
            title: 'Pantalones Primavera/Verano Hombre', 
            href: '/products?category=pantalones-primavera-verano-hombre',
            children: [
                { title: 'Cortos y Piratas Hombre', href: '/products?category=cortos-y-piratas-hombre' },
                { title: 'Largos y Desmontables Hombre', href: '/products?category=largos-y-desmontables-hombre' },
            ]
          },
        ],
      },
      {
        title: 'Chaquetas Hombre',
        href: '/products?category=chaquetas-hombre',
        children: [
          { title: 'Softshell y Térmicas Hombre', href: '/products?category=softshell-y-termicas-hombre' },
          { title: 'Cortavientos e Impermeables Hombre', href: '/products?category=cortavientos-e-impermeables-hombre' },
          { title: 'Plumas y Primaloft Hombre', href: '/products?category=plumas-y-primaloft-hombre' },
        ],
      },
      { title: 'Chalecos Hombre', href: '/products?category=chalecos-hombre' },
      { title: 'Sudaderas Hombre', href: '/products?category=sudaderas-hombre' },
      { 
        title: 'Camisetas Hombre', 
        href: '/products?category=camisetas-hombre',
        children: [
            { title: 'Térmicas y Manga Larga Hombre', href: '/products?category=camisetas-termicas-y-manga-larga-hombre' },
            { title: 'Manga Corta y sin Mangas Hombre', href: '/products?category=camisetas-manga-corta-y-sin-mangas-hombre' },
        ]
      },
    ],
  },
  {
    title: 'CALZADO DE HOMBRE',
    href: '/products?category=calzado-hombre',
    children: [
      { title: 'Botas de Montaña Hombre', href: '/products?category=botas-de-montana-y-trekking-hombre' },
      { title: 'Zapatillas Trekking Hombre', href: '/products?category=zapatos-y-zapatillas-trekking-hombre' },
      { title: 'Sandalias Hombre', href: '/products?category=sandalias-de-trekking' },
    ],
  },
];

const trekkingMujer: NavLink[] = [
    {
        title: 'ROPA DE MUJER',
        href: '/products?category=ropa-de-mujer',
        children: [
            {
                title: 'Pantalones',
                href: '/products?category=pantalones-mujer',
                children: [
                    { title: 'Pantalones trekking invierno', href: '/products?category=pantalones-trekking-invierno' },
                    { title: 'Pantalones trekking primavera verano', href: '/products?category=pantalones-trekking-primavera-verano' },
                ]
            },
            { title: 'Chaquetas', href: '/products?category=chaquetas-mujer' },
            { title: 'Sudaderas', href: '/products?category=sudaderas-mujer' },
            { title: 'Camisetas', href: '/products?category=camisetas-mujer' },
        ],
    },
    {
        title: 'CALZADO DE MUJER',
        href: '/products?category=calzado-mujer',
        children: [
            { title: 'Botas', href: '/products?category=botas-mujer' },
            { title: 'Zapatillas', href: '/products?category=zapatillas-mujer' },
            { title: 'Sandalias', href: '/products?category=sandalias-mujer' },
        ],
    },
];

const trekkingComplementos: NavLink[] = [
    { title: "Mochilas", href: '/products?tag=mochilas'},
    { title: "Gorros y Gorras", href: '/products?tag=gorros-y-gorras'},
    { title: "Bastones", href: '/products?tag=bastones'}
];

const cazaLinks: NavLink[] = [
    { title: "Botas de Caza", href: '/products?category=botas-caza' },
    { title: "Pantalones Caza", href: '/products?tag=pantalones-caza' },
    { title: "Chaquetas de Caza", href: '/products?tag=chaquetas-caza' },
    { title: "Chalecos de Caza", href: '/products?tag=chalecos-caza' },
    { title: "Camisas y Camisetas", href: '/products?tag=camisas-y-camisetas-caza' },
    { title: "Varios Caza", href: '/products?tag=varios-caza' }
];

const kayakLinks: NavLink[] = [
    { title: "Kayaks Rígidos", href: '/products?category=kayaks-rigidos' },
    { title: "Kayaks Hinchables", href: '/products?category=kayaks-hinchables' },
    { title: "Palas y Remos", href: '/products?tag=palas-y-remos' },
    { title: "Chalecos Salvavidas", href: '/products?tag=chalecos-salvavidas' },
    { title: "Accesorios y Estancos", href: '/products?tag=accesorios-y-estancos' }
];


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

const NestedList = ({ items, level = 0 }: { items: NavLink[], level?: number }) => {
    const baseClasses = "p-2";
    const levelClasses = [
        "font-semibold hover:bg-accent/50", // Level 0
        "text-sm",                         // Level 1
        "text-xs text-muted-foreground"    // Level 2
    ];
    const listClasses = "pl-4 mt-1 space-y-1 border-l border-border ml-2";

    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item.title}>
                    <ListItem href={item.href} title={item.title} className={cn(baseClasses, levelClasses[level])} />
                    {item.children && level < 2 && ( // Now supports up to level 3 rendering
                        <div className={listClasses}>
                            <NestedList items={item.children} level={level + 1} />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};


const MobileNavLink = ({ href, children, onLinkClick }: { href: string, children: React.ReactNode, onLinkClick?: () => void }) => (
  <SheetClose asChild>
      <Link href={href} className="block p-2 text-muted-foreground" onClick={onLinkClick}>
          {children}
      </Link>
  </SheetClose>
);

const MobileNavAccordion = ({ items, onLinkClick }: { items: NavLink[], onLinkClick?: () => void }) => {
    return (
        <Accordion type="multiple" className="w-full">
            {items.map(item => {
                if (item.children && item.children.length > 0) {
                    return (
                        <AccordionItem value={item.title} key={item.title}>
                            <AccordionTrigger className="font-semibold text-sm py-3 pr-2">{item.title}</AccordionTrigger>
                            <AccordionContent className="pl-4">
                                <MobileNavAccordion items={item.children} onLinkClick={onLinkClick} />
                            </AccordionContent>
                        </AccordionItem>
                    );
                }
                return (
                   <MobileNavLink key={item.title} href={item.href} onLinkClick={onLinkClick}>{item.title}</MobileNavLink>
                )
            })}
        </Accordion>
    );
};


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
                          {trekkingComplementos.map((item) => (
                            <ListItem key={item.title} href={item.href} title={item.title} className="text-sm p-2" />
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
                       <ListItem key={link.title} href={link.href} title={link.title} />
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
                       <ListItem key={link.title} href={link.href} title={link.title} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* MAPA CATEGORIAS */}
              <NavigationMenuItem>
                <Link href="/categorias" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navTriggerClasses)}>
                    Mapa Categorías
                  </NavigationMenuLink>
                </Link>
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
            <SheetContent side="left" className="bg-background border-none p-0 w-full max-w-sm">
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
                <ScrollArea className="flex-1">
                  <nav className="p-4 text-lg">
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="trekking">
                            <AccordionTrigger className="font-bold tracking-wider text-base py-3">TREKKING</AccordionTrigger>
                            <AccordionContent>
                                <Accordion type="multiple" className="w-full pl-4">
                                     <AccordionItem value="trekking-hombre">
                                        <AccordionTrigger className="font-semibold text-sm">HOMBRE</AccordionTrigger>
                                        <AccordionContent className="pl-4">
                                            <MobileNavAccordion items={trekkingHombre} onLinkClick={() => setIsMobileMenuOpen(false)} />
                                        </AccordionContent>
                                     </AccordionItem>
                                     <AccordionItem value="trekking-mujer">
                                        <AccordionTrigger className="font-semibold text-sm">MUJER</AccordionTrigger>
                                        <AccordionContent className="pl-4">
                                            <MobileNavAccordion items={trekkingMujer} onLinkClick={() => setIsMobileMenuOpen(false)} />
                                        </AccordionContent>
                                     </AccordionItem>
                                     <AccordionItem value="trekking-complementos">
                                        <AccordionTrigger className="font-semibold text-sm">COMPLEMENTOS</AccordionTrigger>
                                        <AccordionContent className="pl-4">
                                            {trekkingComplementos.map(item => (
                                                <MobileNavLink key={item.title} href={item.href} onLinkClick={() => setIsMobileMenuOpen(false)}>{item.title}</MobileNavLink>
                                            ))}
                                        </AccordionContent>
                                     </AccordionItem>
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="caza">
                            <AccordionTrigger className="font-bold tracking-wider text-base py-3">CAZA</AccordionTrigger>
                            <AccordionContent>
                                {cazaLinks.map(link => (
                                    <MobileNavLink key={link.title} href={link.href} onLinkClick={() => setIsMobileMenuOpen(false)}>{link.title}</MobileNavLink>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="kayak">
                            <AccordionTrigger className="font-bold tracking-wider text-base py-3">KAYAK</AccordionTrigger>
                            <AccordionContent>
                                {kayakLinks.map(link => (
                                    <MobileNavLink key={link.title} href={link.href} onLinkClick={() => setIsMobileMenuOpen(false)}>{link.title}</MobileNavLink>
                                ))}
                            </AccordionContent>
                        </AccordionItem>

                        <MobileNavLink href="/categorias" onLinkClick={() => setIsMobileMenuOpen(false)}>Mapa Categorías</MobileNavLink>

                    </Accordion>
                  </nav>
                </ScrollArea>
                 <div className="p-4 mt-auto flex items-center gap-4 border-t">
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
