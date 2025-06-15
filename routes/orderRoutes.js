import express from "express";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  createOrderController,
  getMyOrdersCotroller,
  singleOrderDetrailsController,
  paymetsController,
  getAllOrdersController,
  changeOrderStatusController,
} from "../controllers/orderController.js";
// Router Object

const router = express.Router();

router.post("/create", isAuth, createOrderController);
router.get("/list", isAuth, getMyOrdersCotroller);
//  GET SINGLE ORDER DETAILS
router.get("/my-orders/:id", isAuth, singleOrderDetrailsController);

// acceipt payments
router.post("/payments", isAuth, paymetsController);

router.get("/admin-all-order", isAuth, isAdmin, getAllOrdersController);
router.put(
  "/update-order-status/:id",
  isAuth,
  isAdmin,
  changeOrderStatusController
);

export default router;
