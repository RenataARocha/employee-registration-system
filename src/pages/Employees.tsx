/**
 * Página de listagem de funcionários cadastrados.
 *
 * Responsabilidades:
 * - Exibir todos os funcionários salvos no localStorage
 * - Permitir busca/filtro por nome, cargo, CPF ou cidade
 * - Permitir a edição de um funcionário via modal
 * - Permitir a exclusão de um funcionário com confirmação via modal
 * - Exibir paginação quando houver mais de 6 funcionários
 * - Exibir um empty state quando não houver cadastros
 * - Mostrar um toast de feedback após exclusão ou edição
 */

import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"
import { useNavigate } from "react-router-dom"
import { getTimeOnCompany } from "../utils/timeOnCompany"
import EmployeeForm from "../components/EmployeeForm"
import "./Employees.css"

const ITEMS_PER_PAGE = 6

function Employees() {

    const [employees, setEmployees] = useState<Employee[]>([])
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null)
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        loadEmployees()
    }, [])

    function loadEmployees() {
        const storedEmployees = localStorage.getItem("employees")
        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees))
        }
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    const filteredEmployees = employees.filter(emp => {
        const query = search.toLowerCase()
        return (
            emp.name.toLowerCase().includes(query) ||
            emp.role.toLowerCase().includes(query) ||
            emp.cpf.includes(query) ||
            emp.city.toLowerCase().includes(query)
        )
    })

    const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    function handleDelete(index: number) {
        const employee = paginatedEmployees[index]
        const realIndex = employees.indexOf(employee)
        setEmployeeToDelete(realIndex)
    }

    function confirmDelete() {
        if (employeeToDelete === null) return
        const updatedEmployees = employees.filter((_, i) => i !== employeeToDelete)
        setEmployees(updatedEmployees)
        localStorage.setItem("employees", JSON.stringify(updatedEmployees))
        showToast("Funcionário excluído com sucesso!", "error")
        setEmployeeToDelete(null)
    }

    function showToast(message: string, type: "success" | "error") {
        const toast = document.createElement("div")
        toast.className = `toast ${type}`
        toast.innerText = message
        document.body.appendChild(toast)
        setTimeout(() => { toast.remove() }, 3000)
    }

    return (
        <div>

            <div className="page-top">
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Voltar para Home
                </button>
                <button className="new-button" onClick={() => navigate("/novo-funcionario")}>
                    + Novo Cadastro
                </button>
            </div>

            <div className="container">

                {/* ===== HEADER ===== */}
                <div className="employees-header">
                    <h2 className="employees-title">
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Funcionários Cadastrados
                    </h2>
                    <p className="employees-subtitle">
                        {employees.length} funcionário(s) no total
                    </p>
                </div>

                {/* ===== BUSCA — fora do scroll, entre o header e os cards ===== */}
                {employees.length > 0 && (
                    <div className="search-wrapper">
                        <div className="search-container">
                            <input
                                type="search"
                                className="search-input"
                                placeholder="Buscar por nome, cargo, CPF ou cidade..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Buscar funcionários"
                            />
                            {search && (
                                <span className="search-results">
                                    {filteredEmployees.length} resultado{filteredEmployees.length !== 1 ? "s" : ""} encontrado{filteredEmployees.length !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* ===== CARDS — área com scroll ===== */}
                <div className="employees-content">

                    {employees.length === 0 ? (

                        <div className="empty-state">
                            <div className="empty-icon">👥</div>
                            <h3>Nenhum funcionário cadastrado</h3>
                            <p>Comece cadastrando o primeiro funcionário da equipe</p>
                            <button className="primary-button" onClick={() => navigate("/novo-funcionario")}>
                                + Cadastrar Funcionário
                            </button>
                        </div>

                    ) : filteredEmployees.length === 0 ? (

                        <div className="empty-state">
                            <div className="empty-icon">🔍</div>
                            <h3>Nenhum resultado encontrado</h3>
                            <p>Nenhum funcionário corresponde a "<strong>{search}</strong>"</p>
                            <button className="cancel-button" onClick={() => setSearch("")}>
                                Limpar busca
                            </button>
                        </div>

                    ) : (

                        <ul className="employees-list">
                            {paginatedEmployees.map((employee, index) => {
                                const initial = employee.name.charAt(0).toUpperCase()
                                return (
                                    <li key={index} className="employee-card">

                                        <div className="card-header">
                                            <div className="avatar">{initial}</div>
                                            <div className="card-actions">
                                                <button
                                                    className="edit-icon"
                                                    onClick={() => setEmployeeToEdit(employee)}
                                                    aria-label={`Editar ${employee.name}`}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="delete-icon"
                                                    onClick={() => handleDelete(index)}
                                                    aria-label={`Excluir ${employee.name}`}
                                                >
                                                    <svg className="trash-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <h3>{employee.name}</h3>
                                            <p className="role">{employee.role}</p>
                                            <p>{employee.email}</p>
                                            <p>{employee.cpf}</p>
                                            <p>{employee.city} - {employee.state}</p>
                                            {employee.admissionDate && (
                                                <p className="employee-tenure">
                                                    🗓️ {getTimeOnCompany(employee.admissionDate)}
                                                </p>
                                            )}
                                            <hr />
                                            <span className="date">
                                                {employee.admissionDate
                                                    ? `Admitido em ${new Date(employee.admissionDate + "T12:00:00").toLocaleDateString("pt-BR")}`
                                                    : `Cadastrado em ${new Date().toLocaleDateString("pt-BR")}`
                                                }
                                            </span>
                                        </div>

                                    </li>
                                )
                            })}
                        </ul>

                    )}

                </div>

                {/* ===== PAGINAÇÃO ===== */}
                {totalPages > 1 && (
                    <nav className="pagination" aria-label="Paginação">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            aria-label="Página anterior"
                        >
                            ← Anterior
                        </button>
                        <div className="pagination-pages">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    className={`pagination-page ${page === currentPage ? "active" : ""}`}
                                    onClick={() => setCurrentPage(page)}
                                    aria-label={`Ir para página ${page}`}
                                    aria-current={page === currentPage ? "page" : undefined}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            aria-label="Próxima página"
                        >
                            Próxima →
                        </button>
                    </nav>
                )}

            </div>

            {/* ===== MODAL DE EXCLUSÃO ===== */}
            {employeeToDelete !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-icon">
                            <svg className="modal-trash-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3>Confirmar Exclusão</h3>
                        <p>Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.</p>
                        <div className="modal-actions">
                            <button className="cancel-button" onClick={() => setEmployeeToDelete(null)}>Cancelar</button>
                            <button className="delete-confirm" onClick={confirmDelete}>Excluir</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL DE EDIÇÃO ===== */}
            {employeeToEdit !== null && (
                <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Editar funcionário">
                    <div className="modal-edit">
                        <button
                            className="modal-close"
                            onClick={() => setEmployeeToEdit(null)}
                            aria-label="Fechar edição"
                        >
                            ✕
                        </button>
                        <EmployeeForm
                            initialData={employeeToEdit}
                            onSuccess={() => {
                                setEmployeeToEdit(null)
                                loadEmployees()
                                showToast("Funcionário atualizado com sucesso!", "success")
                            }}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Employees