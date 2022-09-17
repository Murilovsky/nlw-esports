export function convertHourToMin(hoursString: string) {
    const [hours, minutes] = hoursString.split(':').map(Number)
    return ((hours * 60) + minutes)
}
export function convertMinToHour(minTotal: number) {
    const hours = Math.floor(minTotal / 60)
    const minutes = minTotal % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}