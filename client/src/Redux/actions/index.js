import axios from "axios"




export function getVideogames(){
    return function(dispatch){
        try{
             axios.get("http://localhost:3001/videogames")
            .then(response => {
                return dispatch({
                    type: "GET_GAMES",
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
                type: "GET_GENRES",
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
                type: "GET_DETAIL",
                payload: json.data})
            }catch(error){
            console.log(error)
        }
     } 

        
}
export function clearPage(){
    return {
        type: "CLEAR_PAGE"
    }
}