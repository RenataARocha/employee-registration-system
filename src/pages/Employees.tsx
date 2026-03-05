import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"
import { useNavigate } from "react-router-dom"
import "./Employees.css"

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
            <div className="page-top">
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Voltar para Home
                </button>
            </div>

            <div className="container">


                {/* Header */}
                <div className="employees-header">
                    <h2 className="employees-title">
                        <svg
                            className="icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Funcionários Cadastrados
                    </h2>

                    <p className="employees-subtitle">
                        {employees.length} funcionário(s) no total
                    </p>
                </div>

                {/* Conteúdo */}
                <div className="employees-content">
                    {employees.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <svg
                                    className="empty-svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>

                            <h3>Nenhum funcionário cadastrado</h3>
                            <p>Comece cadastrando o primeiro funcionário da equipe</p>

                            <button
                                className="primary-button"
                                onClick={() => navigate("/novo-funcionario")}
                            >
                                + Cadastrar Funcionário
                            </button>
                        </div>
                    ) : (
                        <ul className="employees-list">
                            {employees.map((employee, index) => (
                                <li key={index} className="employee-card">
                                    <div>
                                        <strong>{employee.name}</strong>
                                        <span>{employee.role}</span>
                                        <span>{employee.city}</span>
                                    </div>

                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Excluir
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Employees