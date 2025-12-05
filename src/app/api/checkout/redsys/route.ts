import { NextResponse } from 'next/server';
import Redsys from 'redsys-easy';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { config } from 'dotenv';

// Forzar la carga de variables de entorno desde .env
config();

// Función para validar los datos de entrada
const validateInput = (data: any) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zip', 'cartItems', 'total', 'shippingCost', 'codSurcharge'];
    for (const field of requiredFields) {
        // Se usa `in` para comprobar si la propiedad existe, incluso si su valor es 0 (como shippingCost)
        if (!(field in data)) {
            console.error(`Validation Error: Missing required field: ${field}`);
            return `Falta el campo requerido: ${field}`;
        }
    }
    if (!Array.isArray(data.cartItems) || data.cartItems.length === 0) {
        console.error('Validation Error: Cart items are empty or not an array');
        return 'El carrito está vacío o no es válido.';
    }
    return null; // No hay errores de validación
};

export async function POST(request: Request) {
  console.log("\n--- [REDSYS API] ---");
  console.log("1. Recibida nueva petición POST a /api/checkout/redsys");

  // 1. Verificación de las claves de Redsys
  const { REDSYS_SECRET, REDSYS_MERCHANT_CODE, REDSYS_TERMINAL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET, NEXT_PUBLIC_WORDPRESS_URL } = process.env;
  if (!REDSYS_SECRET || !REDSYS_MERCHANT_CODE || !REDSYS_TERMINAL) {
    console.error("CRITICAL ERROR: Las variables de entorno de Redsys no están configuradas.");
    return NextResponse.json({ error: 'La configuración del servidor para pagos no está completa.', details: 'Faltan claves de Redsys.' }, { status: 500 });
  }
   if (!WOOCOMMERCE_CONSUMER_KEY || !WOOCOMMERCE_CONSUMER_SECRET || !NEXT_PUBLIC_WORDPRESS_URL) {
    console.error("CRITICAL ERROR: Las variables de entorno de WooCommerce no están configuradas.");
    return NextResponse.json({ error: 'La configuración del servidor para pedidos no está completa.', details: 'Faltan claves de WooCommerce.' }, { status: 500 });
  }
  console.log("1.1. Verificación de claves de Redsys y WooCommerce: OK");

  // Inicializar la API de WooCommerce aquí
  const wooApi = new WooCommerceRestApi({
      url: NEXT_PUBLIC_WORDPRESS_URL!,
      consumerKey: WOOCOMMERCE_CONSUMER_KEY!,
      consumerSecret: WOOCOMMERCE_CONSUMER_SECRET!,
      version: "wc/v3",
      queryStringAuth: true // Forzar autenticación por query string para evitar problemas de 401
  });


  try {
    const body = await request.json();
    console.log("2. Cuerpo de la petición (body) recibido:", body);

    // 2. Validación de los datos de entrada
    const validationError = validateInput(body);
    if (validationError) {
        return NextResponse.json({ error: 'Datos de entrada no válidos.', details: validationError }, { status: 400 });
    }
    console.log("2.1. Validación de datos de entrada: OK");

    const { firstName, lastName, email, phone, address, city, zip, cartItems, total, shippingCost, codSurcharge } = body;

    // 3. Crear el pedido en WooCommerce
    console.log("3. Intentando crear pedido en WooCommerce...");
    const orderData = {
      payment_method: 'redsys',
      payment_method_title: 'Tarjeta de Crédito/Débito',
      set_paid: false,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: city,
        postcode: zip,
        country: 'ES',
        email: email,
        phone: phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: city,
        postcode: zip,
        country: 'ES',
      },
      line_items: cartItems.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Gastos de Envío',
          total: String(shippingCost),
        },
      ],
      fee_lines: codSurcharge > 0 ? [
        {
            name: 'Recargo Contrareembolso',
            total: String(codSurcharge),
            taxable: false
        }
      ] : [],
    };

    const { data: wooOrder } = await wooApi.post('orders', orderData);
    
    if (!wooOrder || !wooOrder.id) {
        console.error("ERROR: La creación del pedido en WooCommerce falló. Respuesta:", wooOrder);
        throw new Error('No se pudo crear el pedido en WooCommerce.');
    }
    console.log(`3.1. Pedido creado en WooCommerce con ID: ${wooOrder.id}`);

    // 4. Generar los parámetros para Redsys
    console.log("4. Generando parámetros de Redsys...");
    const redsys = new Redsys({
        secret: REDSYS_SECRET,
        merchantCode: REDSYS_MERCHANT_CODE,
        terminal: REDSYS_TERMINAL,
        sandbox: process.env.NODE_ENV !== 'production'
    });

    const amountInCents = Math.round(total * 100);

    const params = redsys.createRedirectParameters({
        DS_MERCHANT_AMOUNT: amountInCents,
        DS_MERCHANT_ORDER: String(wooOrder.id).padStart(4, '0'),
        DS_MERCHANT_CURRENCY: '978', // 978 para EUR
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout/order-received/${wooOrder.id}/?key=${wooOrder.order_key}`,
        DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout`,
    });

    const signature = redsys.createSignature(params.DS_MERCHANT_PARAMETERS);
    console.log("4.1. Firma de Redsys generada correctamente.");

    // 5. Devolver la respuesta JSON
    const responsePayload = {
      ...params,
      DS_SIGNATURE: signature,
      url: redsys.getRedirectUrl(),
    };
    console.log("5. Enviando payload de Redsys al frontend.");
    return NextResponse.json(responsePayload);

  } catch (error: any) {
    console.error("--- ERROR EN EL PROCESO DE PAGO REDSYS ---");

    // Mejorar el log de errores de WooCommerce
    if (error.response && error.response.data) {
        console.error("Detalles del error de WooCommerce:", JSON.stringify(error.response.data, null, 2));
    } else {
        console.error(error);
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Ocurrió un error desconocido.';
    // Siempre devolver un JSON, incluso en caso de error catastrófico
    return NextResponse.json({ error: 'No se pudo procesar el pago.', details: errorMessage }, { status: error.response?.status || 500 });
  }
}
