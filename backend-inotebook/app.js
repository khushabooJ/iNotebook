require('dotenv').config()
const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");
const note =require("./db/Notesmodel")
const user=require("./db/Usermodel")
const path = require("path")
const port = process.env.PORT|| 5000
require("./db/connection")
const cors = require('cors');
const { env } = require('process');


app.use(cors())



app.use(express.json())
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port,() => {
    console.log("listening")
})
  