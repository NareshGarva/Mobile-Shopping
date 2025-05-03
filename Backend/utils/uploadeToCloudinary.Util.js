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
    
console.log('Upload result:', result); // Log the result of the upload
    fs.unlinkSync(absolutePath); // Delete after upload
    return result; // Just return result
  } catch (error) {
    // Try to delete file even if upload fails
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
    throw error; // Let caller handle the error
  }
};



module.exports = {
  uploadImageToCloudinary
};
