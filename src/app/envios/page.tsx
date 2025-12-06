import { Package, RefreshCw, Truck } from 'lucide-react';

export default function EnviosPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl py-12 md:py-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Envíos y Devoluciones</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Información sobre la entrega y cambios de tus pedidos.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-muted-foreground mx-auto space-y-12">
          
          {/* SECCIÓN DE ENVÍOS */}
          <section id="envios">
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 text-primary p-4 rounded-full flex-shrink-0">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h2 className="font-headline">Formas de Envío y Plazos de Entrega</h2>
                <p>Deporteyaventura garantiza la entrega al transportista, el mismo día de la realización del pedido, de todos aquellos pedidos que se formalicen antes de las <strong>11:00 horas</strong> (hora española) de LUNES a VIERNES, siempre que se encuentren en stock, y salvo que se realicen en sábados, domingos y festivos. En cuyo caso el pedido se tramitará el primer día laborable posterior al día de realización del mismo.</p>
                <p>Los plazos se computan en días hábiles y pueden verse alterados por fiestas locales o nacionales. Si la forma de pago elegida es transferencia bancaria, no se realizará el envío hasta tener confirmación bancaria.</p>
                <p><strong>Atención:</strong> En ningún caso se realizarán envíos a apartados postales.</p>

                <h3 className="font-headline text-xl mt-8">España Península</h3>
                <div className="border rounded-lg overflow-hidden my-4">
                  <table className="w-full text-left">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 font-semibold">Tipo de Envío</th>
                        <th className="p-3 font-semibold">Tiempo de Entrega</th>
                        <th className="p-3 font-semibold text-right">Coste (IVA incl.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Pedidos inferiores a 60€</td>
                        <td className="p-3">1-3 días laborables*</td>
                        <td className="p-3 text-right font-bold">2,99 €</td>
                      </tr>
                      <tr className="border-t bg-green-50">
                        <td className="p-3 font-semibold">Pedidos a partir de 60€</td>
                        <td className="p-3">1-3 días laborables*</td>
                        <td className="p-3 text-right font-bold text-green-700">GRATIS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-headline text-xl mt-8">España Baleares</h3>
                 <div className="border rounded-lg overflow-hidden my-4">
                  <table className="w-full text-left">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 font-semibold">Tipo de Envío</th>
                        <th className="p-3 font-semibold">Tiempo de Entrega</th>
                        <th className="p-3 font-semibold text-right">Coste (IVA incl.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Pedidos inferiores a 90€</td>
                        <td className="p-3">2-4 días</td>
                        <td className="p-3 text-right font-bold">11,90 €</td>
                      </tr>
                      <tr className="border-t bg-green-50">
                        <td className="p-3 font-semibold">Pedidos a partir de 90€</td>
                        <td className="p-3">2-4 días</td>
                        <td className="p-3 text-right font-bold text-green-700">GRATIS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p><strong>Otros destinos:</strong> Para consultar otros destinos, por favor contacta a <a href="mailto:comercio@deporteyaventura.es">comercio@deporteyaventura.es</a>.</p>
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
                <h2 className="font-headline">Devoluciones y Cambios</h2>
                <p>Si por cualquier motivo no quedas satisfecho con tu pedido, tienes un plazo de <strong>10 días naturales</strong> a contar desde la fecha de entrega del pedido. Durante Navidad, el plazo se amplía para poder realizar cambios después de Reyes.</p>
                
                <h3 className="font-headline text-xl mt-6">Condiciones de Devolución</h3>
                <ul>
                  <li>El producto debe estar en perfectas condiciones, sin usar (más allá de la mera comprobación), con su embalaje original, garantías, etiquetas e instrucciones.</li>
                  <li>El envío de la devolución hasta nuestro almacén corre a cargo del cliente.</li>
                  <li>Si los gastos de envío iniciales fueron gratuitos, se descontarán 5€ del importe a devolver.</li>
                  <li>En caso de cambio por motivos no imputables a deporteyaventura.es, los gastos de recogida y nuevo envío serán de 10€, a cargo del comprador.</li>
                  <li>No se admiten devoluciones en ropa interior y GPS/Pulsómetros que se hayan puesto en funcionamiento.</li>
                </ul>

                 <h3 className="font-headline text-xl mt-6">Proceso de Devolución</h3>
                 <p>Antes de enviar cualquier producto, es imprescindible contactarnos por WhatsApp al <a href="https://wa.me/34661714408">661 714 408</a>.</p>
                 <p>La dirección para el envío de devoluciones es:</p>
                 <div className="p-4 border-l-4 border-primary bg-muted/50 my-4">
                    <strong>Mario Ruiz Lopez</strong><br/>
                    C/ Castelar 15<br/>
                    46357, La Portera (Valencia)
                 </div>
                 <p>Es muy importante que nos devuelvas los productos perfectamente embalados. Si resultan dañados debido a un embalaje inapropiado, el producto sufrirá una depreciación.</p>
                 <p>Una vez recibamos la mercancía y comprobemos su estado, procederemos al reintegro del importe o al envío del nuevo producto. Si pagaste por tarjeta, ten en cuenta que tu banco puede tardar hasta el mes siguiente en reflejar la devolución.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}