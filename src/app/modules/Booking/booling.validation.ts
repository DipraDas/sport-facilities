import { z } from "zod";

// Regular expression to match the HH:mm time format
const timeFormat = /^(?:([01]\d|2[0-3]):([0-5]\d)|24:00)$/;

// Regular expression to match the YYYY-MM-DD date format
const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

// Helper function to compare times
const isTimeLessThan = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    if (startHours < endHours) return true;
    if (startHours === endHours && startMinutes < endMinutes) return true;
    return false;
};

const bookingValidationSchema = z.object({
    body: z.object({
        facility: z.string({ required_error: 'Facility is required.' }),
        date: z.string({ required_error: 'Date is required.' })
            .regex(dateFormat, { message: 'Date must be in YYYY-MM-DD format.' }),
        startTime: z.string({ required_error: 'Start Time is required.' })
            .regex(timeFormat, { message: 'Start Time must be in HH:mm format.' }),
        endTime: z.string({ required_error: 'End Time is required.' })
            .regex(timeFormat, { message: 'End Time must be in HH:mm format.' })
    }).refine(data => isTimeLessThan(data.startTime, data.endTime), {
        message: 'Start Time must be less than End Time.',
        path: ['startTime', 'endTime']
    })
});

export const BookingValidation = {
    bookingValidationSchema
}