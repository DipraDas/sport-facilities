/* eslint-disable @typescript-eslint/no-explicit-any */

import { Booking } from "../Booking/Booking.model";
import { getAvailableSlots, getTodayDate } from "./checkAvailability.utility";

const getAvailableBooking = async (date: string) => {
    try {

        const targetDate = date || getTodayDate();

        const allBookings = await Booking.find({
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