import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import HomeIllustration from "../components/HomeIllustration"
import "./Home.css"

function Home() {
    const navigate = useNavigate()

    // Estado que armazena o total de funcionários
    const [totalEmployees, setTotalEmployees] = useState<number>(0)

    // useEffect executa quando o componente carrega
    // Aqui buscamos os funcionários salvos no localStorage
    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            const parsed = JSON.parse(storedEmployees)
            setTotalEmployees(parsed.length)
        }
    }, [])

    return (
        <main className="home-container">

            {/* Container principal dividido em esquerda e direita */}
            <div className="home-main">

                {/* ================= LADO ESQUERDO ================= */}
                <section className="home-left">

                    {/* ===== Cabeçalho da página ===== */}
                    <header className="home-header">

                        {/* Ícone ilustrativo do sistema */}
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        {/* Título e subtítulo */}
                        <div>
                            <h1 className="home-title">
                                Cadastro de Funcionários
                            </h1>
                            <p className="home-subtitle">
                                Sistema simples e eficiente para gerenciar sua equipe.
                            </p>
                        </div>
                    </header>

                    {/* ===== Botões de navegação ===== */}
                    <nav className="home-buttons">

                        {/* Botão para novo cadastro */}
                        <button
                            className="primary-button"
                            onClick={() => navigate("/novo-funcionario")}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Novo Cadastro
                        </button>

                        {/* Botão para visualizar lista */}
                        <button
                            className="secondary-button"
                            onClick={() => navigate("/funcionarios")}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0M3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Ver Funcionários
                        </button>

                    </nav>

                    {/* ===== Card contador ===== */}
                    <section className="home-counter">

                        <article className="counter-card">

                            {/* Número vem primeiro (como você pediu) */}
                            <strong className="counter-number">
                                {totalEmployees}
                            </strong>

                            {/* Nome fica abaixo */}
                            <span className="counter-label">
                                Funcionários Cadastrados
                            </span>

                        </article>

                    </section>

                    {/* ===== Funcionalidades do sistema ===== */}
                    <section className="home-features">

                        <h2 className="features-title">
                            Funcionalidades do Sistema
                        </h2>

                        <div className="features-grid">

                            <article className="feature-card">
                                <h3>Validação Inteligente</h3>
                                <p>
                                    Validação automática de CPF e e-mail para evitar dados incorretos
                                    e garantir integridade nas informações cadastradas.
                                </p>
                            </article>

                            <article className="feature-card">
                                <h3>Busca por CEP</h3>
                                <p>
                                    Preenchimento automático de endereço através do CEP,
                                    otimizando tempo e reduzindo erros manuais.
                                </p>
                            </article>

                            <article className="feature-card">
                                <h3>Gestão Organizada</h3>
                                <p>
                                    Visualização clara e organizada dos funcionários cadastrados,
                                    facilitando consultas e controle da equipe.
                                </p>
                            </article>

                        </div>

                    </section>

                </section>

                {/* ================= LADO DIREITO ================= */}
                <aside className="home-right">
                    <HomeIllustration />
                </aside>

            </div>

        </main>
    )
}

export default Home