const { Product, ProductColor, ProductSize, ProductSpecification, ProductImage } = require('../models/initAssociations');
const { deleteFromCloudinary } = require('../utils/deleteFromCloudinary.Util'); 




// Create Product with related data
exports.createProduct = async (req, res) => {
    
      if (!req.body) {
        return res.status(400).json({ message: 'Please provide product data' });
      }
  
      // Destructure and parse fields from req.body
      const {
        productTitle,
        productDescription,
        originalPrice,
        sellingPrice,
        category,
        stock,
        warranty,
        mainImage
      } = req.body;
  
      const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
      const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : {};
      const specifications = req.body.specifications ? JSON.parse(req.body.specifications) : {};
      const casualImages = Array.isArray(req.body.casualImages)
        ? req.body.casualImages
        : typeof req.body.casualImages === 'string'
        ? [req.body.casualImages]
        : [];
        try {
      // Create main product
      const product = await Product.create({
        productTitle,
        productDescription,
        originalPrice,
        sellingPrice,
        category,
        stock,
        warranty,
        mainImage
      });
  
      if (!product) {
        return res.status(500).json({ message: 'Product creation failed' });
      }
  
      // Insert related colors
      if (Array.isArray(colors)) {
        for (const color of colors) {
          await ProductColor.create({ productId: product.id, colorValue: color });
        }
      }
  
      // Insert sizes
      if (sizes && typeof sizes === 'object') {
        for (const [type, value] of Object.entries(sizes)) {
          await ProductSize.create({ productId: product.id, type, value });
        }
      }
  
      // Insert specifications
      if (specifications && typeof specifications === 'object') {
        for (const [key, value] of Object.entries(specifications)) {
          await ProductSpecification.create({ productId: product.id, specKey: key, specValue: value });
        }
      }
  
      // Insert casual images
      if (casualImages.length > 0) {
        for (const imageUrl of casualImages) {
          await ProductImage.create({ productId: product.id, imageUrl });
        }
      }
  console.log('Product created successfully:', product);
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error('Create Product Error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };


  exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByPk(id, {
        include: [ProductColor, ProductSize, ProductSpecification, ProductImage],
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Destructure updated values
      const {
        productTitle,
        productDescription,
        originalPrice,
        sellingPrice,
        category,
        stock,
        warranty,
      } = req.body;
  
      const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
      const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : {};
      const specifications = req.body.specifications ? JSON.parse(req.body.specifications) : {};
      const casualImages = Array.isArray(req.body.casualImages)
        ? req.body.casualImages
        : typeof req.body.casualImages === 'string'
        ? [req.body.casualImages]
        : [];
  
      const productDetailsUP = {
        productTitle,
        productDescription,
        originalPrice,
        sellingPrice,
        category,
        stock,
        warranty,
      };
  
      // 🔁 Update main image if provided
      if (req.files?.mainImage?.[0]) {
        if (product.mainImage) await deleteFromCloudinary(product.mainImage);
  
        productDetailsUP.mainImage =
          req.files.mainImage[0].secure_url ||
          req.files.mainImage[0].cloudinaryUrl ||
          req.files.mainImage[0].pathOnCloudinary;
      }
  
      // 🔁 Update casual images
      if (req.files?.casualImages?.length > 0) {
        // Delete old images
        for (const img of product.ProductImages) {
          await deleteFromCloudinary(img.imageUrl);
        }
        await ProductImage.destroy({ where: { productId: product.id } });
  
        // Insert new casual images
        for (const imageUrl of casualImages) {
          await ProductImage.create({ productId: product.id, imageUrl });
        }
      }
  
      // 🔁 Update colors
      await ProductColor.destroy({ where: { productId: product.id } });
      for (const color of colors) {
        await ProductColor.create({ productId: product.id, colorValue: color });
      }
  
      // 🔁 Update sizes
      await ProductSize.destroy({ where: { productId: product.id } });
      for (const [type, value] of Object.entries(sizes)) {
        await ProductSize.create({ productId: product.id, type, value });
      }
  
      // 🔁 Update specifications
      await ProductSpecification.destroy({ where: { productId: product.id } });
      for (const [key, value] of Object.entries(specifications)) {
        await ProductSpecification.create({ productId: product.id, specKey: key, specValue: value });
      }
  
      // 🔁 Final product table update
      await product.update(productDetailsUP);
  
      res.status(200).json({ message: 'Product updated successfully', product });
    console.log('Product updated successfully:', product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product', error });
    }
  };
  






// Get All Products with related data
exports.getAllProducts = async (req, res) => {
  try {
      const products = await Product.findAll({
          include: [ProductColor, ProductSize, ProductSpecification, ProductImage]
      });
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
  }
};







// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
          include: [ProductColor, ProductSize, ProductSpecification, ProductImage]
      });

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error });
  }
};





// Delete Product and its related data
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting product with ID:', id);

    // Fetch product and its images
    const product = await Product.findByPk(id, {
      include: [ProductImage]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete main image from Cloudinary
    if (product.mainImage) {
      await deleteFromCloudinary(product.mainImage);
    }

    // Delete casual images from Cloudinary
    if (product.ProductImages && product.ProductImages.length > 0) {
      for (const img of product.ProductImages) {
        await deleteFromCloudinary(img.imageUrl);
      }
    }

   

    // Delete main product
    await Product.destroy({ where: { id } });
console.log("product deleted");
    res.status(200).json({ message: 'Product and its images deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

