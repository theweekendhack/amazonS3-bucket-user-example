const userModel = require("../models/UserModel.js");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const  bcrypt = require('bcryptjs');
const UserModel = require("../models/UserModel.js");
const jwt  = require("jsonwebtoken");

exports.createAUser =(req,res)=>{


    const s3 = new AWS.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey
    });

    const user = new userModel({
        firstName :req.body.firstName,
        lastName : req.body.lastName,
        gender : req.body.gender,
        email : req.body.email,
        password : req.body.password
    });
    user.save()
    .then(user=>{

 

         const randomID =  uuidv4();
        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${randomID}_${req.files.imagePath.name}`, // File name you want to save as in S3
            Body: req.files.imagePath.data
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }

            user.imagePath =data.Location;

            bcrypt.genSalt(10)
            .then(salt=>{

                bcrypt.hash(user.password,salt)
                .then(hash=>{

                    user.password=hash;

                    user.save()
                    .then(newUser=>{
        
                        res.json({
                            message :"The User Was successfully created",
                            data : newUser
                        })
                    })

                })

            })
            .catch(err=>{

            })

 

        })
        

            

        
    })
    .catch(err=>{

        console.log(err)
        res.status(500).json({
            message :err
        })
    })




};


exports.getUsers =(req,res)=>{

    userModel.find()   
    .then(users=>{

        res.json({
            message : "A list of users in the database",
            data : users,
            users : users.length
        })

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })
     

};

exports.getAUser=(req,res)=>{

    userModel.findById(req.params.id)
    .then(user=>{

       
        if(user)
        {
            res.json({

                message : `User with the id ${req.params.id}`,
                data : user
            })
        }

        else
        {

            res.status(404).json({
                message : `There is no User in our database with the id ${req.params.id}`
            })
        }


    })

    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};


exports.updateAUser =(req,res)=>{


    userModel.findByIdAndUpdate(req.params.id, req.body, {new :true})
    .then(user=>{


        //if user is not null

        if(user)
        {
            res.json({
                message : `The User with the id ${req.params.id} was updated`,
                data : user
            })

        }

        //hero contains null
        else
        {
            res.status(404).json({
                message : `User with ID ${req.params.id} was not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};

exports.deleteAUser=(req,res)=>{

    
    userModel.findByIdAndRemove(req.params.id)
    .then((user)=>{

        if(user)
        {
            res.json({
                message: `The User with the ID ${req.params.id} was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `User with ID ${req.params.id} was not found`
            })
        }


    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })

};



exports.authenticateUser =(req,res)=>{

        /*
            1. Check to see if the email exists

        */

            UserModel.findOne()
            .where("email").equals(req.body.email)
            .then(user=>{


                // if the user exists based  on the email
                if(user)
                {

                    //check to see  if the password entered exists in the db

                    bcrypt.compare(req.body.password,user.password )
                    .then(value =>{

                        //This password was matched to the password in the db for
                        //that  document with the provided email
                        if(value===true)
                        {

                            //IT MEANS YOU HAVE BEEN  AUTHENTICATED

                            const token = jwt.sign({
                                _id : user._id,
                                firstName : user.firstName,
                                lastName  : user.lastName,
                                email : user.email
                            }, process.env.JWT_SECRET);

                            //GENERATE THE JWT 
                            res.header("x-auth-header",token).json({
                             message : "You have been authenticated!!!!!",
                    
                            })
                        }

                        //the password wasn't matched
                        else

                        {
                            res.status(400).json({
                                message : `Email and/or password entered is incorrect!!`
                            })
                        }

                    })
                }

                //the email provided doesn't exists
                else
                {
                    res.status(400).json({
                        message : `Email and/or password entered is incorrect!!`
                    })
                }



            })
       /*

            2. If the email exists, check to see if the the password provided exists
            in the db for that specfic user document

        */



};