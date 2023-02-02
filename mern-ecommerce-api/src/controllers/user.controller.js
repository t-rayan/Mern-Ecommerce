import {
  userRegisterValidation,
  userLoginValidation,
} from "../utils/validation.util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register new user
// @route Post /api/users/register
// @access Public
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const { error } = userRegisterValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }
  try {
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      if (user) {
        return res.status(201).json({ msg: "Registration successful" });
      } else {
        return res.status(400).json({ msg: "Invalid user data" });
      }
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// @desc Login registered user
// @route Post /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = userLoginValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;

  if (error) {
    return res.status(400).json({ msg: errMsg });
  }

  try {
    // check for registered email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "no user found" });
    }

    // if user exists
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    // if password match then
    const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });
    return res.status(200).json({
      id: user._id,
      fullname: user.firstname + " " + user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// @desc get loggedin user
// @route get /api/user
// @access Private
export const getCurrentUser = async (req, res) => {
  try {
    const { _id, firstname, lastname, email, addressDetails } =
      await User.findById(req.user);
    res.status(200).json({
      id: _id,
      fullname: firstname + " " + lastname,
      email: email,
      addressDetails: addressDetails,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc get user by id
// @route get /api/user/id
// @access Private
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    console.log(user);
    // res.status(200).json({ firstname });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc get user by id
// @route get /api/user/id
// @access Private
export const updateUserAddress = async (req, res) => {
  const { id } = req.user;
  // if user exists
  if (id) {
    const payload = req.body;
    const { name, phone, address, city, state, zipCode, country } = req.body;
    // if req.body has address id property
    if (payload.hasOwnProperty("addressId")) {
      try {
        const { value } = await User.findByIdAndUpdate(
          { _id: id },
          { $pull: { addressDetails: { _id: req.body.addressId } } },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }
        );

        res.status(200).json({ data: value, msg: "Address removed" });

        // res.status(200).json({ firstname });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } else if (
      name &&
      phone &&
      address &&
      city &&
      state &&
      zipCode &&
      country
    ) {
      try {
        const { value } = await User.findByIdAndUpdate(
          { _id: id },
          { $push: { addressDetails: req.body } },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }
        );

        res.status(200).json({ data: value, msg: "Address added" });

        // res.status(200).json({ firstname });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } else {
      res.status(400).json({ msg: "All fields are required." });
    }
  }
};
