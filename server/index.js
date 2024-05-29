const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/auth')
const pdfRoutes = require('./routes/pdf')
app.use(cors({
    origin: 'https://pdf-share-kpha95c3n-adrenal29s-projects.vercel.app/', // React app URL
    credentials: true,
}));
app.use(express.json());
app.use(express.static("public"));



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