import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AISummarizer } from '@/app/_components/ai-summarizer';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = placeholderImagesById[post.image];
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  return (
    <article>
      <header className="container py-12 md:py-16 text-center">
        <Badge variant="outline" className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">{post.title}</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          By {post.author} on {formattedDate}
        </p>
      </header>

      <div className="relative w-full h-[30vh] md:h-[50vh] mb-12">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={image.imageHint}
        />
      </div>

      <div className="container max-w-4xl mx-auto pb-16">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        <AISummarizer contentToSummarize={post.content} buttonText="Summarize Article" />
      </div>
    </article>
  );
}
