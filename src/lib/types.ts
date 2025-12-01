export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string; // This will now be a string from WooCommerce
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  permalink: string;
  categories: {
      id: number;
      name: string;
      slug: string;
  }[];
  tags?: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string; // ISO 8601 format
  excerpt: string;
  content: string;
  category: 'Climbing' | 'Cycling' | 'Hiking';
  image: string; // id from placeholder-images.json
}
