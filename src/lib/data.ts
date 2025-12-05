
import type { Product as WooProduct } from '@/lib/types';
import wooApi from '@/lib/woo';

// Definimos una interfaz para los parámetros opcionales
interface GetProductsParams {
  per_page?: number;
  status?: string;
  search?: string;
  category?: string; // puede ser slug, id, o una lista de slugs/ids separada por comas
  tag?: string; // slug de la etiqueta
  on_sale?: boolean; // para filtrar por productos en oferta
  include?: number[]; // para buscar por IDs
}

export async function getProducts(params: GetProductsParams = {}): Promise<WooProduct[]> {
    try {
        const apiParams: { [key: string]: any } = {
            per_page: params.per_page || 50,
            status: params.status || 'publish',
        };

        if (params.on_sale) {
            apiParams.on_sale = true;
        }

        if (params.include && params.include.length > 0) {
            apiParams.include = params.include.join(',');
        }

        if (params.search) {
            apiParams.search = params.search;
        }
        
        if (params.tag) {
            const { data: tagsData } = await wooApi.get("products/tags", { slug: params.tag });
            if (tagsData && tagsData.length > 0) {
                apiParams.tag = tagsData[0].id;
            } else {
                return [];
            }
        }

        // --- LÓGICA DE CATEGORÍAS CORREGIDA ---
        if (params.category) {
            if (params.category.includes(',')) {
                // Múltiples categorías: hacer una llamada por cada una
                const categorySlugs = params.category.split(',');
                let allProducts: WooProduct[] = [];
                
                for (const slug of categorySlugs) {
                    const { data: categoryData } = await wooApi.get("products/categories", { slug: slug.trim() });
                    if (categoryData && categoryData.length > 0) {
                        const categoryId = categoryData[0].id;
                        const { data: productsData } = await wooApi.get("products", { ...apiParams, category: categoryId });
                        allProducts = allProducts.concat(productsData);
                    }
                }
                // Eliminar duplicados si un producto está en varias categorías
                const uniqueProducts = allProducts.filter((product, index, self) =>
                    index === self.findIndex((p) => p.id === product.id)
                );
                return mapWooProducts(uniqueProducts);

            } else {
                // Una sola categoría
                const { data: categoryData } = await wooApi.get("products/categories", { slug: params.category });
                if (categoryData && categoryData.length > 0) {
                    apiParams.category = categoryData[0].id;
                } else if (!isNaN(Number(params.category))) {
                   apiParams.category = params.category;
                } else {
                    return []; // Si no se encuentra la categoría
                }
            }
        }
        
        const { data } = await wooApi.get("products", apiParams);
        return mapWooProducts(data);

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching products from WooCommerce:', error.message);
        } else {
            console.error('An unknown error occurred while fetching products.');
        }
        return [];
    }
}

// Helper para mapear los datos de la API
function mapWooProducts(data: any[]): WooProduct[] {
    return data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        short_description: product.short_description,
        price: product.price,
        price_html: product.price_html,
        on_sale: product.on_sale,
        sale_price: product.sale_price,
        regular_price: product.regular_price,
        related_ids: product.related_ids,
        upsell_ids: product.upsell_ids,
        cross_sell_ids: product.cross_sell_ids,
        category: product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
        images: product.images,
        permalink: product.permalink,
        categories: product.categories,
        tags: product.tags,
        attributes: product.attributes,
    }));
}


