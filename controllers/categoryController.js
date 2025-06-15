import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug, url } = req.body;
    if (!name || !slug || !url) {
      return res.status(500).send({
        success: false,
        message: "All filed is required",
      });
    }

    const checkCategory = await categoryModel.findOne({ name });
    if (checkCategory) {
      return res.status(201).send({
        success: false,
        message: "Category all ready exists!",
      });
    }
    const category = categoryModel.create({ name, slug, url });
    (await category).save();
    return res.status(200).send({
      success: true,
      message: "New Category is saved successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In update category create API",
      error,
    });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const categoryList = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "Success",
      result: categoryList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In update category  API",
      error,
    });
  }
};

// DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
  try {
    // find category
    const category = await categoryModel.findById(req.params.id);
    //validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    // find product with this category id
    const products = await productModel.find({ category: category._id });
    // update producty category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = undefined;
      await product.save();
    }
    // save
    await category.deleteOne();
    res.status(200).send({
      success: true,
      message: "Catgeory Deleted Successfully",
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
      message: "Error In DELETE CAT API",
      error,
    });
  }
};

// UDPATE CAT
export const updateCategoryController = async (req, res) => {
  try {
    // find category
    const name = await categoryModel.findById(req.params.id);
    //validation
    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    // get new cat
    const { updatedCategory } = req.body;
    // find product with this category id
    const products = await productModel.find({ category: category._id });
    // update producty category
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.category = updatedCategory;
      await product.save();
    }
    if (updatedCategory) category.name = updatedCategory;

    // save
    await category.save();
    res.status(200).send({
      success: true,
      message: "Catgeory Updated Successfully",
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
      message: "Error In UPDATE CATEGPORY API",
      error,
    });
  }
};
