'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, Banknote, ShoppingCart, Smartphone, Handshake, Truck, Package, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [shippingMethod, setShippingMethod] = useState('domicilio');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  // Estado unificado para el formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
    });
  };

  const createRedsysForm = (data: any) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = data.url;
    form.style.display = 'none';

    const params = {
      Ds_SignatureVersion: data.DS_SIGNATUREVERSION,
      Ds_MerchantParameters: data.DS_MERCHANT_PARAMETERS,
      Ds_Signature: data.DS_SIGNATURE,
    }

    for (const key in params) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key as keyof typeof params];
      form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
  };

  const handlePayment = async () => {
    // Validación
    for (const key in formData) {
        if (formData[key as keyof typeof formData] === '') {
            toast({
                title: "Campos incompletos",
                description: "Por favor, rellena todos los detalles de facturación y envío.",
                variant: "destructive"
            });
            return;
        }
    }
    
    if (paymentMethod !== 'card') {
      toast({
        title: "Método no implementado",
        description: "Solo el pago con tarjeta está disponible por ahora.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    // --- CORRECCIÓN CLAVE ---
    // Calculamos los costes aquí para asegurar que los valores son correctos y existen
    const shippingCost = cartTotal < 60 ? 2.99 : 0;
    const codSurcharge = paymentMethod === 'cod' ? 3.90 : 0;
    const finalTotal = cartTotal + shippingCost + codSurcharge;

    try {
        const response = await fetch('/api/checkout/redsys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                cartItems,
                total: finalTotal,
                shippingCost: shippingCost, // <-- AHORA SE ENVÍA EXPLÍCITAMENTE
                codSurcharge: codSurcharge,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.details || 'Error al procesar el pago.');
        }

        // Redirigir a Redsys
        createRedsysForm(data);

    } catch (error) {
        console.error("Payment failed:", error);
        toast({
            title: "Error en el pago",
            description: error instanceof Error ? error.message : "No se pudo conectar con la pasarela de pago.",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  };


  if (cartItems.length === 0 && !isLoading) {
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

  // Calculamos los costes aquí TAMBIÉN para la visualización
  const shippingCost = cartTotal < 60 ? 2.99 : 0;
  const codSurcharge = paymentMethod === 'cod' ? 3.90 : 0;
  const finalTotal = cartTotal + shippingCost + codSurcharge;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Columna Izquierda: Formulario y Pago */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Detalles de Facturación y Envío</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Juan" value={formData.firstName} onChange={handleFormChange} required />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" placeholder="Pérez" value={formData.lastName} onChange={handleFormChange} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="juan.perez@ejemplo.com" value={formData.email} onChange={handleFormChange} required />
              </div>
               <div className="md:col-span-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" placeholder="600 000 000" value={formData.phone} onChange={handleFormChange} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Calle Falsa 123" value={formData.address} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Madrid" value={formData.city} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" placeholder="28001" value={formData.zip} onChange={handleFormChange} required />
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Método de Envío</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                    <Label
                        htmlFor="domicilio"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input:checked]:border-primary"
                    >
                        <RadioGroupItem value="domicilio" id="domicilio" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Envío a domicilio (Agencia)</p>
                            <p className="text-sm text-muted-foreground">Recíbelo cómodamente en casa.</p>
                            <div className="mt-2 flex items-center gap-2">
                               <Truck className="h-5 w-5" />
                            </div>
                        </div>
                    </Label>
                    <Label
                        htmlFor="locker"
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input:checked]:border-primary"
                    >
                        <RadioGroupItem value="locker" id="locker" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Recogida en punto pack (Locker)</p>
                            <p className="text-sm text-muted-foreground">Elige un punto de recogida cercano.</p>
                             <div className="mt-2 flex items-center gap-2">
                                <Package className="h-5 w-5" />
                            </div>
                        </div>
                    </Label>
                </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Método de Pago</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
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
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input:checked]:border-primary"
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
                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 has-[input:checked]:bg-accent/80 has-[input
:checked]:border-primary"
                    >
                        <RadioGroupItem value="cod" id="cod" className="mt-1"/>
                        <div>
                            <p className="font-semibold">Contrareembolso</p>
                            <p className="text-sm text-muted-foreground">Paga en efectivo al recibir tu pedido en casa.</p>
                            <div className="mt-2 flex items-center gap-2">
                               <Handshake className="h-5 w-5" />
                               {codSurcharge > 0 && <span className="text-xs font-bold text-red-600">(Recargo: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(codSurcharge)})</span>}
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
                    <span className={shippingCost === 0 ? 'font-semibold text-green-600' : ''}>
                      {shippingCost === 0 ? 'Gratis' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(shippingCost)}
                    </span>
                  </div>
                   {codSurcharge > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                        <span>Recargo Contrareembolso</span>
                        <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(codSurcharge)}</span>
                    </div>
                   )}
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalTotal)}</span>
                </div>

                <Button 
                    size="lg" 
                    className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
                    onClick={handlePayment}
                    disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  {isLoading ? 'Procesando...' : 'PAGAR Y FINALIZAR PEDIDO'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
