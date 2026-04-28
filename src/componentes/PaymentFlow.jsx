import React, { useState, useEffect } from 'react';
import { CreditCard, Printer, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db, functions } from '../config/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export default function PaymentFlow() {
  const [estado, setEstado] = useState('inicio'); 
  const [linkPago, setLinkPago] = useState(null);
  const [idTransaccion, setIdTransaccion] = useState(null);

  const iniciarPago = async () => {
    setEstado('generando');
    const crearOrden = httpsCallable(functions, 'crearOrdenPago');
    
    try {
      const { data } = await crearOrden();
      setIdTransaccion(data.idPagoFirebase);
      setLinkPago(data.initPoint);
      setEstado('esperando');
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (!idTransaccion) return;

    // Escucha en tiempo real si el webhook aprobó el pago
    const unsubscribe = onSnapshot(doc(db, "pagos_temporales", idTransaccion), (doc) => {
      if (doc.exists() && doc.data().status === 'pagado') {
          setEstado('pagado');
          document.body.classList.add('pago-aprobado');
      }
    });
    return () => unsubscribe();
  }, [idTransaccion]);

  const imprimirPDF = () => window.print();

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden mt-4 print-hidden">
      <div className="bg-blue-50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Libera tu documento</h3>
          <p className="text-blue-700 text-sm">Paga una cuota de recuperación de <strong>$5.00 MXN</strong> para imprimir o guardar tu PDF.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-64 text-center">
          {estado === 'inicio' && (
            <button onClick={iniciarPago} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
              <CreditCard size={20} /> Pagar y Descargar
            </button>
          )}
          {estado === 'generando' && (
             <div className="text-blue-600 font-bold animate-pulse">Generando link seguro...</div>
          )}
          {estado === 'esperando' && linkPago && (
            <div className="flex flex-col items-center">
                <a href={linkPago} target="_blank" rel="noreferrer" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 rounded-lg mb-2">
                    Abrir Mercado Pago
                </a>
                <div className="text-yellow-600 font-bold animate-pulse text-sm">Esperando pago...</div>
            </div>
          )}
          {estado === 'pagado' && (
            <button onClick={imprimirPDF} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
              <Printer size={20} /> Imprimir PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}