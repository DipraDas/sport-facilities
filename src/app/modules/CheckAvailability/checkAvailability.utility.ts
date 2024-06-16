export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getAvailableSlots = (bookedSlots: any) => {
    const dayStart = "00:00";
    const dayEnd = "24:00";

    let availableSlots = [];

    if (bookedSlots.length === 0) {
        return [
            {
                startTime: dayStart,
                endTime: dayEnd
            }
        ];
    }

    bookedSlots.sort((a: any, b: any) => a.startTime.localeCompare(b.startTime));

    // Check for free slot before the first booking
    if (dayStart < bookedSlots[0].startTime) {
        availableSlots.push({
            startTime: dayStart,
            endTime: bookedSlots[0].startTime
        });
    }

    // Check for free slots between bookings
    for (let i = 0; i < bookedSlots.length - 1; i++) {
        if (bookedSlots[i].endTime < bookedSlots[i + 1].startTime) {
            availableSlots.push({
                startTime: bookedSlots[i].endTime,
                endTime: bookedSlots[i + 1].startTime
            });
        }
    }

    // Check for free slot after the last booking
    if (bookedSlots[bookedSlots.length - 1].endTime < dayEnd) {
        availableSlots.push({
            startTime: bookedSlots[bookedSlots.length - 1].endTime,
            endTime: dayEnd
        });
    }

    return availableSlots;
};