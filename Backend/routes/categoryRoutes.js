const express = require("express");
const router = express.Router();
const categorycontrollers = require("../controllers/categoryController");

router.post("/create", categorycontrollers.createCategory);

router.get("/all", categorycontrollers.getAllCategory);
router.get("/:id", categorycontrollers.getCategoryById);

// routes/productRoutes.js
router.put("/:id", categorycontrollers.updateCategory);

router.delete("/:id", categorycontrollers.deleteCategory);

module.exports = router;
