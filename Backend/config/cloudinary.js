const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, // Ensure to have this in your environment variables
});

// If you want to export the Cloudinary instance
module.exports = cloudinary;
