import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

export const getAllProductsController = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    const products = await productModel
      .find({
        title: {
          $regex: keyword ? keyword : "",
          $options: "i",
        },
        // category: category ? category : null,
      })
      .populate("category", "name slug");
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Products API",
      error,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    // get product id
    const product = await productModel.findById(req.params.id);
    //valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get single Products API",
      error,
    });
  }
};

// GET TOP PRODUCT
export const getTopProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).send({
      success: true,
      message: "top 3 products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get TOP PRODUCTS API",
      error,
    });
  }
};

export const createProdectController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
      meta,
      reviews,
      images,
    } = req.body;
    // // validtion
    // if (!name || !description || !price || !stock) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Please Provide all fields",
    //   });
    // }
    const productList = await productModel.find(
      { title },
      { _id: 0, title: 1 }
    );
    if (productList.length > 0) {
      return res.status(201).send({
        success: true,
        message: "Product is alreday avalable!",
        count: productList,
      });
    }
    const categoryList = await categoryModel.find(
      { slug: category },
      { slug: 1, name: 1 }
    );
    if (categoryList.length === 0) {
      return res.status(404).send({
        success: true,
        message: "Invalid Category!",
        category: categoryList,
      });
    }
    let categoryId = categoryList[0]._id;
    await productModel.create({
      title: title,
      description: description,
      price: price,
      category: categoryId,
      discountPercentage: discountPercentage,
      rating: rating,
      stock: stock,
      tags: tags,
      brand: brand,
      sku: sku,
      weight: weight,
      warrantyInformation: warrantyInformation,
      shippingInformation: shippingInformation,
      availabilityStatus: availabilityStatus,
      returnPolicy: returnPolicy,
      minimumOrderQuantity: minimumOrderQuantity,
      thumbnail: thumbnail,
      meta: meta,
      images: images,
    });

    res.status(201).send({
      success: true,
      message: "product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get single Products API",
      error,
    });
  }
};

// CREATE PRODUCT REVIEW AND COMMENT
export const productReviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const product = await productModel.findById(req.params.id);
    // check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product Alredy Reviewed",
        alreadyReviewed,
        body: req.user,
      });
    }
    // review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to reviews array
    product.reviews.push(review);
    // number or reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Review Comment API",
      error,
    });
  }
};
