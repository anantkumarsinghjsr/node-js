import express from "express";

import testRouters from "./testRouters.js";
import userRouters from "./userRoutes.js";
import categoryRouters from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
// Router object
const routers = express.Router();

routers.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcom to ecommerce Welcom</h1>");
});

routers.use("/api/v1", testRouters);
routers.use("/api/v1/user", userRouters);
routers.use("/api/v1/category", categoryRouters);

routers.use("/api/v1/product", productRoutes);

routers.use("/api/v1/order", orderRoutes);
export default routers;
