export default function PrivacidadPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl py-12 md:py-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Política de Privacidad y Cookies</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Cómo gestionamos tus datos y utilizamos cookies.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-muted-foreground mx-auto space-y-8">
          <section id="privacidad">
            <h2 className="font-headline">Política de Privacidad</h2>
            <p><strong>Deporte y Aventura S.L.</strong> se compromete a proteger y respetar tu privacidad. Esta política establece la base sobre la cual cualquier dato personal que recopilemos de ti, o que tú nos proporciones, será procesado por nosotros.</p>
            
            <h3 className="font-headline text-xl">1. Información que podemos recopilar de ti</h3>
            <p>Podemos recopilar y procesar los siguientes datos sobre ti: información que proporcionas al rellenar formularios en nuestro sitio (ej. al registrarte, realizar un pedido), detalles de las transacciones que realizas a través de nuestro sitio y detalles de tus visitas a nuestro sitio.</p>
            
            <h3 className="font-headline text-xl">2. Cómo usamos tu información</h3>
            <p>Utilizamos la información que tenemos sobre ti para: asegurar que el contenido de nuestro sitio se presenta de la manera más efectiva para ti, para proporcionarte información, productos o servicios que nos solicites o que consideremos que pueden interesarte, y para cumplir con nuestras obligaciones derivadas de cualquier contrato celebrado entre tú y nosotros.</p>
            
            <h3 className="font-headline text-xl">3. Tus derechos</h3>
            <p>Tienes derecho a solicitarnos que no procesemos tus datos personales con fines de marketing. Puedes ejercer tu derecho a prevenir dicho procesamiento contactándonos en legal@deporteyaventura.es. Nuestro sitio puede contener enlaces a sitios web de terceros; si sigues un enlace a cualquiera de estos sitios web, ten en cuenta que tienen sus propias políticas de privacidad y que no aceptamos ninguna responsabilidad u obligación por estas políticas.</p>
          </section>

          <section id="cookies">
            <h2 className="font-headline">Política de Cookies</h2>
            <p>Nuestro sitio web utiliza cookies para distinguirte de otros usuarios de nuestro sitio. Esto nos ayuda a proporcionarte una buena experiencia cuando navegas por nuestro sitio web y también nos permite mejorarlo.</p>
            
            <h3 className="font-headline text-xl">1. ¿Qué son las cookies?</h3>
            <p>Una cookie es un pequeño archivo de letras y números que almacenamos en tu navegador o en el disco duro de tu ordenador si estás de acuerdo. Las cookies contienen información que se transfiere al disco duro de tu ordenador.</p>
            
            <h3 className="font-headline text-xl">2. Tipos de cookies que utilizamos</h3>
            <ul>
              <li><strong>Cookies estrictamente necesarias:</strong> Son cookies necesarias para el funcionamiento de nuestro sitio web. Incluyen, por ejemplo, cookies que te permiten iniciar sesión en áreas seguras de nuestro sitio web o utilizar un carrito de la compra.</li>
              <li><strong>Cookies analíticas/de rendimiento:</strong> Nos permiten reconocer y contar el número de visitantes y ver cómo los visitantes se mueven por nuestro sitio web cuando lo están utilizando.</li>
              <li><strong>Cookies de funcionalidad:</strong> Se utilizan para reconocerte cuando regresas a nuestro sitio web.</li>
            </ul>
            
            <h3 className="font-headline text-xl">3. Cómo bloquear cookies</h3>
            <p>Puedes bloquear las cookies activando la configuración en tu navegador que te permite rechazar la configuración de todas o algunas cookies. Sin embargo, si utilizas la configuración de tu navegador para bloquear todas las cookies (incluidas las esenciales), es posible que no puedas acceder a todo o parte de nuestro sitio.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
