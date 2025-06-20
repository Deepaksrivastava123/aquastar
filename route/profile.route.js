import { express, updateProfile, protect } from '../utils/import.js';

const router = express.Router();

router.put('/update_profile', protect, updateProfile);

export default router;