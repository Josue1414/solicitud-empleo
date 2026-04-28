import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import './SolicitudEmpleo.css';

export default function SolicitudCorta() {
  const contenedorPDF = useRef(null);

  const [filasFormacion, setFilasFormacion] = useState([]);
  const [filasExperiencia, setFilasExperiencia] = useState([]);
  const [filasHabilidades, setFilasHabilidades] = useState([]);
  const [filasReferencias, setFilasReferencias] = useState([]);

  const handleTextareaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const agregarFila = (tipo) => {
    const nuevaFila = { id: Date.now() };
    switch (tipo) {
      case 'formacion': setFilasFormacion([...filasFormacion, nuevaFila]); break;
      case 'experiencia': setFilasExperiencia([...filasExperiencia, nuevaFila]); break;
      case 'habilidades': setFilasHabilidades([...filasHabilidades, nuevaFila]); break;
      case 'referencias': setFilasReferencias([...filasReferencias, nuevaFila]); break;
    }
  };

  const eliminarFila = (tipo, id) => {
    switch (tipo) {
      case 'formacion': setFilasFormacion(filasFormacion.filter(f => f.id !== id)); break;
      case 'experiencia': setFilasExperiencia(filasExperiencia.filter(f => f.id !== id)); break;
      case 'habilidades': setFilasHabilidades(filasHabilidades.filter(f => f.id !== id)); break;
      case 'referencias': setFilasReferencias(filasReferencias.filter(f => f.id !== id)); break;
    }
  };

  const descargarPDF = () => {
    const elemento = contenedorPDF.current;
    
    const opciones = {
      margin:       [1, 1, 1, 1],
      filename:     'Solicitud_Empleo.pdf',
      image:        { type: 'jpeg', quality: 1.0 }, 
      pagebreak:    { mode: 'css', avoid: '.evitar-corte' }, 
      html2canvas:  {
        scale: 2, 
        width: 794, 
        windowWidth: 794,
        useCORS: true,
        onclone: function(docClonado) {
          const elementosOcultar = docClonado.querySelectorAll('.no-pdf');
          elementosOcultar.forEach(el => el.remove());
          
          const textareasOriginales = elemento.querySelectorAll('textarea');
          const textareasClonados = docClonado.querySelectorAll('textarea');
          for(let i=0; i < textareasOriginales.length; i++) {
             const div = docClonado.createElement('div');
             div.innerText = textareasOriginales[i].value;
             div.style.width = '100%';
             div.style.minHeight = '2.8em';
             div.style.fontSize = '0.9rem';
             div.style.whiteSpace = 'pre-wrap';
             div.style.wordBreak = 'break-word';
             
             // Estilos al clonar para que mantenga el look "pegado" en el PDF
             div.style.padding = textareasOriginales[i].classList.contains('sin-borde') ? '8px 10px' : '4px 2px';
             div.style.backgroundColor = textareasOriginales[i].classList.contains('sin-borde') ? '#fafafa' : 'transparent';
             div.style.borderBottom = textareasOriginales[i].classList.contains('sin-borde') ? 'none' : '1px dashed #aaa';
             
             textareasClonados[i].parentNode.replaceChild(div, textareasClonados[i]);
          }
        }
      },
      jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save();
  };

  return (
    <>
      <div ref={contenedorPDF} className="hoja-completa">

        <h1 style={{ textAlign: 'center' }}>Solicitud de Empleo</h1>
        <p className="confidencial">
          La información aquí proporcionada será tratada de forma confidencial.<br />
          Llene únicamente los campos que considere pertinentes.
        </p>

        {/* Fecha y Puesto */}
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <tbody>
              <tr>
                <th className="td-fecha-label">Fecha</th>
                <td className="td-fecha-input"><input type="text" maxLength="15" placeholder="DD / MM / AAAA" /></td>
                <th className="td-puesto-label">Puesto solicitado</th>
                <td className="td-puesto-input"><input type="text" maxLength="60" placeholder="Escriba el puesto" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Datos de Contacto */}
        <h2>Datos de Contacto</h2>
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <tbody>
              <tr>
                <th>Nombre completo</th>
                <td colSpan={3}><input type="text" maxLength="80" placeholder="Nombre y apellidos" /></td>
              </tr>
              <tr>
                <th className="td-tel-label">Teléfono</th>
                <td className="td-tel-input">
                  <input 
                    type="tel" 
                    maxLength="20"
                    placeholder="Ej: 33 1234 5678" 
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9+\-\s]/g, '')} 
                  />
                </td>
                <th className="td-email-label">Correo electrónico</th>
                <td className="td-email-input">
                  <input type="email" maxLength="60" placeholder="ejemplo@correo.com" />
                </td>
              </tr>
              <tr>
                <th>Ciudad / Estado</th>
                <td colSpan={3}><input type="text" maxLength="80" placeholder="Ciudad, Estado" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disponibilidad */}
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <tbody>
              <tr>
                <th>Disponibilidad para iniciar</th>
                <td><input type="text" maxLength="30" placeholder="Fecha estimada" /></td>
              </tr>
              <tr>
                <th>Disponibilidad para viajar</th>
                <td>
                  <label className="check-group"><input type="radio" name="viajar" className="inline-check" /> Sí</label>
                  <label className="check-group"><input type="radio" name="viajar" className="inline-check" /> No</label>
                  Razones: <input type="text" maxLength="120" placeholder="(opcional)" style={{ width: '55%' }} />
                </td>
              </tr>
              <tr>
                <th>Disponibilidad para cambiar residencia</th>
                <td>
                  <label className="check-group"><input type="radio" name="residencia" className="inline-check" /> Sí</label>
                  <label className="check-group"><input type="radio" name="residencia" className="inline-check" /> No</label>
                  Razones: <input type="text" maxLength="120" placeholder="(opcional)" style={{ width: '55%' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formación Académica */}
        <h2>Formación Académica</h2>
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <thead>
              <tr>
                <th>Nivel de estudios</th>
                <th>Institución</th>
                <th>Estado (titulado / trunco / en curso)</th>
                <th style={{ width: '30px' }} className="no-pdf"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" maxLength="40" placeholder="Ej: Licenciatura" /></td>
                <td><input type="text" maxLength="60" placeholder="Nombre de la institución" /></td>
                <td><input type="text" maxLength="40" placeholder="Titulado / Trunco / En curso" /></td>
                <td className="no-pdf"></td>
              </tr>
              {filasFormacion.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" maxLength="40" placeholder="Nivel" /></td>
                  <td><input type="text" maxLength="60" placeholder="Institución" /></td>
                  <td><input type="text" maxLength="40" placeholder="Estado" /></td>
                  <td className="no-pdf" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <button className="remover-btn" onClick={() => eliminarFila('formacion', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('formacion')}>➕ Agregar otro nivel de estudios</button>

        {/* ⚡ BLOQUE UNIFICADO DE EXPERIENCIA LABORAL */}
        <div className="evitar-corte">
          <h2 style={{ marginBottom: 0 }}>Experiencia Laboral Reciente</h2>
          <div className="contenedor-tabla" style={{ marginTop: '0.5em' }}>
            
            {/* PRIMER EMPLEO FIJO */}
            <table className="tabla-experiencia">
              <tbody>
                <tr>
                  <th style={{ width: '33.33%' }}>Empresa</th>
                  <th style={{ width: '33.33%' }}>Puesto</th>
                  <th colSpan={2} style={{ width: '33.33%' }}>Periodo</th>
                </tr>
                <tr>
                  <td><input type="text" maxLength="60" placeholder="Nombre de la empresa" /></td>
                  <td><input type="text" maxLength="60" placeholder="Puesto desempeñado" /></td>
                  <td colSpan={2}><input type="text" maxLength="40" placeholder="MM/AAAA - MM/AAAA" /></td>
                </tr>
                <tr>
                  {/* Fusión perfecta de celdas */}
                  <th colSpan={4} className="th-pegado">Principales funciones / logros</th>
                </tr>
                <tr>
                  <td colSpan={4} className="td-pegado">
                    <textarea 
                      maxLength="450" /* Tope estricto de 450 letras/espacios (~75 palabras) */
                      placeholder="Describa sus funciones clave aquí..." 
                      onInput={handleTextareaResize} 
                      className="textarea-auto sin-borde"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* EMPLEOS DINÁMICOS - Saltan de hoja automáticamente si no caben */}
        <div className="contenedor-tabla">
          {filasExperiencia.map(fila => (
            <table key={fila.id} className="tabla-experiencia evitar-corte" style={{ marginTop: '1em' }}>
              <tbody>
                <tr>
                  <th style={{ width: '32%' }}>Empresa</th>
                  <th style={{ width: '32%' }}>Puesto</th>
                  <th style={{ width: '32%' }}>Periodo</th>
                  <td rowSpan={4} className="columna-eliminar no-pdf">
                    <button className="remover-btn" onClick={() => eliminarFila('experiencia', fila.id)}>✕</button>
                  </td>
                </tr>
                <tr>
                  <td><input type="text" maxLength="60" placeholder="Empresa" /></td>
                  <td><input type="text" maxLength="60" placeholder="Puesto" /></td>
                  <td><input type="text" maxLength="40" placeholder="Periodo" /></td>
                </tr>
                <tr>
                  <th colSpan={3} className="th-pegado">Principales funciones / logros</th>
                </tr>
                <tr>
                  <td colSpan={3} className="td-pegado">
                    <textarea 
                      maxLength="450"
                      placeholder="Funciones..." 
                      onInput={handleTextareaResize} 
                      className="textarea-auto sin-borde"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('experiencia')} style={{ marginTop: '0' }}>➕ Agregar otro empleo</button>

        {/* Habilidades Técnicas */}
        <h2>Habilidades Técnicas</h2>
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <thead>
              <tr>
                <th>Habilidad / Conocimiento</th>
                <th>Descripción / Nivel</th>
                <th style={{ width: '30px' }} className="no-pdf"></th>
              </tr>
            </thead>
            <tbody>
              <tr><td><input type="text" maxLength="50" placeholder="Ej: Idiomas" /></td><td><input type="text" maxLength="100" placeholder="Inglés avanzado, Francés básico..." /></td><td className="no-pdf"></td></tr>
              <tr><td><input type="text" maxLength="50" placeholder="Software / herramientas" /></td><td><input type="text" maxLength="100" placeholder="Office, Photoshop, ERP..." /></td><td className="no-pdf"></td></tr>
              <tr><td><input type="text" maxLength="50" placeholder="Maquinaria de oficina/taller" /></td><td><input type="text" maxLength="100" placeholder="Impresora industrial, torno..." /></td><td className="no-pdf"></td></tr>
              <tr>
                <td><input type="text" maxLength="50" placeholder="Otras funciones" /></td>
                <td>
                  <textarea 
                    maxLength="250"
                    placeholder="Detalle aquí" 
                    onInput={handleTextareaResize} 
                    className="textarea-auto"
                  ></textarea>
                </td>
                <td className="no-pdf"></td>
              </tr>
              {filasHabilidades.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" maxLength="50" placeholder="Habilidad" /></td>
                  <td><input type="text" maxLength="100" placeholder="Descripción" /></td>
                  <td className="no-pdf" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <button className="remover-btn" onClick={() => eliminarFila('habilidades', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('habilidades')}>➕ Agregar otra habilidad</button>

        {/* Referencias Personales */}
        <h2>Referencias Personales (opcional)</h2>
        <div className="contenedor-tabla">
          <table className="tabla-general evitar-corte">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono / Contacto</th>
                <th>Ocupación / Relación</th>
                <th>Tiempo de conocerse</th>
                <th style={{ width: '30px' }} className="no-pdf"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" maxLength="60" placeholder="Nombre completo" /></td>
                <td><input type="text" maxLength="40" placeholder="Teléfono o correo" /></td>
                <td><input type="text" maxLength="40" placeholder="Ej: familia, amistad..." /></td>
                <td><input type="text" maxLength="30" placeholder="Años / meses" /></td>
                <td className="no-pdf"></td>
              </tr>
              {filasReferencias.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" maxLength="60" placeholder="Nombre" /></td>
                  <td><input type="text" maxLength="40" placeholder="Contacto" /></td>
                  <td><input type="text" maxLength="40" placeholder="Ej: familia..." /></td>
                  <td><input type="text" maxLength="30" placeholder="Tiempo" /></td>
                  <td className="no-pdf" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <button className="remover-btn" onClick={() => eliminarFila('referencias', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('referencias')}>➕ Agregar otra referencia</button>

        {/* Declaración y firma */}
        <div className="evitar-corte">
          <p style={{ marginTop: '1.5em', marginBottom: '0.5em' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" className="inline-check" /> 
              <span>Hago constar que mis respuestas son verdaderas.</span>
            </label>
          </p>
          
          <div className="sig-line" style={{ justifyContent: 'center' }}>
            <div style={{ width: '50%' }}>
              <input type="text" placeholder="Firma del solicitante" style={{ border: 'none', width: '100%', textAlign: 'center', paddingBottom: '4px' }} />
            </div>
          </div>
          
          <p className="nota">
            El(la) suscrito(a) autoriza el uso exclusivo de estos datos para fines de selección de personal,
            conforme a la legislación de protección de datos aplicable. Se omitió deliberadamente cualquier
            pregunta sobre situación económica, afiliación sindical, fotografía, estado civil, etc.
          </p>
        </div>

      </div>

      <div className="botonera no-pdf text-center mt-6">
        <button onClick={descargarPDF} className="bg-blue-900 text-white font-bold py-2 px-6 rounded shadow hover:bg-blue-800 transition-colors">
          📄 Descargar PDF
        </button>
      </div>
    </>
  );
}