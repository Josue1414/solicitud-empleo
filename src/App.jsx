import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Download, CreditCard, Eye, X, Clock } from 'lucide-react';

// Importamos los estilos globales y los nuevos componentes
import './componentes/Formatos.css';
import { Header } from './componentes/Header';
import { SolicitudCorta } from './componentes/SolicitudCorta';
import { SolicitudCompleta } from './componentes/SolicitudCompleta';

const App = () => {
  const [activeTab, setActiveTab] = useState('corta');
  const [showGuide, setShowGuide] = useState(false);
  const [grosorFirma, setGrosorFirma] = useState(2);
  
  // Referencias para manipular el DOM (Canvas y PDF)
  const contenedorPDF = useRef(null);
  const canvasRef = useRef(null);
  const [html2pdfLib, setHtml2pdfLib] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Carga de la librería html2pdf
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.onload = () => {
      setHtml2pdfLib(() => window.html2pdf);
    };
    document.body.appendChild(script);
  }, []);

  // Inicializar canvas según la pestaña activa y grosor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = grosorFirma;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [activeTab, grosorFirma]);

  // Funciones de dibujo (Smart Logic)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    if (e.touches) e.preventDefault();
  };

  const stopDrawing = () => setIsDrawing(false);
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Empaquetamos las props de la firma para pasarlas a los componentes tontos
  const signatureProps = {
    canvasRef, grosorFirma, setGrosorFirma, startDrawing, draw, stopDrawing, clearSignature
  };

  // Lógica de descarga PDF
  const handleDownload = () => {
    if (!html2pdfLib) {
      console.error("La librería PDF aún no ha cargado.");
      return;
    }
    
    const signatureImage = canvasRef.current?.toDataURL('image/png');
    const element = contenedorPDF.current;

    const opt = {
      margin: 0,
      filename: `Solicitud_${activeTab.toUpperCase()}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll('.no-pdf').forEach(el => el.style.display = 'none');

          if (activeTab === 'corta') {
            const hoja = clonedDoc.querySelector('.hoja');
            if (hoja) {
              hoja.style.boxShadow = 'none';
              hoja.style.border = 'none';
              hoja.style.width = '210mm';
              hoja.style.minHeight = '297mm';
              hoja.style.padding = '10mm 15mm';
            }
            clonedDoc.querySelectorAll('.etiqueta').forEach(td => {
              td.style.backgroundColor = '#E3F2FD';
              td.style.color = '#1a237e';
            });
          }

          if (activeTab === 'completa') {
            clonedDoc.querySelectorAll('.pagina').forEach(pag => {
              pag.style.boxShadow = 'none';
              pag.style.border = 'none';
              pag.style.margin = '0';
              pag.style.width = '210mm';
              pag.style.height = '297mm';
            });
          }

          clonedDoc.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
            const val = input.value;
            const parent = input.parentNode;
            const span = clonedDoc.createElement('span');
            span.innerText = val;
            span.style.fontSize = input.style.fontSize || '11px';
            span.style.fontFamily = 'Arial, sans-serif';
            span.style.display = 'block';
            span.style.width = '100%';
            span.style.minHeight = '14px';
            span.style.color = '#000';
            input.style.display = 'none';
            parent.appendChild(span);
          });

          const canvasInPdf = clonedDoc.querySelector('#canvas-firma');
          if (canvasInPdf && signatureImage) {
            const img = clonedDoc.createElement('img');
            img.src = signatureImage;
            img.style.width = '100%';
            img.style.maxWidth = '300px';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '0 auto';
            canvasInPdf.parentNode.replaceChild(img, canvasInPdf);
          }
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdfLib().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col font-sans overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="no-pdf bg-yellow-50 border-b border-yellow-200 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-yellow-800 text-xs sm:text-sm font-bold">
            <Eye size={18} className="text-yellow-600" />
            <span>Previsualización: PDF optimizado para impresión A4 completa.</span>
          </div>
          <button 
            onClick={() => setShowGuide(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider shadow-sm"
          >
            Ver Guía Visual
          </button>
        </div>
      </div>

      <div className="no-pdf bg-blue-900 text-white py-2 text-center text-[10px] font-bold uppercase tracking-widest">
        <ShieldCheck size={14} className="inline mr-2" />
        Privacidad: Los datos se procesan localmente. Nada se guarda en servidores externos.
      </div>

      <main className="flex-grow flex flex-col items-center py-10 px-4">
        
        {/* CONTENEDOR PRINCIPAL - Renderiza el componente según la pestaña activa */}
        <div ref={contenedorPDF} className="container-hojas">
          {activeTab === 'corta' && <SolicitudCorta signatureProps={signatureProps} />}
          {activeTab === 'completa' && <SolicitudCompleta signatureProps={signatureProps} />}
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="no-pdf max-w-[850px] w-full flex flex-col sm:flex-row justify-center gap-6 mt-12 mb-20 px-4">
          <button className="flex-1 bg-green-700 hover:bg-green-800 text-white font-black py-5 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1 active:translate-y-0">
            <CreditCard size={28} />
            <div className="text-left">
              <div className="text-[10px] opacity-80 uppercase font-black tracking-widest leading-none">Paso 1</div>
              <div className="text-xl">Habilitar Descarga</div>
            </div>
          </button>
          <button onClick={handleDownload} className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-black py-5 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1 active:translate-y-0">
            <Download size={28} />
            <div className="text-left">
              <div className="text-[10px] opacity-80 uppercase font-black tracking-widest leading-none">Paso 2</div>
              <div className="text-xl">Exportar PDF Pro</div>
            </div>
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="no-pdf bg-white border-t border-gray-200 py-16 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">AhorraTiempo<span className="text-blue-600">.mx</span></span>
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em]">
            © 2024 Formatos México • Calidad Profesional
          </p>
        </div>
      </footer>

      {/* MODAL GUÍA */}
      {showGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <span className="font-black text-xs uppercase tracking-widest text-blue-900">Guía de impresión final</span>
              <button onClick={() => setShowGuide(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="p-10 bg-slate-100 flex justify-center">
              <div className="bg-white p-6 shadow-xl w-64 border border-gray-300 transform rotate-1">
                <div className="bg-blue-600 h-4 mb-2"></div>
                <div className="h-2 w-1/2 bg-gray-200 mb-4"></div>
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1 bg-gray-100"></div>)}
                </div>
                <div className="mt-8 border-t border-black pt-2 flex flex-col items-center">
                  <div className="w-16 h-[0.5px] bg-black"></div>
                  <div className="text-[5px] uppercase mt-1">Firma Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;