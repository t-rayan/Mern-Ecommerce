import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    inventory: {
      type: Number,
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    desc: {
      type: String,
    },
    thumbnail: {
      img_url: String,
      pub_id: String,
    },
    images: [
      {
        img_url: String,
        pub_id: String,
      },
    ],
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
    },
    brand: {
      ref: "Brand",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestaps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