export async function getProduct(id: string): Promise<WooProduct | null> {
    try {
        const { data } = await wooApi.get(`products/${id}`);
        if (!data) return null;

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            short_description: data.short_description,
            price: data.price,
            price_html: data.price_html,
            on_sale: data.on_sale,
            sale_price: data.sale_price,
            regular_price: data.regular_price,
            related_ids: data.related_ids,
            upsell_ids: data.upsell_ids,
            cross_sell_ids: data.cross_sell_ids,
            category: data.categories.length > 0 ? data.categories[0].name : 'Uncategorized',
            images: data.images,
            permalink: data.permalink,
            categories: data.categories,
            tags: data.tags,
            attributes: data.attributes,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-the-climb',
    title: 'Dominando la Escalada: Guía para Principiantes',
    author: 'Alex Johnson',
    date: '2024-07-15T10:00:00Z',
    excerpt: 'La escalada en roca es un deporte emocionante que combina la fuerza física con la resolución de problemas mentales. Esta guía cubre los conceptos básicos para que comiences tu viaje vertical.',
    content: `
      <h2>La escalada en roca es un deporte emocionante que combina la fuerza física con la resolución de problemas mentales.</h2>
      <p>Ya sea que estés escalando una pared interior o una pared de roca natural, los principios de equilibrio, técnica y seguridad son primordiales. Esta guía cubre los conceptos básicos para que comiences tu viaje vertical.</p>
      <h3>Equipo Esencial</h3>
      <p>Antes de empezar, necesitarás algo de equipo básico. Esto incluye zapatillas de escalada para el agarre, un arnés para asegurarte a la cuerda, un dispositivo de aseguramiento para controlar la cuerda y una bolsa de magnesio para mantener tus manos secas. Alquilar el equipo es una gran opción para tus primeras escaladas.</p>
      <h3>Técnicas Básicas</h3>
      <p>Concéntrate en usar las piernas para impulsarte hacia arriba, en lugar de tirar con los brazos. Mantén los brazos rectos siempre que sea posible para conservar energía. Busca apoyos para los pies y planifica tu ruta con algunos movimientos de antelación. Confiar en tus pies es uno de los mayores obstáculos para los principiantes.</p>
      <h3>La Seguridad es lo Primero</h3>
      <p>Escala siempre con un compañero y revisen dos veces los nudos y el arnés del otro. Aprende la técnica de aseguramiento adecuada y las llamadas de comunicación. Nunca escales por encima de tu nivel de habilidad sin la supervisión o instrucción adecuadas.</p>
    `,
    category: 'Climbing',
    image: 'blog-climbing',
  },
  {
    slug: 'top-5-mountain-bike-trails',
    title: 'Los 5 Mejores Senderos de Bici de Montaña para Amantes de la Adrenalina',
    author: 'Maria Garcia',
    date: '2024-07-10T14:30:00Z',
    excerpt: '¿Buscas tu próxima dosis de adrenalina sobre dos ruedas? Hemos compilado una lista de los senderos de bicicleta de montaña más impresionantes y desafiantes del mundo.',
    content: `
      <p>¿Buscas tu próxima dosis de adrenalina sobre dos ruedas? Hemos compilado una lista de los senderos de bicicleta de montaña más impresionantes y desafiantes que deberían estar en la lista de deseos de todo entusiasta.</p>
      <h3>1. The Whole Enchilada, Utah, EE. UU.</h3>
      <p>Este sendero ofrece un descenso masivo con un terreno increíblemente variado, desde bosques alpinos hasta desiertos de roca lisa. Es una verdadera prueba de resistencia y habilidad técnica.</p>
      <h3>2. A-Line, Whistler, Canadá</h3>
      <p>Famoso en el mundo del ciclismo de montaña, A-Line es el sendero de descenso por excelencia, lleno de mesetas masivas y bermas perfectamente esculpidas. Es pura diversión a alta velocidad.</p>
      <h3>3. Mefjellet, Noruega</h3>
      <p>Para aquellos que aman los paisajes épicos con sus paseos, este sendero en Noruega cumple. Espera impresionantes vistas de fiordos y un descenso largo y técnico que te mantendrá alerta.</p>
      <h3>4. Fort William, Escocia</h3>
      <p>Sede de una pista de descenso de la Copa del Mundo de la UCI, Fort William no es para los débiles de corazón. Es rocoso, lleno de raíces e implacablemente empinado.</p>
      <h3>5. Camino de los Yungas, Bolivia</h3>
      <p>Conocido como el "Camino de la Muerte", esto es más una aventura que un paseo técnico. El camino estrecho y pegado al acantilado ofrece vistas inigualables y una seria dosis de adrenalina.</p>
    `,
    category: 'Cycling',
    image: 'blog-cycling',
  },
  {
    slug: 'the-art-of-ultralight-hiking',
    title: 'El Arte del Senderismo Ultraligero: Empaca Menos, Vive Más',
    author: 'Sam Roberts',
    date: '2024-06-28T09:00:00Z',
    excerpt: 'El senderismo ultraligero es una filosofía que puede transformar tus experiencias al aire libre. Al seleccionar cuidadosamente tu equipo, puedes reducir el peso de tu mochila y disfrutar más del sendero.',
    content: `
      <p>El senderismo ultraligero es una filosofía que puede transformar tus experiencias al aire libre. El objetivo es llevar la carga más ligera posible sin comprometer la seguridad o la comodidad. Al seleccionar cuidadosamente tu equipo, puedes reducir el peso de tu mochila y disfrutar más del sendero, moviéndote más rápido y con menos tensión en tu cuerpo.</p>
      <h3>Los Tres Grandes</h3>
      <p>Los artículos más pesados en la mayoría de las mochilas son el refugio, el sistema para dormir (saco y colchoneta) y la propia mochila. Centrarse en opciones ligeras para estos "Tres Grandes" proporciona el ahorro de peso más significativo. Busca tiendas de campaña hechas con Dyneema Composite Fabric, sacos de dormir tipo edredón y mochilas minimalistas sin marco.</p>
      <h3>Equipo Multiusos</h3>
      <p>Cada artículo debe ser examinado. ¿Puede un artículo servir para múltiples propósitos? Por ejemplo, tus bastones de trekking también se pueden usar como postes para tu tienda. Una bandana puede ser un agarrador de ollas, una toalla y un pre-filtro de agua.</p>
      <h3>Abraza el Minimalismo</h3>
      <p>¿Realmente necesitas esa silla de campamento, un juego extra de ropa o un cuchillo grande? Cuestiona cada artículo que empacas. Cuanto menos lleves, más podrás conectar con tu entorno. Se trata de cambiar tu mentalidad de "¿y si necesito esto?" a "¿puedo arreglármelas sin esto?". Este enfoque no solo aligera tu carga, sino que also simplifica toda tu experiencia de senderismo.</p>
    `,
    category: 'Hiking',
    image: 'blog-trail',
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string; // ISO 8601 format
  excerpt: string;
  content: string;
  category: 'Climbing' | 'Cycling' | 'Hiking';
  image: string; // id from placeholder-images.json
};

