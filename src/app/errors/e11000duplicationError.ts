import { TGenericErrorResponse } from "../interface/error";

const e11000duplicationError = (err: any): TGenericErrorResponse => {


    const duplicateKeyErrorDetails = err.message.match(/E11000 duplicate key error collection: (\S+) index: (\S+) dup key: (.+)/);
    const regex = /"([^"]+?)"/;

    const [, collection, index, keyValue] = duplicateKeyErrorDetails;
    const matchRegex = keyValue.match(regex);
    const duplicateValue = matchRegex[1];
    const statusCode = 409; // Conflict
    const message = `Duplicate key error: ${duplicateValue}`;
    const errorSources = [
        {
            path: collection,
            message: `Duplicate key error on index ${index}: ${duplicateValue}`
        }
    ];
    return {
        statusCode,
        message: message,
        errorSources,
    };
};

export default e11000duplicationError;