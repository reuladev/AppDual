import React, { useState, useEffect } from 'react';

import '../styles.css'; // Importa el archivo de estilos CSS

function AddStudentComponent() {
  // Definición de estados utilizando el hook useState
  const [dataStudents, setDataStudents] = useState([]); // Estado para almacenar datos obtenidos del servidor
  const [successMessage, setSuccessMessage] = useState(""); // Estado para almacenar el mensaje de éxito

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
  //Variables necesarias para poder usar /addStudent_Idiom
  const [dataIdioms, setDataIdioms] = useState([]);
  const [idiomaalumno, setIdiomaAlumno] = useState("");
  let [idiomId, setIdiomId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [degree, setDegree] = useState("");
  //Variables necesarias para poder usar /addStudentPreferences
  const [dataPreferences, setDataPreferences] = useState([]);
  let idPreference1;
  let idPreference2;
  let idPreference3;
  //Variables necesariasa para poder usar /addStudent_Doc
  const [studentDocument, setStudentDocument] = useState("");
  const [URL, setURL] = useState("");
   //Variables necesarias para poder usar /addStudent_Calification
   const [averageGrade, setAverageGrade] = useState("");
   const [idiomGrade, setIdiomGrade] = useState("");
   const [maturityGrade, setMaturityGrade] = useState("");
   const [competentGrade, setCompetentGrade] = useState("");
   const [failuresNumber, setFailuresNumber] = useState("");
   const [failuresGrade, setFailuresGrade] = useState("");
   const [globalGrade, setGlobalGrade] = useState("");
   const [observations2, setObservations2] = useState("");
   const [currentYear, setCurrentYear] = useState("");

   const [document, setDocument] = useState("");

    // -------------------------------------------------------------------------------------------- PREFERENCIAS
    // Esta función recibe tres preferencias y devuelve un array con los idpreferencia correspondientes a cada una.
    function getIdPreference(preference1, preference2, preference3) {
    
      for (let i = 0; i < dataPreferences.length; i++) {
        if (dataPreferences[i].preferencia === preference1) {
         idPreference1 = dataPreferences[i].idpreferencia;
        }
        if (dataPreferences[i].preferencia === preference2) {
         idPreference2 = dataPreferences[i].idpreferencia;
        }
        if (dataPreferences[i].preferencia === preference3) {
         idPreference3 = dataPreferences[i].idpreferencia;
        }
      }
    }
   
 // ----------------------------------------------------------------   USE EFFECTS
  useEffect(() => {
    GetAllIdioms(); 
    GetAllStudents();
    GetAllPreferences();
  }, []);

  // -----------------------------------------------------------------   GET ALLS

  // Recoge todos los datos de la tabla idiomas y los guarda en data2
  function GetAllIdioms() {
    fetch('/getAllIdioms') // Hacer una solicitud HTTP GET a '/getAllIdioms'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(dataIdioms => {
        setDataIdioms(dataIdioms); // Establecer los datos obtenidos en el estado 'data2'
        console.log(dataIdioms); // Mostrar el contenido en la consola
      })
      .catch(error => {
        console.error('Error fetching idioms data:', error);
        // Manejar errores de la solicitud
      });
  }
  // 
  // Recoge todos los datos de la tabla preferencias y los guarda en dataPreferences
  function GetAllPreferences() {
    fetch('/getAllPreferences') // Hacer una solicitud HTTP GET a '/getAllPreferences'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(dataPreferences => {
        setDataPreferences(dataPreferences); // Establecer los datos obtenidos en el estado 'data2'
        console.log(dataPreferences); // Mostrar el contenido en la consola
      })
      .catch(error => {
        console.error('Error fetching preferences data:', error);
        // Manejar errores de la solicitud
      });
  }
  // 
  function GetAllStudents() {
    fetch('/getAllStudents') 
      .then(response => response.json()) 
      .then(dataStudents => {
        setDataStudents(dataStudents); 
        // Verificar si hay datos en la respuesta
        if (dataStudents.length > 0) {
          // Obtener el último idalumno de la lista de estudiantes
          const lastStudent = dataStudents[dataStudents.length - 1].idalumno;
          setStudentId(lastStudent + 1); 
        }
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        // Manejar errores de la solicitud
      });
  }

  function IncrementStudentId(idalumno){
    setStudentId(idalumno + 1);
  }
