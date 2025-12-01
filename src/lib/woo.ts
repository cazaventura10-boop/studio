import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// This prevents the code from running on the client side
if (typeof process.env.WOOCOMMERCE_CONSUMER_KEY === 'undefined') {
    throw new Error("WooCommerce environment variables are not set. This code should only run on the server.");
}

const wooApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: "wc/v3"
});

export default wooApi;
