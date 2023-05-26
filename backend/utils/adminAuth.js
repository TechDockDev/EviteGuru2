import jwt from "jsonwebtoken";
import Admin from "../models/adminModels";
const adminAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (req.admin) {
        req.admin = await Admin.findById(decoded.id);
      }
      next();
    } catch (error) {
      console.error(error);
      throw new Error("Not authorized, token failed");
    }
  } else {
    throw new Error("No token found");
  }
});

export default adminAuth;
