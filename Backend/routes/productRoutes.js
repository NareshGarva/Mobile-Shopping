const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {upload} = require('../middleware/multerMiddleware');
const uploadToCloudinaryMiddleware = require('../middleware/uploadToCloudinaryMiddleware');




router.post('/create',upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'casualImages', maxCount: 5 }
  ]), uploadToCloudinaryMiddleware, productController.createProduct);

router.get('/all', productController.getAllProducts);

router.get('/all/:category', productController.getAllProductsByCat);

router.get('/:id', productController.getProductById);

// routes/productRoutes.js
router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'casualImages', maxCount: 5 }
  ]),
  uploadToCloudinaryMiddleware,
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
