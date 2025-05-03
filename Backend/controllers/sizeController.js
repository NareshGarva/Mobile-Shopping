const Size = require('../models/size');
const Product = require('../models/product');

// Add sizes for a product
exports.addSizes = async (req, res) => {
    const { productId, sizes } = req.body;

    try {
        // Check if product exists
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Flatten the sizes object into an array of { type, value }
        const sizeEntries = [];
        for (const [type, values] of Object.entries(sizes)) {
            values.forEach(value => {
                sizeEntries.push({ productId, type, value });
            });
        }

        // Bulk insert sizes
        const createdSizes = await Size.bulkCreate(sizeEntries);
        res.status(201).json({ message: "Sizes added successfully", sizes: createdSizes });

    } catch (error) {
        console.error("Error adding sizes:", error);
        res.status(500).json({ message: "Failed to add sizes" });
    }
};

// Get sizes for a product
exports.getSizesByProductId = async (req, res) => {
    const { productId } = req.body;

    try {
        const sizes = await Size.findAll({ where: { productId } });

        if (!sizes.length) return res.status(404).json({ message: "No sizes found for this product" });

        // Group sizes by type (RAM, Storage, etc.)
        const grouped = sizes.reduce((acc, item) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type].push(item.value);
            return acc;
        }, {});

        res.json({ message: "Sizes fetched successfully", sizes: grouped });
    } catch (error) {
        console.error("Error fetching sizes:", error);
        res.status(500).json({ message: "Failed to fetch sizes" });
    }
};
