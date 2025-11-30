export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Kayaking' | 'Camping' | 'Hiking';
  image: string; // id from placeholder-images.json
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
