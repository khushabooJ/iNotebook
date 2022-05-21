import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
  const host = "http://localhost:5000"
  const [credentials, setcredentials] = useState({name:"",email:"", password:"", confirmpassword: ""})
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password, confirmpassword:credentials.confirmpassword}) 
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
      //redirect}
      localStorage.setItem("token", json.token)
      props.showAlert("Account created successfully", "success")
      navigate("/");
      }
      else{
          props.showAlert("invalid credentials", "danger")
        
      }
     
  }
  const onChange =(e) =>{
      setcredentials({...credentials,[e.target.name]: e.target.value})
  }



  return (
    <div>
      <div className="container">
      <h1 className= "mb-5">Signup to continue</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange ={onChange} value={credentials.name} />
                    
                </div>
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange ={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange ={onChange} value={credentials.password}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="confirmpassword" className="form-control" id="confirmpassword"  onChange ={onChange} value={credentials.confirmpassword}/>
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>



    </div>
  )
}

export default Signup