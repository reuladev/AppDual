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
  // BUTTON ACTUALIZAR IDIOMA 
  function ButtonClickUpdate(){
    UpdateIdiom(ididioma,idioma); // Llamar a la función AddNewRecord con el nombre y texto
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
  const DeleteIdiom = async (ididioma) => {
    const bodyParameters = {
      'ididioma': ididioma
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
  // ACTUALIZAR IDIOMA -- PETICION POST
  const UpdateIdiom = async (ididioma,idioma) => {
    const bodyParameters = {
      'ididioma':ididioma,
      'idioma': idioma
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParameters)
    }
  
    const response = await fetch("/updateIdioms", options); // Hacer una solicitud HTTP POST a '/addNote' con los datos de la nueva nota
    const jsonResponse = await response.json(); // Convertir la respuesta a JSON
    console.log(JSON.stringify(jsonResponse)); // Imprimir la respuesta JSON en la consola
    return jsonResponse; // Devolver la respuesta JSON
  }

  // Renderizado del componente
  return (
    <div>
      <h1>Insertar nuevo idioma:</h1>
      <form>
          <div>
              <label htmlFor="title-input">Idioma:</label>
              <input type="text" value={idioma} id="title-input" onChange={HandleIdiomChange} /> {/* Entrada de texto para el nombre de la nueva nota */}
          </div>
          <button type="button" onClick={ButtonClickAdd}>Insert</button> {/* Botón para insertar la nueva nota */}
      </form>
      <h1>Borrar nuevo idioma:</h1>
      <form>
          <div>
              <label htmlFor="title-input">IdIdioma:</label>
              <input type="text" value={ididioma} id="title-input" onChange={HandleIdIdiomsChange} /> {/* Entrada de texto para el nombre de la nueva nota */}
          </div>
          <button type="button" onClick={ButtonClickDelete}>Insert</button> {/* Botón para insertar la nueva nota */}
      </form>
      <h1>Actualizar nuevo idioma:</h1>
      <form>
          <div>
              <label htmlFor="title-input">IdIdioma:</label>
              <input type="text" value={ididioma} id="title-input" onChange={HandleIdIdiomsChange} /> {/* Entrada de texto para el nombre de la nueva nota */}
          </div>
          <div>
              <label htmlFor="author-input">Idioma:</label>
              <input type="text" value={idioma} id="author-input" onChange={HandleIdiomChange} /> {/* Entrada de texto para el contenido de la nueva nota */}
          </div>
          <button type="button" onClick={ButtonClickUpdate}>Insert</button> {/* Botón para insertar la nueva nota */}
      </form>
      {/* Bucle for */}
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.ididioma}</h2> {/* Renderizado del nombre de la nota */}
          <p>{item.idioma}</p> {/* Renderizado del contenido de la nota */}
        </div>
      ))}
    </div>
  );
}

export default AddIdiomComponent;