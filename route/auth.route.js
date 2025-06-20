import { express, register, login } from '../utils/import.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', register);
router.post('/login', login);

export default router;