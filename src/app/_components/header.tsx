'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/app/_components/cart-sheet';
import { SearchBar } from '@/app/_components/search-bar';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem
} from "@/components/ui/navigation-menu"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

type NavLink = {
  title: string;
  href: string;
  description?: string;
  children?: NavLink[];
};

const navLinks: NavLink[] = [
  {
    title: 'Trekking',
    href: '/products?category=trekking',
    children: [
      {
        title: 'Hombre',
        href: '/ropa-hombre',
        children: [
          { title: 'Pantalones', href: '/products?category=pantalones-hombre' },
          { title: 'Chaquetas', href: '/products?category=chaquetas-hombre' },
          { title: 'Sudaderas', href: '/products?category=sudaderas-hombre' },
          { title: 'Calzado', href: '/products?category=calzado-hombre' },
        ]
      },
      {
        title: 'Mujer',
        href: '/ropa-mujer',
        children: [
          { title: 'Pantalones', href: '/products?category=pantalones-montana' },
          { title: 'Chaquetas', href: '/products?category=chaquetas' },
          { title: 'Sudaderas', href: '/products?category=sudaderas-mujer' },
          { title: 'Calzado', href: '/products?category=calzado-de-mujer' },
        ]
      },
      {
        title: 'Complementos',
        href: '/products?category=complementos-trekking',
        children: [
            { title: "Mochilas", href: '/products?tag=mochilas'},
            { title: "Gorros y Gorras", href: '/products?tag=gorros-y-gorras'},
            { title: "Bastones", href: '/products?tag=bastones'},
            { title: "Calcetines", href: '/products?category=calcetines'}
        ]
      }
    ]
  },
  {
    title: 'Caza',
    href: '/products?category=caza',
    children: [
        { title: "Botas de Caza", href: '/products?category=botas-caza' },
        { title: "Pantalones Caza", href: '/products?category=pantalones-caza' },
        { title: "Chaquetas de Caza", href: '/products?category=chaquetas-caza' },
        { title: "Chalecos de Caza", href: '/products?category=chalecos-caza' },
        { title: "Camisas y Camisetas", href: '/products?category=camisas-y-camisetas-caza' },
        { title: "Varios Caza", href: '/products?category=varios-caza' }
    ]
  },
  {
    title: 'Kayak',
    href: '/products?category=kayak',
    children: [
        { title: "Kayaks Rígidos", href: '/products?category=kayaks-rigidos' },
        { title: "Kayaks Hinchables", href: '/products?category=kayaks-hinchables' },
        { title: "Palas y Remos", href: '/products?tag=palas-y-remos' },
        { title: "Chalecos Salvavidas", href: '/products?tag=chalecos-salvavidas' },
        { title: "Accesorios y Estancos", href: '/products?tag=accesorios-y-estancos' }
    ]
  }
];

function Logo() {
  return (
     <Image 
      src="https://www.deporteyaventura.es/wp-content/uploads/2025/11/Gemini_Generated_Image_orrzteorrzteorrz__2___1_-removebg-preview.png"
      alt="Deporte y Aventura Logo"
      width={180}
      height={40}
      className="h-auto"
      priority
    />
  );
}

const MobileNavMenu = ({ links, onLinkClick }: { links: NavLink[]; onLinkClick: () => void }) => {
  return (
    <Accordion type="multiple" className="w-full">
      {links.map((link) => (
        <AccordionItem value={link.title} key={link.title}>
          {link.children ? (
            <>
              <AccordionTrigger className="font-bold tracking-wider text-base py-3 uppercase">
                {link.title}
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                 {link.children.map(sublink => (
                    <Accordion type="multiple" key={sublink.title} className="w-full">
                         <AccordionItem value={sublink.title}>
                             {sublink.children ? (
                                <>
                                <AccordionTrigger className="font-semibold text-sm">{sublink.title}</AccordionTrigger>
                                <AccordionContent className="pl-4">
                                {sublink.children.map(item => (
                                    <SheetClose asChild key={item.title}>
                                        <Link href={item.href} onClick={onLinkClick} className="block py-2 text-muted-foreground text-sm">{item.title}</Link>
                                    </SheetClose>
                                ))}
                                </AccordionContent>
                                </>
                             ) : (
                                <SheetClose asChild>
                                    <Link href={sublink.href} onClick={onLinkClick} className="block py-3 font-semibold text-sm">{sublink.title}</Link>
                                </SheetClose>
                             )}
                        </AccordionItem>
                    </Accordion>
                 ))}
              </AccordionContent>
            </>
          ) : (
            <SheetClose asChild>
                <Link href={link.href} onClick={onLinkClick} className="flex w-full items-center justify-between py-3 font-bold tracking-wider text-base uppercase">
                    {link.title}
                </Link>
            </SheetClose>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};


export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  
  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    isHomePage && !isScrolled
      ? "bg-transparent text-white"
      : "bg-background/95 text-foreground backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-b"
  );
  
  const navTriggerClasses = cn("font-bold tracking-wider text-sm uppercase",
    (isHomePage && !isScrolled)
      ? "text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
      : "text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
  );
  
  const iconButtonClasses = cn(
    (isHomePage && !isScrolled)
      ? "text-white hover:bg-white/10 hover:text-white"
      : "text-foreground hover:bg-accent hover:text-accent-foreground"
  );

  return (
    <header className={headerClasses}>
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo />
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map(link => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuTrigger className={navTriggerClasses}>
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-3 gap-x-6 p-4">
                     {link.children?.map(col => (
                        <div key={col.title} className="flex flex-col">
                           <Link href={col.href} className="mb-2 text-sm font-bold text-accent hover:underline uppercase">{col.title}</Link>
                           <ul className="space-y-1">
                             {col.children?.map(item => (
                               <ListItem key={item.title} href={item.href} title={item.title}/>
                             ))}
                           </ul>
                        </div>
                     ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex flex-1 items-center justify-end gap-2">
           <div className="hidden sm:block w-full max-w-xs">
              <SearchBar />
           </div>
          <CartSheet />
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("md:hidden", iconButtonClasses)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <div className="flex h-full flex-col">
                 <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}><Logo /></Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
                    </SheetClose>
                 </div>
                 <div className="p-4 sm:hidden">
                    <SearchBar />
                 </div>
                 <ScrollArea className="flex-1">
                    <nav className="p-4 text-lg">
                      <MobileNavMenu links={navLinks} onLinkClick={() => setIsMobileMenuOpen(false)} />
                    </nav>
                 </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    