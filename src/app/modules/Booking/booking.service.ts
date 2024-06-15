import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TBooking } from "./booking.interface";
import { Booking } from "./Booking.model";
import { Facility } from "../Facility/facility.model";
import { calculateTimeExpression } from "./booking.utils";

const getAllBookingsFromDB = async () => {
    try {
        const allBooking = await Booking
            .find()
            .populate('facility')
            .populate('user')

        return allBooking;

    } catch (err: any) {
        throw new Error(err);
    }
}
const singleUsersBookingsFromDB = async (userId: string) => {
    try {
        const allBooking = await Booking.find({ user: userId }).populate('facility').populate('user')
        return allBooking;

    } catch (err: any) {
        throw new Error(err);
    }
}

const createBookingIntoDB = async (userId: string, payload: TBooking) => {
    try {

        const isFacilityExists = await Facility.findById(payload.facility);
        if (!isFacilityExists) {
            throw new AppError(httpStatus.NOT_FOUND, 'Facility not found.')
        }

        const pricePerHour = isFacilityExists.pricePerHour
        const payableAmount = (calculateTimeExpression(payload.endTime) - calculateTimeExpression(payload.startTime)) * pricePerHour;
        const data = { ...payload, user: userId, payableAmount }

        const newBooking = await Booking.create(data);

        if (!newBooking) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new booking.');
        }

        return newBooking;

    } catch (err: any) {
        throw new Error(err);
    }
};

export const BookingService = {
    getAllBookingsFromDB,
    createBookingIntoDB,
    singleUsersBookingsFromDB
}