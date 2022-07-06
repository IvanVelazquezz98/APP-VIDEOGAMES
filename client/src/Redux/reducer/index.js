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
            
            default: return state
    }


    
}