const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');



const getPublicIdFromUrl = (url) => {
  try {
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return null;

    // Get path after /upload/
    const afterUpload = url.substring(uploadIndex + 8); // skip "/upload/"
    
    // Remove version (e.g., v123456789/) if it exists
    const parts = afterUpload.split('/');
    if (parts[0].startsWith('v') && !isNaN(parts[0].substring(1))) {
      parts.shift(); // Remove the version folder
    }

    const pathWithExtension = parts.join('/');
    const pathWithoutExtension = pathWithExtension.replace(/\.[^/.]+$/, ''); // remove extension like .webp, .jpg etc.

    return decodeURIComponent(pathWithoutExtension);
  } catch (error) {
    console.error('❌ Failed to extract public ID:', error);
    return null;
  }
};



// Helper to delete image from Cloudinary
const deleteFromCloudinary = async (url) => {
  if (!url) return;
  console.log("Deleted URL", url);
  const publicId = getPublicIdFromUrl(url);
  console.log("Deleted public ID", publicId);
  try {
    await cloudinary.uploader.destroy(publicId);
    
  } catch (err) {
    console.error('Failed to delete from Cloudinary:', err);
  }
};



  module.exports = {
    deleteFromCloudinary
  };