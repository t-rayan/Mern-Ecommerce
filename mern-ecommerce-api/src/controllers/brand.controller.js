import Brand from "../models/brand.model.js";

// controller to create a new brand
export const addNewBrand = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Name is required." });
  }
  try {
    // check if brand name is already exists
    const isBrandExists = await Brand.find({ name });
    if (isBrandExists.length > 0) {
      return res.status(400).json({ msg: "Brand already exists" });
    } else {
      const newBrand = await Brand.create({
        name,
      });
      if (newBrand) {
        return res.status(201).json({ newBrand, msg: "Brand created." });
      } else {
        return res.status(400).json({ msg: "Invalid brand data" });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller to get all brand names
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (brands) {
      return res.status(200).json({ brands });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
