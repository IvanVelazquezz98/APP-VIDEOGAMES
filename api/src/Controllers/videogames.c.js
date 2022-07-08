const { Videogame , Genre } = require("../db")
const axios = require("axios")
require('dotenv').config()
const { API_KEY } = process.env;


const getInfoApi = async () => {

    try{

        let vContainer = [];
        for(var vPage = 1; vPage < 6; vPage++){
            const getDataApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${vPage}`)
            const results = await getDataApi.data.results
            vContainer = [...vContainer,...results]
            
        }
        const getApivideogame = vContainer.map(v => {
    
            return {
                id: v.id.toString(),
                name: v.name,
                description: v.description,
                releaseDate: v.released,
                image: v.background_image,
                rating: v.rating.toString(),
                platform: v.platforms.map(p => p.platform.name ),
                genres: v.genres.map(each => ({ name: each.name }))
            }
        });
        return getApivideogame;

    }catch(e){
        console.log(e)
    }
}

const getDataBaseInfo = async () => {
    try{
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }
     })
    } catch (e) {
        console.log(e)
 }
}

const getAllGames = async () => {
    const apiGamesProm = getInfoApi()
    const dbInfoProm = getDataBaseInfo()

    const [apiGames, dbInfo] = await Promise.all([apiGamesProm, dbInfoProm]) 

    return [...apiGames, ...dbInfo];
}

const getIdxApi = async (id) =>{

    try{
    const getinfoGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const infoGame = getinfoGame.data
    console.log(infoGame)

    return{
        id: infoGame.id.toString(),
        name: infoGame.name_original,
        description: infoGame.description.replace(/<[^>]*>?/g, ''),
        releaseDate: infoGame.released,
        image: infoGame.background_image,
        rating: infoGame.rating.toString(),
        platform:  infoGame.platforms.map(p => ({ name : p.platform.name}) ),
        genres: infoGame.genres.map(each => ({ name: each.name }))
        }
        
        } catch{
        return undefined
        }

    }

    const getIdxDb = async(id) => {

        try {
            const game = await Videogame.findByPk(id, {
                include: {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    } 
                }
             })
            return game
        } catch {
            return undefined;
        }

    }

    const getInfoGame = async(id) => {

       const promapiGameinfo = getIdxApi(id)
       const promDbGameInfo = getIdxDb(id)
       const [apiGameInfo , dbGameInfo] = await Promise.all([ promapiGameinfo ,promDbGameInfo]);
            
       return apiGameInfo  ||  dbGameInfo

    }


    module.exports = {
    getAllGames,
    getInfoGame,
}