
/**
 * HomeIllustration
 *
 * Componente visual decorativo utilizado na página inicial.
 * Não possui interação nem conteúdo semântico.
 */

/**
 * Componente de ilustração decorativa exibido no lado direito da Home.
 *
 * Originalmente baseado em HTML + Tailwind, convertido para React + CSS puro.
 * Composto por formas de fundo animadas, um card fictício e dois ícones flutuantes.
 *
 * Todo o componente é puramente decorativo — aria-hidden="true" o oculta
 * completamente de leitores de tela.
 */

import "./HomeIllustration.css"

function HomeIllustration() {
    return (

        // Ilustração decorativa — ocultada de leitores de tela
        <div className="illustration-container" aria-hidden="true">

            {/* Formas circulares desfocadas no fundo — animação de pulse suave */}
            <div className="bg-shape shape-blue"></div>
            <div className="bg-shape shape-green"></div>

            <div className="card-wrapper">

                {/* Card central decorativo simulando uma interface de sistema */}
                <div className="card">

                    {/* Grid de três blocos — o do meio em azul claro para destaque */}
                    <div className="card-grid">
                        <div></div>
                        <div className="highlight"></div>
                        <div></div>
                    </div>

                    {/* Linhas de texto fictícias com larguras decrescentes */}
                    <div className="card-lines">
                        <div></div>
                        <div className="short"></div>
                        <div className="smaller"></div>
                    </div>

                    {/* Dois botões fictícios: primário (azul) e secundário (cinza) */}
                    <div className="card-buttons">
                        <div className="primary"></div>
                        <div className="secondary"></div>
                    </div>
                </div>

                {/* Ícone flutuante de confirmação — canto superior direito do card */}
                <div className="floating-check">✓</div>

                {/* Ícone flutuante de equipe — canto inferior esquerdo do card */}
                <div className="floating-team">👥</div>
            </div>
        </div>
    )
}

export default HomeIllustration