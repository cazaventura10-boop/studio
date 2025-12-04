'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AddToCartButton } from '@/app/_components/add-to-cart-button';
import { Minus, Package, Plus, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/hooks/use-toast';

interface Variation {
  id: number;
  attributes: { name: string; option: string }[];
  stock_quantity: number | null;
  stock_status: string;
  manage_stock: boolean;
  price: string;
  regular_price: string;
  sale_price: string;
  price_html: string;
}

interface ProductDetailsClientProps {
  product: Product;
  variations: Variation[];
}

export function ProductDetailsClient({ product, variations }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const handleOptionSelect = (attributeName: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [attributeName]: option,
    }));
    setQuantity(1); // Reset quantity when size changes
  };

  const findSelectedVariation = (): Variation | undefined => {
    if (product.attributes?.length === 0 || Object.keys(selectedOptions).length !== product.attributes.filter(a => a.variation).length) {
      return undefined;
    }
    
    return variations.find(variation => 
      variation.attributes.every(attr => 
        selectedOptions[attr.name] === attr.option
      )
    );
  };
  
  const selectedVariation = findSelectedVariation();
  
  const maxQuantity = selectedVariation?.manage_stock ? selectedVariation.stock_quantity ?? Infinity : product.manage_stock ? product.stock_quantity ?? Infinity : Infinity;
  const hasStock = selectedVariation ? selectedVariation.stock_status === 'instock' : product.stock_status === 'instock';
  const canAddToCart = selectedVariation || !product.attributes.some(a => a.variation);

  const handleAddToCart = () => {
    if (!canAddToCart) {
        toast({
            variant: "destructive",
            title: "Selecciona una opción",
            description: `Por favor, elige una de las opciones disponibles para ${product.attributes.find(a => a.variation)?.name}.`
        });
        return;
    }

    // Use variation data if available, otherwise use main product data
    const itemToAdd = {
        ...product,
        ...(selectedVariation && {
            id: selectedVariation.id,
            price: selectedVariation.price,
            price_html: selectedVariation.price_html,
            name: `${product.name} - ${Object.values(selectedOptions).join(', ')}`
        }),
    };
    
    addToCart(itemToAdd, quantity);
    toast({
      title: 'Añadido al carrito',
      description: `${itemToAdd.name} (x${quantity}) se ha añadido a tu carrito.`,
      className: 'bg-primary text-primary-foreground',
    });
  };

  // Helper function to check stock for a specific option
  const checkStock = (attributeName: string, optionName: string): boolean => {
    if (!variations || variations.length === 0) {
      if (product.manage_stock) {
        return (product.stock_quantity ?? 0) > 0;
      }
      return product.stock_status === 'instock';
    }

    const match = variations.find((v: any) =>
      v.attributes.some((a: any) =>
        a.name.toLowerCase() === attributeName.toLowerCase() &&
        a.option.toLowerCase() === optionName.toLowerCase()
      )
    );

    if (match) {
      return match.stock_status === 'instock' && (match.manage_stock ? (match.stock_quantity ?? 0) > 0 : true);
    }
    return false;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        {product.categories.length > 0 && <Badge variant="outline" className="text-sm">{product.categories[0].name}</Badge>}
      </div>
      
      <h1 className="text-3xl lg:text-4xl font-extrabold font-headline mb-4 tracking-tight">{product.name}</h1>
      
      <div
        className="text-2xl mb-6 flex items-center gap-3 font-bold
        text-[0px] [&_.screen-reader-text]:hidden
        [&>del]:text-lg [&>del]:text-gray-400 [&>del]:line-through
        [&>ins]:text-4xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
        [&>.amount]:text-4xl [&>.amount]:font-black [&>.amount]:text-gray-900"
        dangerouslySetInnerHTML={{ __html: selectedVariation?.price_html || product.price_html }}
      />
      
      {product.short_description && <div className="prose prose-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.short_description }} />}
      
      <div className='my-6 h-px bg-border' />

      {product.attributes && product.attributes.filter(attr => attr.variation).map((attr: any) => (
          <div key={attr.id} className="mb-6">
            <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{attr.name}:</p>
            <div className="flex flex-wrap gap-2">
              {attr.options.map((option: string) => {
                const inStock = checkStock(attr.name, option);
                const isSelected = selectedOptions[attr.name] === option;
                return (
                  <button 
                    key={option}
                    disabled={!inStock}
                    onClick={() => handleOptionSelect(attr.name, option)}
                    className={`px-4 py-3 border rounded-lg text-sm font-bold transition-all
                      ${isSelected ? 'border-orange-500 text-orange-600 ring-2 ring-orange-200' : ''}
                      ${inStock 
                        ? 'border-gray-300 text-gray-900 hover:border-orange-500 hover:text-orange-600 cursor-pointer focus:border-orange-500' 
                        : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed line-through'
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
      ))}
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-bold">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))} disabled={quantity >= maxQuantity || !hasStock}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
        <Button
            size="lg"
            className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
            onClick={handleAddToCart}
            disabled={!canAddToCart || !hasStock}
        >
            Añadir al Carrito
        </Button>
      </div>
        {selectedVariation && maxQuantity > 0 && maxQuantity <= 5 && (
            <p className="text-sm text-red-600 font-bold mb-4 -mt-4 text-center">¡Solo quedan {maxQuantity} unidades!</p>
        )}
        {!hasStock && (
             <p className="text-sm text-red-600 font-bold mb-4 -mt-4 text-center">Producto agotado</p>
        )}


      <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <Truck className="text-orange-600" /> Envío Rápido 24/48h
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <ShieldCheck className="text-orange-600" /> Garantía de Calidad
        </div>
      </div>
      
      <div className="hidden md:block">
        <Accordion type="single" collapsible className="w-full mt-8" defaultValue="description">
            <AccordionItem value="description">
                <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                       <Package className="h-5 w-5" /> Descripción
                    </div>
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm text-muted-foreground pt-2">
                    <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
