import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import EmployeeForm from "./components/EmployeeForm"
import Employees from "./pages/Employees"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo-funcionario" element={<EmployeeForm />} />
        <Route path="/funcionarios" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App