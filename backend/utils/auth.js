import jwt from "jsonwebtoken";
import User from "../models/userModel";
import userGooglefbs from "../models/userGoogleFbSchema";
const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (req.user) {
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        req.user = await userGooglefbs.findById(decoded.id);
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

export default auth;
