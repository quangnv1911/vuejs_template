import Category from "../models/Category.js";

const createCategory = async (categoryData) => {
    try {
        return await Category.create(categoryData);
    } catch (error) {
        throw new Error(error);
    }
};

const getAllCategories = async () => {
    try {
        return await Category.find();
    } catch (error) {
        throw new Error(error);
    }
};

const getCategoryById = async (categoryId) => {
    try {
        return await Category.findById(categoryId);
    } catch (error) {
        throw new Error(error);
    }
};

const updateCategory = async (categoryId, categoryData) => {
    try {
        return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteCategory = async (categoryId) => {
    try {
        return await Category.findByIdAndDelete(categoryId);
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}
