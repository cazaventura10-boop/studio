'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/app/_components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

function getTagFromProduct(product: Product): string | null {
  const tagMapping: { [key: string]: string } = {
    'Hombre': 'Hombre',
    'Ropa-Hombre': 'Hombre',
    'Pantalones-Hombre': 'Hombre',
    'Pantalones-Invierno-Hombre': 'Hombre',
    'Pantalones-Verano-Hombre': 'Hombre',
    'Pantalones-Largos-Hombre': 'Hombre',
    'Pantalones-Cortos-Hombre': 'Hombre',
    'Chaquetas-Hombre': 'Hombre',
    'Softshell-Hombre': 'Hombre',
    'Cortavientos-Hombre': 'Hombre',
    'Plumas-Hombre': 'Hombre',
    'Chalecos-Hombre': 'Hombre',
    'Sudaderas-Hombre': 'Hombre',
    'Camisetas-Hombre': 'Hombre',
    'Camisetas-Larga-Hombre': 'Hombre',
    'Camisetas-Corta-Hombre': 'Hombre',
    'Calzado-Hombre': 'Hombre',
    'Botas-Hombre': 'Hombre',
    'Zapatillas-Hombre': 'Hombre',
    'Sandalias-Hombre': 'Hombre',

    'Mujer': 'Mujer',
    'Ropa-Mujer': 'Mujer',
    'Pantalones-Mujer': 'Mujer',
    'Pantalones-Temporada-Mujer': 'Mujer',
    'Chaquetas-Mujer': 'Mujer',
    'Sudaderas-Mujer': 'Mujer',
    'Camisetas-Mujer': 'Mujer',
    'Calzado-Mujer': 'Mujer',
    'Botas-Mujer': 'Mujer',
    'Zapatillas-Mujer': 'Mujer',
    'Sandalias-Mujer': 'Mujer',
    'Ninos': 'Ninos',
    'Accesorios': 'Accesorios',
    'Calzado': 'Calzado'
  };

  const productTags = product.tags?.map(t => t.slug) || [];
  for (const tag of productTags) {
    if (tag in tagMapping) {
      return tagMapping[tag];
    }
  }
  return null;
}


function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category');
  const tagQuery = searchParams.get('tag');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [allCategories, setAllCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      
      const categories = ['All', ...Array.from(new Set(fetchedProducts.flatMap(p => p.categories.map(c => c.name))))];
      setAllCategories(categories);

      const currentFilter = categoryQuery || tagQuery;
      if (currentFilter) {
          if (categoryQuery && categories.includes(categoryQuery)) {
            setSelectedCategory(categoryQuery);
          } else {
             // If tag is present, we don't set a category filter button, but let the filtering logic handle it.
             setSelectedCategory('All'); 
          }
      } else {
        setSelectedCategory('All');
      }

      setLoading(false);
    };
    fetchProducts();
  }, [categoryQuery, tagQuery]);
  

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.categories.some(cat => cat.name === selectedCategory);
      const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      const matchesMainCategory = categoryQuery ? product.categories.some(cat => cat.slug === categoryQuery.toLowerCase()) : true;
      const matchesTag = tagQuery ? product.tags?.some(tag => tag.slug === tagQuery.toLowerCase()) : true;
      
      return (selectedCategory === 'All' ? true : matchesCategory) && matchesSearch && matchesMainCategory && matchesTag;
    });
  }, [selectedCategory, searchQuery, products, categoryQuery, tagQuery]);


  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={cn({ 'bg-primary text-primary-foreground': selectedCategory === category })}
          >
            {category}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold font-headline">No Products Found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Nuestro Equipo</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Equipamiento de alta calidad para cada una de tus necesidades.
                </p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
