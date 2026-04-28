import React from 'react';
import { SignatureBox } from './SignatureBox';

export const SolicitudCorta = ({ signatureProps }) => (
  <div className="hoja">
    <div className="header">
      <h1>SOLICITUD DE EMPLEO</h1>
      <p>La información aquí proporcionada será tratada de forma confidencial.</p>
      <p>Llene únicamente los campos que considere pertinentes.</p>
    </div>

    <table>
      <tbody>
        <tr>
          <td className="etiqueta col-fecha">Fecha</td>
          <td className="col-fecha-val"><input type="text" placeholder="DD/MM/AAAA" /></td>
          <td className="etiqueta col-puesto">Puesto solicitado</td>
          <td className="col-puesto-val"><input type="text" /></td>
        </tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Datos de contacto</div>
    <table>
      <tbody>
        <tr>
          <td className="etiqueta" style={{ width: '22%' }}>Nombre completo</td>
          <td colSpan="3"><input type="text" /></td>
        </tr>
        <tr>
          <td className="etiqueta" style={{ width: '15%' }}>Teléfono</td>
          <td style={{ width: '25%' }}><input type="text" /></td>
          <td className="etiqueta" style={{ width: '11.5%' }}>Correo electrónico</td>
          <td style={{ width: '48.5%' }}><input type="email" /></td>
        </tr>
        <tr>
          <td className="etiqueta" style={{ width: '22%' }}>Ciudad / Estado</td>
          <td colSpan="3"><input type="text" /></td>
        </tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Disponibilidad</div>
    <table>
      <tbody>
        <tr>
          <td className="etiqueta" style={{ width: '40%' }}>Disponibilidad para iniciar</td>
          <td><input type="text" /></td>
        </tr>
        <tr>
          <td className="etiqueta">Disponibilidad para viajar</td>
          <td>
            <label className="opcion-check"><input type="radio" name="viajar" /> [O] Sí</label>
            <label className="opcion-check"><input type="radio" name="viajar" /> [O] No</label>
            <span style={{ marginLeft: '10px' }}>Razones:</span>
            <input type="text" style={{ width: '50%', borderBottom: '1px solid #ccc' }} />
          </td>
        </tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Formación Académica</div>
    <table>
      <thead>
        <tr className="etiqueta">
          <th style={{ width: '28%' }}>Nivel de estudios</th>
          <th style={{ width: '37%' }}>Institución</th>
          <th style={{ width: '35%' }}>Estado (titulado / trunco)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
        <tr><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
      </tbody>
    </table>

    <div className="titulo-seccion" style={{ marginBottom: 0 }}>Experiencia Laboral Reciente</div>
    <p style={{ textAlign: 'center', fontSize: '11px', fontStyle: 'italic', margin: '0 0 5px 0' }}>Indique los empleos más recientes</p>
    <table>
      <thead>
        <tr className="etiqueta">
          <th className="col-exp-empresa">Empresa</th>
          <th className="col-exp-puesto">Puesto</th>
          <th className="col-exp-periodo">Periodo</th>
          <th className="col-exp-funciones">Principales funciones / logros</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ height: '85px' }}><input type="text" /></td>
          <td><input type="text" /></td>
          <td><input type="text" /></td>
          <td><textarea className="input-experiencia"></textarea></td>
        </tr>
        <tr>
          <td style={{ height: '85px' }}><input type="text" /></td>
          <td><input type="text" /></td>
          <td><input type="text" /></td>
          <td><textarea className="input-experiencia"></textarea></td>
        </tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Habilidades Técnicas</div>
    <table>
      <thead>
        <tr className="etiqueta">
          <th style={{ width: '30%' }}>Habilidades Técnicas</th>
          <th>Descripción / Nivel</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><input type="text" /></td><td><input type="text" /></td></tr>
        <tr><td><input type="text" /></td><td><input type="text" /></td></tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Referencias Personales</div>
    <table>
      <thead>
        <tr className="etiqueta">
          <th style={{ width: '25%' }}>Nombre</th>
          <th style={{ width: '25%' }}>Teléfono / Contacto</th>
          <th style={{ width: '25%' }}>Ocupación / Relación</th>
          <th style={{ width: '25%' }}>Tiempo de conocerse</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
        <tr><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
      </tbody>
    </table>

    <div className="titulo-seccion">Declaración y firma</div>
    <div style={{ border: '1px solid #64748b', padding: '15px' }}>
      <label className="opcion-check" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        <input type="checkbox" /> [O] Hago constar que mis respuestas son verdaderas.
      </label>
      <SignatureBox {...signatureProps} />
    </div>
    <div className="nota-final">
      El(la) suscrito(a) autoriza el uso exclusivo de estos datos para fines de selección de personal, conforme a la legislación de protección de datos aplicable. Se omitió deliberadamente cualquier pregunta sobre situación económica, afiliación sindical, fotografía, estado civil, etc.
    </div>
  </div>
);