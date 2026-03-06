/**
 * Utilitário de validação de CPF.
 *
 * Por ora realiza apenas a validação estrutural (11 dígitos numéricos).
 * Remove a máscara antes de verificar para aceitar tanto "000.000.000-00"
 * quanto "00000000000".
 */

export function validateCPF(cpf: string): boolean {

    // Remove pontos e traço da máscara para trabalhar apenas com os dígitos
    const cleanCPF = cpf.replace(/\D/g, "")

    if (cleanCPF.length !== 11) return false

    return true
}