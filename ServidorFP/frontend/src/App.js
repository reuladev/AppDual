import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header'; // Importa el componente Header
import Home from "./components/Home";
import Footer from "./components/Footer";

import Idioms from "./components/Idioms";
import Preferences from "./components/Preferences";

import StudentEdit from "./components/StudentEdit";
import GetStudent from "./components/GetStudent";
import SearchStudent from "./components/SearchStudent";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import GetAllStudents from "./components/GetAllStudents";

import GetCandidate from "./components/GetCandidate";
import SearchCandidate from "./components/SearchCandidate";
import AddCandidate from "./components/AddCandidate";
import GetAllCandidates from "./components/GetAllCandidates";
import UpdateCandidate from "./components/UpdateCandidate";
import CandidateEdit from "./components/CandidateEdit";



import './styles.css'; // Importa el archivo de estilos CSS global

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header/><Home/><Footer/></>} /> 
          <Route path="/home" element={<><Header/><Home/><Footer/></>} /> 
          <Route path="/idioms" element={<><Header/><Idioms/><Footer/></>} /> 
          <Route path="/preferences" element={<><Header/><Preferences/><Footer/></>} /> 
          <Route path="/addStudent" element={<><Header/><AddStudent/><Footer/></>} />
          <Route path="/getAllStudents" element={<><Header/><GetAllStudents/><Footer/></>} />
          <Route path="/updateStudent" element={<><Header/><UpdateStudent/><Footer/></>} />
          <Route path="/getAllCandidates" element={<><Header/><GetAllCandidates/><Footer/></>} />
          <Route path="/addCandidate" element={<><Header/><AddCandidate/><Footer/></>} />
          <Route path="/updateCandidate" element={<><Header/><UpdateCandidate/><Footer/></>} />
          <Route path="/searchStudent" element={<><Header/><SearchStudent/><Footer/></>} />
          <Route path="/searchCandidate" element={<><Header/><SearchCandidate/><Footer/></>} />
          <Route path="/getCandidate" element={<><Header/><GetCandidate/><Footer/></>} />
          <Route path="/candidateEdit" element={<><Header/><CandidateEdit/><Footer/></>} />
          <Route path="/getStudent" element={<><Header/><GetStudent/><Footer/></>} />
          <Route path="/getCandidate" element={<><Header/><GetCandidate/><Footer/></>} />
          <Route path="/studentEdit" element={<><Header/><StudentEdit/><Footer/></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;