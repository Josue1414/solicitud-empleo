import html2pdf from 'html2pdf.js';

export const exportarSolicitudPDF = (elemento) => {
  const opciones = {
    margin: 0,
    filename: 'Solicitud_Empleo_Profesional.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: {
      scale: 3, // Mayor resolución
      useCORS: true,
      width: 794,
      onclone: (docClonado) => {
        // 1. Estilizamos el PDF (Diseño Azul y Hoja A4 fija)
        const style = docClonado.createElement('style');
        style.innerHTML = `
          .hoja-completa {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 1.5cm !important;
            width: 210mm !important;
            height: 297mm !important; /* Alto A4 exacto */
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }
          h2 { 
            background-color: #E3F2FD !important; /* Azul de tu imagen */
            border: 1px solid #444 !important;
            border-bottom: none !important;
            margin: 15px 0 0 0 !important;
            padding: 5px 10px !important;
          }
          .contenedor-tabla { margin-bottom: 0 !important; }
          table { border-top: 1px solid #444 !important; }
          .seccion-firma { margin-top: auto !important; padding-top: 20px !important; }
          .no-pdf { display: none !important; }
        `;
        docClonado.head.appendChild(style);

        // 2. Convertimos Textareas a DIVs (Para que no se corte el texto)
        const textareas = docClonado.querySelectorAll('textarea');
        textareas.forEach(ta => {
          const div = docClonado.createElement('div');
          div.innerText = ta.value;
          div.style.width = '100%';
          div.style.fontSize = '0.9rem';
          div.style.whiteSpace = 'pre-wrap';
          div.style.wordBreak = 'break-word';
          div.style.padding = '8px 10px';
          div.style.minHeight = '2.5em';
          // Si es de la sección de experiencia, le damos el fondo gris
          if(ta.classList.contains('sin-borde')) {
            div.style.backgroundColor = '#fafafa';
          } else {
            div.style.borderBottom = '1px dashed #aaa';
          }
          ta.parentNode.replaceChild(div, ta);
        });
      }
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
};