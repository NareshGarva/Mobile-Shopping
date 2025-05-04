const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Upload to Cloudinary and return result
const uploadImageToCloudinary = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('File not found at ' + filePath);
  }

  const absolutePath = path.resolve(filePath);

  try {
    console.log('Uploading to Cloudinary:', absolutePath);

    const result = await cloudinary.uploader.upload(absolutePath, {
      folder: 'Mobile Shopping/Products', // Custom folder
      resource_type: 'auto',
      overwrite: false,
    });

    fs.unlinkSync(filePath); // Delete after upload
    return result; // Just return result
  } catch (error) {
    console.error('Error during upload to Cloudinary:', error);
    
    // Attempt to delete file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

module.exports = {
  uploadImageToCloudinary
};
