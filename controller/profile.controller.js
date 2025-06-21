import {
    User,
    sendSuccess,
    sendError,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/import.js';

export const updateProfile = async(req, res) => {
    const { name, email, mobile } = req.body;

    try {
        const user = await User.findById(req.user.id);

        // Check user existence
        if (!user) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
        }

        // Check if email is being updated and already in use
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== req.user.id) {
                return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
            }
        }

        // Check if mobile is being updated and already in use
        if (mobile && mobile !== user.mobile) {
            const mobileExists = await User.findOne({ mobile });
            if (mobileExists && mobileExists._id.toString() !== req.user.id) {
                return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.MOBILE_NUMBER_ALREADY_IN_USE);
            }
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;

        await user.save();

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.PROFILE_UPDATED_SUCCESSFULLY, {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        });

    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error.message);
    }
};