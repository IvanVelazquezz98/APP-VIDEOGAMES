const initialState ={
    allGames: [],   
    copyGames: [], 
    genres: [], 
    detail: []

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
                const genreFiltered = action.payload === "" ? games : games.filter(game => game.genres.includes(action.payload))  
                      return {
                         ...state,
                           allGames: genreFiltered
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
            
            default: return state
    }


    
}