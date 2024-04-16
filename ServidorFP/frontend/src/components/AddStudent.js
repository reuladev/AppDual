import React, { useState, useEffect } from 'react';

function AddStudentComponent() {
  // Definición de estados utilizando el hook useState
  const [data, setData] = useState([]); // Estado para almacenar datos obtenidos del servidor
  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState("");
  const [dni, setDni] = useState("");
  const [fechanacimiento, setFechanacimiento] = useState("");
  const [estadocurriculum, setEstadocurriculum] = useState("");
  const [estadoadmision, setEstadoadmision] = useState("");
  const [emailinstituto, setEmailinstituto] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [carnetconducir, setCarnetconducir] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [numeroSS, setNumeroSS] = useState("");
  const [situacionlaboral, setSituacionlaboral] = useState("");
  const [nombretutorlegal, setNombretutorlegal] = useState("");
  const [dnitutorlegal, setDnitutorlegal] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telalumno, setTelalumno] = useState("");
  const [telfamilia, setTelfamilia] = useState("");
  const [email, setEmail] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [mesFCT, setMesFCT] = useState("");
  //Variables necesarias para poder usar /addStudent_Idiom
  const [data2, setData2] = useState([]);
  const [idiomaalumno, setIdiomaAlumno] = useState("");
  const [ididioma, setIdIdioma] = useState("");
  const [idalumno, setIdAlumno] = useState("");
  const [titulo, setTitulo] = useState("");

 // Llamar a las funciones
  useEffect(() => {
    GetAllIdioms(); // Llamada a la función
    GetAllStudents();
  }, []);

  // Recoge todos los datos de la tabla idiomas y los guarda en data2
  function GetAllIdioms() {
    fetch('/getAllIdioms') // Hacer una solicitud HTTP GET a '/getAllIdioms'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => setData2(data)); // Establecer los datos obtenidos en el estado 'data2'
  }
  // 
  function GetAllStudents() {
    fetch('/getAllStudents') 
      .then(response => response.json()) 
      .then(data => {
        setData(data); 
        // Verificar si hay datos en la respuesta
        if (data.length > 0) {
          // Obtener el último idalumno de la lista de estudiantes
          const ultimoIdAlumno = data[data.length - 1].idalumno;
          setIdAlumno(ultimoIdAlumno + 1); 
        }
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        // Manejar errores de la solicitud
      });
  }


 //Metodo que compara el nombre del idioma del alumno introducido por el usuario con el idioma
 // en la BBDD para obtener el id del idioma de la BBDD y enviarlo a addStudent_Idiom para insertarlo
 // en la tabla idiomas_alumnos.
  useEffect(() => {
    // Cuando se actualiza la variable idiomaAlumno, buscar su correspondiente ididioma
    if (idiomaalumno && data2.length > 0) {
      // Si hay un valor en idiomaAlumno y hay datos disponibles en data2
      const foundIdioma = data2.find(idioma => idioma.idioma === idiomaalumno);
      // Utiliza el método find para buscar un idioma en data2 cuyo atributo idioma coincida con idiomaAlumno
      if (foundIdioma) {
        // Si se encuentra un idioma que coincida
        setIdIdioma(foundIdioma.ididioma);
        // Establece el ididioma correspondiente en el estado idiomaAlumnoId
      } else {
        // Si no se encuentra un idioma que coincida
        setIdIdioma('');
        // Establece el estado idiomaAlumnoId en vacío ('')
      }
    }
  }, [idiomaalumno, data2]);
  // Este efecto se ejecutará cada vez que idiomaAlumno o data2 cambien

  const AddNewStudent_Idiom = async (idalumno,ididioma,titulo) => {
    try {
      const bodyParameters = {
        'idalumno': idalumno,
        'ididioma': ididioma,
        'titulo': titulo
      }
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParameters)
      }
  
      const response = await fetch("/addStudent_Idiom", options);
  
      if (!response.ok) {
        throw new Error('Error '); // Puedes personalizar el mensaje de error según tus necesidades
      }
  
      const jsonResponse = await response.json();
      console.log(JSON.stringify(jsonResponse));
      return jsonResponse;
    } catch (error) {
      console.error('Error:', error.message);
      // Aquí puedes actualizar el estado para mostrar un mensaje de error al usuario
    }
  }
  function HandleIdiomaChange(event){
    setIdiomaAlumno(event.target.value);
  }
  function HandleTituloChange(event){
    setTitulo(event.target.value);
  }
  function HandleNombreChange(event){
    setNombre(event.target.value);
  }
  function HandleSexoChange(event) {
    setSexo(event.target.value);
  }

  function HandleDniChange(event) {
      setDni(event.target.value);
  }

  function HandleFechanacimientoChange(event) {
      setFechanacimiento(event.target.value);
  }

  function HandleEstadocurriculumChange(event) {
      setEstadocurriculum(event.target.value);
  }

  function HandleEstadoadmisionChange(event) {
      setEstadoadmision(event.target.value);
  }

  function HandleEmailinstitutoChange(event) {
      setEmailinstituto(event.target.value);
  }

  function HandleNacionalidadChange(event) {
      setNacionalidad(event.target.value);
  }

  function HandleCarnetconducirChange(event) {
      setCarnetconducir(event.target.value);
  }

  function HandleDisponibilidadChange(event) {
      setDisponibilidad(event.target.value);
  }

  function HandleNumeroSSChange(event) {
      setNumeroSS(event.target.value);
  }

  function HandleSituacionlaboralChange(event) {
      setSituacionlaboral(event.target.value);
  }

  function HandleNombretutorlegalChange(event) {
      setNombretutorlegal(event.target.value);
  }

  function HandleDnitutorlegalChange(event) {
      setDnitutorlegal(event.target.value);
  }

  function HandleEspecialidadChange(event) {
      setEspecialidad(event.target.value);
  }

  function HandleTelalumnoChange(event) {
      setTelalumno(event.target.value);
  }

  function HandleTelfamiliaChange(event) {
      setTelfamilia(event.target.value);
  }

  function HandleEmailChange(event) {
      setEmail(event.target.value);
  }

  function HandleObservacionesChange(event) {
      setObservaciones(event.target.value);
  }

  function HandleMesFCTChange(event) {
      setMesFCT(event.target.value);
  }

  function ButtonClickAddStudent(){
    AddNewStudent(nombre, sexo, dni, fechanacimiento, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        dnitutorlegal, especialidad, telalumno, telfamilia, email, observaciones, mesFCT); 
    AddNewStudent_Idiom(idalumno,ididioma,titulo);
    //GetAllStudents(); 
  }

  const AddNewStudent = async (nombre, sexo, dni, fechanacimiento, estadocurriculum, estadoadmision, emailinstituto,
    nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
    dnitutorlegal, especialidad, telalumno, telfamilia, email, observaciones, mesFCT) => {
    try {
      const bodyParameters = {
        'nombre': nombre,
        'sexo': sexo,
        'dni': dni,
        'fechanacimiento': fechanacimiento,
        'estadocurriculum': estadocurriculum,
        'estadoadmision': estadoadmision,
        'emailinstituto': emailinstituto,
        'nacionalidad': nacionalidad,
        'carnetconducir': carnetconducir,
        'disponibilidad': disponibilidad,
        'numeroSS': numeroSS,
        'situacionlaboral': situacionlaboral,
        'nombretutorlegal': nombretutorlegal,
        'dnitutorlegal': dnitutorlegal,
        'especialidad': especialidad,
        'telalumno': telalumno,
        'telfamilia': telfamilia,
        'email': email,
        'observaciones': observaciones,
        'mesFCT': mesFCT
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
        throw new Error('Error al agregar el estudiante'); // Puedes personalizar el mensaje de error según tus necesidades
      }
  
      const jsonResponse = await response.json();
      console.log(JSON.stringify(jsonResponse));
      return jsonResponse;
    } catch (error) {
      console.error('Error:', error.message);
      // Aquí puedes actualizar el estado para mostrar un mensaje de error al usuario
    }
  }

  
  // Renderizado del componente
  return (
    <div>
      <h1>Insertar nuevo alumno:</h1>
      <form>
          <div>
              <label htmlFor="title-input">Idioma:</label>
              <input type="text" value={idiomaalumno} id="title-input" onChange={HandleIdiomaChange} />
          </div>
          <div>
              <label htmlFor="title-input">Titulación idioma:</label>
              <input type="text" value={titulo} id="title-input" onChange={HandleTituloChange} />
          </div>
          <div>
              <label htmlFor="title-input">Alumno:</label>
              <input type="text" value={nombre} id="title-input" onChange={HandleNombreChange} />
          </div>
          <div>
              <label htmlFor="sexo-input">Sexo:</label>
              <input type="text" value={sexo} id="sexo-input" onChange={HandleSexoChange} />
          </div>

          <div>
              <label htmlFor="dni-input">DNI:</label>
              <input type="text" value={dni} id="dni-input" onChange={HandleDniChange} />
          </div>

          <div>
              <label htmlFor="fechanacimiento-input">Fecha de Nacimiento:</label>
              <input type="text" value={fechanacimiento} id="fechanacimiento-input" onChange={HandleFechanacimientoChange} />
          </div>

          <div>
              <label htmlFor="estadocurriculum-input">Estado del Curriculum:</label>
              <input type="text" value={estadocurriculum} id="estadocurriculum-input" onChange={HandleEstadocurriculumChange} />
          </div>

          <div>
              <label htmlFor="estadoadmision-input">Estado de Admisión:</label>
              <input type="text" value={estadoadmision} id="estadoadmision-input" onChange={HandleEstadoadmisionChange} />
          </div>

          <div>
              <label htmlFor="emailinstituto-input">Email del Instituto:</label>
              <input type="text" value={emailinstituto} id="emailinstituto-input" onChange={HandleEmailinstitutoChange} />
          </div>

          <div>
              <label htmlFor="nacionalidad-input">Nacionalidad:</label>
              <input type="text" value={nacionalidad} id="nacionalidad-input" onChange={HandleNacionalidadChange} />
          </div>

          <div>
              <label htmlFor="carnetconducir-input">Carnet de Conducir:</label>
              <input type="text" value={carnetconducir} id="carnetconducir-input" onChange={HandleCarnetconducirChange} />
          </div>

          <div>
              <label htmlFor="disponibilidad-input">Disponibilidad:</label>
              <input type="text" value={disponibilidad} id="disponibilidad-input" onChange={HandleDisponibilidadChange} />
          </div>

          <div>
              <label htmlFor="numeroSS-input">Número de Seguridad Social:</label>
              <input type="text" value={numeroSS} id="numeroSS-input" onChange={HandleNumeroSSChange} />
          </div>

          <div>
              <label htmlFor="situacionlaboral-input">Situación Laboral:</label>
              <input type="text" value={situacionlaboral} id="situacionlaboral-input" onChange={HandleSituacionlaboralChange} />
          </div>

          <div>
              <label htmlFor="nombretutorlegal-input">Nombre del Tutor Legal:</label>
              <input type="text" value={nombretutorlegal} id="nombretutorlegal-input" onChange={HandleNombretutorlegalChange} />
          </div>

          <div>
              <label htmlFor="dnitutorlegal-input">DNI del Tutor Legal:</label>
              <input type="text" value={dnitutorlegal} id="dnitutorlegal-input" onChange={HandleDnitutorlegalChange} />
          </div>

          <div>
              <label htmlFor="especialidad-input">Especialidad:</label>
              <input type="text" value={especialidad} id="especialidad-input" onChange={HandleEspecialidadChange} />
          </div>

          <div>
              <label htmlFor="telalumno-input">Teléfono del Alumno:</label>
              <input type="text" value={telalumno} id="telalumno-input" onChange={HandleTelalumnoChange} />
          </div>

          <div>
              <label htmlFor="telfamilia-input">Teléfono de la Familia:</label>
              <input type="text" value={telfamilia} id="telfamilia-input" onChange={HandleTelfamiliaChange} />
          </div>

          <div>
              <label htmlFor="email-input">Email:</label>
              <input type="text" value={email} id="email-input" onChange={HandleEmailChange} />
          </div>

          <div>
              <label htmlFor="observaciones-input">Observaciones:</label>
              <input type="text" value={observaciones} id="observaciones-input" onChange={HandleObservacionesChange} />
          </div>

          <div>
              <label htmlFor="mesFCT-input">Mes FCT:</label>
              <input type="text" value={mesFCT} id="mesFCT-input" onChange={HandleMesFCTChange} />
          </div>
          <button type="button" onClick={ButtonClickAddStudent}>Insert</button> {/* Botón para insertar nuevo alumno */}
      </form>
    </div>
  );
}

export default AddStudentComponent;
