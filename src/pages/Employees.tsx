/**
 * Página de listagem de funcionários cadastrados.
 *
 * Responsabilidades:
 * - Exibir todos os funcionários salvos no localStorage
 * - Permitir a exclusão de um funcionário com confirmação via modal
 * - Exibir um empty state quando não houver cadastros
 * - Mostrar um toast de feedback após a exclusão
 */

import { useEffect, useState } from "react"
import type { Employee } from "../types/employee"
import { useNavigate } from "react-router-dom"
import "./Employees.css"

function Employees() {

    // Lista de funcionários exibida na página
    const [employees, setEmployees] = useState<Employee[]>([])

    // Índice do funcionário selecionado para exclusão — null quando nenhum modal está aberto
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null)

    const navigate = useNavigate()

    // Carrega os funcionários do localStorage ao montar o componente.
    // O array vazio [] garante execução única, equivalente ao componentDidMount.
    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees))
        }
    }, [])

    // Abre o modal de confirmação armazenando o índice do funcionário alvo
    function handleDelete(index: number) {
        setEmployeeToDelete(index)
    }

    // Executada ao confirmar a exclusão no modal:
    // remove o funcionário do estado e atualiza o localStorage
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

        // Cor vermelha (error) pois é uma ação destrutiva — exclusão de dado
        showToast("Funcionário excluído com sucesso!", "error")

        // Fecha o modal após a exclusão
        setEmployeeToDelete(null)
    }

    // Cria e injeta um elemento de toast no DOM com remoção automática após 3 segundos.
    // Não usa estado React para evitar re-renders desnecessários na listagem.
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

            {/* Barra superior com botão de voltar e botão de novo cadastro */}
            <div className="page-top">
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Voltar para Home
                </button>

                {/* Atalho para cadastrar novo funcionário sem precisar voltar à Home */}
                <button
                    className="new-button"
                    onClick={() => navigate("/novo-funcionario")}
                >
                    + Novo Cadastro
                </button>
            </div>

            <div className="container">

                {/* ===== HEADER — título e contagem total de funcionários ===== */}

                <div className="employees-header">

                    <h2 className="employees-title">

                        {/* Ícone decorativo — aria-hidden oculta do leitor de tela */}
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>

                        Funcionários Cadastrados

                    </h2>

                    {/* Contagem dinâmica atualizada conforme o estado */}
                    <p className="employees-subtitle">
                        {employees.length} funcionário(s) no total
                    </p>

                </div>

                {/* ===== CONTEÚDO — empty state ou lista de cards ===== */}

                <div className="employees-content">

                    {/* Renderização condicional: sem funcionários exibe empty state */}
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

                                // Primeira letra do nome usada como avatar
                                const initial = employee.name.charAt(0).toUpperCase()

                                // Data de exibição no rodapé do card
                                const dataCadastro =
                                    new Date().toLocaleDateString("pt-BR")

                                return (

                                    <li key={index} className="employee-card">

                                        {/* Topo do card: avatar + botão de exclusão */}
                                        <div className="card-header">

                                            {/* Círculo com a inicial do funcionário */}
                                            <div className="avatar">
                                                {initial}
                                            </div>

                                            {/* Botão que abre o modal de confirmação */}
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
                                                    aria-hidden="true"
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

                                        {/* Corpo do card: dados do funcionário */}
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

                                            {/* Data formatada no padrão brasileiro */}
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

            {/* ===== MODAL DE CONFIRMAÇÃO DE EXCLUSÃO =====
                Renderizado apenas quando employeeToDelete não é null */}

            {employeeToDelete !== null && (

                <div className="modal-overlay">

                    <div className="modal">

                        {/* Ícone de lixeira no topo do modal */}
                        <div className="modal-icon">
                            <svg
                                className="modal-trash-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
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

                            {/* Cancelar fecha o modal sem excluir */}
                            <button
                                className="cancel-button"
                                onClick={() => setEmployeeToDelete(null)}
                            >
                                Cancelar
                            </button>

                            {/* Confirmar chama confirmDelete e fecha o modal */}
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