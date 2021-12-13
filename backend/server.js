const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require('dotenv').config();
let User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json())


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
})

//databse connection
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection Success!!")
})


app.listen(PORT, () => {
    console.log('server is up and running on :', PORT);
})

//////////////////////////////////////////////////////////////////////////////////

//routes

//register user
app.post('/api/register',async (req, res) =>{
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : newPassword
        })
        res.json({status : 'ok'})

    } catch (error) {
        console.log(error)
        
    }

})

//login route
app.post('/api/login', async (req, res) =>{

       const user =  await User.findOne({
            email : req.body.email,
        })

        if(!user){
            return {status:'error', error:'Invalid'}
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if(isPasswordValid){
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123')
            return res.json({status: 'ok', user: token})
    
        }
        else{
            return res.json({status: 'error', user: false})

        }

})

//get quote
app.get('/api/quote', async (req, res) =>{

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
    
        const email = decoded.email
        const user = await User.findOne({email: email})
    
        return res.json({status : 'ok', quote: user.quote})
        
    } catch (error) {
        console.log(error)
        res.json({status:'error', error:'Invalid Token'})
    }



})

app.post('/api/quote', async (req, res) =>{

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
    
        const email = decoded.email
        await User.updateOne(
            {email: email}, 
            {$set: {quote: req.body.quote}})
    
        return res.json({status : 'ok'})
        
    } catch (error) {
        console.log(error)
        res.json({status:'error', error:'Invalid Token'})
    }



})