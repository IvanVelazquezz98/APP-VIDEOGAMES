import react from 'react'
import { Link , useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector  } from 'react-redux';
import Paginado from './paginado';
import Card from '../../Components/Cards';
import {getGenres, getVideogames , orderByName ,orderByRating , filteredGenre} from '../../Redux/actions';
import styles from '../Home/Home.module.css'
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import About from '../About'

export default function Home() {
    const dispatch = useDispatch() 
    const allGames = useSelector((state) => state.allGames)
    const allGenre = useSelector((state) => state.genres)
    const history = useHistory()


    const [order,setOrder] = useState("")
    const [score,setScore] = useState("")

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

    const handleReload = () => {
        window.location.reload();
      }

    function handleSortedGameName(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
        e.preventDefault()
    }

    function handleSortedGameRating(e){
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setScore(e.target.value)
        e.preventDefault();
    }
    function handleFilteredGenre(e){
        dispatch(filteredGenre(e.target.value))
        setCurrentPage(1)
        e.preventDefault();
    }

    return(
        <>
        <div className={styles.firstContainer}>
               <button className={styles.home} onClick={(e) => handleReload(e)}>Home</button>
        
        <div  >
            <SearchBar setCurrentPage={setCurrentPage}/>
        </div>

        <div className={styles.inputContainer}>
        <select  onChange={e => handleSortedGameName(e)}>
                <option value="" >Select Order Name</option>
                <option value= "Asc">Ascendant</option>
                <option value ="des">Descendant</option>
        </select>
        <select  onChange={e => handleSortedGameRating(e)}>
                <option value="" >Order By Rating Score</option> 
                <option value="MAX RATING">Max Rating</option>
                <option value="MIN RATING">Min Rating</option>
        </select>
        <select onChange={e => handleFilteredGenre(e)}>
                    <option value="">Select Genre</option>
                    <option value="">All</option>
                    {allGenre.map((g) => (
                    <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
         </select>
        </div>
        <div className={styles.createGame}> 
            <Link to="/Createvideogame">
            <button className={styles.botonCreateGame}> Created Game </button>
            </Link>
                
        </div>
        
        <div>
            <Link to="/About">
            <button className={styles.about}> About</button>
            </Link>
        </div>
        <div>
            <Link to="/Favorites">
            <button className={styles.about}> Favorites</button>
            </Link>
        </div>
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
                {(currentGames == !currentGames)
                ?
                <div >
                      <Loading/>
                    </div> 
                :
                
                currentGames?.map(game => {
                    return (
                        <Link className={styles.Link} to={`/videogames/${game.id}`}>
                          <Card 
                                image={game.image ? game.image : <Loading/>}
                                name={game.name ? game.name : <Loading/> } 
                                genres={game .genres ? game.genres.map(r => <p key={r.id}  > {r.name}</p>) : <Loading/> }
                                key={game.id} 
                                fav={game}>
                           </Card>
                        </Link>
                        )
                    })
                }
            </div>
        </div>
        <div>
         <Paginado 
        gamesPerPage={gamesPerPage}
        allGames={allGames.length} 
        paginado={paginado}>
        </Paginado>
        </div> 

        
        
        </>
        )
    

}