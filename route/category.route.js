import { express, getAllCategories, addCategory, updateCategory, deleteCategory, protect } from '../utils/import.js';

const router = express.Router();

// Protected Route
router.get('/', protect, getAllCategories);
router.post('/add_category', protect, addCategory);
router.put('/update_category/:id', protect, updateCategory);
router.delete('/delete/:id', protect, deleteCategory);


export default router;