/**
 * Página inicial do sistema de cadastro de funcionários.
 *
 * Responsabilidades:
 * - Exibir a navegação principal com acesso às rotas do sistema
 * - Mostrar o total de funcionários cadastrados em tempo real
 * - Apresentar as funcionalidades disponíveis no sistema
 *
 * Persistência: os dados são lidos do localStorage a cada montagem
 * do componente, simulando uma consulta a banco de dados.
 */

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import HomeIllustration from "../components/HomeIllustration"
import "./Home.css"

function Home() {
    const navigate = useNavigate()

    // Armazena a quantidade de funcionários exibida no contador
    const [totalEmployees, setTotalEmployees] = useState<number>(0)

    // Lê os funcionários do localStorage ao montar o componente.
    // O array vazio [] garante que isso rode apenas uma vez,
    // equivalente ao componentDidMount de componentes de classe.
    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees")

        if (storedEmployees) {
            const parsed = JSON.parse(storedEmployees)
            setTotalEmployees(parsed.length)
        }
    }, [])

    return (
        <main className="home-container">

            {/* Layout dividido em duas colunas: conteúdo (esquerda) e ilustração (direita) */}
            <div className="home-main">

                {/* ===== COLUNA ESQUERDA — conteúdo principal ===== */}
                <section className="home-left">

                    {/* Cabeçalho com ícone, título e descrição do sistema */}
                    <header className="home-header">

                        {/* Ícone decorativo — aria-hidden oculta do leitor de tela
                            pois a informação já está no título ao lado */}
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        <div>
                            <h1 className="home-title">
                                Cadastro de Funcionários
                            </h1>
                            <p className="home-subtitle">
                                Sistema simples e eficiente para gerenciar sua equipe.
                            </p>
                        </div>
                    </header>

                    {/* Navegação principal: acesso rápido às duas rotas do sistema */}
                    <nav className="home-buttons" aria-label="Navegação principal">

                        <button
                            className="primary-button"
                            onClick={() => navigate("/novo-funcionario")}
                            aria-label="Cadastrar novo funcionário"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Novo Cadastro
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/funcionarios")}
                            aria-label="Ver lista de funcionários cadastrados"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0M3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Ver Funcionários
                        </button>

                    </nav>

                    {/* Contador dinâmico — valor lido do localStorage na montagem */}
                    <div className="home-counter">

                        <div className="counter-card">
                            {/* aria-label une número e label para leitores de tela
                                (sem ele, seria lido apenas o número isolado) */}
                            <strong
                                className="counter-number"
                                aria-label={`${totalEmployees} funcionários cadastrados`}
                            >
                                {totalEmployees}
                            </strong>
                            <span className="counter-label" aria-hidden="true">
                                Funcionários Cadastrados
                            </span>
                        </div>

                    </div>

                    {/* Cards descrevendo as principais funcionalidades do sistema */}
                    <section className="home-features" aria-labelledby="features-heading">

                        <h2 id="features-heading" className="features-title">
                            Funcionalidades do Sistema
                        </h2>

                        {/* ul + li correto semanticamente: article não pode ser
                            filho direto de ul, apenas li é permitido */}
                        <ul className="features-grid">

                            <li>
                                <article className="feature-card">
                                    <div className="feature-icon purple" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" />
                                        </svg>
                                    </div>
                                    <h3>Validações Automáticas</h3>
                                    <p>
                                        CPF, e-mail e telefone validados automaticamente para garantir
                                        dados corretos no cadastro.
                                    </p>
                                </article>
                            </li>

                            <li>
                                <article className="feature-card">
                                    <div className="feature-icon green" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    <h3>Endereço Automático</h3>
                                    <p>
                                        Digite o CEP e os dados de endereço são preenchidos automaticamente
                                        usando a API ViaCEP.
                                    </p>
                                </article>
                            </li>

                            <li>
                                <article className="feature-card">
                                    <div className="feature-icon blue" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3>Gestão de Funcionários</h3>
                                    <p>
                                        Cadastre, visualize e gerencie funcionários de forma simples
                                        e organizada.
                                    </p>
                                </article>
                            </li>

                        </ul>

                    </section>

                </section>

                {/* ===== COLUNA DIREITA — ilustração decorativa ===== */}
                <aside className="home-right" aria-hidden="true">
                    <HomeIllustration />
                </aside>

            </div>

        </main>
    )
}

export default Home