export default function EnviosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-gray-800">
      <h1 className="text-4xl font-black mb-8 uppercase text-center">Envíos y Devoluciones</h1>
      
      <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* DEVOLUCIONES */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-orange-600">🔄 Devoluciones y Cambios</h2>
          <p className="mb-4">Si por cualquier motivo no quedas satisfecho con tu pedido, tienes un plazo de <strong>10 días naturales</strong> a contar desde la fecha de entrega.</p>
          
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 mb-6">
            <p className="font-bold">🎄 Periodo Navideño:</p>
            <p>En Navidad y Reyes, el plazo aumenta para facilitar los cambios de regalos.</p>
          </div>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>El producto debe estar en <strong>perfectas condiciones</strong>, con etiquetas y embalaje.</li>
        <li>El envío de la devolución corre a cargo del cliente.</li>
        <li>Si el envío original fue gratis, se descontarán <strong>5€</strong> del importe a devolver.</li>
        <li>Para cambios de talla, los gastos de recogida y nuevo envío son <strong>10€</strong>.</li>
      </ul>
      <div className="bg-gray-100 p-6 rounded-xl">
        <h3 className="font-bold mb-2">📍 Dirección de Envío:</h3>
        <p>Mario Ruiz López<br/>C/ Castelar 15, CP 46357<br/>La Portera (Valencia)</p>
        <p className="mt-4 text-sm font-semibold text-red-600">⚠️ IMPORTANTE: Ninguna mercancía será aceptada sin aviso previo por WhatsApp al 661 714 408.</p>
      </div>
    </section>
    <hr className="border-gray-200" />
    {/* ENVÍOS */}
    <section>
      <h2 className="text-2xl font-bold mb-4 text-orange-600">🚚 Formas de Envío</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border p-4 rounded-xl">
          <h3 className="font-bold text-lg">España Península</h3>
          <p className="text-green-600 font-bold">GRATIS a partir de 60€</p>
          <p className="text-sm text-gray-500">Pedidos -60€: Coste 2,99€</p>
          <p className="text-sm">Entrega: 1-2 días laborables</p>
        </div>
        <div className="border p-4 rounded-xl">
          <h3 className="font-bold text-lg">Baleares</h3>
          <p className="text-green-600 font-bold">GRATIS a partir de 90€</p>
          <p className="text-sm text-gray-500">Pedidos -90€: Coste 11,90€</p>
          <p className="text-sm">Entrega: 2-4 días</p>
        </div>
      </div>
      <p className="text-sm italic">* No se realizan envíos a apartados postales.</p>
    </section>
    <div className="text-center pt-8">
      <a href="https://wa.me/34661714408" className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition">
        ¿Dudas? Contactar por WhatsApp
      </a>
    </div>
  </div>
</div>
); }