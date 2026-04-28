import html2pdf from 'html2pdf.js';

export const imprimirSolicitud = (elemento) => {
  const opciones = {
    margin: [0, 0, 0, 0],
    filename: 'Solicitud_Empleo.pdf',
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: {
      scale: 2,
      width: 794,
      windowWidth: 794,
      useCORS: true,
      onclone: (clonedDoc) => {
        const el = clonedDoc.querySelector('.hoja-completa');
        // Estilo exclusivo para la "foto" del PDF
        el.style.boxShadow = 'none';
        el.style.width = '210mm';
        el.style.height = '297mm'; // A4 Fijo para evitar hojas extra
        el.style.padding = '1.5cm';
        el.style.display = 'flex';
        el.style.flexDirection = 'column';

        // Diseño Azul de los títulos
        clonedDoc.querySelectorAll('h2').forEach(h2 => {
          h2.style.backgroundColor = '#E3F2FD';
          h2.style.padding = '5px 10px';
          h2.style.border = '1px solid #444';
          h2.style.borderBottom = 'none';
          h2.style.margin = '15px 0 0 0';
        });

        // Convertir textareas a DIVs para que no se corte el texto
        clonedDoc.querySelectorAll('textarea').forEach(ta => {
          const div = clonedDoc.createElement('div');
          div.innerText = ta.value;
          div.style.width = '100%';
          div.style.fontSize = '0.9rem';
          div.style.whiteSpace = 'pre-wrap';
          div.style.padding = '8px 10px';
          div.style.backgroundColor = ta.classList.contains('sin-borde') ? '#fafafa' : 'transparent';
          div.style.borderBottom = ta.classList.contains('sin-borde') ? 'none' : '1px dashed #aaa';
          ta.parentNode.replaceChild(div, ta);
        });

        // Firma al final (Firma del solicitante centrada)
        const firma = clonedDoc.querySelector('.seccion-firma-final');
        firma.style.marginTop = 'auto'; // Empuja al final del A4
      }
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opciones).from(elemento).save();
};