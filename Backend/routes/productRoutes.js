const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {upload} = require('../middleware/multerMiddleware');
const uploadToCloudinaryMiddleware = require('../middleware/uploadToCloudinaryMiddleware');

// router.post('/img', upload.fields([
//   { name: 'mainImage', maxCount: 1 },
//   { name: 'casualImages', maxCount: 5 }
// ]), uploadToCloudinaryMiddleware, (req, res) => {
//   console.log(req.files); // will show uploaded files in both fields
//   console.log(req.body);  // for any additional form data
  
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ error: "No files uploaded" });
//   }
//   res.status(200).json({ message: "Images uploaded successfully" });
// });



router.post('/create',upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'casualImages', maxCount: 5 }
  ]), (req, res) =>{
    console.log(req.files);
    console.log(req.body);
    res.status(200).json({message: "Images uploaded successfully"});
  });

router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
