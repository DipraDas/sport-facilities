import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AvailableBookingSecvice } from "./checkAvailability.service";

const getAllAvailableBooking = catchAsync(async (req, res) => {
    const { date } = req.query;
    const result = await AvailableBookingSecvice.getAvailableBooking(date as string);
    if (result.length) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Availability checked successfully',
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

export const CheckAvailabilityController = {
    getAllAvailableBooking
}