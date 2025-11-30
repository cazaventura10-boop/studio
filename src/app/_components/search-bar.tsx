"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!debouncedSearchTerm) {
      current.delete('q');
    } else {
      current.set('q', debouncedSearchTerm);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    if (pathname.startsWith('/products') || pathname.startsWith('/blog')) {
      router.push(`${pathname}${query}`, { scroll: false });
    }

  }, [debouncedSearchTerm, pathname, router, searchParams]);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [pathname, searchParams]);

  const showSearch = pathname.startsWith('/products') || pathname.startsWith('/blog') || pathname === '/';

  if (!showSearch) {
    return null;
  }
  
  const handleSearchFocus = () => {
    if(!pathname.startsWith('/products') && !pathname.startsWith('/blog')) {
      router.push('/products');
    }
  }

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products & articles..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleSearchFocus}
      />
    </div>
  );
}
