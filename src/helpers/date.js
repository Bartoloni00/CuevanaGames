/**
 * Transforma un objeto Date a un string con formato:
 * DD/MM/AA hh:mm:ss
 * @param {Date} date
 * @return {string}
 */
export function formatDate(date) {
    return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year:'numeric',
        hour: '2-digit',
        minute:'2-digit',
        // second:'2-digit'
    }).format(date).replace(',', '')
}