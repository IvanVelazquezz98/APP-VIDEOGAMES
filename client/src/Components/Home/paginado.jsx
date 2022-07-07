import React from "react";
import styles from "../Home/paginado.module.css";


export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumber = []
    
    for(let i = 0; i < Math.ceil(allGames/gamesPerPage); i++){
        pageNumber.push(i+1)
    }

    return (
        <nav>
            <ul className={styles.ul} >
                { pageNumber?.map(number => (
                    <ul  key={number}>
                        <a className={styles.botonpersonalizado} onClick={()=> paginado(number) } >{number}</a>
                    </ul>
                ))
                }
            </ul>
        </nav>
    )
}
