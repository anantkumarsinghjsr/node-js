import mongoose from "mongoose";

// REVIEW MODAL
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user require"],
    },
  },
  { timestamps: true }
);
const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "product title is required"],
    },
    description: {
      type: String,
      required: [true, "produvct description is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    stock: {
      type: Number,
      required: [true, "product stock required"],
    },
    // quantity: {
    //   type: Number,
    //   required: [true, "product quantity required"],
    // },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images:  {
        type: String
    }, 
    rating: {
      type: Number,
      default: 0,
    },
    brand:{
        type: String
    },
    reviews: [reviewSchema],
    sku:{
        type: String
    },
     weight:{
        type: String
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags:{
        type: Array
    }, 
    warrantyInformation:{
        type: String
    },
    shippingInformation:{
        type: String
    },
    availabilityStatus:{
        type: String
    },    
    returnPolicy:{
        type: String
    },
    minimumOrderQuantity:{
        type: String
    },
    meta:{
        createdAt: {
        type: Date,
        },
        updatedAt: {
        type: Date
        },
        barcode: {
            type: String,
        },
        qrCode: {
            type: String,
        }
    },
    images:{
        type: Array
    },
    thumbnail:{
        type: String
    },
},{timestamps:true});

const productModel = mongoose.model("Product",productSchema);
export default productModel;