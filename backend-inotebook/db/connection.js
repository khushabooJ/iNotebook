const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/notebookdb")
.then(() =>{console.log("connected to db")})
.catch((e) =>{console.log(e)})