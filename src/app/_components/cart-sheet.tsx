'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartSheet() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Abrir carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-20 w-20 text-muted-foreground" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.images?.[0]?.src || 'https://placehold.co/100x100'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <div
                          className="
                            mt-1 text-sm
                            text-[0px]
                            [&_.screen-reader-text]:hidden
                            [&>del]:text-gray-500 [&>del]:font-medium [&>del]:line-through
                            [&>ins]:text-red-600 [&>ins]:font-bold [&>ins]:no-underline
                            [&>.amount]:text-gray-900 [&>.amount]:font-bold
                          "
                          dangerouslySetInnerHTML={{ __html: item.price_html }}
                        />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto border-t bg-background px-6 py-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cartTotal)}</span>
                </div>
                <Button asChild size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
