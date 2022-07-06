import react from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Paginado from './paginado';
import Card from '../../Components/Cards';
import {getGenres, getVideogames} from '../../Redux/actions';
import styles from '../Home/Home.module.css'

export default function Home() {
    const dispatch = useDispatch() 
    const allGames = useSelector((state) => state.allGames)
    const allGenre = useSelector((state) => state.genres)


    const [order,setOrder] = useState("")

    useEffect(() => {
        dispatch(getVideogames())

    },[dispatch])

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])


    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame,indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return(
        <>
        <div>
                <h1>HOMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</h1>
        </div>

        <div>
         <Paginado 
        gamesPerPage={gamesPerPage}
        allGames={allGames.length} 
        paginado={paginado}>
        </Paginado>
        </div> 
        <div>
          <div className={styles.gameContainer}>
                {(currentGames?.length == 0)
                ?
                <div >
                      <p>Loading ...</p>
                    </div> 
                :
                
                currentGames?.map(game => {
                    return (
                        <Link className={styles.Link} to={`/videogames/${game.id}`}>
                          <Card 
                                image={game.image}
                                name={game.name} 
                                genre={game.genre } 
                                key={game.id} >
                           </Card>
                        </Link>
                        )
                    })
                }
            </div>
        </div>
        
        </>
        )
    

}