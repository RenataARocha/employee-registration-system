import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Cadastro de Funcionários</h1>
            <p>Sistema simples para gerenciar sua equipe.</p>

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => navigate("/novo-funcionario")}>
                    Novo Cadastro
                </button>

                <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate("/funcionarios")}
                >
                    Ver Funcionários
                </button>
            </div>

            <section style={{ marginTop: "40px" }}>
                <h3>Funcionalidades</h3>

                <ul>
                    <li>Validação automática de CPF e E-mail</li>
                    <li>Busca automática de endereço via CEP</li>
                    <li>Organização de funcionários cadastrados</li>
                </ul>
            </section>
        </div>
    )
}

export default Home