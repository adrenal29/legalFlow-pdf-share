const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where PDFs will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix +ext) // Concatenate original file name to create a unique file name
  },
});
const upload = multer({ storage });

// Route handler to handle file upload
router.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  // Handle uploaded file here
  res.status(200).send('File uploaded successfully');
});

module.exports = router;
