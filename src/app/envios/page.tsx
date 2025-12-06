export default function EnviosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-gray-800 bg-white my-8 rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-4xl font-black mb-10 uppercase text-center text-gray-900">Envíos y Devoluciones</h1>
      
      <div className="space-y-10">
        
        {/* --- SECCIÓN DEVOLUCIONES --- */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔄</span>
            <h2 className="text-2xl font-bold text-orange-600 uppercase">Devoluciones y Cambios</h2>
          </div>
          
          <p className="text-lg mb-6 leading-relaxed">
            Si por cualquier motivo no quedas satisfecho con tu pedido, tienes un plazo de <strong>10 días naturales</strong> a contar desde la fecha de entrega para devolverlo.
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-8">
            <p className="font-bold text-orange-800 flex items-center gap-2">🎄 Campaña de Navidad y Reyes</p>
            <p className="text-sm text-orange-700">El plazo de cambio se amplía para facilitar los regalos. ¡Compra ahora y cambia después de Reyes!</p>
          </div>
      <h3 className="font-bold text-lg mb-4">Condiciones:</h3>
      <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700">
        <li>El producto debe estar en <strong>perfectas condiciones</strong>, sin usar, incluyendo garantías, etiquetas y embalaje original.</li>
        <li>El envío de la devolución hasta nuestro almacén corre a <strong>cargo del cliente</strong>.</li>
        <li>Si el envío original fue gratuito (pagado por nosotros), se descontarán <strong>5€</strong> del importe a devolver en concepto de gastos de gestión.</li>
        <li>Para cambios (por ejemplo, de talla), los gastos de recogida y envío del nuevo producto serán de <strong>10€</strong> (a cargo del comprador).</li>
        <li>⚠️ <strong>IMPORTANTE:</strong> No se aceptará ninguna mercancía sin aviso previo por WhatsApp.</li>
      </ul>
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
        <p className="font-bold mb-2 flex items-center gap-2">📍 Dirección para envíos:</p>
        <address className="not-italic bg-white p-4 rounded-lg border border-gray-300">
          <strong>Mario Ruiz López</strong><br/>
          C/ Castelar 15<br/>
          CP 46357 - La Portera (Valencia)
        </address>
      </div>
    </section>
    <hr className="border-gray-200" />
    {/* --- SECCIÓN ENVÍOS --- */}
    <section>
       <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🚚</span>
        <h2 className="text-2xl font-bold text-orange-600 uppercase">Formas de Envío y Plazos</h2>
      </div>
      
      <p className="mb-6">
        Los pedidos realizados antes de las 11:00h (L-V) salen el mismo día (si hay stock). Los plazos son en días hábiles.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {/* PENÍNSULA */}
        <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-orange-200 transition bg-gray-50">
          <h3 className="font-black text-xl mb-2 uppercase">🇪🇸 España Península</h3>
          <div className="mb-4">
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">GRATIS +60€</span>
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Pedidos -60€:</span> <strong>2,99 €</strong></li>
            <li className="flex justify-between"><span>Entrega estimada:</span> <strong>1-2 días laborables</strong></li>
          </ul>
        </div>
        {/* BALEARES */}
        <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-orange-200 transition bg-gray-50">
          <h3 className="font-black text-xl mb-2 uppercase">🏝️ Baleares</h3>
           <div className="mb-4">
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">GRATIS +90€</span>
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Pedidos -90€:</span> <strong>11,90 €</strong></li>
            <li className="flex justify-between"><span>Entrega estimada:</span> <strong>2-4 días</strong></li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 italic">* No realizamos envíos a apartados postales.</p>
    </section>
    {/* --- CONTACTO --- */}
    <div className="text-center pt-10 border-t border-gray-200 mt-10">
      <p className="font-bold text-xl mb-4">¿Tienes dudas o quieres gestionar una devolución?</p>
      <a href="https://wa.me/34661714408" target="_blank" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.049-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.049-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
        Contactar por WhatsApp
      </a>
      <p className="text-sm text-gray-500 mt-4">Atención al cliente: 661 714 408</p>
    </div>
  </div>
</div>
); }
