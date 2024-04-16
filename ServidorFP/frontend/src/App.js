import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddIdiom from "./components/AddIdiom";
import AddStudent from "./components/AddStudent";
import GetAllStudents from "./components/GetAllStudents";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/addIdiom" element={<AddIdiom/>} />
          <Route path="/addStudent" element={<AddStudent/>} />
          <Route path="/getAllStudents" element={<GetAllStudents/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;