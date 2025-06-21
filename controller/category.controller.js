import {
    Category,
    sendSuccess,
    sendError,
    HTTP_STATUS,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
} from '../utils/import.js';

// ✅ Get All Categories
export const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            SUCCESS_MESSAGES.CATEGORIES_FETCHED_SUCCESSFULLY,
            categories
        );
    } catch (error) {
        return sendError(
            res,
            HTTP_STATUS.SERVER_ERROR,
            ERROR_MESSAGES.SERVER_ERROR,
            error.message
        );
    }
};

// ✅ Add New Category
export const addCategory = async(req, res) => {
    const { name, description } = req.body;

    try {
        if (!name || !description) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        const existingName = await Category.findOne({ name });
        if (existingName) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CATRGORY_ALREADY_EXISTS);
        }

        const category = new Category({ name, description });
        await category.save();

        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            SUCCESS_MESSAGES.CATEGORY_ADDED_SUCCESSFULLY,
            category
        );
    } catch (error) {
        return sendError(
            res,
            HTTP_STATUS.SERVER_ERROR,
            ERROR_MESSAGES.SERVER_ERROR,
            error.message
        );
    }
};

// ✅ Update Category
export const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        if (!name || !description) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        const category = await Category.findById(id);
        if (!category) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CATEGORY_NOT_FOUND);
        }

        const duplicateCategory = await Category.findOne({ name });
        if (duplicateCategory && duplicateCategory._id.toString() !== id) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CATRGORY_ALREADY_EXISTS);
        }

        category.name = name;
        category.description = description;
        await category.save();

        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            SUCCESS_MESSAGES.CATEGORY_UPDATED_SUCCESSFULLY || 'Category updated successfully',
            category
        );
    } catch (err) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, err.message);
    }
};

// ✅ Delete Category
export const deleteCategory = async(req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CATEGORY_NOT_FOUND);
        }

        await category.deleteOne(); // or category.remove()

        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            SUCCESS_MESSAGES.CATEGORY_DELETED_SUCCESSFULLY, { id: category._id }
        );
    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error.message);
    }
};