import React from 'react';
import '../styles.css';

function Home() {
  return (
    <div className="main">
      <section>
        <h2>Bienvenido a la Gestión de Prácticas en Empresas</h2>
        <p>Aquí podrás gestionar los alumnos, empresas, candidatos y más</p>
      </section>
      <div className="extra-div">
        <img src="https://www.infoans.org/media/k2/items/cache/cede0ba71aecffc4bf12705409fd9c4c_XL.jpg" alt="Imagen Logo Salesianos" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    </div>
  );
}

export default Home;