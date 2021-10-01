const userModel = require("../models/UserModel.js");

exports.createAUser =(req,res)=>{

    const user = new userModel({
        firstName :req.body.firstName,
        lastName : req.body.lastName,
        gender : req.body.gender,
        email : req.body.email,
        password : req.body.password
    });
    user.save()
    .then(user=>{

        res.json({
            message :"The User Was successfully created",
            data : user
        })
        
    })
    .catch(err=>{
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