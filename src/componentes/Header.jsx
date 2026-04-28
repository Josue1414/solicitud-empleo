import React from 'react';
import { Clock } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => (
  <header className="no-pdf w-full bg-white border-b border-gray-200 pt-6 pb-4">
    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-black tracking-tighter text-gray-900">
          Ahorra<span className="text-blue-600">Tiempo</span>
        </h1>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'corta', label: 'Solicitud Corta' },
          { id: 'completa', label: 'Solicitud Completa' },
          { id: 'cv', label: 'CV Moderno' },
          { id: 'carta', label: 'Carta Recomendación' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
              activeTab === tab.id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </header>
);