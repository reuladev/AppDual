import React, { useState, useEffect } from 'react';

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
    <div>
       <h1>Lista de alumnos</h1>
      {/* Bucle for */}
      {data.map(item => (
        <div key={item.idalumno}>
          <p>{item.ididioma}</p>
          <p>{item.nombre}</p>
          <p>{item.sexo}</p>
          <p>{item.dni}</p>
          <p>{item.fechanacimiento}</p>
          <p>{item.estadocurriculum}</p>
          <p>{item.estadoadmision}</p>
          <p>{item.emailinstituto}</p>
          <p>{item.nacionalidad}</p>
          <p>{item.carnetconducir}</p>
          <p>{item.disponibilidad}</p>
          <p>{item.numeroSS}</p>
          <p>{item.situacionlaboral}</p>
          <p>{item.nombretutorlegal}</p>
          <p>{item.dnitutorlegal}</p>
          <p>{item.especialidad}</p>
          <p>{item.telalumno}</p>
          <p>{item.telfamilia}</p>
          <p>{item.email}</p>
          <p>{item.observaciones}</p>
          <p>{item.mesFCT}</p>
        </div>
      ))}
    </div>
   );
}

export default GetAllStudentsComponent;
