const jwt = require("jsonwebtoken");
const {
  User,
  cartProducts,
  cartVarient,
  Product,
} = require("../models/initAssociations");



// Add to Cart
exports.addToCart = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Please provide cart data" });
  }

  const { userId, productId, quantity, selectedVariant, selectedColor } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      console.error("Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    const existingCartProduct = await cartProducts.findOne({
      where: { userId, productId },
    });

    if (existingCartProduct) {
      // Update the quantity if already present
      existingCartProduct.quantity = quantity;
      if (selectedColor) existingCartProduct.color = selectedColor;
      await existingCartProduct.save();
      console.log("Product quantity updated successfully");
      return res.status(200).json({ message: "Product quantity updated successfully" });
    }

    // Create a new cart product
    const cartProduct = await cartProducts.create({
      userId,
      productId,
      quantity,
      color: selectedColor,
    });

   
 // Insert cart variants one by one
 if (selectedVariant && typeof selectedVariant === "object") {


  for (const [type, value] of Object.entries(selectedVariant)) {
    try {
     
      await cartVarient.create({
        cartId: cartProduct.cartId,
        type,
        value,
      });
      
    } catch (error) {
      console.error(`Failed to insert variant ${type}: ${error.message}`);
    }
  }

  console.log("All variants inserted successfully.");
}

    console.log("Product added to cart");
    return res.status(201).json({ message: "Product added to cart" });

  } catch (err) {
    console.error("Error in addToCart:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};




// Get Cart Products
exports.getCartProducts = async (req, res) => {
  const userId = req.headers['userid'];

  try {
    const userCartProducts = await cartProducts.findAll({
      where: { userId: userId },
      include: [
        {
          model: cartVarient, 
          as: "cartVarients",
          attributes: ["type", "value"],
        },
        {
          model: Product, 
          attributes: ["id", "productTitle", "sellingPrice", "mainImage"],
        },
      ],
    });

    if (!userCartProducts || userCartProducts.length === 0) {
      return res.status(404).json({ message: "No products found in cart" });
    }

    return res.status(200).json({
      message: "Cart products fetched successfully",
      cartProducts: userCartProducts,
    });

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// Delete Cart Product
exports.deleteCartProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const cartProduct = await cartProducts.findOne({ where: { cartId : id } });
   
    if (!cartProduct) {
      return res.status(404).json({ message: "Cart product not found" });
    }

    await cartProducts.destroy({ where: { cartId : id } });

    return res
      .status(200)
      .json({ message: "Product removed" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};











// Update Cart Quantity
exports.updateCartQuantity = async (req, res) => {
  const { cartId, quantity } = req.body;

  if (!cartId || !quantity) {
    return res.status(400).json({ message: "Cart ID and Quantity are required." });
  }

  try {
    const cartProduct = await cartProducts.findOne({ where: { cartId } });

    if (!cartProduct) {
      return res.status(404).json({ message: "Cart product not found" });
    }

    // Update quantity
    cartProduct.quantity = quantity;
    await cartProduct.save();

    return res.status(200).json({ message: "Quantity updated successfully." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
