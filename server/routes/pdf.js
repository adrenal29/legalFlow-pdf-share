require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { MongoClient, GridFSBucket, ObjectID } = require('mongodb');
const router = express.Router();
const { Readable } = require('stream');
const path = require('path');
const PdfFile = require('../models/pdf.model');
const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = process.env.MONGO_URL;

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage });

// MongoDB client instance
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Route handler to handle file upload
router.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Connect to GridFSBucket
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });

    // Create a readable stream from the file buffer
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    uploadStream.on('error', error => {
      console.error('Error uploading file to GridFS:', error);
      res.status(500).send('An error occurred while uploading the file.');
    });

    uploadStream.on('finish', async () => {
      console.log("Uploaded")
      const fileId = uploadStream.id;
      const pdfFile = new PdfFile({
        ownerEmail: req.body.email, 
        uploadPdfId: fileId,
        fileName:req.file.originalname,
        sharedWith: [] ,// Initially no users are shared with the file
        isPublic:false
      });
      await pdfFile.save();
      res.status(200).send({ message: 'File uploaded successfully', fileId: uploadStream.id });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('An error occurred while uploading the file.');
  }
});

// Route handler to get PDF file by ID
router.get('/getPdf', async(req, res) => {
  try {
    const id= req.query.id;
    console.log(id)
    const pdfFile = await PdfFile.findOne({uploadPdfId:id});
    if (!pdfFile) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });
    console.log(id)
    // Check if file exists
    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: { text: `Unable to download file`, error }});
  }
});

router.get('/getPdfs', async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email)
    // Find all PDFs owned by the specified user email
    const pdfs = await PdfFile.find({ ownerEmail: email }).populate({path: 'uploadPdfId',
    select: 'filename'});
    console.log(pdfs)
    res.status(200).json({ pdfs });
  } catch (error) {
    console.error('Error fetching PDFs by owner:', error);
    res.status(500).json({ error: 'An error occurred while fetching PDFs by owner' });
  }
});

router.post('/addComments', async (req, res) => {
  try {
    const { pdfFileId, userEmail, commentText } = req.body;
    console.log(commentText)
    // Find the PDF file by ID
    const pdfFile = await PdfFile.findOne({uploadPdfId:pdfFileId});
    console.log(pdfFile)
    if (!pdfFile) {
      // Handle if PDF file is not found
      return res.status(404).json({ error: 'PDF file not found' });
    }

    // Add the comment to the comments array
    pdfFile.comments.push({
      userEmail: userEmail,
      commentText: commentText
    });

    // Save the updated PDF file document
    await pdfFile.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ error: 'An error occurred while adding comment' });
  }
});

router.get('/getComments', async (req, res) => {
  try {
    const fileId = req.query.id;
    console.log(fileId)
    // Find the PDF file by ID
    const pdfFile = await PdfFile.findOne({ uploadPdfId: fileId });
    console.log(pdfFile)
    if (!pdfFile) {
      return res.status(404).json({ error: 'PDF file not found' });
    }
 
    // Extract comments from the PDF file
    const comments = pdfFile.comments;

    // Send the comments as a response
    res.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/addUser', async (req, res) => {
  const { pdfId } = req.query; // Extract the PDF file ID from the request parameters
  const { shareEmail } = req.body; // Extract the user email from the request body
  console.log(pdfId)
  try {
    // Find the PDF file by ID
    const pdfFile = await PdfFile.findOne({uploadPdfId:pdfId});
    if (!pdfFile) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    // Add the user email to the sharedWith array
    pdfFile.sharedWith.push(shareEmail);

    // Save the updated PDF file document
    await pdfFile.save();

    // Return a success message
    return res.status(200).json({ message: 'User added to sharedWith array successfully' });
  } catch (error) {
    console.error('Error adding user to sharedWith array:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/share-publicly', async (req, res) => {
  const { pdfId } = req.query;
  console.log(pdfId)
  try {
    // Find the PDF file by ID
    const pdfFile = await PdfFile.findOne({uploadPdfId:pdfId});
    if (!pdfFile) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    // Mark the document as publicly shareable
    pdfFile.isPublic = true;

    // Save the updated PDF file document
    await pdfFile.save();



    // Return the unique URL
    return res.status(200).json({error:false });
  } catch (error) {
    console.error('Error sharing document publicly:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/viewPdf', async(req, res) => {
  try {
    const id= req.query.id;
    console.log(id)
    const pdfFile = await PdfFile.findOne({uploadPdfId:id});
    if (!pdfFile) {
      return res.status(404).json({ error: 'PDF file not found' });
    }
    // Check if the document is publicly shareable
    if (!pdfFile.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const bucket = new GridFSBucket(db, { bucketName: 'pdfs' });
    console.log(id)
    // Check if file exists
    const file = await bucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: { text: `Unable to download file`, error }});
  }
});

router.get('/getAccess',async(req,res)=>{
  const id= req.query.id;
    console.log(id)
    const pdfFile = await PdfFile.findOne({uploadPdfId:id});
  res.status(200).json({error:false,pdfFile})
})
module.exports = router;
