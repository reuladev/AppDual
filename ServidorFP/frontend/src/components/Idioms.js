import React, { useState, useEffect } from 'react';

function AddIdiomComponent() {
  // Definición de estados utilizando el hook useState
  const [data, setData] = useState([]); // Estado para almacenar datos obtenidos del servidor
  const [ididioma, setIdIdioma] = useState(""); // Estado para el nombre de la nueva nota
  const [idioma, setIdioma] = useState(""); // Estado para el texto de la nueva nota
  // Efecto que se ejecuta solo una vez al montar el componente
  useEffect(() => {
    GetAllIdioms(); // Llamada a la función GetAllNotes
  }, []);

  // PETICION GET -- MOSTRAR IDIOMAS
  function GetAllIdioms() {
    fetch('/getAllIdioms') // Hacer una solicitud HTTP GET a '/getAllNotes'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => setData(data)); // Establecer los datos obtenidos en el estado 'data'
  }


  // FUNCION SET ID IDIOMA
  function HandleIdIdiomsChange(event){
    setIdIdioma(event.target.value); // Establecer el nuevo valor del estado 'ididioma'
  }

  // FUNCION SET IDIOMA
  function HandleIdiomChange(event){
    setIdioma(event.target.value); // Establecer el nuevo valor del estado 'idioma'
  }
  // BUTTON INSERTAR NUEVO IDIOMA 
  function ButtonClickAdd(){
    AddNewIdiom(idioma); // Llamar a la función AddNewIidom con el idioma.
    GetAllIdioms(); // Actualizar la lista de idiomas después de agregar una nueva
  }
  // BUTTON BORRAR IDIOMA 
  function ButtonClickDelete(){
    DeleteIdiom(ididioma); // Llamar a la función AddNewRecord con el nombre y texto
    GetAllIdioms(); // Actualizar la lista de notas después de agregar una nueva
  }

  // BUTTON NUEVO IDIOMA -- PETICION POST
  const AddNewIdiom = async (idioma) => {
    const bodyParameters = {
      'idioma': idioma
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParameters)
    }
  
    const response = await fetch("/addIdioms", options); // Hacer una solicitud HTTP POST a '/addNote' con los datos de la nueva nota
    const jsonResponse = await response.json(); // Convertir la respuesta a JSON
    console.log(JSON.stringify(jsonResponse)); // Imprimir la respuesta JSON en la consola
    return jsonResponse; // Devolver la respuesta JSON
  }
  // BORRAR IDIOMA -- PETICION POST
  const DeleteIdiom = async (idioma) => {
    const bodyParameters = {
      'idioma': idioma
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParameters)
    }
  
    const response = await fetch("/deleteIdioms", options); // Hacer una solicitud HTTP POST a '/addNote' con los datos de la nueva nota
    const jsonResponse = await response.json(); // Convertir la respuesta a JSON
    console.log(JSON.stringify(jsonResponse)); // Imprimir la respuesta JSON en la consola
    return jsonResponse; // Devolver la respuesta JSON
  }

  // Renderizado del componente
  return (
    <div className="idioms-container">
      <h1>Insertar nuevo idioma:</h1>
      <form className="idiom-form">
        <div>
          <label htmlFor="title-input">Idioma:</label>
          <input type="text" value={idioma} id="title-input" onChange={HandleIdiomChange} />
        </div>
        <button type="button" onClick={ButtonClickAdd}>Insertar</button>
      </form>

      <h1>Borrar nuevo idioma:</h1>
      <form className="idiom-form">
        <div>
          <label htmlFor="id-input">ID Idioma:</label>
          <input type="text" value={ididioma} id="id-input" onChange={HandleIdIdiomsChange} />
        </div>
        <button type="button" onClick={ButtonClickDelete}>Borrar</button>
      </form>

      <ul className="idiom-list">
        <h2>Idiomas actuales</h2>
        {data.map(item => (
          <li key={item.id}>
            <h3>{item.ididioma}</h3>
            <p>{item.idioma}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddIdiomComponent;