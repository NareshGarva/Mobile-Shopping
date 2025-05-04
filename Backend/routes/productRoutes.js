const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {upload} = require('../middleware/multerMiddleware');
const uploadToCloudinaryMiddleware = require('../middleware/uploadToCloudinaryMiddleware');


// router.post('/img',upload.fields([
//   { name: 'mainImage', maxCount: 1 },
//   { name: 'casualImages', maxCount: 5 }
// ]),uploadToCloudinaryMiddleware,(req, res) =>{
//   console.log('Main image URL:', req.body.mainImage); // Log the main image URL
//   console.log('Casual images URLs:', req.body.casualImages); // Log the casual images URLs
//   res.status(200).json({ message: 'Images uploaded successfully', mainImage: req.body.mainImage, casualImages: req.body.casualImages });
// });


router.post('/create',upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'casualImages', maxCount: 5 }
  ]), uploadToCloudinaryMiddleware, productController.createProduct);

router.get('/all', productController.getAllProducts);
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
