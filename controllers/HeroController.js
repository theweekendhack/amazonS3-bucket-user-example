const express = require('express')
const router = express.Router()
const heroService = require("../services/HeroService.js");

const {protectRoutes} = require("../middleware/AuthMiddleware.js");


//Create
router.post("/",protectRoutes,heroService.createAHero)

//Read ALL 
router.get("/",protectRoutes,heroService.getHeroes)


//READ ONE SUPERHERO

router.get("/:id",protectRoutes,heroService.getASuperhero)

//Update

router.put("/:id",heroService.updateASuperHero)


//DELETE
router.delete("/:id",heroService.deleteASuperHero)



module.exports = router