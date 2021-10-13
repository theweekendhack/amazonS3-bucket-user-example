const express = require("express");
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");
const cors = require("cors");
require('dotenv').config({ path: 'config/keys.env' });

const userController = require("./controllers/UserController.js");
const superheroController = require("./controllers/HeroController.js");

const app = express();

app.use(cors({
    orgin: process.env.FRONT_END_HOST_ADDRESS    
}));


//middleware
app.use(express.json());

app.use(fileupload());


app.use("/users",userController);
app.use("/superheroes",superheroController);


app.listen(process.env.PORT,()=>{
    console.log(`RESTful API is up and running on PoRT ${process.env.PORT}`);

    mongoose.connect(process.env.MONGODB_QUERY_STRING)
    .then(()=>{
        console.log(`Connected to MongoDB`)
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    })

})