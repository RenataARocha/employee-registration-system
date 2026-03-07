# 👥 Sistema de Cadastro de Funcionários

Aplicação front-end desenvolvida em React + TypeScript para cadastro e gerenciamento de funcionários, com foco em organização de código, boas práticas, validações e experiência do usuário.

---

## 🎬 Demonstração

<!-- Substitua pelo link do seu vídeo de demonstração -->

> 📹 _Vídeo em breve_

---

## 🏆 Lighthouse

| Desempenho | Acessibilidade | Boas Práticas | SEO |
| :--------: | :------------: | :-----------: | :-: |
|     83     |       97       |      100      | 91  |

> Medido localmente com dados em cache. Em ambiente limpo os valores tendem a ser maiores.

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
git clone https://github.com/seu-usuario/employee-registration-system.git

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
│   ├── EmployeeForm.tsx      # Formulário de cadastro
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
│   └── employee.ts           # Interface Employee
├── utils/
│   ├── validateCPF.ts        # Validação de CPF
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

Utilizado em todo o projeto para garantir tipagem segura, especialmente na interface `Employee` compartilhada entre formulário, listagem e localStorage.

### Componentização

O `InputField` foi extraído como componente reutilizável por ser usado em múltiplos campos com comportamentos idênticos (label, erro, sucesso, required). Evita repetição e centraliza a lógica de exibição de estado.

---

## ✅ Funcionalidades implementadas

- Formulário com campos obrigatórios: nome, CPF, e-mail e cargo
- Validação de CPF (formato), e-mail (regex) e campos obrigatórios
- Busca automática de endereço via **ViaCEP** ao sair do campo CEP
- Tratamento de erros: CEP inválido, não encontrado e erro de requisição
- Campos de endereço editáveis após preenchimento automático
- Feedback visual: toast de sucesso/erro e indicadores de campo válido/inválido
- Persistência no **localStorage**
- Listagem de funcionários cadastrados com avatar por inicial
- Exclusão de funcionário com modal de confirmação
- Empty state na listagem quando não há cadastros
- Navegação entre páginas com React Router
- Design responsivo para mobile
- Animações de entrada nas páginas e componentes
- Semântica HTML e acessibilidade (aria-label, aria-invalid, aria-describedby, role="alert")

---

## 🔧 O que poderia ser melhorado com mais tempo

- **Validação de CPF completa** — implementar o algoritmo de dígitos verificadores, não apenas a validação de 11 dígitos
- **Feedback de carregamento no CEP** — adicionar um spinner no campo enquanto a API ViaCEP responde
- **Foto do funcionário** — permitir upload de foto no cadastro, exibida no card da listagem
- **Tempo na empresa** — calcular e exibir automaticamente há quanto tempo o funcionário está cadastrado, a partir da data de entrada
- **Data de entrada** — adicionar campo de data de admissão no formulário
- **Edição de funcionários** — atualmente só é possível cadastrar e excluir
- **Paginação ou busca** — útil quando a lista de funcionários crescer
- **Testes unitários** — validações e serviços são bons candidatos para testes com Vitest
- **Persistência mais robusta** — migrar para IndexedDB para suportar maior volume de dados
- **Máscara nos campos** — CPF e CEP poderiam ter máscaras automáticas de formatação

---

## 👩‍💻 Autora

**Renata Rocha**  
[LinkedIn](https://linkedin.com/in/seu-perfil) · [GitHub](https://github.com/seu-usuario)
