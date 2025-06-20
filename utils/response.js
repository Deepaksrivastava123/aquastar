export const sendSuccess = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data
    });
};

export const sendError = (res, statusCode, message, error = null) => {
    return res.status(statusCode).json({
        status: "error",
        message,
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
};