const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({

    //to connect with usermodel
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"

  },
   title:{
       type:String,
       maxlength: [10, "Word limit 10"]
      
   },
   description:{
    type:String,
    required:true,
    
   },
   tag:{
    type:String
    
   },
   date:{
    type:Date,
    default: Date.now

  
}
})
const note = new mongoose.model("note", notesSchema)
// console.log(user)

module.exports = note