import { createCategoryValidation } from "../utils/validation.util.js";
import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 4;

  const skip = (page - 1) * size; //skip = (3 -1)* 2 =4

  const searchQuery = req.query.q || "";
  const regex = new RegExp(searchQuery, "i");

  let query = {};

  if (searchQuery !== "null") {
    query.name = { $regex: regex };
  }

  try {
    const categories = await Category.find(query).skip(skip).limit(size);
    const count = await Category.countDocuments({});

    const totalPages = Math.ceil(count / size); // totalPages = Math.ceil(10/2)=

    if (categories) {
      // return res.status(200).json({
      //   categories: categories,
      //   totalPages: totalPages,
      // });

      res.status(200).json({
        categories: categories,
        pagination: {
          page,
          size,
          totalPages,
          totalElements: count,
        },
      });
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
