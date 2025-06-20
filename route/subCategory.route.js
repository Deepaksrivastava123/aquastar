import {
    express,
    getAllSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    protect
} from '../utils/import.js';

const router = express.Router();

router.get('/', protect, getAllSubCategories);
router.post('/add_subcategory', protect, addSubCategory);
router.put('/update_subcategory/:id', protect, updateSubCategory);
router.delete('/delete_subcategory/:id', protect, deleteSubCategory);

export default router;