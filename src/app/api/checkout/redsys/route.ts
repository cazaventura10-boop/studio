import { NextResponse } from 'next/server';
import wooApi from '@/lib/woo';
import Redsys from 'redsys-easy';

// Función para validar los datos de entrada
const validateInput = (data: any) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zip', 'cartItems', 'total', 'shippingCost', 'codSurcharge'];
    for (const field of requiredFields) {
        if (!data[field]) {
            console.error(`Missing required field: ${field}`);
            return false;
        }
    }
    if (!Array.isArray(data.cartItems) || data.cartItems.length === 0) {
        console.error('Cart items are empty or not an array');
        return false;
    }
    return true;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    if (!validateInput(body)) {
        return NextResponse.json({ error: 'Invalid input data.' }, { status: 400 });
    }

    const { firstName, lastName, email, phone, address, city, zip, cartItems, total, shippingCost, codSurcharge } = body;

    // 1. Crear el pedido en WooCommerce
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
        country: 'ES', // Asumimos España
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
        console.error("WooCommerce order creation failed", wooOrder);
        throw new Error('Failed to create order in WooCommerce.');
    }

    // 2. Generar los parámetros para Redsys
    const redsys = new Redsys({
        secret: process.env.REDSYS_SECRET!,
        merchantCode: process.env.REDSYS_MERCHANT_CODE!,
        terminal: process.env.REDSYS_TERMINAL!,
        // sandbox: process.env.NODE_ENV !== 'production' // Opcional: true para entorno de pruebas
    });

    const amountInCents = Math.round(total * 100);

    const params = redsys.createRedirectParameters({
        DS_MERCHANT_AMOUNT: amountInCents,
        DS_MERCHANT_ORDER: String(wooOrder.id).padStart(4, '0'), // El número de pedido, con ceros a la izquierda si es necesario
        DS_MERCHANT_CURRENCY: '978', // 978 para EUR
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout/order-received/${wooOrder.id}/?key=${wooOrder.order_key}`,
        DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/checkout`,
    });

    const signature = redsys.createSignature(params.DS_MERCHANT_PARAMETERS);

    return NextResponse.json({
      ...params,
      DS_SIGNATURE: signature,
      url: redsys.getRedirectUrl(),
    });

  } catch (error) {
    console.error("Error processing Redsys payment:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to process payment.', details: errorMessage }, { status: 500 });
  }
}
