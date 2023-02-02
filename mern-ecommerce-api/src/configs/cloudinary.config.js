import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// const storage = CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "folder name",
//     format: async () => "jpg",
//     public_id: (req, file) => file.filename,
//   },
// });

// const parser = multer({ storage: storage });

export default cloudinary;
