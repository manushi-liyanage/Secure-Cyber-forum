

const express = require('express')
require(`dotenv`).config();
const postRoute = require('./routes/postRoute')
const authRoute = require('./routes/authRoutes')
const cors = require("cors");
const mongoose = require('mongoose');

// express app
const app = express()



//midlleware
app.use((req , res, next) =>{
    console.log(req.path , req.method)
    next()
})
app.use(express.json());
app.use(cors());

//routes
app.use('/api/postRoute' , postRoute)
app.use('/api/auth',authRoute)

app.get('/' , (req , res) => {
    res.json({mssg : 'Welcome to the Backend'})
})



//connect to mongo DB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log(' server is running  on port', process.env.PORT)
        })
    }).catch((error) => {
        console.log(error)
    });
