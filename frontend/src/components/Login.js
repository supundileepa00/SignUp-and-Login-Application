import React, { useState }  from "react";
import './style.css';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:8070/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json()

        if(data.user){
            localStorage.setItem('token', data.user)
            alert('Login Succesfull');
            window.location.href = '/dashboard'
        }
        else{
            alert("Please Check username and password")
        }

        console.log(data)
    }


    return (
        <div className="container login-panel border border-2" >
            
            <br />
            
            <h2>Login</h2>


            <form onSubmit={loginUser}>

                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email here"
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                    ></input>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password here"
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    ></input>
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
                <br />
            <br />
                        
            </form>
        </div>
    );
}

export default Login;