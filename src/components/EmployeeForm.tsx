/**
 * Formulário de cadastro e edição de funcionário.
 *
 * Responsabilidades:
 * - Coletar e validar os dados pessoais e de endereço do funcionário
 * - Buscar endereço automaticamente via API ViaCEP ao informar o CEP
 *   (tanto via digitação manual quanto via autocomplete do browser)
 * - Criar novo funcionário no localStorage (modo padrão)
 * - Atualizar funcionário existente no localStorage (modo edição via initialData)
 * - Exibir feedback visual (toast) para sucesso e erros
 * - Redirecionar para a lista após cadastro, ou chamar onSuccess após edição
 */

import InputField from "./InputField"
import { validateEmail } from "../utils/validateEmail"
import { validateCPF } from "../utils/validateCPF"
import { maskCPF, maskCEP } from "../utils/masks"
import { useState } from "react"
import { fetchAddressByCep } from "../services/viaCepService"
import { useNavigate } from "react-router-dom"
import type { Employee } from "../types/employee"
import "./EmployeeForm.css"

type FormData = {
    name: string
    cpf: string
    email: string
    role: string
    admissionDate: string
    cep: string
    street: string
    city: string
    state: string
    number: string
    complemento: string
    bairro: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

type EmployeeFormProps = {
    initialData?: Employee
    onSuccess?: () => void
}

function EmployeeForm({ initialData, onSuccess }: EmployeeFormProps) {

    const isEditing = !!initialData

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isFetchingCep, setIsFetchingCep] = useState(false)

    const [formData, setFormData] = useState<FormData>({
        name: initialData?.name ?? "",
        cpf: initialData?.cpf ?? "",
        email: initialData?.email ?? "",
        role: initialData?.role ?? "",
        admissionDate: initialData?.admissionDate ?? "",
        cep: initialData?.cep ?? "",
        street: initialData?.street ?? "",
        city: initialData?.city ?? "",
        state: initialData?.state ?? "",
        number: initialData?.number ?? "",
        complemento: initialData?.complemento ?? "",
        bairro: initialData?.bairro ?? ""
    })

    const navigate = useNavigate()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        let maskedValue = value
        if (name === "cpf") maskedValue = maskCPF(value)
        if (name === "cep") maskedValue = maskCEP(value)

        setFormData(prev => ({ ...prev, [name]: maskedValue }))

        const fieldName = name as keyof FormData
        const errorMessage = validateField(fieldName, maskedValue)
        setErrors(prev => ({ ...prev, [fieldName]: errorMessage }))

        // Dispara ViaCEP ao atingir o CEP completo (9 chars com máscara: "00000-000")
        // Cobre tanto digitação manual quanto autocomplete do browser
        if (name === "cep" && maskedValue.length === 9) {
            fetchCepAddress(maskedValue)
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target
        const fieldName = name as keyof FormData
        const errorMessage = validateField(fieldName, value)
        setErrors(prev => ({ ...prev, [fieldName]: errorMessage }))
    }

    function showToast(message: string, type: "success" | "error") {
        const toast = document.createElement("div")
        toast.className = `toast ${type}`
        toast.innerText = message
        document.body.appendChild(toast)
        setTimeout(() => { toast.remove() }, 3000)
    }

    function validateField(name: keyof FormData, value: string): string | undefined {
        switch (name) {
            case "name":
                if (!value.trim()) return "O nome é obrigatório"
                break
            case "cpf":
                if (!validateCPF(value)) return "CPF inválido"
                break
            case "email":
                if (!validateEmail(value)) return "Email inválido"
                break
            case "role":
                if (!value.trim()) return "Selecione um cargo"
                break
            case "admissionDate":
                if (!value) return "A data de admissão é obrigatória"
                if (new Date(value) > new Date()) return "A data não pode ser futura"
                break
            // ✅ CORRIGIDO: validação do CEP que estava faltando
            case "cep":
                if (!value.trim()) return "O CEP é obrigatório"
                if (value.replace(/\D/g, "").length !== 8) return "CEP inválido"
                break
            case "street":
                if (!value.trim()) return "A rua é obrigatória"
                break
            case "number":
                if (!value.trim()) return "O número é obrigatório"
                break
            case "bairro":
                if (!value.trim()) return "O bairro é obrigatório"
                break
            case "city":
                if (!value.trim()) return "A cidade é obrigatória"
                break
            case "state":
                if (!value.trim()) return "Selecione um estado"
                break
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const newErrors: FormErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            const fieldName = key as keyof FormData
            const errorMessage = validateField(fieldName, value)
            if (errorMessage) newErrors[fieldName] = errorMessage
        })

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            showToast("Por favor, corrija os erros no formulário", "error")
            return
        }

        setIsSubmitting(true)

        const storedEmployees = localStorage.getItem("employees")
        const employees: Employee[] = storedEmployees ? JSON.parse(storedEmployees) : []

        if (isEditing && initialData) {
            const updatedEmployees = employees.map(emp =>
                emp.cpf === initialData.cpf ? { ...emp, ...formData } : emp
            )
            localStorage.setItem("employees", JSON.stringify(updatedEmployees))
            setIsSubmitting(false)
            onSuccess?.()
        } else {
            const newEmployee: Employee = { ...formData }
            employees.push(newEmployee)
            localStorage.setItem("employees", JSON.stringify(employees))
            showToast("Funcionário cadastrado com sucesso!", "success")
            setTimeout(() => { navigate("/funcionarios") }, 1200)
        }
    }

    // Função de busca CEP reutilizada pelo onChange e pelo onBlur
    async function fetchCepAddress(cep: string) {
        const cepLimpo = cep.replace(/\D/g, "")
        if (cepLimpo.length !== 8) return

        // Evita chamadas duplicadas (ex: onChange + onBlur disparando juntos)
        if (isFetchingCep) return
        setIsFetchingCep(true)

        try {
            const address = await fetchAddressByCep(cepLimpo)
            setFormData(prev => ({
                ...prev,
                street: address.logradouro,
                city: address.localidade,
                state: address.uf,
                bairro: address.bairro
            }))
            showToast("Endereço encontrado!", "success")
        } catch {
            showToast("CEP não encontrado", "error")
        } finally {
            setIsFetchingCep(false)
        }
    }

    // onBlur do CEP: complementa o onChange para o caso de
    // digitação caractere a caractere sem acionar o autocomplete
    async function handleCepBlur() {
        const cepLimpo = formData.cep.replace(/\D/g, "")
        if (cepLimpo.length === 8) {
            await fetchCepAddress(formData.cep)
        }
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
        const fieldName = name as keyof FormData
        const errorMessage = validateField(fieldName, value)
        setErrors(prev => ({ ...prev, [fieldName]: errorMessage }))
    }

    return (
        <div>

            {!isEditing && (
                <div className="page-top">
                    <button type="button" onClick={() => navigate("/")} className="back-button">
                        ← Voltar para Home
                    </button>
                </div>
            )}

            <section className="container-cadastro">

                <div className="form-header">
                    <h2 className="form-title">
                        <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isEditing
                                    ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                }
                            />
                        </svg>
                        {isEditing ? "Editar Funcionário" : "Dados do Funcionário"}
                    </h2>
                    <p className="form-subtitle">Preencha todos os campos obrigatórios</p>
                </div>

                <div className="section-title">
                    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Informações Pessoais
                </div>

                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Nome Completo"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Digite o nome completo do funcionário"
                        required
                        error={errors.name}
                        success={formData.name !== ""}
                    />

                    <div className="form-row-2">
                        <InputField
                            label="CPF"
                            type="text"
                            name="cpf"
                            id="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="000.000.000-00"
                            required
                            error={errors.cpf}
                            success={formData.cpf !== "" && !errors.cpf}
                        />

                        <InputField
                            label="E-mail"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="exemplo@empresa.com.br"
                            required
                            error={errors.email}
                            success={formData.email !== "" && !errors.email}
                        />
                    </div>

                    <div className="form-row-2">
                        <InputField
                            label="Cargo"
                            type="text"
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Digite o cargo"
                            required
                            error={errors.role}
                            success={formData.role !== "" && !errors.role}
                        />

                        <InputField
                            label="Data de Admissão"
                            type="date"
                            name="admissionDate"
                            id="admissionDate"
                            value={formData.admissionDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder=""
                            required
                            error={errors.admissionDate}
                            success={formData.admissionDate !== "" && !errors.admissionDate}
                        />
                    </div>

                    <hr />

                    <div className="section-title">
                        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                        onBlur={(e) => {
                            handleBlur(e)
                            handleCepBlur()
                        }}
                        placeholder="00000-000"
                        required
                        error={errors.cep}
                        success={formData.cep !== "" && !errors.cep}
                    />

                    <p>Digite o CEP para buscar o endereço automaticamente</p>

                    <InputField
                        label="Rua"
                        type="text"
                        name="street"
                        id="street"
                        value={formData.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nome da rua"
                        required
                        error={errors.street}
                        success={formData.street !== "" && !errors.street}
                    />

                    <div className="form-row-3">
                        <InputField
                            label="Número"
                            type="number"
                            name="number"
                            id="number"
                            value={formData.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="N°"
                            required
                            error={errors.number}
                            success={formData.number !== "" && !errors.number}
                        />

                        <InputField
                            label="Complemento"
                            type="text"
                            name="complemento"
                            id="complemento"
                            value={formData.complemento}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Apto, Bloco, etc."
                        />

                        <InputField
                            label="Bairro"
                            type="text"
                            name="bairro"
                            id="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nome do bairro"
                            required
                            error={errors.bairro}
                            success={formData.bairro !== "" && !errors.bairro}
                        />
                    </div>

                    <div className="form-row-2">
                        <InputField
                            label="Cidade"
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nome da cidade"
                            required
                            error={errors.city}
                            success={formData.city !== "" && !errors.city}
                        />

                        <div className={`input-group ${errors.state ? "error" : formData.state ? "success" : ""}`}>
                            <label htmlFor="state">Estado</label>
                            <select required name="state" id="state" value={formData.state} onChange={handleSelectChange}>
                                <option value="">Selecione</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </select>
                            {errors.state && <span className="error-message">{errors.state}</span>}
                        </div>
                    </div>

                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {!isSubmitting ? (
                            <>
                                <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {isEditing ? "Salvar Alterações" : "Cadastrar Funcionário"}
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

export default EmployeeForm