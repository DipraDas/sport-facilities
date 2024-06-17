import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/appError";
import e11000duplicationError from "../errors/e11000duplicationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // Setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';

    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];

    const setSimplifiedError = (simplifiedError: any) => {
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    if (err instanceof ZodError) {
        setSimplifiedError(handleZodError(err));
    } else if (err?.name === 'ValidationError') {
        setSimplifiedError(handleValidationError(err));
    } else if (err?.name === "CastError") {
        setSimplifiedError(handleCastError(err));
    } else if (err?.code === 11000) {
        setSimplifiedError(handleDuplicateError(err));
    } else if (err.message && err.message.includes('E11000 duplicate key error')) {
        setSimplifiedError(e11000duplicationError(err));
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : 'null'
    });
}

export default globalErrorHandler;
