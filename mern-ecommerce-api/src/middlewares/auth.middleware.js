import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ");

      // verify token
      const decoded = jwt.verify(token[1], process.env.JWT_SECRET);

      req.user = await User.findById(decoded.data).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ errMsg: error.message });
    }
  }
  if (!token) {
    return res.status(401).json({ errMsg: "No token provided" });
  }
};
