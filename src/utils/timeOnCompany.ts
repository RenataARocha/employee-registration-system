// src/utils/timeOnCompany.ts

export function getTimeOnCompany(admissionDate: string): string {
    const admission = new Date(admissionDate)
    const now = new Date()

    let years = now.getFullYear() - admission.getFullYear()
    let months = now.getMonth() - admission.getMonth()
    const days = now.getDate() - admission.getDate()

    if (days < 0) months--
    if (months < 0) {
        years--
        months += 12
    }

    if (years > 0 && months > 0) {
        return `${years} ano${years > 1 ? 's' : ''} e ${months} mês${months > 1 ? 'es' : ''}`
    }
    if (years > 0) {
        return `${years} ano${years > 1 ? 's' : ''} na empresa`
    }
    if (months > 0) {
        return `${months} mês${months > 1 ? 'es' : ''} na empresa`
    }

    const diffDays = Math.floor(
        (now.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24)
    )
    return `${diffDays} dia${diffDays !== 1 ? 's' : ''} na empresa`
}