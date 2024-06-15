import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.user.id;
    const result = await BookingService.createBookingIntoDB(userId, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result
    });
});

const getBooking = catchAsync(async (req, res) => {
    const result = await BookingService.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    });
});

const getSingleUsersBooking = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await BookingService.singleUsersBookingsFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result
    });
});

export const BookingController = {
    getBooking,
    createBooking,
    getSingleUsersBooking
}