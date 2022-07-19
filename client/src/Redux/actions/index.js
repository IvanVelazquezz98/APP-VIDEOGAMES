import axios from "axios"
import Loading from "../../Components/Loading"

import {GET_GAMES, GET_GENRES ,GET_DETAIL ,SEARCH_GAME,
     ORDER_BY_NAME ,ORDER_BY_RATING,FILTERED_BY_GENRE,
     CLEAR_PAGE,SET_FAV,DEL_FAV,FILTERED_BY_PLATFORM,FILTER_CREATED} from "./actionTypes"


export function getVideogames(){
    return function(dispatch){
        try{
             axios.get("http://localhost:3001/videogames")
            .then(response => {
                return dispatch({
                    type: GET_GAMES,
                    payload: response.data
                })
        })
    } catch (error){
        console.log(error)
    }

}}

export function getGenres(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/genres")
            return dispatch({
                type: GET_GENRES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
         var json = await axios.get('http://localhost:3001/videogames/' + id)
            return dispatch ({
                type: GET_DETAIL,
                payload: json.data})
            }catch(error){
            console.log(error)
        }
     } 

        
}

export function searchGame(name){
    return async function(dispatch){
        
        try {
            
            axios.get('http://localhost:3001/videogames?name=' + name) 
            .then(response => {
                return dispatch ({
                    type: SEARCH_GAME,
                    payload: response.data 
                }) 
            } )
           
            
        } catch (error) {
            <Loading/>
        }
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function filteredGenre(payload){ 
    return {
        type: FILTERED_BY_GENRE,
        payload
    }
}

export function filteredPlatform(payload){
    return{
        type: FILTERED_BY_PLATFORM,
        payload
    }

}
export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}

export function postGame(payload){
    return async function(dispatch){
        try {
            var json = await axios.post(`http://localhost:3001/videogames/CreateVideogame`, payload)
            return json
        } catch (error) {
            console.log(error)}
        }
    }
    export function clearPage(){
        return {
            type: CLEAR_PAGE
        }
    }

export function setFav(payload){
    return{
        type:SET_FAV,
        payload
    }
}

export function delFav(payload){
    return{
        type:DEL_FAV,
        payload
    }
}
