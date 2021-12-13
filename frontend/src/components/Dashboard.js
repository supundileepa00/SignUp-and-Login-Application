import React, { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import './style.css'


function Dashboard() {

    const history = useNavigate()
    const [quote, setQuote] = useState();
    const [tempQuote, setTempQuote] = useState('');
    



    async function populateQuote() {
        const req = await fetch('http://localhost:8070/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })


        const data = await req.json()

        if (data.status === 'ok') {
            setQuote(data.quote)

           

        } else {
            alert(data.error);
        }


    }

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                history('/login')
            }
            else {
                //user exists
                populateQuote()

            }
        }

        
    }, [])
    /////////////////////////////////////////////////////////////
    //Update Quote
    async function updateQuote(event) {
        event.preventDefault();

        const req = await fetch('http://localhost:8070/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })


		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
    }
    
    console.log(quote)

    

    return (



        <div className="container border border-2 dashboard-container">
            

    
            <h1>Your quote: {JSON.stringify(quote) || 'No quote found'}</h1>

        

            
            

            <br></br>
            <div>
                <form onSubmit={updateQuote}>
                    <input class="form-control" type="text" placeholder="Your Quote" value={tempQuote} onChange={e => setTempQuote(e.target.value)} />

                    <br />
                    <button type="submit" class="btn btn-primary">Update Quote</button>
                </form>
            </div>

            <br />
        </div>
    )
}

export default Dashboard;