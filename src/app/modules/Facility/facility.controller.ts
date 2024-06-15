import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacilitySecvice } from "./facility.service";
import sendResponse from "../../utils/sendResponse";

const createFacility = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await FacilitySecvice.createFacilityIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility added successfully',
        data: result
    });
});

export const FacilityController = {
    createFacility
}