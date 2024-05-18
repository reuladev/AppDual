import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

function SearchCandidateComponent() {
  const [name, setName] = useState(""); // Va a contener el nombre que introduzca el usuario.
  const [candidateData, setCandidateData] = useState([]); //Va a almacenar todos del estudiante
  const [seeMore, setSeeMore] = useState(false); //Boolean que va a permitir mostrar o no el resto del codigo HTML cuand el usuario introduzca un nombre en el buscador.
  const [candidateId, setCandidateId] = useState(""); //Va a contener el idalumno que seleccione el usuario cuando pulse sobre el div que quiere y sera enviado al componente GetStudent.
  const navigate = useNavigate(); //Va a contener la ruta del componente al que redirigiremos al usuario.

  /*
    Si nombre (que almacena lo que el usuario escriba) recibe contenido nuevo, es actualizado,
    hace la peticion para obtener los datos de los alumnos a los que se asemeje lo introducido
    por el usuario, sino, mantiene el array que almacena los datos vacio y pone en falso la 
    variable booleana seeMore para no mostrar nada.
  */
  useEffect(() => {
    if (name) {
      GetCandidateDataByName(name);
    } else {
      setCandidateData([]);
      setSeeMore(false);
    }
  }, [name]);

  /*
    Si studentId recibe datos, es actualizado, navegamos hasta /getStudent
  */
  useEffect(() => {
    console.log("Valor actualizado de StudentId en SearchStudent:", candidateId);
    // Navegar solo si studentId ha sido actualizado
    if (candidateId) {
      navigate(`/getCandidate`, { state: { candidateId2: candidateId } });
    }
  }, [candidateId]);

  /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
  */
  const GetCandidateDataByName = async (name) => {
    try {
      const bodyParameters = {
        'nombre': name
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParameters)
      };
      const response = await fetch("/getCandidateDataByName", options);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const jsonResponse = await response.json();
      setCandidateData(jsonResponse);
      setSeeMore(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  /*
    Permite guardar el nombre que solicita el usuario en tiempo real.
  */
  const HandleNameChange = (event) => {
    setName(event.target.value);
  };

  /*
    Recoge el idalumno del alumno que ha sido finalmente seleccionado por el usuario 
    y lo graba en studentId.
  */
  const handleCandidateSelect = (idcandidato) => {
    console.log("Valor de idalumno en SearchStudent:", idcandidato);
    setCandidateId(idcandidato);
  };

  /*
    Muestra el codigo HTML, se compone de dos partes:
      - Primero, muestra la barra del buscador, cuando el usuario escribe y name comienza a recibir contenido
       se habilita la segunda parte.
      - Segundo, muestra 4 atributos de todos los posibles alumnos que coincidan en su nombre con lo introduci-
       do por el usuario en name, cuando el usuario pincha sobre el div del alumno que quiere, se activa la 
       funcion handleStudentSelect que graba el idalumno de ese alumno, lo envia al componente GetStudent y nos 
       redirige a el.
  */
  return (
    <div className="search-container">
      <h4>BUSCADOR DE CANDIDATOS</h4>
      <input  type="text" value={name} id="name-input"  onChange={HandleNameChange}  placeholder="Ejemplo: 2024"  className="search-input"/>
      
      {seeMore && candidateData.length > 0 && (
        <div className="results-container">
          {candidateData.map((item, index) => (
            <Link to="#" className="student-link" key={index} onClick={() => handleCandidateSelect(item.idcandidato)}>
              <div className="student-card">
                <ul className="student-info-list">
                  <li><strong>Nombre:</strong> {item.nombre}</li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchCandidateComponent;