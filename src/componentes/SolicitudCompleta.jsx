import React from 'react';
import { SignatureBox } from './SignatureBox';

export const SolicitudCompleta = ({ signatureProps }) => (
  <div className="formato-completo">
    {/* PÁGINA 1 */}
    <div className="pagina" id="p1">
      <div className="identificador-pagina">PÁGINA 1 (FRENTE)</div>
      
      <div className="header-grid">
        <div>
          <div className="pill-title">Solicitud de Empleo</div>
          <p style={{ fontSize: '8px', margin: '5px 0' }}>Sea tan amable de llenar esta solicitud en forma manuscrita. NOTA: Información confidencial.</p>
          <div style={{ border: '1px solid var(--borde)', padding: '5px', height: '50px' }}>
            <span className="label-pequeno">Puesto que solicita</span><input type="text" />
          </div>
        </div>
        <table className="tabla-sueldos">
          <tbody>
            <tr><td className="td-label">Fecha</td><td><input type="text" /></td></tr>
            <tr><td className="td-label">Sueldo Deseado</td><td><input type="text" /></td></tr>
            <tr><td className="td-label">Sueldo Aprobado</td><td><input type="text" /></td></tr>
            <tr><td className="td-label">Fecha Contratación</td><td><input type="text" /></td></tr>
          </tbody>
        </table>
        <div className="cuadro-foto">FOTOGRAFÍA<br />RECIENTE</div>
      </div>

      <div className="banner-seccion">Datos Personales</div>
      <table className="tabla-datos" style={{ flex: 1 }}>
        <tbody>
          <tr>
            <td colSpan="2"><span className="label-pequeno">Apellido Paterno</span><input type="text" /></td>
            <td colSpan="2"><span className="label-pequeno">Apellido Materno</span><input type="text" /></td>
            <td colSpan="2"><span className="label-pequeno">Nombre(s)</span><input type="text" /></td>
          </tr>
          <tr>
            <td colSpan="3"><span className="label-pequeno">Domicilio</span><input type="text" /></td>
            <td><span className="label-pequeno">Colonia</span><input type="text" /></td>
            <td><span className="label-pequeno">C.P.</span><input type="text" /></td>
            <td><span className="label-pequeno">Teléfono</span><input type="text" /></td>
          </tr>
          <tr>
            <td colSpan="2"><span className="label-pequeno">Ciudad / Municipio</span><input type="text" /></td>
            <td colSpan="2"><span className="label-pequeno">Lugar de Nacimiento</span><input type="text" /></td>
            <td><span className="label-pequeno">Fecha Nac.</span><input type="text" /></td>
            <td><span className="label-pequeno">Edad</span><input type="text" /></td>
          </tr>
          <tr>
            <td colSpan="2"><span className="label-pequeno">Correo electrónico</span><input type="text" /></td>
            <td><span className="label-pequeno">Nacionalidad</span><input type="text" /></td>
            <td><span className="label-pequeno">Estatura</span><input type="text" /></td>
            <td><span className="label-pequeno">Peso</span><input type="text" /></td>
            <td><span className="label-pequeno">Sexo</span><input type="text" placeholder="M / F" /></td>
          </tr>
          <tr>
            <td colSpan="3"><span className="label-pequeno">Vive con</span><input type="text" placeholder="Padres / Familia / Solo" /></td>
            <td colSpan="3"><span className="label-pequeno">Estado Civil</span><input type="text" placeholder="Soltero / Casado / Otro" /></td>
          </tr>
        </tbody>
      </table>

      <div className="banner-seccion">Documentación</div>
      <table className="tabla-datos" style={{ flex: 1 }}>
        <tbody>
          <tr>
            <td colSpan="2"><span className="label-pequeno">CURP</span><input type="text" /></td>
            <td colSpan="2"><span className="label-pequeno">AFORE</span><input type="text" /></td>
          </tr>
          <tr>
            <td><span className="label-pequeno">RFC</span><input type="text" /></td>
            <td><span className="label-pequeno">N.S.S.</span><input type="text" /></td>
            <td><span className="label-pequeno">Cartilla Militar</span><input type="text" /></td>
            <td><span className="label-pequeno">Pasaporte No.</span><input type="text" /></td>
          </tr>
        </tbody>
      </table>

      <div className="banner-seccion">Estado de Salud y Hábitos Personales</div>
      <table className="tabla-datos" style={{ flex: 1 }}>
        <tbody>
          <tr>
            <td><span className="label-pequeno">¿Cómo considera su salud?</span><input type="text" /></td>
            <td><span className="label-pequeno">¿Padece enfermedad crónica?</span><input type="text" /></td>
            <td><span className="label-pequeno">¿Practica algún deporte?</span><input type="text" /></td>
          </tr>
          <tr>
            <td colSpan="2"><span className="label-pequeno">¿Cuál es su meta en la vida?</span><input type="text" /></td>
            <td><span className="label-pequeno">Pasatiempo favorito</span><input type="text" /></td>
          </tr>
        </tbody>
      </table>

      <div className="banner-seccion">Datos Familiares</div>
      <table className="tabla-datos" style={{ flex: 1 }}>
        <tbody>
          <tr style={{ background: 'var(--gris-claro)' }}>
            <td style={{ width: '20%' }}>PARENTESCO</td>
            <td style={{ width: '40%' }}>NOMBRE</td>
            <td>VIVE</td>
            <td>DOMICILIO / OCUPACIÓN</td>
          </tr>
          {['Padre', 'Madre', 'Esposo(a)'].map(p => (
            <tr key={p}>
              <td>{p}</td>
              <td><input type="text" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="text" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="banner-seccion">Escolaridad</div>
      <table className="tabla-datos" style={{ flex: 1 }}>
        <tbody>
          <tr style={{ background: 'var(--gris-claro)' }}>
            <td>NIVEL</td><td>ESCUELA</td><td>DIRECCIÓN</td><td>AÑOS</td><td>TÍTULO</td>
          </tr>
          {['Primaria', 'Secundaria', 'Preparatoria', 'Profesional'].map(e => (
            <tr key={e}>
              <td>{e}</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* PÁGINA 2 */}
    <div className="pagina" id="p2">
      <div className="identificador-pagina">PÁGINA 2 (ATRÁS)</div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="banner-seccion">Conocimientos Generales</div>
        <table className="tabla-datos" style={{ flex: 1 }}>
          <tbody>
            <tr>
              <td style={{ height: '45px' }}><span className="label-pequeno">Idiomas (Nivel %)</span><input type="text" /></td>
              <td style={{ height: '45px' }}><span className="label-pequeno">Funciones de oficina</span><input type="text" /></td>
            </tr>
            <tr>
              <td style={{ height: '45px' }}><span className="label-pequeno">Máquinas que maneja</span><input type="text" /></td>
              <td style={{ height: '45px' }}><span className="label-pequeno">Software que conoce</span><input type="text" /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ height: '60px' }}><span className="label-pequeno">Otros trabajos o funciones que domina</span><input type="text" /></td>
            </tr>
          </tbody>
        </table>

        <div className="banner-seccion">Empleo Actual y Anteriores</div>
        <table className="tabla-datos" style={{ flex: 1 }}>
          <tbody>
            <tr style={{ background: 'var(--gris-claro)', fontWeight: 'bold', textAlign: 'center' }}>
              <td style={{ width: '15%' }}>CONCEPTO</td><td>ACTUAL / ÚLTIMO</td><td>ANTERIOR</td><td>ANTERIOR</td>
            </tr>
            {['Empresa', 'Puesto', 'Sueldo', 'Motivo Salida'].map(c => (
              <tr key={c}><td style={{ background: 'var(--gris-claro)' }}>{c}</td><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
            ))}
          </tbody>
        </table>

        <div className="banner-seccion">Referencias Personales</div>
        <table className="tabla-datos" style={{ flex: 1 }}>
          <tbody>
            <tr style={{ background: 'var(--gris-claro)' }}><td>NOMBRE</td><td>TELÉFONO</td><td>OCUPACIÓN</td><td>TIEMPO</td></tr>
            {[1, 2, 3].map(i => (
              <tr key={i}><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td><td><input type="text" /></td></tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="banner-seccion">Datos Generales</div>
            <table className="tabla-datos" style={{ flex: 1 }}>
              <tbody>
                <tr><td><span className="label-pequeno">¿Cómo supo de este empleo?</span><input type="text" /></td></tr>
                <tr><td><span className="label-pequeno">¿Tiene parientes aquí?</span><input type="text" /></td></tr>
                <tr><td><span className="label-pequeno">¿Puede viajar?</span><input type="text" /></td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="banner-seccion">Datos Económicos</div>
            <table className="tabla-datos" style={{ flex: 1 }}>
              <tbody>
                <tr><td><span className="label-pequeno">¿Tiene otros ingresos?</span><input type="text" /></td></tr>
                <tr><td><span className="label-pequeno">¿Vive en casa propia?</span><input type="text" /></td></tr>
                <tr><td><span className="label-pequeno">¿Tiene deudas?</span><input type="text" /></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div className="banner-seccion">Firma del Solicitante</div>
        <div className="firma-box">
          <p style={{ fontSize: '10px', margin: '0 0 10px 0' }}>Hago constar que mis respuestas son verdaderas.</p>
          <SignatureBox {...signatureProps} />
          <p style={{ fontSize: '9px', marginTop: '5px', fontWeight: 'bold' }}>FIRMA</p>
        </div>
      </div>
    </div>
  </div>
);