const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require('http');
const server = app.listen(3002);
const socketIo = require('socket.io');
const axios = require('axios')
const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: process.env.OpenAI,
});
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const authRoutes = require('./routes/auth')
const pdfRoutes = require('./routes/pdf')
app.use(cors({
  origin: ['https://pdf-share.vercel.app', 'http://localhost:5173', 'http://localhost:4173'], // React app URL
  credentials: true,
}));

app.use(express.json());
app.use(express.static("public"));

// io.on('connection', (socket) => {
//   console.log('A client connected');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });

//   socket.on('newComment', async (data) => {
//     const { pdfFileId, userEmail, commentText } = data;

//     try {
//       const pdfFile = await PdfFile.findById(pdfFileId);

//       if (pdfFile) {
//         pdfFile.comments.push({
//           userEmail,
//           commentText,
//         });

//         await pdfFile.save();
//         console.log("saved")
//         // Emit the updated comments to all connected clients
//         io.emit('commentsUpdated', pdfFile.comments);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/generate-workflow', async (req, res) => {
  const { category, subCategory, additionalOptions } = req.body;

  const prompt = `Generate a step-by-step workflow for ${category} with the sub-category ${subCategory} and additional options: ${JSON.stringify(additionalOptions)}`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });
    console.log(completion);
    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating workflow:', error);
    res.status(500).json({ error: 'Failed to generate workflow' });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);


/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "pdf-collab",
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Database connected ,Server listening at  : ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));