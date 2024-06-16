/* eslint-disable @typescript-eslint/no-explicit-any */

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getAvailableSlots = (detailsOfBookingSlot: any) => {
    const dayStart = "00:00";
    const dayEnd = "24:00";

    const availableSlotsArray = [];

    if (detailsOfBookingSlot.length === 0) {
        return [
            {
                startTime: dayStart,
                endTime: dayEnd
            }
        ];
    }

    detailsOfBookingSlot.sort((a: any, b: any) => a.startTime.localeCompare(b.startTime));

    // Check for free slot before the first booking
    if (dayStart < detailsOfBookingSlot[0].startTime) {
        availableSlotsArray.push({
            startTime: dayStart,
            endTime: detailsOfBookingSlot[0].startTime
        });
    }

    // Check for free slots between bookings
    for (let i = 0; i < detailsOfBookingSlot.length - 1; i++) {
        if (detailsOfBookingSlot[i].endTime < detailsOfBookingSlot[i + 1].startTime) {
            availableSlotsArray.push({
                startTime: detailsOfBookingSlot[i].endTime,
                endTime: detailsOfBookingSlot[i + 1].startTime
            });
        }
    }

    // Check for free slot after the last booking
    if (detailsOfBookingSlot[detailsOfBookingSlot.length - 1].endTime < dayEnd) {
        availableSlotsArray.push({
            startTime: detailsOfBookingSlot[detailsOfBookingSlot.length - 1].endTime,
            endTime: dayEnd
        });
    }

    return availableSlotsArray;
};