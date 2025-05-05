const Category = require("../models/category");

// category creation controller
exports.createCategory = async (req, res) => {
  //check if body is provided or not
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Please provide the category body" });
  }

  //get the category name and status from body
  let { categoryName, categoryStatus } = req.body;


  // create the category in try block to hendle errors
  try {
   
    //category creation code
    const category = await Category.create({ categoryName, categoryStatus });

    //check the category created or not
    if (!category) {
      //return if the category is not created
      return res.status(500).json({ message: "Category creation failed" });
    }

    //if category created sucessfully the responce
    console.log("Category created sucessfuly");
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.log("Error in category creation : ", error);
    return res.status(500).json({ message: "Error in category creation" });
  }
};

// Get All Products with related data
exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};



// Category update controller
exports.updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { categoryName, categoryStatus } = req.body;

  // Input validation
  if (!categoryName || !categoryStatus) {
    return res.status(400).json({ message: 'Please provide both category name and status' });
  }

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.categoryName = categoryName;
    category.categoryStatus = categoryStatus;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Get Single Product by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const category = await Category.findByPk(id);
  console.log(category);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
  
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
  };

  


// Delete Product and its related data
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch product and its images
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Delete main product
    await Category.destroy({ where: { id } });
  res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category", error });
  }
};
