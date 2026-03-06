/**
 * Componente raiz da aplicação.
 *
 * Configura o roteamento com React Router e define as três rotas do sistema:
 * - "/"                  → Página inicial (Home)
 * - "/novo-funcionario"  → Formulário de cadastro (EmployeeForm)
 * - "/funcionarios"      → Listagem de funcionários (Employees)
 */

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