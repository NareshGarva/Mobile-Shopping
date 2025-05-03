const Color = require('../models/colors');
const Product = require('../models/product');

// Add multiple colors for a product
exports.addColors = async (req, res) => {
    const { productId, colors } = req.body;
console.log(req.body);
    try {
        // Check if the product exists
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create color entries
        const createdColors = await Promise.all(
            colors.map(color => Color.create({ productId, value: color }))
        );

        res.status(201).json({ message: "Colors added successfully", colors: createdColors });
    } catch (error) {
        console.error("Error adding colors:", error);
        res.status(500).json({ message: "Can't add colors" });
    }
};

// Get colors for a specific product
exports.getColorsByProductId = async (req, res) => {
    const { productId } = req.body;

    try {
        const colors = await Color.findAll({ where: { productId } });
        if (!colors.length) return res.status(404).json({ message: "No colors found for this product" });

        res.json({ message: "Colors fetched successfully", colors });
    } catch (error) {
        console.error("Error fetching colors:", error);
        res.status(500).json({ message: "Can't fetch colors" });
    }
};
