import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import './SolicitudEmpleo.css';

function SolicitudEmpleo() {
  const contenedorPDF = useRef(null);

  const [filasFormacion, setFilasFormacion] = useState([]);
  const [filasExperiencia, setFilasExperiencia] = useState([]);
  const [filasHabilidades, setFilasHabilidades] = useState([]);
  const [filasReferencias, setFilasReferencias] = useState([]);

  const agregarFila = (tipo) => {
    const nuevaFila = { id: Date.now() };
    switch (tipo) {
      case 'formacion':
        setFilasFormacion([...filasFormacion, nuevaFila]);
        break;
      case 'experiencia':
        setFilasExperiencia([...filasExperiencia, nuevaFila]);
        break;
      case 'habilidades':
        setFilasHabilidades([...filasHabilidades, nuevaFila]);
        break;
      case 'referencias':
        setFilasReferencias([...filasReferencias, nuevaFila]);
        break;
    }
  };

  const eliminarFila = (tipo, id) => {
    switch (tipo) {
      case 'formacion':
        setFilasFormacion(filasFormacion.filter(f => f.id !== id));
        break;
      case 'experiencia':
        setFilasExperiencia(filasExperiencia.filter(f => f.id !== id));
        break;
      case 'habilidades':
        setFilasHabilidades(filasHabilidades.filter(f => f.id !== id));
        break;
      case 'referencias':
        setFilasReferencias(filasReferencias.filter(f => f.id !== id));
        break;
    }
  };

  const descargarPDF = () => {
    const elemento = contenedorPDF.current;
    const opciones = {
      margin:       0.8,
      filename:     'Solicitud_Empleo.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      pagebreak:    { mode: 'css' },          // ⬅️ Respeta las reglas page-break
      html2canvas:  {
        scale: 2,
        width: elemento.offsetWidth,
        windowWidth: elemento.offsetWidth,
        logging: false,
        onclone: function(docClonado) {
          // Elimina TODOS los elementos con clase "no-pdf" (botones agregar, eliminar, etc.)
          const elementosOcultar = docClonado.querySelectorAll('.no-pdf');
          elementosOcultar.forEach(el => el.remove());
        }
      },
      jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opciones).from(elemento).save();
  };

  return (
    <div className="contenedor-app">
      <div ref={contenedorPDF} className="hoja-completa">

        <h1 style={{ textAlign: 'center' }}>Solicitud de Empleo</h1>
        <p className="confidencial">
          La información aquí proporcionada será tratada de forma confidencial.<br />
          Llene únicamente los campos que considere pertinentes.
        </p>

        {/* Fecha y Puesto */}
        <div className="contenedor-tabla">
          <table>
            <tbody>
              <tr>
                <th className="td-fecha-label">Fecha</th>
                <td className="td-fecha-input"><input type="text" placeholder="DD / MM / AAAA" /></td>
                <th className="td-puesto-label">Puesto solicitado</th>
                <td className="td-puesto-input"><input type="text" placeholder="Escriba el puesto" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Datos de Contacto */}
        <h2>Datos de Contacto</h2>
        <div className="contenedor-tabla">
          <table>
            <tbody>
              <tr>
                <th>Nombre completo</th>
                <td colSpan={3}><input type="text" placeholder="Nombre y apellidos" /></td>
              </tr>
              <tr>
                <th className="td-tel-label">Teléfono</th>
                <td className="td-tel-input"><input type="text" placeholder="Ej: +52 55 1234 5678" /></td>
                <th className="td-email-label">Correo electrónico</th>
                <td className="td-email-input"><input type="email" placeholder="ejemplo@correo.com" /></td>
              </tr>
              <tr>
                <th>Ciudad / Estado</th>
                <td colSpan={3}><input type="text" placeholder="Ciudad, Estado" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disponibilidad */}
        <div className="contenedor-tabla">
          <table>
            <tbody>
              <tr>
                <th>Disponibilidad para iniciar</th>
                <td><input type="text" placeholder="Fecha estimada" /></td>
              </tr>
              <tr>
                <th>Disponibilidad para viajar</th>
                <td>
                  <label className="check-group"><input type="radio" name="viajar" className="inline-check" /> Sí</label>
                  <label className="check-group"><input type="radio" name="viajar" className="inline-check" /> No</label>
                  Razones: <input type="text" placeholder="(opcional)" style={{ width: '55%' }} />
                </td>
              </tr>
              <tr>
                <th>Disponibilidad para cambiar residencia</th>
                <td>
                  <label className="check-group"><input type="radio" name="residencia" className="inline-check" /> Sí</label>
                  <label className="check-group"><input type="radio" name="residencia" className="inline-check" /> No</label>
                  Razones: <input type="text" placeholder="(opcional)" style={{ width: '55%' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formación Académica */}
        <h2>Formación Académica</h2>
        <div className="contenedor-tabla">
          <table>
            <thead>
              <tr>
                <th>Nivel de estudios</th>
                <th>Institución</th>
                <th>Estado (titulado / trunco / en curso)</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" placeholder="Ej: Licenciatura" /></td>
                <td><input type="text" placeholder="Nombre de la institución" /></td>
                <td><input type="text" placeholder="Titulado / Trunco / En curso" /></td>
                <td></td>
              </tr>
              {filasFormacion.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" placeholder="Nivel" /></td>
                  <td><input type="text" placeholder="Institución" /></td>
                  <td><input type="text" placeholder="Estado" /></td>
                  <td>
                    <button className="remover-btn no-pdf" onClick={() => eliminarFila('formacion', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('formacion')}>➕ Agregar otro nivel de estudios</button>

        {/* Experiencia Laboral */}
        <h2>Experiencia Laboral Reciente</h2>
        <p style={{ fontSize: '0.9em', marginTop: '-0.3em' }}>Indique los empleos más recientes (puede agregar más)</p>
        <div className="contenedor-tabla">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Puesto</th>
                <th>Periodo</th>
                <th>Principales funciones / logros</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" placeholder="Nombre de la empresa" /></td>
                <td><input type="text" placeholder="Puesto desempeñado" /></td>
                <td><input type="text" placeholder="MM/AAAA - MM/AAAA" /></td>
                <td><textarea rows="2" placeholder="Describa funciones clave"></textarea></td>
                <td></td>
              </tr>
              {filasExperiencia.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" placeholder="Empresa" /></td>
                  <td><input type="text" placeholder="Puesto" /></td>
                  <td><input type="text" placeholder="Periodo" /></td>
                  <td><textarea rows="2" placeholder="Funciones"></textarea></td>
                  <td>
                    <button className="remover-btn no-pdf" onClick={() => eliminarFila('experiencia', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('experiencia')}>➕ Agregar otro empleo</button>

        {/* Habilidades Técnicas */}
        <h2>Habilidades Técnicas</h2>
        <div className="contenedor-tabla">
          <table>
            <thead>
              <tr>
                <th>Habilidad / Conocimiento</th>
                <th>Descripción / Nivel</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr><td><input type="text" placeholder="Ej: Idiomas" /></td><td><input type="text" placeholder="Inglés avanzado, Francés básico..." /></td><td></td></tr>
              <tr><td><input type="text" placeholder="Software / herramientas" /></td><td><input type="text" placeholder="Office, Photoshop, ERP..." /></td><td></td></tr>
              <tr><td><input type="text" placeholder="Maquinaria de oficina/taller" /></td><td><input type="text" placeholder="Impresora industrial, torno..." /></td><td></td></tr>
              <tr><td><input type="text" placeholder="Otras funciones" /></td><td><textarea rows="2" placeholder="Detalle aquí"></textarea></td><td></td></tr>
              {filasHabilidades.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" placeholder="Habilidad" /></td>
                  <td><input type="text" placeholder="Descripción" /></td>
                  <td>
                    <button className="remover-btn no-pdf" onClick={() => eliminarFila('habilidades', fila.id)}>✕</button>
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
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono / Contacto</th>
                <th>Ocupación / Relación</th>
                <th>Tiempo de conocerse</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" placeholder="Nombre completo" /></td>
                <td><input type="text" placeholder="Teléfono o correo" /></td>
                <td><input type="text" placeholder="Ej: familia, amistad, amistad laboral, etc." /></td>
                <td><input type="text" placeholder="Años / meses" /></td>
                <td></td>
              </tr>
              {filasReferencias.map(fila => (
                <tr key={fila.id}>
                  <td><input type="text" placeholder="Nombre" /></td>
                  <td><input type="text" placeholder="Contacto" /></td>
                  <td><input type="text" placeholder="Ej: familia, amistad, compañero de trabajo" /></td>
                  <td><input type="text" placeholder="Tiempo" /></td>
                  <td>
                    <button className="remover-btn no-pdf" onClick={() => eliminarFila('referencias', fila.id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-btn no-pdf" onClick={() => agregarFila('referencias')}>➕ Agregar otra referencia</button>

        {/* Declaración y firma */}
        <p style={{ marginTop: '2em' }}>
          <label>
            <input type="checkbox" className="inline-check" /> Hago constar que mis respuestas son verdaderas.
          </label>
        </p>
        <div className="sig-line">
          <div><input type="text" placeholder="Firma del solicitante" style={{ border: 'none', width: '100%', textAlign: 'center' }} /></div>
          <div><input type="text" placeholder="Fecha" style={{ border: 'none', width: '100%', textAlign: 'center' }} /></div>
        </div>
        <p className="nota">
          El(la) suscrito(a) autoriza el uso exclusivo de estos datos para fines de selección de personal,
          conforme a la legislación de protección de datos aplicable. Se omitió deliberadamente cualquier
          pregunta sobre situación económica, afiliación sindical, fotografía, estado civil, etc.
        </p>

      </div>

      <div className="botonera no-pdf">
        <button onClick={descargarPDF}>📄 Descargar PDF</button>
      </div>
    </div>
  );
}

export default SolicitudEmpleo;