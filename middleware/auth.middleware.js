import { sendError, HTTP_STATUS, ERROR_MESSAGES, jwt } from '../utils/import.js';


export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.TOKEN_MISSING || "Not authorized, token missing"
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return sendError(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN || "Invalid or expired token",
            err
        );
    }
};