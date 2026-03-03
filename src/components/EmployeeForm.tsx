import InputField from "./InputField"

function EmployeeForm() {
    return (
        <div>
            <h1>Cadastro de funcionários</h1>

            <section className="container">
                <form>

                    <InputField
                        label="Nome"
                        type="text"
                        name="name"
                        id="name"
                        value=""
                        onChange={() => { }}
                        placeholder="Nome completo"
                    />

                    <InputField
                        label="CPF"
                        type="text"
                        name="cpf"
                        id="cpf"
                        value=""
                        onChange={() => { }}
                        placeholder="Digite seu CPF"
                    />

                    <InputField
                        label="E-mail"
                        type="email"
                        name="email"
                        id="email"
                        value=""
                        onChange={() => { }}
                        placeholder="Digite seu email"
                    />

                    <InputField
                        label="Cargo"
                        type="text"
                        name="role"
                        id="role"
                        value=""
                        onChange={() => { }}
                        placeholder="Digite seu cargo"
                    />

                    <button type="submit">Cadastrar</button>

                </form>
            </section>
        </div>
    )
}

export default EmployeeForm