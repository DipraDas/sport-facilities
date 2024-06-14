import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { TUser } from "../User/user.interface";

const createUser = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await AuthServices.createUserIntoDB(payload);
    const responseData = result.toObject() as TUser;

    const { password, ...responseDataWithoutPassword } = responseData;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: responseDataWithoutPassword,
    });
});
export const AuthController = {
    createUser
}