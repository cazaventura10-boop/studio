export default function EnviosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl pt-32">
      <h1 className="text-4xl font-black mb-8 uppercase text-center">Envíos y Devoluciones</h1>
      
      <div className="prose prose-lg mx-auto text-gray-700 space-y-8">
        
        {/* BLOQUE DEVOLUCIONES */}
        <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">🔄 Devoluciones y Cambios</h2>
          <p>Si por cualquier motivo no quedas satisfecho con tu pedido, tienes un plazo de <strong>10 días naturales</strong> a contar desde la fecha de entrega.</p>
          <p className="text-sm bg-orange-100 text-orange-800 p-3 rounded-lg inline-block font-bold">🎄 En periodo de Navidad o Reyes, el plazo aumenta para facilitar los regalos.</p>
          
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>El producto debe estar en perfectas condiciones (con garantías, etiquetas e instrucciones).</li>
            <li>El envío de la devolución corre a cargo del cliente.</li>
            <li>Si el envío original fue gratis (pagado por nosotros), se descontarán <strong>5€</strong> del importe a devolver.</li>
            <li>Para cambios (talla/modelo), los gastos de recogida y nuevo envío son <strong>10€</strong> (a cargo del comprador).</li>
          </ul>
      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
        <p className="font-bold">📍 Dirección para envíos:</p>
        <p>Mario Ruiz López<br/>C/ Castelar 15, CP 46357<br/>La Portera (Valencia)</p>
        <p className="mt-2 text-sm text-gray-500">⚠️ Ninguna mercancía será aceptada sin aviso previo por WhatsApp al <strong>661 714 408</strong>.</p>
      </div>
    </section>
    {/* BLOQUE ENVÍOS */}
    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">🚚 Formas de Envío y Plazos</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-2">España Península</h3>
          <p className="text-green-600 font-bold mb-2">GRATIS a partir de 60€</p>
          <ul className="text-sm space-y-1">
            <li>Pedidos -60€: <strong>2,99€</strong></li>
            <li>Entrega: 1-2 días laborables</li>
          </ul>
        </div>
        <div className="border p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-2">Baleares</h3>
          <p className="text-green-600 font-bold mb-2">GRATIS a partir de 90€</p>
          <ul className="text-sm space-y-1">
            <li>Pedidos -90€: <strong>11,90€</strong></li>
            <li>Entrega: 2-4 días</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-sm">
        * Los pedidos realizados antes de las 11:00h (L-V) salen el mismo día. <br/>
        * No se realizan envíos a apartados postales.
      </p>
    </section>
    {/* BOTÓN CONTACTO */}
    <div className="text-center pt-8">
      <p className="mb-4 font-bold">¿Dudas?</p>
      <a href="https://wa.me/34661714408" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition inline-flex items-center gap-2">
        Contactar por WhatsApp
      </a>
    </div>
  </div>
</div>
); 
}