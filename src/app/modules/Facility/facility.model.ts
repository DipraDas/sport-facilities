import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";


const facility = new Schema<TFacility>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { versionKey: false }
)

facility.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Facility = model<TFacility>('Facility', facility);