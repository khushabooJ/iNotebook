import React from 'react'
import { NavLink,Link ,useNavigate} from "react-router-dom"


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout =() =>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">inotebook</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" style={({isActive}) =>{return{color:isActive?"red": ""}}}   to="/home" >Home</NavLink>
            
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about" style={({isActive}) =>{return{color:isActive?"red": ""}}}>All Notes</NavLink>
          </li>
          
          
        </ul>
        {!localStorage.getItem("token")?<form className="d-flex">
          <Link role="button" to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link role="button" to="/signup"className="btn btn-primary mx-2">Signup</Link>
          
        </form>:  <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>}
      </div>
    </div>
  </nav></div>
  )
}



