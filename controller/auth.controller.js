import { bcrypt, jwt, User, sendSuccess, sendError, HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/import.js';


//User Registration
export const register = async(req, res) => {
    const { name, email, password, mobile, role } = req.body;

    try {
        // Validate input
        if (!name || !email || !password || !mobile) {
            return sendError(
                res,
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.REQUIRED_FIELDS
            );
        }

        // Validation for existing user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return sendError(
                res,
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.EMAIL_EXISTS
            );
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        return sendSuccess(
            res,
            HTTP_STATUS.CREATED,
            SUCCESS_MESSAGES.USER_REGISTERED, { userId: newUser.id }
        );
    } catch (err) {
        return sendError(
            res,
            HTTP_STATUS.SERVER_ERROR,
            ERROR_MESSAGES.SERVER_ERROR,
            err
        );
    }
};

//login
export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        //validate fields
        if (!email || !password) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        //check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        //match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        //generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1hr"

        });

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.USER_LOGGED_IN, {
            "user": {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            },
            token: token
        })
    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, err);
    }

};