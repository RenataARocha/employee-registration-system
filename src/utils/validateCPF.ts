export function validarCPF(cpf: string): boolean {

    const cleanCPF = cpf.replace(/\D/g, "")

    if (cleanCPF.length !== 11) return false

    return true
}