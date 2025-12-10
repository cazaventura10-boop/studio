import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Las claves se definen aquí para que el middleware pueda usarlas.
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;

let wooApi: WooCommerceRestApi;

try {
  if (!consumerKey || !consumerSecret || !url) {
    if (typeof window !== 'undefined') {
      // Estamos en el cliente, es normal no tener las claves.
    } else {
       console.warn("WooCommerce environment variables are not set. API calls will fail.");
    }
    // @ts-ignore
    wooApi = {} as WooCommerceRestApi; 
  } else {
    wooApi = new WooCommerceRestApi({
      url: url,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      version: "wc/v3",
      // Aumentamos el timeout para peticiones en el servidor (ej. middleware)
      timeout: 20000 
    });
  }
} catch (error) {
    console.error("Failed to initialize WooCommerce API:", error);
    // @ts-ignore
    wooApi = {} as WooCommerceRestApi;
}

export default wooApi;
