import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"
import { useNavigate } from "react-router-dom"
import "./Employees.css"

function Employees() {

    const [employees, setEmployees] = useState<Employee[]>([])
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees))
        }
    }, [])

    function handleDelete(index: number) {
        setEmployeeToDelete(index)
    }

    function confirmDelete() {

        if (employeeToDelete === null) return

        const updatedEmployees = employees.filter(
            (_, index) => index !== employeeToDelete
        )

        setEmployees(updatedEmployees)

        localStorage.setItem(
            "employees",
            JSON.stringify(updatedEmployees)
        )

        showToast("Funcionário excluído com sucesso!", "success")

        setEmployeeToDelete(null)
    }

    function showToast(message: string, type: "success" | "error") {

        const toast = document.createElement("div")

        toast.className = `toast ${type}`

        toast.innerText = message

        document.body.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 3000)
    }

    return (

        <div>

            <div className="page-top">
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Voltar para Home
                </button>
            </div>

            <div className="container">



                {/* HEADER */}

                <div className="employees-header">

                    <h2 className="employees-title">

                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>

                        Funcionários Cadastrados

                    </h2>

                    <p className="employees-subtitle">
                        {employees.length} funcionário(s) no total
                    </p>

                </div>

                {/* CONTEÚDO */}

                <div className="employees-content">

                    {employees.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                👥
                            </div>

                            <h3>Nenhum funcionário cadastrado</h3>

                            <p>
                                Comece cadastrando o primeiro funcionário da equipe
                            </p>

                            <button
                                className="primary-button"
                                onClick={() => navigate("/novo-funcionario")}
                            >
                                + Cadastrar Funcionário
                            </button>

                        </div>

                    ) : (

                        <ul className="employees-list">

                            {employees.map((employee, index) => {

                                const initial = employee.name.charAt(0).toUpperCase()

                                const dataCadastro =
                                    new Date().toLocaleDateString("pt-BR")

                                return (

                                    <li key={index} className="employee-card">

                                        <div className="card-header">

                                            <div className="avatar">
                                                {initial}
                                            </div>

                                            <button
                                                className="delete-icon"
                                                onClick={() => handleDelete(index)}
                                                aria-label="Excluir funcionário"
                                            >
                                                <svg
                                                    className="trash-icon"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 
                0116.138 21H7.862a2 2 0 
                01-1.995-1.858L5 7m5 
                4v6m4-6v6m1-10V4a1 
                1 0 00-1-1h-4a1 1 
                0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>

                                        </div>

                                        <div className="card-body">

                                            <h3>{employee.name}</h3>

                                            <p className="role">
                                                {employee.role}
                                            </p>

                                            <p>{employee.email}</p>

                                            <p>{employee.cpf}</p>

                                            <p>
                                                {employee.city} - {employee.state}
                                            </p>

                                            <hr />

                                            <span className="date">
                                                Cadastrado em {dataCadastro}
                                            </span>

                                        </div>

                                    </li>

                                )

                            })}

                        </ul>

                    )}

                </div>

            </div>

            {/* MODAL */}

            {employeeToDelete !== null && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-icon">
                            <svg
                                className="modal-trash-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 
                0116.138 21H7.862a2 2 0 
                01-1.995-1.858L5 7m5 
                4v6m4-6v6m1-10V4a1 
                1 0 00-1-1h-4a1 1 
                0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>

                        <h3>Confirmar Exclusão</h3>

                        <p>
                            Tem certeza que deseja excluir este funcionário?
                            Esta ação não pode ser desfeita.
                        </p>

                        <div className="modal-actions">

                            <button
                                className="cancel-button"
                                onClick={() => setEmployeeToDelete(null)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="delete-confirm"
                                onClick={confirmDelete}
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )
}

export default Employees