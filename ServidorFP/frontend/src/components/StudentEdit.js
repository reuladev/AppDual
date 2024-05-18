import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';

function GetStudentEdit() {
    const location = useLocation();
    const { studentData } = location.state || {};
    const { preference1, setPreference1 } = location.state || {};
    const { preference2, setPreference2 } = location.state || {};
    const { preference3, setPreference3 } = location.state || {};
    const { studentId, setStudentId } = location.state || {};
    const { idiomsData, setIdiomsData} = location.state || {};
    const { docsData, setDocsData} = location.state || {};
    const { calificationsData, setCalificationsData} = location.state || {};

    // ATRIBUTOS DE ALUMNO
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [DNI, setDNI] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [date, setDate] = useState("");
    const [curriculumStatus, setCurriculumStatus] = useState("");
    const [admissionStatus, setAdmissionStatus] = useState("");
    const [studiesEmail, setStudiesEmail] = useState("");
    const [nationality, setNationality] = useState("");
    const [drivingLicense, setDrivingLicense] = useState("");
    const [availability, setAvailability] = useState("");
    const [SSnumber, setSSNumber] = useState("");
    const [employmentSituation, setEmploymentSituation] = useState("");
    const [legalGuardianName, setLegalGuardianName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [studentTelephone, setStudentTelephone] = useState("");
    const [familyTelephone, setFamilyTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [observations, setObservations] = useState("");
    const [FCTmonth, setFCTMonth] = useState("");
    const [address, setAddress] = useState("");
    const [CP, setCP] = useState("");
    const [locacion, setLocacion] = useState("");
    //ATRIBUTOS DE IDIOM
    const [idiomaalumno, setIdiomaAlumno] = useState("");
    const [degree, setDegree] = useState("");
    //ATRIBUTOS DE DOCS
    const [studentDocument, setStudentDocument] = useState("");
    const [URL, setURL] = useState("");
    //ATRIBUTOS DE  CALIFICATION
    const [averageGrade, setAverageGrade] = useState("");
    const [idiomGrade, setIdiomGrade] = useState("");
    const [maturityGrade, setMaturityGrade] = useState("");
    const [competentGrade, setCompetentGrade] = useState("");
    const [failuresNumber, setFailuresNumber] = useState("");
    const [failuresGrade, setFailuresGrade] = useState("");
    const [globalGrade, setGlobalGrade] = useState("");
    const [observations2, setObservations2] = useState("");

  useEffect(() => {
    if (studentData.length > 0) {
      const item = studentData[0];
      setName(item.nombre || '');
      setGender(item.sexo || '');
      setDNI(item.dni || '');
      setBirthdate(item.fechanacimiento || '');
      setDate(item.fecha || '');
      setCurriculumStatus(item.estadocurriculum || '');
      setAdmissionStatus(item.estadoadmision || '');
      setStudiesEmail(item.emailinstituto|| '');
      setNationality(item.nacionalidad || '');
      setDrivingLicense(item.carnetconducir || '');
      setAvailability(item.disponibilidad|| '');
      setSSNumber(item.numeroSS || '');
      setEmploymentSituation(item.situacionlaboral || '');
      setLegalGuardianName(item.nombretutorlegal || '');
      setSpeciality(item.especialidad || '');
      setStudentTelephone(item.telalumno|| '');
      setFamilyTelephone(item.telfamilia || '');
      setEmail(item.email || '');
      setObservations(item.observaciones || '');
      setFCTMonth(item.mesFCT || '');
      setAddress(item.domicilio || '');
      setCP(item.cp || '');
      setLocacion(item.localidad || '');
    }
  }, [studentData]);

  useEffect(() => {
    if (idiomsData.length > 0) {
        const item = idiomsData[0];
        setIdiomaAlumno(item.idioma || '');
        setDegree(item.titulo || '');
    }
  }, [idiomsData]);

  useEffect(() => {
    if (docsData.length > 0) {
        const item = docsData[0];
        setStudentDocument(item.docalum|| '');
        setURL(item.url || '');
    }
  }, [docsData]);

  useEffect(() => {
    if (calificationsData.length > 0) {
        const item = calificationsData[0];
        setAverageGrade(item.averageGrade || '');
        setIdiomGrade(item.idiomGrade || '');
        setMaturityGrade(item.maturityGrade || '');
        setCompetentGrade(item.competentGrade || '');
        setFailuresNumber(item.failuresNumber || '');
        setFailuresGrade(item.failuresGrade || '');
        setGlobalGrade(item.globalGrade || '');
        setObservations2(item.observations2 || '');
    }
  }, [calificationsData]);

  console.log('Student Data:', studentData);

  return (
    <div>
      <div className="results-container">
        <div className="student-card">
          <ul className="student-info-list">
            <li>
              <strong>Nombre:</strong>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </li>
            <li>
              <strong>Sexo:</strong>
              <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </li>
            <li>
              <strong>DNI:</strong>
              <input type="text" value={DNI} onChange={(e) => setDNI(e.target.value)} />
            </li>
            <li>
              <strong>Nacionalidad:</strong>
              <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </li>
            <li>
              <strong>Fecha de nacimiento:</strong>
              <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </li>
            <li>
              <strong>Primera preferencia:</strong>
              <input type="text" value={preference1} onChange={(e) => setPreference1(e.target.value)} />
            </li>
            <li>
              <strong>Segunda preferencia:</strong>
              <input type="text" value={preference2} onChange={(e) => setPreference2(e.target.value)} />
            </li>
            <li>
              <strong>Tercera preferencia:</strong>
              <input type="text" value={preference3} onChange={(e) => setPreference3(e.target.value)} />
            </li>
            <li>
              <strong>Fecha registro de alumno:</strong>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </li>
            <li>
              <strong>Estado Curriculum:</strong>
              <input type="text" value={curriculumStatus} onChange={(e) => setCurriculumStatus(e.target.value)} />
            </li>
            <li>
              <strong>Estado Admisión:</strong>
              <input type="text" value={admissionStatus} onChange={(e) => setAdmissionStatus(e.target.value)} />
            </li>
            <li>
              <strong>Email Instituto:</strong>
              <input type="email" value={studiesEmail} onChange={(e) => setStudiesEmail(e.target.value)} />
            </li>
            <li>
              <strong>Email personal:</strong>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </li>
            <li>
              <strong>Teléfono Alumno:</strong>
              <input type="tel" value={studentTelephone} onChange={(e) => setStudentTelephone(e.target.value)} />
            </li>
            <li>
              <strong>Teléfono Familia:</strong>
              <input type="tel" value={familyTelephone} onChange={(e) => setFamilyTelephone(e.target.value)} />
            </li>
            <li>
              <strong>Carnet de Conducir:</strong>
              <input type="text" value={drivingLicense} onChange={(e) => setDrivingLicense(e.target.value)} />
            </li>
            <li>
              <strong>Disponibilidad:</strong>
              <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
            </li>
            <li>
              <strong>Número SS:</strong>
              <input type="text" value={SSnumber} onChange={(e) => setSSNumber(e.target.value)} />
            </li>
            <li>
              <strong>Situación Laboral:</strong>
              <input type="text" value={employmentSituation} onChange={(e) => setEmploymentSituation(e.target.value)} />
            </li>
              <li>
                <strong>Mes FCT:</strong>
                <input type="text" value={FCTmonth} onChange={(e) => setFCTMonth(e.target.value)} />
              </li>
              <li>
                <strong>Domicilio:</strong>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </li>
              <li>
                <strong>Código Postal:</strong>
                <input type="text" value={CP} onChange={(e) => setCP(e.target.value)} />
              </li>
              <li>
                <strong>Localidad:</strong>
                <input type="text" value={locacion} onChange={(e) => setLocacion(e.target.value)} />
              </li>
              <li>
                <strong>Especialidad:</strong>
                <input type="text" value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
              </li>
              <li>
                <strong>Nombre Tutor Legal:</strong>
                <input type="text" value={legalGuardianName} onChange={(e) => setLegalGuardianName(e.target.value)} />
              </li>
              <li>
                <strong>Observaciones:</strong>
                <input type="text" value={observations} onChange={(e) => setObservations(e.target.value)} />
              </li>
              <div>
                <li>
                    <strong>Nota Media:</strong>
                    <input type="text" value={averageGrade} onChange={(e) => setAverageGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Nota Idioma:</strong>
                    <input type="text" value={idiomGrade} onChange={(e) => setIdiomGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Nota Madurez:</strong>
                    <input type="text" value={maturityGrade} onChange={(e) => setMaturityGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Nota Competencia:</strong>
                    <input type="text" value={competentGrade} onChange={(e) => setCompetentGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Número de faltas:</strong>
                    <input type="text" value={failuresNumber} onChange={(e) => setFailuresNumber(e.target.value)} />
                </li>
                <li>
                    <strong>Nota Faltas:</strong>
                    <input type="text" value={failuresGrade} onChange={(e) => setFailuresGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Nota Global:</strong>
                    <input type="text" value={globalGrade} onChange={(e) => setGlobalGrade(e.target.value)} />
                </li>
                <li>
                    <strong>Observaciones 2:</strong>
                    <input type="text" value={observations2} onChange={(e) => setObservations2(e.target.value)} />
                </li>
            </div>
               {/* Documentos */}
               <div>
            <h4> DOCUMENTOS: </h4>
            {docsData.map((doc, docIndex) => (
              <div key={docIndex}>
                <li>
                  <strong>Documento:</strong>
                  <input type="text" value={doc.docalum} onChange={(e) => {
                    const updatedDocsData = [...docsData];
                    updatedDocsData[docIndex].docalum = e.target.value;
                    setDocsData(updatedDocsData);
                  }} />
                </li>
                <li>
                  <strong>URL:</strong>
                  <input type="text" value={doc.url} onChange={(e) => {
                    const updatedDocsData = [...docsData];
                    updatedDocsData[docIndex].url = e.target.value;
                    setDocsData(updatedDocsData);
                  }} />
                </li>
              </div>
            ))}
          </div>

          {/* Idiomas */}
          <div>
            <h4> IDIOMAS: </h4>
            {idiomsData.map((idiom, idiomIndex) => (
              <div key={idiomIndex}>
                <li>
                  <strong>IDIOMA:</strong>
                  <input type="text" value={idiom.idioma} onChange={(e) => {
                    const updatedIdiomsData = [...idiomsData];
                    updatedIdiomsData[idiomIndex].idioma = e.target.value;
                    setIdiomsData(updatedIdiomsData);
                  }} />
                </li>
                <li>
                  <strong>TITULO:</strong>
                  <input type="text" value={idiom.titulo} onChange={(e) => {
                    const updatedIdiomsData = [...idiomsData];
                    updatedIdiomsData[idiomIndex].titulo = e.target.value;
                    setIdiomsData(updatedIdiomsData);
                  }} />
                </li>
              </div>
            ))}
          </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default GetStudentEdit;