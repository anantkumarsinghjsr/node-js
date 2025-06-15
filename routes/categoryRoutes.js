import express from "express";
import { createCategory, getAllCategoriesController } from "../controllers/categoryController.js";

//Routers object

const router = express.Router();

// Create category

router.post("/save",createCategory);
router.get("/list",getAllCategoriesController);

export default router;