import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'


export default function NoteItems(props) {
  const context = useContext(NoteContext);
  const {deleteNote} = context;

    const{note, updateNote} = props
  return (
    <>
    <div className='col-md-3 my-2'>
    
      <div className="card" >
 
  <div className="card-body">
   
 
  <span class="badge bg-success mb-3">{note.tag}</span> 
  
    <h5 className="card-title" > {note.title}</h5>
    <p className="card-text">  {note.description}</p>
    <div class="d-flex justify-content-between">
      <div>
    <i className="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted succesfully", "success")} }></i>
    <i className="fa-solid fa-pen-to-square mx-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {updateNote(note)}}></i>
    </div>
   <p className="card-text"><small className="text-muted"> {new Date(note.date).toLocaleString()}</small></p>
    </div>  
  </div>
</div>
    </div>
    </>
  )
}
