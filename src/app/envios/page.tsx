import { Package, RefreshCw, Truck } from 'lucide-react';

export default function EnviosPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl py-12 md:py-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Envíos y Devoluciones</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Toda la información que necesitas sobre cómo recibir y devolver tus pedidos.
          </p>
        </header>

        <div className="space-y-12">
          {/* SECCIÓN DE ENVÍOS */}
          <section id="envios">
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 text-primary p-4 rounded-full flex-shrink-0">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-3">Política de Envíos</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>Queremos que disfrutes de tu equipamiento lo antes posible. Por eso, procesamos todos los pedidos con la máxima velocidad.</p>
                  <ul>
                    <li><strong>Península (España y Portugal):</strong> Envío en 24/48 horas laborables.</li>
                    <li><strong>Coste de envío:</strong> 2,99€ para pedidos inferiores a 60€. <strong>Gratis para pedidos superiores a 60€.</strong></li>
                    <li><strong>Baleares, Canarias, Ceuta y Melilla:</strong> Consultar condiciones y plazos de entrega al finalizar la compra.</li>
                  </ul>
                  <p>Recibirás un correo electrónico con un número de seguimiento tan pronto como tu pedido salga de nuestro almacén para que puedas saber dónde está en todo momento.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN DE DEVOLUCIONES */}
          <section id="devoluciones">
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 text-primary p-4 rounded-full flex-shrink-0">
                <RefreshCw className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-3">Política de Devoluciones</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>Si no estás 100% satisfecho con tu compra, ¡no hay problema! Tienes 30 días naturales desde la recepción del pedido para realizar una devolución.</p>
                   <p>Condiciones para la devolución:</p>
                  <ul>
                    <li>El producto debe estar en perfectas condiciones, sin usar y con su embalaje y etiquetas originales.</li>
                    <li>Los productos de higiene o seguridad no pueden ser devueltos una vez abiertos.</li>
                    <li>Para iniciar una devolución, por favor, <a href="/contacto">contacta con nosotros</a> indicando tu número de pedido y el motivo.</li>
                  </ul>
                  <p>Una vez que recibamos y verifiquemos el estado del producto, procederemos al reembolso del importe a través del mismo método de pago utilizado en la compra. Los costes de envío de la devolución corren por cuenta del cliente, a menos que el producto sea defectuoso o incorrecto.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
