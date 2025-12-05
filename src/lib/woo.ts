import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

let wooApi: WooCommerceRestApi;

try {
  // This prevents the code from running on the client side by checking for server-only variables
  if (typeof process.env.WOOCOMMERCE_CONSUMER_KEY === 'undefined' || typeof process.env.WOOCOMMERCE_CONSUMER_SECRET === 'undefined' || typeof process.env.NEXT_PUBLIC_WORDPRESS_URL === 'undefined') {
    // We are on the client side or env vars are not set, don't initialize.
    // console.log("WooCommerce API not initialized on the client or missing env vars.");
  } else {
    wooApi = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_URL!,
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      version: "wc/v3"
    });
  }
} catch (error) {
    console.error("Failed to initialize WooCommerce API:", error);
}


// @ts-ignore
export default wooApi;
