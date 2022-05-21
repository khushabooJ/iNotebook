import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext'
import NoteItems from './NoteItems';
import { useNavigate } from 'react-router-dom'


function Notes(props) {
  const {showAlert} = props
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
 
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  
  const updateNote = (currentNote) => {
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    
  }
  const handleClick = (e) => {
    console.log("updating")
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("UpdatedNote", "success")


  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>

     <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">

                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} autoComplete="off" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} autoComplete="off" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} autoComplete="off" />
                  </div>


                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  disabled={note.etitle.length>20 || note.edescription.length===0 || note.etag.length>10 }className="btn btn-primary" onClick={handleClick}>Save</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
         
         <h5>Your Notes</h5>
         <div className="container">
         {notes.length===0 && "No notes to display"}
         </div>
         {notes.map((note, index) => {
         return <NoteItems note={note} key={index} updateNote={updateNote} showAlert={showAlert} />
        
        })} 

      </div>
    </>
  )
}
export default Notes

