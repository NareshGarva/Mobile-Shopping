const { uploadImageToCloudinary } = require('../utils/uploadeToCloudinary.Util');



const uploadToCloudinaryMiddleware = async (req, res, next) => {

  try {
    // Upload main image
    if (req.files?.mainImage) {
      const result = await uploadImageToCloudinary(req.files.mainImage[0].path);
      req.body.mainImage = result.secure_url;
    }

    // Upload casual images
    req.body.casualImages = []; // Initialize array first
    if (req.files?.casualImages) {
      for (const file of req.files.casualImages) {
        const result = await uploadImageToCloudinary(file.path);
        req.body.casualImages.push(result.secure_url);
      }
    }

    next();
  }catch (error) {
    console.error("Cloudinary upload failed:", error);
    return res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
  }
};

module.exports = uploadToCloudinaryMiddleware;
