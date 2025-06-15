import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
import helmet from "helmet";

// dot env config
dotenv.config();

//database connection
connectDB();

//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// rest object
const app = express();

//middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes imports
import appRoutes from "./routes/index.js";
app.use("/", appRoutes);

// port
const PORT = process.env.PORT || 8080;
// listen
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running On PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`
      .bgMagenta.white
  );
});
