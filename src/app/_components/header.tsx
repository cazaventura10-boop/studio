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

const trekkingComplementos: NavLink[] = [
  { title: "Mochilas", href: '/products?category=Trekking&tag=Mochilas'},
  { title: "Gorros", href: '/products?category=Trekking&tag=Gorros'},
  { title: "Bastones", href: '/products?category=Trekking&tag=Bastones'}
];

const cazaLinks: NavLink[] = [
    { title: "Botas de Caza", href: '/products?category=Caza&tag=Botas-de-Caza' },
    { title: "Pantalones", href: '/products?category=Caza&tag=Pantalones' },
    { title: "Chaquetas", href: '/products?category=Caza&tag=Chaquetas' },
    { title: "Chalecos", href: '/products?category=Caza&tag=Chalecos' },
    { title: "Camisas", href: '/products?category=Caza&tag=Camisas' },
    { title: "Varios", href: '/products?category=Caza&tag=Varios' }
];
const kayakLinks: NavLink[] = [
    { title: "Kayaks Rígidos", href: '/products?category=Kayaking&tag=Kayaks-Rígidos' },
    { title: "Kayaks Hinchables", href: '/products?category=Kayaking&tag=Kayaks-Hinchables' },
    { title: "Palas y Remos", href: '/products?category=Kayaking&tag=Palas-y-Remos' },
    { title: "Chalecos Salvavidas", href: '/products?category=Kayaking&tag=Chalecos-Salvavidas' },
    { title: "Accesorios y Estancos", href: '/products?category=Kayaking&tag=Accesorios-y-Estancos' }
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

const NestedList = ({ items }: { items: NavLink[]}) => (
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
