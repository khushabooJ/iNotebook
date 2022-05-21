import React from 'react'
import Notes from './Notes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'




export default function Home(props) {
  const { showAlert } = props
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      <Notes showAlert={showAlert} />
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  return (

    <div>
      <Notes showAlert={showAlert} />
    </div>
  )
}
