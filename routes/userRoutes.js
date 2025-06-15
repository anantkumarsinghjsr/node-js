import express from "express";

import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileController,
  udpatePasswordController,
  updateProfilePicController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

//router object
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);
router.put("/update-profile", isAuth, updateProfileController);
router.put("/update-password", isAuth, udpatePasswordController);

// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

export default router;
