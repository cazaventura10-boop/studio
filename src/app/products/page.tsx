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
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [allCategories, setAllCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      
      const categories = ['All', ...Array.from(new Set(fetchedProducts.map(p => p.category)))];
      setAllCategories(categories);

      if (categoryQuery && categories.includes(categoryQuery)) {
        setSelectedCategory(categoryQuery);
      } else {
        setSelectedCategory('All');
      }

      setLoading(false);
    };
    fetchProducts();
  }, [categoryQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.categories.some(cat => cat.name === selectedCategory);
      const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

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
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Our Gear</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                High-quality equipment for your every need.
                </p>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
