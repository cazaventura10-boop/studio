import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blogPosts, products } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { ProductCard } from './_components/product-card';
import { BlogPostCard } from './_components/blog-post-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImagesById['hero-background-mountaineer'];
  const featuredProducts = products.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center text-white bg-background">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter uppercase">
            Tu Próxima Cima
          </h1>
          <p className="mt-2 text-4xl md:text-5xl font-extrabold font-headline tracking-tighter uppercase">
            Te Espera
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-orange-500 text-white font-bold hover:bg-orange-500/90 rounded-full px-10 py-6 text-lg border-2 border-orange-400">
              <Link href="/products">EXPLORAR NOVEDADES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Productos Destacados</h2>
            <Button variant="link" asChild className="text-accent hover:text-accent/80">
                <Link href="/products">
                    Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Del Blog</h2>
             <Button variant="link" asChild className="text-accent hover:text-accent/80">
                <Link href="/blog">
                    Leer Más <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
