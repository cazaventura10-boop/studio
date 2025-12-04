'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Product, ProductVariation } from '@/lib/types';
import { AddToCartButton } from '@/app/_components/add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, Minus, Plus, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import ProductCard from '@/app/_components/product-card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

const reviewsPool = [
    { user: "Marc P.", text: "Calidad brutal. Se nota que es material técnico del bueno.", stars: 5 },
    { user: "Elena S.", text: "El envío rapidísimo, en 24h lo tenía en casa para la ruta.", stars: 5 },
    { user: "Javier R.", text: "Talla perfecta y muy cómodos. Repetiré seguro.", stars: 4 },
    { user: "Ana M.", text: "Muy buena relación calidad-precio. Abrigan mucho.", stars: 5 },
    { user: "Carlos D.", text: "Todo perfecto, tal y como sale en la foto.", stars: 5 },
    { user: "Laura B.", text: "Tuve dudas con la talla y me ayudaron genial por WhatsApp.", stars: 5 },
    { user: "David G.", text: "Resistentes y ligeros. Justo lo que buscaba.", stars: 4 },
];

interface ProductDetailsProps {
    product: Product;
    variations: ProductVariation[];
    relatedProducts: Product[];
}

export function ProductDetails({ product, variations, relatedProducts }: ProductDetailsProps) {
    const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.images?.[0] || null);

    useEffect(() => {
        setSelectedImage(product.images?.[0] || null);
        setSelectedVariation(null);
        setQuantity(1);
    }, [product]);
    
    const randomReviews = useMemo(() => [...reviewsPool].sort(() => 0.5 - Math.random()).slice(0, 3), [product.id]);

    const handleSelectVariation = (variation: ProductVariation) => {
        setSelectedVariation(variation);
        setQuantity(1); // Reset quantity when changing variation
    };
    
    const currentImageIndex = useMemo(() => {
      if (!selectedImage || !product.images) return 0;
      return product.images.findIndex(img => img.id === selectedImage.id);
    }, [selectedImage, product.images]);

    const handleNextImage = () => {
        if (!product.images || product.images.length === 0) return;
        const nextIndex = (currentImageIndex + 1) % product.images.length;
        setSelectedImage(product.images[nextIndex]);
    };

    const handlePrevImage = () => {
        if (!product.images || product.images.length === 0) return;
        const prevIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        setSelectedImage(product.images[prevIndex]);
    };

    const maxQuantity = selectedVariation?.manage_stock && selectedVariation.stock_quantity !== null ? selectedVariation.stock_quantity : Infinity;
    const showStockMessage = selectedVariation?.manage_stock && selectedVariation.stock_quantity !== null && selectedVariation.stock_quantity <= 5 && selectedVariation.stock_quantity > 0;
    
    const displayPriceHtml = selectedVariation ? `<span class="amount">${selectedVariation.price}€</span>` : product.price_html;

    const cartProduct: Product = selectedVariation 
    ? { 
        ...product,
        id: selectedVariation.id,
        price: selectedVariation.price,
        price_html: displayPriceHtml,
        related_ids: product.related_ids,
        name: `${product.name} - ${selectedVariation.attributes.map(a => a.option).join(', ')}`
      } 
    : product;

    return (
    <>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Columna Izquierda: Galería de Imágenes */}
        <div className="md:sticky md:top-24 self-start flex flex-col gap-4">
            <div className="group aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                {selectedImage && (
                    <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt || product.name}
                        fill
                        priority
                        className="object-contain rounded-lg p-6"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
                 {product.on_sale && <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-none text-base px-4 py-2">OFERTA</Badge>}

                 {/* Controles de Navegación y Zoom */}
                {product.images && product.images.length > 1 && (
                    <>
                        <Button variant="ghost" size="icon" onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/50 text-gray-900 hover:bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/50 text-gray-900 hover:bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight />
                        </Button>
                    </>
                )}
                
                <Dialog>
                    <DialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-10 w-10 rounded-full bg-white/50 text-gray-900 hover:bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn />
                         </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] p-2 bg-transparent border-none shadow-none">
                         {selectedImage && (
                           <Image
                             src={selectedImage.src}
                             alt={selectedImage.alt || product.name}
                             fill
                             className="object-contain"
                             sizes="90vw"
                           />
                         )}
                    </DialogContent>
                </Dialog>

            </div>
             {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {product.images.map((image) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImage?.id === image.id ? 'border-orange-500' : 'border-transparent hover:border-gray-300'
                            }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="20vw"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Columna Derecha: Información del Producto */}
        <div className="sticky top-24 h-fit">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {product.name}
            </h1>
            
            <div
                className="text-2xl mb-6 flex items-center gap-3 font-bold
                text-[0px] [&_.screen-reader-text]:hidden
                [&>del]:text-lg [&>del]:text-gray-400 [&>del]:line-through
                [&>ins]:text-4xl [&>ins]:text-red-600 [&>ins]:font-black [&>ins]:no-underline
                [&>.amount]:text-4xl [&>.amount]:font-black [&>.amount]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: displayPriceHtml }}
            />
            
            <div className="prose text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: product.short_description || ''}} />
            
            {variations.length > 0 && (
                <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">{variations[0].attributes[0].name}:</p>
                    <div className="flex flex-wrap gap-2">
                        {variations.map((variation) => {
                            const inStock = variation.stock_status === 'instock' && (!variation.manage_stock || (variation.stock_quantity !== null && variation.stock_quantity > 0));
                            const isSelected = selectedVariation?.id === variation.id;

                            return (
                                <button
                                    key={variation.id}
                                    disabled={!inStock}
                                    onClick={() => handleSelectVariation(variation)}
                                    className={`px-4 py-3 border rounded-lg text-sm font-bold transition-all
                                        ${!inStock ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through'
                                        : isSelected ? 'border-orange-500 bg-orange-50 text-orange-600 ring-2 ring-orange-500'
                                        : 'border-gray-200 text-gray-900 hover:border-orange-500 hover:text-orange-600 cursor-pointer'
                                    }`}
                                >
                                    {variation.attributes[0].option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {selectedVariation && (
                 <div className="my-6">
                     <div className="flex items-center gap-4">
                         <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">Cantidad:</p>
                         <div className="flex items-center border border-gray-200 rounded-lg">
                             <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1} className="p-3 text-gray-500 disabled:opacity-50"><Minus size={16}/></button>
                             <span className="px-4 font-bold">{quantity}</span>
                             <button onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))} disabled={quantity >= maxQuantity} className="p-3 text-gray-500 disabled:opacity-50"><Plus size={16}/></button>
                         </div>
                     </div>
                     {showStockMessage && <p className="text-orange-600 text-sm mt-2 font-semibold">¡Solo quedan {selectedVariation.stock_quantity} unidades!</p>}
                 </div>
            )}

            <AddToCartButton product={cartProduct} quantity={quantity} disabled={variations.length > 0 && !selectedVariation} />
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700"><Truck className="text-orange-600" /> Envío Rápido 24/72h</div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700"><ShieldCheck className="text-orange-600" /> Garantía de Calidad</div>
            </div>

            <div className="mt-8 space-y-2">
                <details className="group p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <summary className="font-bold flex justify-between list-none">Descripción del Producto <span className="group-open:rotate-180 transition">▼</span></summary>
                    <div className="mt-4 text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: product.description || ''}} />
                </details>
            </div>
        </div>
      </div>

       <div className="bg-gray-50 rounded-3xl p-8 md:p-12 my-20">
        <h2 className="text-2xl font-black text-center mb-10 flex items-center justify-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" /> OPINIONES DE CLIENTES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomReviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex gap-1 mb-3">
                        {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic text-sm">"{review.text}"</p>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{review.user}</p>
                </div>
            ))}
        </div>
      </div>
      
       {relatedProducts && relatedProducts.length > 0 && (
        <div className="my-20">
          <h2 className="text-3xl font-extrabold font-headline mb-8">También te podría interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
    );
}
