const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();
app.use(cors())
app.use(express.json());
const port = 8000

mongoose.connect(process.env.MONGODB_URL)
.then(console.log("Connected to Database"))
.catch(err=>console.log(err));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})