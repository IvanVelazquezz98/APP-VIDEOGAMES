const { Router } = require('express');
const router = Router()
const {getAllGames , getInfoGame ,getIdxApi} = require("../Controllers/videogames.c");
const { Videogame, Genre } = require("../db");

    router.get("/", async (req,res,next) =>{ // ver si sin "/" funciona
        try {
        const names = req.query.name
        const allGames = await getAllGames()
            if(names){
                let game = allGames.filter(game => game.name?.toLowerCase().includes(names.toString().toLowerCase()))
                if(game.length){
                    res.status(200).send(game)
                } else {
                 res.status(404).send("Game doesn't exist")  
                }
            } else {
                res.status(200).send(allGames)
            }

        } catch (err) {
            next(err)
        }

    })

    router.get("/:id", async (req,res,next) => {
        try{
        const id = req.params.id
        const infoGame = await getInfoGame(id)
            
        if (!infoGame){ 
            return res.status(404).send("Game by Id doesn't exist")
        }
        res.status(200).send(infoGame)

    }
    catch(err) {
        next(err)
    }


    })

    router.post("/CreateVideogame", async (req,res,next) =>{
        try {
            const {name, description, releaseDate,image,rating,platform,genres} = req.body
    
            const gameCreate = await Videogame.create({
                name,
                description,
                releaseDate,
                image,
                rating,
                platform,
            })
    
            const proms = genres.map(genre => gameCreate.addGenre(genre));
            await Promise.all(proms)
    
            res.status(200).send({ msg: "Game successfully created" })
 
        } catch (err) {
            next(err)
        }

    })

///deleteeee
    router.delete("/:id", async (req,res,next) => {
        try{
            let id = req.params.id

            await Videogame.destroy({
                where: {id:id}
            })
            res.status(200).send("Deleted game")

        } catch(err){
            res.status(404).send ("Could not delete the game")
        }
    })

module.exports = router;