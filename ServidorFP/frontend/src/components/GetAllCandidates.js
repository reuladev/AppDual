import React, { useState, useEffect } from 'react';
import '../styles.css'; // Importa el archivo de estilos CSS global

function GetAllCandidatesComponent() {
  //Array declarado que va a contener todos los atributos y registros de la tabla candidatos.
  const [data, setData] = useState([]); 

  /* Si se producen cambios, con useEffect tendremos la actulizacion de los datos cambiados*/
  useEffect(() => {
    GetAllCandidates(); 
  }, []);

  // PETICION GET -- MOSTRAR ESTUDIANTES
  function GetAllCandidates() {
    fetch('/getAllCandidates') //Hacer una solicitud HTTP GET a '/getAllCandidates'
      .then(response => response.json()) //Convertir la respuesta a JSON
      .then(data => setData(data)); //Establecer los datos obtenidos en el estado 'data'. AQUI es DONDE introducimos TODOS los datos.
  }

  // Renderizado del componente
  return (
    <div className="students-container">
      <h1 className="students-title">LISTA DE CANDIDATOS</h1>
      {/* Bucle for */}
      {data.map(item => (
        <div key={item.idalumno} className="student-card">
          <h2>{item.nombre}</h2>
          <ul className="student-info-list">
          <li><strong>ID del Estudiante:</strong> {item.idalumno}</li>
          <li><strong>Fecha de Asignación:</strong> {item.fechaasignacion}</li>
          <li><strong>Estado de Estudiante Dual:</strong> {item.estadodualalumno}</li>
          <li><strong>Estado de Empresa 1:</strong> {item.estadoempresa1}</li>
          <li><strong>Estado de Empresa 2:</strong> {item.estadoempresa2}</li>
          <li><strong>Estado de Empresa 3:</strong> {item.estadoempresa3}</li>
          <li><strong>Primera Empresa:</strong> {item.primeraempresa}</li>
          <li><strong>Segunda Empresa:</strong> {item.segundaempresa}</li>
          <li><strong>Tercera Empresa:</strong> {item.terceraempresa}</li>
          <li><strong>Empresa Contratada:</strong> {item.empresacontratada}</li>
          <li><strong>Email de Estudiante Dual:</strong> {item.emaildualalumno}</li>
          <li><strong>Opinión de la Empresa:</strong> {item.opinionempresa}</li>
          <li><strong>Observaciones:</strong> {item.observaciones}</li>
          <li><strong>Turno:</strong> {item.turno}</li>
          <li><strong>Adjunto Recibido:</strong> {item.anexorecibido}</li>
          <li><strong>Adjunto Completado:</strong> {item.anexorellenado}</li>
          <li><strong>Estado del Calendario:</strong> {item.estadocalendario}</li>
          <li><strong>Adjunto:</strong> {item.anexo}</li>
          <li><strong>Tipo de Relación:</strong> {item.tiporelacion}</li>
          <li><strong>CNO:</strong> {item.cno}</li>
          </ul>
        </div>
      ))}
    </div>
   );
}

export default GetAllCandidatesComponent;
