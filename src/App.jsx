import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, FileText } from 'lucide-react';
import SolicitudCorta from './componentes/SolicitudCorta';
import SolicitudCompleta from './componentes/SolicitudCompleta';
import PaymentFlow from './componentes/PaymentFlow';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('corta');
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para encoger el header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Importante: El fondo gris general de la app se define aquí
    <div className="min-h-screen bg-[#f2f2f2] font-sans text-gray-800 flex flex-col items-center">
      
      {/* HEADER COMPACTABLE */}
      <header className={`bg-blue-900 text-white shadow-md print:hidden sticky top-0 z-50 transition-all duration-300 w-full ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-[794px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Clock className={`text-yellow-400 transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-8 w-8'}`} />
              <div>
                <h1 className={`font-bold leading-none transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>Ahorra-tiempo</h1>
                {!isScrolled && <p className="text-blue-200 text-sm transition-all">Documentos listos en minutos</p>}
              </div>
            </div>
            
            <div className={`bg-blue-800/50 rounded-full px-4 flex items-center gap-2 border border-blue-700 transition-all ${isScrolled ? 'py-1 text-xs' : 'py-2 text-sm'}`}>
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span className="font-medium">100% Privado</span>
            </div>
          </div>

          {/* Pestañas */}
          <div className="flex mt-4 overflow-x-auto gap-2">
            <button 
              onClick={() => setActiveTab('corta')}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'corta' ? 'bg-[#f2f2f2] text-blue-900' : 'bg-blue-800 text-blue-100'}`}
            >
              <FileText size={16} /> Solicitud Corta
            </button>
            <button 
              onClick={() => setActiveTab('completa')}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'completa' ? 'bg-[#f2f2f2] text-blue-900' : 'bg-blue-800 text-blue-100'}`}
            >
              <FileText size={16} /> Solicitud Completa
            </button>
          </div>
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-grow py-8 px-4 flex flex-col items-center w-full max-w-[794px]">
        
        {/* Renderizado de Pestañas */}
        <div className="w-full relative">
          {activeTab === 'corta' && <SolicitudCorta />}
          {activeTab === 'completa' && <SolicitudCompleta />}
        </div>

        {/* ÁREA DE PAGO */}
        <div className="w-full print:hidden mt-8">
          <PaymentFlow />
        </div>

      </main>
    </div>
  );
}