import React, { useState, useEffect } from 'react';
import '../styles.css'; // Importa el archivo de estilos CSS global

/* Como hay atributos que tienen un id y no el contenido persé, para estos campos,
   habrá dos atributos, el que se muestre el contenido, y el que mantenga la id.
*/
function SearchCandidateToUpdate (){
    const [dataCandidate, setDataCandidate] = useState ([]); //Este es el array que va a contener los atributos de la tabla candidatos para el alumno solicitado.
    const [dataIdsCandidate, setDataIdsCandidate] = useState ([]); //Este es el array que va a contener el contenido de los campos que tienen una id encuenta del contenido.
    const [dataStudent, setDataStudent] = useState ([]);  // ¿Es necesario?
    const [candidateId, setCandidateId] = useState ("");
    const [studentName, setStudentName] = useState (""); //Esta variable va a guardar el nombre del alumno que quiera buscar el usuario.

    // Estos son los atributos REALES, alguno se muestran y otros, los que tienen la id, no.
    const [studentId, setStudentId] = useState("");
    const [assignmentDate, setAssignmentDate] = useState("");
    const [studentDualStatus, setStudentDualStatus] = useState("");
    const [company1Status, setCompany1Status] = useState("");
    const [company2Status, setCompany2Status] = useState("");
    const [company3Status, setCompany3Status] = useState("");
    const [firstCompany, setFirstCompany] = useState("");
    const [secondCompany, setSecondCompany] = useState("");
    const [thirdCompany, setThirdCompany] = useState("");
    const [hiredCompany, setHiredCompany] = useState("");
    const [dualStudentEmail, setDualStudentEmail] = useState("");
    const [companyOpinion, setCompanyOpinion] = useState("");
    const [observations, setObservations] = useState("");
    const [shift, setShift] = useState("");
    const [receivedAttachment, setReceivedAttachment] = useState("");
    const [filledAttachment, setFilledAttachment] = useState("");
    const [calendarStatus, setCalendarStatus] = useState("");
    const [attachment, setAttachment] = useState("");
    const [relationshipType, setRelationshipType] = useState("");
    const [cno, setCno] = useState("");
    // Estos son los atributos que se MUESTRAN al usuario
    const [studentIdName, setStudentIdName] = useState("");
    const [studentDualStatusName, setStudentDualStatusName] = useState("");
    const [company1StatusName, setCompany1StatusName] = useState("");
    const [company2StatusName, setCompany2StatusName] = useState("");
    const [company3StatusName, setCompany3StatusName] = useState("");
    const [firstCompanyName, setFirstCompanyName] = useState("");
    const [secondCompanyName, setSecondCompanyName] = useState("");
    const [thirdCompanyName, setThirdCompanyName] = useState("");
    const [hiredCompanyName, setHiredCompanyName] = useState("");

    useEffect(() => {
        FoundStudentIdsData(studentId, studentDualStatus, company1Status, company2Status, company3Status, firstCompany, secondCompany, thirdCompany, hiredCompany);
        FoundStudentIdsByUserRequest (studentIdName, studentDualStatusName, company1StatusName, company2StatusName, company3StatusName, firstCompanyName, secondCompanyName, thirdCompanyName, hiredCompanyName);
      }, [studentId, studentDualStatus, company1Status, company2Status, company3Status, firstCompany, secondCompany, thirdCompany, hiredCompany, 
         studentIdName, studentDualStatusName, company1StatusName, company2StatusName, company3StatusName, firstCompanyName, secondCompanyName, thirdCompanyName, hiredCompanyName]); 
    
      

    /*
        Peticion para actualizar los registros de un estudiante.
    */
        const UpdateCandidate = async (studentId, assignmentDate, studentDualStatus, company1Status, company2Status, company3Status, 
                                        firstCompany, secondCompany, thirdCompany, hiredCompany, dualStudentEmail, companyOpinion, 
                                        observations, shift, receivedAttachment, filledAttachment, calendarStatus, attachment, 
                                        relationshipType, cno, candidateId
        ) => {
            try {
                const bodyParameters = {
                    'idalumno': studentId,
                    'fechaasignacion': assignmentDate,
                    'estadodualalumno': studentDualStatus,
                    'estadoempresa1': company1Status,
                    'estadoempresa2': company2Status,
                    'estadoempresa3': company3Status,
                    'primeraempresa': firstCompany,
                    'segundaempresa': secondCompany,
                    'terceraempresa': thirdCompany,
                    'empresacontratada': hiredCompany,
                    'emaildualalumno': dualStudentEmail,
                    'opinionempresa': companyOpinion,
                    'observaciones': observations,
                    'turno': shift,
                    'anexorecibido': receivedAttachment,
                    'anexorellenado': filledAttachment,
                    'estadocalendario': calendarStatus,
                    'anexo': attachment,
                    'tiporelacion': relationshipType,
                    'cno': cno,
                    'idcandidato': candidateId
                }
        
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyParameters)
                }
        
                const response = await fetch("/updateCandidate", options);
        
                if (!response.ok) {
                    throw new Error('Error al buscar ids de candidato');
                }
        
                const jsonResponse = await response.json();
                // Solo si la respuesta contiene datos
                console.log("Contenido de la peticion getCandidatesIdFromData: " + jsonResponse);
                if (jsonResponse.length > 0) {
        
                } else {
                    console.log("No se encontraron datos para el estudiante solicitado.");
                }
        
                return jsonResponse;
            } catch (error) {
                console.error('Error:', error.message);
            }
        }



    /*
        Peticion para obtener las ids de cada campo segun el contenido introducido por el usuario
    */
      const FoundStudentIdsByUserRequest = async (studentIdName, studentDualStatusName, company1StatusName, company2StatusName, company3StatusName, firstCompanyName, secondCompanyName, thirdCompanyName, hiredCompanyName) => {
        try {
            const bodyParameters = {
                'idalumno': studentIdName,
                'estadodualalumno': studentDualStatusName,
                'estadoempresa1': company1StatusName,
                'estadoempresa2': company2StatusName,
                'estadoempresa3': company3StatusName,
                'primeraempresa': firstCompanyName,
                'segundaempresa': secondCompanyName,
                'terceraempresa': thirdCompanyName,
                'empresacontratada': hiredCompanyName,
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyParameters)
            }
    
            const response = await fetch("/getCandidatesIdFromData", options);
    
            if (!response.ok) {
                throw new Error('Error al buscar ids de candidato');
            }
    
            const jsonResponse = await response.json();
            // Solo si la respuesta contiene datos
            console.log("Contenido de la peticion getCandidatesIdFromData: " + jsonResponse);
            if (jsonResponse.length > 0) {
                const dataIdsCandidate = jsonResponse[0]; // Accede al primer objeto del array
                // Asigna los valores a las variables de estado
                setStudentId(dataIdsCandidate.idalumno);
                setStudentDualStatus(dataIdsCandidate.estadodualalumno);
                setCompany1Status(dataIdsCandidate.estadoempresa1);
                setCompany2Status(dataIdsCandidate.estadoempresa2);
                setCompany3Status(dataIdsCandidate.estadoempresa3);
                setFirstCompany(dataIdsCandidate.primeraempresa);
                setSecondCompany(dataIdsCandidate.segundaempresa);
                setThirdCompany(dataIdsCandidate.terceraempresa);
                setHiredCompany(dataIdsCandidate.empresacontratada);

            } else {
                console.log("No se encontraron datos para el estudiante solicitado.");
            }
    
            return jsonResponse;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }



    /*
        Peticion para obtener los datos de un candidato segun su NOMBRE.
    */
    const SearchCandidatesDates = async (studentName) => {
        try {
            const bodyParameters = {
                'nombre': studentName
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyParameters)
            }
    
            const response = await fetch("/getCandidatesData", options);
    
            if (!response.ok) {
                throw new Error('Error al buscar el estudiante');
            }
    
            const jsonResponse = await response.json();
            console.log("Contenido de la peticion /getCandidatesData: " + jsonResponse);
            // Solo si la respuesta contiene datos
            if (jsonResponse.length > 0) {
                const dataCandidate = jsonResponse[0]; // Accede al primer objeto del array
    
                // Asigna los valores a las variables de estado
                setCandidateId(dataCandidate.idcandidato);
                setStudentId(dataCandidate.idalumno);
                setAssignmentDate(dataCandidate.fechaasignacion);
                setStudentDualStatus(dataCandidate.estadodualalumno);
                setCompany1Status(dataCandidate.estadoempresa1);
                setCompany2Status(dataCandidate.estadoempresa2);
                setCompany3Status(dataCandidate.estadoempresa3);
                setFirstCompany(dataCandidate.primeraempresa);
                setSecondCompany(dataCandidate.segundaempresa);
                setThirdCompany(dataCandidate.terceraempresa);
                setHiredCompany(dataCandidate.empresacontratada);
                setDualStudentEmail(dataCandidate.emaildualalumno);
                setCompanyOpinion(dataCandidate.opinionempresa);
                setObservations(dataCandidate.observaciones);
                setShift(dataCandidate.turno);
                setReceivedAttachment(dataCandidate.anexorecibido);
                setFilledAttachment(dataCandidate.anexorellenado);
                setCalendarStatus(dataCandidate.estadocalendario);
                setAttachment(dataCandidate.anexo);
                setRelationshipType(dataCandidate.tiporelacion);
                setCno(dataCandidate.cno);
                console.log("Candidate ID:", dataCandidate.idcandidato);
                console.log("Student ID:", dataCandidate.idalumno);
                console.log("Assignment Date:", dataCandidate.fechaasignacion);
                console.log("Student Dual Status:", dataCandidate.estadodualalumno);
                console.log("Company 1 Status:", dataCandidate.estadoempresa1);
                console.log("Company 2 Status:", dataCandidate.estadoempresa2);
                console.log("Company 3 Status:", dataCandidate.estadoempresa3);
                console.log("First Company:", dataCandidate.primeraempresa);
                console.log("Second Company:", dataCandidate.segundaempresa);
                console.log("Third Company:", dataCandidate.terceraempresa);
                console.log("Hired Company:", dataCandidate.empresacontratada);
                console.log("Dual Student Email:", dataCandidate.emaildualalumno);
                console.log("Company Opinion:", dataCandidate.opinionempresa);
                console.log("Observations:", dataCandidate.observaciones);
                console.log("Shift:", dataCandidate.turno);
                console.log("Received Attachment:", dataCandidate.anexorecibido);
                console.log("Filled Attachment:", dataCandidate.anexorellenado);
                console.log("Calendar Status:", dataCandidate.estadocalendario);
                console.log("Attachment:", dataCandidate.anexo);
                console.log("Relationship Type:", dataCandidate.tiporelacion);
                console.log("CNO:", dataCandidate.cno);

            } else {
                console.log("No se encontraron datos para el estudiante solicitado.");
            }
    
            return jsonResponse;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    /*
        Peticion para encontrar el contenido de los atributos que contienen la id en vez del contenido.
    */
    const FoundStudentIdsData = async (studentId, studentDualStatus, company1Status, company2Status, company3Status, firstCompany, secondCompany, thirdCompany, hiredCompany) => {
        try {
            const bodyParameters = {
                'idalumno': studentId,
                'estadodualalumno': studentDualStatus,
                'estadoempresa1': company1Status,
                'estadoempresa2': company2Status,
                'estadoempresa3': company3Status,
                'primeraempresa': firstCompany,
                'segundaempresa': secondCompany,
                'terceraempresa': thirdCompany,
                'empresacontratada': hiredCompany,
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyParameters)
            }
    
            const response = await fetch("/getCandidatesIdData", options);
    
            if (!response.ok) {
                throw new Error('Error al buscar ids de candidato');
            }
    
            const jsonResponse = await response.json();
            // Solo si la respuesta contiene datos
            console.log("Contenido de la peticion getCandidatesIdData: " + jsonResponse);
            if (jsonResponse.length > 0) {
                const dataIdsCandidate = jsonResponse[0]; // Accede al primer objeto del array
                // Asigna los valores a las variables de estado
                setStudentIdName(dataIdsCandidate.idalumno);
                setStudentDualStatusName(dataIdsCandidate.estadodualalumno);
                setCompany1StatusName(dataIdsCandidate.estadoempresa1);
                setCompany2StatusName(dataIdsCandidate.estadoempresa2);
                setCompany3StatusName(dataIdsCandidate.estadoempresa3);
                setFirstCompanyName(dataIdsCandidate.primeraempresa);
                setSecondCompanyName(dataIdsCandidate.segundaempresa);
                setThirdCompanyName(dataIdsCandidate.terceraempresa);
                setHiredCompanyName(dataIdsCandidate.empresacontratada);

            } else {
                console.log("No se encontraron datos para el estudiante solicitado.");
            }
    
            return jsonResponse;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // FUNCTIONS

    function handleAssignmentDateChange(event) {
        setAssignmentDate(event.target.value); // Actualiza el estado de assignmentDate
    }
    
    function handleStudentIdNameChange(event) {
    setStudentIdName(event.target.value); // Actualiza el estado de studentIdName
    }
    
    function handleStudentDualStatusNameChange(event) {
    setStudentDualStatusName(event.target.value); // Actualiza el estado de studentDualStatusName
    }
    
    function handleCompany1StatusNameChange(event) {
    setCompany1StatusName(event.target.value); // Actualiza el estado de company1StatusName
    }
    
    function handleCompany2StatusNameChange(event) {
    setCompany2StatusName(event.target.value); // Actualiza el estado de company2StatusName
    }
    
    function handleCompany3StatusNameChange(event) {
    setCompany3StatusName(event.target.value); // Actualiza el estado de company3StatusName
    }
    
    function handleFirstCompanyNameChange(event) {
    setFirstCompanyName(event.target.value); // Actualiza el estado de firstCompanyName
    }
    
    function handleSecondCompanyNameChange(event) {
    setSecondCompanyName(event.target.value); // Actualiza el estado de secondCompanyName
    }
    
    function handleThirdCompanyNameChange(event) {
    setThirdCompanyName(event.target.value); // Actualiza el estado de thirdCompanyName
    }
    
    function handleHiredCompanyNameChange(event) {
    setHiredCompanyName(event.target.value); // Actualiza el estado de hiredCompanyName
    }
    
    function handleDualStudentEmailChange(event) {
    setDualStudentEmail(event.target.value); // Actualiza el estado de dualStudentEmail
    }
    
    function handleCompanyOpinionChange(event) {
    setCompanyOpinion(event.target.value); // Actualiza el estado de companyOpinion
    }
    
    function handleObservationsChange(event) {
    setObservations(event.target.value); // Actualiza el estado de observations
    }
    
    function handleShiftChange(event) {
    setShift(event.target.value); // Actualiza el estado de shift
    }
    
    function handleReceivedAttachmentChange(event) {
    setReceivedAttachment(event.target.value); // Actualiza el estado de receivedAttachment
    }
    
    function handleFilledAttachmentChange(event) {
    setFilledAttachment(event.target.value); // Actualiza el estado de filledAttachment
    }
    
    function handleCalendarStatusChange(event) {
    setCalendarStatus(event.target.value); // Actualiza el estado de calendarStatus
    }
    
    function handleAttachmentChange(event) {
    setAttachment(event.target.value); // Actualiza el estado de attachment
    }
    
    function handleRelationshipTypeChange(event) {
    setRelationshipType(event.target.value); // Actualiza el estado de relationshipType
    }
    
    function handleCnoChange(event) {
    setCno(event.target.value); // Actualiza el estado de cno

    }

    function handleStudentNameChange(event) {
        setStudentName(event.target.value); // Actualiza el estado de studentName
    }

      // EJECUCIONES
      function ButtonClickObtainCandidateData (){
            SearchCandidatesDates (studentName);
      }

      function ButtonClickUpdateCandidate (){
            UpdateCandidate ();
      }

      return (
        <div>
            <div className="input-field">
                <h4 htmlFor="studentName">INTRODUCE EL NOMBRE DEL CANDIDATO QUE QUIERES MODIFICAR</h4>
                <input type="text" value={studentName} id="studentName-input"  placeholder={"NOMBRE DEL ALUMNO"}  onChange={handleStudentNameChange} />
                <button  className="updateCandidate"  type="button"  onClick={ ButtonClickObtainCandidateData}> OBTENER DATOS DEL CANDIDATO </button>
            </div>
            <div className="input-field">
                <label htmlFor="assignmentDate-input">Fecha de Asignación:</label>
                <input type="text" value={assignmentDate} id="assignmentDate-input" onChange={handleAssignmentDateChange} />
            </div>

            <div className="input-field">
                <label htmlFor="studentIdName-input">ID del Alumno:</label>
                <input type="text" value={studentIdName} id="studentIdName-input" onChange={handleStudentIdNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="studentDualStatusName-input">Estado Dual del Alumno:</label>
                <input type="text" value={studentDualStatusName} id="studentDualStatusName-input" onChange={handleStudentDualStatusNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="company1StatusName-input">Estado de la Empresa 1:</label>
                <input type="text" value={company1StatusName} id="company1StatusName-input" onChange={handleCompany1StatusNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="company2StatusName-input">Estado de la Empresa 2:</label>
                <input type="text" value={company2StatusName} id="company2StatusName-input" onChange={handleCompany2StatusNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="company3StatusName-input">Estado de la Empresa 3:</label>
                <input type="text" value={company3StatusName} id="company3StatusName-input" onChange={handleCompany3StatusNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="firstCompanyName-input">Nombre de la Primera Empresa:</label>
                <input type="text" value={firstCompanyName} id="firstCompanyName-input" onChange={handleFirstCompanyNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="secondCompanyName-input">Nombre de la Segunda Empresa:</label>
                <input type="text" value={secondCompanyName} id="secondCompanyName-input" onChange={handleSecondCompanyNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="thirdCompanyName-input">Nombre de la Tercera Empresa:</label>
                <input type="text" value={thirdCompanyName} id="thirdCompanyName-input" onChange={handleThirdCompanyNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="hiredCompanyName-input">Nombre de la Empresa Contratada:</label>
                <input type="text" value={hiredCompanyName} id="hiredCompanyName-input" onChange={handleHiredCompanyNameChange} />
            </div>

            <div className="input-field">
                <label htmlFor="dualStudentEmail-input">Correo Electrónico del Alumno Dual:</label>
                <input type="text" value={dualStudentEmail} id="dualStudentEmail-input" onChange={handleDualStudentEmailChange} />
            </div>

            <div className="input-field">
                <label htmlFor="companyOpinion-input">Opinión de la Empresa:</label>
                <input type="text" value={companyOpinion} id="companyOpinion-input" onChange={handleCompanyOpinionChange} />
            </div>

            <div className="input-field">
                <label htmlFor="observations-input">Observaciones:</label>
                <input type="text" value={observations} id="observations-input" onChange={handleObservationsChange} />
            </div>

            <div className="input-field">
                <label htmlFor="shift-input">Turno:</label>
                <input type="text" value={shift} id="shift-input" onChange={handleShiftChange} />
            </div>

            <div className="input-field">
                <label htmlFor="receivedAttachment-input">Adjunto Recibido:</label>
                <input type="text" value={receivedAttachment} id="receivedAttachment-input" onChange={handleReceivedAttachmentChange} />
            </div>

            <div className="input-field">
                <label htmlFor="filledAttachment-input">Adjunto Completado:</label>
                <input type="text" value={filledAttachment} id="filledAttachment-input" onChange={handleFilledAttachmentChange} />
            </div>

            <div className="input-field">
                <label htmlFor="calendarStatus-input">Estado del Calendario:</label>
                <input type="text" value={calendarStatus} id="calendarStatus-input" onChange={handleCalendarStatusChange} />
            </div>

            <div className="input-field">
                <label htmlFor="attachment-input">Adjunto:</label>
                <input type="text" value={attachment} id="attachment-input" onChange={handleAttachmentChange} />
            </div>

            <div className="input-field">
                <label htmlFor="relationshipType-input">Tipo de Relación:</label>
                <input type="text" value={relationshipType} id="relationshipType-input" onChange={handleRelationshipTypeChange} />
            </div>

            <div className="input-field">
                <label htmlFor="cno-input">CNO:</label>
                <input type="text" value={cno} id="cno-input" onChange={handleCnoChange} />
            </div>
            <div className="input-field">
                <button className="searchStudent" type="button" onClick={ButtonClickUpdateCandidate}> ACTUALIZAR CANDIATO </button>
            </div>
        </div>
      );
}
export default SearchCandidateToUpdate;