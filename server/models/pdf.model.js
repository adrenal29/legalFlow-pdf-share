const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
  ownerEmail: { type: String, required: true },
  uploadPdfId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fileName:{type:String},
  sharedWith: [{ type: String }] ,// Array of user emails having access to the file
  comments: [{
    userEmail: { type: String, required: true }, // User email who made the comment
    commentText: { type: String, required: true }, // Text of the comment
    createdAt: { type: Date, default: Date.now } // Timestamp of when the comment was made
  }],
  isPublic:{type:Boolean}
});

const PdfFile = mongoose.model('PdfFile', pdfFileSchema);

module.exports = PdfFile;
