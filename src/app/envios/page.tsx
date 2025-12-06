export default function EnviosPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl py-12 md:py-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">FORMAS DE ENVÍO Y PLAZOS DE ENTREGA</h1>
        </header>

        <div className="prose prose-lg max-w-none text-muted-foreground mx-auto">
          <p><strong>ENVIOS A España península GRATIS:</strong> Pedidos a partir de 60€</p>
          <p><strong>ENVIO A Baleares GRATIS:</strong> Pedidos a partir de 90€</p>
          <p>deporteyaventura garantiza la entrega al transportista, el mismo día de la realización del pedido, de todos aquellos pedidos que se formalicen antes de las 11:00 horas (hora española) de LUNES a VIERNES, siempre que se encuentren en stock, y salvo que se realicen en sábados, domingos y festivos. En cuyo caso el pedido se tramitará el primer día laborable posterior al día de realización del mismo. Además, se ha de tener en cuenta que los plazos se computan en días hábiles y que pueden verse alterados por fiestas locales o nacionales. Y recuerde, si la forma de pago elegida es transferencia bancaria, no se realizará el envío del pedido hasta que no tengamos confirmación bancaria de la transferencia.</p>
          <p>Los pedidos saldrán de tienda de LUNES a VIERNES (excepto sábados, domingos y festivos) a las 12:00 h.</p>
          <p><strong>Atención:</strong> En ningún caso se realizarán envíos a apartados postales.</p>
          
          <h3>Tipos de Envío:</h3>
          <h4>España Península:</h4>
          <p>deporteyaventura.es garantiza las siguientes formas de entrega:</p>
          <table>
            <thead>
              <tr>
                <th>TIEMPO DE ENTREGA</th>
                <th colSpan={2}>COSTE DEL ENVÍO (IVA INCLUIDO)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ENVÍO ESTANDAR 1-2 días laborables*</td>
                <td>Pedidos -60 €</td>
                <td>2,99 €</td>
              </tr>
              <tr>
                <td></td>
                <td>Pedidos +60€</td>
                <td>GRATIS</td>
              </tr>
            </tbody>
          </table>

          <h4>España Baleares:</h4>
          <p>deporteyaventura.es garantiza las siguientes formas de entrega:</p>
          <table>
            <thead>
              <tr>
                <th>TIEMPO DE ENTREGA</th>
                <th colSpan={2}>COSTE DEL ENVÍO (IVA INCLUIDO)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ENTREGA EN DOMICILIO 2-4 días</td>
                <td>Pedidos -90 €</td>
                <td>11,90 €</td>
              </tr>
              <tr>
                <td></td>
                <td>Pedidos +90€</td>
                <td>GRATIS</td>
              </tr>
            </tbody>
          </table>
          <p><strong>OTROS DESTINOS CONSULTAR.EMAIL:</strong> COMERCIO@DEPORTEYAVENTURA.ES</p>
        </div>
      </div>
    </div>
  );
}