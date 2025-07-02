const express = require('express')
require(`dotenv`).config();
const postRoute = require('./routes/postRoute')
const authRoute = require('./routes/authRoutes')
const cors = require("cors");
const mongoose = require('mongoose');
const uploadRoute = require("./routes/uploadRoutes");

// express app
const app = express();

// ✅ Handle large payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//midlleware
app.use((req , res, next) =>{
    console.log(req.path , req.method)
    next()
})
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


//routes
app.use('/api/upload', uploadRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/posts' , postRoute)
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
