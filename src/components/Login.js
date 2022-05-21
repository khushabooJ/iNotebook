import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {


    const host = "http://localhost:5000"
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        //  console.log(json.success)
        if (json.success) {
            //redirect}
            localStorage.setItem("token", json.token)
            props.showAlert("logged in", "success")
            navigate("/");
        }else {
            props.showAlert("invalid credentials", "danger")
        }


    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div className="container">
                <h1 className= "mb-5">Login to continue</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" onChange={onChange} value={credentials.password} className="form-control" id="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login