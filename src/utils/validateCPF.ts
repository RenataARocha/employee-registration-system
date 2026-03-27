// src/utils/validateCPF.ts

export function validateCPF(cpf: string): boolean {
    // Remove máscara (pontos e hífen)
    const cleaned = cpf.replace(/\D/g, '')

    // Deve ter exatamente 11 dígitos
    if (cleaned.length !== 11) return false

    // Rejeita sequências repetidas como 111.111.111-11, 000.000.000-00 etc.
    if (/^(\d)\1{10}$/.test(cleaned)) return false

    // Valida o primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned[i]) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned[9])) return false

    // Valida o segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned[i]) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned[10])) return false

    return true
}