const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Upload to Cloudinary and return result
const uploadImageToCloudinary = async (filePath) => {
  
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('File path is invalid or file does not exist.');
  }

  const absolutePath = path.resolve(filePath);

  try {
    const result = await cloudinary.uploader.upload(absolutePath, {
      folder: 'Mobile Shopping/Products', // Custom folder
      resource_type: 'auto',
      overwrite: false,
    });
    
    fs.unlinkSync(filePath); // Delete after upload
    return result; // Just return result
  } catch (error) {
    // Try to delete file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error; // Let caller handle the error
  }
};



module.exports = {
  uploadImageToCloudinary
};
