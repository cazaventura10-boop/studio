import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blogPosts, products } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { ProductCard } from './_components/product-card';
import { BlogPostCard } from './_components/blog-post-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImagesById['hero-background'];
  const featuredProducts = products.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            Your Next Adventure Awaits
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
            Discover top-quality gear and inspiring stories for your outdoor pursuits.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/products">Shop Gear</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/blog">Read Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
            <Button variant="link" asChild className="text-accent hover:text-accent/80">
                <Link href="/products">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-3xl md:text-4xl font-bold font-headline">From the Blog</h2>
             <Button variant="link" asChild className="text-accent hover:text-accent/80">
                <Link href="/blog">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
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
