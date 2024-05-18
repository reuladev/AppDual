import React, { useState, useEffect } from 'react';

import '../styles.css'; // Importa el archivo de estilos CSS

function AddCandidateComponent(){
    const [successMessage, setSuccessMessage] = useState(""); // Estado para almacenar el mensaje de éxito
    const [dataCandidate, setDataCandidate] = useState([]);
    const [candidateId, setCandidateId] = useState("");
    // ATRIBUTOS DEL CANDIDATO
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

    // ----------------------------------------------------------------   USE EFFECTS
    useEffect(() => {
        GetAllCandidates(); 
    }, []);

    function GetAllCandidates() {
        fetch('/getAllCandidates') 
        .then(response => response.json()) 
        .then(dataCandidate => {
            setDataCandidate(dataCandidate); 
            // Verificar si hay datos en la respuesta
            if (dataCandidate.length > 0) {
            // Obtener el último idalumno de la lista de estudiantes
            const lastCandidate = dataCandidate[dataCandidate.length - 1].idcandidato;
            setCandidateId(lastCandidate + 1); 
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            // Manejar errores de la solicitud
        });
    }

    function IncrementCandidateId(idcandidato){
        setCandidateId(idcandidato + 1);
      }

        
    const AddNewCandidate = async (studentId, assignmentDate, studentDualStatus, company1Status, company2Status, company3Status,
                                   firstCompany, secondCompany, thirdCompany, hiredCompany, dualStudentEmail, companyOpinion, 
                                   observations, shift, receivedAttachment, filledAttachment, calendarStatus, attachment, 
                                   relationshipType, cno) => {
                                    console.log('studentId:', studentId);
        console.log('assignmentDate:', assignmentDate);
        console.log('studentDualStatus:', studentDualStatus);
        console.log('company1Status:', company1Status);
        console.log('company2Status:', company2Status);
        console.log('company3Status:', company3Status);
        console.log('firstCompany:', firstCompany);
        console.log('secondCompany:', secondCompany);
        console.log('thirdCompany:', thirdCompany);
        console.log('hiredCompany:', hiredCompany);
        console.log('dualStudentEmail:', dualStudentEmail);
        console.log('companyOpinion:', companyOpinion);
        console.log('observations:', observations);
        console.log('shift:', shift);
        console.log('receivedAttachment:', receivedAttachment);
        console.log('filledAttachment:', filledAttachment);
        console.log('calendarStatus:', calendarStatus);
        console.log('attachment:', attachment);
        console.log('relationshipType:', relationshipType);
        console.log('cno:', cno);
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
                'cno': cno
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
          }
          
          const response = await fetch("/addCandidate", options);
          if (!response.ok) {
            throw new Error('Error adding the student');
          }
          const jsonResponse = await response.json();
          console.log(JSON.stringify(jsonResponse));
          return jsonResponse;
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      function HandleStudentIdChange(event){
        setStudentId(event.target.value);
      }
      
      function HandleAssignmentDateChange(event){
        setAssignmentDate(event.target.value);
      }
      
      function HandleStudentDualStatusChange(event){
        setStudentDualStatus(event.target.value);
      }
      
      function HandleCompany1StatusChange(event){
        setCompany1Status(event.target.value);
      }
      
      function HandleCompany2StatusChange(event){
        setCompany2Status(event.target.value);
      }
      
      function HandleCompany3StatusChange(event){
        setCompany3Status(event.target.value);
      }
      
      function HandleFirstCompanyChange(event){
        setFirstCompany(event.target.value);
      }
      
      function HandleSecondCompanyChange(event){
        setSecondCompany(event.target.value);
      }
      
      function HandleThirdCompanyChange(event){
        setThirdCompany(event.target.value);
      }
      
      function HandleHiredCompanyChange(event){
        setHiredCompany(event.target.value);
      }
      
      function HandleDualStudentEmailChange(event){
        setDualStudentEmail(event.target.value);
      }
      
      function HandleCompanyOpinionChange(event){
        setCompanyOpinion(event.target.value);
      }
      
      function HandleObservationsChange(event){
        setObservations(event.target.value);
      }
      
      function HandleShiftChange(event){
        setShift(event.target.value);
      }
      
      function HandleReceivedAttachmentChange(event){
        setReceivedAttachment(event.target.value);
      }
      
      function HandleFilledAttachmentChange(event){
        setFilledAttachment(event.target.value);
      }
      
      function HandleCalendarStatusChange(event){
        setCalendarStatus(event.target.value);
      }
      
      function HandleAttachmentChange(event){
        setAttachment(event.target.value);
      }
      
      function HandleRelationshipTypeChange(event){
        setRelationshipType(event.target.value);
      }
      
      function HandleCnoChange(event){
        setCno(event.target.value);
      }

      // --------------------------------------------------------------------------  EJECUCIONES
    function ButtonClickAddCandidate(){
        AddNewCandidate(studentId, assignmentDate, studentDualStatus, company1Status, company2Status, company3Status,
                       firstCompany, secondCompany, thirdCompany, hiredCompany, dualStudentEmail, companyOpinion, 
                       observations, shift, receivedAttachment, filledAttachment, calendarStatus, attachment, 
                       relationshipType, cno)
        IncrementCandidateId(candidateId);
        setSuccessMessage("La petición se ha añadido correctamente.");
    }

    // Renderizado del componente ------------------------------------------------  HTML
    return (
      <div clasdName="input-field">
      <form className="section">
        <h4 className="tittle">AÑADIR CANDIDATO:</h4>
          <div className="input-field">
            <label htmlFor="studentId-input">ID del Estudiante:</label>
            <input type="text" value={studentId} id="studentId-input" onChange={HandleStudentIdChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="assignmentDate-input">Fecha de Asignación:</label>
            <input type="text" value={assignmentDate} id="assignmentDate-input" onChange={HandleAssignmentDateChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="studentDualStatus-input">Estado de Estudiante Dual:</label>
            <input type="text" value={studentDualStatus} id="studentDualStatus-input" onChange={HandleStudentDualStatusChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="company1Status-input">Estado de Empresa 1:</label>
            <input type="text" value={company1Status} id="company1Status-input" onChange={HandleCompany1StatusChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="company2Status-input">Estado de Empresa 2:</label>
            <input type="text" value={company2Status} id="company2Status-input" onChange={HandleCompany2StatusChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="company3Status-input">Estado de Empresa 3:</label>
            <input type="text" value={company3Status} id="company3Status-input" onChange={HandleCompany3StatusChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="firstCompany-input">Primera Empresa:</label>
            <input type="text" value={firstCompany} id="firstCompany-input" onChange={HandleFirstCompanyChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="secondCompany-input">Segunda Empresa:</label>
            <input type="text" value={secondCompany} id="secondCompany-input" onChange={HandleSecondCompanyChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="thirdCompany-input">Tercera Empresa:</label>
            <input type="text" value={thirdCompany} id="thirdCompany-input" onChange={HandleThirdCompanyChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="hiredCompany-input">Empresa Contratada:</label>
            <input type="text" value={hiredCompany} id="hiredCompany-input" onChange={HandleHiredCompanyChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="dualStudentEmail-input">Email de Estudiante Dual:</label>
            <input type="text" value={dualStudentEmail} id="dualStudentEmail-input" onChange={HandleDualStudentEmailChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="companyOpinion-input">Opinión de la Empresa:</label>
            <input type="text" value={companyOpinion} id="companyOpinion-input" onChange={HandleCompanyOpinionChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="observations-input">Observaciones:</label>
            <input type="text" value={observations} id="observations-input" onChange={HandleObservationsChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="shift-input">Turno:</label>
            <input type="text" value={shift} id="shift-input" onChange={HandleShiftChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="receivedAttachment-input">Adjunto Recibido:</label>
            <input type="text" value={receivedAttachment} id="receivedAttachment-input" onChange={HandleReceivedAttachmentChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="filledAttachment-input">Adjunto Completado:</label>
            <input type="text" value={filledAttachment} id="filledAttachment-input" onChange={HandleFilledAttachmentChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="calendarStatus-input">Estado del Calendario:</label>
            <input type="text" value={calendarStatus} id="calendarStatus-input" onChange={HandleCalendarStatusChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="attachment-input">Adjunto:</label>
            <input type="text" value={attachment} id="attachment-input" onChange={HandleAttachmentChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="relationshipType-input">Tipo de Relación:</label>
            <input type="text" value={relationshipType} id="relationshipType-input" onChange={HandleRelationshipTypeChange} />
          </div>
      
          <div className="input-field">
            <label htmlFor="cno-input">CNO:</label>
            <input type="text" value={cno} id="cno-input" onChange={HandleCnoChange} />
          </div>
          <button className="addStudentButton" type="button" onClick={ButtonClickAddCandidate}> AÑADIR CANDIDATO </button>
        <div className="success-message">
            {successMessage && <p>{successMessage}</p>}
        </div>
      </form>
    </div>
  );   
}

export default AddCandidateComponent;


