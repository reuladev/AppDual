import React, { useState, useEffect } from 'react';
import '../styles.css'; // Importa el archivo de estilos CSS global

function GetAllStudentsComponent() {
  // Definición de estados utilizando el hook useState
  const [data, setData] = useState([]); // Estado para almacenar datos obtenidos del servidor

  useEffect(() => {
    GetAllStudents(); 
  }, []);

  // PETICION GET -- MOSTRAR ESTUDIANTES
  function GetAllStudents() {
    fetch('/getAllStudents') // Hacer una solicitud HTTP GET a '/getAllNotes'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => setData(data)); // Establecer los datos obtenidos en el estado 'data'
  }

  // Renderizado del componente
  return (
    <div className="students-container">
      <h1 className="students-title">LISTA DE ALUMNOS</h1>
      {/* Bucle for */}
      {data.map(item => (
        <div key={item.idalumno} className="student-card">
          <h2>{item.nombre}</h2>
          <ul className="student-info-list">
            <li><strong>Nombre:</strong> {item.nombre}</li>
            <li><strong>Sexo:</strong> {item.sexo}</li>
            <li><strong>DNI:</strong> {item.dni}</li>
            <li><strong>Nacionalidad:</strong> {item.nacionalidad}</li>
            <li><strong>Fecha de nacimiento:</strong> {item.fechanacimiento}</li>
            <li><strong>Primera preferencia:</strong> {item.preferencia1}</li>
            <li><strong>Segunda preferencia:</strong> {item.preferencia2}</li>
            <li><strong>Tercera preferencia:</strong> {item.preferencia3}</li>
            <li><strong>Fecha registro de alumno:</strong> {item.fecha}</li>
            <li><strong>Año Cursado:</strong> {item.anyocursado}</li>
            <li><strong>Estado Curriculum:</strong> {item.estadocurriculum}</li>
            <li><strong>Estado Admisión:</strong> {item.estadoadmision}</li>
            <li><strong>Email Instituto:</strong> {item.emailinstituto}</li>
            <li><strong>Email personal:</strong> {item.email}</li>
            <li><strong>Teléfono Alumno:</strong> {item.telalumno}</li>
            <li><strong>Teléfono Familia:</strong> {item.telfamilia}</li>
            <li><strong>Carnet de Conducir:</strong> {item.carnetconducir}</li>
            <li><strong>Disponibilidad:</strong> {item.disponibilidad}</li>
            <li><strong>Número SS:</strong> {item.numeroSS}</li>
            <li><strong>Situación Laboral:</strong> {item.situacionlaboral}</li>
            <li><strong>Mes FCT:</strong> {item.mesFCT}</li>
            <li><strong>Domicilio:</strong> {item.domicilio}</li>
            <li><strong>Código Postal:</strong> {item.cp}</li>
            <li><strong>Localidad:</strong> {item.localidad}</li>
            <li><strong>Especialidad:</strong> {item.especialidad}</li>
            <li><strong>Nombre Tutor Legal:</strong> {item.nombretutorlegal}</li>
            <li><strong>Observaciones:</strong> {item.observaciones}</li>
          </ul>
        </div>
      ))}
    </div>
   );
}

export default GetAllStudentsComponent;
