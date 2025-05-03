const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId || typeof publicId !== 'string') {
      throw new Error('Invalid public ID');
    }
  
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'auto',
        invalidate: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };



  module.exports = {
    deleteImageFromCloudinary
  };