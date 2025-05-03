// initAssociations.js
const Product = require('./product');
const ProductColor = require('./productColors');
const ProductSize = require('./productSize');
const ProductSpecification = require('./productSpecification');
const ProductImage = require('./productImage');

// Define associations
Product.hasMany(ProductColor, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(ProductSize, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(ProductSpecification, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE' });

ProductColor.belongsTo(Product, { foreignKey: 'productId' });
ProductSize.belongsTo(Product, { foreignKey: 'productId' });
ProductSpecification.belongsTo(Product, { foreignKey: 'productId' });
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  Product,
  ProductColor,
  ProductSize,
  ProductSpecification,
  ProductImage
};
