import React, { useState, useEffect } from 'react';

function AddPreferenceComponent() {
  // Definición de estados utilizando el hook useState
  const [data, setData] = useState([]); // Estado para almacenar datos obtenidos del servidor
  const [preference, setPreference] = useState(""); // Estado para el texto de la nueva nota
  // Refresca los cambios de mi tabla preferencias
  useEffect(() => {
    GetAllPreferences(); // Llamada a la función GetAllPreferences
  }, []);

  // PETICION GET -- MOSTRAR PREFERENCIA
  function GetAllPreferences() {
    fetch('/getAllPreferences') // Hacer una solicitud HTTP GET a '/getAllPreferences'
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => {
        console.log("Datos obtenidos:", data); // Con esto verifico que el array Data recoge bien los datos de mi BBDD.
        setData(data); // Establecer los datos obtenidos en el estado 'data'
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error); // Manejar cualquier error que ocurra durante la solicitud
      });
  }

  // FUNCION SET PREFERENCIA
  function HandlePreferenceChange(event){
    setPreference(event.target.value); // Establecer el nuevo valor del estado 'idioma'
  }
  // BUTTON INSERTAR NUEVA PREFERENCIA
  function ButtonClickAdd(){
    AddNewPreference(preference); // Llamar a la función AddNewIidom con el idioma.
    GetAllPreferences(); // Actualizar la lista de idiomas después de agregar una nueva
  }
  // BUTTON BORRAR IDIOMA PREFERENCIA
  function ButtonClickDelete(){
    DeletePreference(preference); // Llamar a la función AddNewRecord con el nombre y texto
    GetAllPreferences(); // Actualizar la lista de notas después de agregar una nueva
  }

  // BUTTON NUEVA PREFERENCIA -- PETICION POST
  // Nota: Aunque en preferencesServicel.js este en castellano, tu aqui ponlo todo en ingles
  const AddNewPreference = async (preference) => {
    const bodyParameters = {
      'preference': preference
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParameters)
    }
  
    const response = await fetch("/addPreferences", options); // Hacer una solicitud HTTP POST a '/addNote' con los datos de la nueva nota
    const jsonResponse = await response.json(); // Convertir la respuesta a JSON
    console.log(JSON.stringify(jsonResponse)); // Imprimir la respuesta JSON en la consola
    return jsonResponse; // Devolver la respuesta JSON
  }
  // BORRAR PREFERENCIA -- PETICION POST
  const DeletePreference = async (preference) => {
    const bodyParameters = {
      'preference': preference
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyParameters)
    }
  
    const response = await fetch("/deletePreferences", options); // Hacer una solicitud HTTP POST a '/addNote' con los datos de la nueva nota
    const jsonResponse = await response.json(); // Convertir la respuesta a JSON
    console.log(JSON.stringify(jsonResponse)); // Imprimir la respuesta JSON en la consola
    return jsonResponse; // Devolver la respuesta JSON
  }

  // Renderizado del componente
  return (
    <div className="preferences-container">
      <h1>Insert New Preference:</h1>
      <form className="preference-form">
          <div>
              <label htmlFor="preference-input">Preference:</label>
              <input type="text" value={preference} id="preference-input" onChange={HandlePreferenceChange} />
          </div>
          <button type="button" onClick={ButtonClickAdd}>Insert</button>
      </form>
      <h1>Delete Preference:</h1>
      <form className="preference-form">
          <div>
              <label htmlFor="preference-input">Preference:</label>
              <input type="text" value={preference} id="preference-input" onChange={HandlePreferenceChange} />
          </div>
          <button type="button" onClick={ButtonClickDelete}>Delete</button>
      </form>
      <ul className="preference-list">
        {data.map(item => (
          <li key={item.id}>
            <h2>{item.idpreferencia}</h2>
            <p>{item.preferencia}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPreferenceComponent;