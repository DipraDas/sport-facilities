/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const getFacultiesFromDB = async () => {
    try {
        const allFaculty = await Facility.find()
        return allFaculty;

    } catch (err: any) {
        throw new Error(err);
    }
};

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
const updateFacilityIntoDB = async (
    id: string,
    payload: Partial<TFacility>
) => {
    try {
        const isFacility = await Facility.findById(id)

        if (!isFacility) {
            throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available.')
        }

        if (isFacility.isDeleted) {
            throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available.')
        }

        const result = await Facility.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true
            }
        );

        return result;

    } catch (err: any) {
        throw new Error(err);
    }
};

const deleteFacilityFromDB = async (
    id: string
) => {
    try {
        const isFacility = await Facility.findById(id)

        if (!isFacility) {
            throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available.')
        }

        if (isFacility.isDeleted) {
            throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available.')
        }

        const result = await Facility.findByIdAndDelete(id);

        return result;

    } catch (err: any) {
        throw new Error(err);
    }
};

export const FacilitySecvice = {
    getFacultiesFromDB,
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
}