// ----------------------------------------------------------------  ALUMNOS_VALORACIONES
const AddNewStudent_Calification = async (studentId,averageGrade,idiomGrade,maturityGrade,competentGrade,failuresNumber,failuresGrade,globalGrade,observations2) => {
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
    const response = await fetch("/addStudent_Calification", options);
    if (!response.ok) {
      throw new Error('Error '); 
    }
    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse));
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

  //----------------------------------------------------------------  ESTUDIANTES (ALUMNOS)
    
  const AddNewStudent = async (name, gender, DNI, birthdate,idPreference1, idPreference2, idPreference3, date, curriculumStatus, admissionStatus, studiesEmail,
                              nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
                              speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, currentYear, adress, CP, location) => {
        try {
          const bodyParameters = {
            'nombre': name,
            'sexo': gender,
            'dni': DNI,
            'fechanacimiento': birthdate,
            'idpreferencia1': idPreference1,
            'idpreferencia2': idPreference2,
            'idpreferencia3': idPreference3,
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
            'anyocursado': currentYear,
            'domicilio':adress,
            'cp': CP,
            'localidad': location
          }
      
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters)
          }
          const response = await fetch("/addStudent", options);
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
    
      // STUDENT FUNCTIONS
      function HandleNameChange(event){
        setName(event.target.value);
      }
      function HandleGenderChange(event) {
        setGender(event.target.value);
      }
    
      function HandleDNIChange(event) {
          setDNI(event.target.value);
      }
    
      function HandleBirthdateChange(event) {
          setBirthdate(event.target.value);
      }

      function HandlePreference1Change(event){
        setPreference1(event.target.value);
      }
      
      function HandlePreference2Change(event){
        setPreference2(event.target.value);
      }
      
      function HandlePreference3Change(event){
        setPreference3(event.target.value);
      }

      function HandleDateChange(event){
        setDate(event.target.value);
      }

      function HandleCurriculumStatusChange(event) {
          setCurriculumStatus(event.target.value);
      }
    
      function HandleAdmissionStatusChange(event) {
          setAddmissionStatus(event.target.value);
      }
    
      function HandleStudiesEmailChange(event) {
          setStudiesEmail(event.target.value);
      }
    
      function HandleNationalityChange(event) {
          setNationality(event.target.value);
      }
    
      function HandleDrivingLicenseChange(event) {
          setDrivingLicense(event.target.value);
      }
    
      function HandleAvailabilityChange(event) {
          setAvailability(event.target.value);
      }
    
      function HandleSSNumberChange(event) {
          setSSNumber(event.target.value);
      }
    
      function HandleEmploymentSituationChange(event) {
          setEmploymentSituation(event.target.value);
      }
    
      function HandleLegalGuardianNameChange(event) {
          setLegalGuardianName(event.target.value);
      }
    
      function HandleSpecialityChange(event) {
          setSpeciality(event.target.value);
      }
    
      function HandleStudentTelephoneChange(event) {
          setStudentTelephone(event.target.value);
      }
    
      function HandleFamilyTelephoneChange(event) {
          setFamilyTelephone(event.target.value);
      }
    
      function HandleEmailChange(event) {
          setEmail(event.target.value);
      }
    
      function HandleObservationsChange(event) {
          setObservations(event.target.value);
      }
    
      function HandleFCTMonthChange(event) {
          setFCTMonth(event.target.value);
      }

      function HandleCurrentYearChange(event) {
        setCurrentYear(event.target.value);
      }

      const HandleAdressChange= (event) => {
        setAdress(event.target.value);
      };
  
      const HandleCPChange = (event) => {
        setCP(event.target.value);
      };

      const HandleLocationChange = (event) => {
        setLocation(event.target.value);
      };
  // --------------------------------------------------------------------------  EJECUCIONES
  function ButtonClickAddStudent(){
    getIdPreference (preference1, preference2, preference3);
    AddNewStudent(name, gender, DNI, birthdate, idPreference1, idPreference2, idPreference3, date, curriculumStatus, admissionStatus, studiesEmail,
                  nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
                  speciality, studentTelephone, familyTelephone, email, observations, FCTmonth, currentYear, adress, CP, location); 
    AddNewStudent_Calification (studentId, averageGrade, idiomGrade, maturityGrade, competentGrade, failuresNumber, failuresGrade, globalGrade, observations2);
    // Como el idalumno para idiomas y docs es el anterior al nuevo alumno añadidio,
    // ajusto con esta funcion para sumar +1 al id antior y que la variable idalumno ahora valga
    // lo que la nueva idalumno del alumno nuevo.
    AddStudent_Idioms(dataIdioms,studentId,idioms,degrees);
    AddStudent_Documents(studentId,documents,urls);
    IncrementStudentId(studentId);
    setSuccessMessage("La petición se ha añadido correctamente.");
  }

  function AddStudent_Idioms() {
    // Iterar sobre los arrays idiomas y titulos para enviar cada par de datos
    for (let i = 0; i < idioms.length; i++) {
        // Buscar el ID del idioma correspondiente en data2
        const foundIdiom = dataIdioms.find(item => item.idioma === idioms[i]);
            // Si se encuentra el idioma en data2, asignar su ID correspondiente
            idiomId = foundIdiom.ididioma;
            console.log('Valor de idiomId: ' + idiomId);
        // Crear un objeto con los datos del nuevo idioma en cada iteración
        console.log('Contenido de BODYPARAMETERS - PRE: ' + studentId,idiomId,degrees[i])
        const bodyParameters = {
            'idalumno': studentId,
            'ididioma': idiomId,
            'titulo': degrees[i]
        };
        console.log('Contenido de BODYPARAMETERS - POST: ' + studentId,idiomId,degrees[i])
        // Configurar las opciones para la solicitud fetch
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters) // Convertir el objeto a JSON
        };

        // Realizar la solicitud fetch al servidor para cada par de datos
        fetch('/addStudent_Idiom', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al insertar idioma');
                }
                return response.json();
            })
            .then(jsonResponse => {
                // Manejar la respuesta del servidor si es necesario
                console.log(jsonResponse);
                // Aquí puedes realizar alguna acción adicional si la inserción fue exitosa
            })
            .catch(error => {
                console.error('Error al insertar idioma:', error);
                // Aquí puedes mostrar un mensaje de error al usuario si la inserción falla
            });
    }
  }

  function AddStudent_Documents() {
    // Iterar sobre los arrays idiomas y titulos para enviar cada par de datos
    for (let i = 0; i < documents.length; i++) {
        // Crear un objeto con los datos del nuevo documento en cada iteración
        const bodyParameters = {
            idalumno: studentId,
            docalum: documents[i],
            url: urls[i]
        };
        console.log(bodyParameters);
        // Configurar las opciones para la solicitud fetch
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParameters) // Convertir el objeto a JSON
        };

        // Realizar la solicitud fetch al servidor para cada par de datos
        fetch('/addStudent_Doc', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al insertar documento');
                }
                return response.json();
            })
            .then(jsonResponse => {
                // Manejar la respuesta del servidor si es necesario
                console.log(jsonResponse);
                // Aquí puedes realizar alguna acción adicional si la inserción fue exitosa
            })
            .catch(error => {
                console.error('Error al insertar idioma:', error);
                // Aquí puedes mostrar un mensaje de error al usuario si la inserción falla
            });
    }
  }
   //--------------------------------------------------------------------------------------   IDIOMAS
    // Definimos un estado llamado 'nombres' usando el hook useState.
    // Inicializamos el estado con un array que contiene un string vacío.
    const [idioms, setIdioms] = useState(['']);
    const [degrees, setDegrees] = useState(['']);

    // Esta función maneja los cambios en los campos de entrada de idiomas.
    // Recibe el índice del nombre que está siendo modificado y el nuevo valor.
    const handleIdiomsChange = (index, value) => {
      // Creamos una copia de la lista de nombres para no mutar el estado directamente.
      const newIdioms = [...idioms];
      // Actualizamos el nombre en la posición 'index' con el nuevo valor.
      newIdioms[index] = value;
      // Actualizamos el estado con la nueva lista de nombres.
      setIdioms(newIdioms);
    };
    const handleDegreesChange = (index, value) => {
      // Creamos una copia de la lista de nombres para no mutar el estado directamente.
      const newDegrees = [...degrees];
      // Actualizamos el nombre en la posición 'index' con el nuevo valor.
      newDegrees[index] = value;
      // Actualizamos el estado con la nueva lista de nombres.
      setDegrees(newDegrees);
    };
  
    // Esta función se encarga de agregar un nuevo campo de entrada de nombre.
    const addIdiomsInput = () => {
      // Agregamos un nuevo elemento vacío al final de la lista de nombres.
      // Esto hará que se agregue un nuevo campo de entrada en el renderizado.
      setIdioms([...idioms, '']);
      setDegrees([...degrees, '']);
    };
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

    const addDocumentsInput = () => {
      setDocuments([...documents, '']);
      setUrls([...urls, '']);
    };

  // Renderizado del componente ------------------------------------------------  HTML
  return (
    <div clasdName="input-field">
      <form className="section">
        <h4 className="tittle">AÑADIR ALUMNO:</h4>
          <div className="input-field">
            <label htmlFor="date-input">Fecha hoy:</label>
            <input type="text" value={date} id="date-input" onChange={HandleDateChange} />
          </div>
          <div className="input-field">
            <label htmlFor="name-input">Alumno:</label>
            <input type="text" value={name} id="name-input" onChange={HandleNameChange} />
          </div>
          <div className="input-field">
            <label htmlFor="gender-input">Sexo:</label>
            <input type="text" value={gender} id="gender-input" onChange={HandleGenderChange} />
          </div>
          <div className="input-field">
            <label htmlFor="DNI-input">DNI:</label>
            <input type="text" value={DNI} id="DNI-input" onChange={HandleDNIChange} />
          </div>
          <div className="input-field">
            <label htmlFor="birthdate-input">Fecha de Nacimiento:</label>
            <input type="text" value={birthdate} id="birthdate-input" onChange={HandleBirthdateChange} />
          </div>
          <div className="input-field">
            <label>Preferencia 1:</label>
            <select value={preference1} onChange={HandlePreference1Change}>
              <option value="">Seleccione una preferencia</option>
              {dataPreferences.map(preference => (
              <option key={preference.id} value={preference.preferencia}>{preference.preferencia}</option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label>Preferencia 2:</label>
            <select value={preference2} onChange={HandlePreference2Change}>
              <option value="">Seleccione una preferencia</option>
              {dataPreferences.map(preference => (
              <option key={preference.id} value={preference.preferencia}>{preference.preferencia}</option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label>Preferencia 3:</label>
            <select value={preference3} onChange={HandlePreference3Change}>
              <option value="">Seleccione una preferencia</option>
              {dataPreferences.map(preference => (
              <option key={preference.id} value={preference.preferencia}>{preference.preferencia}</option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="curriculumStatus-input">Estado del Curriculum:</label>
            <input type="text" value={curriculumStatus} id="curriculumStatus-input" onChange={HandleCurriculumStatusChange} />
          </div>
          <div className="input-field">
            <label htmlFor="admissionStatus-input">Estado de Admisión:</label>
            <input type="text" value={admissionStatus} id="admissionStatus-input" onChange={HandleAdmissionStatusChange} />
          </div>
          <div className="input-field">
            <label htmlFor="studiesEmail-input">Email del Instituto:</label>
            <input type="text" value={studiesEmail} id="studiesEmail-input" onChange={HandleStudiesEmailChange} />
          </div>
          <div className="input-field">
            <label htmlFor="nationality-input">Nacionalidad:</label>
            <input type="text" value={nationality} id="nationality-input" onChange={HandleNationalityChange} />
          </div>
          <div className="input-field">
            <label htmlFor="drivingLicense-input">Carnet de Conducir:</label>
            <input type="text" value={drivingLicense} id="drivingLicense-input" onChange={HandleDrivingLicenseChange} />
          </div>
          <div className="input-field">
            <label htmlFor="availability-input">Disponibilidad:</label>
            <input type="text" value={availability} id="availability-input" onChange={HandleAvailabilityChange} />
          </div>
          <div className="input-field">
            <label htmlFor="SSnumber-input">Número de Seguridad Social:</label>
            <input type="text" value={SSnumber} id="SSnumber-input" onChange={HandleSSNumberChange} />
          </div>
          <div className="input-field">
            <label htmlFor="employmentSituation-input">Situación Laboral:</label>
            <input type="text" value={employmentSituation} id="employmentSituation-input" onChange={HandleEmploymentSituationChange} />
          </div>
          <div className="input-field">
            <label htmlFor="legalGuardianName-input">Nombre del Tutor Legal:</label>
            <input type="text" value={legalGuardianName} id="legalGuardianName-input" onChange={HandleLegalGuardianNameChange} />
          </div>
          <div className="input-field">
            <label htmlFor="speciality-input">Especialidad:</label>
            <input type="text" value={speciality} id="speciality-input" onChange={HandleSpecialityChange} />
          </div>
          <div className="input-field">
            <label htmlFor="studentTelephone-input">Teléfono del Alumno:</label>
            <input type="text" value={studentTelephone} id="studentTelephone-input" onChange={HandleStudentTelephoneChange} />
          </div>
          <div className="input-field">
            <label htmlFor="familyTelephone-input">Teléfono de la Familia:</label>
            <input type="text" value={familyTelephone} id="familyTelephone-input" onChange={HandleFamilyTelephoneChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email-input">Email personal:</label>
            <input type="text" value={email} id="email-input" onChange={HandleEmailChange} />
          </div>
          <div className="input-field">
            <label htmlFor="observations-input">Observaciones:</label>
            <input type="text" value={observations} id="observations-input" onChange={HandleObservationsChange} />
          </div>
          <div className="input-field">
            <label htmlFor="FCTmonth-input">Mes FCT:</label>
            <input type="text" value={FCTmonth} id="FCTmonth-input" onChange={HandleFCTMonthChange} />
          </div>
          <div className="input-field">
            <label htmlFor="currentYear-input">Curso actual:</label>
            <input type="text" value={currentYear} id="currentYear-input" onChange={HandleCurrentYearChange} />
          </div>
          <div className="input-field">
            <label htmlFor="adress-input">Domicilio:</label>
            <input type="text" value={adress} id="adress-input" onChange={HandleAdressChange} />
          </div>
          <div className="input-field">
            <label htmlFor="CP-input">Código Postal:</label>
            <input type="text" value={CP} id="CP-input" onChange={HandleCPChange} />
          </div>
          <div className="input-field">
            <label htmlFor="location-input">Población:</label>
            <input type="text" value={location} id="location-input" onChange={HandleLocationChange} />
          </div>
      </form>
      <form className="section">
        <h4 className="tittle">AÑADIR VALORACIÓN:</h4>
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
      </form>
      <div className="section">
        <h4 className="tittle"> INSERTAR NUEVO IDIOMA: </h4>
        {idioms.map((idiom, index) => ( 
          <div key={index}>
            <input type="text" value={idiom} onChange={(e) => handleIdiomsChange(index, e.target.value)} className="input-field" placeholder="Idioma"/>
            <input type="text" value={degrees[index]} onChange={(e) => handleDegreesChange(index, e.target.value)} className="input-field" placeholder="Titulo"/>
          </div>
        ))}
        <button className="button" onClick={addIdiomsInput}> + </button>
      </div>
      <div className="section">
        <h4 className="tittle"> INSERTAR NUEVO DOCUMENTO: </h4>
        {documents.map((document, index) => ( 
          <div key={index}>
            <input type="text" value={document} onChange={(e) => handleDocumentChange(index, e.target.value)} className="input-field" placeholder="Documento"/>
            <input type="text" value={urls[index]} onChange={(e) => handleUrlChange(index, e.target.value)} className="input-field" placeholder="URL"/>
          </div>
        ))}
        <button className="button" onClick={addDocumentsInput}> + </button>
      </div>
      <button className="addStudentButton" type="button" onClick={ButtonClickAddStudent}> AÑADIR ALUMNO </button>
      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddStudentComponent;
