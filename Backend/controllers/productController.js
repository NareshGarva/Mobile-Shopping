const { Product, ProductColor, ProductSize, ProductSpecification, ProductImage } = require('../models/initAssociations');





// Create Product with related data
exports.createProduct = async (req, res) => {
    try {
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
  
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error('Create Product Error:', error);
      res.status(500).json({ message: 'Server error', error });
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





// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(updateData);

        res.status(200).json({ message: 'Product updated', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};






// Delete Product and its related data
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await ProductColor.destroy({ where: { productId: id } });
        await ProductSize.destroy({ where: { productId: id } });
        await ProductSpecification.destroy({ where: { productId: id } });
        await ProductImage.destroy({ where: { productId: id } });

        const rowsDeleted = await Product.destroy({ where: { id } });

        if (!rowsDeleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
