import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wooApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: "wc/v3",
  timeout: 20000 
});

export default wooApi;
