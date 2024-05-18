import React, { useState, useEffect } from 'react';
import '../styles.css'; // Importa el archivo de estilos CSS global

/*
  Permite crear un boton para que el usuario introduzca el nombre del estudiante y poder enviar ese nombre
  a una petición getStudentDates que recoja todos los datos de alumno, idiomas, docs y su valoracion.
*/
function SearchStudentToUpdate() {
  const [dataStudent, setDataStudent] = useState([]); //Va a contener un array con los datos del alumno
  const [studentId, setStudentId] = useState("");


  // STUDENT
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [DNI, setDNI] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [preference1, setPreference1] = useState("");
  const [preference2, setPreference2] = useState("");
  const [preference3, setPreference3] = useState("");
  const [date, setDate] = useState("");
  const [curriculumStatus, setCurriculumStatus] = useState("");
  const [admissionStatus, setAddmissionStatus] = useState("");
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
  const [adress, setAdress] = useState("");
  const [CP, setCP] = useState("");
  const [location, setLocation] = useState("");
  // IDIOM
  const [dataIdioms, setDataIdioms] = useState([]);
  const [idiomaalumno, setIdiomaAlumno] = useState("");
  let [idiomId, setIdiomId] = useState("");
  const [degree, setDegree] = useState("");
  // DOCS
  const [studentDocument, setStudentDocument] = useState("");
  const [URL, setURL] = useState("");
  // CALIFICATION
  const [averageGrade, setAverageGrade] = useState("");
  const [idiomGrade, setIdiomGrade] = useState("");
  const [maturityGrade, setMaturityGrade] = useState("");
  const [competentGrade, setCompetentGrade] = useState("");
  const [failuresNumber, setFailuresNumber] = useState("");
  const [failuresGrade, setFailuresGrade] = useState("");
  const [globalGrade, setGlobalGrade] = useState("");
  const [observations2, setObservations2] = useState("");
  // Contiene el nombre del alumno que solicita modificar
  const [requestName, setRequestName] = useState(""); 
  const [requestDNI, setRequestDNI] = useState(""); 


   // -------------------------------------------------------------------------------------------  DOCUMENTOS

   const [documents, setDocuments] = useState(['']);
   const [urls, setUrls] = useState(['']);

   const handleDocumentChange = (index, value) => {
     const newDocument = [...documents];
     newDocument[index] = value;
     setDocuments(newDocument);
   };
   const handleUrlChange = (index, value) => {
     const newUrl = [...urls];
     newUrl[index] = value;
     setUrls(newUrl);
   };
   

   const addDocumentsInput = () => {   //Añadee los nuevos documentos cargados.
     setDocuments([...documents, '']);
     setUrls([...urls, '']);
   };


  /* Solicitud a la peticion getStudentDates para que nos devuelva en un JSON los datos
    del alumno pasandole nosotros el nombre del alumno y su dni para asegurar que solo 
    nos devuelve los datos de un unico alumno. 
    Despues setteamos cada atributo para poder mostrar al usuario el atributo que contiene.
    De esta forma, si el usuario NO modifica nada, se guarda lo mismo que tenia y asi no hay errores.
  */
 const SearchStudentDates = async (requestName, requestDNI) => {
    try {
        const bodyParameters = {
            'nombre': requestName,
            'dni': requestDNI
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
        }

        const response = await fetch("/getStudentDates", options);

        if (!response.ok) {
            throw new Error('Error al buscar el estudiante');
        }

        const jsonResponse = await response.json();
        // Solo si la respuesta contiene datos
        if (jsonResponse.length > 0) {
            const dataStudent = jsonResponse[0]; // Accede al primer objeto del array

            // Asigna los valores a las variables de estado
            setStudentId(dataStudent.idalumno);
            setName(dataStudent.nombre);
            setGender(dataStudent.sexo);
            setDNI(dataStudent.dni);
            setBirthdate(dataStudent.fechanacimiento);
            setPreference1(dataStudent.preferencia1);
            setPreference2(dataStudent.preferencia2);
            setPreference3(dataStudent.preferencia3);
            setDate(dataStudent.fecha);
            setCurriculumStatus(dataStudent.estadocurriculum);
            setAddmissionStatus(dataStudent.estadoadmision);
            setStudiesEmail(dataStudent.emailinstituto);
            setNationality(dataStudent.nacionalidad);
            setDrivingLicense(dataStudent.carnetconducir);
            setAvailability(dataStudent.disponibilidad);
            setSSNumber(dataStudent.numeroSS);
            setEmploymentSituation(dataStudent.situacionlaboral);
            setLegalGuardianName(dataStudent.nombretutorlegal);
            setSpeciality(dataStudent.especialidad);
            setStudentTelephone(dataStudent.telalumno);
            setFamilyTelephone(dataStudent.telfamilia);
            setEmail(dataStudent.email);
            setObservations(dataStudent.observaciones);
            setFCTMonth(dataStudent.mesFCT);
            setAdress(dataStudent.domicilio);
            setCP(dataStudent.cp);
            setLocation(dataStudent.localidad);
        } else {
            console.log("No se encontraron datos para el estudiante solicitado.");
        }

        return jsonResponse;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
    /* 
      Solicitud a la peticion updateStudent para que actualice los atributos que hemos modificado o no.

    */
  const UpdateStudent = async (
        name, gender, DNI, birthdate, preference1, preference2, preference3, date, curriculumStatus, admissionStatus, studiesEmail,
        nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
        speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, adress, CP, location, studentId
      ) => {
        try {
          const bodyParameters = {
            'nombre': name,
            'sexo': gender,
            'dni': DNI,
            'fechanacimiento': birthdate,
            'preferencia1': preference1,
            'preferencia2': preference2,
            'preferencia3': preference3,
            'fecha': date,
            'estadocurriculum': curriculumStatus,
            'estadoadmision': admissionStatus,
            'emailinstituto': studiesEmail,
            'nacionalidad': nationality,
            'carnetconducir': drivingLicense,
            'disponibilidad': availability,
            'numeroSS': SSnumber,
            'situacionlaboral': employmentSituation,
            'nombretutorlegal': legalGuardianName,
            'especialidad': speciality,
            'telalumno': studentTelephone,
            'telfamilia': familyTelephone,
            'email': email,
            'observaciones': observations,
            'mesFCT': FCTmonth,
            'domicilio': adress,
            'cp': CP,
            'localidad': location,
            'idalumno': studentId
          };

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
          };

          const response = await fetch("/updateStudent", options);
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

      function handleNameChange(event) {
        setName(event.target.value); // Actualiza el estado del nombre
      }

      function handleGenderChange(event) {
        setGender(event.target.value);
      }

      function handleDNIChange(event) {
        setDNI(event.target.value);
      }

      function handleBirthdateChange(event) {
        setBirthdate(event.target.value);
      }

      function handlePreference1Change(event) {
        setPreference1(event.target.value);
      }

      function handlePreference2Change(event) {
        setPreference2(event.target.value);
      }

      function handlePreference3Change(event) {
        setPreference3(event.target.value);
      }

      function handleCurriculumStatusChange(event) {
        setCurriculumStatus(event.target.value);
      }

      function handleAdmissionStatusChange(event) {
        setAddmissionStatus(event.target.value);
      }

      function handleStudiesEmailChange(event) {
        setStudiesEmail(event.target.value);
      }

      function handleNationalityChange(event) {
        setNationality(event.target.value);
      }

      function handleDrivingLicenseChange(event) {
        setDrivingLicense(event.target.value);
      }

      function handleAvailabilityChange(event) {
        setAvailability(event.target.value);
      }

      function handleSSNumberChange(event) {
        setSSNumber(event.target.value);
      }

      function handleEmploymentSituationChange(event) {
        setEmploymentSituation(event.target.value);
      }

      function handleLegalGuardianNameChange(event) {
        setLegalGuardianName(event.target.value);
      }

      function handleSpecialityChange(event) {
        setSpeciality(event.target.value);
      }

      function handleStudentTelephoneChange(event) {
        setStudentTelephone(event.target.value);
      }

      function handleFamilyTelephoneChange(event) {
        setFamilyTelephone(event.target.value);
      }

      function handleEmailChange(event) {
        setEmail(event.target.value);
      }

      function handleObservationsChange(event) {
        setObservations(event.target.value);
      }

      function handleFCTMonthChange(event) {
        setFCTMonth(event.target.value);
      }

      function handleAdressChange(event) {
        setAdress(event.target.value);
      }

      function handleCPChange(event) {
        setCP(event.target.value);
      }

      const handleRequestNameChange = (event) => {
        setRequestName(event.target.value);
      };

      const handleRequestDNIChange = (event) => {
        setRequestDNI(event.target.value);
      };

    const SearchStudentCalification = async (studentId) => {
      try {
          const bodyParameters = {
              'idalumno': studentId
          }
          const options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(bodyParameters)
          }

          const response = await fetch("/getStudentCalification", options);

          if (!response.ok) {
              throw new Error('Error al buscar el estudiante');
          }

          const jsonResponse = await response.json();

          // Solo si la respuesta contiene datos
          if (jsonResponse.length > 0) {
              const dataStudent = jsonResponse[0]; // Accede al primer objeto del array
              // Asigna los valores a las variables de estado
              setAverageGrade(dataStudent.notamedia);
              setIdiomGrade(dataStudent.notaidioma);
              setMaturityGrade(dataStudent.notamadurez);
              setCompetentGrade(dataStudent.notacompetencia);
              setFailuresNumber(dataStudent.numfaltas);
              setFailuresGrade(dataStudent.notafaltas);
              setGlobalGrade(dataStudent.notaglobal);
              setObservations2(dataStudent.observaciones);
          } else {
              console.log("No se encontraron datos para el estudiante solicitado.");
          }
              return jsonResponse;
      } catch (error) {
          console.error('Error:', error.message);
      }
  }

  /* 
      PRÓXIMANENTE
  */
      const UpdateStudent_Calification = async () => {
        try {
          const bodyParameters = {
            'idalumno': studentId,
            'notamedia': averageGrade,
            'notaidioma': idiomGrade,
            'notamadurez': maturityGrade,
            'notacompetencia': competentGrade,
            'numfaltas': failuresNumber,
            'notafaltas': failuresGrade,
            'notaglobal': globalGrade,
            'observaciones2': observations2
          }
    
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
          }
          
          const response = await fetch("/updateStudent_Calification", options);
          if (!response.ok) {
            throw new Error('Error adding the student');
          }
          const jsonResponse = await response.json();
          return jsonResponse;
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

              //FUNCTIONS ALUMNOS_VALORACION
        function HandleAverageGradeChange(event){
          setAverageGrade(event.target.value);
        }
        function HandleIdiomGradeChange(event){
          setIdiomGrade(event.target.value);
        }
        function HandleMaturityGradeChange(event){
          setMaturityGrade(event.target.value);
        }
        function HandleCompetentGradeChange(event){
          setCompetentGrade(event.target.value);
        }
        function HandleFailuresNumberChange(event){
          setFailuresNumber(event.target.value);
        }
        function HandleFailuresGradeChange(event){
          setFailuresGrade(event.target.value);
        }
        function HandleGlobalGradeChange(event){
          setGlobalGrade(event.target.value);
        }
        function HandleObservations2Change(event){
          setObservations2(event.target.value);
        }


        const SearchStudentDocs = async (studentId) => {
          console.log("Contenido de studentID en StudentDoc: " + studentId);
          try {
              const bodyParameters = {
                  'idalumno': studentId
              }
              const options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(bodyParameters)
              }
      
              const response = await fetch("/getStudentDocs", options);
      
              if (!response.ok) {
                  throw new Error('Error al buscar el estudiante');
              }
      
              const jsonResponse = await response.json();
  
              
              console.log(jsonResponse);
             setDocuments(jsonResponse);

              return jsonResponse;
          } catch (error) {
              console.error('Error:', error.message);
          }
      }

  /* 
      PRÓXIMANENTE
  */
  const UpdateStudent_Idiom = async () => {
    try {
      const bodyParameters = {
        'nombre': name
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParameters)
      }
      
      const response = await fetch("/updateStudent_Idiom", options);
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
  /* 
      PRÓXIMANENTE
  */
  const UpdateStudent_Doc = async () => {
    try {
      const bodyParameters = {
        'nombre': name
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParameters)
      }
      
      const response = await fetch("/updateStudent_Doc", options);
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

  useEffect(() => {
    SearchStudentCalification(studentId);
    SearchStudentDocs (studentId)
  }, [studentId]); 
  



  function ButtonClickStudentData(){
    SearchStudentDates(requestName, requestDNI);
  }

  function ButtonClickUpdateStudentData() {
    UpdateStudent(name, gender, DNI, birthdate,preference1, preference2, preference3, date, curriculumStatus, admissionStatus, studiesEmail,
      nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
      speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, adress, CP, location, studentId);
    //UpdateStudent_Idiom();
    //UpdateStudent_Doc();
    UpdateStudent_Calification();
  }




  return (
    <div clasdName="input-field">
      <div>
        <div className="input-field">
          <h4 htmlFor="tittle">INTRODUCE EL NOMBRE DEL ALUMNO QUE DESEAS MODIFICAR</h4>
          <input type="text" value={requestName} id="requestName-input" placeholder={"NOMBRE"} onChange={handleRequestNameChange}/>
          <input type="text" value={requestDNI} id="requestName-input" placeholder={"DNI"} onChange={handleRequestDNIChange}/>
          <button className="searchStudent" type="button" onClick={ButtonClickStudentData}> BUSCAR ALUMNO</button>
        </div>
        <div className="input-field">
          <label htmlFor="name-input">Nombre del Alumno:</label>
          <input type="text" value={name} id="name-input" onChange={handleNameChange} />
        </div>

        <div className="input-field">
            <label htmlFor="gender-input">Género:</label>
            <input type="text" value={gender} id="gender-input" onChange={handleGenderChange} />
        </div>

        <div className="input-field">
            <label htmlFor="dni-input">DNI:</label>
            <input type="text" value={DNI} id="dni-input" onChange={handleDNIChange} />
        </div>

        <div className="input-field">
            <label htmlFor="birthdate-input">Fecha de Nacimiento:</label>
            <input type="text" value={birthdate} id="birthdate-input" onChange={handleBirthdateChange} />
        </div>

        <div className="input-field">
            <label htmlFor="preference1-input">Preferencia 1:</label>
            <input type="text" value={preference1} id="preference1-input" onChange={handlePreference1Change} />
        </div>

        <div className="input-field">
            <label htmlFor="preference2-input">Preferencia 2:</label>
            <input type="text" value={preference2} id="preference2-input" onChange={handlePreference2Change} />
        </div>

        <div className="input-field">
            <label htmlFor="preference3-input">Preferencia 3:</label>
            <input type="text" value={preference3} id="preference3-input" onChange={handlePreference3Change} />
        </div>

        <div className="input-field">
            <label htmlFor="curriculumStatus-input">Estado del Curriculum:</label>
            <input type="text" value={curriculumStatus} id="curriculumStatus-input" onChange={handleCurriculumStatusChange} />
        </div>

        <div className="input-field">
            <label htmlFor="admissionStatus-input">Estado de Admisión:</label>
            <input type="text" value={admissionStatus} id="admissionStatus-input" onChange={handleAdmissionStatusChange} />
        </div>

        <div className="input-field">
            <label htmlFor="studiesEmail-input">Correo Electrónico de Estudios:</label>
            <input type="text" value={studiesEmail} id="studiesEmail-input" onChange={handleStudiesEmailChange} />
        </div>

        <div className="input-field">
            <label htmlFor="nationality-input">Nacionalidad:</label>
            <input type="text" value={nationality} id="nationality-input" onChange={handleNationalityChange} />
        </div>

        <div className="input-field">
            <label htmlFor="drivingLicense-input">Licencia de Conducir:</label>
            <input type="text" value={drivingLicense} id="drivingLicense-input" onChange={handleDrivingLicenseChange} />
        </div>

        <div className="input-field">
            <label htmlFor="availability-input">Disponibilidad:</label>
            <input type="text" value={availability} id="availability-input" onChange={handleAvailabilityChange} />
        </div>

        <div className="input-field">
            <label htmlFor="ssNumber-input">Número de Seguridad Social:</label>
            <input type="text" value={SSnumber} id="ssNumber-input" onChange={handleSSNumberChange} />
        </div>

        <div className="input-field">
            <label htmlFor="employmentSituation-input">Situación Laboral:</label>
            <input type="text" value={employmentSituation} id="employmentSituation-input" onChange={handleEmploymentSituationChange} />
        </div>

        <div className="input-field">
            <label htmlFor="legalGuardianName-input">Nombre del Tutor Legal:</label>
            <input type="text" value={legalGuardianName} id="legalGuardianName-input" onChange={handleLegalGuardianNameChange} />
        </div>

        <div className="input-field">
            <label htmlFor="speciality-input">Especialidad:</label>
            <input type="text" value={speciality} id="speciality-input" onChange={handleSpecialityChange} />
        </div>

        <div className="input-field">
            <label htmlFor="studentTelephone-input">Teléfono del Estudiante:</label>
            <input type="text" value={studentTelephone} id="studentTelephone-input" onChange={handleStudentTelephoneChange} />
        </div>

        <div className="input-field">
            <label htmlFor="familyTelephone-input">Teléfono de Familia:</label>
            <input type="text" value={familyTelephone} id="familyTelephone-input" onChange={handleFamilyTelephoneChange} />
        </div>

        <div className="input-field">
            <label htmlFor="email-input">Correo Electrónico:</label>
            <input type="text" value={email} id="email-input" onChange={handleEmailChange} />
        </div>

        <div className="input-field">
            <label htmlFor="observations-input">Observaciones:</label>
            <input type="text" value={observations} id="observations-input" onChange={handleObservationsChange} />
        </div>

        <div className="input-field">
            <label htmlFor="fctMonth-input">Mes de FCT:</label>
            <input type="text" value={FCTmonth} id="fctMonth-input" onChange={handleFCTMonthChange} />
        </div>

        <div className="input-field">
            <label htmlFor="adress-input">Dirección:</label>
            <input type="text" value={adress} id="adress-input" onChange={handleAdressChange} />
        </div>

        <div className="input-field">
            <label htmlFor="cp-input">Código Postal:</label>
            <input type="text" value={CP} id="cp-input" onChange={handleCPChange} />
        </div>
        <h4 className="tittle"> VALORCION DEL ALUMNO</h4>
        </div>
        <div className="input-field">
            <label htmlFor="averageGrade-input">Nota media:</label>
            <input type="text" value={averageGrade} id="averageGrade-input" onChange={HandleAverageGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="idiomGrade-input">Nota idioma:</label>
          <input type="text" value={idiomGrade} id="idiomGrade-input" onChange={HandleIdiomGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="maturityGrade-input">Nota madurez:</label>
          <input type="text" value={maturityGrade} id="maturityGrade-input" onChange={HandleMaturityGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="competentGrade-input">Nota competencia:</label>
          <input type="text" value={competentGrade} id="competentGrade-input" onChange={HandleCompetentGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="failuresNumber-input">Total de faltas:</label>
          <input type="text" value={failuresNumber} id="failuresNumber-input" onChange={HandleFailuresNumberChange} />
        </div>
        <div className="input-field">
          <label htmlFor="failuresGrade-input">Notas faltas:</label>
          <input type="text" value={failuresGrade} id="failuresGrade-input" onChange={HandleFailuresGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="globalGrade-input">Notas global:</label>
          <input type="text" value={globalGrade} id="globalGrade-input" onChange={HandleGlobalGradeChange} />
        </div>
        <div className="input-field">
          <label htmlFor="observations2-input">Observaciones:</label>
          <input type="text" value={observations2} id="observations2-input" onChange={HandleObservations2Change} />
        </div>
        <div className="section">
          <h4 className="tittle"> DOCUMENTOS: </h4>
          {documents.map((documents, index) => ( 
            <div key={index}>
              <input type="text" value={documents.docalum} onChange={(e) => handleDocumentChange(index, e.target.value)} className="input-field" placeholder="Documento"/>
              <input type="text" value={documents.url} onChange={(e) => handleUrlChange(index, e.target.value)} className="input-field" placeholder="URL"/>
            </div>
          ))}
        </div>
        <div className="input-field">
          <button className="searchStudent" type="button" onClick={ButtonClickUpdateStudentData}> ACTUALIZAR ALUMNO </button>
        </div>
    </div>
  );
}
export default SearchStudentToUpdate;