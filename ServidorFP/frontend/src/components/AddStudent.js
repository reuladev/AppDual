import React, { useState, useEffect } from 'react';

function AddStudentComponent() {
  // Definición de estados utilizando el hook useState
  const [dataStudents, setDataStudents] = useState([]); // Estado para almacenar datos obtenidos del servidor
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [DNI, setDNI] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [curriculumStatus, setCurriculumStatus] = useState("");
  const [admissionStatus, setAddmissionStatus] = useState("");
  const [studiesEmail, setStudiesEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [availability, setAvailability] = useState("");
  const [SSnumber, setSSNumber] = useState("");
  const [employmentSituation, setEmploymentSituation] = useState("");
  const [legalGuardianName, setLegalGuardianName] = useState("");
  const [legalGuardianDNI, setLegalGuardianDNI] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [studentTelephone, setStudentTelephone] = useState("");
  const [familyTelephone, setFamilyTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [observations, setObservations] = useState("");
  const [FCTmonth, setFCTMonth] = useState("");
  //Variables necesarias para poder usar /addStudent_Idiom
  const [dataIdioms, setDataIdioms] = useState([]);
  const [idiomaalumno, setIdiomaAlumno] = useState("");
  let [idiomId, setIdiomId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [degree, setDegree] = useState("");
  //Variables necesarias para poder usar /addStudentPreferences
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [date, setDate] = useState("");
  //Variables necesariasa para poder usar /addStudent_Doc
  const [studentDocument, setStudentDocument] = useState("");
  const [URL, setURL] = useState("");
  //Variables necesarias para poder usar /addStudent_Adress
  const [adress, setAdress] = useState("");
  const [CP, setCP] = useState("");
  const [province, setProvince] = useState("");
  const [location, setLocation] = useState("");
  const [telephone, setTelephone] = useState("");
   //Variables necesarias para poder usar /addStudent_Calification
   const [averageGrade, setAverageGrade] = useState("");
   const [idiomGrade, setIdiomGrade] = useState("");
   const [maturityGrade, setMaturityGrade] = useState("");
   const [competentGrade, setCompetentGrade] = useState("");
   const [failuresNumber, setFailuresNumber] = useState("");
   const [failuresGrade, setFailuresGrade] = useState("");
   const [globalGrade, setGlobalGrade] = useState("");
   const [observations2, setObservations2] = useState("");

   const [document, setDocument] = useState("");
   
  
 // ----------------------------------------------------------------   USE EFFECTS
  useEffect(() => {
    GetAllIdioms(); 
    GetAllStudents();
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
  // ----------------------------------------------------------------  ESTUDIANTES_PREFERENCIAS
  const AddNewStudent_Preferences = async (studentId,option1,option2,option3,date) => {
    try {
      const bodyParameters = {
        'idalumno': studentId,
        'opcion1':  option1,
        'opcion2': option2,
        'opcion3': option3,
        'fecha': date
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParameters)
      }
      const response = await fetch("/addStudent_Preferences", options);
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

  //FUNCTIONS PREFERENCIAS_ESTUDIANTES
  function HandleOption1Change(event){
    setOption1(event.target.value);
  }
  function HandleOption2Change(event){
    setOption2(event.target.value);
  }
  function HandleOption3Change(event){
    setOption3(event.target.value);
  }
  function HandleDateChange(event){
    setDate(event.target.value);
  }
  //----------------------------------------------------------------  ESTUDIANTES (ALUMNOS)
    
  const AddNewStudent = async (name, gender, DNI, birthdate, curriculumStatus, admissionStatus, studiesEmail,
                              nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
                              legalGuardianDNI, speciality, studentTelephone, familyTelephone, email, observations, FCTmonth) => {
        try {
          const bodyParameters = {
            'nombre': name,
            'sexo': gender,
            'dni': DNI,
            'fechanacimiento': birthdate,
            'estadocurriculum': curriculumStatus,
            'estadoadmision': admissionStatus,
            'emailinstituto': studiesEmail,
            'nacionalidad': nationality,
            'carnetconducir': drivingLicense,
            'disponibilidad': availability,
            'numeroSS': SSnumber,
            'situacionlaboral': employmentSituation,
            'nombretutorlegal': legalGuardianName,
            'danitutorlegal': legalGuardianDNI,
            'especialidad': speciality,
            'telalumno': studentTelephone,
            'telfamilia': familyTelephone,
            'email': email,
            'observaciones': observations,
            'mesFCT': FCTmonth
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
    
      function HandleLegalGuardianDNIChange(event) {
          setLegalGuardianDNI(event.target.value);
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

  // --------------------------------------------------------------------------  EJECUCIONES
  function ButtonClickAddStudent(){
    AddNewStudent(name, gender, DNI, birthdate, curriculumStatus, admissionStatus, studiesEmail,
                  nationality, drivingLicense, availability, SSnumber, employmentSituation, legalGuardianName,
                  legalGuardianDNI, speciality, studentTelephone, familyTelephone, email, observations, FCTmonth); 
    AddNewStudent_Preferences(studentId, option1, option2, option3, date);
    AddNewStudent_Calification (studentId, averageGrade, idiomGrade, maturityGrade, competentGrade, failuresNumber, failuresGrade, globalGrade, observations2);
    // Como el idalumno para idiomas y docs es el anterior al nuevo alumno añadidio,
    // ajusto con esta funcion para sumar +1 al id antior y que la variable idalumno ahora valga
    // lo que la nueva idalumno del alumno nuevo.
    AddStudent_Idioms(dataIdioms,studentId,idioms,degrees);
    AddStudent_Documents(studentId,documents,urls);
    AddStudent_Adresses (studentId,adressParametters);
    IncrementStudentId(studentId);
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
  function AddStudent_Adresses() {
    // Iterar sobre los arrays idiomas y titulos para enviar cada par de datos
    for (let i = 0; i < adressParametters.length; i++) {
        // Crear un objeto con los datos del nuevo documento en cada iteración
        const bodyParameters = {
            idalumno: studentId,
            domicilio: adressParametters[i].adress,
            cp: adressParametters[i].cp,
            provincia: adressParametters[i].province,
            localidad: adressParametters[i].location,
            telefono: adressParametters[i].telephone
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
        fetch('/addStudent_Adress', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al insertar direccion');
                }
                return response.json();
            })
            .then(jsonResponse => {
                // Manejar la respuesta del servidor si es necesario
                console.log(jsonResponse);
                // Aquí puedes realizar alguna acción adicional si la inserción fue exitosa
            })
            .catch(error => {
                console.error('Error al insertar direccion:', error);
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
    //---------------------------------------------------------------------------------------------- DOMICILIOS
    const [adressParametters, setAdressParametters] = useState([{adress: '', cp: '', province: '',location: '', telephone: ''}])
    
    const handleAdressChange = (index, value) => {
      const newAdressParametters = [...adressParametters];
      newAdressParametters[index].adress = value;
      setAdressParametters(newAdressParametters);
    };

    const handleCpChange = (index, value) => {
      const newAdressParametters = [...adressParametters];
      newAdressParametters[index].cp = value;
      setAdressParametters(newAdressParametters);
    };
    const handleProvinceChange = (index, value) => {
      const newAdressParametters = [...adressParametters];
      newAdressParametters[index].province = value;
      setAdressParametters(newAdressParametters);
    };

    const handleLocationChange = (index, value) => {
      const newAdressParametters = [...adressParametters];
      newAdressParametters[index].location = value;
      setAdressParametters(newAdressParametters);
    };

    const handleTelephoneChange = (index, value) => {
      const newAdressParametters = [...adressParametters];
      newAdressParametters[index].telephone = value;
      setAdressParametters(newAdressParametters);
    };

    const addAdressInput = () => {
      setAdressParametters([...adressParametters, {adress: '', cp: '', province: '', location: '', telephone: ''}]);
    };
    
  
  // Renderizado del componente ------------------------------------------------  HTML
  return (
    <div>
      <form>
          <h4>AÑADIR ALUMNO:</h4>
          <div>
              <label htmlFor="title-input">Fecha hoy:</label>
              <input type="text" value={date} id="title-input" onChange={HandleDateChange} />
          </div>
          <div>
              <label htmlFor="title-input">Primera opcion estudiante:</label>
              <input type="text" value={option1} id="title-input" onChange={HandleOption1Change} />
          </div>
          <div>
              <label htmlFor="title-input">Segunda opcion estudiante:</label>
              <input type="text" value={option2} id="title-input" onChange={HandleOption2Change} />
          </div>
          <div>
              <label htmlFor="title-input">Tercera opcion estudiante:</label>
              <input type="text" value={option3} id="title-input" onChange={HandleOption3Change} />
          </div>
          <div>
              <label htmlFor="title-input">Alumno:</label>
              <input type="text" value={name} id="title-input" onChange={HandleNameChange} />
          </div>
          <div>
              <label htmlFor="sexo-input">Sexo:</label>
              <input type="text" value={gender} id="sexo-input" onChange={HandleGenderChange} />
          </div>
          <div>
              <label htmlFor="dni-input">DNI:</label>
              <input type="text" value={DNI} id="dni-input" onChange={HandleDNIChange} />
          </div>
          <div>
              <label htmlFor="fechanacimiento-input">Fecha de Nacimiento:</label>
              <input type="text" value={birthdate} id="fechanacimiento-input" onChange={HandleBirthdateChange} />
          </div>
          <div>
              <label htmlFor="estadocurriculum-input">Estado del Curriculum:</label>
              <input type="text" value={curriculumStatus} id="estadocurriculum-input" onChange={HandleCurriculumStatusChange} />
          </div>
          <div>
              <label htmlFor="estadoadmision-input">Estado de Admisión:</label>
              <input type="text" value={admissionStatus} id="estadoadmision-input" onChange={HandleAdmissionStatusChange} />
          </div>
          <div>
              <label htmlFor="emailinstituto-input">Email del Instituto:</label>
              <input type="text" value={studiesEmail} id="emailinstituto-input" onChange={HandleStudiesEmailChange} />
          </div>
          <div>
              <label htmlFor="nacionalidad-input">Nacionalidad:</label>
              <input type="text" value={nationality} id="nacionalidad-input" onChange={HandleNationalityChange} />
          </div>
          <div>
              <label htmlFor="carnetconducir-input">Carnet de Conducir:</label>
              <input type="text" value={drivingLicense} id="carnetconducir-input" onChange={HandleDrivingLicenseChange} />
          </div>
          <div>
              <label htmlFor="disponibilidad-input">Disponibilidad:</label>
              <input type="text" value={availability} id="disponibilidad-input" onChange={HandleAvailabilityChange} />
          </div>
          <div>
              <label htmlFor="numeroSS-input">Número de Seguridad Social:</label>
              <input type="text" value={SSnumber} id="numeroSS-input" onChange={HandleSSNumberChange} />
          </div>
          <div>
              <label htmlFor="situacionlaboral-input">Situación Laboral:</label>
              <input type="text" value={employmentSituation} id="situacionlaboral-input" onChange={HandleEmploymentSituationChange} />
          </div>
          <div>
              <label htmlFor="nombretutorlegal-input">Nombre del Tutor Legal:</label>
              <input type="text" value={legalGuardianName} id="nombretutorlegal-input" onChange={HandleLegalGuardianNameChange} />
          </div>
          <div>
              <label htmlFor="dnitutorlegal-input">DNI del Tutor Legal:</label>
              <input type="text" value={legalGuardianDNI} id="dnitutorlegal-input" onChange={HandleLegalGuardianDNIChange} />
          </div>
          <div>
              <label htmlFor="especialidad-input">Especialidad:</label>
              <input type="text" value={speciality} id="especialidad-input" onChange={HandleSpecialityChange} />
          </div>
          <div>
              <label htmlFor="telalumno-input">Teléfono del Alumno:</label>
              <input type="text" value={studentTelephone} id="telalumno-input" onChange={HandleStudentTelephoneChange} />
          </div>
          <div>
              <label htmlFor="telfamilia-input">Teléfono de la Familia:</label>
              <input type="text" value={familyTelephone} id="telfamilia-input" onChange={HandleFamilyTelephoneChange} />
          </div>
          <div>
              <label htmlFor="email-input">Email personal:</label>
              <input type="text" value={email} id="email-input" onChange={HandleEmailChange} />
          </div>
          <div>
              <label htmlFor="observaciones-input">Observaciones:</label>
              <input type="text" value={observations} id="observaciones-input" onChange={HandleObservationsChange} />
          </div>
          <div>
              <label htmlFor="mesFCT-input">Mes FCT:</label>
              <input type="text" value={FCTmonth} id="mesFCT-input" onChange={HandleFCTMonthChange} />
          </div>
      </form>
      <form>
          <h4>AÑADIR VALORACIÓN:</h4>
          <div>
              <label htmlFor="title-input">Nota media:</label>
              <input type="text" value={averageGrade} id="title-input" onChange={HandleAverageGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Nota idioma:</label>
              <input type="text" value={idiomGrade} id="title-input" onChange={HandleIdiomGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Nota madurez:</label>
              <input type="text" value={maturityGrade} id="title-input" onChange={HandleMaturityGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Nota competencia:</label>
              <input type="text" value={competentGrade} id="title-input" onChange={HandleCompetentGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Total de faltas:</label>
              <input type="text" value={failuresNumber} id="title-input" onChange={HandleFailuresNumberChange} />
          </div>
          <div>
              <label htmlFor="title-input">Notas faltas:</label>
              <input type="text" value={failuresGrade} id="title-input" onChange={HandleFailuresGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Notas global:</label>
              <input type="text" value={globalGrade} id="title-input" onChange={HandleGlobalGradeChange} />
          </div>
          <div>
              <label htmlFor="title-input">Observaciones:</label>
              <input type="text" value={observations2} id="title-input" onChange={HandleObservations2Change} />
          </div>
      </form>
      <div>
         <h4> INSERTAR NUEVO IDIOMA: </h4>
          {idioms.map((idiom, index) => ( 
            <div key={index}>
              <input type="text" value={idiom} onChange={(e) => handleIdiomsChange(index, e.target.value)}  placeholder="Idioma"/> {/* Cada campo de entrada está vinculado a su respectivo nombre en la lista */}
              <input type="text" value={degrees[index]} onChange={(e) => handleDegreesChange(index, e.target.value)}  placeholder="Titulo"/>
            </div>
          ))}
          <button onClick={addIdiomsInput}> + </button> {/* Un botón para agregar otro campo de entrada de nombre */}
        </div>
      <div>
        <h4> INSERTAR NUEVO DOCUMENTO: </h4>
        {documents.map((document, index) => ( 
            <div key={index}>
              <input type="text" value={document} onChange={(e) => handleDocumentChange(index, e.target.value)}  placeholder="Documento"/> {/* Cada campo de entrada está vinculado a su respectivo nombre en la lista */}
              <input type="text" value={urls[index]} onChange={(e) => handleUrlChange(index, e.target.value)}  placeholder="URL"/>
            </div>
          ))}
          <button onClick={addDocumentsInput}> + </button> {/* Un botón para agregar otro campo de entrada de nombre */}
      </div>
      <div>
        <h4> INSERTAR NUEVO DOMICILIO: </h4>
        {adressParametters.map((adressParametters, index) => ( 
            <div key={index}>
              <input type="text" value={adressParametters.adress} onChange={(e) => handleAdressChange(index, e.target.value)}  placeholder="Dirección"/> {/* Cada campo de entrada está vinculado a su respectivo nombre en la lista */}
              <input type="text" value={adressParametters.cp} onChange={(e) => handleCpChange(index, e.target.value)}  placeholder="CP"/>
              <input type="text" value={adressParametters.province} onChange={(e) => handleProvinceChange(index, e.target.value)}  placeholder="Provincia"/>
              <input type="text" value={adressParametters.location} onChange={(e) => handleLocationChange(index, e.target.value)}  placeholder="Localidad"/>
              <input type="text" value={adressParametters.telephone} onChange={(e) => handleTelephoneChange(index, e.target.value)}  placeholder="Teléfono personal"/>
            </div>
          ))}
          <button onClick={addAdressInput}> + </button> {/* Un botón para agregar otro campo de entrada de nombre */}
      </div>
      <button type="button" onClick={ButtonClickAddStudent}> AÑADIR ALUMNO </button> {/* Botón para insertar nuevo alumno */}
    </div>
  );
}

export default AddStudentComponent;
