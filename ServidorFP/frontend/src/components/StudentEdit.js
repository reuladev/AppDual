import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';
import { format } from 'date-fns'; // --> Para poder formatear la fecha DD-MM-AAAA

function GetStudentEdit() {
    /*
    Recibimos de anteriores componentes los arrays con los datos de alumno elegido
    por el usuario, asi como su idalumno y sus preferencias.
    Nota: La idea de preferencias era la de obtener todas en un solo array como el 
          resto de atributos de otras tablas.
          El problema es que el atributo que contiene el valor del tipo de preferencia
          se aplica en 3 campos diferentes en la tabla gf_alumnosfct PERO obviamente
          el nombre del atributo es el mismo, por lo que al enviarlo en formato JSON
          no es posible tener 3 atributos que se llaman igual, lo único que he podido
          hacer es realizar 3 querrys diferentes para obtener cada preferencia por se
          parado.
    */

    //ATRIBUTOS OBTENIDOS DE GETSTUDENT
    const location = useLocation();
    const { studentData } = location.state || {};
    const { preference1} = location.state || {};
    const { preference2} = location.state || {};
    const { preference3} = location.state || {};
    const { studentId2, setStudentId2 } = location.state || {};
    const { idiomsData, setIdiomsData} = location.state || {};
    const { docsData, setDocsData} = location.state || {};
    const { calificationsData, setCalificationsData} = location.state || {};

    const [studentId, setStudentId] = useState("");
    const [preference1Name, setPreference1Name] = useState(preference1[0].preferencia);
    const [preference2Name, setPreference2Name] = useState(preference2[0].preferencia);
    const [preference3Name, setPreference3Name] = useState(preference3[0].preferencia);

    const handlePreference1NameChange = (event) => {
      setPreference1Name(event.target.value);
    };
    
    const handlePreference2NameChange = (event) => {
      setPreference2Name(event.target.value);
    };
    
    const handlePreference3NameChange = (event) => {
      setPreference3Name(event.target.value);
    };

    const [preference1Id, setPreference1Id] = useState("");
    const [preference2Id, setPreference2Id] = useState("");
    const [preference3Id, setPreference3Id] = useState("");

    useEffect(() => {
      const fetchPreferences = async () => {
        await StudentPreferences1Requests(preference1Name);
        await StudentPreferences2Requests(preference2Name);
        await StudentPreferences3Requests(preference3Name);
      };
    
      fetchPreferences();
    }, [preference1Name, preference2Name, preference3Name]);


    //ATRIBUTOS DE IDIOM
    const [idiomId, setIdiomId] = useState("");
    const [studentIdiom, setStudentIdiom] = useState("");
    const [degree, setDegree] = useState("");

    //ATRIBUTOS DE DOCS
    const [docsId, setDocsId] = useState("");
    const [studentDoc, setStudentDoc] = useState("");
    const [URL, setURL] = useState("");


    const [idioms, setIdioms] = useState(idiomsData || []);
    const [docs, setDocs] = useState(docsData || []);


    idioms.forEach(idiom => {
      console.log(idiom); // Aquí puedes acceder a las propiedades de cada objeto
    });

    docs.forEach(idiom => {
      console.log(idiom); // Aquí puedes acceder a las propiedades de cada objeto
    });

    


    // Evento onChange para grado de dominio del idioma
    const handleStudentIdiomChange = (event, idiomIndex) => {
      const newIdiomsData = [...idioms];
      newIdiomsData[idiomIndex].idioma = event.target.value;
      setIdioms(newIdiomsData);
    };

    // Evento onChange para el grado
    const handleDegreeChange = (event, idiomIndex) => {
      const newIdiomsData = [...idioms];
      newIdiomsData[idiomIndex].titulo = event.target.value;
      setIdioms(newIdiomsData);
    };

    // Evento onChange para los documentos del estudiante
    const handleStudentDocChange = (event, docIndex) => {
      const newDocsData = [...docs];
      newDocsData[docIndex].docalum = event.target.value;
      setDocs(newDocsData);
    };

    // Evento onChange para la URL
    const handleURLChange = (event, docIndex) => {
      const newDocsData = [...docs];
      newDocsData[docIndex].url = event.target.value;
      setDocs(newDocsData);
    };




    //ATRIBUTOS DE ALUMNO
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

    //ATRIBUTOS DE  CALIFICATION
    const [averageGrade, setAverageGrade] = useState("");
    const [idiomGrade, setIdiomGrade] = useState("");
    const [maturityGrade, setMaturityGrade] = useState("");
    const [competentGrade, setCompetentGrade] = useState("");
    const [failuresNumber, setFailuresNumber] = useState("");
    const [failuresGrade, setFailuresGrade] = useState("");
    const [globalGrade, setGlobalGrade] = useState("");
    const [observations2, setObservations2] = useState("");
    
    /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const StudentPreferences1Requests = async (preference1Name) => {
      try {
          const bodyParameters = {
          'preferencia1': preference1Name
          };
          const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyParameters)
          };
          const response = await fetch("/studentPreferences1Requests", options);
          if (!response.ok) {
          throw new Error('Error en la solicitud');
          }
          const jsonResponse = await response.json();
          setPreference1Id (jsonResponse[0].idpreferencia);
      } catch (error) {
          console.error('Error:', error.message);
      }
   };

   /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const StudentPreferences2Requests = async (preference2Name) => {
      try {
          const bodyParameters = {
          'preferencia2': preference2Name
          };
          const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyParameters)
          };
          const response = await fetch("/studentPreferences2Requests", options);
          if (!response.ok) {
          throw new Error('Error en la solicitud');
          }
          const jsonResponse = await response.json();
          setPreference2Id (jsonResponse[0].idpreferencia);
      } catch (error) {
          console.error('Error:', error.message);
      }
   };

   /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const StudentPreferences3Requests = async (preference3Name) => {
      try {
          const bodyParameters = {
          'preferencia3': preference3Name
          };
          const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyParameters)
          };
          const response = await fetch("/studentPreferences3Requests", options);
          if (!response.ok) {
          throw new Error('Error en la solicitud');
          }
          const jsonResponse = await response.json();
          setPreference3Id (jsonResponse[0].idpreferencia);
      } catch (error) {
          console.error('Error:', error.message);
      }
   };


   // ------------------------------------------- UP DATES ! ---------------------

   /*
    Solicitamos la peticion para que nos devuela los datos del / los alumnos
    que coincidan en su nombre con lo solicitado por el usuario.
    */
    const UpdateStudent = async (
      name, gender, DNI, birthdate, preference1Id, preference2Id, preference3Id, date, curriculumStatus, admissionStatus, studiesEmail,
      nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
      speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, adress, CP, locacion, studentId
    ) => {
      try {
        const bodyParameters = {
          'nombre': name,
          'sexo': gender,
          'dni': DNI,
          'fechanacimiento': birthdate,
          'preferencia1': preference1Id,
          'preferencia2':preference2Id,
          'preferencia3': preference3Id,
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
          'localidad': locacion,
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

      /*
      
      */
    const UpdateStudent_Calification = async (studentId, averageGrade, idiomGrade, maturityGrade, competentGrade, failuresNumber, failuresGrade, globalGrade, observations2) => {
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

    /* 
      PRÓXIMANENTE
  */
  const UpdateStudent_Idiom = async (studentId, idiomId, degree) => {
    try {
      const bodyParameters = {
        'idalumno': studentId,
        'ididioma': idiomId,
        'titulo': degree
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
  const UpdateStudent_Doc = async (studentId, studentDoc, URL) => {
    try {
      const bodyParameters = {
        'docalum': studentDoc,
        'url': URL,
        'idalumno': studentId
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


    /*
      Actualizamos datos si existen, primero verificamos si hay datos 
      y luego extraemos del array el contenido para cada atributo.
      Nota: Por algun motivo, si existe un valor 0, no va a coger el 
            contenido haciendolo como con el resto, encuenta hay que 
            extraelo antes, meterlo en una constante y settear la 
            constante.
    */
    useEffect(() => {
      if (studentData.length > 0) {
        const item = studentData[0];
        const estadocurriculum = studentData[0].estadocurriculum;
        const estadoadmision = studentData[0].estadoadmision;
        const disponibilidad = studentData[0].disponibilidad;
        console.log("TESTIGOS: ",item);
        setName(item.nombre || '');
        setGender(item.sexo || '');
        setDNI(item.dni || '');
        setBirthdate(item.fechanacimiento || '');
        setDate(item.fecha || '');
        setCurriculumStatus(estadocurriculum);
        setAdmissionStatus(estadoadmision);
        setStudiesEmail(item.emailinstituto|| '');
        setNationality(item.nacionalidad || '');
        setDrivingLicense(item.carnetconducir || '');
        setAvailability(disponibilidad);
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

      /*
        Actualizamos datos si existen, primero verificamos si hay datos 
        y luego extraemos del array el contenido para cada atributo.
      */
    useEffect(() => {
      if (calificationsData.length > 0) {
          const item = calificationsData[0];
          const notafaltas = calificationsData[0].notafaltas;
          setAverageGrade(item.notamedia || '');
          setIdiomGrade(item.notaidioma|| '');
          setMaturityGrade(item.notamadurez || '');
          setCompetentGrade(item.notacompetencia || '');
          setFailuresNumber(item.numfaltas || '');
          setFailuresGrade(notafaltas);
          setGlobalGrade(item.notaglobal || '');
          setObservations2(item.observaciones || '');
      }
    }, [calificationsData]);

    /*
      Al pulsar el boton de editar el usuario, lo redirije al componente
      studentEdit para poder editar cada campo.
      Tambien envia a este todos los datos necesarios para poder editarlos.
    */
      const ButtonClickSaveStudent = async () => {
        // Actualizaciones de datos principales
        await UpdateStudent(
            name, gender, DNI, birthdate, preference1Id, preference2Id, preference3Id, date, curriculumStatus, admissionStatus, studiesEmail,
            nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
            speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, address, CP, locacion, studentId
        );
        await UpdateStudent_Calification(
            studentId, averageGrade, idiomGrade, maturityGrade, competentGrade, failuresNumber, failuresGrade, globalGrade, observations2
        );
        for (let i = 0; i < idioms.length; i++) {
          const idiom = idioms[i];
          const { idalumno, ididioma, titulo } = idiom; // Desestructura los atributos del objeto idiom
          setStudentId(idalumno);
          setIdiomId(ididioma);
          setDegree(titulo);
          await UpdateStudent_Idiom(studentId, idiomId, degree);
      }
      
      // Iterar sobre el array docs
      for (let i = 0; i < docs.length; i++) {
          const doc = docs[i];
          const { idalumno, docalum, url } = doc; // Desestructura los atributos del objeto doc
          setStudentId(idalumno);
          setStudentDoc(docalum);
          setURL(url);
          await UpdateStudent_Doc(studentId, studentDoc, URL);
      }
    }

  //Renderizamos
  return (
        <div>
            <div className="student-card">
                    <ul className="student-info-list">
                    <li>
                      <strong>Preferencia 1:</strong>
                      <input type="text" value={preference1Name} onChange={handlePreference1NameChange} />
                    </li>

                    <li>
                      <strong>Preferencia 2:</strong>
                      <input type="text" value={preference2Name} onChange={handlePreference2NameChange} />
                    </li>

                    <li>
                      <strong>Preferencia 3:</strong>
                      <input type="text" value={preference3Name} onChange={handlePreference3NameChange} />
                    </li>
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
                        <input type="text" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </li>
                    
                    <li>
                        <strong>Fecha registro de alumno:</strong>
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
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
                    <div className="student-card">
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
                    <div className="student-card">
                      <h4>DOCUMENTOS:</h4>
                      {docs.map((doc, docIndex) => (
                        <div key={docIndex}>
                          <li>
                            <strong>Documento:</strong>
                            <input
                              type="text"
                              value={doc.docalum}
                              onChange={(e) => handleStudentDocChange(e, docIndex)}
                            />
                          </li>
                          <li>
                            <strong>URL:</strong>
                            <input
                              type="text"
                              value={doc.url}
                              onChange={(e) => handleURLChange(e, docIndex)}
                            />
                          </li>
                        </div>
                      ))}
                    </div>

                    <div className="student-card">
                      <h4>IDIOMAS:</h4>
                      {idioms.map((idiom, idiomIndex) => (
                        <div key={idiomIndex}>
                          <li>
                            <strong>Idioma:</strong>
                            <input
                              type="text"
                              value={idiom.idioma}
                              onChange={(e) => handleStudentIdiomChange(e, idiomIndex)}
                            />
                          </li>
                          <li>
                            <strong>Título:</strong>
                            <input
                              type="text"
                              value={idiom.titulo}
                              onChange={(e) => handleDegreeChange(e, idiomIndex)}
                            />
                          </li>
                        </div>
                      ))}
                    </div>
                    <button className="saveButton" type="button" onClick={ButtonClickSaveStudent}>
                        GUARDAR
                    </button>
                </ul>
            </div>
        </div>
    );
}
  
  export default GetStudentEdit;