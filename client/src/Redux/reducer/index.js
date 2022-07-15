

const initialState ={
    allGames: [],   
    copyGames: [], 
    genres: [], 
    detail: [],
    favGames: []

}



export default function rootReducer(state = initialState , action){
    switch (action.type) {
        case "GET_GAMES":
            return {
                ...state,
                allGames: action.payload,
                copyGames: action.payload,
                
                detail: []
            }

            case "GET_GENRES" :
                return {
                    ...state,
                    genres: action.payload
                }

            case "GET_DETAIL":
                return {
                    ...state,
                    detail : action.payload
                }

            case "CLEAR_PAGE":
                return {
                    ...state,
                    detail: []
                } 

            case "SEARCH_GAME":
                    return {
                        ...state,
                        allGames: action.payload
                    }

            case "FILTERED_BY_GENRE":
                const games = state.copyGames
                const genreFiltered = action.payload === "" ? games : games.filter(game => {
                        let genre = game.genres.map(d => d.name)
                        if (genre.includes(action.payload)){
                            return genre
                        }
                    }) 
                      return {
                         ...state,
                           allGames: genreFiltered
                       }
            case "FILTERED_BY_PLATFORM":
                const gamesP = state.copyGames
                const platformFiltered = action.payload === "" ? gamesP : gamesP.filter(p => p.platform.includes(action.payload)) 
                return {
                    ...state,
                    allGames:platformFiltered
                }        

            case "ORDER_BY_NAME":
                const sortedRGameName = action.payload === "Asc" ? 
                    state.allGames.sort(function( a , b ) {
                         if(a.name.toLowerCase() > b.name.toLowerCase()){
                             return 1
                         }
                        if (b.name.toLowerCase() > a.name.toLowerCase()){
                                 return -1
                            }
                        return 0
                    }) : state.allGames.sort(function( a , b ) {
                        if(a.name.toLowerCase() > b.name.toLowerCase()){
                             return -1
                         }
                         if (b.name.toLowerCase() > a.name.toLowerCase()){
                             return 1
                          }
                         return 0
                     })
                        return {
                            ...state,
                             allGames: sortedRGameName
                        }

            case "ORDER_BY_RATING":
            
                     const sortedGameRating = action.payload === "MAX RATING" ? 
                         state.allGames.sort(function(a,b) {
                             if(a.rating < b.rating){
                                return 1
                             }
                              if (b.rating < a.rating){
                                  return -1
                              }
                              return 0
                          }) : state.allGames.sort(function(a,b) {
                            if(a.rating < b.rating){
                                 return -1
                              }
                              if (b.rating < a.rating){
                                 return 1
                             }
                             return 0
                         })
                        return {
                            ...state,
                            allGames: sortedGameRating
                        }

            case "SET_FAV": return{
                ...state,
                favGames: state.favGames.find((game) => game.id == action.payload.id) ? [...state.favGames] 
                : [...state.favGames, action.payload]
             }
            
            case "DEL_FAV":return{
                ...state,
                favGames: state.favGames.filter(game => game.id !== action.payload.id)
            }
            

            
            default: return state
    }


    
}