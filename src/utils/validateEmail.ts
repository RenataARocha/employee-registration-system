/**
 * Utilitário de validação de e-mail.
 *
 * Usa regex para verificar o formato básico: texto @ domínio . extensão.
 * Não realiza verificação de existência real do endereço.
 */

export function validateEmail(email: string): boolean {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}