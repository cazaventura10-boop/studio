'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AddToCartButton({ product, quantity = 1, disabled = false, showIcon=true }: { product: Product, quantity?: number, disabled?: boolean, showIcon?: boolean }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Añadido al carrito',
      description: `${product.name} (x${quantity}) se ha añadido a tu carrito.`,
      className: 'bg-primary text-primary-foreground',
    });
  };

  return (
    <Button
      size="lg"
      className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
      onClick={handleAddToCart}
      disabled={disabled}
    >
      {showIcon && <ShoppingCart className="mr-3 h-6 w-6" />}
      Añadir al Carrito
    </Button>
  );
}
