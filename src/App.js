import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotesState from './context/notes/NotesState';
import Alert from './components/Alert';
import ShowNotes from './components/ShowNotes';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState} from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{

    
    setAlert({
      msg: message,
      type: type 
      
    })
    setTimeout(() => {
      
        setAlert(null);
    }, 1500);

  }
   


  return (

    <>

     <NotesState>
      <BrowserRouter>
      <Navbar/>
      <Alert alert={alert} showAlert={showAlert}/>
     
   
    

      <div className="container">
      <Routes>
           
        
     
          
           <Route exact path="/"  element={<Home showAlert={showAlert}/>} />
          <Route exact path="home"  element={<Home  showAlert={showAlert}/>}  />
          <Route exact path="about" element={<ShowNotes showAlert={showAlert}/>} />


          <Route exact path="signup"  element={<Signup showAlert={showAlert}/>}  />
          <Route exact path="login" element={<Login showAlert={showAlert} />}  />
          
     
      </Routes>
      </div>
    </BrowserRouter>
    </NotesState>
     
   
    </>
  );
}

export default App;
