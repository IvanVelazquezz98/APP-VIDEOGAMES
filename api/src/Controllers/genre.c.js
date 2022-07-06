const { Videogame , Genre } = require("../db")
const axios = require("axios")
require('dotenv').config()
const { API_KEY } = process.env;

const getGenres = async() =>{

    try{
     
            const getDataApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const results = getDataApi.data.results

            const getApiGenres = results.map(v => {
    
                return {
                    name: v.name,
                }
            });

            console.log(getApiGenres)
           await Genre.bulkCreate(getApiGenres)  
    }
    catch (e){
        console.log(e)
    }
    }

module.exports = {
    getGenres
}