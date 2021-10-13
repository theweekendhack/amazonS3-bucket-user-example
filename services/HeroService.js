const heroModel = require("../models/HeroModel.js");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

exports.createAHero =(req,res)=>{

    const hero = new heroModel({
        name :req.body.name,
        realName : req.body.realName,
        gender : req.body.gender,
        powerLevel : req.body.powerLevel,
        comicbookType:req.body.comicbookType
    });
    hero.save()
    .then((newHero)=>{

        console.log(newHero);
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey
        });

       
        //Generates a unique ID
        const id = uuidv4(); 

        //Rename the name of the upload file to include the unique  ID
        const imageName =  `${id}_${req.files.imagePath.name}`;
        
         // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.AWSBucketName,
            Key: imageName, // File name you want to save as in S3
            Body: req.files.imagePath.data
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }

            hero.imagePath=data.Location
            hero.save()
            .then(hero=>{
                res.json({
                    message :"The Hero Was successfully created and stored in the databaase",
                    data : hero
                })
            })
            console.log(`File uploaded successfully. ${data.Location}`);
        })
        

  
    })
    .catch(err=>{

        console.log(err)
        res.status(500).json({
            message :err
        })
    })

};


exports.getHeroes =(req,res)=>{
        
    const genderQ =req.query.gender
    const catQ= req.query.cat;

    if(genderQ || catQ )
    {

         if(genderQ && catQ)
         {

            heroModel.find()
            .where("gender").equals(genderQ)
            .and([{comicbookType : catQ}])
            .then(heroes=>{
                res.json({
                    message : `A list of ${genderQ} superhereos in the ${catQ} universe`,
                    data : heroes,
                    totalHeroes : heroes.length
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message :err
                })
            })


         }
         else if (genderQ)
         {

            heroModel.find()
            .where("gender").equals(genderQ)
            .then(heroes=>{
                
        
                res.json({
                    message : `A list of ${genderQ} superhereos`,
                    data : heroes,
                    totalHeroes : heroes.length
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message :err
                })
            })
    
         }

         else if(catQ)
         {
            
            heroModel.find()
            .where("comicbookType").equals(catQ)
            .then(heroes=>{
                res.json({
                    message : `A list of superhereos in the ${catQ} universe`,
                    data : heroes,
                    totalHeroes : heroes.length
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message :err
                })
            })
        

         }

    }

    else
    {

        heroModel.find()
        .then(heroes=>{
            res.json({
                message : `A list of superheroes`,
                data : heroes,
                totalHeroes : heroes.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message :err
            })
        })

    }

};

exports.getASuperhero=(req,res)=>{

    heroModel.findById(req.params.id)
    .then(hero=>{

       
        if(hero)
        {
            res.json({

                message : `Hero with the id ${req.params.id}`,
                data : hero
            })
        }

        else
        {

            res.status(404).json({
                message : `There is no Hero in our database with the id ${req.params.id}`
            })
        }


    })

    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};


exports.updateASuperHero =(req,res)=>{


    heroModel.findByIdAndUpdate(req.params.id, req.body, {new :true})
    .then(hero=>{


        //if hero is not null

        if(hero)
        {
            res.json({
                message : `The Hero with the id ${req.params.id} was updated`,
                data : hero
            })

        }

        //hero contains null
        else
        {
            res.status(404).json({
                message : `Hero with ID ${req.params.id} was not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};

exports.deleteASuperHero=(req,res)=>{

    
    heroModel.findByIdAndRemove(req.params.id)
    .then((hero)=>{

        if(hero)
        {
            res.json({
                message: `The Hero with the ID ${req.params.id} was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `Hero with ID ${req.params.id} was not found`
            })
        }


    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })

};