'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/app/_components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

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
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        
        const categories = ['All', ...Array.from(new Set(fetchedProducts.flatMap(p => p.categories.map(c => c.name))))];
        setAllCategories(categories);

      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  useEffect(() => {
      // Sincroniza el botón de categoría activo con los parámetros de la URL
      if (categoryQuery && allCategories.includes(categoryQuery)) {
          setSelectedCategory(categoryQuery);
      } else if (!categoryQuery && !tagQuery) {
          // Si no hay filtros de URL, resetea al botón "All"
          setSelectedCategory('All');
      } else if (tagQuery) {
          // Si hay un tag, es probable que no queramos un botón de categoría activo
          setSelectedCategory('All');
      }
  }, [categoryQuery, tagQuery, allCategories]);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    
    return products.filter(product => {
      // 1. Filtro por búsqueda de texto (q)
      const matchesSearch = searchQuery 
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) 
        : true;
      
      // 2. Filtro por categoría desde la URL (category)
      const matchesCategoryQuery = categoryQuery 
        ? product.categories.some(cat => cat.slug.toLowerCase() === categoryQuery.toLowerCase()) 
        : true;

      // 3. Filtro por etiqueta desde la URL (tag)
      const matchesTagQuery = tagQuery 
        ? product.tags?.some(tag => tag.slug.toLowerCase() === tagQuery.toLowerCase()) 
        : true;
        
      // 4. Filtro por el botón de categoría seleccionado en la UI
      const matchesCategoryButton = selectedCategory === 'All' || product.categories.some(cat => cat.name === selectedCategory);

      // Si la URL tiene filtros de categoría o tag, estos tienen prioridad.
      if (categoryQuery || tagQuery) {
        return matchesSearch && matchesCategoryQuery && matchesTagQuery;
      }
      
      // Si no, se usa el filtro del botón y la búsqueda.
      return matchesCategoryButton && matchesSearch;
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
          <h2 className="text-2xl font-semibold font-headline">No se encontraron productos</h2>
          <p className="mt-2 text-muted-foreground">Prueba a cambiar los filtros o la búsqueda.</p>
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
            <Suspense fallback={
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
            }>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
