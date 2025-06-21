// Core Modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Sequelize Models
import User from '../model/user.model.js';
import Category from '../model/category.model.js';
import Subcategory from '../model/subcategory.model.js';
import Product from '../model/product.model.js';

// Utils
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from './httpResponses.js';
import { sendError, sendSuccess } from './response.js';

// Middleware
import { protect } from '../middleware/auth.middleware.js';

import express from 'express';

//controllers
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../controller/category.controller.js';
import {
    getAllSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory
} from '../controller/subCategory.controller.js';
import { updateProfile } from '../controller/profile.controller.js';
import { register, login } from '../controller/auth.controller.js';

//routes
import authRoutes from '../route/auth.route.js';
import categoryRoutes from '../route/category.route.js';
import profileRoutes from '../route/profile.route.js';
import subCategoryRoutes from '../route/subCategory.route.js';

// Export everything
export {
    bcrypt,
    jwt,

    User,
    Category,
    Subcategory,
    Product,

    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,

    authRoutes,
    categoryRoutes,
    profileRoutes,
    subCategoryRoutes,

    sendError,
    sendSuccess,

    protect,
    express,

    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,

    getAllSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,

    updateProfile,

    register,
    login,
};