const Product = require('./product');
const ProductColor = require('./productColors');
const ProductSize = require('./productSize');
const ProductSpecification = require('./productSpecification');
const ProductImage = require('./productImage');
const Category = require('./category');
const cartProducts = require('./cartProducts');
const cartVarient = require('./cartVarient');
const User = require('./user');
const userAddress = require('./userAddress');
const Order = require('./order');
const OrderItems = require('./orderItems');
const OrderTimeline = require('./orderTimeline');
const OrderItemsVarient = require('./orderItemVarient');
const shippingAddress = require('./shippingAddress');
const billingAddress = require('./billingAddress');
const productReviews = require('./productReview');


// ---------------------
// cartProducts ↔ cartVarient
// ---------------------
OrderItems.hasMany(OrderItemsVarient, {
  foreignKey: 'orderItemId',
  onDelete: 'CASCADE',
});
OrderItemsVarient.belongsTo(OrderItems, {
  foreignKey: 'orderItemId',
});

// ---------------------
// User ↔ Order
// ---------------------
User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Order.belongsTo(User, {
  foreignKey: 'userId',
});


// ---------------------
// Order ↔ Items
// ---------------------
Order.hasMany(OrderItems, {
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
});
OrderItems.belongsTo(Order, {
  foreignKey: 'orderId',
});


// ---------------------
// Order ↔ OrderTimeline
// ---------------------
Order.hasMany(OrderTimeline, {
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
});
OrderTimeline.belongsTo(Order, {
  foreignKey: 'orderId',
});

// ---------------------
// Order ↔ shippingAddress
// ---------------------
Order.hasOne(shippingAddress, {
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
});
shippingAddress.belongsTo(Order, {
  foreignKey: 'orderId',
});

// ---------------------
// Order ↔ billingAddress
// ---------------------
Order.hasOne(billingAddress, {
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
});
billingAddress.belongsTo(Order, {
  foreignKey: 'orderId',
});

// ---------------------
// Category ↔ Product
// ---------------------
User.hasMany(userAddress, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
userAddress.belongsTo(User, {
  foreignKey: 'userId',
});

// ---------------------
// Category ↔ Product
// ---------------------
Category.hasMany(Product, {
  foreignKey: 'category',
  onDelete: 'SET NULL',
});
Product.belongsTo(Category, {
  foreignKey: 'category',
});

// ---------------------
// User ↔ cartProducts
// ---------------------
User.hasMany(cartProducts, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
cartProducts.belongsTo(User, {
  foreignKey: 'userId', // Fixed
});


// ---------------------
// cartProducts ↔ cartVarient
// ---------------------
cartProducts.hasMany(cartVarient, {
  foreignKey: 'cartId',
  as: 'cartVarients',  // Correct alias
  onDelete: 'CASCADE',
});
cartVarient.belongsTo(cartProducts, {
  foreignKey: 'cartId',
});




// ---------------------
// Product ↔ cartProducts
// ---------------------
Product.hasMany(cartProducts, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});
cartProducts.belongsTo(Product, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});


// ---------------------
// Product ↔ Sub-resources
// ---------------------
Product.hasMany(ProductColor, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});
Product.hasMany(ProductSize, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});
Product.hasMany(ProductSpecification, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});
Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

ProductColor.belongsTo(Product, { foreignKey: 'productId' });
ProductSize.belongsTo(Product, { foreignKey: 'productId' });
ProductSpecification.belongsTo(Product, { foreignKey: 'productId' });
ProductImage.belongsTo(Product, { foreignKey: 'productId' });




// ---------------------
// Product ↔ Review
// ---------------------

Product.hasMany(productReviews,{
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});
productReviews.belongsTo(Product,{
  foreignKey: 'productId',
})


// ---------------------
// Product ↔ Review
// ---------------------

User.hasMany(productReviews,{
  foreignKey: 'userId',
});
productReviews.belongsTo(User,{
  foreignKey: 'userId',
})





// ---------------------
// Export Models
// ---------------------
module.exports = {
  Product,
  ProductColor,
  ProductSize,
  ProductSpecification,
  ProductImage,
  Category,
  User,
  cartVarient,
  cartProducts,
  userAddress,
  Order,
  OrderItems,
  OrderTimeline,
  OrderItemsVarient,
  shippingAddress,
  billingAddress,
  productReviews
};
