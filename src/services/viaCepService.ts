/**
 * Serviço de consulta de endereço via API ViaCEP.
 *
 * Recebe um CEP (com ou sem máscara), remove os caracteres não numéricos,
 * consulta a API pública e retorna os dados de endereço.
 *
 * Lança erros em três situações:
 * - CEP com menos ou mais de 8 dígitos
 * - Falha na requisição HTTP
 * - CEP inexistente na base do ViaCEP (campo `data.erro`)
 */

export async function fetchAddressByCep(cep: string) {

    // Remove qualquer caractere não numérico (ex: traços e pontos de máscara)
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
        throw new Error("CEP inválido")
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar CEP")
    }

    const data = await response.json()

    // A API retorna { erro: true } quando o CEP não existe na base
    if (data.erro) {
        throw new Error("CEP não encontrado")
    }

    return data
}