import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
// Custom Response Handler Middleware
export const customResponseHandler = (req: Request, res: any, next: NextFunction) => {
    // Add a new method to the response object to send custom responses
    res.successResponse = (data: any, message: string = 'Success', status: number = 200) => {
        return res.status(status).json({
            status: 'success',
            success: true,
            message,
            ...data
        });
    };

    res.validationError = (errors: [any], message: string = 'form validation  errors', status: number = 403) => {
        let errorResponse: any = {}
        errors.forEach((error) => {
            errorResponse[error.path] = error.msg;
        });
        return res.status(status).json({
            status: 'failed',
            success: false,
            errors: errorResponse,
            message,
        });
    };

    // Add a new method to the response object to send error responses
    res.errorResponse = (message: string = 'Internal Server Error', status: number = 500) => {
        return res.status(status).json({
            status: 'failed',
            success: false,
            message,
        });
    };
    next();
};


export function routeErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error('Error:', err.stack);

    // Customize the error response based on the error type or status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: err.message || 'Internal Server Error' });
}


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'failed',
        success: false,
        message: "Route not found",
    })
}



