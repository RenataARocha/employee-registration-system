import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import HomeIllustration from "../components/HomeIllustration"
import "./Home.css"

function Home() {
    const navigate = useNavigate()
    const [totalEmployees, setTotalEmployees] = useState(0)

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            const parsed = JSON.parse(storedEmployees)
            setTotalEmployees(parsed.length)
        }
    }, [])

    return (

        <div className="home-container">

            <div className="home-header">
                <div className="logo-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                <div>
                    <h1>Cadastro de Funcionários</h1>
                    <p>Sistema simples para gerenciar sua equipe.</p>
                </div>
            </div>

            <div>

                <div className="home-buttons">

                    <button onClick={() => navigate("/novo-funcionario")}>
                        <svg viewBox="0 0 24 24">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Novo Cadastro
                    </button>

                    <button onClick={() => navigate("/funcionarios")}>
                        <svg viewBox="0 0 24 24">
                            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Ver Funcionários
                    </button>

                </div>



                <section>
                    <h3>Total de Funcionários</h3>
                    <p>
                        {totalEmployees}
                    </p>
                </section>
            </div>



            <section>
                <h3>Funcionalidades</h3>

                <ul>
                    <li>Validação automática de CPF e E-mail</li>
                    <li>Busca automática de endereço via CEP</li>
                    <li>Organização de funcionários cadastrados</li>
                </ul>
            </section>

            <HomeIllustration />
        </div>
    )
}

export default Home