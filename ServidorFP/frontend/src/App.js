import { BrowserRouter, Route, Routes } from "react-router-dom";
import Idioms from "./components/Idioms";
import AddStudent from "./components/AddStudent";
import GetAllStudents from "./components/GetAllStudents";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/idioms" element={<Idioms/>} />
          <Route path="/addStudent" element={<AddStudent/>} />
          <Route path="/getAllStudents" element={<GetAllStudents/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;