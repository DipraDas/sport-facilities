export function calculateTimeExpression(timeStr: string) {
    const [hours, minutes] = timeStr.split(':').map(Number);

    const beforeValue = hours * 60;
    const afterValue = minutes;

    const totalValue = (beforeValue + afterValue) / 60;

    return totalValue;
}
