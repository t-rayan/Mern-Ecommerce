import { createCategoryValidation } from "../utils/validation.util.js";
import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) {
      return res.status(200).json({ categories });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Name is required." });
  }
  try {
    // check if category already exists
    const categoryExists = await Category.find({ name });
    if (categoryExists.length > 0) {
      return res.status(400).json({ msg: "Category already exists" });
    } else {
      const category = await Category.create({
        name,
      });
      if (category) {
        return res.status(201).json({ category, msg: "Category created." });
      } else {
        return res.status(400).json({ msg: "Invalid category data" });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Category.findByIdAndDelete({ _id: id });
    if (deleted) {
      return res.status(200).json({ deleted, msg: "Category Removed" });
    } else {
      return res.status(400).json({ msg: "Category not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { error } = createCategoryValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }
  try {
    const category = await Category.findById({ _id: id });
    if (category) {
      category.name = name ? name : category.name;
      const updated = await category.save();
      return res.status(201).json({ msg: "Category Updated", updated });
    } else {
      return res.status(400).json({ msg: "Category not found." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById({ _id: id });
    if (category) {
      return res.status(200).json({ category });
    } else {
      return res.status(400).json({ msg: "Category not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
