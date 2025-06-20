import { User, sendSuccess, sendError, HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/import.js';


export const updateProfile = async(req, res) => {
    const { name, email, mobile } = req.body;

    try {
        const user = await User.findByPk(req.user.id)

        //check user
        if (!user) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
        }

        //check new email not exists in db
        if (email && email != user.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
            }
        }

        //check new mobile number not existst in db
        if (mobile && mobile != user.mobile) {
            const mobileExists = await User.findOne({ where: { mobile } });
            if (mobileExists) {
                return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.MOBILE_NUMBER_ALREADY_IN_USE);
            }
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        await user.save();

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.PROFILE_UPDATED_SUCCESSFULLY, {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        });

    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, err);

    }
};