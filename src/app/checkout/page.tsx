'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Banknote, ShoppingCart, Smartphone, Handshake } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const shippingCost = 0;
  const finalTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center pt-32">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-extrabold font-headline">Tu carrito está vacío</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Parece que no has añadido nada a tu carrito todavía.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/products">Empezar a comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Columna Izquierda: Formulario y Pago */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Detalles de Facturación</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Juan" />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" placeholder="Pérez" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="juan.perez@ejemplo.com" />
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" placeholder="600 000 000" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Calle Falsa 123" />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Madrid" />
              </div>
              <div>
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" placeholder="28001" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Método de Pago</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="card" className="space-y-4">
                    <Label
                        htmlFor="card"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input:checked]:border-primary"
                    >
                        <RadioGroupItem value="card" id="card" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Tarjeta de Crédito/Débito</p>
                            <p className="text-sm text-muted-foreground">Paga de forma segura con tu tarjeta.</p>
                             <div className="mt-2 flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                <p className="text-xs font-semibold">VISA, Mastercard</p>
                            </div>
                        </div>
                    </Label>
                    <Label
                        htmlFor="bizum"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input-checked]:border-primary"
                    >
                        <RadioGroupItem value="bizum" id="bizum" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Bizum</p>
                            <p className="text-sm text-muted-foreground">Te enviaremos una solicitud de pago a tu móvil.</p>
                            <div className="mt-2 flex items-center gap-2">
                               <Smartphone className="h-5 w-5" />
                            </div>
                        </div>
                    </Label>
                    <Label
                        htmlFor="transfer"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input:checked]:border-primary"
                    >
                        <RadioGroupItem value="transfer" id="transfer" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Transferencia Bancaria Directa</p>
                            <p className="text-sm text-muted-foreground">Recibirás los detalles por email para completar el pago.</p>
                            <div className="mt-2 flex items-center gap-2">
                               <Banknote className="h-5 w-5" />
                            </div>
                        </div>
                    </Label>
                    <Label
                        htmlFor="cod"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input-checked]:border-primary"
                    >
                        <RadioGroupItem value="cod" id="cod" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Contrareembolso</p>
                            <p className="text-sm text-muted-foreground">Paga en efectivo al recibir tu pedido en casa.</p>
                            <div className="mt-2 flex items-center gap-2">
                               <Handshake className="h-5 w-5" />
                            </div>
                        </div>
                    </Label>
                </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Resumen del Pedido */}
        <div className="relative">
          <div className="lg:sticky top-24">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white">
                        <Image
                            src={item.images?.[0]?.src || 'https://placehold.co/100x100'}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="64px"
                        />
                         <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-2">{item.name}</p>
                      </div>
                      <p className="text-sm font-bold">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(parseFloat(item.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">
                      {shippingCost === 0 ? 'Gratis' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(shippingCost)}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalTotal)}</span>
                </div>

                <Button 
                    size="lg" 
                    className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
                >
                  PAGAR Y FINALIZAR PEDIDO
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
