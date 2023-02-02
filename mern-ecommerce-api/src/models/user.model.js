import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "LastName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isAdmin: { type: Boolean, default: false },
    addressDetails: [
      {
        name: { type: String },
        phone: { type: Number },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
