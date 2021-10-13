const express = require('express')
const router = express.Router()
const heroService = require("../services/HeroService.js");


//Create
router.post("/",heroService.createAHero)

//Read ALL 
router.get("/",heroService.getHeroes)


//READ ONE SUPERHERO

router.get("/:id",heroService.getASuperhero)

//Update

router.put("/:id",heroService.updateASuperHero)


//DELETE
router.delete("/:id",heroService.deleteASuperHero)



module.exports = router