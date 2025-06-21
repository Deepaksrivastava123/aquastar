import {
    bcrypt,
    jwt,
    User,
    sendSuccess,
    sendError,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
} from '../utils/import.js';

// Register User
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

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendError(
                res,
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.EMAIL_EXISTS
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
            role,
        });

        await newUser.save();

        return sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.USER_REGISTERED, {
            userId: newUser._id,
        });
    } catch (err) {
        return sendError(
            res,
            HTTP_STATUS.SERVER_ERROR,
            ERROR_MESSAGES.SERVER_ERROR,
            err
        );
    }
};

// Login User
export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        // Check user existence
        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.USER_LOGGED_IN, {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, err);
    }
};