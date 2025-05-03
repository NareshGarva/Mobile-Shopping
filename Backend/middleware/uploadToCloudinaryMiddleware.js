const { uploadImageToCloudinary } = require('../utils/uploadeToCloudinary.Util');

const uploadToCloudinaryMiddleware = async (req, res, next) => {
  console.log('Middleware triggered for Cloudinary upload');
  console.log('Files received:', req.files); // Log the files received
  try {
    const imageResults = {};

    if (req.files?.mainImage) {
      console.log('Main image found and sending to cloudinary:', req.files.mainImage[0].path); // Log the main image path
      const result = await uploadImageToCloudinary(req.files.mainImage[0].path);
      imageResults.mainImage = result.secure_url;
      console.log('Main image uploaded:', imageResults.mainImage);
    }

    if (req.files?.casualImages) {
      imageResults.carousel = [];
      for (const file of req.files.casualImages) {
        const result = await uploadImageToCloudinary(file.path);
        imageResults.carousel.push(result.secure_url);
        console.log('Carousel image uploaded:', result.secure_url);
      }
    }

    // Attach uploaded URLs to req.body
    req.body.uploadedImages = imageResults;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Cloudinary upload failed', error: error.message });
  }
};

module.exports = uploadToCloudinaryMiddleware;
