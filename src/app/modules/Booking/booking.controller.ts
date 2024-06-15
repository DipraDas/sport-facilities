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

    if (result.length) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    } else {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "No data found!",
            data: result,
        });
    }
});

const getSingleUsersBooking = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await BookingService.singleUsersBookingsFromDB(userId);

    if (result.length) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    } else {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "No data found!",
            data: result,
        });
    }
});

const deleteBookingForUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingService.deleteBookingForUserFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Bookings cancelled successfully",
        data: result,
    });
});

export const BookingController = {
    getBooking,
    createBooking,
    getSingleUsersBooking,
    deleteBookingForUser
}