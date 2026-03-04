import "./HomeIllustration.css"

function HomeIllustration() {
    return (
        <div className="illustration-container">
            <div className="bg-shape shape-blue"></div>
            <div className="bg-shape shape-green"></div>

            <div className="card-wrapper">
                <div className="card">
                    <div className="card-grid">
                        <div></div>
                        <div className="highlight"></div>
                        <div></div>
                    </div>

                    <div className="card-lines">
                        <div></div>
                        <div className="short"></div>
                        <div className="smaller"></div>
                    </div>

                    <div className="card-buttons">
                        <div className="primary"></div>
                        <div className="secondary"></div>
                    </div>
                </div>

                <div className="floating-check">✓</div>
                <div className="floating-team">👥</div>
            </div>
        </div>
    )
}

export default HomeIllustration