import React from 'react'
import NoteContext from './NoteContext';
import { useState } from 'react';
// import Notes from '../../components/Notes';



export default function NotesState(props) {

  const host = "http://localhost:5000"

  const notesInitials = []
  const [notes, setnotes] = useState(notesInitials)


  //Get All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")

      },


    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }

  //AddNotes
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addingnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")

      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = response.json();
    console.log(note)
    console.log("adding a new note")
    setnotes(notes.concat(note));



  }
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletingnotes/${id}`, {
      method: 'DELETE',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")

      },

      
    });
    const json = response.json();
    console.log(json)

    console.log("deleteing a Note" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)

  }

  // edit a note
  const editNote = async (id, title, description, tag, date) => {
    const response = await fetch(`${host}/api/notes/updatingnotes/${id}`, {
      method: 'PATCH',
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")

      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json)




    const newNotes = notes.map(note => {
      if (note._id === id) {
        return { ...note, title, description, tag, date };
      }
      return note;
    });
    // logic to edit in client
    setnotes(prev => newNotes);
  }


  return (
    <div>
      <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </NoteContext.Provider>

    </div>
  )

}

