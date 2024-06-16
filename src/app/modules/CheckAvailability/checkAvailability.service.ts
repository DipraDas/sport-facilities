import { Booking } from "../Booking/Booking.model";
import { getAvailableSlots, getTodayDate } from "./checkAvailability.utility";



const getAvailableBooking = async (userId: string, date: string) => {
    try {

        const today = getTodayDate();
        const targetDate = date || getTodayDate();

        const allBookings = await Booking.find({
            user: userId,
            date: targetDate
        })
        const bookedSlots = allBookings.map(booking => ({
            startTime: booking.startTime,
            endTime: booking.endTime
        }));

        const availableSlots = getAvailableSlots(bookedSlots);
        return availableSlots;

    } catch (err: any) {
        throw new Error(err);
    }
};

export const AvailableBookingSecvice = {
    getAvailableBooking
}