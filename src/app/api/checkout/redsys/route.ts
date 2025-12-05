import { NextResponse } from 'next/server';
import crypto from 'crypto';

// --- FUNCIONES DE REDSYS MANUALES ---
function encrypt3DES(str: string, key: string) {
  const secretKey = Buffer.from(key, 'base64');
  const iv = Buffer.alloc(8, 0); // IV ceros
  const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(str, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function mac256(data: string, key: string) {
  const secretKey = Buffer.from(key, 'base64');
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);
  return hmac.digest('base64');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total, shippingCost, firstName } = body; // Añade lo que necesites

    // 1. Validar datos
    if (!total) return NextResponse.json({ error: 'Falta el total' }, { status: 400 });

    // 2. Preparar datos Redsys
    const amount = Math.round(parseFloat(total) * 100).toString(); // En céntimos
    const orderId = Date.now().toString().slice(-10); // ID único temporal
    const merchantCode = process.env.REDSYS_MERCHANT_CODE;
    const terminal = process.env.REDSYS_TERMINAL || '001';
    const secret = process.env.REDSYS_SECRET;
    const urlOk = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/pedido-ok`;
    const urlKo = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/pedido-ko`;

    if (!secret || !merchantCode) {
      return NextResponse.json({ error: 'Faltan claves de Redsys en .env' }, { status: 500 });
    }

    // 3. Crear Objeto de Parámetros
    const merchantParams = {
      DS_MERCHANT_AMOUNT: amount,
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_MERCHANTCODE: merchantCode,
      DS_MERCHANT_CURRENCY: '978', // Euros
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Autorización
      DS_MERCHANT_TERMINAL: terminal,
      DS_MERCHANT_URLOK: urlOk,
      DS_MERCHANT_URLKO: urlKo,
    };

    // 4. Codificar Parámetros (Base64)
    const paramsBase64 = Buffer.from(JSON.stringify(merchantParams)).toString('base64');

    // 5. Calcular Firma (La magia de Redsys)
    // a) Diversificar la clave con el número de pedido
    const orderKey = encrypt3DES(orderId, secret);
    // b) Firmar los parámetros con la clave diversificada
    const signature = mac256(paramsBase64, orderKey);

    return NextResponse.json({
      redsysParams: {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters: paramsBase64,
        Ds_Signature: signature,
      }
    });

  } catch (error: any) {
    console.error('Error Redsys:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
