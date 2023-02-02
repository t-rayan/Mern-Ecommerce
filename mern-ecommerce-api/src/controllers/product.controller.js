import mongoose from "mongoose";
import cloudinary from "../configs/cloudinary.config.js";
import Product from "../models/product.model.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../utils/validation.util.js";

export const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category || "All";
    const brand = req.query.brand || null;
    const minPrice = parseInt(req.query.minPrice) || null;
    const maxPrice = parseInt(req.query.maxPrice) || null;

    let query = {};
    if (req.query.brand) {
      query.category = req.query.brand;
    }
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    } else if (req.query.maxPrice) {
      query.price = { $lte: req.query.maxPrice };
    }

    const products = await Product.find(query).populate({
      path: "category",
      select: "name -_id",
    });

    if (products) {
      return res.status(200).json({ products });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  // with pagination
  // try {
  //   let query = Product.find();
  //   const page = parseInt(req.query.page) || 1;
  //   const pageSize = parseInt(req.query.limit) || 2;
  //   const skip = (page - 1) * pageSize;
  //   const total = await Product.countDocuments();

  //   const pages = Math.ceil(total / pageSize);

  //   query = query
  //     .populate({
  //       path: "category",
  //       select: "name -_id",
  //     })
  //     .skip(skip)
  //     .limit(pageSize);

  //   if (page > pages) {
  //     return res.status(404).json({
  //       status: "fail",
  //       message: "No page found",
  //     });
  //   }

  //   const result = await query;

  //   res.status(200).json({
  //     status: "success",
  //     count: result.length,
  //     page,
  //     pages,
  //     data: result,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const searchProducts = async (req, res) => {
  const { q } = req.query;

  try {
    const products =
      q &&
      (await Product.find({ name: { $regex: q, $options: "$i" } }).populate({
        path: "category",
        select: "name -_id",
      }));
    if (products) {
      return res.status(200).json({ products });
    }
    return res.status(400).json({ msg: "No search results" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, inventory, price, size, color, category, desc, imgs } =
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
    console.log(error.message);
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
    const product = await Product.findOne({ _id: id }).populate({
      path: "category",
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
  const { name, inventory, price, size, color, desc, category } = req.body;
  let newImages = req.files?.imgs;

  const imagesToUpload = generateImgArray(newImages);
  const rawProductData = {
    name,
    inventory,
    price,
    size,
    color,
    desc,
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
