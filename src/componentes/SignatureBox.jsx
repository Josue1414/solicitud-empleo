import React from 'react';
import { PenTool, RotateCcw } from 'lucide-react';

export const SignatureBox = ({ canvasRef, grosorFirma, setGrosorFirma, startDrawing, draw, stopDrawing, clearSignature }) => (
  <div className="firma-container relative">
    <div className="no-pdf flex items-center gap-3 mb-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
        <PenTool size={12} className="text-blue-600" /> Grosor:
      </div>
      <input 
        type="range" min="1" max="6" step="0.5" 
        value={grosorFirma} 
        onChange={(e) => setGrosorFirma(parseFloat(e.target.value))}
        className="w-24 accent-blue-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
      />
      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{grosorFirma}px</span>
    </div>
    <canvas 
      id="canvas-firma" ref={canvasRef}
      onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
      onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
    ></canvas>
    <button className="no-pdf flex items-center gap-1 mt-3 text-[10px] font-bold text-gray-400 hover:text-red-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-colors" onClick={clearSignature}>
      <RotateCcw size={12} /> Limpiar
    </button>
  </div>
);