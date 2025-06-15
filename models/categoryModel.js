import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name  is required"],
    },
    slug: {
      type: String,
      required: [true, "slug  is required"],
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
