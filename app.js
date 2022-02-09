const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//MIDDLEARES
app.use(cors()); // resolve cors error
app.use(bodyParser.json()); // convert request body to json

// IMPORT ROUTERS
const blogPostsRoutes = require('./routes/posts');

app.use('/blogpost', blogPostsRoutes);

mongoose.connect(process.env.MONGO_URI).then((res)=>{
    console.log("db connected");
})

app.listen(PORT,()=>{console.log(`App stared on http://localhost:${PORT}`)})