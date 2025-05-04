const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = './public/temp/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueFileName = `${file.fieldname}-${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`;
    console.log(`File saved as: ${uniqueFileName}`); // Log the unique file name
    cb(null, uniqueFileName);
  }
});

exports.upload = multer({ storage });