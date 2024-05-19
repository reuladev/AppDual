import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // --> Permite la interaccion entre componentes: enviar datos, redireccionar a otros componentes etc
import '../styles.css';
import { format } from 'date-fns'; // --> Para poder formatear la fecha DD-MM-AAAA

function GetCandidateEdit() {

//ATRIBUTOS DE GETCANDIDATE
const location = useLocation();
const { candidateId} = location.state || {};
const { candidateData } = location.state || {};
const { candidateDataPlusAttributes } = location.state || {};

const [studentId, setStudentId] = useState("");
const [name, setName] = useState("");
const [studentStatus, setStudentStatus] = useState("");
const [company1, setCompany1] = useState("");
const [company1Status, setCompany1Status] = useState("");
const [company2, setCompany2] = useState("");
const [company2Status, setCompany2Status] = useState("");
const [company3, setCompany3] = useState("");
const [company3Status, setCompany3Status] = useState("");
const [hiredCompany, setHiredCompany] = useState("");
const [assignmentDate, setAssignmentDate] = useState("");
const [annex, setAnnex] = useState("");
const [annexReceived, setAnnexReceived] = useState("");
const [annexFilled, setAnnexFilled] = useState("");
const [cno, setCno] = useState("");
const [studentDualEmail, setStudentDualEmail] = useState("");
const [calendarStatus, setCalendarStatus] = useState("");
const [observations, setObservations] = useState("");
const [companyOpinion, setCompanyOpinion] = useState("");
const [relationshipType, setRelationshipType] = useState("");
const [shift, setShift] = useState("");

/*
      Actualizamos datos si existen, primero verificamos si hay datos 
      y luego extraemos del array el contenido para cada atributo.
      Nota: Por algun motivo, si existe un valor 0, no va a coger el 
            contenido haciendolo como con el resto, encuenta hay que 
            extraelo antes, meterlo en una constante y settear la 
            constante.
*/
useEffect(() => {
      const item2 = candidateDataPlusAttributes[0];
      const item = candidateData[0];
      const anexo =  candidateData[0].anexo;
      const anexoRecibido = candidateData[0].anexorecibido;
      const anexoRellenado = candidateData[0].anexorellenado;
      const estadoCalendario = candidateData[0].estadocalendario;
      console.log("Esto es lo que contiene candidateData: ", item);
      setStudentId(item.idalumno || '');
      setName(item2.nombre || '');
      setStudentStatus(item.estadodualalumno || '');
      setCompany1(item.primeraempresa|| '');
      setCompany1Status(item.estadoempresa1 || '');
      setCompany2(item.segundaempresa || '');
      setCompany2Status(item.estadoempresa2 || '');
      setCompany3(item.terceraempresa || '');
      setCompany3Status(item.estadoempresa3 || '');
      setHiredCompany(item.empresacontratada || '');
      setAssignmentDate(item.fechaasignacion || '');
      setAnnex(anexo);
      setAnnexReceived(anexoRecibido);
      setAnnexFilled(anexoRellenado);
      setCno(item.cno || '');
      setStudentDualEmail(item.emaildualalumno || '');
      setCalendarStatus(estadoCalendario);
      setObservations(item.observaciones|| '');
      setCompanyOpinion(item.opinionempresa || '');
      setRelationshipType(item.tiporelacion || '');
      setShift(item.turno|| '');
    }, [candidateData, candidateDataPlusAttributes]);

  /*
      Aqui guardamos los datos que corresponden al candidato.
    */
      const UpdateCandidate = async (
        candidateId, studentStatus, company1, company1Status, company2, company2Status, company3, company3Status,
        hiredCompany, assignmentDate, annex, annexReceived, annexFilled, cno, studentDualEmail, 
        calendarStatus, observations, companyOpinion, relationshipType, shift, studentId
      ) => {

        console.log("idcandidato:", candidateId);
        console.log("idalumno:", studentId);
        console.log("fechaasignacion:", assignmentDate);
        console.log("estadodualalumno:", studentStatus);
        console.log("estadoempresa1:", company1Status);
        console.log("estadoempresa2:", company2Status);
        console.log("estadoempresa3:", company3Status);
        console.log("primeraempresa:", company1);
        console.log("segundaempresa:", company2);
        console.log("terceraempresa:", company3);
        console.log("empresacontratada:", hiredCompany);
        console.log("emaildualalumno:", studentDualEmail);
        console.log("opinionempresa:", companyOpinion);
        console.log("observaciones:", observations);
        console.log("turno:", shift);
        console.log("anexorecibido:", annexReceived);
        console.log("anexorellenado:", annexFilled);
        console.log("estadocalendario:", calendarStatus);
        console.log("anexo:", annex);
        console.log("tiporelacion:", relationshipType);
        console.log("cno:", cno);

        try {
          const bodyParameters = {
            'idcandidato': candidateId,
            'idalumno': studentId,
            'estadodualalumno': studentStatus,
            'primeraempresa': company1,
            'estadoempresa1': company1Status,
            'segundaempresa': company2,
            'estadoempresa2': company2Status,
            'terceraempresa': company3,
            'estadoempresa3': company3Status,
            'empresacontratada': hiredCompany,
            'fechaasignacion': assignmentDate,
            'anexo': annex,
            'anexorecibido': annexReceived,
            'anexorellenado': annexFilled,
            'cno': cno,
            'emaildualalumno': studentDualEmail,
            'estadocalendario': calendarStatus,
            'observaciones': observations,
            'opinionempresa': companyOpinion,
            'tiporelacion': relationshipType,
            'turno': shift
          };
  
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
          };
  
          const response = await fetch("/updateCandidate", options);
          if (!response.ok) {
            throw new Error('Error adding the student');
          }
          const jsonResponse = await response.json();
          console.log(JSON.stringify(jsonResponse));
          return jsonResponse;
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

  const ButtonClickSaveCandidate = async () => {
        await UpdateCandidate(
            candidateId, studentStatus, company1, company1Status, company2, company2Status, company3, company3Status,
            hiredCompany, assignmentDate, annex, annexReceived, annexFilled, cno, studentDualEmail, 
            calendarStatus, observations, companyOpinion, relationshipType, shift, studentId
        );
   }

   return (
    <div>
        <div className="student-card">
            <ul className="student-info-list">
                <li>
                    <strong>Nombre:</strong>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <strong>Estado Alumno:</strong>
                    <input type="text" value={studentStatus} onChange={(e) => setStudentStatus(e.target.value)} />
                </li>
                <li>
                    <strong>Empresa 1:</strong>
                    <input type="text" value={company1} onChange={(e) => setCompany1(e.target.value)} />
                </li>
                <li>
                    <strong>Estado Empresa 1:</strong>
                    <input type="text" value={company1Status} onChange={(e) => setCompany1Status(e.target.value)} />
                </li>
                <li>
                    <strong>Empresa 2:</strong>
                    <input type="text" value={company2} onChange={(e) => setCompany2(e.target.value)} />
                </li>
                <li>
                    <strong>Estado Empresa 2:</strong>
                    <input type="text" value={company2Status} onChange={(e) => setCompany2Status(e.target.value)} />
                </li>
                <li>
                    <strong>Empresa 3:</strong>
                    <input type="text" value={company3} onChange={(e) => setCompany3(e.target.value)} />
                </li>
                <li>
                    <strong>Estado Empresa 3:</strong>
                    <input type="text" value={company3Status} onChange={(e) => setCompany3Status(e.target.value)} />
                </li>
                <li>
                    <strong>Empresa Contratada:</strong>
                    <input type="text" value={hiredCompany} onChange={(e) => setHiredCompany(e.target.value)} />
                </li>
                <li>
                    <strong>Fecha Asignación:</strong>
                    <input type="text" value={assignmentDate} onChange={(e) => setAssignmentDate(e.target.value)} />
                </li>
                <li>
                    <strong>Anexo:</strong>
                    <input type="text" value={annex} onChange={(e) => setAnnex(e.target.value)} />
                </li>
                <li>
                    <strong>Anexo Recibido:</strong>
                    <input type="text" value={annexReceived} onChange={(e) => setAnnexReceived(e.target.value)} />
                </li>
                <li>
                    <strong>Anexo Rellenado:</strong>
                    <input type="text" value={annexFilled} onChange={(e) => setAnnexFilled(e.target.value)} />
                </li>
                <li>
                    <strong>CNO:</strong>
                    <input type="text" value={cno} onChange={(e) => setCno(e.target.value)} />
                </li>
                <li>
                    <strong>Email Dual Alumno:</strong>
                    <input type="text" value={studentDualEmail} onChange={(e) => setStudentDualEmail(e.target.value)} />
                </li>
                <li>
                    <strong>Estado Calendario:</strong>
                    <input type="text" value={calendarStatus} onChange={(e) => setCalendarStatus(e.target.value)} />
                </li>
                <li>
                    <strong>Observaciones:</strong>
                    <input type="text" value={observations} onChange={(e) => setObservations(e.target.value)} />
                </li>
                <li>
                    <strong>Opinión Empresa:</strong>
                    <input type="text" value={companyOpinion} onChange={(e) => setCompanyOpinion(e.target.value)} />
                </li>
                <li>
                    <strong>Tipo Relación:</strong>
                    <input type="text" value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)} />
                </li>
                <li>
                    <strong>Turno:</strong>
                    <input type="text" value={shift} onChange={(e) => setShift(e.target.value)} />
                </li>
                <button className="saveButton" type="button" onClick={ButtonClickSaveCandidate}>
                        GUARDAR
                </button>
            </ul>
            {/* División restante del formulario */}
        </div>
    </div>
);

}

export default GetCandidateEdit;