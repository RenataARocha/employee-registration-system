/**
 * Tipagem central do funcionário utilizada em todo o sistema.
 *
 * Compartilhada entre o formulário de cadastro (EmployeeForm),
 * a listagem (Employees) e o serviço de persistência (localStorage).
 */

// src/types/employee.ts

export type Employee = {
    name: string
    cpf: string
    email: string
    role: string
    admissionDate: string
    cep: string
    street: string
    city: string
    state: string
    number: string
    complemento: string
    bairro: string
}