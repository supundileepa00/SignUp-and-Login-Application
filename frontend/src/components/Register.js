import React, { useState } from 'react';
import { useNavigate } from 'react-router';



function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate()
    
    async function registerUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:8070/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        })
        const data = await response.json()

        if(data.status === 'ok'){
            //navigate
            history('/login')
        
            
        }

        console.log(data)
    }


    return (

        <div className="container register-panel border border-2">
            <br />
            <h2>Register</h2>

            <form onSubmit={registerUser}>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Your Name here"
                        onChange={
                            (e) => setName(e.target.value)
                        }
                    ></input>
                </div>
                <div class="mb-3">
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

                <button type="submit" class="btn btn-primary">Submit</button>
            <br />
            <br />
                        
            </form>
        </div>
    );
}

export default Register;