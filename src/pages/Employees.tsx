import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"

function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees))
        }
    }, [])

    return (
        <div>
            <h1>Funcionários Cadastrados</h1>

            {employees.length === 0 ? (
                <p>Nenhum funcionário cadastrado.</p>
            ) : (
                <ul>
                    {employees.map((employee, index) => (
                        <li key={index}>
                            <strong>{employee.name}</strong> — {employee.role} — {employee.city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Employees