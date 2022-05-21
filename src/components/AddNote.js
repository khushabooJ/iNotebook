import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

  
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note Added", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title(word limit 20)</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag (word limit 10)</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} autoComplete="off" />
                </div>
                
                <button disabled={note.title.length>20 || note.description.length===0 || note.tag.length>10 } type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form>
        </div>
    )
}

export default AddNote