import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

function GetStudent() {
  const location = useLocation(); // Obtiene el objeto location
  const navigate = useNavigate(); //Va a contener la ruta del componente al que redirigiremos al usuario.
  const {studentId2} = location.state || {}; // Obtén el idalumno del estado de 
  const [studentData, setStudentData] = useState([]); //Va a almacenar todos del estudiante

  const [idiomsData, setIdiomsData] = useState([]);
  const [docsData, setDocsData] = useState([]);
  const [calificationsData, setCalificationsData] = useState([]);
  const [preference1, setPreference1] = useState("");
  const [preference2, setPreference2] = useState("");
  const [preference3, setPreference3] = useState("");


    /*
    Si studentId recibe datos, es actualizado, navegamos hasta /getStudent
    */
    useEffect(() => {
        GetStudentDataByName (studentId2);
        GetStudentDocs (studentId2);
        GetStudentCalification (studentId2);
        GetStudentIdioms (studentId2);
        GetStudentPreference1 (studentId2);
        GetStudentPreference2 (studentId2);
        GetStudentPreference3 (studentId2);
        }, [studentId2]);


    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentDataByName = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentDataById", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            setStudentData(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentDocs = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentDocs", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            setDocsData(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentCalification = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentCalification", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            setCalificationsData(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentIdioms = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentIdioms", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            setIdiomsData(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentPreference1 = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentPreference1", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            console.log("Preference 1:", jsonResponse);
            setPreference1(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentPreference2 = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentPreference2", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            console.log("Preference 2:", jsonResponse);
            setPreference2(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const GetStudentPreference3 = async (studentId2) => {
        console.log("CONTENIDO: " + studentId2);
        try {
            const bodyParameters = {
            'idalumno': studentId2
            };
            const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/getStudentPreference3", options);
            if (!response.ok) {
            throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
            console.log("Preference 3:", jsonResponse);
            setPreference3(jsonResponse);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /*
      Al pulsar el boton de editar el usuario, lo redirije al componente
      studentEdit para poder editar cada campo.
      Tambien envia a este todos los datos necesarios para poder editarlos.
    */
    const ButtonClickEditStudent = () => {
        navigate(`/studentEdit`, { 
            state: { 
                studentId: studentId2, 
                studentData: studentData,
                idiomsData: idiomsData,
                docsData: docsData,
                calificationsData: calificationsData,
                preference1: preference1,
                preference2: preference2,
                preference3: preference3
            } 
        });
    };

    /* 
        Borrado de alumno
    */
    const StudentDeletionRequest = async (studentId2) => {
        try {
            const bodyParameters = {
                'idalumno': studentId2
            };
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyParameters)
            };
            const response = await fetch("/studentDeletionRequest", options);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const jsonResponse = await response.json();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    /* 
        Este boton ejecuta la peticion de borrado de un alumno.
        Nota: No tiene encuenta registros en otras tablas.
    */
    const ButtonClickDeleteStudent = () => {
        StudentDeletionRequest (studentId2);
    };

    return (
        
        <div className="results-container">
          {studentData.map((item, index) => (
            <div key={index} className="student-card">
              <ul className="student-info-list">
                <li><strong>Nombre:</strong> {item.nombre}</li>
                <li><strong>Sexo:</strong> {item.sexo}</li>
                <li><strong>DNI:</strong> {item.dni}</li>
                <li><strong>Nacionalidad:</strong> {item.nacionalidad}</li>
                <li><strong>Fecha de nacimiento:</strong> {item.fechanacimiento}</li>
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
          <div className="results-container">
                <div className="student-card">
                    <ul>
                        <li>
                        <strong>Primera preferencia:</strong> {preference1.length > 0 ? preference1[0].preferencia : ''}
                        </li>
                        <li>
                        <strong>Segunda preferencia:</strong> {preference2.length > 0 ? preference2[0].preferencia : ''}
                        </li>
                        <li>
                        <strong>Tercera preferencia:</strong> {preference3.length > 0 ? preference3[0].preferencia : ''}
                        </li>
                    </ul>
                </div>
            </div>
          {calificationsData.map((item, index) => (
            <div key={index} className="student-card">
              <ul className="student-info-list">
                <li><strong>Nota media:</strong> {item.notamedia}</li>
                <li><strong>Nota idioma:</strong> {item.notaidioma}</li>
                <li><strong>Nota madurez:</strong> {item.notamadurez}</li>
                <li><strong>Nota competencia:</strong> {item.notacompetencia}</li>
                <li><strong>Número de faltas:</strong> {item.numfaltas}</li>
                <li><strong>Nota faltas:</strong> {item.notafaltas}</li>
                <li><strong>Nota global:</strong> {item.notaglobal}</li>
                <li><strong>Observaciones:</strong> {item.observaciones}</li>
              </ul>
            </div>
          ))}
            {/* Documentos */}
            <div className="student-card">
            <h4> DOCUMENTOS: </h4>
            {docsData.map((doc, docIndex) => ( 
                <div key={docIndex}>
                    <li><strong>Documento:</strong> {doc.docalum}</li>
                    <li><strong>URL:</strong> {doc.url}</li>
                </div>
                ))}
            </div>
             {/* Idiomas */}
            <div className="student-card">
                <h4> IDIOMAS: </h4>
                {idiomsData.map((idiom, idiomIndex) => ( 
                <div key={idiomIndex}>
                    <li><strong>IDIOMA:</strong> {idiom.idioma}</li>
                    <li><strong>TITULO:</strong> {idiom.titulo}</li>
                </div>
                ))}
            </div>
          {/* Botón de edición */}
          <button className="editButton" type="button" onClick={ButtonClickEditStudent}>
            EDITAR
          </button>
          {/* Botón de borrar */}
          <button className="deleteButton" type="button" onClick={ButtonClickDeleteStudent}>
            BORRAR
          </button>
        </div>
      );
    }

export default GetStudent;

