import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import EmployeeForm from "./components/EmployeeForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo-funcionario" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App