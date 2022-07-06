import React from "react";



export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumber = []
    
    for(let i = 0; i < Math.ceil(allGames/gamesPerPage); i++){
        pageNumber.push(i+1)
    }

    return (
        <nav>
            <ul >
                { pageNumber?.map(number => (
                    <ul  key={number}>
                        <a  onClick={()=> paginado(number) } >{number}</a>
                    </ul>
                ))
                }
            </ul>
        </nav>
    )
}
