import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Header() {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div>
      <header>
        <Link to="/" className="title-link">
          <h1>
            <img src="https://salesianosrioja.com/wp-content/uploads/2016/03/Logo-Salesianos_vertical.png" alt="Logo" style={{ width: '80px', height: '50px', marginRight: '20px', marginTop: '20px'}} />
            GESTOR DE FP
          </h1>
        </Link>
      </header>
      <div className="body">
        <div className="container">
          <div className="button-container">
            <div className="button"><Link to="/home" className="subOption">HOME</Link></div>
            <div className="button" onClick={toggleSubmenu}>
              ALUMNOS
              {submenuOpen && (
                <div className="submenu">
                  <div><Link to="/addStudent" className="subOption">Añadir nuevo alumno</Link></div>
                  <div><Link to="/updateStudent" className="subOption">Administrar Alumnos</Link></div>
                  <div><Link to="/searchStudent" className="subOption">Mostrar Alumnos</Link></div>
                </div>
              )}
            </div>
            <div className="button" onClick={toggleSubmenu}>
              EMPRESAS
              {submenuOpen && (
                <div className="submenu">
                  <div><Link to="/" className="subOption">Añadir nueva empresa</Link></div>
                  <div><Link to="/" className="subOption">Administrar Alumnos</Link></div>
                  <div><Link to="/" className="subOption">Mostrar Empresas</Link></div>
                </div>
              )}
            </div>
            <div className="button" onClick={toggleSubmenu}>
              GESTIÓN DE CANDIDATOS
              {submenuOpen && (
                <div className="submenu">
                  <div><Link to="/addCandidate" className="subOption">Añadir nuevo candidato</Link></div>
                  <div><Link to="/updateCandidate" className="subOption">Administrar Candidatos</Link></div>
                  <div><Link to="/searchCandidate" className="subOption">Mostrar candidatos</Link></div>
                </div>
              )}
            </div>
            <div className="button"><Link to="/idioms" className="subOption">IDIOMAS</Link></div>
            <div className="button"><Link to="/preferences" className="subOption">PREFERENCIAS</Link></div>
            <div className="button"><Link to="" className="subOption">CONTACTOS</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;