import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';

function GetCandidate() {
  const location = useLocation();
  const navigate = useNavigate(); //Va a contener la ruta del componente al que redirigiremos al usuario.
  const { candidateId2 } = location.state || {};
  const [candidateData, setCandidateData] = useState([]);
  const [candidateDataPlusAttributes, setCandidateDataPlusAttributes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCandidateDataByIdResponse = await fetchCandidateDataById(candidateId2);
        const getCandidateDataByIdPlusAttributesResponse = await fetchCandidateDataByIdPlusAttributes(candidateId2);
  
        console.log('Candidate Data:', getCandidateDataByIdResponse);
        console.log('Candidate Data with Attributes:', getCandidateDataByIdPlusAttributesResponse);
  
        setCandidateData(getCandidateDataByIdResponse);
        setCandidateDataPlusAttributes(getCandidateDataByIdPlusAttributesResponse);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    if (candidateId2) {
      fetchData();
    }
  }, [candidateId2]);

  const fetchCandidateDataById = async (id) => {
    try {
      const bodyParameters = {
        'idcandidato': id
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParameters)
      };
      const response = await fetch("/getCandidateDataById", options);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  };

  const fetchCandidateDataByIdPlusAttributes = async (candidateId2) => {
    try {
      const bodyParameters = {
        'idcandidato': candidateId2
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParameters)
      };
      const response = await fetch("/getCandidateDataByIdPlusAtributtes", options);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  };

    /*
      Al pulsar el boton de editar el usuario, lo redirije al componente
      studentEdit para poder editar cada campo.
      Tambien envia a este todos los datos necesarios para poder editarlos.
    */
    const ButtonClickEditCandidate = () => {
        navigate(`/candidateEdit`, { 
            state: { 
                candidateId: candidateId2, 
                candidateData: candidateData,
                candidateDataPlusAttributes: candidateDataPlusAttributes
            } 
        });
    };

    /* 
        Borrado de candidato
    */
        const CandidateDeletionRequest = async (candidateId2) => {
          try {
              const bodyParameters = {
                  'idcandidato': candidateId2
              };
              const options = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(bodyParameters)
              };
              const response = await fetch("/candidateDeletionRequest", options);
              if (!response.ok) {
                  throw new Error('Error en la solicitud');
              }
              const jsonResponse = await response.json();
          } catch (error) {
              console.error('Error:', error.message);
          }
      };

    /* 
        Este boton ejecuta la peticion de borrado de un candidato.
        Nota: No tiene encuenta registros en otras tablas.
    */
    const ButtonClickDeleteCandidate = () => {
        CandidateDeletionRequest (candidateId2);
    };

  return (
    <div>
      <div className="results-container">
      {candidateDataPlusAttributes.map((item, index) => (
          <div key={index} className="candidate-card">
            <ul className="candidate-info-list">
              <li><strong>Nombre:</strong> {item.nombre}</li>
              <li><strong>Estado Alumno:</strong> {item.estado_alumno}</li>
              <li><strong>Empresa 1:</strong> {item.empresa1}</li>
              <li><strong>Estado Empresa 1:</strong> {item.estado_empresa1}</li>
              <li><strong>Empresa 2:</strong> {item.empresa2}</li>
              <li><strong>Estado Empresa 2:</strong> {item.estado_empresa2}</li>
              <li><strong>Empresa 3:</strong> {item.empresa3}</li>
              <li><strong>Estado Empresa 3:</strong> {item.estado_empresa3}</li>
              <li><strong>Empresa Contratada:</strong> {item.empresa_contratada}</li>
            </ul>
          </div>
        ))}
        {candidateData.map((item, index) => (
          <div key={index} className="candidate-card">
            <ul className="candidate-info-list">
              <li><strong>Fecha Asignación:</strong> {item.fechaasignacion}</li>
              <li><strong>Anexo:</strong> {item.anexo}</li>
              <li><strong>Anexo Recibido:</strong> {item.anexorecibido}</li>
              <li><strong>Anexo Rellenado:</strong> {item.anexorellenado}</li>
              <li><strong>CNO:</strong> {item.cno}</li>
              <li><strong>Email Dual Alumno:</strong> {item.emaildualalumno}</li>
              <li><strong>Estado Calendario:</strong> {item.estadocalendario}</li>
              <li><strong>Observaciones:</strong> {item.observaciones}</li>
              <li><strong>Opinión Empresa:</strong> {item.opinionempresa}</li>
              <li><strong>Tipo Relación:</strong> {item.tiporelacion}</li>
              <li><strong>Turno:</strong> {item.turno}</li>
            </ul>
          </div>
        ))}
      </div>
      {/* Botón de edición */}
      <button className="editButton" type="button" onClick={ButtonClickEditCandidate}>
        EDITAR
      </button>
      {/* Botón de borrar */}
      <button className="deleteButton" type="button" onClick={ButtonClickDeleteCandidate}>
            BORRAR
          </button>
    </div>
  );
}

export default GetCandidate;