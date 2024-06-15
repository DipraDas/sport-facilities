import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            // If the token is sent from the client
            if (!token) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "You have no access to this route",
                });
            }

            const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

            const { role, email } = decoded;

            const user = await User.isUserExistsByCustomId(email);

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.')
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                return res.status(httpStatus.UNAUTHORIZED).json({
                    success: false,
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: "You have no access to this route",
                });
            }
            req.user = decoded as JwtPayload;
            next();

            // Check if the token is valid
        }
    )
}

export default auth;