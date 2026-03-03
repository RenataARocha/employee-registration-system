function App() {
  return (
    <div>
      <h1>Cadastro de funcionários</h1>

      <section className="container">
        <form>
          <label htmlFor="nome-completo">Nome:</label>
          <input type="text" name="name" id="nome-completo" placeholder="nome completo" />

          <label htmlFor="cpf">CPF:</label>
          <input type="text" name="cpf" inputMode="numeric" id="cpf" placeholder="digite sem cpf" />

          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" id="email" placeholder="digite seu email" />

          <label htmlFor="cargo">Cargo:</label>
          <input type="text" name="role" id="cargo" placeholder="digite seu cargo" />

          <button type="submit">Cadastrar</button>
        </form>

      </section>
    </div>
  )
}

export default App;