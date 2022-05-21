const express = require("express")
const router = express.Router()
const authentication = require("../middleware/authmiddleware")
const note = require("../db/Notesmodel")
const user = require("../db/Usermodel")


console.log("what is done")

// creating notes for a user
router.post("/addingnotes",authentication, async(req,res)=>{
    try{
       const{ title, description, tag} = req.body
    
        const addingnotes = new note({title, description, tag, user:req.user.id})
        console.log(req.body)
        const insertNote = await addingnotes.save()
        res.status(201).send(insertNote)
    
     } 
    catch(e){
        res.status(400).send(e)
    }
})


// get all the notes
router.get("/fetchallnotes",authentication, async(req, res)=>{
    try{
    const notes = await note.find({user:req.user.id});
    res.json(notes)
    } catch(e){
        console.log(e)
    }
   
   
    
})
// Updating an existing note

router.patch("/updatingnotes/:id", authentication, async(req,res) =>{
    try {
        const _id =  req.params.id
        const updatenotes = await note.findByIdAndUpdate(_id,req.body,{new:true})
        res.send(updatenotes)
    
    } catch (error) {
        console.log(error)
        
    }
})

  
router.delete("/deletingnotes/:id",authentication, async(req,res) =>{
    try{
        const deleteNote = await note.findByIdAndDelete(req.params.id)
         if(!req.params.id){
             return res.status(400).send();
         }
    
           res.send(deleteNote)
    
    }catch(e){
            res.status(500).send(e)
        }
})






module.exports = router;