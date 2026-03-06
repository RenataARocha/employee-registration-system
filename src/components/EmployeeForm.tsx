/**
 * Formulário de cadastro de novo funcionário.
 *
 * Responsabilidades:
 * - Coletar e validar os dados pessoais e de endereço do funcionário
 * - Buscar endereço automaticamente via API ViaCEP ao informar o CEP
 * - Salvar o novo funcionário no localStorage ao submeter
 * - Exibir feedback visual (toast) para sucesso e erros
 * - Redirecionar para a lista de funcionários após o cadastro
 */

import InputField from "./InputField"
import { validateEmail } from "../utils/validateEmail"
import { validateCPF } from "../utils/validateCPF"
import { useState } from "react"
import { fetchAddressByCep } from "../services/viaCepService"
import { useNavigate } from "react-router-dom"
import type { Employee } from "../types/employee"
import "./EmployeeForm.css"

// Tipagem de todos os campos do formulário
type FormData = {
    name: string
    cpf: string
    email: string
    role: string
    cep: string
    street: string
    city: string
    state: string
    number: string
    complemento: string
    bairro: string
}

// Partial permite que apenas os campos com erro sejam preenchidos
type FormErrors = Partial<Record<keyof FormData, string>>

function EmployeeForm() {

    // Controla o estado do botão submit para evitar envios duplicados
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Armazena as mensagens de erro por campo
    const [errors, setErrors] = useState<FormErrors>({})

    // Estado central do formulário com todos os campos inicializados vazios
    const [formData, setFormData] = useState<FormData>({
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

    // Atualiza o campo alterado no estado e revalida em tempo real
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        const fieldName = name as keyof FormData

        const errorMessage = validateField(fieldName, value)

        setErrors(prev => ({
            ...prev,
            [fieldName]: errorMessage
        }))
    }

    // Revalida o campo ao perder o foco — garante feedback mesmo sem digitar
    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {

        const { name, value } = event.target

        const fieldName = name as keyof FormData

        const errorMessage = validateField(fieldName, value)

        setErrors(prev => ({
            ...prev,
            [fieldName]: errorMessage
        }))
    }

    // Cria e injeta um toast no DOM com remoção automática após 3 segundos.
    // Usa manipulação direta do DOM para evitar re-renders no formulário.
    function showToast(message: string, type: "success" | "error") {

        const toast = document.createElement("div")

        toast.className = `toast ${type}`

        toast.innerText = message

        document.body.appendChild(toast)

        setTimeout(() => {
            toast.remove()
        }, 3000)
    }

    // Valida um campo individualmente e retorna a mensagem de erro ou undefined
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

    // Executada ao submeter o formulário:
    // 1. Valida todos os campos de uma vez
    // 2. Exibe erros e interrompe se houver falhas
    // 3. Salva o funcionário no localStorage e redireciona
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const newErrors: FormErrors = {}

        // Percorre todos os campos e acumula os erros encontrados
        Object.entries(formData).forEach(([key, value]) => {

            const fieldName = key as keyof FormData

            const errorMessage = validateField(fieldName, value)

            if (errorMessage) {
                newErrors[fieldName] = errorMessage
            }

        })

        setErrors(newErrors)

        // Interrompe o envio se houver qualquer campo inválido
        if (Object.keys(newErrors).length > 0) {
            showToast("Por favor, corrija os erros no formulário", "error")
            return
        }

        setIsSubmitting(true)

        const newEmployee: Employee = { ...formData }

        // Recupera a lista existente ou inicializa um array vazio
        const storedEmployees = localStorage.getItem("employees")

        const employees: Employee[] = storedEmployees
            ? JSON.parse(storedEmployees)
            : []

        employees.push(newEmployee)

        localStorage.setItem("employees", JSON.stringify(employees))

        showToast("Funcionário cadastrado com sucesso!", "success")

        // Aguarda o toast ser exibido antes de redirecionar
        setTimeout(() => {
            navigate("/funcionarios")
        }, 1200)
    }

    // Chamada ao sair do campo CEP — consulta a API ViaCEP e preenche
    // automaticamente rua, cidade, estado e bairro no formulário
    async function handleCepBlur() {
        try {

            // Remove caracteres não numéricos antes de consultar
            const cepLimpo = formData.cep.replace(/\D/g, "")

            if (cepLimpo.length !== 8) {
                showToast("CEP inválido", "error")
                return
            }

            const address = await fetchAddressByCep(cepLimpo)

            // Atualiza apenas os campos de endereço, preservando os demais
            setFormData(prev => ({
                ...prev,
                street: address.logradouro,
                city: address.localidade,
                state: address.uf,
                bairro: address.bairro
            }))

            showToast("Endereço encontrado!", "success")

        } catch (error) {

            showToast("CEP não encontrado", "error")

        }
    }

    // Versão do handleChange para o elemento <select> (estado)
    // Necessária pois o select emite ChangeEvent<HTMLSelectElement>, não HTMLInputElement
    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {

        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        const fieldName = name as keyof FormData

        const errorMessage = validateField(fieldName, value)

        setErrors(prev => ({
            ...prev,
            [fieldName]: errorMessage
        }))
    }

    return (
        <div>

            {/* Barra superior com botão de voltar, fora do container do formulário */}
            <div className="page-top">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="back-button"
                >
                    ← Voltar para Home
                </button>
            </div>

            <section className="container">

                {/* Header com gradiente azul — título e instrução do formulário */}
                <div className="form-header">
                    <h2 className="form-title">
                        <svg
                            className="header-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                        Dados do Funcionário
                    </h2>
                    <p className="form-subtitle">
                        Preencha todos os campos obrigatórios
                    </p>
                </div>

                {/* ===== SEÇÃO 1: INFORMAÇÕES PESSOAIS ===== */}
                <div className="section-title">
                    <svg
                        className="section-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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

                    {/* CPF e e-mail lado a lado em grid de 2 colunas */}
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

                    {/* Divisor visual entre as seções de dados pessoais e endereço */}
                    <hr />

                    {/* ===== SEÇÃO 2: ENDEREÇO ===== */}
                    <div className="section-title">
                        <svg
                            className="section-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
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

                    {/* CEP dispara handleCepBlur junto ao handleBlur padrão ao perder foco */}
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

                    {/* Instrução de apoio exibida abaixo do campo CEP */}
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

                    {/* Número, complemento e bairro em grid de 3 colunas */}
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

                        {/* Complemento é opcional — sem prop required e sem validação */}
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

                    {/* Cidade e estado em grid de 2 colunas */}
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

                        {/* Select de estado com classe dinâmica de erro/sucesso,
                            usa handleSelectChange pois emite ChangeEvent<HTMLSelectElement> */}
                        <div className={`input-group ${errors.state ? "error" : formData.state ? "success" : ""}`}>
                            <label htmlFor="state">Estado</label>

                            <select
                                required
                                name="state"
                                id="state"
                                value={formData.state}
                                onChange={handleSelectChange}
                            >
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

                    {/* Botão de submit — desabilitado durante o envio para evitar cliques duplos.
                        Alterna entre o texto normal e o spinner de carregamento */}
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
                                    aria-hidden="true"
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