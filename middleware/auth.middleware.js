import { sendError, HTTP_STATUS, ERROR_MESSAGES, jwt, User } from '../utils/import.js';

export const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendError(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.TOKEN_MISSING || 'Not authorized, token missing'
        );
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optional: Fetch user from DB and attach full user object
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'User no longer exists');
        }

        req.user = user; // attach full user object to request
        next();
    } catch (err) {
        return sendError(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN || 'Invalid or expired token',
            err
        );
    }
};