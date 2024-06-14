import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";

const createAdmin = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await UserServices.createAdminIntoDB(payload);
    const responseData = result.toObject() as TUser;

    const { password, ...responseDataWithoutPassword } = responseData;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: responseDataWithoutPassword,
    });
});

export const UserControllers = {
    createAdmin
}