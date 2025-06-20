export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};
export const ERROR_MESSAGES = {
    REQUIRED_FIELDS: "All fields are required",
    EMAIL_EXISTS: "Email already exists",
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_ALREADY_IN_USE: "Email already exists",
    MOBILE_NUMBER_ALREADY_IN_USE: "Mobile number already exists",
    USER_NOT_FOUND: "User not found",
    TOKEN_MISSING: "Not authorized, token missing",
    CATRGORY_ALREADY_EXISTS: "Category already exists",
    CATEGORY_NOT_FOUND: "Category not found",
    SUBCATEGORY_NOT_FOUND: "Subcategory not found",
    SUBCATEGORY_ALREADY_EXISTS: "Subcategory already exists",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
    SERVER_ERROR: "Server error"
};

export const SUCCESS_MESSAGES = {
    USER_REGISTERED: "User registered successfully",
    USER_LOGGED_IN: "Login successful",
    PROFILE_UPDATED_SUCCESSFULLY: "Profile updated successfully",
    CATEGORIES_FETCHED_SUCCESSFULLY: "Categories fetched successfully",
    CATEGORY_ADDED_SUCCESSFULLY: "Category added successfully",
    CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully",
    CATEGORY_DELETED_SUCCESSFULLY: "Category deleted successfully",
    SUBCATEGORIES_FETCHED_SUCCESSFULLY: "Subcategories fetched successfully",
    SUBCATEGORY_ADDED_SUCCESSFULLY: "Subcategory added successfully",
    SUBCATEGORY_UPDATED_SUCCESSFULLY: "Subcategory updated successfully",
    SUBCATEGORY_DELETED_SUCCESSFULLY: "Subcategory deleted successfully",

};