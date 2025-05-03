const Specification = require('../models/specification');

// Create a new specification
exports.createSpecification = async (req, res) => {
    try {
        const { productId, display, battery, camera, os } = req.body;

        const specification = await Specification.create({
            productId,
            display,
            battery,
            camera,
            os
        });

        res.status(201).json(specification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create specification', details: error.message });
    }
};

// Get specification by product ID
exports.getSpecificationByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const specification = await Specification.findOne({ where: { productId } });

        if (!specification) {
            return res.status(404).json({ error: 'Specification not found for this product' });
        }

        res.status(200).json(specification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve specification', details: error.message });
    }
};

// Update specification by product ID
exports.updateSpecification = async (req, res) => {
    try {
        const { productId } = req.params;
        const { display, battery, camera, os } = req.body;

        const [updatedRowsCount] = await Specification.update(
            { display, battery, camera, os },
            { where: { productId } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Specification not found or nothing to update' });
        }

        res.status(200).json({ message: 'Specification updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update specification', details: error.message });
    }
};

// Delete specification by product ID
exports.deleteSpecification = async (req, res) => {
    try {
        const { productId } = req.params;

        const deleted = await Specification.destroy({ where: { productId } });

        if (!deleted) {
            return res.status(404).json({ error: 'Specification not found' });
        }

        res.status(200).json({ message: 'Specification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete specification', details: error.message });
    }
};
