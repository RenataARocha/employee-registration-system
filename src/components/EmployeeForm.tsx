import InputField from "./InputField"
import { validateEmail } from "../utils/validateEmail"
import { validateCPF } from "../utils/validateCPF"
import { useState } from "react"
import { fetchAddressByCep } from "../services/viaCepService"
import { useNavigate } from "react-router-dom"
import type { Employee } from "../types/employee"


function EmployeeForm() {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        cpf: "",
        email: "",
        role: "",
        cep: "",
        street: "",
        city: "",
        state: "",
        number: "",
        complemento: "",
        bairro: ""
    })

    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        setIsSubmitting(true)

        if (!validateEmail(formData.email)) {
            alert("Email inválido")
            setIsSubmitting(false)
            return
        }

        if (!validateCPF(formData.cpf)) {
            alert("CPF inválido")
            setIsSubmitting(false)
            return
        }

        const newEmployee: Employee = { ...formData }

        const storedEmployees = localStorage.getItem("employees")

        const employees: Employee[] = storedEmployees
            ? JSON.parse(storedEmployees)
            : []

        employees.push(newEmployee)

        localStorage.setItem("employees", JSON.stringify(employees))

        setTimeout(() => {
            navigate("/funcionarios")
        }, 800)
    }


    async function handleCepBlur() {
        try {
            const address = await fetchAddressByCep(formData.cep)

            setFormData(prev => ({
                ...prev,
                street: address.logradouro,
                city: address.localidade,
                state: address.uf
            }))
        } catch (error) {
            alert("Erro ao buscar CEP")
        }
    }



    return (
        <div>
            <button type="button" onClick={() => navigate("/")}>
                ← Voltar
            </button>
            <h1>Cadastro de funcionários</h1>

            <div className="section-title">
                <svg
                    className="section-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                Informações Pessoais
            </div>

            <section className="container">
                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Nome Completo"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite o nome completo do funcionário"
                    />

                    <InputField
                        label="CPF"
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="000.000.000-00"
                    />

                    <InputField
                        label="E-mail"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="exemplo@empresa.com.br"
                    />

                    <InputField
                        label="Cargo"
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Digite o cargo"
                    />

                    <hr />


                    <div className="section-title">
                        <svg
                            className="section-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Endereço
                    </div>


                    <InputField
                        label="CEP"
                        type="text"
                        name="cep"
                        id="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        placeholder="00000-000"
                    />
                    <p>Digite o CEP para buscar o endereço automaticamente</p>

                    <InputField
                        label="Rua"
                        type="text"
                        name="street"
                        id="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Nome da rua"
                    />

                    <InputField
                        label="Número"
                        type="number"
                        name="number"
                        id="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="N°"
                    />

                    <InputField
                        label="Complemento"
                        type="text"
                        name="complemento"
                        id="complemento"
                        value={formData.complemento}
                        onChange={handleChange}
                        placeholder="Apto, Bloco, etc."
                    />

                    <InputField
                        label="Bairro"
                        type="text"
                        name="bairro"
                        id="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        placeholder="Nome do bairro"
                    />

                    <InputField
                        label="Cidade"
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Nome da cidade"
                    />

                    <InputField
                        label="Estado"
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="UF"
                    />

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {!isSubmitting ? (
                            <>
                                <svg
                                    className="button-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Cadastrar Funcionário
                            </>
                        ) : (
                            <>
                                <span>Salvando...</span>
                                <span className="spinner"></span>
                            </>
                        )}
                    </button>

                </form>
            </section>
        </div>
    )
}

export default EmployeeForm;