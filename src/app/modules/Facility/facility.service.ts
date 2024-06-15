import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    try {
        const isFacility = await Facility.findOne({ email: payload.name })
        if (isFacility) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Faculy available with this name.')
        }

        const newFacility = await Facility.create(payload);
        if (!newFacility) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new facility.');
        }
        return newFacility;

    } catch (err: any) {
        throw new Error(err);
    }
};

export const FacilitySecvice = {
    createFacilityIntoDB
}