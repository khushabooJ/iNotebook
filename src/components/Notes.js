import React from 'react';
import AddNote from './AddNote';




export default function Notes(props) {
 const {showAlert} = props
  return (
    <div>
      <AddNote showAlert={showAlert}/>
    </div>
  )
}

