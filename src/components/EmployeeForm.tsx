import InputField from "./InputField"
import { validateEmail } from "../utils/validateEmail"
import { validateCPF } from "../utils/validateCPF"
import { useState } from "react"
import { fetchAddressByCep } from "../services/viaCepService"


function EmployeeForm() {

    const [formData, setFormData] = useState({
        name: "",
        cpf: "",
        email: "",
        role: "",
        cep: "",
        street: "",
        city: "",
        state: ""
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (!validateEmail(formData.email)) {
            alert("Email inválido")
            return
        }

        if (!validateCPF(formData.cpf)) {
            alert("CPF inválido")
            return
        }

        alert("Formulário válido!")
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
            <h1>Cadastro de funcionários</h1>

            <section className="container">
                <form onSubmit={handleSubmit}>

                    <InputField
                        label="Nome"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nome completo"
                    />

                    <InputField
                        label="CPF"
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="Digite seu CPF"
                    />

                    <InputField
                        label="E-mail"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu email"
                    />

                    <InputField
                        label="Cargo"
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Digite seu cargo"
                    />

                    <InputField
                        label="CEP"
                        type="text"
                        name="cep"
                        id="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        placeholder="Digite seu CEP"
                    />

                    <InputField
                        label="Rua"
                        type="text"
                        name="street"
                        id="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Rua"
                    />

                    <InputField
                        label="Cidade"
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Cidade"
                    />

                    <InputField
                        label="Estado"
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Estado"
                    />

                    <button type="submit">Cadastrar</button>

                </form>
            </section>
        </div>
    )
}

export default EmployeeForm;