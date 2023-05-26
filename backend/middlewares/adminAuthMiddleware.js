import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

// controller for checking authorization
const adminAuth = async (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const value = req.headers.cookie.split("bearerToken=")[1];
      let token = value.split(";")[0];
      console.log(token);
      if (!token) {
        res.status(401).json({
          status: "unauthorized",
          message: "you are not logged in ! please log in to get access",
        });
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const currentUser = await Admin.findById(decoded.id);
        if (!currentUser) {
          res.status(404).json({
            status: "not found",
            message: "User not found",
          });
        } else {
          req.admin = currentUser;
          next();
        }
      }
    } else {
      res.status(404).json({ status: "not found", message: "User Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "unauthorized",
      message: "you are not logged in ! please log in to get error access",
    });
  }
};

export { adminAuth };
