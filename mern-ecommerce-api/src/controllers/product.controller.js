import mongoose from "mongoose";
import cloudinary from "../configs/cloudinary.config.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";

import {
  createProductValidation,
  updateProductValidation,
} from "../utils/validation.util.js";

export const getAllProductsByCategory = async (req, res) => {
  console.log(req.params);
  const reqCategory = req.params.category || null;
  const reqBrand = req.query?.brand || null;
  const reqSort = req.query.sort !== "null" ? req.query.sort : "asc";
  const reqMinPrice = parseInt(req.query.minPrice) || 0;
  const reqMaxPrice = parseInt(req.query.maxPrice) || 0;

  let query = {};
  let sort = {};
  try {
    if (reqCategory !== null) {
      const category = await Category.findOne({ name: reqCategory });
      query.category = category?._id;

      if (reqBrand !== null) {
        const brand = await Brand.findOne({ name: reqBrand });
        if (brand !== null) query.brand = brand?._id;
      }

      if (reqMinPrice !== 0 && reqMaxPrice !== 0) {
        query.price = {
          $gte: parseInt(req.query?.minPrice),
          $lte: parseInt(req.query?.maxPrice),
        };
      }

      console.log(query);

      if (reqSort === "asc") {
        sort.name = 1;
      } else if (reqSort === "dsc") {
        sort.name = -1;
      } else if (reqSort === "price_asc") {
        sort.price = 1;
      } else if (reqSort === "price_dsc") {
        sort.price = -1;
      }

      if (category !== null) {
        const products = await Product.find(query).sort(sort);
        const totalCount = products.length;
        return res.status(200).json({
          totalCount,
          products,
        });
      }
    } else {
      res.status(400).json({ msg: "Nothing found." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const searchQuery = req.query.q || "";
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 4;

  const skip = (page - 1) * size; //skip = (3 -1)* 2 =4

  const regex = new RegExp(searchQuery, "i");

  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: regex } },
            { "result.name": { $regex: regex } },
          ],
        },
      },
    ]);
    // .skip(skip)
    // .limit(size);

    const count = await Product.countDocuments({});
    const totalPages = Math.ceil(count / size);

    res.status(200).json({
      products: products,
      pagination: {
        page,
        size,
        totalPages,
        totalElements: count,
      },
    });

    // return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, brand, inventory, price, size, color, category, desc, imgs } =
    req.body;
  const addImgs = req.files?.imgs;
  const imagesToUpload = generateImgArray(addImgs);

  // validation
  const { error } = createProductValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }

  // try adding new product
  try {
    const productExists = await Product.find({ name });
    if (productExists.length > 0) {
      return res.status(400).json({ msg: "Product name already exists" });
    } else {
      const imgUrls =
        imagesToUpload.length > 0
          ? await multipleImgUploader(imagesToUpload)
          : [];
      const newProduct = await Product.create({
        name,
        brand,
        inventory,
        price,
        size,
        color,
        category,
        desc,
        images: imgUrls,
      });
      if (newProduct) {
        return res.status(201).json({ msg: "Product added", newProduct });
      }
      return res.status(400).json({ msg: "Invalid product data" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete({ _id: id });
    // deleted && (await cloudinary.uploader.destroy(deleted?.thumbnail?.pub_id));
    if (deleted?.images?.length > 0) {
      for (let i = 0; i < deleted?.images.length; i++) {
        await cloudinary.uploader.destroy(deleted?.images[i]?.pub_id);
      }
    }
    if (deleted) {
      return res.status(200).json({ deleted, msg: "Product Removed" });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id })
      .populate({
        path: "category",
        select: "name _id",
      })
      .populate({
        path: "brand",
        select: "name _id",
      });
    if (product) {
      return res.status(200).json({ product });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, inventory, brand, price, size, color, desc, category } =
    req.body;
  let newImages = req.files?.newImgs;

  const imagesToUpload = generateImgArray(newImages);
  const rawProductData = {
    name,
    inventory,
    price,
    size,
    color,
    desc,
    brand,
    category,
    images: newImages,
  };

  // // validation
  const { error } = updateProductValidation.validate(rawProductData);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }

  try {
    // update using save
    const product = await Product.findById({ _id: id });
    if (product) {
      product.name = name ? name : product.name;
      product.inventory = inventory ? inventory : product.inventory;
      product.price = price ? price : product.price;
      product.size = size ? size : product.size;
      product.color = color ? color : product.color;
      product.desc = desc ? desc : product.desc;
      product.category = category ? category : product.category;

      // setting products images
      const imgUrls =
        imagesToUpload.length > 0
          ? await multipleImgUploader(imagesToUpload)
          : [];

      let savedImgs = product?.images !== null ? product?.images : [];

      let newImgArr = [...imgUrls, ...savedImgs];

      product.images = newImgArr;

      const updated = await product.save();

      return res.status(201).json({ updated, msg: "Product Updated" });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const deleteProductImage = async (req, res) => {
  const { productId, imageId } = req.body;

  try {
    const delImg = await cloudinary.uploader.destroy(imageId);
    if (delImg.result === "ok") {
      const product = await Product.findById(productId).populate("category");
      product.images = product.images.filter((img) => img.pub_id !== imageId);
      const result = await product.save();
      res.status(200).json({ result: result, msg: "Image deleted" });
    } else {
      res.status(200).json({ msg: "Image not found." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// multiple images uploader
const multipleImgUploader = async (imgs) => {
  let imgUrls = [];
  if (imgs.length > 0) {
    for (let i = 0; i < imgs.length; i++) {
      const result = await cloudinary.uploader.upload(imgs[i].tempFilePath, {
        folder: "ecommerce",
      });
      imgUrls.push({ img_url: result?.url, pub_id: result?.public_id });
    }
  }

  return imgUrls;
};

// function to generate image array from req files
function generateImgArray(reqFiles) {
  let processingImgs = [];
  if (reqFiles === undefined) {
    return processingImgs;
  } else {
    let isArray = Array.isArray(reqFiles);
    if (!isArray) {
      processingImgs.push(reqFiles);
      return processingImgs;
    } else {
      return reqFiles;
    }
  }
}
