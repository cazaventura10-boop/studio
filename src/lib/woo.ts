import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// This prevents the code from running on the client side
if (typeof process.env.NEXT_PUBLIC_WORDPRESS_URL === 'undefined') {
    throw new Error("WooCommerce environment variables are not set. This code should only run on the server.");
}

const wooApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: "wc/v3"
});

export default wooApi;


// Función para obtener las variaciones completas (con stock) de un producto
export async function getProductVariations(productId: number | string) {
  try {
    const { data } = await wooApi.get(`products/${productId}/variations`, {
      per_page: 100, // Traer todas las tallas posibles
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching variations:', error.message);
    } else {
        console.error('An unknown error occurred while fetching variations.');
    }
    return [];
  }
}