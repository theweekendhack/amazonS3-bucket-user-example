const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config({ path: 'config/keys.env' });

const userController = require("./controllers/UserController.js");


const app = express();

app.use(cors({
    orgin: process.env.FRONT_END_HOST_ADDRESS    
}));

app.use(express.json());


app.use("/users",userController);

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