import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await UserServices.createAdminIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});


export const UserControllers = {
    createAdmin
}