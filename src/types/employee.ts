/**
 * Tipagem central do funcionário utilizada em todo o sistema.
 *
 * Compartilhada entre o formulário de cadastro (EmployeeForm),
 * a listagem (Employees) e o serviço de persistência (localStorage).
 */

export interface Employee {
    name: string
    cpf: string
    email: string
    role: string
    cep: string
    street: string
    city: string
    state: string
}