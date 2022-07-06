const { Router } = require('express');
const router = Router()
const {getGenres} = require("../Controllers/genre.c")
const { Genre } = require("../db")


router.get("/", async (req,res) =>{
    try{
        
        let GenreDb = await Genre.findAll()
        res.status(200).send(GenreDb)
        const fullGenre =  await getGenres()

    }
    catch(err){
        next(err)
    }

})







module.exports = router