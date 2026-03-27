# 👥 Sistema de Cadastro de Funcionários

Aplicação front-end desenvolvida em React + TypeScript para cadastro e gerenciamento de funcionários, com foco em organização de código, boas práticas, validações e experiência do usuário.

---

## 🎬 Demonstração




https://github.com/user-attachments/assets/2e76a0db-9d7d-477b-8ace-4a39e89a3cca



## 🏆 Lighthouse
 
| Página | Desempenho | Acessibilidade | Boas Práticas | SEO |
| :----- | :--------: | :------------: | :-----------: | :-: |
| Cadastro (`/novo-funcionario`) | 82 | 97 | 100 | 91 |
| Listagem (`/funcionarios`) | 76 | 93 | 100 | 91 |
 
> Medido localmente. Em ambiente limpo os valores tendem a ser maiores.
 
---
 
## 🚀 Tecnologias utilizadas
 
- **React** com **TypeScript**
- **React Router DOM** — navegação entre páginas
- **Vite** — bundler e servidor de desenvolvimento
- **CSS puro** — estilização sem bibliotecas externas
- **ViaCEP API** — busca automática de endereço por CEP
- **localStorage** — persistência local dos dados
 
---
 
## ▶️ Como rodar o projeto localmente
 
**Pré-requisitos:** Node.js instalado
 
```bash
# Clone o repositório
git clone https://github.com/RenataARocha/employee-registration-system.git
 
# Entre na pasta
cd employee-registration-system
 
# Instale as dependências
npm install
 
# Inicie o servidor de desenvolvimento
npm run dev
```
 
Acesse em: [http://localhost:5173](http://localhost:5173)
 
---
 
## 📁 Estrutura do projeto
 
```
src/
├── components/
│   ├── EmployeeForm.tsx      # Formulário de cadastro e edição
│   ├── EmployeeForm.css
│   ├── HomeIllustration.tsx  # Ilustração decorativa da Home
│   ├── HomeIllustration.css
│   └── InputField.tsx        # Campo de input reutilizável
├── pages/
│   ├── Home.tsx              # Página inicial
│   ├── Home.css
│   ├── Employees.tsx         # Listagem de funcionários
│   └── Employees.css
├── services/
│   └── viaCepService.ts      # Integração com a API ViaCEP
├── types/
│   └── employee.ts           # Tipo Employee
├── utils/
│   ├── masks.ts              # Máscaras de CPF e CEP
│   ├── timeOnCompany.ts      # Cálculo de tempo na empresa
│   ├── validateCPF.ts        # Validação completa de CPF
│   └── validateEmail.ts      # Validação de e-mail
├── App.tsx                   # Configuração de rotas
├── main.tsx                  # Ponto de entrada
└── index.css                 # Reset e estilos globais
```
 
---
 
## 🧠 Decisões técnicas
 
### localStorage como persistência
 
Optei pelo **localStorage** por ser nativo do browser, sem necessidade de dependências externas, e suficiente para o escopo da aplicação. Os dados são serializados em JSON e recuperados a cada montagem dos componentes, simulando uma consulta a banco de dados.
 
### CSS puro sem bibliotecas de UI
 
Escolhi **CSS puro com classes modulares por componente** para demonstrar domínio das propriedades nativas — flexbox, animações, responsividade com `flex-wrap` — sem depender de abstrações prontas.
 
### Validação sem bibliotecas de formulário
 
O gerenciamento de estado e validação foi feito **manualmente com `useState`** para deixar clara a lógica de cada regra: validação em tempo real no `onChange`, revalidação no `onBlur` e validação completa no `submit`.
 
### TypeScript
 
Utilizado em todo o projeto para garantir tipagem segura, especialmente no tipo `Employee` compartilhado entre formulário, listagem e localStorage.
 
### Componentização
 
O `InputField` foi extraído como componente reutilizável por ser usado em múltiplos campos com comportamentos idênticos (label, erro, sucesso, required). Evita repetição e centraliza a lógica de exibição de estado.
 
---
 
## ✅ Funcionalidades implementadas
 
- Formulário com campos obrigatórios: nome, CPF, e-mail, cargo e data de admissão
- **Validação completa de CPF** com algoritmo de dígitos verificadores
- **Máscaras automáticas** nos campos de CPF (`000.000.000-00`) e CEP (`00000-000`)
- Validação de e-mail (regex) e campos obrigatórios
- Busca automática de endereço via **ViaCEP** ao preencher o CEP — inclusive via autocomplete do browser
- Tratamento de erros: CEP inválido, não encontrado e erro de requisição
- Campos de endereço editáveis após preenchimento automático
- Feedback visual: toast de sucesso/erro e indicadores de campo válido/inválido
- Persistência no **localStorage**
- **CRUD completo**: cadastro, edição e exclusão de funcionários
- Edição via modal com formulário pré-preenchido
- Exclusão com modal de confirmação
- **Busca e filtro em tempo real** por nome, cargo, CPF ou cidade
- **Paginação** na listagem (6 funcionários por página)
- **Data de admissão** com cálculo automático do tempo na empresa
- Listagem de funcionários com avatar pela inicial do nome
- Empty state na listagem quando não há cadastros ou resultados
- Navegação entre páginas com React Router
- Design responsivo para mobile
- Animações de entrada nas páginas e componentes
- Semântica HTML e acessibilidade (aria-label, aria-invalid, aria-describedby, role="alert")
 
---
 
## 🔧 O que ainda pode evoluir
 
- **Testes unitários** — validações e serviços são bons candidatos para testes com Vitest
- **Foto do funcionário** — permitir upload de foto no cadastro, exibida no card da listagem
- **Persistência mais robusta** — migrar para IndexedDB para suportar maior volume de dados
- **Feedback de carregamento no CEP** — spinner no campo enquanto a API ViaCEP responde
 
---
 
## 👩‍💻 Autora
 
**Renata Rocha**  
[LinkedIn](https://www.linkedin.com/in/renata-alexandre-rocha/) · [GitHub](https://github.com/RenataARocha)
