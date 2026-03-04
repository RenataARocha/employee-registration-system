import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"
import { useNavigate } from "react-router-dom"


function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees))
        }
    }, [])


    function handleDelete(indexToDelete: number) {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir este funcionário?"
        )

        if (!confirmDelete) return

        const updatedEmployees = employees.filter(
            (_, index) => index !== indexToDelete
        )

        setEmployees(updatedEmployees)
        localStorage.setItem("employees", JSON.stringify(updatedEmployees))
    }

    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate("/")}>
                ← Voltar para Home
            </button>

            <h1>Funcionários Cadastrados</h1>

            {employees.length === 0 ? (
                <p>Nenhum funcionário cadastrado.</p>
            ) : (
                <ul>
                    {employees.map((employee, index) => (
                        <li key={index}>
                            <strong>{employee.name}</strong> — {employee.role} — {employee.city}

                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleDelete(index)}
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Employees