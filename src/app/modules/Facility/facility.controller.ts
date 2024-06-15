import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacilitySecvice } from "./facility.service";
import sendResponse from "../../utils/sendResponse";

const getAllFacility = catchAsync(async (req, res) => {
    const result = await FacilitySecvice.getFacultiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facilities retrieved successfully',
        data: result
    });
});
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

const updateFacility = catchAsync(async (req, res) => {
    const { id } = req.params
    const payload = req.body;

    const result = await FacilitySecvice.updateFacilityIntoDB(id, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility updated successfully',
        data: result
    });
});

const deleteFacility = catchAsync(async (req, res) => {
    const { id } = req.params

    const result = await FacilitySecvice.deleteFacilityFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facility deleted successfully',
        data: result
    });
});

export const FacilityController = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility
}