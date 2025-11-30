import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'vertical' | 'horizontal';
}

export function BlogPostCard({ post, variant = 'vertical' }: BlogPostCardProps) {
  const image = placeholderImagesById[post.image];
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  const content = (
    <>
      <div className={cn("relative shrink-0", {
          'aspect-[16/9] w-full': variant === 'vertical',
          'aspect-[4/3] w-full md:w-1/3 lg:w-2/5': variant === 'horizontal'
      })}>
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={image.imageHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className={cn("flex flex-col flex-grow justify-between p-6", {
          'md:w-2/3 lg:w-3/5': variant === 'horizontal'
      })}>
        <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span>{formattedDate}</span>
            </div>
            <h3 className="font-headline font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                {post.title}
            </h3>
            <p className="mt-2 text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-accent group-hover:underline">Read more &rarr;</p>
      </CardContent>
    </>
  );

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className={cn(
        "overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1", 
        {"flex flex-col": variant === 'vertical', "flex flex-col md:flex-row": variant === 'horizontal'}
      )}>
        {content}
      </Card>
    </Link>
  );
}
