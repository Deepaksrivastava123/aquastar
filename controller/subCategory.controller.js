import {
    Subcategory,
    Category,
    sendSuccess,
    sendError,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
} from '../utils/import.js';

export const getAllSubCategories = async(req, res) => {
    try {
        const subCategories = await Subcategory.findAll({
            include: {
                model: Category
            }
        });
        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.SUBCATEGORIES_FETCHED_SUCCESSFULLY, subCategories);
    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error);
    }
};

export const addSubCategory = async(req, res) => {
    const { name, description, category_id } = req.body;

    try {
        if (!name || !category_id) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        // Check if category exists
        const category = await Category.findByPk(category_id);
        if (!category) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CATEGORY_NOT_FOUND);
        }

        // Optional: Check duplicate subcategory name
        const existing = await Subcategory.findOne({ where: { name, category_id } });
        if (existing) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SUBCATEGORY_ALREADY_EXISTS);
        }

        const newSubCategory = await Subcategory.create({ name, description, category_id });

        return sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.SUBCATEGORY_ADDED_SUCCESSFULLY, newSubCategory);

    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error.message);
    }
};

export const updateSubCategory = async(req, res) => {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    try {
        const subcategory = await Subcategory.findByPk(id);
        if (!subcategory) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.SUBCATEGORY_NOT_FOUND);
        }

        if (!name || !category_id) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REQUIRED_FIELDS);
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return sendError(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CATEGORY_NOT_FOUND);
        }

        subcategory.name = name;
        subcategory.description = description;
        subcategory.category_id = category_id;

        await subcategory.save();

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.SUBCATEGORY_UPDATED_SUCCESSFULLY, subcategory);
    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error.message);
    }
};

export const deleteSubCategory = async(req, res) => {
    const { id } = req.params;

    try {
        const subcategory = await Subcategory.findByPk(id);
        if (!subcategory) {
            return sendError(res, HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.SUBCATEGORY_NOT_FOUND);
        }

        await subcategory.destroy();

        return sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.SUBCATEGORY_DELETED_SUCCESSFULLY);
    } catch (error) {
        return sendError(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, error.message);
    }
};