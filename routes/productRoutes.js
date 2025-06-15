import express from "express";
import {
  createProdectController,
  getAllProductsController,
  getSingleProductController,
  getTopProductsController,
  productBulkCreateController,
  productReviewController,
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
// Router object
const router = express.Router();

router.get("/list", getAllProductsController);

// GET TOP PRODUCTS

router.get("/bulkinsert/:category", isAuth, productBulkCreateController);
router.get("/top", getTopProductsController);
router.get("/:id", getSingleProductController);
router.post("/create", isAuth, isAdmin, createProdectController);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);

export default router;
