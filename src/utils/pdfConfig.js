import html2pdf from 'html2pdf.js';

export const descargarPDFProfesional = (elemento) => {
  const opciones = {
    margin: [0, 0, 0, 0], // Manejaremos los márgenes internamente
    filename: 'Solicitud_Empleo_Pro.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    pagebreak: { mode: 'css', avoid: '.evitar-corte' },
    html2canvas: {
      scale: 2,
      width: 794,
      windowWidth: 794,
      useCORS: true,
      onclone: function (docClonado) {
        // 1. Ocultamos lo innecesario
        docClonado.querySelectorAll('.no-pdf').forEach(el => el.remove());

        // 2. INYECCIÓN DE ESTILO PARA EL PDF (Diseño azul de la imagen)
        const estiloPDF = docClonado.createElement('style');
        estiloPDF.innerHTML = `
          .hoja-completa {
            box-shadow: none !important;
            padding: 1.5cm !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 296mm !important; /* Altura A4 fija */
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
          }
          .contenido-dinamico { flex-grow: 1 !important; }
          .seccion-firma-pdf { margin-top: auto !important; padding-top: 20px !important; }
          
          h2 { 
            background-color: #E3F2FD !important; /* Azul de tus referencias */
            color: #000 !important;
            border: 1px solid #444 !important;
            border-bottom: none !important;
            margin: 15px 0 0 0 !important;
            padding: 5px 10px !important;
            font-size: 1rem !important;
          }
          .contenedor-tabla { margin-bottom: 0 !important; border-top: 1px solid #444 !important; }
          table { margin-bottom: 10px !important; }
          .th-pegado { border-bottom: none !important; }
          .td-pegado { border-top: none !important; }
          .sin-borde { background-color: #fafafa !important; border: none !important; }
        `;
        docClonado.head.appendChild(estiloPDF);

        // 3. Transformación de Textareas a DIVs (Para que no se corte el texto)
        const textareas = docClonado.querySelectorAll('textarea');
        textareas.forEach(ta => {
          const div = docClonado.createElement('div');
          div.innerText = ta.value;
          div.style.width = '100%';
          div.style.minHeight = '2.8em';
          div.style.fontSize = '0.9rem';
          div.style.whiteSpace = 'pre-wrap';
          div.style.wordBreak = 'break-word';
          div.style.padding = ta.classList.contains('sin-borde') ? '8px 10px' : '4px 2px';
          div.style.backgroundColor = ta.classList.contains('sin-borde') ? '#fafafa' : 'transparent';
          div.style.borderBottom = ta.classList.contains('sin-borde') ? 'none' : '1px dashed #aaa';
          ta.parentNode.replaceChild(div, ta);
        });
      }
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
};