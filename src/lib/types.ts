




export interface Product {
  id: number;
  name: string;
  description: string;
  short_description?: string;
  price: string;
  price_html: string;
  on_sale: boolean;
  sale_price: string;
  regular_price: string;
  category: string; 
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  permalink: string;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
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
  attributes: {
    id: number;
    name: string;
    options: string[];
    variation: boolean;
  }[];
}

export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  manage_stock: boolean;
  attributes: {
    id: number;
    name: string;
    option: string;
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
